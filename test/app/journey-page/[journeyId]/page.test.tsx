import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import JourneyPage from '@/app/journey-page/[journeyId]/page';
import { getJourney, getTrails } from '@/services/studioMaker.service';
import { getSubscribedJourneys } from '@/services/user.service';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('@/services/studioMaker.service');
jest.mock('@/services/user.service');
jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('JourneyPage', () => {
  const journeyMock = { _id: '1', title: 'Journey 1', description: 'Description of Journey 1', trails: ['1'] };
  const trailsMock = [{ _id: '1', name: 'Trail 1', journey: '1' }];
  const sessionMock = { data: { user: { _id: 'user123', accessToken: 'token123' } } };

  beforeEach(() => {
    (getJourney as jest.Mock).mockResolvedValue(journeyMock);
    (getTrails as jest.Mock).mockResolvedValue(trailsMock);
    (getSubscribedJourneys as jest.Mock).mockResolvedValue(['1']);
    (useSession as jest.Mock).mockReturnValue(sessionMock);
    (useParams as jest.Mock).mockReturnValue({ journeyId: '1' });
  });

  it('deve exibir um spinner enquanto os dados estão carregando', async () => {
    render(<JourneyPage />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(getJourney).toHaveBeenCalledTimes(1);
      expect(getTrails).toHaveBeenCalledTimes(1);
    });
  });

  it('deve exibir um erro se falhar ao carregar os dados', async () => {
    (getJourney as jest.Mock).mockRejectedValue(new Error('Failed to fetch journey data'));

    render(<JourneyPage />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch journey data')).toBeInTheDocument();
    });
  });

  it('deve exibir os dados da jornada e das trilhas quando carregados com sucesso', async () => {
    render(<JourneyPage />);

    await waitFor(() => {
      expect(screen.getByText(journeyMock.title)).toBeInTheDocument();
      expect(screen.getByText(journeyMock.description)).toBeInTheDocument();

      expect(screen.getByText((content, element) => content.includes('Trail 1'))).toBeInTheDocument();
    });
  });

  it('deve exibir uma mensagem quando não há trilhas na jornada', async () => {
    (getTrails as jest.Mock).mockResolvedValue([]);

    render(<JourneyPage />);

    await waitFor(() => {
      expect(screen.getByText('Ainda não há trilhas nessa jornada')).toBeInTheDocument();
    });
  });
});
