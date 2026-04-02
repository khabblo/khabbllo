import { useState, useEffect } from 'react';
import { Product, SalesData, AIInsight, Supplier } from '../types/dropshipping';
import { dropshippingService } from '../services/dropshippingService';

export const useDropshipping = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [p, s, ai, sup] = await Promise.all([
          dropshippingService.getProducts(),
          dropshippingService.getSalesData(),
          dropshippingService.getAIInsights(),
          dropshippingService.getSuppliers()
        ]);
        setProducts(p);
        setSalesData(s);
        setAIInsights(ai);
        setSuppliers(sup);
      } catch (err) {
        setError("Хатогӣ ҳангоми боркунии маълумот.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, salesData, aiInsights, suppliers, loading, error };
};
