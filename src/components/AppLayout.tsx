import React from 'react';
import Header from './Header';
import Hero from './Hero';
import RideOptions from './RideOptions';
import Wallet from './Wallet';
import ParcelService from './ParcelService';
import Features from './Features';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <RideOptions />
        <Wallet />
        <ParcelService />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;