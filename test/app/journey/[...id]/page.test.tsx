import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManageTrack from '@/app/journey/[...id]/page';
import { useQuery } from '@tanstack/react-query';
import { getJourney, getTrails } from '@/services/studioMaker.service';
import { mocked } from 'jest-mock';
import { Trail } from '@/lib/interfaces/trails.interface';
import { Journey } from '@/lib/interfaces/journey.interface';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

(useRouter as jest.Mock).mockImplementation(() => ({
  push: mockPush,
  route: '/',
  query: {},
  asPath: '/',
  pathname: '/',
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@/services/studioMaker.service');

describe('ManageTrack', () => {
  const mockUseQuery = mocked(useQuery);
  const mockGetTrails = mocked(getTrails);
  const mockGetJourney = mocked(getJourney);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading indicator when loading', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
      isFetching: true,
      isSuccess: false,
      refetch: jest.fn(),
      status: 'loading',
    } as any);

    render(<ManageTrack params={{ id: '1' }} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Error fetching journeys'),
      isError: true,
      isFetching: false,
      isSuccess: false,
      refetch: jest.fn(),
      status: 'error',
    } as any);

    render(<ManageTrack params={{ id: '1' }} />);

    expect(screen.getByText('Error fetching journeys: Error fetching journeys')).toBeInTheDocument();
  });
});
