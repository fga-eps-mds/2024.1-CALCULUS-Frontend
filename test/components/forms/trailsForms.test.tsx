import '@testing-library/jest-dom'; 
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { AppRouterContextProviderMock } from '../../context/app-router-context-mock';
import { Trail } from '@/lib/interfaces/trails.interface';
import { TrailForm } from '@/components/forms/trails.form';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { createTrail, updateTrailById } from '@/services/studioMaker.service';
import { zodResolver } from '@hookform/resolvers/zod';


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

jest.mock('sonner', () => ({
    toast: {
      success: jest.fn(),
      error: jest.fn(),
    },
  }));
  
  jest.mock('@/services/studioMaker.service', () => ({
    createTrail: jest.fn(),
    updateTrailById: jest.fn(),
  }));
  

const mockCallback = jest.fn();
const mockSetDialog = jest.fn();

describe('Trail Form', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: { role: ['admin'] } } });
    (useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false, error: null });
  });

  it('renders Trail Form page', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <TrailForm 
          trails={MockData}
          journeyId={'1234'}
        />
      </AppRouterContextProviderMock>
    );
    expect(screen.getByText('Criar')).toBeInTheDocument();
  });  
});
