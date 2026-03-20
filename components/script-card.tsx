'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Script } from '@/lib/scripts-data';
import { cn } from '@/lib/utils';

interface ScriptCardProps {
  script: Script;
}

// Função para limpar markdown e deixar o texto pronto para WhatsApp
function cleanMarkdownForWhatsApp(text: string): string {
  return text
    // Remove headers (###, ##, #)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic (**text** ou *text*)
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    // Remove links markdown [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove dividers (---, ___)
    .replace(/^[-_]{3,}$/gm, '')
    // Remove emojis isolados em linha
    .replace(/^(🗂️|📌|📝|💡|✅|❌|⚠️)\s+\*?\*?.*$/gm, '')
    // Remove bullet points markdown (-, *, +)
    .replace(/^[*+-]\s+/gm, '')
    // Remove espaços extras
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function ScriptCard({ script }: ScriptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const cleanText = cleanMarkdownForWhatsApp(script.content);
    await navigator.clipboard.writeText(cleanText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-white border border-medgm-gray-2 rounded-2xl p-6 hover:border-medgm-gold transition-all duration-300 hover:shadow-xl">
      {/* Badge com número */}
      <div className="absolute -top-3 -left-3 w-10 h-10 bg-medgm-black rounded-full flex items-center justify-center text-medgm-gold font-semibold text-sm">
        {script.number.toString().padStart(2, '0')}
      </div>

      {/* Cabeçalho */}
      <div className="mb-4 mt-2">
        <h3 className="text-xl font-semibold text-medgm-black mb-2">
          {script.title}
        </h3>
        <div className="flex gap-2">
          {script.keywords.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              className="text-xs px-2 py-1 bg-medgm-gray-1 text-medgm-gray-5 rounded-full"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Conteúdo do Script */}
      <div className="relative">
        <div className="bg-medgm-gray-1 rounded-xl p-4 mb-4 max-h-64 overflow-y-auto">
          <pre className="text-sm text-medgm-dark-gray whitespace-pre-wrap font-sans">
            {script.content}
          </pre>
        </div>

        {/* Botão Copiar */}
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
              Copiar Script
            </>
          )}
        </button>
      </div>
    </div>
  );
}
