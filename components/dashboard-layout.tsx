'use client';

import { ReactNode, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  header: ReactNode;
}

export function DashboardLayout({ children, sidebar, header }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-medgm-clean">
      {/* Mobile: Hamburger */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center border border-medgm-gray-2"
      >
        <span className="text-xl">{collapsed ? '☰' : '✕'}</span>
      </button>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? (window.innerWidth < 768 ? 0 : 60) : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-white border-r border-medgm-gray-2 flex flex-col shrink-0 shadow-elevation-1 relative"
      >
        {/* Desktop: Botão toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:block absolute -right-3 top-20 z-50 w-6 h-6 bg-white border border-medgm-gray-2 rounded-full flex items-center justify-center hover:bg-medgm-gray-1 shadow-elevation-2 transition-all"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-hidden"
            >
              {sidebar}
            </motion.div>
          )}
        </AnimatePresence>

        {collapsed && (
          <div className="flex flex-col items-center py-4 gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-premium flex items-center justify-center text-medgm-black font-bold text-xs">
              DG
            </div>
          </div>
        )}
      </motion.aside>

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
