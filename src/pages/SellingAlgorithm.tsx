import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  MousePointer2, 
  BarChart3, 
  Brain,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  Activity,
  Layers,
  Fingerprint
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const SellingAlgorithm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const algorithmSteps = [
    {
      id: "01",
      title: "Қатъи намуна",
      subtitle: "Қалмоқ",
      icon: <Zap className="w-6 h-6" />,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      description: "Бо вайрон кардани интизориҳо ҳаракатро боздоред. Контрасти визуалӣ ё матниро истифода баред, то ритми зеришуурии корбарро вайрон кунед.",
      metrics: ["CTR (Сатҳи кликҳо)", "Сатҳи таваққуфи ангушт"],
      tactics: ["Рӯйхатҳои рақамҳои тоқ", "Фазои манфӣ", "Изҳороти мухолиф"]
    },
    {
      id: "02",
      title: "Ҳалқаи дофамин",
      subtitle: "Ҷалбкунӣ",
      icon: <Activity className="w-6 h-6" />,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      description: "Диққати корбарро бо арзиши фаврӣ мукофот диҳед. Микро-мундариҷаро истифода баред, то эҳсоси пешрафт ва кашфро эҷод кунед.",
      metrics: ["Вақти миёнаи тамошо", "Умқи ҳаракат"],
      tactics: ["Ғалабаҳои зуд", "Викторинаҳои интерактивӣ", "Ҳалқаҳои қиссаҳо"]
    },
    {
      id: "03",
      title: "Пули мантиқӣ",
      subtitle: "Ҳал",
      icon: <Layers className="w-6 h-6" />,
      color: "text-brand-accent",
      bg: "bg-brand-accent/10",
      description: "Хоҳиши эҳсосиро ба ҳалли мантиқӣ пайваст кунед. Гузариш аз 'Ман инро мехоҳам' ба 'Ин ба ман лозим аст, зеро...'",
      metrics: ["Сатҳи илова ба сабад", "Сифати лидҳо"],
      tactics: ["Ҷадвалҳои муқоисавӣ", "Омӯзиши мисолҳо", "Симулятсияҳои ROI"]
    },
    {
      id: "04",
      title: "Анҷоми бемамониат",
      subtitle: "Фурӯш",
      icon: <Fingerprint className="w-6 h-6" />,
      color: "text-green-400",
      bg: "bg-green-400/10",
      description: "Ҳама монеаҳои имконпазирро барои амали ниҳоӣ бартараф кунед. Сарбории маърифатиро кам кунед ва амнияти даркшударо ба ҳадди аксар расонед.",
      metrics: ["Сатҳи конверсия", "Арзиши ҷалби муштарӣ"],
      tactics: ["Пардохт бо як клик", "Исботи иҷтимоӣ", "Кафолатҳои бидуни хатар"]
    }
  ];

  // Interactive Calculator State
  const [traffic, setTraffic] = useState(10000);
  const [hookRate, setHookRate] = useState(5); // %
  const [convRate, setConvRate] = useState(2); // %
  const [price, setPrice] = useState(99);

  const potentialSales = Math.round(traffic * (hookRate / 100) * (convRate / 100));
  const potentialRevenue = potentialSales * price;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-brand-accent selection:text-black font-sans">
      {/* Exit Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-[100] p-4 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-xl transition-all border border-white/10 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Hero - Technical/Brutalist Style */}
      <section className="relative pt-32 pb-20 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                Системаи v2.4 // Протоколи фурӯш
              </span>
              <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase mb-8">
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">
                  Алгоритм
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/40 font-medium leading-relaxed max-w-2xl">
                Чаҳорчӯбаи муайян барои тиҷорати дорои конверсияи баланд. Аз "фарзияҳо" гузаред ва ба тарҳрезии воронкаи фурӯши худ шурӯъ кунед.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="p-8 border border-white/10 rounded-3xl bg-zinc-900/50 backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Ҳолати муҳаррик: Оптимизатсияшуда</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between gap-12">
                    <span className="text-xs text-white/40 uppercase font-bold">Таъхир</span>
                    <span className="text-xs font-mono">14ms</span>
                  </div>
                  <div className="flex justify-between gap-12">
                    <span className="text-xs text-white/40 uppercase font-bold">Қобилияти гузариш</span>
                    <span className="text-xs font-mono">1.2M req/s</span>
                  </div>
                  <div className="flex justify-between gap-12">
                    <span className="text-xs text-white/40 uppercase font-bold">Самаранокӣ</span>
                    <span className="text-xs font-mono text-brand-accent">99.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Algorithm Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-[2.5rem] overflow-hidden">
            {algorithmSteps.map((step, idx) => (
              <div 
                key={step.id}
                onMouseEnter={() => setActiveStep(idx)}
                className={`p-10 bg-zinc-900 transition-all duration-500 cursor-pointer group ${activeStep === idx ? "bg-zinc-800" : "hover:bg-zinc-800/50"}`}
              >
                <div className="flex justify-between items-start mb-12">
                  <span className={`text-4xl font-black opacity-20 group-hover:opacity-100 transition-opacity ${step.color}`}>{step.id}</span>
                  <div className={`p-3 rounded-2xl ${step.bg} ${step.color}`}>
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{step.title}</h3>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${step.color}`}>{step.subtitle}</p>
                <p className="text-sm text-white/40 leading-relaxed mb-8">
                  {step.description}
                </p>
                <div className="space-y-2">
                  {step.metrics.map(m => (
                    <div key={m} className="flex items-center gap-2 text-[10px] font-bold text-white/60 uppercase tracking-widest">
                      <div className={`w-1 h-1 rounded-full ${step.color.replace('text', 'bg')}`} />
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-xs mb-4 block">Лабораторияи симулятсия</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
              Моделсозии <br /> пешгӯишаванда
            </h2>
            <p className="text-xl text-white/40 leading-relaxed mb-12">
              Тағйирёбандаҳои алгоритми фурӯши худро танзим кунед, то таъсири пешбинишударо ба фоидаи ниҳоии худ бубинед.
            </p>

            <div className="space-y-10">
              {/* Traffic Input */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Трафики моҳона</label>
                  <span className="text-2xl font-black font-mono">{traffic.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="1000" max="100000" step="1000"
                  value={traffic} onChange={(e) => setTraffic(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-brand-accent"
                />
              </div>

              {/* Hook Rate Input */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Сатҳи қалмоқ (CTR)</label>
                  <span className="text-2xl font-black font-mono text-blue-400">{hookRate}%</span>
                </div>
                <input 
                  type="range" min="1" max="20" step="0.5"
                  value={hookRate} onChange={(e) => setHookRate(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-400"
                />
              </div>

              {/* Conversion Rate Input */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Сатҳи ниҳоии конверсия</label>
                  <span className="text-2xl font-black font-mono text-green-400">{convRate}%</span>
                </div>
                <input 
                  type="range" min="0.1" max="10" step="0.1"
                  value={convRate} onChange={(e) => setConvRate(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-green-400"
                />
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="relative">
            <div className="absolute inset-0 bg-brand-accent/20 blur-[100px] rounded-full animate-pulse" />
            <div className="relative p-12 bg-zinc-900 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <Brain className="w-12 h-12 text-white/5" />
              </div>
              
              <div className="space-y-12">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Фурӯши пешбинишудаи моҳона</p>
                  <h4 className="text-7xl font-black tracking-tighter">{potentialSales.toLocaleString()}</h4>
                  <p className="text-sm text-white/40 mt-2">Воҳидҳои фурӯхташуда дар як моҳ</p>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Даромади пешбинишуда</p>
                  <h4 className="text-7xl font-black tracking-tighter text-brand-accent">${potentialRevenue.toLocaleString()}</h4>
                  <p className="text-sm text-white/40 mt-2">Даромади умумии моҳона</p>
                </div>

                <Link 
                  to="/chat"
                  className="w-full py-6 bg-white text-black font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all"
                >
                  Ин воронкаро оптимизатсия кунед <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Tactic Matrix */}
      <section className="py-32 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6">Матритсаи тактика</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Қабати иҷро // Компонентҳои дорои конверсияи баланд</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 border border-slate-100 rounded-[3rem] overflow-hidden">
            {[
              { 
                title: "Триггерҳои визуалӣ", 
                items: ["Тасвирҳои дорои контрасти баланд", "Графикаи ҳаракаткунанда", "Чеҳраҳои одамон", "Ишораҳои самтӣ"],
                icon: <Target className="w-6 h-6" />
              },
              { 
                title: "Фишангҳои психологӣ", 
                items: ["Камёбӣ (Вақти маҳдуд)", "Исботи иҷтимоӣ (Шарҳҳо)", "Авторитет (Маҳорат)", "Мутақобила (Арзиши ройгон)"],
                icon: <Brain className="w-6 h-6" />
              },
              { 
                title: "Камкунандагони монеаҳо", 
                items: ["Пардохтҳои яккликӣ", "Нишондиҳандаҳои пешрафт", "Кафолатҳои равшан", "Дастгирии фаврӣ"],
                icon: <ShieldCheck className="w-6 h-6" />
              }
            ].map((matrix, i) => (
              <div key={i} className="p-12 bg-white group hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-accent group-hover:text-white transition-all">
                  {matrix.icon}
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-8">{matrix.title}</h4>
                <ul className="space-y-4">
                  {matrix.items.map(item => (
                    <li key={item} className="flex items-center gap-4 font-bold text-slate-600">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <RefreshCw className="w-16 h-16 text-brand-accent mx-auto mb-12 animate-spin-slow" />
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-12 leading-[0.85]">
            Такрор кунед. <br /> <span className="text-brand-accent">Миқёс гиред.</span> <br /> Ҳукмронӣ кунед.
          </h2>
          <p className="text-2xl text-white/40 font-medium leading-relaxed mb-16 italic font-serif">
            "Алгоритм ҳеҷ гоҳ ба охир намерасад. Ин як системаи зинда аст, ки вуруди доимии маълумот ва такмилро талаб мекунад."
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/academy"
              className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all"
            >
              Бозгашт ба Академия
            </Link>
            <Link 
              to="/chat"
              className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Brain className="w-5 h-5 text-brand-accent" /> Машварат бо AI
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <div className="py-12 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
        Khabbllo Selling Algorithm • © 2026
      </div>
    </div>
  );
};

export default SellingAlgorithm;
