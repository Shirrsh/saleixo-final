import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ── Per-marketplace config ──────────────────────────────────────────────────
const marketplaces = [
  {
    id: 'amazon',
    name: 'Amazon',
    url: 'sellercentral.amazon.com',
    navBg: '#232f3e',
    navText: '#ffffff',
    accent: '#ff9900',
    accentText: '#000000',
    logo: <span className="font-bold text-sm" style={{ color: '#ff9900' }}>amazon</span>,
    subLabel: 'seller central',
    navItems: ['Catalog', 'Inventory', 'Pricing', 'Reports', 'Advertising'],
    activeNav: 'Reports',
    stats: [
      { label: 'Ordered Product Sales', value: '$12,847', change: '+23%' },
      { label: 'Units Ordered', value: '1,284', change: '+18%' },
      { label: 'Buy Box %', value: '94.2%', change: '+2.1%' },
      { label: 'Sessions', value: '8,420', change: '+31%' },
    ],
    chartColor: '#232f3e',
    accentChart: '#ff9900',
    rows: [
      { title: 'Luxury Ring Set', sales: '$4,210', units: 312, badge: '#3' },
      { title: 'Incense Gift Box', sales: '$3,180', units: 248, badge: '#7' },
      { title: 'Bracelet Bundle', sales: '$2,940', units: 201, badge: '#12' },
    ],
    rowLabel: 'Top ASINs by Revenue',
    badgeLabel: 'BSR',
  },
  {
    id: 'ebay',
    name: 'eBay',
    url: 'seller.ebay.com/seller-dashboard',
    navBg: '#e53238',
    navText: '#ffffff',
    accent: '#0064d2',
    accentText: '#ffffff',
    logo: (
      <span className="font-extrabold text-sm tracking-tight">
        <span style={{ color: '#e53238' }}>e</span>
        <span style={{ color: '#0064d2' }}>B</span>
        <span style={{ color: '#f5af02' }}>a</span>
        <span style={{ color: '#86b817' }}>y</span>
      </span>
    ),
    subLabel: 'seller hub',
    navItems: ['Overview', 'Listings', 'Orders', 'Marketing', 'Performance'],
    activeNav: 'Performance',
    stats: [
      { label: 'Total Sales', value: '$8,340', change: '+19%' },
      { label: 'Items Sold', value: '643', change: '+14%' },
      { label: 'Avg. Sale Price', value: '$12.97', change: '+4%' },
      { label: 'Seller Level', value: 'Top Rated', change: '✓' },
    ],
    chartColor: '#0064d2',
    accentChart: '#e53238',
    rows: [
      { title: 'Diamond Earrings', sales: '$2,840', units: 198, badge: '98%' },
      { title: 'Rudraksha Set', sales: '$2,100', units: 167, badge: '99%' },
      { title: 'Aquamarine Bangle', sales: '$1,920', units: 143, badge: '97%' },
    ],
    rowLabel: 'Top Listings by Sales',
    badgeLabel: 'Feedback',
  },
  {
    id: 'etsy',
    name: 'Etsy',
    url: 'etsy.com/your/shops/me/dashboard',
    navBg: '#f1641e',
    navText: '#ffffff',
    accent: '#f1641e',
    accentText: '#ffffff',
    logo: <span className="font-bold text-sm" style={{ color: '#f1641e' }}>etsy</span>,
    subLabel: 'shop manager',
    navItems: ['Dashboard', 'Listings', 'Orders', 'Stats', 'Marketing'],
    activeNav: 'Stats',
    stats: [
      { label: 'Revenue', value: '$6,210', change: '+27%' },
      { label: 'Orders', value: '412', change: '+22%' },
      { label: 'Shop Views', value: '14,820', change: '+38%' },
      { label: 'Conversion', value: '2.78%', change: '+0.4%' },
    ],
    chartColor: '#f1641e',
    accentChart: '#d4380d',
    rows: [
      { title: 'Handmade Ring Box', sales: '$1,980', units: 134, badge: '★4.9' },
      { title: 'Incense Holder Set', sales: '$1,640', units: 112, badge: '★5.0' },
      { title: 'Crystal Bracelet', sales: '$1,420', units: 98, badge: '★4.8' },
    ],
    rowLabel: 'Top Listings',
    badgeLabel: 'Rating',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    url: 'admin.shopify.com/store/saleixo',
    navBg: '#1a1a1a',
    navText: '#ffffff',
    accent: '#96bf48',
    accentText: '#000000',
    logo: <span className="font-bold text-sm" style={{ color: '#96bf48' }}>shopify</span>,
    subLabel: 'admin',
    navItems: ['Home', 'Orders', 'Products', 'Analytics', 'Marketing'],
    activeNav: 'Analytics',
    stats: [
      { label: 'Total Sales', value: '$15,420', change: '+31%' },
      { label: 'Online Store Sessions', value: '22,840', change: '+44%' },
      { label: 'Returning Customers', value: '38.2%', change: '+5%' },
      { label: 'Avg. Order Value', value: '$68.40', change: '+12%' },
    ],
    chartColor: '#96bf48',
    accentChart: '#5c8a1e',
    rows: [
      { title: 'Premium Jewelry Kit', sales: '$5,840', units: 284, badge: 'Active' },
      { title: 'Spiritual Bundle', sales: '$4,210', units: 198, badge: 'Active' },
      { title: 'Gift Collection', sales: '$3,640', units: 167, badge: 'Active' },
    ],
    rowLabel: 'Top Products',
    badgeLabel: 'Status',
  },
  {
    id: 'walmart',
    name: 'Walmart',
    url: 'seller.walmart.com/dashboard',
    navBg: '#0071ce',
    navText: '#ffffff',
    accent: '#ffc220',
    accentText: '#000000',
    logo: <span className="font-bold text-sm" style={{ color: '#0071ce' }}>Walmart</span>,
    subLabel: 'seller center',
    navItems: ['Dashboard', 'Items', 'Orders', 'Analytics', 'Advertising'],
    activeNav: 'Analytics',
    stats: [
      { label: 'Gross Merchandise Value', value: '$9,840', change: '+16%' },
      { label: 'Orders', value: '724', change: '+21%' },
      { label: 'Item Page Views', value: '18,420', change: '+29%' },
      { label: 'On-Time Delivery', value: '98.4%', change: '+0.8%' },
    ],
    chartColor: '#0071ce',
    accentChart: '#ffc220',
    rows: [
      { title: 'Jewelry Display Set', sales: '$3,420', units: 241, badge: 'Pro' },
      { title: 'Aromatherapy Kit', sales: '$2,840', units: 198, badge: 'Pro' },
      { title: 'Bangle Collection', sales: '$2,210', units: 156, badge: 'Std' },
    ],
    rowLabel: 'Top Items',
    badgeLabel: 'Tier',
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    url: 'seller.flipkart.com/dashboard',
    navBg: '#2874f0',
    navText: '#ffffff',
    accent: '#ff6161',
    accentText: '#ffffff',
    logo: <span className="font-bold text-sm" style={{ color: '#ffffff' }}>flipkart</span>,
    subLabel: 'seller hub',
    navItems: ['Dashboard', 'Listings', 'Orders', 'Payments', 'Growth'],
    activeNav: 'Growth',
    stats: [
      { label: 'Net Revenue', value: '₹8,42,000', change: '+28%' },
      { label: 'Units Sold', value: '1,842', change: '+33%' },
      { label: 'Listing Quality', value: '87/100', change: '+6' },
      { label: 'F-Assured Items', value: '12', change: '+3' },
    ],
    chartColor: '#2874f0',
    accentChart: '#ff6161',
    rows: [
      { title: 'Gold Plated Ring', sales: '₹2,84,000', units: 412, badge: 'F-Assured' },
      { title: 'Incense Sticks Box', sales: '₹1,96,000', units: 324, badge: 'F-Assured' },
      { title: 'Rudraksha Mala', sales: '₹1,62,000', units: 267, badge: 'Standard' },
    ],
    rowLabel: 'Top SKUs',
    badgeLabel: 'Badge',
  },
  {
    id: 'meesho',
    name: 'Meesho',
    url: 'supplier.meesho.com/dashboard',
    navBg: '#9b2c8e',
    navText: '#ffffff',
    accent: '#f43397',
    accentText: '#ffffff',
    logo: <span className="font-bold text-sm" style={{ color: '#f43397' }}>meesho</span>,
    subLabel: 'supplier panel',
    navItems: ['Home', 'Catalogue', 'Orders', 'Payments', 'Insights'],
    activeNav: 'Insights',
    stats: [
      { label: 'Total Earnings', value: '₹3,84,000', change: '+41%' },
      { label: 'Orders Received', value: '2,841', change: '+52%' },
      { label: 'Return Rate', value: '4.2%', change: '-1.8%' },
      { label: 'Catalogue Score', value: '92%', change: '+7%' },
    ],
    chartColor: '#9b2c8e',
    accentChart: '#f43397',
    rows: [
      { title: 'Fashion Earrings Set', sales: '₹1,24,000', units: 842, badge: 'Trending' },
      { title: 'Bracelet Pack of 6', sales: '₹98,000', units: 641, badge: 'Trending' },
      { title: 'Pooja Thali Set', sales: '₹76,000', units: 498, badge: 'New' },
    ],
    rowLabel: 'Top Products',
    badgeLabel: 'Tag',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    url: 'saleixo.com/wp-admin/admin.php',
    navBg: '#7f54b3',
    navText: '#ffffff',
    accent: '#7f54b3',
    accentText: '#ffffff',
    logo: <span className="font-bold text-sm" style={{ color: '#7f54b3' }}>WooCommerce</span>,
    subLabel: 'analytics',
    navItems: ['Dashboard', 'Orders', 'Products', 'Analytics', 'Marketing'],
    activeNav: 'Analytics',
    stats: [
      { label: 'Net Revenue', value: '$11,240', change: '+22%' },
      { label: 'Orders', value: '834', change: '+18%' },
      { label: 'Products Sold', value: '1,241', change: '+24%' },
      { label: 'Refund Rate', value: '1.8%', change: '-0.4%' },
    ],
    chartColor: '#7f54b3',
    accentChart: '#a46497',
    rows: [
      { title: 'Jewelry Bundle', sales: '$4,120', units: 298, badge: 'In Stock' },
      { title: 'Incense Collection', sales: '$3,240', units: 241, badge: 'In Stock' },
      { title: 'Crystal Set', sales: '$2,840', units: 198, badge: 'Low Stock' },
    ],
    rowLabel: 'Top Products',
    badgeLabel: 'Stock',
  },
  {
    id: 'shein',
    name: 'SHEIN',
    url: 'seller.shein.com/dashboard',
    navBg: '#000000',
    navText: '#ffffff',
    accent: '#fe3c72',
    accentText: '#ffffff',
    logo: <span className="font-bold text-sm tracking-widest" style={{ color: '#ffffff' }}>SHEIN</span>,
    subLabel: 'seller center',
    navItems: ['Overview', 'Products', 'Orders', 'Finance', 'Analytics'],
    activeNav: 'Analytics',
    stats: [
      { label: 'Total Revenue', value: '$7,840', change: '+36%' },
      { label: 'Items Sold', value: '3,241', change: '+48%' },
      { label: 'Avg. Rating', value: '4.7★', change: '+0.2' },
      { label: 'Return Rate', value: '3.1%', change: '-0.9%' },
    ],
    chartColor: '#fe3c72',
    accentChart: '#c0002a',
    rows: [
      { title: 'Boho Earring Set', sales: '$2,840', units: 1241, badge: 'Hot' },
      { title: 'Layered Necklace', sales: '$2,120', units: 984, badge: 'Hot' },
      { title: 'Crystal Anklet', sales: '$1,640', units: 742, badge: 'New' },
    ],
    rowLabel: 'Top Items',
    badgeLabel: 'Tag',
  },
];

// ── Chart bars data (shared shape, colors vary) ─────────────────────────────
const chartBars = [40,65,45,80,55,90,70,85,60,95,75,88,50,72,92,68,84,76,91,63,87,79,94,58,82,71,89,66,93,77];

// ── Single marketplace dashboard ────────────────────────────────────────────
const Dashboard = ({ mp }: { mp: typeof marketplaces[0] }) => (
  <div className="bg-[#f3f3f3] text-gray-800 text-xs overflow-hidden">
    {/* Top nav */}
    <div className="px-3 py-1.5 flex items-center justify-between" style={{ background: mp.navBg }}>
      <div className="flex items-center gap-2">
        {mp.logo}
        <span className="text-[10px]" style={{ color: `${mp.navText}80` }}>{mp.subLabel}</span>
      </div>
      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0" style={{ background: mp.accent, color: mp.accentText }}>S</div>
    </div>

    <div className="p-2 overflow-hidden">
      {/* Title row */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[11px] font-semibold text-gray-800">{mp.name} Dashboard</h3>
        <div className="text-[8px] font-bold px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: mp.accent, color: mp.accentText }}>Last 30 Days</div>
      </div>

      {/* Stats — always 2×2 grid */}
      <div className="grid grid-cols-2 gap-1.5 mb-2">
        {mp.stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm"
          >
            <div className="text-[7px] text-gray-500 mb-0.5 leading-tight">{stat.label}</div>
            <div className="text-[11px] font-bold text-gray-800">{stat.value}</div>
            <div className="text-[8px] font-semibold" style={{ color: stat.change.startsWith('-') && stat.label.toLowerCase().includes('return') ? '#16a34a' : stat.change.startsWith('-') ? '#dc2626' : '#16a34a' }}>
              {stat.change.startsWith('-') ? '▼' : '▲'} {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart — hidden on small screens to keep the mockup in one frame */}
      <div className="hidden sm:block bg-white rounded-lg p-2 border border-gray-200 shadow-sm mb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-semibold text-gray-700">Sales Performance</span>
          <span className="text-[8px] text-gray-400">30 days</span>
        </div>
        <div className="flex items-end gap-0.5 h-8">
          {chartBars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{ background: i >= 25 ? mp.accentChart : mp.chartColor, opacity: i >= 25 ? 1 : 0.35 }}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.1 + i * 0.015, duration: 0.35 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[7px] text-gray-400">Day 1</span>
          <span className="text-[7px] font-semibold" style={{ color: mp.accentChart }}>Day 30</span>
        </div>
      </div>

      {/* Table — 2 rows */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-2.5 py-1 border-b border-gray-100 flex items-center justify-between">
          <span className="text-[9px] font-semibold text-gray-700">{mp.rowLabel}</span>
          <span className="text-[8px] cursor-pointer" style={{ color: mp.accent }}>View all</span>
        </div>
        {mp.rows.slice(0, 2).map((row, i) => (
          <div key={i} className={`px-2.5 py-1 flex items-center gap-1.5 text-[9px] ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[6px] text-gray-400 bg-gray-100">IMG</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 truncate text-[8px]">{row.title}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-semibold text-gray-800 text-[8px]">{row.sales}</div>
            </div>
            <div className="text-[7px] font-bold px-1 py-0.5 rounded flex-shrink-0" style={{ background: `${mp.accent}22`, color: mp.accent }}>
              {row.badge}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Main component ───────────────────────────────────────────────────────────
const MarketplaceMockup = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % marketplaces.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent(c => (c + dir + marketplaces.length) % marketplaces.length);
    setIsPaused(true);
    // Resume auto-play after manual nav
    setTimeout(() => setIsPaused(false), 8000);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs((touchStartY.current ?? 0) - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 48 && Math.abs(dx) > dy) go(dx > 0 ? 1 : -1);
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const mp = marketplaces[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.25 } }),
  };

  // Arrow button style — always visible, works in both light & dark mode
  const arrowStyle: React.CSSProperties = {
    background: 'rgba(0,0,0,0.62)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.18)',
  };

  return (
    <div className="relative group w-full max-w-full">
      {/* Browser chrome */}
      <div
        className="rounded-2xl overflow-hidden shadow-2xl border border-border-glow/30 bg-[#1a1a2e] w-full"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Browser top bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 bg-[#0f0f1a] border-b border-white/10">
          <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 min-w-0 mx-2 bg-white/10 rounded-md px-2 py-1 flex items-center gap-1.5 overflow-hidden">
            <span className="text-white/40 text-[10px] flex-shrink-0">🔒</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={mp.url}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] text-white/50 font-mono truncate"
              >
                {mp.url}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Dashboard slide */}
        <div className="relative overflow-hidden w-full">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={mp.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <Dashboard mp={mp} />
            </motion.div>
          </AnimatePresence>

          {/* Prev arrow — overlaid inside the dashboard frame */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous marketplace"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-20 active:scale-90 transition-transform lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity"
            style={arrowStyle}
          >
            <ChevronLeft className="w-4 h-4 text-white" strokeWidth={2.5} />
          </button>

          {/* Next arrow */}
          <button
            onClick={() => go(1)}
            aria-label="Next marketplace"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-20 active:scale-90 transition-transform lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity"
            style={arrowStyle}
          >
            <ChevronRight className="w-4 h-4 text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Dot indicators — 32px tap area each */}
      <div className="flex justify-center items-center gap-0.5 mt-3" role="tablist" aria-label="Marketplace slides">
        {marketplaces.map((m, i) => (
          <button
            key={m.id}
            aria-label={`Show ${m.name}`}
            aria-selected={i === current}
            role="tab"
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 8000); }}
            className="flex items-center justify-center"
            style={{ width: 28, height: 28, background: 'transparent', border: 'none', cursor: 'pointer', flexShrink: 0 }}
          >
            <span
              style={{
                display: 'block',
                width: i === current ? 18 : 5,
                height: 5,
                borderRadius: 999,
                background: i === current ? mp.accent : 'hsl(var(--muted-foreground) / 0.25)',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </button>
        ))}
      </div>

      {/* Marketplace label */}
      <p className="text-center text-[11px] text-muted-foreground/60 font-medium tracking-wide -mt-1">
        {mp.name} · swipe to explore
      </p>

      {/* Glow under mockup */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full pointer-events-none transition-all duration-500"
        style={{ background: `radial-gradient(ellipse, ${mp.accent}55, transparent)`, filter: 'blur(12px)' }}
      />
    </div>
  );
};

export default MarketplaceMockup;
