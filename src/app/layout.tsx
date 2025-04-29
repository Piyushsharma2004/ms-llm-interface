// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Loan Risk Platform',
  description: 'Advanced loan risk assessment and management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        {/* <Navbar /> */}
        <main className="pt-6 pb-12">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} AI Loan Risk Platform. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}