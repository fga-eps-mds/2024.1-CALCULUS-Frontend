import '@testing-library/jest-dom'; 
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { AppRouterContextProviderMock } from '../../context/app-router-context-mock';
import { TrailForm } from '@/components/forms/trails.form';
import React from 'react';
import { render, screen } from '@testing-library/react';
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
          journeyId={'1234'}
        />
      </AppRouterContextProviderMock>
    );
    expect(screen.getByText('Criar')).toBeInTheDocument();
  });  
});
