import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Code, 
  Zap, 
  Cpu, 
  Smartphone, 
  Globe, 
  Terminal, 
  ArrowRight,
  Layers,
  Box,
  Play,
  CheckCircle2
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const DartAcademy = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"basics" | "flutter" | "backend">("basics");

  const dartFeatures = [
    {
      title: "Optimized for UI",
      desc: "Dart is designed for building fast, high-performance user interfaces across all platforms.",
      icon: <Layers className="w-6 h-6" />
    },
    {
      title: "Productive Development",
      desc: "Hot Reload allows you to see changes instantly without losing state.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Fast on all Platforms",
      desc: "Compiles to ARM & x64 machine code for mobile, desktop, and backend.",
      icon: <Cpu className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white font-sans">
      {/* Exit Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-[100] p-4 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-xl transition-all border border-white/10 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Hero Section - Editorial Style */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-blue-400">
              Мастер-класси нави Dart
            </span>
            <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase mb-8">
              Забони <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Dart
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-white/40 font-medium leading-relaxed mb-12">
              Ояндаи таҳияи барномаҳои бисёрплатформаро аз худ кунед. Аз асосҳои забон то сохтани барномаҳои мураккаб бо Flutter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Concepts Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dartFeatures.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-zinc-900/50 border border-white/5 rounded-[2.5rem] group hover:bg-zinc-800/50 transition-all"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{feature.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Code Preview */}
      <section className="py-32 px-6 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                Синтаксиси <br /> <span className="text-blue-500">Тоза.</span>
              </h2>
              <p className="text-xl text-white/40 font-medium leading-relaxed mb-12">
                Dart дорои синтаксиси шинос ва қавӣ мебошад, ки омӯзиши онро барои таҳиягарони Java, C# ва JavaScript осон мекунад.
              </p>
              <div className="space-y-6">
                {[
                  "Strongly Typed",
                  "Null Safety by Default",
                  "Asynchronous Programming (Async/Await)",
                  "Rich Standard Library"
                ].map(item => (
                  <div key={item} className="flex items-center gap-4 text-lg font-bold">
                    <CheckCircle2 className="w-6 h-6 text-blue-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-black rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative group">
              <div className="absolute top-6 right-6">
                <Terminal className="w-6 h-6 text-white/20" />
              </div>
              <pre className="font-mono text-sm md:text-base text-blue-400 leading-relaxed overflow-x-auto">
                <code>{`void main() {
  print('Hello, Khabbllo!');
  
  var user = User(
    name: 'Developer',
    level: 'High-Level'
  );
  
  user.greet();
}

class User {
  final String name;
  final String level;

  User({required this.name, required this.level});

  void greet() {
    print('Welcome, $name. Status: $level');
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Flutter Integration */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6">Flutter & Dart</h2>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Дуэти пурқувват барои таҳияи барномаҳо</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-12 bg-white text-black rounded-[3rem] flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-all">
            <div>
              <Smartphone className="w-12 h-12 mb-8" />
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Мобилӣ</h3>
              <p className="text-lg font-bold opacity-70">Сохтани барномаҳои зебо ва зуд барои iOS ва Android аз як коди ягона.</p>
            </div>
            <div className="mt-12 flex items-center gap-4 font-black uppercase tracking-widest text-sm">
              Бештар <ArrowRight className="w-5 h-5" />
            </div>
          </div>
          <div className="p-12 bg-blue-600 text-white rounded-[3rem] flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-all">
            <div>
              <Globe className="w-12 h-12 mb-8" />
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Веб</h3>
              <p className="text-lg font-bold opacity-70">Истифодаи Dart барои сохтани веб-барномаҳои интерактивӣ ва мураккаб.</p>
            </div>
            <div className="mt-12 flex items-center gap-4 font-black uppercase tracking-widest text-sm text-white/70">
              Бештар <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Dart Quiz Section */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">Санҷиши дониш</h2>
            <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Викторинаи хурди Dart</p>
          </div>
          
          <div className="p-10 bg-zinc-900 border border-white/10 rounded-[2.5rem]">
            <h4 className="text-xl font-bold mb-8">Савол: Кадом калимаи калидӣ дар Dart барои эълони тағйирёбандае истифода мешавад, ки танҳо як маротиба таъин карда мешавад?</h4>
            <div className="space-y-4">
              {['var', 'final', 'dynamic', 'static'].map((option) => (
                <button 
                  key={option}
                  onClick={() => alert(option === 'final' ? 'Дуруст! final барои тағйирёбандаҳои яккарата истифода мешавад.' : 'Нодуруст. Бори дигар кӯшиш кунед.')}
                  className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-left font-bold hover:bg-blue-500 hover:border-blue-500 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 text-center bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <Box className="w-16 h-16 text-blue-500 mx-auto mb-12 animate-bounce" />
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-12 leading-[0.85]">
            Омодаед ба <br /> <span className="text-blue-500">Кодгузорӣ?</span>
          </h2>
          <p className="text-2xl text-white/40 font-medium leading-relaxed mb-16 italic font-serif">
            "Dart на танҳо як забон аст, он як воситаи сохтани таҷрибаҳои аҷиби корбарӣ мебошад."
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all"
            >
              Оғози омӯзиш
            </button>
            <Link 
              to="/chat"
              className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Terminal className="w-5 h-5 text-blue-500" /> Машварат бо AI
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <div className="py-12 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
        Академияи Dart Khabbllo • © 2026
      </div>
    </div>
  );
};

export default DartAcademy;
