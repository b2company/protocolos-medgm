'use client';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScriptListItemProps {
  title: string;
  messageCount: number;
  active: boolean;
  onClick: () => void;
}

export function ScriptListItem({ title, messageCount, active, onClick }: ScriptListItemProps) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full flex flex-col gap-0.5 px-2 py-2 rounded-lg text-left transition-all duration-300 mb-1.5",
        active
          ? "bg-gradient-premium text-medgm-black shadow-premium border border-medgm-gold"
          : "bg-white hover:bg-medgm-gray-1 text-medgm-dark-gray border border-medgm-gray-2"
      )}
    >
      <span className="text-xs font-semibold line-clamp-2 leading-tight">{title}</span>
      <div className="flex items-center gap-1 text-[10px] opacity-70">
        <MessageSquare className="w-2.5 h-2.5" />
        <span>{messageCount} msg{messageCount !== 1 ? 's' : ''}</span>
      </div>
    </motion.button>
  );
}
