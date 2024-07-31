import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from '../../src/app/page';
import { useSession } from 'next-auth/react';
import roboProfessor from '../../src/public/robo_professor.png';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('LandingPage', () => {
  it('renders the landing page', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });

    render(<LandingPage />);
    
    expect(screen.getByText('Calculus')).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: 'Comece aqui' })).toBeInTheDocument();
  });
});
