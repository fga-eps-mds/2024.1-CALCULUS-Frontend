import axios from 'axios';
import { toast } from 'sonner';

const JourneyService = () => {
  const fetchUserJourneys = async (session: any) => {
    if (!session) {
      toast.error('Você precisa estar logado para ver suas jornadas.');
      return [];
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_USER}/users/${session.user.id}/subscribedJourneys`,
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar jornadas:', error);
      return [];
    }
  };

  const fetchJourneys = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_STUDIO}/journeys/`,
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar jornada:', error);
      return null;
    }
  };

  const fetchJourneyById = async (id: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_STUDIO}/journeys/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar jornada com ID ${id}:`, error);
      return null;
    }
  };

    const fetchPoints = async () =>{
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_STUDIO}/points/`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar pontos de partida:', error);
            return null;
        }
    }

    const fetchJourneybyPoint = async (id: string) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_STUDIO}/points/${id}/journeys`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar jornadas do Ponto de Partida com ID ${id}:`, error);
            return null;
        }
    }

    return {
        fetchUserJourneys,
        fetchJourneys,
        fetchJourneyById,
        fetchPoints,
        fetchJourneybyPoint,
    };
};

export default JourneyService;
