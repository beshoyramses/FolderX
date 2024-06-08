"use client";

import React, { ReactNode } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import RequireAuth from '@/components/RequireAuth';

interface Props {
  children: ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <RequireAuth>
      <div>
        <Header />
        <div className="flex">
          <Sidebar />
          {children}
        </div>
      </div>
    </RequireAuth>
  );
};

export default RootLayout;
