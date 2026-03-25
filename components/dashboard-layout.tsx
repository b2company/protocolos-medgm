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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-medgm-clean">
      {/* Mobile: backdrop overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile: Hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center border border-medgm-gray-2"
      >
        <span className="text-xl">{mobileOpen ? '✕' : '☰'}</span>
      </button>

      {/* Mobile sidebar (fixed overlay drawer) */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-medgm-gray-2 shadow-xl transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebar}
      </div>

      {/* Desktop sidebar (inline) */}
      <motion.aside
        animate={{ width: collapsed ? 60 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex flex-col bg-white border-r border-medgm-gray-2 shrink-0 shadow-elevation-1 relative"
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 z-50 w-6 h-6 bg-white border border-medgm-gray-2 rounded-full flex items-center justify-center hover:bg-medgm-gray-1 shadow-elevation-2 transition-all"
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
