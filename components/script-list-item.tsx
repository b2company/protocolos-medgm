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
        "w-full flex flex-col gap-1 px-3 py-3 rounded-xl text-left transition-all duration-300 mb-2",
        active
          ? "bg-gradient-premium text-medgm-black shadow-premium border-2 border-medgm-gold"
          : "bg-white hover:bg-medgm-gray-1 text-medgm-dark-gray border border-medgm-gray-2"
      )}
    >
      <span className="text-sm font-semibold line-clamp-2">{title}</span>
      <div className="flex items-center gap-1 text-xs opacity-70">
        <MessageSquare className="w-3 h-3" />
        <span>{messageCount} {messageCount === 1 ? 'mensagem' : 'mensagens'}</span>
      </div>
    </motion.button>
  );
}
