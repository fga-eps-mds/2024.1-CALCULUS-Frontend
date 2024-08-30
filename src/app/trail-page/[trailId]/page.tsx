'use client'
import { Box } from '@mui/material';
import { findContentsByTrailId, getTrail, getJourney } from '@/services/studioMaker.service';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Trail } from '@/lib/interfaces/trails.interface';
import { Journey } from '@/lib/interfaces/journey.interface';
import { Content } from '@/lib/interfaces/content.interface';
import TrailContents from '@/components/trail-page/trailContents';
import ContentRender from '@/components/trail-page/contentRender';

function TrailPage() {

    const { trailId } = useParams();
    const [journey, setJourney] = useState<Journey | null>(null);
    const [trail, setTrail] = useState<Trail | null>(null);
    const [contents, setContents] = useState<Content[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [contentId, setContentId] = useState("");

    const contentClick = (id : string) => {
        setContentId(id);      
    }

    useEffect(() => {
        const fetchTrailData = async () => {
            try {
                const id = Array.isArray(trailId) ? trailId[0] : trailId;
                const token = JSON.parse(localStorage.getItem('token')!);

                console.log("id", id);

                const trailData = await getTrail(id);
                setTrail(trailData);

                const journeyData = await getJourney(trailData.journey);
                setJourney(journeyData);

                const contentsData = await findContentsByTrailId({ id, token });
                setContents(contentsData);

            } catch (error) {
                setError('Failed to fetch trail data');
            }
        };

        fetchTrailData();
    }, [trailId]);

    if (error) {
        return <Box className="error-message">{error}</Box>;
    }

    if (!journey || !trail) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box className="page-content" sx={{
            display: 'flex',
            backgroundColor: '#f1f1f1',
            height: '100vh',  
        }}>
            <Box className="trials-content">
                <TrailContents contents={contents} journeyName={journey.title} trailName={trail.name} renderContent={contentClick} />
            </Box>
            <Box className="content">
                <ContentRender contentId={contentId} />
            </Box>
        </Box>
    );
}

export default TrailPage;
