import { userApi } from '@/services/apis.service';
import {
  createUser,
  loginWithEmailAndPassword,
  loginWithFederatedProvider,
  getUsers,
  updateUserRole,
  forgotPassword,
  resetPassword,
} from '@/services/user.service';
import { UserRole } from '@/lib/enum/userRole.enum';

jest.mock('@/services/apis.service');
const mockedApi = userApi as jest.Mocked<typeof userApi>;

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user and return user data', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        username: 'joaosilva',
        password: 'senha123',
        role: UserRole.ALUNO,
      };
      const mockResponse = { data: userData };
      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const result = await createUser(userData);

      expect(mockedApi.post).toHaveBeenCalledWith('users', userData);
      expect(result).toEqual({ data: mockResponse.data });
    });

    it('should handle errors and return an error message', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        username: 'joaosilva',
        password: 'senha123',
        role: UserRole.ALUNO,
      };
      const mockError = { response: { data: { message: 'Erro ao criar usuário' } } };
      mockedApi.post.mockRejectedValueOnce(mockError);

      const result = await createUser(userData);

      expect(mockedApi.post).toHaveBeenCalledWith('users', userData);
      expect(result).toEqual({ error: 'Erro ao criar usuário' });
    });
  });

  describe('loginWithEmailAndPassword', () => {
    it('should log in with email and password and return response', async () => {
      const email = 'joao@example.com';
      const password = 'senha123';
      const mockResponse = { data: { token: 'abc123' } };
      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const result = await loginWithEmailAndPassword(email, password);

      expect(mockedApi.post).toHaveBeenCalledWith('auth/login', { email, password });
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors and return null', async () => {
      const email = 'joao@example.com';
      const password = 'senha123';
      const mockError = new Error('Falha no login');
      mockedApi.post.mockRejectedValueOnce(mockError);

      const result = await loginWithEmailAndPassword(email, password);

      expect(mockedApi.post).toHaveBeenCalledWith('auth/login', { email, password });
      expect(result).toBeNull();
    });
  });

  // describe('getUsers', () => {
  //   it('deve buscar usuários e retornar os dados', async () => {
  //     const token = 'token_valido';
  //     const mockResponse = { data: [{ id: '1', name: 'João Silva' }] };
  //     mockedApi.get.mockResolvedValueOnce(mockResponse);

  //     const resultado = await getUsers(token);

  //     expect(mockedApi.get).toHaveBeenCalledWith('/users', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     expect(resultado).toEqual(mockResponse);
  //   });

  //   it('deve lidar com erros e lançar uma exceção', async () => {
  //     const token = 'token_valido';
  //     const mockError = new Error('Falha ao buscar usuários');
  //     mockedApi.get.mockRejectedValueOnce(mockError);

  //     await expect(getUsers(token)).rejects.toThrow('Falha ao buscar usuários');
  //   });
  // });

  describe('updateUserRole', () => {
    beforeEach(() => {
      jest.clearAllMocks(); 
    });
  
    it('deve atualizar o papel do usuário e retornar o usuário atualizado', async () => {
      const userId = '1';
      const newRole = UserRole.PROFESSOR;
      const mockResponse = { data: { id: '1', role: newRole } };
  
      mockedApi.patch.mockResolvedValueOnce(mockResponse);
  
      const resultado = await updateUserRole(userId, newRole);
  
      expect(mockedApi.patch).toHaveBeenCalledWith(`/users/${userId}/role`, { role: newRole });
      expect(resultado).toEqual(mockResponse.data);
    });
  
    it('deve lidar com erros e lançar uma exceção', async () => {
      const userId = '1';
      const newRole = UserRole.PROFESSOR;
      const mockError = new Error('Falha ao atualizar o papel do usuário');
  
      mockedApi.patch.mockRejectedValueOnce(mockError);
  
      await expect(updateUserRole(userId, newRole)).rejects.toThrow('Falha ao atualizar o papel do usuário');
    });
  });

  // describe('forgotPassword', () => {
  //   it('deve solicitar a redefinição de senha', async () => {
  //     const data = { email: 'joao@example.com' };
  //     const mockResponse = { data: { message: 'Redefinição de senha solicitada' } };
  //     mockedApi.post.mockResolvedValueOnce(mockResponse);

  //     const resultado = await forgotPassword(data);

  //     expect(mockedApi.post).toHaveBeenCalledWith('/auth/forgot-password', data);
  //     expect(resultado).toEqual(mockResponse.data);
  //   });

  //   it('deve lidar com erros', async () => {
  //     const data = { email: 'joao@example.com' };
  //     const mockError = new Error('Falha ao solicitar redefinição de senha');
  //     mockedApi.post.mockRejectedValueOnce(mockError);

  //     await expect(forgotPassword(data)).rejects.toThrow('Falha ao solicitar redefinição de senha');
  //   });
  // });

  describe('resetPassword', () => {
    it('deve redefinir a senha e retornar a resposta', async () => {
      const data = { token: 'token_redefinicao', newPassword: 'nova_senha' };
      const mockResponse = { data: { message: 'Senha redefinida com sucesso' } };
      mockedApi.put.mockResolvedValueOnce(mockResponse);

      const resultado = await resetPassword(data);

      expect(mockedApi.put).toHaveBeenCalledWith('/auth/reset-password', data);
      expect(resultado).toEqual(mockResponse.data);
    });

    it('deve lidar com erros', async () => {
      const data = { token: 'token_redefinicao', newPassword: 'nova_senha' };
      const mockError = new Error('Falha ao redefinir a senha');
      mockedApi.put.mockRejectedValueOnce(mockError);

      await expect(resetPassword(data)).rejects.toThrow('Falha ao redefinir a senha');
    });
  });
});
