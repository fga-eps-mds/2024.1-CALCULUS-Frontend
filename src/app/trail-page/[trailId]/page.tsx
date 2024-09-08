'use client';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import { completeTrail } from '@/services/user.service';
import { useSession } from 'next-auth/react';

function TrailPage() {
  const { trailId } = useParams();
  const router = useRouter();
  const [journey, setJourney] = useState<Journey | null>(null);
  const [trail, setTrail] = useState<Trail | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [contentId, setContentId] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: session } = useSession();

  const contentClick = (id: string) => {
    const index = contents.findIndex((content) => content._id === id);
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
    const index = contents.findIndex((content) => content._id === contentId);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [contentId, contents]);

  const handlePreviousContent = async () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setContentId(contents[newIndex]._id);
    } else if (trail && journey) {
      const trailIndex = journey.trails!.findIndex((t) => t === trail._id);
      if (trailIndex > 0) {
        const previousTrailId = journey.trails![trailIndex - 1];
        router.push(`/trail-page/${previousTrailId}`);
      }
    }
  };

  const handleNextContent = async () => {
    if (currentIndex < contents.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setContentId(contents[newIndex]._id);
    } else if (trail && journey) {
      if (trail && journey) {
        try {
          await completeTrail({
            userId: session?.user.id as string,
            trailId: trail._id,
            accessToken: session?.user.accessToken as string,
          });
        } catch (error) {
          console.error('Failed to complete trail:', error);
        }
      }
      const trailIndex = journey.trails!.findIndex((t) => t === trail._id);
      if (trailIndex < journey.trails!.length - 1) {
        const nextTrailId = journey.trails![trailIndex + 1];
        router.push(`/trail-page/${nextTrailId}`);
      }
    }
  };

  if (error) {
    return <Box className="error-message">{error}</Box>;
  }

  if (!journey || !trail) {
    return <Box>Loading...</Box>;
  }

  const isPreviousDisabled =
    currentIndex === 0 &&
    journey.trails!.findIndex((t) => t === trail._id) === 0;
  const isNextDisabled =
    currentIndex === contents.length - 1 &&
    journey.trails!.findIndex((t) => t === trail._id) ===
      journey.trails!.length - 1;

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
            disabled={isPreviousDisabled}
          >
            {currentIndex === 0 ? <>Trilha Anterior</> : <>Conteúdo Anterior</>}
          </MyButton>
          <MyButton
            width="150px"
            height="50px"
            color="purple"
            bold
            onClick={handleNextContent}
            disabled={isNextDisabled}
          >
            {currentIndex < contents.length - 1 ? (
              <>Próximo Conteúdo</>
            ) : (
              <>Próxima Trilha</>
            )}
          </MyButton>
        </Box>
      </Box>
    </Box>
  );
}

export default TrailPage;
