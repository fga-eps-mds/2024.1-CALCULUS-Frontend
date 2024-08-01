import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import HomePage from '@/app/home/page';
import { useSession } from 'next-auth/react';

// Mock do useSession
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('HomePage', () => {
  test('renders user data and sign out button when user is logged in', () => {
    // Mock da sessão
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      },
      status: 'authenticated',
    });

    // Renderizar o componente HomePage
    render(<HomePage />);

    // Verificar se os dados do usuário estão presentes
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();

    // Verificar se o botão de sair está presente
    expect(screen.getByRole('button', { name: /Sair/i })).toBeInTheDocument();
  });

});
