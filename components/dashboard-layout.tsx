'use client';

import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  header: ReactNode;
}

export function DashboardLayout({ children, sidebar, header }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-medgm-clean">
      {/* Sidebar 240px fixa */}
      <aside className="w-60 bg-white border-r border-medgm-gray-2 flex flex-col shrink-0 shadow-elevation-1">
        {sidebar}
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header sticky */}
        <header className="bg-white border-b border-medgm-gray-2 shrink-0 shadow-elevation-1">
          {header}
        </header>

        {/* Content scrollável */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
