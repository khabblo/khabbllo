import * as React from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Target, 
  Zap, 
  MousePointer2, 
  MessageSquareQuote, 
  CheckCircle2, 
  Users,
  Brain,
  Sparkles,
  Heart,
  Lightbulb
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const MarketingStrategy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-brand-accent selection:text-black font-sans">
      {/* Exit Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-[100] p-4 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-xl transition-all border border-white/10 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-brand-accent">
              Мастер-класси Стратегия
            </span>
            <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase mb-8">
              Ба ниёзҳои <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-orange-400">
                Онҳо Посух Диҳед
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-12 italic font-serif">
              "Стратегияи маркетингии хуб андешидашуда аз фаҳмиши амиқи аудиторияи мақсадноки шумо оғоз мешавад. Шумо на танҳо мехоҳед ба онҳо чизе фурӯшед — шумо мехоҳед бо эҳсосот, дардҳо ва хоҳишҳои онҳо пайваст шавед."
            </p>
            <div className="flex justify-center">
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1"
              >
                <div className="w-1 h-2 bg-brand-accent rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Marketing Strategy */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-xs mb-4 block">Марҳилаи 01</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
              Стратегияи <br /> Маркетинг
            </h2>
            <p className="text-xl text-white/40 leading-relaxed mb-12">
              Фаҳмиши амиқи аудиторияи мақсадноки шумо асоси ҳар як кампанияи дорои конверсияи баланд мебошад.
            </p>
            
            <div className="space-y-8">
              {[
                { 
                  icon: <Heart className="w-6 h-6 text-red-400" />, 
                  title: "Нуқтаҳои дард", 
                  desc: "Мушкилоти онҳоро дар марҳилаи аввал ҳал кунед.",
                  example: "“Аз сарфи соатҳо барои ёфтани маҳсулоти мувофиқ хаста шудаед? Бигзор мо ба шумо кӯмак кунем.”"
                },
                { 
                  icon: <Lightbulb className="w-6 h-6 text-yellow-400" />, 
                  title: "Қарорҳо", 
                  desc: "Нишон диҳед, ки чӣ гуна маҳсулот ё хидмати шумо роҳи ҳал аст.",
                  example: "“Платформаи мо бо дастгирии СИ дар чанд сония беҳтарин пешниҳодҳоро барои шумо меёбад.”"
                },
                { 
                  icon: <Zap className="w-6 h-6 text-blue-400" />, 
                  title: "Фоидаҳо", 
                  desc: "Ба он чизе, ки барои онҳо муфид аст, тамаркуз кунед, на танҳо ба хусусиятҳо.",
                  example: "“Шумо вақт, пул ва энергияро сарфа мекунед — то тавонед ба чизҳои муҳимтар тамаркуз кунед.”"
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {item.icon}
                    <h3 className="text-xl font-black uppercase tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-white/60 mb-4">{item.desc}</p>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5 italic text-sm text-brand-accent">
                    {item.example}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-zinc-900 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/strategy/800/1000" 
                alt="Strategy" 
                className="w-full h-full object-cover opacity-50 mix-blend-luminosity hover:opacity-80 transition-opacity duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <p className="text-4xl font-black uppercase tracking-tighter leading-none mb-4">
                  Пайвастшавӣ бо <br /> <span className="text-brand-accent">Эҳсосот</span>
                </p>
                <div className="h-1 w-24 bg-brand-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: UX */}
      <section className="py-32 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Марҳилаи 02</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                Таҷрибаи <br /> Корбар
              </h2>
            </div>
            <p className="max-w-md text-slate-500 font-bold text-lg leading-relaxed">
              UX кафолат медиҳад, ки матни маркетингии шумо барои ҳамкорӣ осон аст ва таҷрибаи мусбату хотирмон мебахшад.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                title: "Равшанӣ", 
                desc: "Қадами навбатиро комилан равшан созед.",
                example: "“Давраи озмоишии ройгони худро ҳозир оғоз кунед!”"
              },
              { 
                title: "Соддагӣ", 
                desc: "Чизҳоро мураккаб накунед. Аз истилоҳоти душвор худдорӣ кунед.",
                example: "“Барои оғоз кардан ба тугмаи зер пахш кунед.”"
              },
              { 
                title: "Ҷалбкунӣ", 
                desc: "Аз унсурҳои интерактивӣ истифода баред.",
                example: "“Викторинаи моро гузаред, то маҳсулоти беҳтаринро барои худ пайдо кунед”"
              },
              { 
                title: "Мувофиқат", 
                desc: "Оҳанг ва паёмҳои худро мувофиқ нигоҳ доред.",
                example: "Шиносоӣ боиси эътимод мегардад."
              }
            ].map((item, i) => (
              <div key={i} className="p-10 border border-slate-100 rounded-[2.5rem] hover:border-brand-accent transition-colors group">
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-brand-accent transition-colors">{item.title}</h4>
                <p className="text-slate-500 font-medium mb-8 leading-relaxed">{item.desc}</p>
                <div className="text-xs font-black uppercase tracking-widest text-slate-300 border-t border-slate-100 pt-6">
                  Example: <span className="text-black">{item.example}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Combining Strategy + UX */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-xs mb-4 block">Синтез</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">Стратегия бо UX вомехӯрад</h2>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Сенария: Фурӯши барномаи фитнес</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-12 bg-white/5 border border-white/10 rounded-[3rem]">
            <h3 className="text-3xl font-black uppercase mb-12 flex items-center gap-4">
              <Brain className="w-8 h-8 text-brand-accent" /> Зовияи Маркетинг
            </h3>
            <div className="space-y-12">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Нуқтаи дард</p>
                <p className="text-2xl font-medium text-white/80 leading-tight italic">
                  “Шумо бисёр кор мекунед, аммо худро носолим ҳис мекунед ва барои машқ вақт намеёбед.”
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Қарор</p>
                <p className="text-2xl font-medium text-white/80 leading-tight italic">
                  “Машқҳои ҳаррӯзаи 15-дақиқаии мо барои одамони мисли шумо тарҳрезӣ шудаанд — банд, аммо то ҳол мехоҳанд солим бошанд!”
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Фоида</p>
                <p className="text-2xl font-medium text-white/80 leading-tight italic">
                  “Дигар баҳона нест — танҳо реҷаҳои зуд ва самаранок, ки шумо метавонед дар меҳмонхонаи худ иҷро кунед.”
                </p>
              </div>
            </div>
          </div>

          <div className="p-12 bg-brand-accent text-black rounded-[3rem] flex flex-col justify-center">
            <h3 className="text-3xl font-black uppercase mb-12 flex items-center gap-4">
              <MousePointer2 className="w-8 h-8" /> Матни оптимизатсияшудаи UX
            </h3>
            <div className="space-y-12">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Сарлавҳа</p>
                <p className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                  Дар 15 дақиқа дар як рӯз солим шавед — Толори варзишӣ лозим нест!
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Зерсарлавҳа</p>
                <p className="text-xl font-bold leading-tight">
                  Имрӯз бо нақшаи машқҳои ройгон, ки барои ҷадвали банди шумо тарҳрезӣ шудааст, оғоз кунед.
                </p>
              </div>
              <div>
                <button className="w-full py-6 bg-black text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl hover:scale-[1.02] transition-all">
                  Нақшаи ройгони худро ҳозир гиред
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Trust & Social Proof */}
      <section className="py-32 px-6 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-xs mb-4 block">Қабати Эътимод</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                Исботи <br /> Иҷтимоӣ
              </h2>
              <p className="text-xl text-white/40 leading-relaxed mb-12">
                Қабати дигари маркетинги олӣ эҷоди эътимод аст. Барои тасдиқи иддаои худ аз шаҳодатномаҳо ва маълумоти воқеӣ истифода баред.
              </p>
              
              <div className="p-10 bg-black/40 border border-white/5 rounded-[2.5rem] relative">
                <MessageSquareQuote className="w-12 h-12 text-brand-accent/20 absolute top-8 right-8" />
                <p className="text-2xl font-medium text-white/80 leading-relaxed italic mb-8">
                  “Ман бовар намекардам, ки он бо ҷадвали ман кор мекунад, аммо пас аз як ҳафта, ман худро қавитар ва боэнергиятар ҳис кардам!”
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center font-black text-brand-accent">С</div>
                  <div>
                    <p className="font-black uppercase tracking-tight">Сара, 34</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Мутахассиси Тасдиқшуда</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="p-12 bg-white/5 border border-white/10 rounded-[3rem] text-center">
                <Users className="w-12 h-12 text-brand-accent mx-auto mb-6" />
                <p className="text-6xl font-black tracking-tighter mb-4">10,000+</p>
                <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Аъзоёни Фаъол</p>
                <p className="mt-8 text-white/60">
                  Ба беш аз 10,000 нафар ҳамроҳ шавед, ки фитнеси худро танҳо дар 15 дақиқа дар як рӯз беҳтар кардаанд.
                </p>
              </div>
              <div className="p-8 bg-brand-accent/10 border border-brand-accent/20 rounded-[2rem] flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-accent flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-white fill-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tight">Эътимоди Дарунсохт</h4>
                  <p className="text-white/60 text-sm">Платформаи мо триггерҳои психологиро барои эҷоди нуфузи фаврӣ истифода мебарад.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Thoughts */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-12 leading-[0.85]">
            Хулосаи <br /> <span className="text-brand-accent">Ниҳоӣ</span>
          </h2>
          <p className="text-2xl text-white/60 font-medium leading-relaxed mb-16 italic font-serif">
            "Паёми маркетингии олӣ на танҳо ба ниёзҳои аудиторияи шумо посух медиҳад, балки онҳоро ба таври осон тавассути таҷриба — аз кашф то амал ҳидоят мекунад."
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
              <Target className="w-5 h-5 text-brand-accent" /> Таҳлили Стратегияи Ман
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <div className="py-12 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
        Лабораторияи Стратегияи Khabbllo • © 2026
      </div>
    </div>
  );
};

export default MarketingStrategy;
