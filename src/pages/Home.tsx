import * as React from "react";
import { useState, FormEvent, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Play, 
  X, 
  BarChart3, 
  Zap, 
  Users, 
  ShieldCheck, 
  Target, 
  Layers, 
  Star, 
  Mail, 
  Phone, 
  MapPin,
  HelpCircle,
  Calculator,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Sparkles,
  LayoutDashboard,
  Diamond,
  Rocket
} from "lucide-react";
import { useAuth } from "../lib/AuthContext";

const ROICalculator = () => {
  const [adSpend, setAdSpend] = useState(5000);
  const [convRate, setConvRate] = useState(2);
  const [avgOrderValue, setAvgOrderValue] = useState(100);

  const currentRevenue = (adSpend / (adSpend / 1000)) * (convRate / 100) * avgOrderValue; // Simplified
  const projectedRevenue = currentRevenue * 1.42; // Assuming 42% lift
  const lift = projectedRevenue - currentRevenue;

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="f-pattern-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6">
              <Calculator className="w-3 h-3" /> Пешгӯии ROI
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tighter leading-tight">
              Таъсирро дар вақти <br />
              <span className="text-brand-accent">воқеӣ бубинед.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Калкулятори моро истифода баред, то афзоиши эҳтимолии даромадро, ки Khabbllo метавонад ба бренди шумо вобаста ба натиҷаҳои миёнаи муштариёни мо оварад, ҳисоб кунед.
            </p>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold">Хароҷоти моҳонаи таблиғот</label>
                  <span className="text-brand-accent font-bold">${adSpend.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="1000" max="100000" step="1000"
                  value={adSpend} onChange={(e) => setAdSpend(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold">Сатҳи кунунии табдилдиҳӣ</label>
                  <span className="text-brand-accent font-bold">{convRate}%</span>
                </div>
                <input 
                  type="range" min="0.1" max="10" step="0.1"
                  value={convRate} onChange={(e) => setConvRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[3rem] backdrop-blur-xl relative z-10">
              <div className="text-center mb-10">
                <p className="text-slate-400 text-sm uppercase font-bold tracking-widest mb-2">Афзоиши тахминии моҳона</p>
                <h3 className="text-5xl md:text-7xl font-black text-brand-accent tracking-tighter">
                  +${Math.round(lift).toLocaleString()}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 text-sm">Даромади пешбинишуда</span>
                  <span className="font-bold text-green-400">${Math.round(projectedRevenue).toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 text-sm">ROI-и пешбинишуда</span>
                  <span className="font-bold">{(projectedRevenue / adSpend * 100).toFixed(0)}%</span>
                </div>
              </div>

              <button className="w-full mt-10 cta-gradient py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-transform">
                Ин рушдро соҳиб шавед
              </button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-accent/20 blur-[120px] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => (
  <section className="py-24 bg-white" id="how-it-works">
    <div className="f-pattern-container">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-accent/10 text-brand-accent mb-6">
          <Zap className="w-8 h-8" />
        </div>
        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tighter">Се қадам ба сӯи бартарӣ.</h2>
        <p className="text-brand-muted text-lg">Мо ҷаҳони мураккаби зеҳни табдилдиҳиро ба як раванди бефосилаи 3-қадамӣ содда кардем.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-24 left-0 w-full h-px bg-slate-100 z-0"></div>
        {[
          { step: "01", title: "Стэки худро пайваст кунед", desc: "Интегратсияи як клик бо Shopify, Stripe ё кассаи фармоишии шумо. Кори таҳиягар лозим нест." },
          { step: "02", title: "Таҳлили соиши СИ", desc: "Муҳаррики мо дар як сессия зиёда аз 1000 нуқтаи маълумотро скан мекунад, то дақиқ муайян кунад, ки шумо дар куҷо пул гум карда истодаед." },
          { step: "03", title: "Афзоиши автоматӣ", desc: "Khabbllo оптимизатсияи интерфейси корбариро дар вақти воқеӣ ҷойгир мекунад, то сабадҳои партофташударо барқарор кунад ва AOV-ро афзоиш диҳад." }
        ].map((item, idx) => (
          <div key={idx} className="relative z-10 text-center">
            <div className="w-20 h-20 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <span className="text-2xl font-black text-brand-accent">{item.step}</span>
            </div>
            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
            <p className="text-brand-muted leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BentoBenefits = () => (
  <section className="py-24 bg-brand-surface" id="features">
    <div className="f-pattern-container">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-accent/10 text-brand-accent mb-6">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tighter">Бартарии зеҳнӣ.</h2>
        <p className="text-brand-muted text-lg">Ҳама чизе, ки ба шумо барои васеъ кардани бренди худ бо дақиқии ҷарроҳӣ лозим аст.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Large Card */}
        <div className="md:col-span-2 bg-white p-10 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden relative group">
          <div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent mb-6"><Zap className="w-6 h-6" /></div>
            <h3 className="text-2xl font-bold mb-4">Муайянкунии соиш дар вақти воқеӣ</h3>
            <p className="text-brand-muted max-w-md">СИ-и мо дақиқ муайян мекунад, ки кай корбар мехоҳад аз сайт барояд ва дахолати фардиро барои нигоҳ доштани онҳо дар воронка оғоз мекунад.</p>
          </div>
          <div className="mt-10 -mb-10 -mr-10 opacity-20 group-hover:opacity-40 transition-opacity">
             <BarChart3 className="w-64 h-64 text-brand-accent" />
          </div>
        </div>

        {/* Small Card */}
        <div className="bg-brand-primary text-white p-10 rounded-[2.5rem] flex flex-col justify-between">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-accent mb-6"><Target className="w-6 h-6" /></div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Ҳадафгирии дақиқ</h3>
            <p className="text-slate-400 text-sm">Корбаронро аз рӯи ният, на танҳо демография, сегмент кунед.</p>
          </div>
        </div>

        {/* Small Card */}
        <div className="bg-white p-10 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent mb-6"><ShieldCheck className="w-6 h-6" /></div>
          <h3 className="text-xl font-bold mb-4">SOC2 Амният</h3>
          <p className="text-brand-muted text-sm">Амнияти сатҳи корхона барои маълумоти муштариёни шумо.</p>
        </div>

        {/* Medium Card */}
        <div className="md:col-span-2 bg-slate-900 text-white p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">Тести А/Б дар автопилот</h3>
            <p className="text-slate-400">Интизории натиҷаҳоро бас кунед. СИ-и мо ҳазорон микро-тестҳоро ҳамзамон мегузаронад, то омезиши ғолибро дар чанд соат, на ҳафтаҳо, пайдо кунад.</p>
          </div>
          <div className="w-full md:w-48 aspect-square bg-brand-accent/20 rounded-3xl flex items-center justify-center border border-white/10">
            <Layers className="w-16 h-16 text-brand-accent" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = [
    { q: "Чӣ қадар вақт лозим аст, то натиҷаҳоро бубинем?", a: "Аксари брендҳо дар давоми 48-72 соати аввали интегратсия афзоиши ченшавандаи сатҳи табдилдиҳиро мушоҳида мекунанд, зеро СИ ба муайян ва бартараф кардани нуқтаҳои соиш оғоз мекунад." },
    { q: "Оё барои насби Khabllo ба ман таҳиягар лозим аст?", a: "Не. Мо интегратсияҳои як кликро барои платформаҳои асосӣ ба монанди Shopify ва BigCommerce пешниҳод мекунем. Барои сайтҳои фармоишӣ, ин насби оддии скрипти яксатра аст." },
    { q: "Оё маълумоти муштариёни ман бехатар аст?", a: "Албатта. Мо ба SOC2 Type II мувофиқат мекунем ва ба GDPR омодаем. Мо ҳеҷ гоҳ PII (Маълумоти шахсии муайяншаванда)-ро нигоҳ намедорем, магар ин ки шумо онро ба таври возеҳ танзим накарда бошед." },
    { q: "Оё ман метавонам Khabbllo-ро бо абзорҳои мавҷудаи тести А/Б-и худ истифода барам?", a: "Бале. Khabbllo барои пурра кардани стэки мавҷудаи шумо тарҳрезӣ шудааст. Он ҳатто метавонад маълумотро аз дигар абзорҳо қабул кунад, то раванди омӯзиши худро суръат бахшад." }
  ];

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="f-pattern-container max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-accent/10 text-brand-accent mb-6">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4 tracking-tighter">Саволҳои зуд-зуд додашаванда</h2>
          <p className="text-brand-muted">Ҳама чизе, ки шумо бояд дар бораи платформа донед.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold">{faq.q}</span>
                {openIdx === idx ? <ChevronUp className="w-5 h-5 text-brand-muted" /> : <ChevronDown className="w-5 h-5 text-brand-muted" />}
              </button>
              {openIdx === idx && (
                <div className="p-6 pt-0 text-brand-muted text-sm leading-relaxed border-t border-slate-50 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DemoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full relative aspect-video shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="w-full h-full flex items-center justify-center bg-slate-900 relative">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-laptop-with-a-blue-screen-42354-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 pointer-events-none">
            <Sparkles className="w-16 h-16 mb-6 text-brand-accent animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center">Khabllo Marketing AI</h2>
            <p className="text-slate-300 text-lg max-w-lg text-center font-medium">
              Бубинед, ки чӣ гуна СИ-и мо маҳсулоти технологӣ ва нархгузории динамикиро дар вақти воқеӣ идора мекунад.
            </p>
            <div className="mt-12 flex gap-4">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest">
                Dynamic Pricing
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest">
                AI Optimization
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // Redirect to login with email pre-filled
      navigate(`/login?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <div className="f-pattern-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-brand-accent uppercase bg-blue-50 rounded-full border border-blue-100">
              Қабати зеҳнӣ барои брендҳои босуръат рушдёбанда
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight mb-8">
              Khabllo — <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-indigo-500">
                Ояндаи тиҷорати рақамӣ
              </span>
            </h1>
            <p className="text-xl text-brand-muted mb-10 max-w-2xl mx-auto leading-relaxed">
              Khabllo ЗС-и хусусии худро барои муайян кардани монеаҳои табдилдиҳӣ дар вақти воқеӣ истифода мебарад ва қифи фурӯши шуморо барои ҳадди аксар ROI ҳангоми хоби шумо оптимизатсия мекунад.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              {user ? (
                <Link 
                  to="/dashboard"
                  className="cta-gradient text-white text-lg font-bold px-12 py-4 rounded-full shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 group hover:scale-105 transition-transform"
                >
                  Ба панели идоракунӣ <LayoutDashboard className="w-5 h-5" />
                </Link>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <input 
                    type="email" 
                    placeholder="Почтаи электронии кории худро ворид кунед" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-6 py-4 rounded-full bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={status === "loading"}
                    className="cta-gradient text-white text-lg font-bold px-8 py-4 rounded-full shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {status === "loading" ? "Пайвастшавӣ..." : "Оғоз кунед"} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
              <button 
                onClick={() => setIsDemoOpen(true)}
                className="bg-white text-brand-primary border border-slate-200 text-lg font-bold px-10 py-4 rounded-full hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <Play className="w-5 h-5 fill-brand-primary" /> Намоишро тамошо кунед
              </button>
            </div>
            {status === "success" && <p className="mb-6 text-sm font-bold text-green-600">Хуш омадед! Гузариш...</p>}

            <div className="flex items-center justify-center gap-8 text-sm text-brand-muted font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Корти кредитӣ лозим нест
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Озмоиши ройгони 14-рӯза
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-50 p-2">
            <img 
              src="https://picsum.photos/seed/dashboard/1200/800" 
              alt="Панели идоракунии зеҳнии Khabbllo" 
              className="rounded-xl w-full object-cover aspect-video"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-lg hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg text-green-600"><TrendingUp className="w-5 h-5" /></div>
              <div>
                <p className="text-[10px] uppercase font-bold text-brand-muted">Афзоиши табдилдиҳӣ</p>
                <p className="text-lg font-bold">+42.8%</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialProof = () => (
  <section className="py-12 border-y border-slate-100 bg-brand-surface">
    <div className="f-pattern-container">
      <p className="text-center text-xs font-bold text-brand-muted uppercase tracking-widest mb-8">
        Аз ҷониби зиёда аз 500 дастаи босуръат рушдёбанда дар саросари ҷаҳон эътимод доранд
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {['Stripe', 'Airbnb', 'HubSpot', 'Shopify', 'Slack'].map((brand) => (
          <span key={brand} className="text-2xl font-display font-black tracking-tighter">{brand}</span>
        ))}
      </div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section className="py-24 bg-white" id="solutions">
    <div className="f-pattern-container">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
            <div className="inline-flex items-center gap-2 text-red-500 font-bold mb-6">
              <HelpCircle className="w-6 h-6" /> Мушкилоти асосӣ
            </div>
            <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter uppercase leading-[0.9] mb-8">
              Тахмин карданро бас кунед. <br />
              <span className="text-brand-accent">Рушдро оғоз кунед.</span>
            </h2>
          <p className="text-lg text-brand-muted mb-8 leading-relaxed">
            Аксари брендҳо 60%-и хароҷоти таблиғотии худро барои трафике сарф мекунанд, ки ҳеҷ гоҳ табдил намеёбад, зеро нуқтаҳои соиши ноаён мавҷуданд. Шумо ҳар сонияе, ки воронкаи шумо оптимизатсия нашудааст, пул гум мекунед.
          </p>
          <ul className="space-y-4">
            {[
              "Сатҳи баланди баромадан аз саҳифаҳои фуруд",
              "Партофтани сабад дар қадами ниҳоӣ",
              "Пешниҳодҳои арзиши норавшан, ки корбаронро ба иштибоҳ меоранд",
              "Таҷрибаи мобилӣ, ки муштариёнро ноумед мекунад"
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-red-50 rounded-full text-red-500"><X className="w-4 h-4" /></div>
                <span className="font-medium text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <BarChart3 className="w-8 h-8 text-brand-accent mb-4" />
              <h3 className="font-bold mb-2">Нобиноии маълумот</h3>
              <p className="text-sm text-brand-muted">Рақамҳо бидуни контекст танҳо садо ҳастанд.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-8">
              <Zap className="w-8 h-8 text-brand-accent mb-4" />
              <h3 className="font-bold mb-2">Итератсияи суст</h3>
              <p className="text-sm text-brand-muted">Интизории ҳафтаҳо барои натиҷаҳои тести А/Б ҳукми қатл аст.</p>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <Users className="w-8 h-8 text-brand-accent mb-4" />
              <h3 className="font-bold mb-2">Соиши корбар</h3>
              <p className="text-sm text-brand-muted">Як клики бад метавонад муштариро барои ҳамеша аз даст диҳад.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-8">
              <ShieldCheck className="w-8 h-8 text-brand-accent mb-4" />
              <h3 className="font-bold mb-2">Норасоии эътимод</h3>
              <p className="text-sm text-brand-muted">Агар онҳо ба шумо эътимод накунанд, онҳо харид намекунанд.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Benefits = () => (
  <section className="py-24 bg-brand-primary text-white overflow-hidden" id="features">
    <div className="f-pattern-container">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 text-brand-accent mb-6">
          <Zap className="w-8 h-8" />
        </div>
        <h2 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter uppercase leading-[0.85] mb-12">
          Барои <br /> <span className="text-brand-accent">Маҳсулнокӣ</span> <br /> сохта шудааст.
        </h2>
        <p className="text-slate-400 text-lg">
          Khabbllo танҳо як абзор нест; ин бартарии ноодилонаи шумо дар бозори серодам аст.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Target className="w-8 h-8" />,
            title: "Ҳадафгирии дақиқ",
            desc: "Муайян кунед, ки кадом сегментҳо табдил меёбанд ва чаро, бо дақиқии 99%."
          },
          {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Афзоиши воқеӣ",
            desc: "СИ-и мо унсурҳои интерфейси корбариро ба таври худкор танзим мекунад, то ба нияти корбар дар миллисонияҳо мувофиқат кунад."
          },
          {
            icon: <Layers className="w-8 h-8" />,
            title: "Интегратсияи бефосила",
            desc: "Дар давоми 2 дақиқа бо стэки мавҷудаи шумо пайваст мешавад. Рамзгузории вазнин лозим нест."
          }
        ].map((benefit, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
            <p className="text-slate-400 leading-relaxed">{benefit.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-white" id="testimonials">
    <div className="f-pattern-container">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-brand-accent font-bold mb-6">
            <Users className="w-6 h-6" /> Эътимоди муштариён
          </div>
          <h2 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter uppercase leading-[0.85] mb-8">
            Натиҷаҳои <br /> <span className="text-brand-accent">Воқеӣ</span>
          </h2>
          <p className="text-lg text-brand-muted">Танҳо ба гуфтаҳои мо такя накунед. Бубинед, ки чӣ гуна Khabbllo тиҷоратро тағир медиҳад.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-6 py-3 rounded-full border border-blue-100">
          <div className="flex">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />)}
          </div>
          <span className="font-bold text-brand-primary">4.9/5 дар G2 Crowd</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            quote: "Khabllo дар давоми 48 соати аввал хароҷоти худро баровард. Мо афзоиши 34%-и анҷоми харидро бидуни тағир додани хароҷоти таблиғотӣ мушоҳида кардем.",
            author: "Sarah Jenkins",
            role: "Роҳбари рушд, LuxeWear",
            avatar: "https://picsum.photos/seed/sarah/100/100"
          },
          {
            quote: "Маълумоти СИ ба таври тарсовар дақиқ аст. Он нуқтаҳои соишро дар ҷараёни мобилии мо пайдо кард, ки мо солҳо боз онҳоро пайхас намекардем.",
            author: "Marcus Chen",
            role: "Директори иҷроия, TechFlow SaaS",
            avatar: "https://picsum.photos/seed/marcus/100/100"
          }
        ].map((t, idx) => (
          <div key={idx} className="p-10 rounded-3xl bg-slate-50 border border-slate-100 relative">
            <p className="text-xl font-medium mb-8 italic text-slate-700">"{t.quote}"</p>
            <div className="flex items-center gap-4">
              <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div>
                <p className="font-bold text-brand-primary">{t.author}</p>
                <p className="text-sm text-brand-muted">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section className="py-24 bg-brand-surface" id="pricing">
    <div className="f-pattern-container">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-accent/10 text-brand-accent mb-6">
          <Diamond className="w-8 h-8" />
        </div>
        <h2 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter uppercase leading-[0.85] mb-8">
          Нархгузории <br /> <span className="text-brand-accent">Шаффоф</span>
        </h2>
        <p className="text-lg text-brand-muted">Нақшаеро интихоб кунед, ки ба марҳилаи рушди шумо мувофиқ бошад.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: "Оғозкунанда",
            price: "$99",
            features: ["То 10 ҳазор корбар дар як моҳ", "Маълумоти асосии СИ", "Дастгирии почтаи электронӣ", "1 Оптимизатсияи воронка"]
          },
          {
            name: "Рушд",
            price: "$299",
            features: ["То 100 ҳазор корбар дар як моҳ", "Муҳаррики пешрафтаи СИ", "Дастгирии афзалиятнок", "Воронкаҳои номаҳдуд", "Тести А/Б"],
            popular: true
          },
          {
            name: "Корхона",
            price: "Фармоишӣ",
            features: ["Корбарони номаҳдуд", "Моделҳои фармоишии СИ", "Менеҷери махсус", "Кафолати SLA", "Имконияти дар маҳал насб кардан"]
          }
        ].map((plan, idx) => (
          <div key={idx} className={`p-8 rounded-3xl bg-white border ${plan.popular ? "border-brand-accent shadow-xl ring-2 ring-brand-accent/10" : "border-slate-200"} relative`}>
            {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">Маъмултарин</span>}
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              {plan.price !== "Фармоишӣ" && <span className="text-brand-muted text-sm">/моҳ</span>}
            </div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? "cta-gradient text-white" : "bg-slate-100 text-brand-primary hover:bg-slate-200"}`}>
              {plan.price === "Фармоишӣ" ? "Тамос бо фурӯш" : "Оғози озмоиши ройгон"}
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resMessage, setResMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setResMessage(data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setResMessage(data.error);
      }
    } catch (err) {
      setStatus("error");
      setResMessage("Фиристодани паём ноком шуд. Лутфан бори дигар кӯшиш кунед.");
    }
  };

  return (
    <section className="py-24 bg-white" id="contact">
      <div className="f-pattern-container">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="inline-flex items-center gap-2 text-brand-accent font-bold mb-6">
              <Mail className="w-6 h-6" /> Тамос бо мо
            </div>
            <h2 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter uppercase leading-[0.85] mb-8">
              Биёед дар бораи <br /> <span className="text-brand-accent">Рушд</span> сӯҳбат кунем.
            </h2>
            <p className="text-lg text-brand-muted mb-10">
              Саволҳо доред, ки чӣ гуна Khabbllo метавонад ба бренди шумо кӯмак кунад? 
              Коршиносони мо омодаанд ба шумо дар кушодани иқтидори пурраи шумо кӯмак кунанд.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent"><Mail /></div>
                <div>
                  <p className="text-xs font-bold text-brand-muted uppercase">Ба мо почта нависед</p>
                  <p className="font-bold">growth@khabbllo.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent"><Phone /></div>
                <div>
                  <p className="text-xs font-bold text-brand-muted uppercase">Ба мо занг занед</p>
                  <p className="font-bold">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-accent"><MapPin /></div>
                <div>
                  <p className="text-xs font-bold text-brand-muted uppercase">Ба наздамон биёед</p>
                  <p className="font-bold">123 Conversion Way, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Ному насаби пурра</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Почтаи электронии корӣ</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Паём</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={status === "loading"}
                className="w-full cta-gradient text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 disabled:opacity-50"
              >
                {status === "loading" ? "Фиристода мешавад..." : "Фиристодани паём"}
              </button>
              {status === "success" && <p className="text-center text-sm font-bold text-green-600">{resMessage}</p>}
              {status === "error" && <p className="text-center text-sm font-bold text-red-600">{resMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section className="py-24" id="signup">
    <div className="f-pattern-container">
      <div className="cta-gradient rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/40">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 text-white mb-8 rounded-3xl">
            <Rocket className="w-10 h-10" />
          </div>
          <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter uppercase leading-[0.85] mb-12">
            Омодаед барои <br /> <span className="text-white">Васеъшавӣ?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Ба зиёда аз 500 бренде ҳамроҳ шавед, ки Khabbllo-ро барои ҳукмронӣ дар бозори худ истифода мебаранд. 
            Озмоиши ройгони 14-рӯзаи худро имрӯз оғоз кунед. Бидуни хатар, танҳо фоида.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white text-brand-accent text-lg font-bold px-12 py-5 rounded-full hover:scale-105 transition-transform shadow-xl"
          >
            Ҳозир оғоз кунед
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  </section>
);

const AcademyTeaser = () => (
  <section className="py-24 bg-[#050505] text-white overflow-hidden relative">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#F27D26_0%,transparent_50%)] blur-[120px]"></div>
    </div>
    <div className="f-pattern-container relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Sparkles className="w-3 h-3" /> Нав: Академияи Маркетинг
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[0.9] tracking-tighter uppercase italic">
            Психологияи <br />
            <span className="text-brand-accent">боварибахширо</span> <br />
            аз худ кунед.
          </h2>
          <p className="text-slate-400 text-xl mb-10 leading-relaxed max-w-lg">
            Омӯзиши синтаксисро бас кунед. Омӯзиши стратегияро оғоз кунед. Академияи мо ба шумо принсипҳои сатҳи баландро меомӯзонад, ки тамошобинонро ба харидорон табдил медиҳанд.
          </p>
          <Link 
            to="/academy" 
            className="inline-flex items-center gap-4 bg-brand-accent text-black px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform group"
          >
            Вориди Академия шавед <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col justify-end backdrop-blur-xl">
                <p className="text-brand-accent font-black text-4xl mb-2">01</p>
                <p className="font-bold text-lg">Маҳорати Копирайтинг</p>
              </div>
              <div className="aspect-square bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col justify-end backdrop-blur-xl">
                <p className="text-brand-accent font-black text-4xl mb-2">02</p>
                <p className="font-bold text-lg">Асосҳои Веб</p>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="aspect-square bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col justify-end backdrop-blur-xl">
                <p className="text-brand-accent font-black text-4xl mb-2">03</p>
                <p className="font-bold text-lg">Автоматизатсия</p>
              </div>
              <div className="aspect-[4/5] bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col justify-end backdrop-blur-xl">
                <p className="text-brand-accent font-black text-4xl mb-2">04</p>
                <p className="font-bold text-lg">Стратегияи SEO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const LuxuryShowcase = () => (
  <section className="py-24 bg-[#050505] text-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-display font-light text-white/60">
              Сатҳи Премиум
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-light leading-[0.9] mb-12">
            Бренди худро ба <span className="italic">нуфуз</span> баланд бардоред.
          </h2>
          <p className="text-xl font-serif font-light text-white/60 leading-relaxed mb-12 max-w-lg">
            Барои онҳое, ки камолотро талаб мекунанд. Мо маркетинги пурқувватеро эҷод мекунем, ки на танҳо мефурӯшад, балки эҳтиромро ба вуҷуд меорад.
          </p>
          <Link to="/luxury-post" className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-display font-medium group">
            Намоишгоҳи боҳашаматро омӯзед <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-square rounded-full border border-white/10 flex items-center justify-center p-12"
        >
          <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full" />
          <div className="relative z-10 text-center">
            <Diamond className="w-16 h-16 text-white/20 mx-auto mb-8" />
            <p className="text-2xl font-serif italic font-light max-w-xs mx-auto">
              "Зеро тиҷорати шумо оддӣ нест — он истисноӣ аст."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <SocialProof />
      <AcademyTeaser />
      <HowItWorks />
      <LuxuryShowcase />
      <ProblemSection />
      <BentoBenefits />
      <ROICalculator />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <FinalCTA />
    </div>
  );
};

export default Home;
