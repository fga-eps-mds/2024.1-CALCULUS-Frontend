import axios from "axios";
import { useSession } from 'next-auth/react';
import { toast } from "sonner";

const JourneyService = () => {
    const { data: session } = useSession();
    const fetchUserJourneys = async () => {
        if (!session){
            toast.error('Você precisa estar logado para salvar o conteúdo.');
            return;
        };
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_USER}/${session.user.id}/subscribedJourneys`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar jornadas:', error);
            return [];
        }
    }

    const fetchJourneys = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_STUDIO}/journeys/`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar jornada:', error);
            return null;
        }
    }
}

export default JourneyService;