import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { useSession } from 'next-auth/react';
import { AppRouterContextProviderMock } from '../../context/app-router-context-mock';
import JourneyPage from '@/app/journey/[...pointId]/page';
import { Journey } from '@/lib/interfaces/journey.interface';
import { useQuery } from '@tanstack/react-query';

const MockData: Journey[] = [
    {
      _id: '1',
      title: 'Jornada 1',
      description: 'Descrição da Jornada 1',
      user: '1',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      order: 0,
      point: '',
    },
    {
      _id: '2',
      title: 'Jornada 2',
      description: 'Descrição da Jornada 2',
      user: '1',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      order: 0,
      point: '',
    },
  ];

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: { role: ['admin'] } } });
    (useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false, error: null });
  });

  it('renders journey page', () => {
    const push = jest.fn();
    // Render the HomePage component
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <JourneyPage params={{
          pointId: '123456'
        }} />
      </AppRouterContextProviderMock>
    );

    // Verify that the "Nova Jornada" text is present
    expect(screen.getByText('Nova Jornada')).toBeInTheDocument();
  });
});
