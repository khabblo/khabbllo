export interface Product {
  id: string;
  name: string;
  price: number;
  cost: number;
  sales: number;
  status: 'active' | 'low_stock' | 'out_of_stock';
  image: string;
  supplier: string;
  category: string;
  profit: number;
}

export interface SalesData {
  date: string;
  revenue: number;
  profit: number;
  orders: number;
}

export interface Supplier {
  id: string;
  name: string;
  rating: number;
  reliability: number;
  shippingTime: string;
  activeProducts: number;
}

export interface AIInsight {
  id: string;
  productName: string;
  trendScore: number;
  reason: string;
  recommendedPrice: number;
  potentialROI: number;
  source: 'TikTok' | 'Instagram' | 'Google Trends';
}
