'use client';
import JourneyInfo from '../../../components/journey/journeyInfo';
import { Box, Divider } from '@mui/material';
import { getJourney } from '../../../services/studioMaker.service'
import { Journey } from '@/lib/interfaces/journey.interface';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function JourneyPage() {

    const { journeyId } = useParams();
    const [journey, setJourney] = useState<Journey>({} as Journey);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        
        const id = Array.isArray(journeyId) ? journeyId[0] : journeyId; 
        const fetchJourney = async () => {
            try{
                const response = await getJourney(id);
                setJourney(response);
            }
            catch(err){
            setError('Failed to fetch journey');
            }
        }

        fetchJourney();
    }, [journeyId]);

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f1f1f1',
            height: '100vh',
        }}>
            <Box flex={1} pr={2}>
                <JourneyInfo 
                    title={`${journey.title}`}
                    description={`${journey.description}`}
                    trailCount={journey.trails?.length}
                    completionPercentage={30}
                    completedStudents={100}
                />
            </Box>

            <Divider sx={{ height:'80%', marginTop: '100px'}}orientation="vertical" variant="middle" flexItem />

            <Box flex={1} pl={2}>
               
            </Box>
        </Box>
    );
}
