import * as React from "react";
import { motion } from "motion/react";
import { 
  ShoppingBag, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Plus, 
  Search, 
  Users,
  CheckCircle2,
  TrendingUp,
  Globe,
  X,
  Store,
  Laptop,
  AlertCircle,
  HelpCircle,
  Info,
  Settings,
  Target,
  Rocket,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const MarketplaceShowcase = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#1A1A1A]">
      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-6">
          <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mb-6">
                <Zap className="w-3 h-3" />
                <span>Насли ояндаи тиҷорат</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-8 tracking-tighter uppercase flex flex-col gap-4">
                <span className="flex items-center gap-4">
                  <ShoppingBag className="w-12 h-12 md:w-20 md:h-20 text-blue-600 shrink-0" />
                  Хуш омадед ба
                </span>
                <span className="text-blue-600">Khabllo Market</span> — ҳама чиз дар як ҷо!
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
                Khabllo Market — ин платформаи муосири онлайн мебошад, ки ба ҳар як корбар имкон медиҳад маҳсулоти худро ба осонӣ фурӯшад ё маҳсулоти лозимиро бо нархи беҳтарин харидорӣ намояд.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 group">
                  Оғози ройгон <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                  Омӯзиши бозор
                </button>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Бе пардохти рӯйхат
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Пардохтҳои фаврӣ
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-4 relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop" 
                  alt="Premium Laptop" 
                  className="rounded-[2rem] w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating UI Elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Фурӯши имрӯза</p>
                  <p className="text-lg font-bold">+$3,450.00</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl text-white mb-8 shadow-2xl shadow-blue-600/20 rotate-3"
            >
              <Star className="w-10 h-10" />
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase tracking-tighter mb-6 leading-none">
              Бартариҳои <span className="text-blue-600 underline decoration-blue-200 decoration-8 underline-offset-8">мо</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Чаро Khabllo Market интихоби беҳтарин барои шумост?</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Сабти ном ва истифодаи осон", desc: "Дар чанд сония дӯкони худро кушоед ва ба фурӯш оғоз кунед." },
              { title: "Имконияти фурӯши мустақим", desc: "Бе миёнаравҳо мустақиман бо харидорон муомила кунед." },
              { title: "Чат байни фурӯшанда ва харидор", desc: "Муоширати фаврӣ барои ҳалли ҳама саволҳо." },
              { title: "Маҳсулотҳои гуногун", desc: "Аз техника то либос — ҳама чиз дар як ҷо." },
              { title: "Нархи дастрас", desc: "Рақобати солим ва нархҳои беҳтарин дар бозор." },
              { title: "Платформаи бехатар", desc: "Муҳофизати пурраи маълумот ва муомилотҳои шумо." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Sellers Section */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-600/20 mb-8"
              >
                <Store className="w-10 h-10" />
              </motion.div>
              <h2 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter uppercase leading-[0.9] mb-8 flex flex-col gap-4">
                <span>Дӯкони худро</span>
                <span className="text-blue-500">имрӯз</span> кушоед.
              </h2>
              <div className="space-y-6 mb-10">
                {[
                  "Дӯкони шахсии худро кушоед ва бренди худро созед",
                  "Маҳсулоти худро бо воситаҳои муосир идора кунед",
                  "Мизоҷони нав пайдо кунед ва фурӯшро зиёд кунед",
                  "Даромади худро бо платформаи мо афзоиш диҳед"
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/40">
                Ҳоло оғоз кунед
              </button>
            </div>
            <div className="order-1 lg:order-2 bg-slate-800 rounded-[3rem] p-8 border border-slate-700 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-xl">Панели фурӯшанда</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-slate-700/50 rounded-2xl animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-slate-700/50 rounded-2xl animate-pulse" />
                  <div className="h-24 bg-slate-700/50 rounded-2xl animate-pulse" />
                </div>
                <div className="h-12 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center px-4 text-blue-400 text-sm font-bold">
                  <TrendingUp className="w-4 h-4 mr-2" /> +24% афзоиши фурӯш дар ин моҳ
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-600/20 mb-8"
              >
                <Laptop className="w-10 h-10" />
              </motion.div>
              <h2 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter uppercase leading-[0.85] flex flex-col gap-4">
                <span>Ноутбукҳои</span>
                <span className="text-blue-600 underline decoration-blue-200 decoration-[12px] underline-offset-[12px]">Технологӣ</span>
                <span>бо нархҳои беҳтарин.</span>
              </h2>
            </div>
            <button className="flex items-center gap-2 font-bold text-slate-400 hover:text-blue-600 transition-colors group">
              Ҳамаашро дидан <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                brand: "Apple",
                name: "MacBook Pro M3 Max",
                price: "$3,499.00",
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop",
                badge: "Беҳтарин",
                color: "bg-slate-900"
              },
              {
                brand: "NVIDIA",
                name: "GeForce RTX 5090 Rig",
                price: "$4,999.00",
                image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1887&auto=format&fit=crop",
                badge: "Флагман",
                color: "bg-green-500"
              },
              {
                brand: "Lenovo",
                name: "Legion Pro 7i Gen 9",
                price: "$2,499.00",
                image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop",
                badge: "Гейминг",
                color: "bg-red-500"
              },
              {
                brand: "Dell",
                name: "XPS 15 Touch",
                price: "$1,899.00",
                image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2066&auto=format&fit=crop",
                badge: "Бизнес",
                color: "bg-blue-500"
              },
              {
                brand: "ASUS",
                name: "ROG Zephyrus G16",
                price: "$2,199.00",
                image: "https://images.unsplash.com/photo-1611186871348-b1ec696e523b?q=80&w=2070&auto=format&fit=crop",
                badge: "Суръат",
                color: "bg-purple-600"
              },
              {
                brand: "HP",
                name: "Spectre x360 14",
                price: "$1,449.00",
                image: "https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?q=80&w=2070&auto=format&fit=crop",
                badge: "2-дар-1",
                color: "bg-amber-500"
              },
              {
                brand: "Microsoft",
                name: "Surface Laptop 6",
                price: "$1,299.00",
                image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop",
                badge: "Стиль",
                color: "bg-sky-500"
              },
              {
                brand: "Razer",
                name: "Blade 16 Mercury",
                price: "$2,999.00",
                image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop",
                badge: "Премиум",
                color: "bg-emerald-500"
              },
              {
                brand: "Acer",
                name: "Swift Edge 16",
                price: "$1,199.00",
                image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1974&auto=format&fit=crop",
                badge: "Осон",
                color: "bg-teal-500"
              },
              {
                brand: "MSI",
                name: "Stealth 16 Studio",
                price: "$2,399.00",
                image: "https://images.unsplash.com/photo-1558985250-27a406d64cb3?q=80&w=2070&auto=format&fit=crop",
                badge: "Студия",
                color: "bg-rose-600"
              },
              {
                brand: "LG",
                name: "Gram 17 Ultra",
                price: "$1,599.00",
                image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1887&auto=format&fit=crop",
                badge: "Вазн",
                color: "bg-gray-400"
              },
              {
                brand: "Samsung",
                name: "Galaxy Book4 Ultra",
                price: "$2,299.00",
                image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop",
                badge: "Экосистема",
                color: "bg-indigo-600"
              }
            ].map((product, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group bg-white rounded-[2rem] border border-slate-100 p-4 hover:shadow-2xl hover:shadow-blue-600/10 transition-all"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-50">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute top-4 left-4 ${product.color} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg`}>
                    {product.badge}
                  </div>
                  <button className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-600 hover:text-white">
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
                <div className="px-2">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{product.brand}</p>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black tracking-tight">{product.price}</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <div key={star} className="w-1 h-1 rounded-full bg-blue-600" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 px-6 bg-red-50 border-y border-red-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-3xl text-white mb-8 shadow-2xl shadow-red-600/20 -rotate-3"
            >
              <AlertCircle className="w-10 h-10" />
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase tracking-tighter mb-6 leading-none">
              Мушкилоти худро <br /><span className="text-red-600">ҳал кунед</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">Мо дар ин ҷо ҳастем, то ба шумо дар ҳар қадам кӯмак кунем!</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 bg-white rounded-3xl shadow-xl border border-red-100">
              <h3 className="text-2xl font-black mb-6 text-red-600">Мушкилоти маъмул</h3>
              <ul className="space-y-4">
                {[
                  "Нобоварӣ ба сифати маҳсулот",
                  "Мушкилот дар интиқоли мол",
                  "Нархҳои хеле баланд",
                  "Муоширати суст бо фурӯшанда"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600">
                    <X className="w-5 h-5 text-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 bg-blue-600 rounded-3xl shadow-xl text-white">
              <h3 className="text-2xl font-black mb-6">Қарори Khabllo Market</h3>
              <ul className="space-y-4">
                {[
                  "Системаи рейтинг ва баррасиҳо",
                  "Интиқоли зуд ва боэътимод",
                  "Рақобати солим ва нархҳои дастрас",
                  "Чати мустақим дар вақти воқеӣ"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Help Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl text-white mb-8 shadow-2xl shadow-blue-600/20"
            >
              <HelpCircle className="w-10 h-10" />
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-tighter leading-none">
              Саволҳои <span className="text-blue-600">зиёд</span> додашаванда
            </h2>
          </div>
          <div className="space-y-6">
            {[
              { q: "Чӣ тавр ман метавонам маҳсулот фурӯшам?", a: "Танҳо ба тугмаи 'Ба фурӯш оғоз кунед' пахш кунед ва дӯкони худро дар чанд сония созед." },
              { q: "Оё интиқол бехатар аст?", a: "Бале, мо бо беҳтарин хадамоти хаткашонӣ ҳамкорӣ мекунем, то маҳсулоти шумо сари вақт ва бехатар расад." },
              { q: "Чӣ тавр бо фурӯшанда тамос гирам?", a: "Дар саҳифаи ҳар як маҳсулот тугмаи чат мавҷуд аст, ки шумо метавонед мустақиман бо фурӯшанда сӯҳбат кунед." }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-lg mb-2">{item.q}</h4>
                <p className="text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-video bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
                  alt="Marketing Analytics" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                <p className="text-3xl font-black mb-1">100%</p>
                <p className="text-[10px] uppercase font-bold opacity-80">Бехатарии муомилот</p>
              </div>
            </div>
            <div>
              <div className="inline-flex flex-col gap-6 mb-10">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-600/20"
                >
                  <Info className="w-10 h-10" />
                </motion.div>
                <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase tracking-tighter leading-none">
                  Тавсифи <br /><span className="text-blue-600">хизматрасонӣ</span>
                </h2>
              </div>
              <p className="text-2xl text-slate-600 mb-10 font-medium">Дар Khabllo Market шумо имкониятҳои бемаҳдуд доред:</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Маҳсулоти нав илова кунед",
                  "Бо мизоҷон дар вақти воқеӣ сӯҳбат кунед",
                  "Фурӯшҳои худро назорат кунед",
                  "Маҳсулотҳои дигаронро бинед ва муқоиса кунед",
                  "Бо як клик фармоиш диҳед",
                  "Дӯкони шахсии худро идора кунед"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 bg-green-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-green-600/20"
          >
            <ShieldCheck className="w-12 h-12" />
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase tracking-tighter mb-8 leading-none">
            Амният ва <span className="text-green-600">Эътимод</span>
          </h2>
          <p className="text-2xl text-slate-600 leading-relaxed font-medium">
            Мо ба амнияти маълумоти шумо аҳамияти калон медиҳем. Ҳамаи маълумоти шахсӣ ва муомилотҳо бо системаҳои муҳофизатии муосир ҳифз карда мешаванд. Платформаи мо пурра бехатар аст ва мо ҳар як созишномаро назорат мекунем.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl text-white mb-8 shadow-2xl shadow-blue-600/20"
          >
            <Target className="w-10 h-10" />
          </motion.div>
          <h2 className="text-6xl md:text-9xl font-heading font-bold tracking-tighter uppercase leading-[0.85] mb-10 flex flex-col gap-4">
            <span>Бузургтарин бозори</span>
            <span className="text-blue-600 underline decoration-blue-200 decoration-[12px] underline-offset-[12px]">онлайн</span>
            <span>дар минтақа.</span>
          </h2>
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Мо мехоҳем Khabllo Market ба яке аз бузургтарин бозорҳои онлайн дар минтақа табдил ёбад, ки дар он ҳар як шахс имконияти рушд ва муваффақият дошта бошад. Мо технологияро барои наздик кардани одамон истифода мебарем.
          </p>
        </div>
      </section>
      <section className="py-24 bg-blue-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="w-20 h-20 bg-blue-400 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-400/20 mb-8"
              >
                <MessageSquare className="w-10 h-10" />
              </motion.div>
              <h2 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter uppercase leading-[0.85] mb-8 flex flex-col gap-4">
                <span>Муошират —</span>
                <span className="text-blue-300">Қалби тиҷорат</span>
                <span>аст.</span>
              </h2>
              <p className="text-2xl text-blue-100 leading-relaxed mb-10 font-medium">
                Системаи чати дохилии мо ба шумо имкон медиҳад бо фурӯшанда бевосита савол диҳед, дар бораи маҳсулот маълумоти бештар гиред ва ба осонӣ шартнома кунед.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Огоҳиҳои фаврӣ барои паёмҳои нав",
                  "Мубодилаи бехатари тасвирҳо ва файлҳо",
                  "Воситаҳои музокира дар дохили чат",
                  "Ҳифзи харидор ва фурӯшанда дар ҳар як созишнома"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-blue-50">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-6 text-slate-900 max-w-sm mx-auto transform rotate-2">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">Дастгирии мизоҷон</p>
                    <p className="text-[10px] text-green-500 font-bold uppercase">Ҳоло дар шабака</p>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
                    Салом! Оё камераи винтажӣ ҳанӯз дастрас аст?
                  </div>
                  <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-sm max-w-[80%] ml-auto">
                    Бале, ҳаст! Ман онро дирӯз санҷидам ва он комилан кор мекунад.
                  </div>
                  <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
                    Олӣ! Оё шумо онро ба $120 медиҳед?
                  </div>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Паём нависед..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-xs">Фиристодан</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-50/50 -z-10" />
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl text-white mb-8 shadow-xl shadow-blue-600/20">
            <Rocket className="w-10 h-10" />
          </div>
          <h2 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter uppercase leading-[0.9] mb-8">
            Khabllo Market — <br /><span className="text-blue-600 underline decoration-blue-200 decoration-[12px] underline-offset-[12px]">Хариди осон</span>, фурӯши зуд!
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-12 max-w-2xl mx-auto">
            Новобаста аз он ки шумо фурӯшандаи инфиродӣ ҳастед ё бренди афзоянда, платформаи мо ба шумо тамоми воситаҳои лозимиро барои муваффақият медиҳад.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
              Мағозаи худро эҷод кунед
            </button>
            <Link to="/dashboard" className="text-slate-600 font-bold hover:text-blue-600 transition-colors">
              Бозгашт ба панели Khabbllo
            </Link>
          </div>
        </div>
      </section>

      </main>
    </div>
  );
};

export default MarketplaceShowcase;
