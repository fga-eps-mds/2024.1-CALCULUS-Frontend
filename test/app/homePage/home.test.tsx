import JourneyService from '@/components/home/service/home.services';
import axios from 'axios';
import { toast } from 'sonner';

jest.mock('axios');
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('JourneyService', () => {
  const { fetchUserJourneys, fetchJourneys, fetchJourneyById, fetchPoints, fetchJourneybyPoint } = JourneyService();

  describe('fetchUserJourneys', () => {
    it('should return an empty array and show an error toast if no session exists', async () => {
      const result = await fetchUserJourneys(null);

      expect(result).toEqual([]);
      expect(toast.error).toHaveBeenCalledWith('Você precisa estar logado para ver suas jornadas.');
      expect(axios.get).not.toHaveBeenCalled(); // Garantindo que axios.get não é chamado
    });

    it('should return an empty array and log an error if the request fails', async () => {
      const mockSession = { user: { id: 'user123' } };
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = await fetchUserJourneys(mockSession);

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar jornadas:', expect.any(Error));

      consoleSpy.mockRestore();
    });
  });

  describe('fetchJourneys', () => {
    it('should return data when the request is successful', async () => {
      const mockData = [{ id: '1', title: 'Journey 1' }];
      (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

      const result = await fetchJourneys();

      expect(result).toEqual(mockData);
    });

    it('should return null and log an error if the request fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = await fetchJourneys();

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar jornada:', expect.any(Error));

      consoleSpy.mockRestore();
    });
  });

  describe('fetchJourneyById', () => {
    it('should return data when the request is successful', async () => {
      const mockData = { id: '1', title: 'Journey 1' };
      (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

      const result = await fetchJourneyById('1');

      expect(result).toEqual(mockData);
    });

    it('should return null and log an error if the request fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = await fetchJourneyById('1');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar jornada com ID 1:', expect.any(Error));

      consoleSpy.mockRestore();
    });
  });

  describe('fetchPoints', () => {
    it('should return data when the request is successful', async () => {
      const mockData = [{ id: '1', name: 'Start Point 1' }];
      (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

      const result = await fetchPoints();

      expect(result).toEqual(mockData);
    });

    it('should return null and log an error if the request fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = await fetchPoints();

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar pontos de partida:', expect.any(Error));

      consoleSpy.mockRestore();
    });
  });

  describe('fetchJourneybyPoint', () => {
    it('should return data when the request is successful', async () => {
      const mockData = ['2', '3'];
      (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

      const result = await fetchJourneybyPoint('1');

      expect(result).toEqual(mockData);
    });

    it('should return null and log an error if the request fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = await fetchJourneybyPoint('1');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar jornadas do Ponto de Partida com ID 1:', expect.any(Error));

      consoleSpy.mockRestore();
    });
  });
});