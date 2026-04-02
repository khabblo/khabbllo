import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  Filter,
  Download,
  LogOut,
  Sparkles,
  MessageSquare,
  PenTool,
  Star,
  ShoppingBag,
  CreditCard
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";
import { useAuth } from "../lib/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [aiInsight, setAiInsight] = useState<{ title: string; body: string } | null>(null);
  const [isInsightLoading, setIsInsightLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<"online" | "offline" | "checking">("checking");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchAiInsight();
      checkServerHealth();
    }
  }, [user, navigate]);

  const checkServerHealth = async () => {
    try {
      const res = await fetch("/api/health");
      if (res.ok) setServerStatus("online");
      else setServerStatus("offline");
    } catch (err) {
      setServerStatus("offline");
    }
  };

  const fetchAiInsight = async () => {
    setIsInsightLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: "Generate a single, high-impact conversion optimization recommendation for a high-growth brand. Format as JSON with 'title' and 'body' fields. The body should be 2-3 sentences max and include a specific hypothetical revenue lift or percentage improvement." }] }],
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are Khabbllo AI. You provide data-driven conversion insights."
        }
      });
      
      const insight = JSON.parse(response.text || "{}");
      setAiInsight(insight);
    } catch (error) {
      console.error("Failed to fetch AI insight:", error);
      setAiInsight({
        title: "Оптимизатсияи раванди пардохт",
        body: "СИ-и мо коҳиши 14%-ро дар қадами интихоби интиқол барои корбарони мобилӣ муайян кард. Татбиқи хосияти 'Интиқол бо як клик' метавонад тақрибан $12,400 даромади моҳонаро барқарор кунад."
      });
    } finally {
      setIsInsightLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-sans">
      {/* Sidebar / Navigation */}
      <nav className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-black/10 p-6 hidden lg:flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">K</div>
          <span className="text-xl font-display font-extrabold tracking-tighter">Khabbllo</span>
        </div>
        
        <div className="flex flex-col gap-2 flex-1">
          {[
            { icon: BarChart3, label: "Шарҳи умумӣ", active: true, path: "/dashboard" },
            { icon: Users, label: "Табдилдиҳиҳо", path: "/social" },
            { icon: MessageSquare, label: "Чат бо СИ", path: "/chat" },
            { icon: PenTool, label: "Лабораторияи матн", path: "/copy-refiner" },
            { icon: Star, label: "Пости боҳашамат", path: "/luxury-post" },
            { icon: ShoppingBag, label: "Бозор", path: "/marketplace-showcase" },
            { icon: CreditCard, label: "KhabblloPay", path: "/pay" },
            { icon: Zap, label: "Маълумоти СИ", path: "/dashboard" },
            { icon: ShieldCheck, label: "Амният", path: "/settings" },
          ].map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.active ? "bg-black text-white" : "text-brand-muted hover:bg-slate-100"}`}
            >
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
        </div>

        <div className="pt-6 border-t border-black/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-accent font-bold">
              {user.email ? user.email[0].toUpperCase() : "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">{user.email}</p>
              <p className="text-[10px] text-brand-muted uppercase font-bold">Нақшаи Pro</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" /> Баромад
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 md:p-10">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-4">
              Шарҳи <br /> <span className="text-brand-accent">Зеҳнӣ</span>
            </h1>
            <p className="text-sm text-brand-muted font-bold uppercase tracking-widest">Метрикаҳои табдилдиҳӣ дар вақти воқеӣ // v4.0</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input 
                type="text" 
                placeholder="Ҷустуҷӯи метрикаҳо..." 
                className="pl-10 pr-4 py-2.5 rounded-xl bg-white border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
              />
            </div>
            <button className="p-2.5 bg-white border border-black/10 rounded-xl hover:bg-slate-50 transition-all"><Filter className="w-4 h-4" /></button>
            <button className="p-2.5 bg-white border border-black/10 rounded-xl hover:bg-slate-50 transition-all"><Download className="w-4 h-4" /></button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Шумораи умумии табдилдиҳиҳо", value: "12,482", change: "+12.5%", positive: true },
            { label: "Сатҳи табдилдиҳӣ", value: "4.28%", change: "+0.8%", positive: true },
            { label: "Афзоиши даромад", value: "$42,850", change: "+24.1%", positive: true },
            { label: "Сатҳи баромадан", value: "28.4%", change: "-2.4%", positive: false },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-brand-muted mb-2 tracking-widest">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-black tracking-tighter">{stat.value}</h3>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.positive ? "text-green-600" : "text-red-600"}`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Data Table - Recipe 1 Style */}
        <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden mb-10">
          <div className="p-6 border-b border-black/10 flex items-center justify-between">
            <h3 className="text-3xl font-black uppercase tracking-tighter">Рӯйдодҳои охирин</h3>
            <button className="text-xs font-bold text-brand-accent hover:underline">Намоиши ҳамаи ҳисоботҳо</button>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="data-row bg-slate-50 border-b border-black/10">
                <div className="col-header">ID</div>
                <div className="col-header">Муштарӣ</div>
                <div className="col-header">Манбаъ</div>
                <div className="col-header">Арзиш</div>
              </div>
              
              {/* Rows */}
              {[
                { id: "001", name: "Алекс Ҷонсон", source: "Ҷустуҷӯи Google", value: "$124.00" },
                { id: "002", name: "Сара Миллер", source: "Рекламаи Facebook", value: "$89.50" },
                { id: "003", name: "Майкл Чен", source: "Трафики мустақим", value: "$210.00" },
                { id: "004", name: "Эмма Вилсон", source: "Кампанияи почта", value: "$45.00" },
                { id: "005", name: "Давид Браун", source: "Реферал", value: "$156.20" },
                { id: "006", name: "Оливия Дэвис", source: "Instagram", value: "$78.00" },
              ].map((row, idx) => (
                <div key={idx} className="data-row">
                  <div className="data-value text-xs opacity-50">{row.id}</div>
                  <div className="font-bold text-sm">{row.name}</div>
                  <div className="text-sm text-brand-muted">{row.source}</div>
                  <div className="data-value font-bold text-sm text-brand-accent">{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-black text-white p-8 rounded-[2rem] relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-brand-accent mb-6">
                <Zap className="w-5 h-5 fill-brand-accent" />
                <span className="text-xs font-bold uppercase tracking-widest">Тавсияи СИ</span>
              </div>
              {isInsightLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                  <div className="h-4 bg-white/10 rounded w-2/3"></div>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-black tracking-tighter mb-4">{aiInsight?.title || "Оптимизатсияи раванди пардохт"}</h3>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-md">
                    {aiInsight?.body || "СИ-и мо коҳиши 14%-ро дар қадами интихоби интиқол барои корбарони мобилӣ муайян кард. Татбиқи хосияти 'Интиқол бо як клик' метавонад тақрибан $12,400 даромади моҳонаро барқарор кунад."}
                  </p>
                </>
              )}
              <button 
                onClick={fetchAiInsight}
                className="bg-white text-black text-sm font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2"
              >
                {isInsightLoading ? "Таҳлил..." : "Аз нав тавлид кардани маълумот"} <Sparkles className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          <div className="bg-white p-8 rounded-[2rem] border border-black/10 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Саломатии система</h3>
              <p className="text-xs text-brand-muted mb-6">
                {serverStatus === "online" ? "Ҳама системаҳо фаъоланд." : serverStatus === "offline" ? "Мушкилоти пайвастшавӣ." : "Тафтиши ҳолат..."}
              </p>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className={`h-8 w-1.5 rounded-full ${
                    serverStatus === "online" ? (i > 18 ? "bg-slate-200" : "bg-green-500") : 
                    serverStatus === "offline" ? "bg-red-500 animate-pulse" : "bg-slate-200"
                  }`}></div>
                ))}
              </div>
              <p className="text-[10px] font-bold text-brand-muted text-right">
                {serverStatus === "online" ? "99.9% Вақти корӣ" : "Сервер Хомӯш"}
              </p>
            </div>
            <button 
              onClick={checkServerHealth}
              className="w-full py-3 rounded-xl border border-black/10 text-sm font-bold hover:bg-slate-50 transition-all"
            >
              Навсозии ҳолат
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
