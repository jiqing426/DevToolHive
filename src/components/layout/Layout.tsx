import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from '../CookieConsent';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
