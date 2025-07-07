import Layout from '@/components/Layout';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Perpenny',
  description: 'Perpenny - Superstore of services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
