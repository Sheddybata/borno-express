import React, { useState } from 'react';
import BottomNav from './BottomNav';
import HomePage from '@/pages/HomePage';
import RidePage from '@/pages/RidePage';
import CardsPage from '@/pages/CardsPage';
import ProfilePage from '@/pages/ProfilePage';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'ride' | 'cards' | 'profile'>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'ride':
        return <RidePage />;
      case 'cards':
        return <CardsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-16">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default AppLayout;