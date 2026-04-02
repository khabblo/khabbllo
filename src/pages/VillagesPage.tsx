import * as React from "react";
import { MapPin, Search, ChevronRight, Info } from "lucide-react";
import { motion } from "motion/react";

const VILLAGES = [
  { id: 1, name: "Варзоб", region: "Ноҳияҳои тобеи ҷумҳурӣ", description: "Минтақаи истироҳатии машҳур дар наздикии Душанбе.", image: "https://picsum.photos/seed/varzob/800/600" },
  { id: 2, name: "Ромит", region: "Ваҳдат", description: "Дараи зебо бо табиати нотакрор ва оби зулол.", image: "https://picsum.photos/seed/romit/800/600" },
  { id: 3, name: "Ҳисор", region: "Ҳисор", description: "Маркази таърихӣ бо қалъаи машҳури Ҳисор.", image: "https://picsum.photos/seed/hissar/800/600" },
  { id: 4, name: "Кӯлоб", region: "Хатлон", description: "Шаҳри қадимӣ бо фарҳанги бой ва меҳмоннавозӣ.", image: "https://picsum.photos/seed/kulob/800/600" },
  { id: 5, name: "Хуҷанд", region: "Суғд", description: "Маркази иқтисодӣ ва фарҳангии шимоли Тоҷикистон.", image: "https://picsum.photos/seed/khujand/800/600" },
  { id: 6, name: "Хоруғ", region: "ВМКБ", description: "Шаҳри баландкӯҳ дар қалби Помир.", image: "https://picsum.photos/seed/khorog/800/600" },
  { id: 7, name: "Панҷакент", region: "Суғд", description: "Ватани Рӯдакӣ ва шаҳри бостонии Саразм.", image: "https://picsum.photos/seed/panjakent/800/600" },
  { id: 8, name: "Истаравшан", region: "Суғд", description: "Шаҳри ҳунармандон ва ёдгориҳои таърихӣ.", image: "https://picsum.photos/seed/istaravshan/800/600" },
];

const VillagesPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredVillages = VILLAGES.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="f-pattern-container">
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6 mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-primary/10 rounded-2xl">
                <MapPin className="w-8 h-8 text-brand-primary" />
              </div>
              <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-xs">Тоҷикистон</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              Қишлоқҳо ва <br /> <span className="text-brand-primary">Маҳалҳо</span>
            </h1>
          </motion.div>
          <p className="text-brand-muted text-xl max-w-2xl font-medium leading-relaxed">
            Рӯйхати қишлоқҳо ва минтақаҳои Тоҷикистон. Маълумот дар бораи ҷойгиршавӣ ва хусусиятҳои ҳар як маҳал.
          </p>
        </header>

        <div className="relative mb-10 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Ҷустуҷӯи қишлоқ ё ноҳия..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVillages.map((village, index) => (
            <motion.div
              key={village.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={village.image} 
                  alt={village.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-primary text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                    {village.region}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-900">{village.name}</h3>
                  <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <Info className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {village.description}
                </p>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-brand-primary hover:text-white text-brand-muted font-bold text-sm rounded-xl transition-all group/btn">
                  Муфассалтар
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredVillages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ҳеҷ чиз ёфт нашуд</h3>
            <p className="text-brand-muted">Лутфан калимаи дигарро санҷед.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VillagesPage;
