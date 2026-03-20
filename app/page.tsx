'use client';

import { useState, useMemo, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard-header';
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
import { motion, AnimatePresence } from 'framer-motion';
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
    <DashboardLayout
      header={
        <DashboardHeader
          totalMessages={getAllMessages(getAllScripts()).length}
          userInitials="DG"
        />
      }
      sidebar={
        <div className="flex flex-col h-full p-4 text-white">
          <h2 className="text-lg font-semibold mb-4">Navegação</h2>
          <div className="flex-1">
            <p className="text-sm text-medgm-gray-3">Sidebar temporário - Fase 2 em progresso...</p>
          </div>
        </div>
      }
    >


      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveTab('secretaria');
              setActiveCategory(null);
              setSearchQuery('');
            }}
            className={`group flex items-center justify-center gap-3 py-5 px-6 rounded-2xl font-semibold transition-all duration-500 ease-out transform ${
              activeTab === 'secretaria'
                ? 'bg-gradient-premium text-medgm-black shadow-premium scale-105'
                : 'glass hover:shadow-elevation-2 hover:scale-102 text-medgm-dark-gray border border-medgm-gray-2'
            }`}
          >
            <Users className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span>Secretárias</span>
              <span className="text-xs font-normal opacity-70">{stats.secretaria} scripts</span>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveTab('medico');
              setActiveCategory(null);
              setSearchQuery('');
            }}
            className={`group flex items-center justify-center gap-3 py-5 px-6 rounded-2xl font-semibold transition-all duration-500 ease-out transform ${
              activeTab === 'medico'
                ? 'bg-gradient-premium text-medgm-black shadow-premium scale-105'
                : 'glass hover:shadow-elevation-2 hover:scale-102 text-medgm-dark-gray border border-medgm-gray-2'
            }`}
          >
            <UserCog className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span>Médicos</span>
              <span className="text-xs font-normal opacity-70">{stats.medico} scripts</span>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveTab('bonus');
              setActiveCategory(null);
              setSearchQuery('');
            }}
            className={`group flex items-center justify-center gap-3 py-5 px-6 rounded-2xl font-semibold transition-all duration-500 ease-out transform ${
              activeTab === 'bonus'
                ? 'bg-gradient-premium text-medgm-black shadow-premium scale-105'
                : 'glass hover:shadow-elevation-2 hover:scale-102 text-medgm-dark-gray border border-medgm-gray-2'
            }`}
          >
            <Gift className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span>Bônus</span>
              <span className="text-xs font-normal opacity-70">{stats.ambos} scripts</span>
            </div>
          </motion.button>
        </div>

        {/* CTA Banner - Agendar Reunião */}
        <div className="mb-8 relative overflow-hidden rounded-2xl shadow-elevation-4 group">
          <div className="absolute inset-0 bg-gradient-mesh opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
          <div className="relative bg-gradient-to-br from-medgm-gold via-amber-500 to-medgm-gold p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/20 backdrop-blur-sm p-3 rounded-xl"
                >
                  <Calendar className="w-8 h-8 text-medgm-black" />
                </motion.div>
                <div className="text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-medgm-black mb-1">
                    Precisa de Ajuda na Implementação?
                  </h3>
                  <p className="text-medgm-dark-gray text-sm md:text-base">
                    Agende uma reunião com nosso time para aplicar esses scripts na sua clínica
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-medgm-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-medgm-dark-gray transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Agendar Reunião
                <Calendar className="w-4 h-4" />
              </motion.button>
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
    </DashboardLayout>
  );
}
