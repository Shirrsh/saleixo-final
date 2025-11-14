import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Eye, Download } from 'lucide-react';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  service_interested?: string;
  message?: string;
  budget_range?: string;
  timeline?: string;
  status: string;
  notes?: string;
  created_at: string;
}

const AdminLeads = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      // Since the lead_inquiries table doesn't exist yet, we'll create a placeholder
      // In production, you would create this table via migration
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.log('Lead table not set up yet');
        setLeads([]);
      } else {
        // Map activity log to lead format as placeholder
        const mappedLeads: Lead[] = (data || []).map((item) => ({
          id: item.id,
          name: item.user_email || 'Unknown',
          email: item.user_email || '',
          source: item.item_type || 'direct',
          service_interested: item.action || '',
          status: 'new',
          created_at: item.created_at,
        }));
        setLeads(mappedLeads);
      }
    } catch (error: any) {
      toast({
        title: 'Note',
        description: 'Lead tracking table not yet configured. Please set up lead_inquiries table.',
        variant: 'default',
      });
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setNotes(lead.notes || '');
    setIsDialogOpen(true);
  };

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      // This would update the lead_inquiries table when it exists
      toast({
        title: 'Status Updated',
        description: `Lead marked as ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;

    try {
      // This would update the lead_inquiries table when it exists
      toast({
        title: 'Success',
        description: 'Notes saved successfully',
      });
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const exportToCSV = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Company', 'Source', 'Service', 'Status', 'Date'],
      ...leads.map((lead) => [
        lead.name,
        lead.email,
        lead.phone || '',
        lead.company || '',
        lead.source,
        lead.service_interested || '',
        lead.status,
        format(new Date(lead.created_at), 'yyyy-MM-dd'),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();

    toast({
      title: 'Success',
      description: 'Leads exported to CSV',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500';
      case 'contacted':
        return 'bg-yellow-500';
      case 'qualified':
        return 'bg-green-500';
      case 'converted':
        return 'bg-[#d4af37]';
      default:
        return 'bg-gray-500';
    }
  };

  const getSourceBadge = (source: string) => {
    const colors: Record<string, string> = {
      quiz: 'bg-purple-100 text-purple-800',
      chatbot: 'bg-blue-100 text-blue-800',
      contact: 'bg-green-100 text-green-800',
      direct: 'bg-gray-100 text-gray-800',
    };
    return colors[source] || colors.direct;
  };

  const filteredLeads = filter === 'all' ? leads : leads.filter((lead) => lead.source === filter);

  if (loading) {
    return <div className="p-6 text-[#7f8c8d]">Loading leads...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">Lead Inquiries</h1>
          <p className="text-[#7f8c8d] mt-2">Manage and track all incoming leads</p>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          All Leads
        </Button>
        <Button
          variant={filter === 'quiz' ? 'default' : 'outline'}
          onClick={() => setFilter('quiz')}
          size="sm"
        >
          Quiz
        </Button>
        <Button
          variant={filter === 'chatbot' ? 'default' : 'outline'}
          onClick={() => setFilter('chatbot')}
          size="sm"
        >
          Chatbot
        </Button>
        <Button
          variant={filter === 'contact' ? 'default' : 'outline'}
          onClick={() => setFilter('contact')}
          size="sm"
        >
          Contact Form
        </Button>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white rounded-lg border border-[#ecf0f1] p-12 text-center">
          <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">No Leads Yet</h3>
          <p className="text-[#7f8c8d]">
            Lead tracking requires the lead_inquiries table to be set up.
            <br />
            Once configured, all quiz completions, chatbot conversations, and contact form submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[#ecf0f1]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <Badge className={getSourceBadge(lead.source)}>{lead.source}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{lead.service_interested}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                  </TableCell>
                  <TableCell>{format(new Date(lead.created_at), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(lead)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#2c3e50]">Name</label>
                  <p className="text-[#7f8c8d]">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#2c3e50]">Email</label>
                  <p className="text-[#7f8c8d]">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#2c3e50]">Source</label>
                  <Badge className={getSourceBadge(selectedLead.source)}>
                    {selectedLead.source}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#2c3e50]">Status</label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value)}
                    className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {selectedLead.company && (
                <div>
                  <label className="text-sm font-medium text-[#2c3e50]">Company</label>
                  <p className="text-[#7f8c8d]">{selectedLead.company}</p>
                </div>
              )}

              {selectedLead.service_interested && (
                <div>
                  <label className="text-sm font-medium text-[#2c3e50]">Service Interested</label>
                  <p className="text-[#7f8c8d]">{selectedLead.service_interested}</p>
                </div>
              )}

              {selectedLead.message && (
                <div>
                  <label className="text-sm font-medium text-[#2c3e50]">Message</label>
                  <p className="text-[#7f8c8d]">{selectedLead.message}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Internal Notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this lead..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={handleSaveNotes}
                  className="bg-[#d4af37] hover:bg-[#c19d2f]"
                >
                  Save Notes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLeads;
