import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { useSession } from 'next-auth/react';
import JourneyPage from '@/app/journey/[...pointId]/page';
import { Journey } from '@/lib/interfaces/journey.interface';
import { useQuery } from '@tanstack/react-query';
import { AppRouterContextProviderMock } from '../context/app-router-context-mock';
import TrailsListPage from '@/components/trailsList';
import { Trail } from '@/lib/interfaces/trails.interface';

const MockData: Trail[] = [
    {
      _id: '1',
      name: 'Trail 1',
      journey: '1',
      order: 1,
    }, 
    {
      _id: '2',
      name: 'Trail 2',
      journey: '1',
      order: 2,
    },
  ];

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('Trail List', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: { role: ['admin'] } } });
    (useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false, error: null });
  });

  it('renders trailsList page', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <TrailsListPage 
          trails={MockData}
          journeyId={'1234'}
        />
      </AppRouterContextProviderMock>
    );
    expect(screen.getByText('Nova Trilha')).toBeInTheDocument();
  });
});
