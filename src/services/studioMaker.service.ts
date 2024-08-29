import { studioMakerApi } from './apis.service';
import { StartPoint } from '../lib/interfaces/startPoint.interface'
import { Journey } from '@/lib/interfaces/journey.interface';
import { Trail } from '@/lib/interfaces/trails.interface';

export const getStartPoints = async (): Promise<StartPoint[]> => {
  try {
    const response = await studioMakerApi.get('/points');
    console.log('Start Points:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Start Points:', error);
    throw error;
  }
};

export const getStartPointsByUser = async (id: string): Promise<StartPoint[]> => {
  try {
    const response = await studioMakerApi.get(`/points/user/${id}`);
    console.log('Journeys:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch start points:', error);
    throw error;
  }
};

export const deleteStartPoint = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  try {
    const response = await studioMakerApi.delete(`/points/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Start point deleted:', response.data);
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Failed to delete start points:', error);
    return { error: error };
  }
};

export const getJourneys = async (): Promise<Journey[]> => {
  try {
    const response = await studioMakerApi.get('/journeys', {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    console.log('Journeys:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export const getJourneysByUser = async (id: string): Promise<Journey[]> => {
  try {
    const response = await studioMakerApi.get(`/journeys/user/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    console.log('Journeys:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export const createJourney = async ({
  data,
  token,
}: {
  data: any;
  token: string;
}) => {
  try {
    console.log(data);
    const response = await studioMakerApi.post('/journeys', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Journey created:', response.data);
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Failed to create journey:', error);
    return { error: error };
  }
};

export const updateJourneyById = async ({
  id,
  data,
  token,
}: {
  id: string;
  data: any;
  token: string;
}) => {
  try {
    const response = await studioMakerApi.put(`/journeys/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Journey updated:', response.data);
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Failed to update journey:', error);
    return { error: error };
  }
};

export const deleteJourney = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  try {
    const response = await studioMakerApi.delete(`/journeys/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Journey deleted:', response.data);
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Failed to delete journey:', error);
    return { error: error };
  }
};

export const getTrails = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<Trail[]> => {
  try {
    const response = await studioMakerApi.get(`/trails/journey/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Trails:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export const updateTrailById = async ({
  id,
  data,
  token,
}: {
  id: string;
  data: any;
  token: string;
}) => {
  try {
    const response = await studioMakerApi.put(`/trails/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Journey updated:', response.data);
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Failed to update journey:', error);
    return { error: error };
  }
};

export const createTrail = async ({
  data,
  token,
}: {
  data: any;
  token: string;
}) => {
  try {
    const response = await studioMakerApi.post('/trails', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Trail created:', response.data);
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Failed to create trail:', error);
    return { error: error };
  }
};

export const deleteTrail = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  try {
    const response = await studioMakerApi.delete(`/trails/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Journey deleted:', response.data);
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Failed to delete journey:', error);
    return { error: error };
  }
};

export const getJourney = async (id: string): Promise<Journey> => {
  try {
    const response = await studioMakerApi.get(`/journeys/${id}`);
    console.log('Journey:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};
