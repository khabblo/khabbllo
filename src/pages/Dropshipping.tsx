import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Package, 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  Plus, 
  Search, 
  Filter,
  ExternalLink,
  Zap,
  DollarSign,
  Globe,
  BarChart3,
  Truck,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Loader2,
  AlertCircle
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { useDropshipping } from "../hooks/useDropshipping";

const DropshippingHub = () => {
  const { products, salesData, aiInsights, suppliers, loading, error } = useDropshipping();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'suppliers' | 'ai'>('dashboard');
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-brand-accent animate-spin mx-auto mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Боркунии маълумот...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-3xl max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-black mb-2">Хатогӣ</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-500 text-white rounded-xl font-bold">Дубора кӯшиш кунед</button>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Даромади умумӣ", value: "$12,450", icon: DollarSign, trend: "+12.5%", color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Фармоишҳо", value: "673", icon: ShoppingCart, trend: "+8.2%", color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Маҳсулоти фаъол", value: products.length.toString(), icon: Package, trend: "0%", color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Ташрифҳо", value: "15.2K", icon: Users, trend: "+24.1%", color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Professional Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">Khabllo Dropshipping Command Center</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              System <span className="text-brand-accent">Hub</span>
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3">
              <Globe className="w-4 h-4 text-blue-400" />
              Пайваст кардани мағоза
            </button>
            <button className="px-8 py-4 bg-brand-accent text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(242,125,38,0.3)] flex items-center gap-3 hover:scale-105 active:scale-95">
              <Plus className="w-4 h-4" />
              Иловаи маҳсулот
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 mb-12 w-fit">
          {[
            { id: 'dashboard', label: 'Панел', icon: BarChart3 },
            { id: 'products', label: 'Маҳсулот', icon: Package },
            { id: 'suppliers', label: 'Таъминкунандагон', icon: Truck },
            { id: 'ai', label: 'AI Insights', icon: Sparkles },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === tab.id ? "bg-brand-accent text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on Active Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-sm relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:scale-150 transition-transform duration-700 ${stat.color}`}>
                      <stat.icon className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-black px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>
                          {stat.trend}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black mb-2">{stat.label}</p>
                      <h3 className="text-4xl font-black tracking-tighter">{stat.value}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-8 bg-white/5 border border-white/10 rounded-[3rem]">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black uppercase tracking-tight">Динамикаи фурӯш</h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold">7 рӯз</button>
                      <button className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-500">30 рӯз</button>
                    </div>
                  </div>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f27d26" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f27d26" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="date" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '16px' }}
                          itemStyle={{ color: '#fff', fontSize: '12px' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#f27d26" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="p-8 bg-white/5 border border-white/10 rounded-[3rem]">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-8">Маҳсулоти Top</h3>
                  <div className="space-y-6">
                    {products.slice(0, 4).map((p, i) => (
                      <div key={p.id} className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold truncate">{p.name}</h4>
                          <p className="text-[10px] text-slate-500 uppercase font-black">{p.sales} фурӯш</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-brand-accent">${p.price}</p>
                          <p className="text-[10px] text-green-500 font-bold">ROI: { (p.price/p.cost).toFixed(1) }x</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Ҳамаи маҳсулот
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Ҷустуҷӯи маҳсулот..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-brand-accent/50 transition-all"
                  />
                </div>
                <div className="flex gap-3">
                  <button className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                    <Filter className="w-5 h-5 text-slate-400" />
                  </button>
                  <select className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none">
                    <option>Ҳамаи категорияҳо</option>
                    <option>Electronics</option>
                    <option>Smart Home</option>
                    <option>Audio</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {products
                  .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ x: 10 }}
                    className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col md:flex-row items-center gap-8 group"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <h4 className="font-black text-xl">{product.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${product.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                          {product.status === 'active' ? 'Фаъол' : 'Кам мондааст'}
                        </span>
                      </div>
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Globe className="w-3 h-3" /> {product.supplier}</span>
                        <span className="flex items-center gap-2"><ShoppingCart className="w-3 h-3" /> {product.sales} фурӯш</span>
                        <span className="flex items-center gap-2"><BarChart3 className="w-3 h-3" /> {product.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-12">
                      <div className="text-right">
                        <p className="text-2xl font-black text-brand-accent">${product.price}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-black">Маржа: ${product.profit.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-4 bg-white/5 rounded-2xl hover:bg-brand-accent hover:text-white transition-all border border-white/10">
                          <ExternalLink className="w-5 h-5" />
                        </button>
                        <button className="p-4 bg-white/5 rounded-2xl hover:bg-blue-500 hover:text-white transition-all border border-white/10">
                          <ArrowUpRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'suppliers' && (
            <motion.div
              key="suppliers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {suppliers.map((supplier) => (
                <div key={supplier.id} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                      <Truck className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-500 mb-1">
                        <Sparkles className="w-4 h-4 fill-current" />
                        <span className="font-black text-sm">{supplier.rating}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-black uppercase">Рейтинг</p>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black mb-6">{supplier.name}</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Эътимоднокӣ</span>
                      <span className="font-bold text-green-500">{supplier.reliability}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${supplier.reliability}%` }} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Вақти интиқол</span>
                      <span className="font-bold">{supplier.shippingTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Маҳсулоти фаъол</span>
                      <span className="font-bold">{supplier.activeProducts}</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    Тамос бо таъминкунанда
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {aiInsights.map((insight) => (
                <div key={insight.id} className="p-10 bg-brand-accent/5 border border-brand-accent/20 rounded-[3rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-700">
                    <Zap className="w-32 h-32 text-brand-accent fill-brand-accent" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-brand-accent rounded-2xl shadow-lg shadow-brand-accent/20">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">Winning Product Alert</span>
                        <h3 className="text-3xl font-black tracking-tighter">{insight.productName}</h3>
                      </div>
                    </div>

                    <div className="p-6 bg-black/40 rounded-3xl border border-white/5 mb-8">
                      <p className="text-sm text-slate-300 leading-relaxed italic">
                        "{insight.reason}"
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-10">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-black mb-2">Trend Score</p>
                        <p className="text-2xl font-black text-brand-accent">{insight.trendScore}/100</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-black mb-2">ROI Potential</p>
                        <p className="text-2xl font-black text-green-500">{insight.potentialROI}x</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-black mb-2">Source</p>
                        <p className="text-2xl font-black text-blue-400">{insight.source}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button className="flex-1 py-5 bg-brand-accent text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-brand-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        Илова ба мағоза
                      </button>
                      <button className="px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        Таҳлили пурра
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Info */}
        <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
              <ShieldCheck className="w-6 h-6 text-brand-accent" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-tight">Khabllo Secure Sync</p>
              <p className="text-[10px] text-slate-500 font-bold">Ҳамаи маълумот бо таъминкунандагон ҳамоҳанг карда шудааст.</p>
            </div>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-brand-accent transition-colors">API Documentation</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Supplier Portal</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropshippingHub;
