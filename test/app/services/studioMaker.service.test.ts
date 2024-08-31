import {
  getJourneys,
  getJourneysByUser,
  createJourney,
  updateJourneyById,
  deleteJourney,
  getTrails,
  updateTrailById,
  createTrail,
  deleteTrail,
  getJourney,
  getStartPoints,
  getStartPointsByUser,
  createStartPoint,
  updateStartPointById,
  deleteStartPoint,
} from '@/services/studioMaker.service';
import { studioMakerApi } from '@/services/apis.service';

jest.mock('@/services/apis.service');

describe('Serviço de Jornadas e Trilhas', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Deve retornar todas os pontos de partida com sucesso', async () => {
    const mockData = [
      {
        id: '1',
        name: 'Test Start Point',
        description: 'Start Point Test Description',
      },
    ];
    (studioMakerApi.get as jest.Mock).mockResolvedValue({ data: mockData });

    const startPoints = await getStartPoints();
    expect(startPoints).toEqual(mockData);
    expect(studioMakerApi.get).toHaveBeenCalledWith('/points');
  });

  test('Deve falhar ao buscar pontos de partida', async () => {
    (studioMakerApi.get as jest.Mock).mockRejectedValue(
      new Error('Falha ao buscar pontos de partida'),
    );

    await expect(getStartPoints()).rejects.toThrow(
      'Falha ao buscar pontos de partida',
    );
  });

  test('Deve retornar pontos de partida do usuário com sucesso', async () => {
    const mockData = [
      {
        id: '1',
        name: 'User Start Point',
        description: 'User Start Point Description',
      },
    ];
    const userId = '321';
    (studioMakerApi.get as jest.Mock).mockResolvedValue({ data: mockData });

    const startPoints = await getStartPointsByUser(userId);
    expect(startPoints).toEqual(mockData);
    expect(studioMakerApi.get).toHaveBeenCalledWith(`/points/user/${userId}`);
  });

  test('Deve falhar ao buscar pontos de partida do usuário', async () => {
    const userId = '321';
    (studioMakerApi.get as jest.Mock).mockRejectedValue(
      new Error('Falha ao buscar pontos de partida do usuário'),
    );

    await expect(getStartPointsByUser(userId)).rejects.toThrow(
      'Falha ao buscar pontos de partida do usuário',
    );
  });

  test('Deve criar um novo ponto de partida com sucesso', async () => {
    const mockData = [
      {
        id: '1',
        name: 'Test Start Point',
        description: 'Start Point Test Description',
      },
    ];
    const token = 'fake-token';
    (studioMakerApi.post as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await createStartPoint({ data: mockData, token });
    expect(result.data).toEqual(mockData);
    expect(studioMakerApi.post).toHaveBeenCalledWith('/points', mockData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  test('Deve falhar ao criar um novo ponto de partida', async () => {
    const token = 'fake-token';
    (studioMakerApi.post as jest.Mock).mockRejectedValue(
      new Error('Falha ao criar ponto de partida'),
    );

    const result = await createStartPoint({ data: {}, token });

    if (result.error instanceof Error) {
      expect(result.error.message).toBe('Falha ao criar ponto de partida');
    } else {
      throw new Error('Erro esperado não é uma instância de Error');
    }
  });

  test('Deve atualizar um ponto de partida por ID com sucesso', async () => {
    const mockData = [
      {
        id: '1',
        name: 'Update Test Start Point',
        description: 'Start Point Update Test Description',
      },
    ];
    const id = '1';
    const token = 'fake-token';
    (studioMakerApi.put as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await updateStartPointById({ id, data: mockData, token });
    expect(result.data).toEqual(mockData);
    expect(studioMakerApi.put).toHaveBeenCalledWith(`/points/${id}`, mockData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  test('Deve falhar ao atualizar um ponto de partida', async () => {
    const id = '1';
    const token = 'fake-token';
    (studioMakerApi.put as jest.Mock).mockRejectedValue(
      new Error('Falha ao atualizar ponto de partida'),
    );

    const result = await updateStartPointById({ id, data: {}, token });
    if (result.error instanceof Error) {
      expect(result.error.message).toBe('Falha ao atualizar ponto de partida');
    } else {
      throw new Error('Erro esperado não é uma instância de Error');
    }
  });

  test('Deve excluir um ponto de partida por ID com sucesso', async () => {
    const mockData = [
      {
        id: '1',
        name: 'Delete Test Start Point',
        description: 'Start Point Delete Test Description',
      },
    ];
    const id = '1';
    const token = 'fake-token';
    (studioMakerApi.delete as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await deleteStartPoint({ id, token });
    expect(result.data).toEqual(mockData);
    expect(studioMakerApi.delete).toHaveBeenCalledWith(`/points/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  test('Deve falhar ao excluir um ponto de partida', async () => {
    const id = '1';
    const token = 'fake-token';
    (studioMakerApi.delete as jest.Mock).mockRejectedValue(
      new Error('Falha ao excluir ponto de partida'),
    );

    const result = await deleteStartPoint({ id, token });

    if (result.error instanceof Error) {
      expect(result.error.message).toBe('Falha ao excluir ponto de partida');
    } else {
      throw new Error('Erro esperado não é uma instância de Error');
    }
  });

  test('Deve retornar todas as jornadas com sucesso', async () => {
    const mockData = [{ id: '1', name: 'Jornada Teste' }];
    (studioMakerApi.get as jest.Mock).mockResolvedValue({ data: mockData });

    const journeys = await getJourneys();
    expect(journeys).toEqual(mockData);
    expect(studioMakerApi.get).toHaveBeenCalledWith('/journeys', {});
  });

  test('Deve falhar ao buscar jornadas', async () => {
    (studioMakerApi.get as jest.Mock).mockRejectedValue(
      new Error('Falha ao buscar jornadas'),
    );

    await expect(getJourneys()).rejects.toThrow('Falha ao buscar jornadas');
  });

  test('Deve retornar jornadas do usuário com sucesso', async () => {
    const mockData = [{ id: '1', name: 'Jornada do Usuário' }];
    const userId = '123';
    (studioMakerApi.get as jest.Mock).mockResolvedValue({ data: mockData });

    const journeys = await getJourneysByUser(userId);
    expect(journeys).toEqual(mockData);
    expect(studioMakerApi.get).toHaveBeenCalledWith(
      `/journeys/user/${userId}`,
      {},
    );
  });

  test('Deve falhar ao buscar jornadas do usuário', async () => {
    const userId = '123';
    (studioMakerApi.get as jest.Mock).mockRejectedValue(
      new Error('Falha ao buscar jornadas do usuário'),
    );

    await expect(getJourneysByUser(userId)).rejects.toThrow(
      'Falha ao buscar jornadas do usuário',
    );
  });

  test('Deve criar uma nova jornada com sucesso', async () => {
    const mockData = { id: '1', name: 'Nova Jornada' };
    const token = 'fake-token';
    (studioMakerApi.post as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await createJourney({ data: mockData, token });
    expect(result.data).toEqual(mockData);
    expect(studioMakerApi.post).toHaveBeenCalledWith('/journeys', mockData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  test('Deve falhar ao criar uma nova jornada', async () => {
    const token = 'fake-token';
    (studioMakerApi.post as jest.Mock).mockRejectedValue(
      new Error('Falha ao criar jornada'),
    );

    const result = await createJourney({ data: {}, token });

    if (result.error instanceof Error) {
      expect(result.error.message).toBe('Falha ao criar jornada');
    } else {
      throw new Error('Erro esperado não é uma instância de Error');
    }
  });

  test('Deve atualizar uma jornada por ID com sucesso', async () => {
    const mockData = { id: '1', name: 'Jornada Atualizada' };
    const id = '1';
    const token = 'fake-token';
    (studioMakerApi.put as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await updateJourneyById({ id, data: mockData, token });
    expect(result.data).toEqual(mockData);
    expect(studioMakerApi.put).toHaveBeenCalledWith(
      `/journeys/${id}`,
      mockData,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  });

  test('Deve falhar ao atualizar uma jornada', async () => {
    const id = '1';
    const token = 'fake-token';
    (studioMakerApi.put as jest.Mock).mockRejectedValue(
      new Error('Falha ao atualizar jornada'),
    );

    const result = await updateJourneyById({ id, data: {}, token });
    if (result.error instanceof Error) {
      expect(result.error.message).toBe('Falha ao atualizar jornada');
    } else {
      throw new Error('Erro esperado não é uma instância de Error');
    }
  });

  test('Deve deletar uma jornada por ID com sucesso', async () => {
    const mockData = { success: true };
    const id = '1';
    const token = 'fake-token';
    (studioMakerApi.delete as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await deleteJourney({ id, token });
    expect(result.data).toEqual(mockData);
    expect(studioMakerApi.delete).toHaveBeenCalledWith(`/journeys/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  test('Deve falhar ao excluir uma jornada', async () => {
    const id = '1';
    const token = 'fake-token';
    (studioMakerApi.delete as jest.Mock).mockRejectedValue(
      new Error('Falha ao excluir jornada'),
    );

    const result = await deleteJourney({ id, token });

    if (result.error instanceof Error) {
      expect(result.error.message).toBe('Falha ao excluir jornada');
    } else {
      throw new Error('Erro esperado não é uma instância de Error');
    }
  });

  test('Deve retornar todas as trilhas de uma jornada com sucesso', async () => {
    const mockData = [{ id: '1', name: 'Trilha Teste' }];
    const journeyId = '123';
    const token = 'fake-token';
    (studioMakerApi.get as jest.Mock).mockResolvedValue({ data: mockData });

    const trails = await getTrails({ id: journeyId, token });
    expect(trails).toEqual(mockData);
    expect(studioMakerApi.get).toHaveBeenCalledWith(
      `/trails/journey/${journeyId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  });

  test('Deve falhar ao buscar trilhas de uma jornada', async () => {
    const journeyId = '123';
    const token = 'fake-token';
    (studioMakerApi.get as jest.Mock).mockRejectedValue(
      new Error('Falha ao buscar trilhas'),
    );

    await expect(getTrails({ id: journeyId, token })).rejects.toThrow(
      'Falha ao buscar trilhas',
    );
  });

  test('Deve criar uma nova trilha com sucesso', async () => {
    const mockData = { id: '1', name: 'Nova Trilha' };
    const token = 'fake-token';
    (studioMakerApi.post as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await createTrail({ data: mockData, token });
    expect(result.data).toEqual(mockData);
    expect(studioMakerApi.post).toHaveBeenCalledWith('/trails', mockData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  test('Deve falhar ao criar uma nova trilha', async () => {
    const token = 'fake-token';
    (studioMakerApi.post as jest.Mock).mockRejectedValue(
      new Error('Falha ao criar trilha'),
    );

    const result = await createTrail({ data: {}, token });

    if (result.error instanceof Error) {
      expect(result.error.message).toBe('Falha ao criar trilha');
    } else {
      throw new Error('Erro esperado não é uma instância de Error');
    }
  });

  test('Deve atualizar uma trilha por ID com sucesso', async () => {
    const mockData = { id: '1', name: 'Trilha Atualizada' };
    const id = '1';
    const token = 'fake-token';
    (studioMakerApi.put as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await updateTrailById({ id, data: mockData, token });
    expect(result.data).toEqual(mockData);
    expect(studioMakerApi.put).toHaveBeenCalledWith(`/trails/${id}`, mockData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  test('Deve falhar ao atualizar uma trilha', async () => {
    const id = '1';
    const token = 'fake-token';
    (studioMakerApi.put as jest.Mock).mockRejectedValue(
      new Error('Falha ao atualizar trilha'),
    );

    const result = await updateTrailById({ id, data: {}, token });
    if (result.error instanceof Error) {
      expect(result.error.message).toBe('Falha ao atualizar trilha');
    } else {
      throw new Error('Erro esperado não é uma instância de Error');
    }
  });

  test('Deve deletar uma trilha por ID com sucesso', async () => {
    const mockData = { success: true };
    const id = '1';
    const token = 'fake-token';
    (studioMakerApi.delete as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await deleteTrail({ id, token });
    expect(result.data).toEqual(mockData);
    expect(studioMakerApi.delete).toHaveBeenCalledWith(`/trails/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  test('Deve falhar ao deletar uma trilha', async () => {
    const id = '1';
    const token = 'fake-token';
    (studioMakerApi.delete as jest.Mock).mockRejectedValue(
      new Error('Falha ao deletar trilha'),
    );

    const result = await deleteTrail({ id, token });
    if (result.error instanceof Error) {
      expect(result.error.message).toBe('Falha ao deletar trilha');
    } else {
      throw new Error('Erro esperado não é uma instância de Error');
    }
  });

  test('Deve retornar uma jornada específica pelo ID', async () => {
    const mockData = { id: '1', name: 'Jornada Teste' };
    const id = '1';
    (studioMakerApi.get as jest.Mock).mockResolvedValue({ data: mockData });

    const journey = await getJourney(id);
    expect(journey).toEqual(mockData);
    expect(studioMakerApi.get).toHaveBeenCalledWith(`/journeys/${id}`);
  });

  test('Deve falhar ao buscar uma jornada pelo ID', async () => {
    const id = '1';
    (studioMakerApi.get as jest.Mock).mockRejectedValue(
      new Error('Falha ao buscar jornada'),
    );

    await expect(getJourney(id)).rejects.toThrow('Falha ao buscar jornada');
  });
});
