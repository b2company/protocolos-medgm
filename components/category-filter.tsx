'use client';

import { cn } from '@/lib/utils';

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
      <button
        onClick={() => onCategoryChange(null)}
        className={cn(
          "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
          activeCategory === null
            ? "bg-medgm-black text-white"
            : "bg-white text-medgm-dark-gray hover:bg-medgm-gray-1 border border-medgm-gray-2"
        )}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2",
            activeCategory === category.id
              ? "bg-medgm-gold text-medgm-black"
              : "bg-white text-medgm-dark-gray hover:bg-medgm-gray-1 border border-medgm-gray-2"
          )}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}
