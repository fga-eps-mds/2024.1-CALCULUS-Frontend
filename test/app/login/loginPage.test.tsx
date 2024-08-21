import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import LoginPage from '@/app/(auth)/login/page';
import { useSession } from 'next-auth/react';
import { AppRouterContextProviderMock } from '../../context/app-router-context-mock';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('HomePage', () => {
    beforeEach(() => {
        (useSession as jest.Mock).mockReturnValue({ data: null });
      });

  it('renders login page', () => {
    
    const push = jest.fn();
    // Renderizar o componente HomePage
    render(<AppRouterContextProviderMock router={{ push }}><LoginPage /></AppRouterContextProviderMock>);
    // Verificar se o botão de sair está presente

    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();});

});
