'use client';

import { ChevronRight, Share, Copy } from 'lucide-react';
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
      className="bg-white rounded-2xl p-6 mb-6 border border-medgm-gray-2 shadow-elevation-2"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-medgm-gray-5 mb-4">
        <span className="capitalize">{category.replace(/-/g, ' ')}</span>
        <ChevronRight className="w-4 h-4" />
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
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-medgm-gray-2 rounded-lg hover:bg-medgm-gray-1 hover:shadow-elevation-2 transition-all text-medgm-dark-gray text-sm font-medium"
        >
          <Share className="w-4 h-4" />
          Compartilhar
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCopyAll}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-premium text-medgm-black rounded-lg hover:opacity-90 shadow-premium transition-all text-sm font-medium"
        >
          <Copy className="w-4 h-4" />
          Copiar Todas
        </motion.button>
      </div>
    </motion.div>
  );
}
