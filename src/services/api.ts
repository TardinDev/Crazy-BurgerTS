// Service API centralisé pour les futures intégrations

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Méthodes CRUD génériques
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // Endpoints spécifiques
  burgers = {
    getAll: () => this.get('/burgers'),
    getById: (id: number) => this.get(`/burgers/${id}`),
    create: (burger: any) => this.post('/burgers', burger),
    update: (id: number, burger: any) => this.put(`/burgers/${id}`, burger),
    delete: (id: number) => this.delete(`/burgers/${id}`),
  };

  orders = {
    getAll: () => this.get('/orders'),
    getById: (id: string) => this.get(`/orders/${id}`),
    create: (order: any) => this.post('/orders', order),
    updateStatus: (id: string, status: string) =>
      this.put(`/orders/${id}/status`, { status }),
  };

  auth = {
    login: (credentials: any) => this.post('/auth/login', credentials),
    register: (userData: any) => this.post('/auth/register', userData),
    refreshToken: (refreshToken: string) =>
      this.post('/auth/refresh', { refreshToken }),
    logout: () => this.post('/auth/logout', {}),
  };
}

export const apiService = new ApiService(API_BASE_URL);
export default apiService;