import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import SessionProvider from '@/providers/session.provider';
import './globals.css';
import ClientLayout from '@/components/clientLayout';
import { Toaster } from 'sonner';
import ReactQueryProvider from '@/providers/reactQueryProvider.provider';

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
          <ClientLayout>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ClientLayout>
          <Toaster position="top-center" closeButton richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
