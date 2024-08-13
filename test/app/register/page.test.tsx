// // test/app/SingUpPage.test.tsx

// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import SingUpPage from '../../../src/app/register/page';
// import React from 'react';

// describe('SingUpPage', () => {
//   test('renders the sign up page with all elements', () => {
//     // Render the SingUpPage component
//     render(<SingUpPage />);

//     // Check if the image is in the document
//     expect(screen.getByAltText('Imagem Sign Up')).toBeInTheDocument();

//     // Check if the heading text is present
//     expect(screen.getByText('Cadastre-se gratuitamente e descubra sua jornada de aprendizado.')).toBeInTheDocument();

//     // Check if the GoogleAuthButton is rendered
//     expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();

//     // Check if the MicrosoftAuthButton is rendered
//     expect(screen.getByRole('button', { name: /Microsoft/i })).toBeInTheDocument();

//     // Check if the link to login page is present
//     expect(screen.getByText('Já possui cadastro? Log in')).toBeInTheDocument();
//   });
// });
