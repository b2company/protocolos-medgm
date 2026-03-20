'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TabButtonProps {
  icon: ReactNode;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

export function TabButton({ icon, label, count, active, onClick }: TabButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
        active
          ? "bg-gradient-premium text-medgm-black shadow-premium"
          : "bg-white hover:bg-medgm-gray-1 text-medgm-dark-gray border border-medgm-gray-2"
      )}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {icon}
      </div>
      <span className="flex-1 text-left">{label}</span>
      <span className={cn(
        "px-2 py-0.5 rounded-full text-xs font-semibold",
        active ? "bg-white/30" : "bg-medgm-gray-2"
      )}>
        {count}
      </span>
    </motion.button>
  );
}
