'use client';

import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Buscar por situação..." }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-premium opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl" />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-medgm-gray-4 group-focus-within:text-medgm-gold transition-colors duration-300 z-10" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="relative w-full pl-12 pr-4 py-4 glass border border-medgm-gray-2 rounded-2xl text-medgm-black placeholder:text-medgm-gray-4 focus:outline-none focus:border-medgm-gold focus:ring-4 focus:ring-medgm-gold/20 transition-all duration-300 shadow-elevation-1 focus:shadow-premium"
      />
    </motion.div>
  );
}
