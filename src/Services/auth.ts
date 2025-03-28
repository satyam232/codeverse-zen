import apiClient from '@/lib/api-client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
}

type AuthStateCallback = (isAuthenticated: boolean) => void;

const subscribers: AuthStateCallback[] = [];

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      subscribers.forEach(cb => cb(true));
    }
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      subscribers.forEach(cb => cb(true));
    }
    return response.data;
  },

  async logout(): Promise<void> {
    try {
        const token = this.getToken();
        if (!token) throw new Error('Authentication required');
      await apiClient.post('/auth/logout',{
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('auth_token',);
      localStorage.removeItem('localEditorState');
      subscribers.forEach(cb => cb(false));
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  async getCurrentUser(): Promise<AuthResponse['user']> {
    const token = this.getToken();
    if (!token) throw new Error('Authentication required');
    const response = await apiClient.get<AuthResponse>('/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.data.user) throw new Error('User data not found in response');
    return response.data.user;
  },

  async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user.isAdmin;
  },

  async getAdminUsers(): Promise<User[]> {
    const token = this.getToken();
    if (!token) throw new Error('Authentication required');
    const response = await apiClient.get<User[]>('/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  

  onAuthStateChanged(callback: AuthStateCallback): () => void {
    subscribers.push(callback);
    return () => {
      const index = subscribers.indexOf(callback);
      if (index !== -1) subscribers.splice(index, 1);
    };
  }
};