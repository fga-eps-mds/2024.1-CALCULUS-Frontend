import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import SessionProvider from '@/components/sessionProvider';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import ClientLayout from '@/components/clientLayout';
import { Toaster } from 'sonner';

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
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
