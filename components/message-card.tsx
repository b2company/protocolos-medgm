'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ParsedMessage } from '@/lib/parse-messages';
import { cn } from '@/lib/utils';

interface MessageCardProps {
  message: ParsedMessage;
}

export function MessageCard({ message }: MessageCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.messageContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-white border border-medgm-gray-2 rounded-2xl p-6 hover:border-medgm-gold transition-all duration-300 hover:shadow-xl">
      {/* Badge */}
      <div className="absolute -top-3 -left-3 w-10 h-10 bg-medgm-black rounded-full flex items-center justify-center text-medgm-gold font-semibold text-sm">
        {message.scriptNumber}-{message.messageNumber}
      </div>

      {/* Título */}
      <div className="mb-4 mt-2">
        <h3 className="text-lg font-semibold text-medgm-black mb-1">
          {message.scriptTitle}
        </h3>
        <p className="text-sm text-medgm-gray-5">
          {message.messageTitle}
        </p>
      </div>

      {/* Conteúdo */}
      <div className="relative">
        <div className="bg-medgm-gray-1 rounded-xl p-4 mb-4 max-h-80 overflow-y-auto">
          <pre className="text-sm text-medgm-dark-gray whitespace-pre-wrap font-sans leading-relaxed">
            {message.messageContent}
          </pre>
        </div>

        {/* Botão */}
        <button
          onClick={handleCopy}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300",
            copied
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-medgm-gold text-medgm-black hover:bg-opacity-90"
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copiar Mensagem
            </>
          )}
        </button>
      </div>
    </div>
  );
}
