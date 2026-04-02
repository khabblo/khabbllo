import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-full mb-8"
        >
          <AlertCircle className="w-10 h-10" />
        </motion.div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">
          Саҳифа ёфт нашуд
        </h1>
        <p className="text-slate-600 mb-8 text-lg">
          Бубахшед, саҳифае, ки шумо меҷӯед, вуҷуд надорад ё кӯчонида шудааст.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
        >
          <Home className="w-5 h-5" />
          Ба саҳифаи асосӣ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
