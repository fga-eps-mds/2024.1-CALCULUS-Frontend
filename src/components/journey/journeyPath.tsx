import React, { useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Trail } from '@/lib/interfaces/trails.interface';

interface JourneyPathProps {
  trails: Trail[];
}

const JourneyPath: React.FC<JourneyPathProps> = ({ trails }) => {
  const nodeSpacing = 120;
  const nodeSize = 80;
  const zigzagOffset = 100;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const drawLines = () => {
      if (!svgRef.current || !containerRef.current) return;
      const svg = svgRef.current;
      const svgNS = "http://www.w3.org/2000/svg";
      const svgWidth = svg.clientWidth;
      const container = containerRef.current;
      const svgHeight = svg.clientHeight;

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      trails.forEach((_, index) => {
        if (index < trails.length - 1) {
          const isLeft1 = index % 2 === 0;
          const offsetX1 = isLeft1 ? -zigzagOffset : zigzagOffset;
          const top1 = 50 + index * nodeSpacing + nodeSize / 2;
          const left1 = svgWidth / 2 + offsetX1;

          const isLeft2 = (index + 1) % 2 === 0;
          const offsetX2 = isLeft2 ? -zigzagOffset : zigzagOffset;
          const top2 = 50 + (index + 1) * nodeSpacing + nodeSize / 2;
          const left2 = svgWidth / 2 + offsetX2;

          const line = document.createElementNS(svgNS, "line");
          line.setAttribute("x1", `${left1}`);
          line.setAttribute("y1", `${top1}`);
          line.setAttribute("x2", `${left2}`);
          line.setAttribute("y2", `${top2}`);
          line.setAttribute("stroke", "silver");
          line.setAttribute("stroke-width", "20"); 

          svg.appendChild(line);
        }
      });
    };
    
    drawLines();

    const resizeObserver = new ResizeObserver(drawLines);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [trails]);

  return (
    <Box
      ref={containerRef}
      flex={1}
      pl={2}
      sx={{
        position: 'relative',
        height: `${trails.length * nodeSpacing + nodeSize + 50}px`,
        backgroundColor: '#f0f0f0',
      }}
    >
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0, 
          pointerEvents: 'none',
        }}
      />
      {trails.map((trail, index) => {
        const isLeft = index % 2 === 0;
        const offsetX = isLeft ? -zigzagOffset : zigzagOffset;

        return (
          <Box
            key={trail._id}
            sx={{
              position: 'absolute',
              left: `calc(50% + ${offsetX}px)`,
              top: `${50 + index * nodeSpacing}px`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', 
              transform: 'translateX(-50%)',
              zIndex: 1, 
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: `${nodeSize}px`,
                height: `${nodeSize}px`,
                backgroundColor: 'lightgray',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'gray',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                lineHeight: '1.2',
                zIndex: 1, 
                transform: 'rotate(45deg)', 
              }}
              onClick={() => console.log(`Clicked on trail: ${trail.name}`)}
            />
            <Typography
              variant="body1"
              sx={{
                marginTop: '20px', 
                textAlign: 'center',
                whiteSpace: 'nowrap',
                fontWeight: 'bold',
                fontSize: '20px', 
                color: '#333',
              }}
            >
              {trail.name}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default JourneyPath;
