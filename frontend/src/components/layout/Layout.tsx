import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ContentArea } from './ContentArea';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <ContentArea>
          {children}
        </ContentArea>
      </div>
    </div>
  );
};