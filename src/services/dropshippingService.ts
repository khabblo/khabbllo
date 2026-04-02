import { Product, SalesData, AIInsight, Supplier } from '../types/dropshipping';

// Ин хидмат мантиқи "Backend"-ро симулятсия мекунад
// Дар лоиҳаи воқеӣ ин қисм метавонад бо Python (Flask/Django) сохта шавад
export const dropshippingService = {
  getProducts: async (): Promise<Product[]> => {
    // Симулятсияи API call
    return [
      {
        id: '1',
        name: "Khabllo Ultra Watch",
        price: 45.99,
        cost: 12.50,
        sales: 124,
        status: "active",
        image: "https://picsum.photos/seed/watch/400/400",
        supplier: "AliExpress Global",
        category: "Electronics",
        profit: 33.49
      },
      {
        id: '2',
        name: "Smart Home Hub Pro",
        price: 89.00,
        cost: 34.00,
        sales: 89,
        status: "low_stock",
        image: "https://picsum.photos/seed/home/400/400",
        supplier: "CJ Dropshipping",
        category: "Smart Home",
        profit: 55.00
      },
      {
        id: '3',
        name: "Wireless Noise Cancelling Pods",
        price: 29.99,
        cost: 8.20,
        sales: 456,
        status: "active",
        image: "https://picsum.photos/seed/audio/400/400",
        supplier: "AliExpress Global",
        category: "Audio",
        profit: 21.79
      }
    ];
  },

  getSalesData: async (): Promise<SalesData[]> => {
    return [
      { date: 'Душ', revenue: 4000, profit: 2400, orders: 45 },
      { date: 'Сеш', revenue: 3000, profit: 1398, orders: 32 },
      { date: 'Чор', revenue: 2000, profit: 9800, orders: 28 },
      { date: 'Панҷ', revenue: 2780, profit: 3908, orders: 39 },
      { date: 'Ҷум', revenue: 1890, profit: 4800, orders: 48 },
      { date: 'Шан', revenue: 2390, profit: 3800, orders: 38 },
      { date: 'Якш', revenue: 3490, profit: 4300, orders: 43 },
    ];
  },

  getAIInsights: async (): Promise<AIInsight[]> => {
    return [
      {
        id: 'ai-1',
        productName: "Portable Espresso Maker",
        trendScore: 98,
        reason: "Талабот дар TikTok дар 48 соати охир 300% афзоиш ёфтааст.",
        recommendedPrice: 49.99,
        potentialROI: 4.5,
        source: 'TikTok'
      },
      {
        id: 'ai-2',
        productName: "Eco-Friendly Yoga Mat",
        trendScore: 85,
        reason: "Google Trends афзоиши ҷустуҷӯи 'sustainable fitness'-ро нишон медиҳад.",
        recommendedPrice: 35.00,
        potentialROI: 3.2,
        source: 'Google Trends'
      }
    ];
  },

  getSuppliers: async (): Promise<Supplier[]> => {
    return [
      { id: 's1', name: "AliExpress Global", rating: 4.8, reliability: 95, shippingTime: "7-14 рӯз", activeProducts: 1200 },
      { id: 's2', name: "CJ Dropshipping", rating: 4.5, reliability: 92, shippingTime: "5-10 рӯз", activeProducts: 850 },
      { id: 's3', name: "Zendrop", rating: 4.9, reliability: 98, shippingTime: "3-7 рӯз", activeProducts: 450 }
    ];
  }
};
