import apiClient from '@/lib/api-client';
import { authService } from './auth';

export interface ExecutionRequest {
  language: string;
  code: string;
}

export interface ExecutionResult {
  success: boolean;
  error?: string;
  output: {
    success: boolean;
    output: string;
    error: string | null;
  };
}

export const codeExecutionService = {
  async executeCode(request: ExecutionRequest): Promise<ExecutionResult> {
    try {
     const token = authService.getToken();
      if (!token) throw new Error('Authentication required');
      const response = await apiClient.post<ExecutionResult>('/execute/execute', request, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(response.status === 401){
        // authService.logout();
        return {
          success: false,
          output: {
            success: false,
            output: '',
            error: 'Unauthrized User Please Login'
          }
        };
      }
      return response.data;
    } catch (error) {
      console.error('Execution failed:', error);
      return {
        success: false,
        output: {
          success: false,
          output: '',
          error: 'Unauthrized User Please Login'
        }
      };
    }
  }
};