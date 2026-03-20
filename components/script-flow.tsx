'use client';

import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { ParsedMessage } from '@/lib/parse-messages';
import { cn } from '@/lib/utils';

interface ScriptFlowProps {
  scriptTitle: string;
  scriptNumber: number;
  messages: ParsedMessage[];
}

export function ScriptFlow({ scriptTitle, scriptNumber, messages }: ScriptFlowProps) {
  const [expanded, setExpanded] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyMessage = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = async () => {
    const allContent = messages.map(m => m.messageContent).join('\n\n---\n\n');
    await navigator.clipboard.writeText(allContent);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white border-2 border-medgm-gray-2 rounded-2xl overflow-hidden hover:border-medgm-gold transition-all duration-300">
      {/* Header */}
      <div className="bg-medgm-black text-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-medgm-gold rounded-full flex items-center justify-center text-medgm-black font-bold text-sm">
                {scriptNumber}
              </div>
              <h3 className="text-lg font-semibold">{scriptTitle}</h3>
            </div>
            <p className="text-sm text-medgm-gray-3">
              {messages.length} {messages.length === 1 ? 'mensagem' : 'mensagens'} neste fluxo
            </p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 hover:bg-medgm-gray-7 rounded-lg transition-colors"
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {/* Botão copiar todas */}
        {messages.length > 1 && (
          <button
            onClick={handleCopyAll}
            className={cn(
              "w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300",
              copiedIndex === -1
                ? "bg-green-600 text-white"
                : "bg-medgm-gold text-medgm-black hover:bg-opacity-90"
            )}
          >
            {copiedIndex === -1 ? (
              <>
                <Check className="w-4 h-4" />
                Todas Copiadas!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar Todas as Mensagens
              </>
            )}
          </button>
        )}
      </div>

      {/* Messages Flow */}
      {expanded && (
        <div className="p-6 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < messages.length - 1 && (
                <div className="absolute left-5 top-full h-4 w-0.5 bg-medgm-gray-3 z-0" />
              )}

              {/* Message Card */}
              <div className="relative bg-medgm-gray-1 rounded-xl p-4 border border-medgm-gray-2">
                {/* Message Number Badge */}
                <div className="absolute -left-3 -top-3 w-10 h-10 bg-medgm-gold rounded-full flex items-center justify-center text-medgm-black font-semibold text-sm shadow-lg z-10">
                  {index + 1}
                </div>

                <div className="mt-2">
                  {/* Message Title */}
                  {message.messageTitle && (
                    <h4 className="font-semibold text-medgm-black mb-3 text-sm">
                      {message.messageTitle}
                    </h4>
                  )}

                  {/* Message Content */}
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <pre className="text-sm text-medgm-dark-gray whitespace-pre-wrap font-sans leading-relaxed">
                      {message.messageContent}
                    </pre>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopyMessage(message.messageContent, index)}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300",
                      copiedIndex === index
                        ? "bg-green-50 text-green-600 border border-green-200"
                        : "bg-medgm-gold text-medgm-black hover:bg-opacity-90"
                    )}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copiar Mensagem {index + 1}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
