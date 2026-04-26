import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Eye, Download, Search, Filter, RefreshCw,
  Phone, Mail, Calendar, Tag, AlertCircle,
  CheckCircle2, Clock, XCircle, TrendingUp, Users,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

// ── Types ──────────────────────────────────────────────────────────────────
interface Lead {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone?: string;
  services?: string[];
  message?: string;
  newsletter?: boolean;
  source?: string;
  status: string;
  priority: string;
  assigned_to?: string;
  budget_range?: string;
  timeline?: string;
  marketplace?: string[];
  country?: string;
  notes?: string;
  follow_up_date?: string;
  last_contacted_at?: string;
}

// ── Config ─────────────────────────────────────────────────────────────────
const STATUS_OPTIONS = ['new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost'];
const PRIORITY_OPTIONS = ['low', 'medium', 'high'];

const STATUS_STYLES: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  new:           { bg: '#1e3a5f', text: '#60a5fa', icon: <AlertCircle className="w-3 h-3" /> },
  contacted:     { bg: '#3b2f00', text: '#fbbf24', icon: <Clock className="w-3 h-3" /> },
  qualified:     { bg: '#14532d', text: '#4ade80', icon: <CheckCircle2 className="w-3 h-3" /> },
  proposal_sent: { bg: '#2e1065', text: '#a78bfa', icon: <TrendingUp className="w-3 h-3" /> },
  won:           { bg: '#14532d', text: '#86efac', icon: <CheckCircle2 className="w-3 h-3" /> },
  lost:          { bg: '#450a0a', text: '#f87171', icon: <XCircle className="w-3 h-3" /> },
};

const PRIORITY_STYLES: Record<string, string> = {
  low:    '#6b7280',
  medium: '#f59e0b',
  high:   '#ef4444',
};

// ── Stat card ──────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, color }: { label: string; value: number; sub?: string; color: string }) => (
  <div className="bg-white rounded-xl border border-[#ecf0f1] p-4">
    <div className="text-2xl font-bold" style={{ color }}>{value}</div>
    <div className="text-sm font-medium text-[#2c3e50] mt-0.5">{label}</div>
    {sub && <div className="text-xs text-[#7f8c8d] mt-1">{sub}</div>}
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────
const AdminLeads = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all'); // all | today | week | month

  // Stats
  const [stats, setStats] = useState({ total: 0, new: 0, won: 0, followUpDue: 0 });

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const rows = (data || []) as Lead[];
      setLeads(rows);

      // Compute stats
      const now = new Date();
      setStats({
        total: rows.length,
        new: rows.filter(l => l.status === 'new').length,
        won: rows.filter(l => l.status === 'won').length,
        followUpDue: rows.filter(l =>
          l.follow_up_date && new Date(l.follow_up_date) <= now && !['won','lost'].includes(l.status)
        ).length,
      });
    } catch (err: any) {
      toast({ title: 'Error loading leads', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  // ── Filtered leads ───────────────────────────────────────────────────────
  const filtered = leads.filter(lead => {
    // Search
    if (search) {
      const q = search.toLowerCase();
      if (
        !lead.name.toLowerCase().includes(q) &&
        !lead.email.toLowerCase().includes(q) &&
        !(lead.phone || '').includes(q) &&
        !(lead.message || '').toLowerCase().includes(q)
      ) return false;
    }
    // Status
    if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
    // Priority
    if (priorityFilter !== 'all' && lead.priority !== priorityFilter) return false;
    // Source
    if (sourceFilter !== 'all' && lead.source !== sourceFilter) return false;
    // Date
    if (dateFilter !== 'all') {
      const created = new Date(lead.created_at);
      const now = new Date();
      if (dateFilter === 'today') {
        if (created.toDateString() !== now.toDateString()) return false;
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 86400000);
        if (created < weekAgo) return false;
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 86400000);
        if (created < monthAgo) return false;
      }
    }
    return true;
  });

  // ── Update status ────────────────────────────────────────────────────────
  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('leads' as any)
      .update({ status })
      .eq('id', id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : prev);
    toast({ title: 'Status updated' });
  };

  // ── Update priority ──────────────────────────────────────────────────────
  const updatePriority = async (id: string, priority: string) => {
    const { error } = await supabase
      .from('leads' as any)
      .update({ priority })
      .eq('id', id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    setLeads(prev => prev.map(l => l.id === id ? { ...l, priority } : l));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, priority } : prev);
  };

  // ── Save notes ───────────────────────────────────────────────────────────
  const saveNotes = async () => {
    if (!selected) return;
    setSavingNotes(true);
    const { error } = await supabase
      .from('leads' as any)
      .update({ notes, last_contacted_at: new Date().toISOString() })
      .eq('id', selected.id);
    setSavingNotes(false);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    setLeads(prev => prev.map(l => l.id === selected.id ? { ...l, notes } : l));
    toast({ title: 'Notes saved' });
    setDialogOpen(false);
  };

  // ── Export CSV ───────────────────────────────────────────────────────────
  const exportCSV = () => {
    const headers = ['Name','Email','Phone','Services','Status','Priority','Source','Message','Date'];
    const rows = filtered.map(l => [
      l.name, l.email, l.phone || '',
      (l.services || []).join('; '),
      l.status, l.priority, l.source || '',
      (l.message || '').replace(/,/g, ' '),
      format(new Date(l.created_at), 'yyyy-MM-dd'),
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Exported', description: `${filtered.length} leads exported` });
  };

  // ── Unique sources for filter ────────────────────────────────────────────
  const sources = ['all', ...Array.from(new Set(leads.map(l => l.source || 'direct').filter(Boolean)))];

  if (loading) return <div className="p-6 text-[#7f8c8d] animate-pulse">Loading leads...</div>;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">Lead Inquiries</h1>
          <p className="text-[#7f8c8d] mt-1">{leads.length} total leads · {filtered.length} shown</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchLeads} className="gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV} className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Leads"    value={stats.total}       color="#1a3a3a" />
        <StatCard label="New"            value={stats.new}         color="#3b82f6" sub="Awaiting contact" />
        <StatCard label="Won"            value={stats.won}         color="#16a34a" sub="Converted clients" />
        <StatCard label="Follow-up Due"  value={stats.followUpDue} color="#ef4444" sub="Action needed" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#ecf0f1] p-4">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7f8c8d]" />
            <Input
              placeholder="Search name, email, phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>

          {/* Status filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUS_OPTIONS.map(s => (
                <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Priority filter */}
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              {PRIORITY_OPTIONS.map(p => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Source filter */}
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[150px] h-9">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              {sources.map(s => (
                <SelectItem key={s} value={s}>{s === 'all' ? 'All Sources' : s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date filter */}
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear filters */}
          {(search || statusFilter !== 'all' || priorityFilter !== 'all' || sourceFilter !== 'all' || dateFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setSearch(''); setStatusFilter('all'); setPriorityFilter('all'); setSourceFilter('all'); setDateFilter('all'); }}
              className="text-[#7f8c8d] h-9"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#ecf0f1] p-12 text-center">
          <Users className="w-12 h-12 text-[#bdc3c7] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#2c3e50] mb-2">No leads found</h3>
          <p className="text-[#7f8c8d]">
            {leads.length === 0
              ? 'Leads will appear here once the contact form is submitted.'
              : 'Try adjusting your filters.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#ecf0f1] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#f8f9fa]">
                <TableHead className="font-semibold text-[#2c3e50]">Lead</TableHead>
                <TableHead className="font-semibold text-[#2c3e50]">Services</TableHead>
                <TableHead className="font-semibold text-[#2c3e50]">Status</TableHead>
                <TableHead className="font-semibold text-[#2c3e50]">Priority</TableHead>
                <TableHead className="font-semibold text-[#2c3e50]">Source</TableHead>
                <TableHead className="font-semibold text-[#2c3e50]">Received</TableHead>
                <TableHead className="text-right font-semibold text-[#2c3e50]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(lead => {
                const statusStyle = STATUS_STYLES[lead.status] || STATUS_STYLES.new;
                return (
                  <TableRow key={lead.id} className="hover:bg-[#f8f9fa] transition-colors">
                    {/* Lead info */}
                    <TableCell>
                      <div className="font-medium text-[#2c3e50]">{lead.name}</div>
                      <div className="flex items-center gap-1 text-xs text-[#7f8c8d] mt-0.5">
                        <Mail className="w-3 h-3" /> {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-1 text-xs text-[#7f8c8d]">
                          <Phone className="w-3 h-3" /> {lead.phone}
                        </div>
                      )}
                    </TableCell>

                    {/* Services */}
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {(lead.services || []).slice(0, 2).map(s => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-[#f0f0f0] text-[#555]">{s}</span>
                        ))}
                        {(lead.services || []).length > 2 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f0f0f0] text-[#555]">+{(lead.services || []).length - 2}</span>
                        )}
                        {(!lead.services || lead.services.length === 0) && (
                          <span className="text-xs text-[#bdc3c7]">—</span>
                        )}
                      </div>
                    </TableCell>

                    {/* Status — inline editable */}
                    <TableCell>
                      <select
                        value={lead.status}
                        onChange={e => updateStatus(lead.id, e.target.value)}
                        className="text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer"
                        style={{ background: statusStyle.bg, color: statusStyle.text }}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s} style={{ background: '#fff', color: '#333' }}>
                            {s.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </TableCell>

                    {/* Priority — inline editable */}
                    <TableCell>
                      <select
                        value={lead.priority}
                        onChange={e => updatePriority(lead.id, e.target.value)}
                        className="text-xs font-semibold bg-transparent border-0 cursor-pointer"
                        style={{ color: PRIORITY_STYLES[lead.priority] || '#6b7280' }}
                      >
                        {PRIORITY_OPTIONS.map(p => (
                          <option key={p} value={p} style={{ color: '#333' }}>{p}</option>
                        ))}
                      </select>
                    </TableCell>

                    {/* Source */}
                    <TableCell>
                      <span className="text-xs text-[#7f8c8d]">{lead.source || 'direct'}</span>
                    </TableCell>

                    {/* Date */}
                    <TableCell>
                      <div className="text-xs text-[#2c3e50]">{format(new Date(lead.created_at), 'MMM d, yyyy')}</div>
                      <div className="text-[10px] text-[#7f8c8d]">{formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}</div>
                      {lead.follow_up_date && (
                        <div className="flex items-center gap-1 text-[10px] text-amber-600 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          Follow-up: {format(new Date(lead.follow_up_date), 'MMM d')}
                        </div>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setSelected(lead); setNotes(lead.notes || ''); setDialogOpen(true); }}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Detail dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#2c3e50]">Lead Details</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-5 py-2">

              {/* Contact info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#f8f9fa] rounded-xl">
                <div>
                  <div className="text-xs text-[#7f8c8d] uppercase tracking-wider mb-1">Name</div>
                  <div className="font-semibold text-[#2c3e50]">{selected.name}</div>
                </div>
                <div>
                  <div className="text-xs text-[#7f8c8d] uppercase tracking-wider mb-1">Email</div>
                  <a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline text-sm">{selected.email}</a>
                </div>
                {selected.phone && (
                  <div>
                    <div className="text-xs text-[#7f8c8d] uppercase tracking-wider mb-1">Phone</div>
                    <a href={`tel:${selected.phone}`} className="text-blue-600 hover:underline text-sm">{selected.phone}</a>
                  </div>
                )}
                <div>
                  <div className="text-xs text-[#7f8c8d] uppercase tracking-wider mb-1">Received</div>
                  <div className="text-sm text-[#2c3e50]">{format(new Date(selected.created_at), 'PPpp')}</div>
                </div>
              </div>

              {/* Status + Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#7f8c8d] uppercase tracking-wider block mb-2">Status</label>
                  <select
                    value={selected.status}
                    onChange={e => updateStatus(selected.id, e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#ecf0f1] text-sm bg-white text-[#2c3e50]"
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#7f8c8d] uppercase tracking-wider block mb-2">Priority</label>
                  <select
                    value={selected.priority}
                    onChange={e => updatePriority(selected.id, e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#ecf0f1] text-sm bg-white text-[#2c3e50]"
                  >
                    {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              {/* Services */}
              {selected.services && selected.services.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-[#7f8c8d] uppercase tracking-wider mb-2">Services Interested In</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.services.map(s => (
                      <span key={s} className="px-3 py-1 rounded-full text-xs font-medium bg-[#1a3a3a]/10 text-[#1a3a3a] border border-[#1a3a3a]/20">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Message */}
              {selected.message && (
                <div>
                  <div className="text-xs font-semibold text-[#7f8c8d] uppercase tracking-wider mb-2">Message</div>
                  <div className="p-3 bg-[#f8f9fa] rounded-lg text-sm text-[#2c3e50] leading-relaxed">{selected.message}</div>
                </div>
              )}

              {/* Newsletter */}
              <div className="flex items-center gap-2 text-sm text-[#7f8c8d]">
                {selected.newsletter
                  ? <><CheckCircle2 className="w-4 h-4 text-green-500" /> Subscribed to newsletter</>
                  : <><XCircle className="w-4 h-4 text-gray-400" /> Not subscribed to newsletter</>
                }
              </div>

              {/* Follow-up date */}
              <div>
                <label className="text-xs font-semibold text-[#7f8c8d] uppercase tracking-wider block mb-2">Follow-up Date</label>
                <input
                  type="date"
                  defaultValue={selected.follow_up_date || ''}
                  onChange={async e => {
                    await supabase.from('leads' as any).update({ follow_up_date: e.target.value || null }).eq('id', selected.id);
                    setSelected(prev => prev ? { ...prev, follow_up_date: e.target.value } : prev);
                  }}
                  className="h-10 px-3 rounded-lg border border-[#ecf0f1] text-sm bg-white text-[#2c3e50] w-full"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold text-[#7f8c8d] uppercase tracking-wider block mb-2">Internal Notes</label>
                <Textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Add notes, call summaries, next steps..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-2">
                  <a href={`mailto:${selected.email}`}>
                    <Button variant="outline" size="sm" className="gap-2"><Mail className="w-4 h-4" /> Email</Button>
                  </a>
                  {selected.phone && (
                    <a href={`tel:${selected.phone}`}>
                      <Button variant="outline" size="sm" className="gap-2"><Phone className="w-4 h-4" /> Call</Button>
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button
                    onClick={saveNotes}
                    disabled={savingNotes}
                    className="bg-[#1a3a3a] hover:bg-[#1a3a3a]/90 text-white"
                  >
                    {savingNotes ? 'Saving...' : 'Save Notes'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLeads;
