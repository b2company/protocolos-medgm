'use client';

import { Users, Heart, Star } from 'lucide-react';
import { TabButton } from './tab-button';
import { CategoryChip } from './category-chip';
import { ScriptListItem } from './script-list-item';
import { SearchBar } from './search-bar';
import type { Script } from '@/lib/scripts-data';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface SidebarNavProps {
  activeTab: 'secretaria' | 'medico' | 'bonus';
  onTabChange: (tab: 'secretaria' | 'medico' | 'bonus') => void;
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: Category[];
  scripts: Array<{ script: Script; messages: any[] }>;
  selectedScriptId: string | null;
  onScriptSelect: (scriptId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  stats: { secretaria: number; medico: number; ambos: number };
}

export function SidebarNav({
  activeTab,
  onTabChange,
  activeCategory,
  onCategoryChange,
  categories,
  scripts,
  selectedScriptId,
  onScriptSelect,
  searchQuery,
  onSearchChange,
  stats,
}: SidebarNavProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tabs verticais */}
      <div className="p-4 space-y-2 border-b border-medgm-gray-2">
        <TabButton
          icon={<Users className="w-5 h-5" />}
          label="Secretárias"
          count={stats.secretaria}
          active={activeTab === 'secretaria'}
          onClick={() => onTabChange('secretaria')}
        />
        <TabButton
          icon={<Heart className="w-5 h-5" />}
          label="Médicos"
          count={stats.medico}
          active={activeTab === 'medico'}
          onClick={() => onTabChange('medico')}
        />
        <TabButton
          icon={<Star className="w-5 h-5" />}
          label="Bônus"
          count={stats.ambos}
          active={activeTab === 'bonus'}
          onClick={() => onTabChange('bonus')}
        />
      </div>

      {/* Search inline */}
      <div className="p-4 border-b border-medgm-gray-2">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={`Buscar ${activeTab === 'secretaria' ? 'secretária' : activeTab === 'medico' ? 'médico' : 'bônus'}...`}
        />
      </div>

      {/* Category chips */}
      {!searchQuery && (
        <div className="px-4 py-3 space-y-1 border-b border-medgm-gray-2">
          <p className="text-xs font-semibold text-medgm-gray-5 mb-2 uppercase tracking-wide">Categorias</p>
          <CategoryChip
            label="Todos"
            active={!activeCategory}
            onClick={() => onCategoryChange(null)}
          />
          {categories.map((cat) => (
            <CategoryChip
              key={cat.id}
              label={cat.name}
              icon={cat.icon}
              active={activeCategory === cat.id}
              onClick={() => onCategoryChange(cat.id)}
            />
          ))}
        </div>
      )}

      {/* Lista de scripts (scrollável) */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-xs font-semibold text-medgm-gray-5 mb-3 uppercase tracking-wide">
          {scripts.length} {scripts.length === 1 ? 'Script' : 'Scripts'}
        </p>
        {scripts.map(({ script, messages }) => (
          <ScriptListItem
            key={script.id}
            title={script.title}
            messageCount={messages.length}
            active={selectedScriptId === script.id}
            onClick={() => onScriptSelect(script.id)}
          />
        ))}
        {scripts.length === 0 && (
          <p className="text-sm text-medgm-gray-4 text-center py-8">
            Nenhum script encontrado
          </p>
        )}
      </div>
    </div>
  );
}
