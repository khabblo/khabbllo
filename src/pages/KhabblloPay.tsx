import * as React from "react";
import { motion } from "motion/react";
import { 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Globe, 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownRight,
  Smartphone,
  Lock,
  Clock,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

const KhabblloPay = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#1A1A1A] selection:bg-blue-100">
      <main className="pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                <ShieldCheck className="w-3 h-3" /> Амнияти сатҳи бонкӣ
              </div>
              <h1 className="text-6xl md:text-9xl font-black leading-[0.9] mb-8 tracking-tighter uppercase">
                Қарорҳои <br />пардохти ҳушманд <br />барои <span className="text-blue-600">ҷаҳони рақамӣ.</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
                Платформаи боэътимоди пардохти рақамии шумо, ки барои транзаксияҳои зуд, бехатар ва қулай тарҳрезӣ шудааст. Маблағҳои худро дар ҳар вақт ва дар ҳар ҷо идора кунед.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all group">
                  Оғоз кунед <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white text-black border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <Smartphone className="w-5 h-5" /> Боргирии барнома
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative"
            >
              {/* Minimal Card UI */}
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 relative z-10">
                <div className="flex items-center justify-between mb-12">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Баланси умумӣ</p>
                    <p className="text-3xl font-light tracking-tight">$42,850.00</p>
                  </div>
                </div>

                <div className="space-y-6 mb-12">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-500 shadow-sm">
                        <ArrowDownRight className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Аз Сара гирифта шуд</p>
                        <p className="text-[10px] text-slate-400 font-medium">Имрӯз, 10:24 AM</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-600">+$1,200.00</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Пардохт ба Apple</p>
                        <p className="text-[10px] text-slate-400 font-medium">Дирӯз, 4:15 PM</p>
                      </div>
                    </div>
                    <p className="font-bold text-slate-900">-$159.00</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-blue-600 text-white p-4 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-colors">Фиристодани пул</button>
                  <button className="bg-slate-100 text-slate-900 p-4 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors">Дархост</button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/10 blur-[80px] rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/5 blur-[80px] rounded-full" />
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-32" id="features">
            {[
              {
                icon: <Lock className="w-6 h-6" />,
                title: "Бехатар ва боэътимод",
                description: "Бехатарии шумо аввалиндараҷаи мост. Мо рамзгузории муосир ва системаҳои бехатарро барои ҳифзи маълумоти шумо дар ҳар қадам истифода мебарем."
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Пардохтҳои зуд ва осон",
                description: "Танҳо бо чанд клик пулро фавран фиристед ва қабул кунед. Бидуни таъхир, бидуни мушкилот — танҳо амалиёти осон."
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Барои ҳама",
                description: "Аз истифодаи шахсӣ то пардохтҳои тиҷоратӣ, KhabblloPay барои хидматрасонӣ ба ҳама бо самаранокӣ ва қулай сохта шудааст."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-black mb-8 group-hover:bg-black group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Why Choose Section */}
          <div className="bg-black text-white rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform translate-x-1/4" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">Чаро KhabblloPay-ро интихоб кунед?</h2>
                <div className="space-y-6">
                  {[
                    "Интиқоли фаврии пул 24/7",
                    "Транзаксияҳои бехатар ва рамзгузоришуда",
                    "Интерфейси оддӣ ва муосир",
                    "Иҷрои боэътимод, ки шумо метавонед ба он такя кунед",
                    "Пардохти пасти транзаксия барои тиҷорат"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <p className="text-lg font-medium text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Иҷрои вақти воқеӣ</h4>
                    <p className="text-xs text-slate-400">Вақти корӣ: 99.99%</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-blue-600" 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <span>Суръати транзаксия</span>
                    <span className="text-white">0.2с Миёна</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-32 text-center">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8">Оддӣ. Бехатар. Ҳушманд.</h2>
            <p className="text-slate-500 mb-12 max-w-xl mx-auto">Ба ҳазорон корбароне ҳамроҳ шавед, ки ба KhabblloPay барои амалиёти молиявии ҳаррӯзаи худ эътимод доранд.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="bg-black text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-zinc-800 transition-all shadow-xl shadow-black/10">
                Ҳисоби худро кушоед
              </button>
              <Link to="/dashboard" className="text-slate-500 font-bold hover:text-black transition-colors flex items-center gap-2">
                Бозгашт ба панел <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default KhabblloPay;
