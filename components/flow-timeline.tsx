'use client';

import { useState } from 'react';
import { Clock, Copy, Check, Lightbulb, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimelineStep {
  number: number;
  label: string;
  timing: string;
  message: any;
  conditional?: string;
  tip?: string;
  state: 'past' | 'current' | 'future';
}

interface FlowTimelineProps {
  steps: TimelineStep[];
  currentStep: number;
}

export function FlowTimeline({ steps, currentStep }: FlowTimelineProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatTiming = (timing: string) => {
    if (timing === 'imediato') return 'Imediato';
    return timing.toUpperCase();
  };

  return (
    <div className="space-y-4 md:space-y-6 md:ml-14">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "relative pb-4 md:pb-6",
            step.state === 'future' && "opacity-50",
            step.state === 'current' && "ring-2 ring-medgm-gold rounded-xl p-3 md:p-4 z-10"
          )}
        >
          {/* Badge número - desktop: à esquerda absoluto; mobile: inline no header */}
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex absolute -left-14 top-0 w-8 h-8 rounded-full bg-gradient-premium items-center justify-center text-medgm-black font-bold text-sm shadow-premium"
          >
            {step.number}
          </motion.div>

          {/* Step header */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              {/* Badge inline só no mobile */}
              <div className="md:hidden w-6 h-6 rounded-full bg-gradient-premium flex items-center justify-center text-medgm-black font-bold text-xs shadow-premium shrink-0">
                {step.number}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-medgm-black">{step.label}</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-medgm-gray-5">
              <Clock className="w-4 h-4" />
              <span>{formatTiming(step.timing)}</span>
            </div>
          </div>

          {/* Message card */}
          <div className="bg-white rounded-xl p-4 border border-medgm-gray-2 mb-3 shadow-elevation-1">
            <pre className="text-sm whitespace-pre-wrap font-sans text-medgm-dark-gray leading-relaxed">
              {step.message.messageContent}
            </pre>
          </div>

          {/* Dica */}
          {step.tip && (
            <div className="mb-3 flex items-start gap-2 bg-blue-50 rounded-lg p-3 border border-blue-200">
              <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <p className="text-sm text-blue-700">{step.tip}</p>
            </div>
          )}

          {/* Botão copiar */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCopy(step.message.messageContent, index)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all min-h-[44px]",
              copiedIndex === index
                ? "bg-green-50 text-green-600 border border-green-200"
                : "bg-medgm-gold text-medgm-black hover:opacity-90 shadow-elevation-2"
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
                Copiar Mensagem
              </>
            )}
          </motion.button>

          {/* Condicional */}
          {step.conditional && index < steps.length - 1 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-medgm-gray-5">
              <ArrowDown className="w-4 h-4" />
              <span className="italic">{step.conditional}</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
