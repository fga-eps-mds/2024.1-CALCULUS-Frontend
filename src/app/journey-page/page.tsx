'use client';
import JourneyInfo from '../../components/journey/journeyInfo';
import { Box, Divider } from '@mui/material';

export default function JourneyPage() {
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
                    title="Qualquer Titulo"
                    description="Descrição aqui"
                    trailCount={20}
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
