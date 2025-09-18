// Types pour les futures intégrations API

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// Types pour l'authentification
export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: 'customer' | 'admin' | 'manager';
  createdAt: string;
  lastLogin?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// Types pour les commandes
export interface OrderItem {
  burgerId: number;
  quantity: number;
  customizations?: {
    size?: 'small' | 'medium' | 'large';
    extras?: string[];
    removedIngredients?: string[];
  };
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  totalAmount: number;
  tax: number;
  finalAmount: number;
  paymentMethod: 'card' | 'cash' | 'paypal';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  estimatedTime?: number; // en minutes
  createdAt: string;
  updatedAt: string;
}

// Types pour les analytics
export interface BurgerStats {
  burgerId: number;
  salesCount: number;
  revenue: number;
  averageRating: number;
  popularityRank: number;
}

export interface DailySales {
  date: string;
  orderCount: number;
  revenue: number;
  averageOrderValue: number;
  topSellingBurger: {
    id: number;
    name: string;
    sales: number;
  };
}