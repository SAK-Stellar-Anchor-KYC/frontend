import type { Metadata } from 'next';
import { WalletProvider } from '@/hooks/useWallet';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'SAK',
  description: 'Decentralized KYC verification platform on Stellar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
