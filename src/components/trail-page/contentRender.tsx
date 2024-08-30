'use client'

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, List } from '@mui/material';
import { Content } from '@/lib/interfaces/content.interface';
import { Journey } from '@/lib/interfaces/journey.interface';
import { getContent } from '@/services/studioMaker.service';
import MarkdownRender from '@/components/trail-page/markdownRender';

interface trailContentProps {
    contentId: string;
}

const ContentRender: React.FC<trailContentProps> = ({ contentId }) => {

    const [content, setContent] = useState<Content | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        console.log("id: ", contentId);

        const fetchContentData = async () => {
            try {
                const contentData = await getContent(contentId);
                setContent(contentData);
            } catch(error) {
                setError('Failed to fetch content data');
            }
        }

        fetchContentData();
    }, [contentId]);

    if (error) {
        return <Box className="error-message">{error}</Box>;
    }

    if (!content) {
        return <Box>Loading...</Box>;
    }

    return(
        <>
            <Box sx={{
                alignItems: 'center',
                padding: '55px',
            }}>

                <Typography variant="h2">
                    {content.title}
                </Typography>

                <MarkdownRender markdown={content.content}>
                </MarkdownRender>

            </Box>
        </>
    );
};


export default ContentRender;