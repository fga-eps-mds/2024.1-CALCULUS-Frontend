import {userApi} from '@/services/apis.service';
import {
  createUser,
  loginWithEmailAndPassword,
  getUsers,
  updateUserRole,
} from '@/services/user.service';
import { UserRole } from '@/lib/enum/userRole.enum';

jest.mock('@/services/apis.service');
const mockedApi = userApi as jest.Mocked<typeof userApi>;

describe('User Service', () => {
  describe('updateUserRole', () => {
    it('should update the user role and return the updated user', async () => {
      const userId = '1';
      const newRole: UserRole = UserRole.PROFESSOR;
      const mockResponse = { data: { id: '1', role: newRole } };
      mockedApi.patch.mockResolvedValueOnce(mockResponse);

      const result = await updateUserRole(userId, newRole);

      expect(mockedApi.patch).toHaveBeenCalledWith(`/users/${userId}/role`, {
        role: newRole,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when the API call fails', async () => {
      const userId = '1';
      const newRole: UserRole = UserRole.PROFESSOR;
      const mockError = new Error('Failed to update user role');
      mockedApi.patch.mockRejectedValueOnce(mockError);

      await expect(updateUserRole(userId, newRole)).rejects.toThrow(
        'Failed to update user role',
      );
    });
  });

  describe('createUser', () => {
    it('should create a user and return the user data', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        username: 'johndoe',
        password: 'password123',
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
        name: 'John Doe',
        email: 'john@example.com',
        username: 'johndoe',
        password: 'password123',
        role: UserRole.ALUNO,
      };
      const mockError = {
        response: { data: { message: 'Error creating user' } },
      };
      mockedApi.post.mockRejectedValueOnce(mockError);

      const result = await createUser(userData);

      expect(mockedApi.post).toHaveBeenCalledWith('users', userData);
      expect(result).toEqual({ error: 'Error creating user' });
    });
  });

  describe('loginWithEmailAndPassword', () => {
    it('should log in with email and password and return the response', async () => {
      const email = 'john@example.com';
      const password = 'password123';
      const mockResponse = { data: { token: 'abc123' } };
      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const result = await loginWithEmailAndPassword(email, password);

      expect(mockedApi.post).toHaveBeenCalledWith('auth/login', {
        email,
        password,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors and return null', async () => {
      const email = 'john@example.com';
      const password = 'password123';
      const mockError = new Error('Login failed');
      mockedApi.post.mockRejectedValueOnce(mockError);

      const result = await loginWithEmailAndPassword(email, password);

      expect(mockedApi.post).toHaveBeenCalledWith('auth/login', {
        email,
        password,
      });
      expect(result).toBeNull();
    });
  });

  describe('getUsers', () => {
    it('should fetch users and return the data', async () => {
      const mockResponse = { data: [{ id: '1', name: 'John Doe' }] };
      mockedApi.get.mockResolvedValueOnce(mockResponse);

      const result = await getUsers();

      expect(mockedApi.get).toHaveBeenCalledWith('/users');
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle errors and throw an error', async () => {
      const mockError = new Error('Failed to fetch users');
      mockedApi.get.mockRejectedValueOnce(mockError);

      await expect(getUsers()).rejects.toThrow('Failed to fetch users');
    });
  });
});
