import * as React from "react";
import { motion } from "motion/react";
import { ArrowRight, Shield, Star, Award, Diamond } from "lucide-react";

const LuxuryPost = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-white selection:text-black">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Micro-label */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-display font-light text-white/60">
              Коллективи маркетингии истисноӣ
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif font-light leading-[0.9] tracking-tight mb-16"
          >
            Ба сатҳи нави <span className="italic">муваффақият</span> қадам гузоред.
          </motion.h1>

          {/* Body Content */}
          <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <p className="text-xl md:text-2xl font-serif font-light leading-relaxed text-white/80">
                Мо маркетинги мукаммал ва пуртаъсирро таҳия мекунем, ки бренди шуморо боло мебарад ва муштариёни сазовори шуморо ҷалб мекунад.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="space-y-8"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Diamond className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-display font-medium mb-2">Бо дақиқӣ тарҳрезӣ шудааст</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light">Ҳар як ҷузъиёт бодиққат баррасӣ карда мешавад, то мувофиқати мутлақи брендро таъмин кунад.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-display font-medium mb-2">Бо аълочигӣ расонида мешавад</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light">Сифати бефосила, ки шуморо дар бозори серодам фарқ мекунад.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-24" 
          />

          {/* Final Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-serif italic font-light mb-12">
              Зеро тиҷорати шумо оддӣ нест — он истисноӣ аст.
            </h2>
            
            <button className="group relative px-12 py-5 overflow-hidden rounded-full border border-white/20 transition-all hover:border-white">
              <div className="relative z-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-display font-medium">
                Дархости машварати хусусӣ <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="absolute inset-0 bg-white translate-y-full transition-transform group-hover:translate-y-0" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                 <span className="text-[10px] uppercase tracking-[0.3em] font-display font-medium text-black">Дархости машварати хусусӣ</span>
              </div>
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer Meta */}
      <footer className="fixed bottom-10 left-10 right-10 flex justify-between items-end pointer-events-none opacity-40">
        <div className="text-[8px] uppercase tracking-[0.5em] font-display vertical-text">
          EST. 2026
        </div>
        <div className="text-[8px] uppercase tracking-[0.5em] font-display">
          Khabbllo Prestige &copy;
        </div>
      </footer>
    </div>
  );
};

export default LuxuryPost;
