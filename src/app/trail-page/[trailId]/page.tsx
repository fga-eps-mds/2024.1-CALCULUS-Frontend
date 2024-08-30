'use client';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  findContentsByTrailId,
  getTrail,
  getJourney,
} from '@/services/studioMaker.service';
import { Trail } from '@/lib/interfaces/trails.interface';
import { Journey } from '@/lib/interfaces/journey.interface';
import { Content } from '@/lib/interfaces/content.interface';
import TrailContents from '@/components/trail-page/trailContents';
import ContentRender from '@/components/trail-page/contentRender';
import MyButton from '@/components/ui/buttons/myButton.component';

function TrailPage() {
  const { trailId } = useParams();
  const [journey, setJourney] = useState<Journey | null>(null);
  const [trail, setTrail] = useState<Trail | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [contentId, setContentId] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const contentClick = (id: string) => {
    const index = contents.findIndex(content => content._id === id);
    if (index !== -1) {
      setContentId(id);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const fetchTrailData = async () => {
      try {
        const id = Array.isArray(trailId) ? trailId[0] : trailId;
        const token = JSON.parse(localStorage.getItem('token')!);

        const trailData = await getTrail(id);
        setTrail(trailData);

        const journeyData = await getJourney(trailData.journey);
        setJourney(journeyData);

        const contentsData = await findContentsByTrailId({ id, token });
        setContents(contentsData);

        if (contentsData.length > 0) {
          setContentId(contentsData[0]._id);
          setCurrentIndex(0); 
        }
      } catch (error) {
        setError('Failed to fetch trail data');
      }
    };

    fetchTrailData();
  }, [trailId]);

  useEffect(() => {
    const index = contents.findIndex(content => content._id === contentId);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [contentId, contents]);

  const handlePreviousContent = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setContentId(contents[newIndex]._id);
    }
  };

  const handleNextContent = () => {
    if (currentIndex < contents.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setContentId(contents[newIndex]._id);
    }
  };

  if (error) {
    return <Box className="error-message">{error}</Box>;
  }

  if (!journey || !trail) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box
      className="page-content"
      sx={{
        display: 'flex',
        backgroundColor: '#f1f1f1',
        height: '100vh',
      }}
    >
      <Box
        className="trials-content"
        sx={{
          width: '350px',
          backgroundColor: '#fff',
          borderRight: '1px solid #ccc',
          padding: '20px',
        }}
      >
        <TrailContents
          contents={contents}
          journeyName={journey.title}
          trailName={trail.name}
          renderContent={contentClick}
          currentContentId={contentId}
        />
      </Box>

      <Box
        className="content"
        sx={{
          flexGrow: 1,
          backgroundColor: '#f8f8f8',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            maxHeight: 'calc(100vh - 100px)',
            paddingRight: '10px',
          }}
        >
          <ContentRender contentId={contentId} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
          <MyButton
            width="150px"
            height="50px"
            color="purple"
            bold
            onClick={handlePreviousContent}
            disabled={currentIndex === 0}
          >
            Conteúdo anterior
          </MyButton>
          <MyButton
            width="150px"
            height="50px"
            color="purple"
            bold
            onClick={handleNextContent}
            disabled={currentIndex === contents.length - 1}
          >
            Próximo conteúdo
          </MyButton>
        </Box>
      </Box>
    </Box>
  );
}

export default TrailPage;
