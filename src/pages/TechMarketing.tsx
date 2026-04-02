import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Monitor, 
  Laptop, 
  Smartphone, 
  Tag, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Battery, 
  Wifi,
  Play,
  ArrowRight
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const TechMarketing = () => {
  const navigate = useNavigate();

  const [prices, setPrices] = useState({
    computer: 2499,
    laptop: 1299,
    smartphone: 999
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        computer: prev.computer + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5),
        laptop: prev.laptop + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3),
        smartphone: prev.smartphone + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const products = [
    {
      id: "computer",
      name: "Khabllo Pro Desktop",
      price: `$${prices.computer.toLocaleString()}`,
      image: "https://picsum.photos/seed/computer/800/600",
      icon: <Monitor className="w-6 h-6" />,
      specs: ["32-Core CPU", "128GB RAM", "4TB SSD"],
      description: "Истгоҳи ниҳоии корӣ барои амалиёти маркетингии сатҳи баланд ва коркарди маълумот."
    },
    {
      id: "laptop",
      name: "Khabllo Air Laptop",
      price: `$${prices.laptop.toLocaleString()}`,
      image: "https://picsum.photos/seed/laptop/800/600",
      icon: <Laptop className="w-6 h-6" />,
      specs: ["18-Hour Battery", "Retina Display", "Ultra-Thin"],
      description: "Қудрат ва қобилияти интиқол барои хакери муосири рушд дар ҳаракат."
    },
    {
      id: "smartphone",
      name: "Khabllo X Phone",
      price: `$${prices.smartphone.toLocaleString()}`,
      image: "https://picsum.photos/seed/smartphone/800/600",
      icon: <Smartphone className="w-6 h-6" />,
      specs: ["5G Enabled", "Pro Camera", "Neural Engine"],
      description: "Маркази фармондиҳӣ дар ҷайби шумо. Кампанияҳо ва ҳузури иҷтимоиро дар ҳама ҷо идора кунед."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-brand-accent selection:text-black font-sans">
      {/* Exit Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-[100] p-4 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-xl transition-all border border-white/10 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-brand-accent">
            Мастер-класси маркетинги сахтафзор
          </span>
          <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase mb-8">
            Намоиши <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
              Технологӣ
            </span>
          </h1>
          <p className="max-w-2xl text-xl text-white/40 font-medium leading-relaxed mb-12">
            Биомӯзед, ки чӣ гуна сахтафзорҳои қиматбаҳоро маркетинг кунед. Мо ин маҳсулотро ҳамчун омӯзиши мисолҳо барои мавқеъгирии олӣ ва фурӯши ба арзиш асосёфта истифода мебарем.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="relative aspect-video bg-zinc-900 rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-background-with-lines-and-dots-34444-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
            <div className="w-24 h-24 bg-brand-accent text-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_50px_rgba(242,125,38,0.5)] mb-8">
              <Play className="w-10 h-10 fill-current" />
            </div>
            <div className="text-center">
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Намоиши Маркетинги Khabllo</h3>
              <p className="text-white/60 font-bold uppercase tracking-widest text-sm">Технологияҳои олӣ // Нархгузории динамикӣ // Оптимизатсияи СИ</p>
            </div>
          </div>
          
          {/* Dynamic Pricing Overlay in Video */}
          <div className="absolute top-12 right-12 space-y-4">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-6 py-3 bg-brand-accent text-black font-black rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <Tag className="w-5 h-5" />
              <span>ДИНАМИКӢ: $2,499</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">Маҷмӯи олӣ</h2>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Барои самаранокӣ тарҳрезӣ шудааст // Барои арзиш нархгузорӣ шудааст</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="bg-zinc-900/50 border border-white/5 rounded-[3rem] overflow-hidden flex flex-col group"
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6">
                  <div className="px-4 py-2 bg-brand-accent text-black font-black text-sm rounded-full shadow-xl">
                    {product.price}
                  </div>
                </div>
              </div>
              
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-2xl text-brand-accent">
                    {product.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">{product.name}</h3>
                </div>
                
                <p className="text-white/40 text-sm mb-8 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="space-y-3 mb-10">
                  {product.specs.map(spec => (
                    <div key={spec} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                      <Zap className="w-3 h-3 text-brand-accent" />
                      {spec}
                    </div>
                  ))}
                </div>
                
                <button className="mt-auto w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center gap-3">
                  <ShoppingCart className="w-5 h-5" /> Ҳоло харед
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Marketing Strategy for Tech */}
      <section className="py-32 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Стратегия</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                Фурӯши <br /> <span className="text-brand-accent">Инноватсия</span>
              </h2>
              <p className="text-xl text-slate-500 font-bold leading-relaxed mb-12">
                Маркетинги технологӣ на дар бораи хусусиятҳо, балки дар бораи он аст, ки чӣ гуна ин хусусиятҳо ҳаёти корбарро тағир медиҳанд.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Камёбӣ", desc: "Нашри маҳдуд барои эҷоди ҳаяҷон." },
                  { title: "Статус", desc: "Мавқеъгирии сахтафзор ҳамчун дороии боҳашамат." },
                  { title: "Экосистема", desc: "Пайваст кардани корбарон бо ҳамгироии бефосила." }
                ].map(item => (
                  <div key={item.title} className="flex items-center gap-6 p-6 border border-slate-100 rounded-3xl">
                    <ShieldCheck className="w-8 h-8 text-brand-accent" />
                    <div>
                      <h4 className="font-black uppercase tracking-tight">{item.title}</h4>
                      <p className="text-sm text-slate-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-slate-100 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center group hover:bg-brand-accent transition-colors">
                <Cpu className="w-10 h-10 mb-4 group-hover:text-white" />
                <span className="font-black uppercase tracking-widest text-[10px] group-hover:text-white">Самаранокӣ</span>
              </div>
              <div className="aspect-square bg-slate-100 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center group hover:bg-brand-accent transition-colors">
                <Battery className="w-10 h-10 mb-4 group-hover:text-white" />
                <span className="font-black uppercase tracking-widest text-[10px] group-hover:text-white">Тобоварӣ</span>
              </div>
              <div className="aspect-square bg-slate-100 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center group hover:bg-brand-accent transition-colors">
                <Wifi className="w-10 h-10 mb-4 group-hover:text-white" />
                <span className="font-black uppercase tracking-widest text-[10px] group-hover:text-white">Пайвастшавӣ</span>
              </div>
              <div className="aspect-square bg-slate-100 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center group hover:bg-brand-accent transition-colors">
                <Tag className="w-10 h-10 mb-4 group-hover:text-white" />
                <span className="font-black uppercase tracking-widest text-[10px] group-hover:text-white">Олӣ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-12 leading-[0.85]">
            Ба омодаед <br /> <span className="text-brand-accent">Оғоз?</span>
          </h2>
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
              Машварат бо AI <ArrowRight className="w-5 h-5 text-brand-accent" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <div className="py-12 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
        Khabbllo Tech Showcase • © 2026
      </div>
    </div>
  );
};

export default TechMarketing;
