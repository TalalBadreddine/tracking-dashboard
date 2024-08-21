import Sidebar from 'components/Sidebar';
import React from 'react';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex my-4 mx-4">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-100 rounded w-full">
        {children}
      </main>
    </div>
  );
}
