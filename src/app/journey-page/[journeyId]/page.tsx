'use client';
import JourneyInfo from '../../../components/journey/journeyInfo';
import { Box, Divider } from '@mui/material';
import { getJourney } from '../../../services/studioMaker.service';
import { Journey } from '@/lib/interfaces/journey.interface';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const defaultTrails = [
    { id: '1', isConnected: true },
    { id: '2', isConnected: true },
    { id: '3', isConnected: false },
    { id: '4', isConnected: true },
    { id: '5', isConnected: false },
];

export default function JourneyPage() {
    const { journeyId } = useParams();
    const [journey, setJourney] = useState<Journey>({} as Journey);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    useEffect(() => {
        const id = Array.isArray(journeyId) ? journeyId[0] : journeyId; 
        const fetchJourney = async () => {
            try {
                const response = await getJourney(id);
                setJourney(response);
            } catch (err) {
                setError('Failed to fetch journey');
            }
        }

        fetchJourney();
    }, [journeyId]);

    const nodeSpacing = 120; // Vertical spacing between nodes

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

            <Divider sx={{ height: '80%', marginTop: '100px' }} orientation="vertical" variant="middle" flexItem />

            <Box
                flex={1}
                pl={2}
                sx={{
                    position: 'relative',
                    height: '500px',
                }}
            >
                {defaultTrails.map((trail, index) => (
                    <Box
                        key={trail.id}
                        className={`node ${trail.isConnected ? '' : 'disconnected'}`}
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            top: `${50 + index * nodeSpacing}px`,
                            transform: 'translate(-50%, -50%)',
                        }}
                        data-label={`Node ${trail.id}`}
                    />
                ))}
                {defaultTrails.map((trail, index) => {
                    if (index < defaultTrails.length - 1 && defaultTrails[index].isConnected && defaultTrails[index + 1].isConnected) {
                        const startTop = 50 + index * nodeSpacing;
                        const endTop = 50 + (index + 1) * nodeSpacing;
                        const height = Math.abs(endTop - startTop);
                        return (
                            <Box
                                key={`edge-${index}`}
                                className="edge"
                                sx={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: `${Math.min(startTop, endTop) + height / 2}px`,
                                    width: '2px',
                                    height: `${height}px`,
                                    backgroundColor: 'lightgreen',
                                    transform: `translateX(-50%)`,
                                    transformOrigin: 'top',
                                    zIndex: -1,
                                }}
                            />
                        );
                    }
                    return null;
                })}
            </Box>
        </Box>
    );
}

const styles = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-30px);
        }
        60% {
            transform: translateY(-15px);
        }
    }

    @keyframes shine {
        0% {
            box-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
        }
        50% {
            box-shadow: 0 0 15px rgba(0, 255, 0, 1);
        }
        100% {
            box-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
        }
    }

    .node {
        width: 80px;
        height: 80px;
        background-color: #4caf50; /* Green color */
        border-radius: 50%;
        animation: bounce 2s infinite, shine 2s ease-in-out infinite;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        text-align: center;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border: 3px solid #388e3c; /* Darker green border */
    }

    .node::after {
        content: attr(data-label);
        font-size: 12px;
        display: block;
        margin-top: 10px;
    }

    .edge {
        position: absolute;
        width: 2px;
        background-color: lightgreen;
        transform-origin: top;
        border-radius: 4px;
        animation: growEdge 2s ease-out forwards;
    }

    .disconnected {
        background-color: #9e9e9e; /* Gray color */
        animation: shine 3s ease-in-out infinite;
    }
`;
