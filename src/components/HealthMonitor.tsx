import * as React from "react";
import { useState, useEffect } from "react";

const HealthMonitor = () => {
  const [isHealthy, setIsHealthy] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch("/api/health");
        if (!res.ok) throw new Error("Health check failed");
        setIsHealthy(true);
      } catch (err) {
        setIsHealthy(false);
      }
    };

    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  if (isHealthy) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-red-500 text-white text-center py-2 text-xs font-bold animate-pulse">
      Мушкилоти пайвастшавӣ ошкор карда шуд. Мо барои барқарор кардани хидмати пурра кор карда истодаем.
    </div>
  );
};

export default HealthMonitor;
