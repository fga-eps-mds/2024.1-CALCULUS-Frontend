import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import SessionProvider from '@/app/components/sessionProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientLayout from './components/clientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Calculus',
  description: '',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ClientLayout>{children}</ClientLayout>
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
