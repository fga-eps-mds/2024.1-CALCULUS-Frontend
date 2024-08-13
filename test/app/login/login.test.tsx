// // LoginPage.test.tsx

// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import LoginPage from '../../../src/app/(auth)/login/page'; // Adjust the path if necessary
// import { useSession } from 'next-auth/react';

// jest.mock('next-auth/react', () => ({
//     useSession: jest.fn(),
//   }));  

// describe('LoginPage', () => {
//   it('should render the logo image', () => {
//     (useSession as jest.Mock).mockReturnValue({
//         data: {
//           user: null        },
//         status: 'authenticated',
//       });
  
//     render(<LoginPage />);
//     expect(screen.getByText('Recuperar senha')).toBeInTheDocument();
//   });

// });
