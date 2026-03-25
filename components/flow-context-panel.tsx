'use client';

import { ChevronRight, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

interface FlowContextPanelProps {
  scriptTitle: string;
  category: string;
  currentMessage: number;
  totalMessages: number;
  progress: number;
  onCopyAll: () => void;
}

export function FlowContextPanel({
  scriptTitle,
  category,
  currentMessage,
  totalMessages,
  progress,
  onCopyAll,
}: FlowContextPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border border-medgm-gray-2 shadow-elevation-2"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm text-medgm-gray-5 mb-3 md:mb-4 flex-wrap">
        <span className="capitalize">{category.replace(/-/g, ' ')}</span>
        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
        <span className="font-semibold text-medgm-black">{scriptTitle}</span>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-medgm-black">Progresso do fluxo</span>
        <span className="text-sm text-medgm-gray-5">
          Mensagem {currentMessage} de {totalMessages}
        </span>
      </div>

      <div className="w-full h-2 bg-medgm-gray-2 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-gradient-premium"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Actions */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCopyAll}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-premium text-medgm-black rounded-lg hover:opacity-90 shadow-premium transition-all text-sm font-medium min-h-[44px]"
      >
        <Copy className="w-4 h-4" />
        Copiar Todas as Mensagens
      </motion.button>
    </motion.div>
  );
}
