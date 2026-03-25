'use client';

import { FileText } from 'lucide-react';
import Image from 'next/image';

interface DashboardHeaderProps {
  totalMessages: number;
  userInitials: string;
}

export function DashboardHeader({ totalMessages, userInitials }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 text-medgm-black">
      {/* Logo + Title */}
      <div className="flex items-center gap-3 md:gap-4 pl-12 md:pl-0">
        <div className="relative">
          <Image
            src="/logo-medgm.png"
            alt="MedGM"
            width={100}
            height={32}
            className="object-contain relative z-10 w-16 md:w-[100px]"
          />
          <div className="absolute inset-0 bg-gradient-premium opacity-10 blur-xl" />
        </div>
        <div className="hidden sm:block h-6 w-px bg-medgm-gray-3" />
        <h1 className="hidden sm:block text-base md:text-lg font-semibold">Protocolos de Conversão</h1>
      </div>

      {/* Stats + User */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex items-center gap-2 text-xs md:text-sm text-medgm-gray-5">
          <FileText className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">{totalMessages} mensagens prontas</span>
          <span className="sm:hidden font-medium">{totalMessages}</span>
        </div>

        <div className="w-8 h-8 rounded-full bg-gradient-premium flex items-center justify-center text-medgm-black font-bold text-sm shadow-premium shrink-0">
          {userInitials}
        </div>
      </div>
    </div>
  );
}
