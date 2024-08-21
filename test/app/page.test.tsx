import { render, screen, fireEvent } from '@testing-library/react';
import LandingPage from '@/app/page';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LandingPage', () => {
  it('should render the page correctly', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    render(<LandingPage />);

    expect(screen.getByText('Calculus')).toBeInTheDocument();
    expect(screen.getByRole('MyButton', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/Matemática que/i)).toBeInTheDocument();
    expect(screen.getByRole('MyButton', { name: /comece aqui/i })).toBeInTheDocument();
  });

  it('should redirect to /home if the user is authenticated', () => {
    const mockPush = jest.fn();
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'John Doe' } },
      status: 'authenticated',
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<LandingPage />);

    expect(mockPush).toHaveBeenCalledWith('/home');
  });

  it('should redirect to /login when Login button is clicked', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    render(<LandingPage />);

    const loginButton = screen.getByRole('MyButton', { name: /login/i });
    fireEvent.click(loginButton);

    const link = screen.getByRole('link', { name: /login/i });
    expect(link).toHaveAttribute('href', '/login');
  });

  it('should redirect to /register when Start Here button is clicked', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    render(<LandingPage />);

    const startButton = screen.getByRole('MyButton', { name: /comece aqui/i });
    fireEvent.click(startButton);

    const link = screen.getByRole('link', { name: /comece aqui/i });
    expect(link).toHaveAttribute('href', '/register');
  });
});