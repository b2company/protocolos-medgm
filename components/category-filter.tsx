'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCategoryChange(null)}
        className={cn(
          "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-elevation-1",
          activeCategory === null
            ? "bg-medgm-black text-white shadow-elevation-3"
            : "glass text-medgm-dark-gray hover:shadow-elevation-2 border border-medgm-gray-2"
        )}
      >
        Todos
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-elevation-1 flex items-center gap-2",
            activeCategory === category.id
              ? "bg-gradient-premium text-medgm-black shadow-premium"
              : "glass text-medgm-dark-gray hover:shadow-elevation-2 border border-medgm-gray-2"
          )}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
