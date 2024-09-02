'use client';

import { studioMakerApi } from './apis.service';
import { StartPoint } from '../lib/interfaces/startPoint.interface';
import { Journey } from '@/lib/interfaces/journey.interface';
import { Trail } from '@/lib/interfaces/trails.interface';
import { Content } from '@/lib/interfaces/content.interface';

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

export const getStartPointsByUser = async (
  id: string,
): Promise<StartPoint[]> => {
  try {
    const response = await studioMakerApi.get(`/points/user/${id}`);
    console.log('Journeys:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch start points:', error);
    throw error;
  }
};

export const createStartPoint = async ({
  data,
  token,
}: {
  data: any;
  token: string;
}) => {
  try {
    console.log(data);
    const response = await studioMakerApi.post('/points', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Start point created:', response.data);
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Failed to create start point:', error);
    return { error: error };
  }
};

export const updateStartPointById = async ({
  id,
  data,
  token,
}: {
  id: string;
  data: any;
  token: string;
}) => {
  try {
    const response = await studioMakerApi.put(`/points/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Start point updated:', response.data);
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Failed to update start point:', error);
    return { error: error };
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
    console.error('Failed to fetch jpurney:', error);
    throw error;
  }
};

export const getJourneysByPoint = async (id: string): Promise<Journey[]> => {
  try {
    const response = await studioMakerApi.get(`/journeys/point/${id}`, {
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
  console.log(id, token);
  try {
    const response = await studioMakerApi.get(`/trails/journey/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    console.log('Trails:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch trails:', error);
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
    console.error('Failed to fetch journey:', error);
    throw error;
  }
};

export const updateTrailsOrder = async (
  updatedTrails: Trail[],
): Promise<any> => {
  try {
    const response = await studioMakerApi.patch('/trails/update-trail-order', {
      trails: updatedTrails,
    });
    console.log('Trails updated:', response.data);
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Failed to update trails:', error);
    return { error: error };
  }
};

export const updateJourneysOrder = async (
  updatedTrails: Journey[],
): Promise<any> => {
  try {
    const response = await studioMakerApi.patch(
      '/journeys/update-journeys-order',
      {
        journeys: updatedTrails,
      },
    );
    console.log('Trails updated:', response.data);
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Failed to update trails:', error);
    return { error: error };
  }
};

export const getContentsByTrailId = async (trailId: string): Promise<any> => {
  try {
    console.log('Fetching contents...');
    const response = await studioMakerApi.get<Content[]>(
      `/contents/trail/${trailId}`,
    );
    return { data: response.data };
  } catch (error) {
    console.error('Erro ao buscar conteúdos:', error);
    return { error: error };
  }
};

export const getContentById = async (id: string): Promise<any> => {
  try {
    const response = await studioMakerApi.get<Content>(`/contents/${id}`);
    return { data: response.data };
  } catch (error) {
    console.error('Erro ao buscar conteúdo:', error);
    return { error: error };
  }
};

export const updateContentOrder = async (
  updatedContents: Content[],
): Promise<any> => {
  try {
    const response = await studioMakerApi.patch('/contents/order/update-order',
      {
        contents: updatedContents,
      },
    );
    console.log('Trails updated:', response.data);
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Failed to update trails:', error);
    return { error: error };
  }
};
export const addJourneyToUser = async ({
  userId,
  journeyId,
}: {
  userId: string;
  journeyId: string;
}) => {
  try {
    const response = await studioMakerApi.patch(`/journeys/${userId}/add-journey`, {
      journeyId,
    });
    console.log('Journey added to user');
    return response.data;
  } catch (error) {
    console.error('Failed to add journey to user:', error);
    throw error;
  }
};

export const getTrail = async (id: string): Promise<Trail> => {
  try {
    const response = await studioMakerApi.get(`/trails/${id}`);
    console.log('Trail:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch trail:', error);
    throw error;
  }
};

export const findContentsByTrailId = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<Content[]> => {
  try {
    const response = await studioMakerApi.get(`/contents/trail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Contents:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch contents:', error);
    throw error;
  }
};

export const getContent = async (id: string): Promise<Content> => {
  try {
    const response = await studioMakerApi.get(`/contents/${id}`);
    console.log('content:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch content:', error);
    throw error;
  }
};
