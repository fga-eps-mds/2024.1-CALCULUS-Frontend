'use client';
import { StartingPoint } from '@/components/startingpoints/columns';
import { DataTable } from '@/components/tables/startingpoints.table';
import { Button } from '@mui/material';

const startingPoints: StartingPoint[] = [
  {
    id: '728ed52f',
    name: 'Ponto de partida 1',
    description: 'Descrição sucinta...',
  },
  {
    id: '728ed52f',
    name: 'Ponto de partida 2',
    description: 'Descrição sucinta...',
  },
  {
    id: '728ed52f',
    name: 'Ponto de partida 3',
    description: 'Descrição sucinta...',
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl font-semibold mb-4"> Pontos de partida</h2>
      <DataTable data={startingPoints} />
      <Button
        onClick={() => console.log('Novo ponto de partida clicado')}
        sx={{
          fontWeight: 'bold',
          position: 'fixed',
          right: '2rem',
          bottom: '2rem',
          bgcolor: 'red',
          color: 'white',
          py: 2,
          px: 4,
          borderRadius: '50px',
          textTransform: 'none',
          width: 'auto',
          minWidth: '200px',
          maxWidth: '300px',
          transition: 'background-color 0.3s',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            bgcolor: 'darkred',
          },
        }}
      >
        Novo ponto de partida
      </Button>
    </div>
  );
}