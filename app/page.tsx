'use client';

import { useState, useMemo, useEffect } from 'react';
import { SearchBar } from '@/components/search-bar';
import { CategoryFilter } from '@/components/category-filter';
import { ScriptFlow } from '@/components/script-flow';
import { getAllMessages } from '@/lib/parse-messages';
import {
  getAllScripts,
  categoriesSecretaria,
  categoriesMedicos,
  categoriesBonus,
  getScriptStats,
} from '@/lib/scripts-data';
import { FileText, Users, UserCog, Gift, Calendar, X } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'secretaria' | 'medico' | 'bonus'>('secretaria');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const stats = getScriptStats();

  // Carregar script do formulário quando modal abrir
  useEffect(() => {
    if (showModal) {
      const script = document.createElement('script');
      script.src = 'https://admin.medgm.com.br/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showModal]);

  const currentCategories =
    activeTab === 'secretaria' ? categoriesSecretaria :
    activeTab === 'medico' ? categoriesMedicos :
    categoriesBonus;

  const groupedScripts = useMemo(() => {
    const allScripts = getAllScripts();
    let scripts = allScripts;

    // Filtrar por aba
    if (activeTab === 'bonus') {
      scripts = scripts.filter(s => s.category === 'instagram' || s.category === 'reativacao');
    } else {
      scripts = scripts.filter(s => s.targetRole === activeTab || s.targetRole === 'ambos');
    }

    // Filtrar por categoria
    if (activeCategory) {
      scripts = scripts.filter(s => s.category === activeCategory);
    }

    // Filtrar por busca
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      scripts = scripts.filter(s =>
        s.title.toLowerCase().includes(lowerQuery) ||
        s.content.toLowerCase().includes(lowerQuery)
      );
    }

    // Agrupar mensagens por script
    return scripts.map(script => ({
      script,
      messages: getAllMessages([script])
    }));
  }, [activeTab, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-medgm-clean">
      {/* Header */}
      <header className="bg-medgm-black text-white py-8 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/logo-medgm.png"
                alt="MedGM"
                width={120}
                height={40}
                className="object-contain"
                priority
              />
              <div className="h-6 w-px bg-medgm-gold hidden md:block" />
              <h1 className="text-xl md:text-2xl font-light">Protocolos de Conversão</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-medgm-gray-3">
              <FileText className="w-4 h-4" />
              <span>{getAllMessages(getAllScripts()).length} mensagens prontas</span>
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

        {/* CTA Banner - Agendar Reunião */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-medgm-gold to-amber-500 rounded-2xl p-6 md:p-8 text-center shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <Calendar className="w-8 h-8 text-medgm-black" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-medgm-black mb-1">
                    Precisa de Ajuda na Implementação?
                  </h3>
                  <p className="text-medgm-dark-gray text-sm md:text-base">
                    Agende uma reunião com nosso time para aplicar esses scripts na sua clínica
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-medgm-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-medgm-dark-gray transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Agendar Reunião
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>
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
            <strong>{groupedScripts.length}</strong> script(s) {searchQuery && `encontrado(s) para "${searchQuery}"`}
          </p>
        </div>

        {/* Scripts Flow */}
        {groupedScripts.length > 0 ? (
          <div className="space-y-6">
            {groupedScripts.map(({ script, messages }, index) => (
              <ScriptFlow
                key={script.id}
                scriptNumber={index + 1}
                scriptTitle={script.title}
                messages={messages}
              />
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

      {/* Modal de Agendamento */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-medgm-gold px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-medgm-black">
                Agendar Reunião com MedGM
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-medgm-black" />
              </button>
            </div>

            {/* Conteúdo do Modal com iframe */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <iframe
                src="https://admin.medgm.com.br/widget/survey/yEebZ7Pyvvkjh25TCypM"
                style={{ border: 'none', width: '100%', minHeight: '600px' }}
                scrolling="no"
                id="yEebZ7Pyvvkjh25TCypM"
                title="Formulário de Agendamento MedGM"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
