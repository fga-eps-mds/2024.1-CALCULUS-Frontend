import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { useSession } from 'next-auth/react';
import { AppRouterContextProviderMock } from '../../context/app-router-context-mock';
import SingUpPage from '@/app/register/page';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn().mockReturnValue({
      mutate:  jest.fn().mockResolvedValue({}), 
      isPending: false,
    })
  }));

describe('HomePage', () => {
    beforeEach(() => {
        (useSession as jest.Mock).mockReturnValue({ data: null });
      });

  it('renders login page', () => {
    
    const push = jest.fn();
    // Renderizar o componente HomePage
    render(<AppRouterContextProviderMock router={{ push }}><SingUpPage /></AppRouterContextProviderMock>);
    // Verificar se o botão de sair está presente

    expect(screen.getByRole('MyButton', { name: /Sign up/i })).toBeInTheDocument();});

});
