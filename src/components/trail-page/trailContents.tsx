'use client'

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, List } from '@mui/material';
import { Content } from '@/lib/interfaces/content.interface';
import { Journey } from '@/lib/interfaces/journey.interface';

interface trailContentProps {
    contents: Content[];
    journeyName: string;
    trailName: string;
    renderContent: (id : string) => void;
}

const TrailContents: React.FC<trailContentProps> = ({ contents, journeyName, trailName, renderContent }) => {

    return(
        <>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
            padding: '20px',
            textAlign: 'center',
            marginTop: '100px',
            marginLeft: '20px',
        }}>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <Typography variant="h5" fontWeight="bold" color="gray">
                    {journeyName} <Typography variant="h4" color="black" fontWeight="bold" sx={{
                        marginTop: '10px',
                    }}> {trailName} </Typography>
                </Typography>
            
            </Box>
            
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                
                {contents.map((content,index) => (
                    <Button variant="text" key={index} sx={{
                        fontSize: '20px',
                        textAlign: 'left',
                        color: 'gray',
                    }} onClick={() => renderContent(content._id)}>{content.title}</Button>
                ))}
            </Box>
        </Box>
        </>
    );
};


export default TrailContents;