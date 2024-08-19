import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../styles/globals.css';
import SessionProvider from '@/providers/session.provider';
import './globals.css';
import ClientLayout from '@/components/clientLayout';
import { Toaster } from 'sonner';
import ReactQueryProvider from '@/providers/reactQueryProvider.provider';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

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
    <html lang="en" className={poppins.className}>
      <body>
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
