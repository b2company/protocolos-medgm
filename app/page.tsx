'use client';

import { useState, useMemo } from 'react';
import { SearchBar } from '@/components/search-bar';
import { CategoryFilter } from '@/components/category-filter';
import { ScriptCard } from '@/components/script-card';
import {
  getAllScripts,
  categoriesSecretaria,
  categoriesMedicos,
  categoriesBonus,
  getScriptsByCategory,
  searchScripts,
  getScriptStats,
} from '@/lib/scripts-data';
import { FileText, Users, UserCog, Gift } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'secretaria' | 'medico' | 'bonus'>('secretaria');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const stats = getScriptStats();

  const currentCategories =
    activeTab === 'secretaria' ? categoriesSecretaria :
    activeTab === 'medico' ? categoriesMedicos :
    categoriesBonus;

  const filteredScripts = useMemo(() => {
    const allScripts = getAllScripts();
    let scripts = allScripts;

    // Filtrar por aba
    if (activeTab === 'bonus') {
      scripts = allScripts.filter(s => s.category === 'instagram' || s.category === 'reativacao');
    } else {
      scripts = allScripts.filter(s => s.targetRole === activeTab || s.targetRole === 'ambos');
    }

    // Filtrar por busca
    if (searchQuery) {
      const searchResults = searchScripts(searchQuery);
      if (activeTab === 'bonus') {
        scripts = searchResults.filter(s => s.category === 'instagram' || s.category === 'reativacao');
      } else {
        scripts = searchResults.filter(s => s.targetRole === activeTab || s.targetRole === 'ambos');
      }
    } else if (activeCategory) {
      // Filtrar por categoria
      scripts = getScriptsByCategory(activeCategory);
    }

    return scripts;
  }, [activeTab, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-medgm-clean">
      {/* Header */}
      <header className="bg-medgm-black text-white py-8 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold tracking-tight">
                <span className="text-white">MED</span>
                <span className="text-medgm-gold">GM</span>
              </div>
              <div className="h-6 w-px bg-medgm-gold hidden md:block" />
              <h1 className="text-xl md:text-2xl font-light">Protocolos de Conversão</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-medgm-gray-3">
              <FileText className="w-4 h-4" />
              <span>{stats.total} scripts disponíveis</span>
            </div>
          </div>
        </div>
      </header>


      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => {
              setActiveTab('secretaria');
              setActiveCategory(null);
              setSearchQuery('');
            }}
            className={`flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === 'secretaria'
                ? 'bg-medgm-gold text-medgm-black shadow-lg'
                : 'bg-white text-medgm-dark-gray hover:bg-medgm-gray-1 border border-medgm-gray-2'
            }`}
          >
            <Users className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span>Secretárias</span>
              <span className="text-xs font-normal opacity-70">{stats.secretaria} scripts</span>
            </div>
          </button>
          <button
            onClick={() => {
              setActiveTab('medico');
              setActiveCategory(null);
              setSearchQuery('');
            }}
            className={`flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === 'medico'
                ? 'bg-medgm-gold text-medgm-black shadow-lg'
                : 'bg-white text-medgm-dark-gray hover:bg-medgm-gray-1 border border-medgm-gray-2'
            }`}
          >
            <UserCog className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span>Médicos</span>
              <span className="text-xs font-normal opacity-70">{stats.medico} scripts</span>
            </div>
          </button>
          <button
            onClick={() => {
              setActiveTab('bonus');
              setActiveCategory(null);
              setSearchQuery('');
            }}
            className={`flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === 'bonus'
                ? 'bg-medgm-gold text-medgm-black shadow-lg'
                : 'bg-white text-medgm-dark-gray hover:bg-medgm-gray-1 border border-medgm-gray-2'
            }`}
          >
            <Gift className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span>Bônus</span>
              <span className="text-xs font-normal opacity-70">{stats.ambos} scripts</span>
            </div>
          </button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              setActiveCategory(null);
            }}
            placeholder={
              activeTab === 'secretaria' ? 'Buscar scripts para secretárias...' :
              activeTab === 'medico' ? 'Buscar scripts para médicos...' :
              'Buscar scripts de bônus...'
            }
          />
        </div>

        {/* Category Filter */}
        {!searchQuery && (
          <div className="mb-8">
            <CategoryFilter
              categories={currentCategories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-medgm-gray-5">
            {searchQuery ? (
              <span>
                <strong>{filteredScripts.length}</strong> script(s) encontrado(s) para "{searchQuery}"
              </span>
            ) : activeCategory ? (
              <span>
                <strong>{filteredScripts.length}</strong> script(s) na categoria
              </span>
            ) : (
              <span>
                <strong>{filteredScripts.length}</strong> script(s) disponíveis
              </span>
            )}
          </p>
        </div>

        {/* Scripts Grid */}
        {filteredScripts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScripts.map((script) => (
              <ScriptCard key={script.id} script={script} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-medgm-gray-4 text-lg">Nenhum script encontrado.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-medgm-black text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-2">
            <span className="text-white">MED</span>
            <span className="text-medgm-gold">GM</span>
          </div>
          <p className="text-medgm-gray-3">
            Assessoria de Growth para Profissionais da Saúde
          </p>
        </div>
      </footer>
    </div>
  );
}
