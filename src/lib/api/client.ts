import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import moment from 'moment';

interface ApiClientConfig {
  baseUrl: string;
  token?: string;
}

class ApiClient {
  private instance: AxiosInstance;

  constructor(config: ApiClientConfig) {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.token ? `Bearer ${config.token}` : undefined,
      },
    });
  }

  async getUserData(): Promise<any> {
    try {
      const response = await this.instance.get('/api/users/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  async createGoal(goalData: any): Promise<any> {
    try {
      const response = await this.instance.post('/api/goals', goalData);
      return response.data;
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  }

  async updateGoal(goalId: number, goalData: any): Promise<any> {
    try {
      const response = await this.instance.put(`/api/goals/${goalId}`, goalData);
      return response.data;
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  }

  async deleteGoal(goalId: number): Promise<boolean> {
    try {
      await this.instance.delete(`/api/goals/${goalId}`);
      return true;
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  }

  // Add other API methods as needed

  get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.get(url, config);
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.post(url, data, config);
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.put(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.delete(url, config);
  }
}

export default ApiClient;