import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  Code, 
  Zap, 
  BarChart3, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Target,
  MessageSquareQuote,
  ArrowLeft,
  Play,
  Terminal,
  MousePointer2,
  Eye,
  Calculator,
  X,
  BookOpen,
  PenTool,
  Layout,
  LineChart,
  RefreshCw,
  Brain,
  Rocket,
  Bot
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const MarketingAcademy = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Tool 1: Headline Analyzer
  const [headline, setHeadline] = useState("");
  const [analysis, setAnalysis] = useState<{ score: number, trigger: string } | null>(null);

  const analyzeHeadline = () => {
    const triggers = ["Fear of Missing Out", "Curiosity", "Authority", "Social Proof", "Urgency"];
    const score = Math.floor(Math.random() * 40) + 60; // 60-100
    const trigger = triggers[Math.floor(Math.random() * triggers.length)];
    setAnalysis({ score, trigger });
  };

  // Tool 2: ROI Calculator
  const [spend, setSpend] = useState(1000);
  const [cpc, setCpc] = useState(1.5);
  const [conv, setConv] = useState(2);
  const [aov, setAov] = useState(100);

  const clicks = spend / cpc;
  const customers = clicks * (conv / 100);
  const revenue = customers * aov;
  const roas = revenue / spend;

  // Tool 3: SEO Preview
  const [seoTitle, setSeoTitle] = useState("The Ultimate Guide to Marketing Psychology");
  const [seoDesc, setSeoDesc] = useState("Learn how to master the art of persuasion and storytelling to scale your brand globally.");

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-brand-accent selection:text-black">
      {/* Exit Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-[100] p-4 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-xl transition-all border border-white/10 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Hero Section - Editorial Style */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-white/60">
              Мастер-класси интерактивӣ
            </span>
            <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase mb-8">
              Психологияи <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Маркетинг
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-medium leading-relaxed mb-12">
              Санъати боварибахширо аз худ кунед. Аз асбобҳои интерактивии мо дар зер истифода баред, то сарлавҳаҳои худро санҷед, ROI-ро ҳисоб кунед ва SEO-и худро оптимизатсия кунед.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                Оғози омӯзиш
              </button>
              <button 
                onClick={() => {
                  setActiveTool('roi');
                  document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-12 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Calculator className="w-5 h-5" /> Ҳисобкунаки ROI
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1 cursor-pointer" onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Core Skill: Copywriting System */}
      <section className="py-32 px-4 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-xs mb-4 block">Бунёд</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Системаи <br />
              <span className="text-white/20">Копирайтинг</span>
            </h2>
            <p className="text-xl text-white/60 font-medium leading-relaxed">
              Ин бунёди шумо барои ҳар як кори маркетингӣ мебошад. Чаҳорчӯбаҳоеро, ки амалро бармеангезанд, аз худ кунед.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h4 className="text-brand-accent font-black mb-2">AIDA</h4>
              <p className="text-xs text-white/40 uppercase tracking-widest">Диққат → Шавқ → Хоҳиш → Амал</p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h4 className="text-brand-accent font-black mb-2">PAS</h4>
              <p className="text-xs text-white/40 uppercase tracking-widest">Мушкилот → Ташвиқ → Ҳал</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: "Сарлавҳаи равшан", desc: "Диққатро дар камтар аз 3 сония ҷалб мекунад." },
            { title: "Тамаркуз ба фоида", desc: "Натиҷаро фурӯшед, на хусусиятҳоро." },
            { title: "Омода барои мобилӣ", desc: "Параграфҳои кӯтоҳ барои хондани осон." },
            { title: "Даъват ба амали қавӣ", desc: "Як даъвати равшан ва ягона ба амал." }
          ].map((item) => (
            <div key={item.title} className="p-8 bg-zinc-900/50 rounded-3xl border border-white/5">
              <CheckCircle2 className="w-6 h-6 text-brand-accent mb-6" />
              <h5 className="font-black uppercase tracking-tight mb-2">{item.title}</h5>
              <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* New Masterclass Links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-brand-accent text-black rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer"
            onClick={() => navigate('/strategy')}
          >
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 bg-black/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Мастер-класси нав</span>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                Ба ниёзҳои онҳо посух диҳед: <br /> Психологияи конверсия
              </h3>
              <p className="text-lg font-bold opacity-70">
                Омӯзиши амиқи нуқтаҳои дард, роҳҳои ҳал ва копирайтинги барои UX оптимизатсияшуда.
              </p>
            </div>
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
              <ArrowRight className="w-8 h-8" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-12 bg-zinc-900 border border-white/10 text-white rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer hover:bg-zinc-800 transition-colors"
            onClick={() => navigate('/algorithm')}
          >
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 bg-brand-accent/20 border border-brand-accent/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 text-brand-accent">Протоколи пешрафта</span>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                Алгоритми <br /> Фурӯш
              </h3>
              <p className="text-lg font-bold text-white/40">
                Чаҳорчӯбаи муайян барои муҳандисии воронкаҳои фурӯши дорои конверсияи баланд.
              </p>
            </div>
            <div className="w-20 h-20 bg-brand-accent text-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
              <ArrowRight className="w-8 h-8" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-12 bg-white text-black rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer hover:bg-slate-50 transition-colors lg:col-span-2"
            onClick={() => navigate('/tech-showcase')}
          >
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 bg-brand-accent/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 text-brand-accent">Маркетинги таҷҳизот</span>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                Намоиши технологӣ: <br /> Компютер, Лаптоп ва Мобилӣ
              </h3>
              <p className="text-lg font-bold opacity-70">
                Санъати фурӯши таҷҳизоти гаронбаҳоро бо мавқеъгирии премиум аз худ кунед.
              </p>
            </div>
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
              <ArrowRight className="w-8 h-8" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-12 bg-blue-600 text-white rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer hover:bg-blue-500 transition-colors lg:col-span-2"
            onClick={() => navigate('/dart-academy')}
          >
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Забони Барномасозӣ</span>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                Мастер-класси Dart: <br /> Ояндаи Веб ва Мобилӣ
              </h3>
              <p className="text-lg font-bold opacity-70">
                Омӯзиши забони Dart барои сохтани барномаҳои баландсифат бо Flutter.
              </p>
            </div>
            <div className="w-20 h-20 bg-white text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
              <ArrowRight className="w-8 h-8" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Writing Stack */}
      <section className="py-32 px-4 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">Маҷмӯи навиштан</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Асбобҳои маркетинги сатҳи баланд</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { category: "Лоиҳакашӣ", tools: ["Google Docs", "Notion"], icon: <PenTool className="w-6 h-6" />, details: "Навиштани асосӣ, ғояҳо" },
              { category: "Реклама", tools: ["Google Ads", "Meta Ads"], icon: <Zap className="w-6 h-6" />, details: "Ҷустуҷӯ, Дисплей, Шабакаҳои иҷтимоӣ" },
              { category: "Почтаи электронӣ", tools: ["Mailchimp", "Klaviyo"], icon: <BookOpen className="w-6 h-6" />, details: "Бюллетенҳо, Воронкаҳо, Автоматизатсия" },
              { category: "Веб", tools: ["WordPress", "Shopify"], icon: <Layout className="w-6 h-6" />, details: "Мағозаҳои онлайни чандир" },
              { category: "Аналитика", tools: ["GA4", "Hotjar"], icon: <LineChart className="w-6 h-6" />, details: "Натиҷаҳо, Рафтор" }
            ].map((stack) => (
              <div key={stack.category} className="p-8 border border-slate-100 rounded-3xl hover:border-blue-600 transition-colors group">
                <div className="mb-8 text-slate-300 group-hover:text-blue-600 transition-colors">
                  {stack.icon}
                </div>
                <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-slate-400">{stack.category}</h4>
                <ul className="space-y-3 mb-6">
                  {stack.tools.map(tool => (
                    <li key={tool} className="font-bold text-lg">{tool}</li>
                  ))}
                </ul>
                {stack.details && (
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-t border-slate-100 pt-4">
                    {stack.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical & Content Types */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-12">Асосҳои техникӣ</h3>
            <div className="space-y-8">
              {[
                { title: "Асосҳои HTML", desc: "Сохтори сарлавҳаҳо, тугмаҳо ва истинодҳо." },
                { title: "Асосҳои SEO", desc: "Калимаҳои калидӣ, мета-сарлавҳаҳо ва қобилияти ҷустуҷӯ." },
                { title: "Саҳифаҳои фуруд", desc: "Фаҳмидани сохтори ба конверсия нигаронидашуда." }
              ].map(skill => (
                <div key={skill.title} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Code className="w-5 h-5 text-white/40" />
                  </div>
                  <div>
                    <h5 className="font-black uppercase tracking-tight mb-1">{skill.title}</h5>
                    <p className="text-white/40 text-sm leading-relaxed">{skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-12">Маҳорати муҳтаво</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Google/Meta Ads",
                "Email Sequences",
                "Landing Pages",
                "Тавсифи маҳсулот",
                "Постҳо дар шабакаҳои иҷтимоӣ",
                "Саҳифаҳои фурӯш"
              ].map(type => (
                <div key={type} className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl font-bold text-sm">
                  {type}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Daily Workflow */}
      <section className="py-32 px-4 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85]">
              Ҷараёни кори <br />
              <span className="text-white/20">Ҳаррӯза</span>
            </h2>
            <p className="max-w-md text-white/40 font-medium">Системаи воқеӣ барои натиҷаҳои доимии маркетинг.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { step: "01", title: "Тадқиқот", desc: "Аудитория ва рақибон" },
              { step: "02", title: "Лоиҳа", desc: "Тамаркуз ба Google Docs" },
              { step: "03", title: "Таҳрир", desc: "Татбиқи AIDA/PAS" },
              { step: "04", title: "Нашр", desc: "Реклама, Почтаҳо, Веб" },
              { step: "05", title: "Пайгирӣ", desc: "Google Analytics" },
              { step: "06", title: "Оптимизатсия", desc: "Беҳтар кардани қисмҳои заиф" }
            ].map((item) => (
              <div key={item.step} className="p-8 bg-black/40 border border-white/5 rounded-[2rem] relative group overflow-hidden">
                <span className="text-4xl font-black text-white/5 absolute -top-2 -right-2 group-hover:text-brand-accent/10 transition-colors">{item.step}</span>
                <RefreshCw className="w-5 h-5 text-brand-accent mb-6 opacity-40" />
                <h5 className="font-black uppercase tracking-tight mb-2">{item.title}</h5>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes You High-Level */}
      <section className="py-32 px-4 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <Brain className="w-16 h-16 text-brand-accent mx-auto mb-12 animate-pulse" />
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-12">
            Чӣ шуморо <br />
            <span className="text-brand-accent">"Сатҳи баланд"</span> месозад
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Психология", desc: "Фаҳмидани рафтори инсон нисбат ба асбобҳои техникӣ." },
              { title: "Бовар кунондан", desc: "Навиштани матне, ки ҳам равшан ва ҳам ҷолиб аст." },
              { title: "Итератсия", desc: "Санҷиши доимӣ ва такмил дар асоси маълумот." }
            ].map(item => (
              <div key={item.title} className="p-10 bg-zinc-900/50 border border-white/5 rounded-[2.5rem]">
                <h4 className="text-xl font-black uppercase mb-4">{item.title}</h4>
                <p className="text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Starter Setup */}
      <section className="py-32 px-4 bg-brand-accent text-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Танзимоти <br />
              Ибтидоӣ
            </h2>
            <p className="text-xl font-bold leading-relaxed opacity-70">
              Агар шумо имрӯз оғоз кунед, танҳо аз ҳамин истифода баред. Ин барои оғози кори касбӣ кофӣ аст.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            {[
              { name: "Google Docs", icon: <PenTool className="w-5 h-5" /> },
              { name: "Meta Ads", icon: <Zap className="w-5 h-5" /> },
              { name: "Mailchimp", icon: <BookOpen className="w-5 h-5" /> },
              { name: "Analytics", icon: <LineChart className="w-5 h-5" /> }
            ].map(item => (
              <div key={item.name} className="p-8 bg-black/5 border border-black/10 rounded-3xl flex flex-col items-center justify-center gap-4 text-center">
                {item.icon}
                <span className="font-black uppercase tracking-widest text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}

      <section id="curriculum" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">Лаборатория</h2>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Функсияҳои маркетинги интерактивӣ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tool 1: Headline Analyzer */}
          <motion.div 
            whileHover={{ y: -5 }}
            animate={{ 
              borderColor: activeTool === 'headline' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.05)',
              backgroundColor: activeTool === 'headline' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(24, 24, 27, 0.5)'
            }}
            onClick={() => setActiveTool('headline')}
            className="bg-zinc-900/50 border rounded-[2.5rem] p-10 flex flex-col cursor-pointer transition-colors"
          >
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Таҳлилгари сарлавҳа</h3>
            <p className="text-white/40 text-sm mb-8 leading-relaxed">Таъсири эмотсионалӣ ва холи боварибахшии матни маркетингии худро санҷед.</p>
            
            <div className="space-y-4 mt-auto" onClick={(e) => e.stopPropagation()}>
              <input 
                type="text" 
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Сарлавҳаро ворид кунед..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <button 
                onClick={analyzeHeadline}
                className="w-full py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-blue-500 transition-colors"
              >
                Таҳлили таъсир
              </button>
              
              <AnimatePresence>
                {analysis && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-4 border-t border-white/5"
                  >
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Холи қудрат</span>
                      <span className="text-2xl font-black text-blue-400">{analysis.score}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${analysis.score}%` }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                    <p className="text-xs font-bold text-white/60 italic">Триггери асосӣ: <span className="text-white">{analysis.trigger}</span></p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Tool 2: ROI Simulator */}
          <motion.div 
            whileHover={{ y: -5 }}
            animate={{ 
              borderColor: activeTool === 'roi' ? 'rgba(34, 197, 94, 0.5)' : 'rgba(255, 255, 255, 0.05)',
              backgroundColor: activeTool === 'roi' ? 'rgba(34, 197, 94, 0.05)' : 'rgba(24, 24, 27, 0.5)'
            }}
            onClick={() => setActiveTool('roi')}
            className="bg-zinc-900/50 border rounded-[2.5rem] p-10 flex flex-col cursor-pointer transition-colors"
          >
            <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400 mb-8">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Симулятори ROI</h3>
            <p className="text-white/40 text-sm mb-8 leading-relaxed">Даромади пешбинишуда ва ROAS-и худро дар асоси хароҷоти реклама ва конверсия ҳисоб кунед.</p>
            
            <div className="space-y-6 mt-auto" onClick={(e) => e.stopPropagation()}>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                  <span>Хароҷоти реклама</span>
                  <span>${spend.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="500" max="10000" step="500"
                  value={spend} onChange={(e) => setSpend(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-green-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Даромад</p>
                  <p className="text-xl font-black text-green-400">${Math.round(revenue).toLocaleString()}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">ROAS</p>
                  <p className="text-xl font-black text-white">{roas.toFixed(1)}x</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tool 3: SEO Previewer */}
          <motion.div 
            whileHover={{ y: -5 }}
            animate={{ 
              borderColor: activeTool === 'seo' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(255, 255, 255, 0.05)',
              backgroundColor: activeTool === 'seo' ? 'rgba(168, 85, 247, 0.05)' : 'rgba(24, 24, 27, 0.5)'
            }}
            onClick={() => setActiveTool('seo')}
            className="bg-zinc-900/50 border rounded-[2.5rem] p-10 flex flex-col cursor-pointer transition-colors"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-8">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Пешнамоиши SERP</h3>
            <p className="text-white/40 text-sm mb-8 leading-relaxed">Бубинед, ки саҳифаи шумо дар натиҷаҳои ҷустуҷӯ чӣ гуна намоён мешавад, то CTR-ро ба ҳадди аксар расонед.</p>
            
            <div className="space-y-4 mt-auto" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white p-6 rounded-2xl shadow-xl">
                <p className="text-[#1a0dab] text-lg font-medium hover:underline cursor-pointer truncate mb-1">{seoTitle}</p>
                <p className="text-[#006621] text-sm mb-1 truncate">https://khabbllo.com/academy › psychology</p>
                <p className="text-[#4d5156] text-xs line-clamp-2">{seoDesc}</p>
              </div>
              
              <div className="space-y-2 pt-4">
                <input 
                  type="text" 
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:outline-none"
                  placeholder="Сарлавҳаи SEO"
                />
                <textarea 
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:outline-none resize-none"
                  rows={2}
                  placeholder="Тавсифи мета"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Line - Call to Action */}
      <section className="py-40 px-4 text-center bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <MessageSquareQuote className="w-16 h-16 text-brand-accent mx-auto mb-12 opacity-50" />
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-12 leading-tight">
            Хулоса: <br />
            <span className="text-white/40 italic font-serif normal-case tracking-normal">Психологияро аз синтаксис болотар гузоред.</span>
          </h2>
          <div className="inline-flex flex-col items-start gap-6 text-left bg-black/40 p-12 rounded-[3rem] border border-white/5">
            <p className="text-white/60 text-xl font-medium">Барои сохтани матни маркетингии сатҳи баланд, афзалият диҳед:</p>
            <ul className="space-y-4">
              {[
                "Копирайтинг бо забони аудиторияи шумо",
                "Асосҳои HTML барои сохтор",
                "Фаҳмидани психологияи маркетинг",
                "Аз худ кардани асбобҳо ва платформаҳо"
              ].map(item => (
                <li key={item} className="flex items-center gap-4 text-lg font-bold">
                  <div className="w-2 h-2 bg-brand-accent rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 w-full mt-8">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex-1 py-6 bg-brand-accent text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4"
              >
                Ба Академия ҳамроҳ шавед <ArrowRight className="w-6 h-6" />
              </button>
              <Link 
                to="/chat"
                className="flex-1 py-6 bg-white/5 text-white border border-white/10 font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-4"
              >
                <Bot className="w-6 h-6 text-brand-accent" /> Маркази фармондеҳии AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <div className="py-12 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
        Академияи маркетинги Khabbllo • © 2026
      </div>
    </div>
  );
};

export default MarketingAcademy;
