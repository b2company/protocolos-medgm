'use client';

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard-header';
import { SidebarNav } from '@/components/sidebar-nav';
import { FlowContextPanel } from '@/components/flow-context-panel';
import { FlowTimeline } from '@/components/flow-timeline';
import { getAllMessages } from '@/lib/parse-messages';
import {
  getAllScripts,
  categoriesSecretaria,
  categoriesMedicos,
  categoriesBonus,
  getScriptStats,
  inferTiming,
  inferConditional,
  generateTip,
} from '@/lib/scripts-data';
import { FileText, Users, UserCog, Gift, Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'secretaria' | 'medico' | 'bonus'>('secretaria');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const stats = getScriptStats();

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

  // Script selecionado (auto-seleciona o primeiro se nenhum estiver selecionado)
  const selectedScript = useMemo(() => {
    if (!selectedScriptId && groupedScripts.length > 0) {
      setSelectedScriptId(groupedScripts[0].script.id);
      return groupedScripts[0];
    }
    return groupedScripts.find(s => s.script.id === selectedScriptId) || groupedScripts[0];
  }, [selectedScriptId, groupedScripts]);

  // Timeline steps
  const timelineSteps = useMemo(() => {
    if (!selectedScript) return [];
    const messages = selectedScript.messages;
    return messages.map((msg, index) => ({
      number: index + 1,
      label: msg.messageTitle || `Mensagem ${index + 1}`,
      timing: inferTiming(msg, index),
      message: msg,
      conditional: inferConditional(msg, index),
      tip: generateTip(msg),
      state: index < currentMessageIndex ? 'past' as const :
             index === currentMessageIndex ? 'current' as const :
             'future' as const
    }));
  }, [selectedScript, currentMessageIndex]);

  const handleCopyAll = async () => {
    if (!selectedScript) return;
    const allContent = selectedScript.messages.map(m => m.messageContent).join('\n\n---\n\n');
    await navigator.clipboard.writeText(allContent);
  };

  return (
    <DashboardLayout
      header={
        <DashboardHeader
          totalMessages={getAllMessages(getAllScripts()).length}
          userInitials="DG"
        />
      }
      sidebar={
        <SidebarNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveCategory(null);
            setSearchQuery('');
            setSelectedScriptId(null);
          }}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categories={currentCategories}
          scripts={groupedScripts}
          selectedScriptId={selectedScriptId}
          onScriptSelect={setSelectedScriptId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          stats={stats}
        />
      }
    >
      {selectedScript ? (
        <div className="p-6 max-w-4xl mx-auto">
          <FlowContextPanel
            scriptTitle={selectedScript.script.title}
            category={selectedScript.script.category}
            currentMessage={currentMessageIndex + 1}
            totalMessages={timelineSteps.length}
            progress={((currentMessageIndex + 1) / timelineSteps.length) * 100}
            onCopyAll={handleCopyAll}
          />
          <FlowTimeline
            steps={timelineSteps}
            currentStep={currentMessageIndex}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-medgm-gray-4">
          <p>Nenhum script encontrado</p>
        </div>
      )}
    </DashboardLayout>
  );
}
