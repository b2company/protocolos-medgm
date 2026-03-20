'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Buscar por situação..." }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-medgm-gray-4" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 bg-white border border-medgm-gray-2 rounded-2xl text-medgm-black placeholder:text-medgm-gray-4 focus:outline-none focus:border-medgm-gold focus:ring-2 focus:ring-medgm-gold focus:ring-opacity-20 transition-all"
      />
    </div>
  );
}
