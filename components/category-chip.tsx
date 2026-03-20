'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryChipProps {
  label: string;
  icon?: string;
  active: boolean;
  onClick: () => void;
}

export function CategoryChip({ label, icon, active, onClick }: CategoryChipProps) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-left",
        active
          ? "bg-medgm-gold text-medgm-black shadow-elevation-2"
          : "bg-white hover:bg-medgm-gray-1 text-medgm-dark-gray border border-medgm-gray-2"
      )}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span className="flex-1 truncate">{label}</span>
    </motion.button>
  );
}
