'use client';

import { FileText } from 'lucide-react';
import Image from 'next/image';

interface DashboardHeaderProps {
  totalMessages: number;
  userInitials: string;
}

export function DashboardHeader({ totalMessages, userInitials }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 text-white">
      {/* Logo + Title */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src="/logo-medgm.png"
            alt="MedGM"
            width={100}
            height={32}
            className="object-contain relative z-10"
          />
          <div className="absolute inset-0 bg-gradient-premium opacity-20 blur-xl" />
        </div>
        <div className="h-6 w-px bg-medgm-gray-3" />
        <h1 className="text-lg font-semibold">Protocolos de Conversão</h1>
      </div>

      {/* Stats + User */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-medgm-gray-3">
          <FileText className="w-4 h-4" />
          <span>{totalMessages} mensagens prontas</span>
        </div>

        <div className="w-8 h-8 rounded-full bg-gradient-premium flex items-center justify-center text-medgm-black font-bold text-sm shadow-premium">
          {userInitials}
        </div>
      </div>
    </div>
  );
}
