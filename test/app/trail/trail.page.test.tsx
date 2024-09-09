import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { AppRouterContextProviderMock } from '../../context/app-router-context-mock';
import ManageTrack from '@/app/trail/[...journeyId]/page';

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
        <ManageTrack params={{ journeyId: '1' }} />
      </AppRouterContextProviderMock>
    );
    expect(screen.getByText('Nova Trilha')).toBeInTheDocument();
  });
});
