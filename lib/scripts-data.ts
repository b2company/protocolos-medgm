import scriptsJson from '../scripts-full.json';

export interface Script {
  id: string;
  number: number;
  title: string;
  category: string;
  subcategory?: string;
  content: string;
  keywords: string[];
  targetRole: 'secretaria' | 'medico' | 'ambos';
}

export const categoriesSecretaria = [
  { id: 'conversao-agendamento', name: 'Conversão e Agendamento', icon: '🧲' },
  { id: 'confirmacao-reagendamento', name: 'Confirmação e Reagendamento', icon: '📆' },
  { id: 'orientacoes', name: 'Orientações Pré e Pós-Consulta', icon: '💬' },
  { id: 'valores-pagamento', name: 'Valores e Formas de Pagamento', icon: '💰' },
  { id: 'transicao-convenio', name: 'Gestão de Transição Convênio', icon: '🚧' },
  { id: 'relacionamento', name: 'Relacionamento e Retenção', icon: '💡' },
  { id: 'scripts-especificos', name: 'Scripts Específicos', icon: '🧾' },
];

export const categoriesMedicos = [
  { id: 'gestao-consultas', name: 'Gestão de Consultas', icon: '🔹' },
  { id: 'limites-comunicacao', name: 'Limites e Comunicação', icon: '🔹' },
  { id: 'cobranca-preco', name: 'Cobrança e Política de Preço', icon: '🔹' },
  { id: 'receitas-exames', name: 'Receitas, Exames e Laudos', icon: '🔹' },
  { id: 'redes-sociais', name: 'Redes Sociais e Ética', icon: '🔹' },
  { id: 'venda-procedimentos', name: 'Venda de Procedimentos', icon: '🔹' },
  { id: 'relacionamento-pos', name: 'Relacionamento Pós-Consulta', icon: '🔹' },
  { id: 'situacoes-delicadas', name: 'Situações Delicadas', icon: '🔹' },
  { id: 'consultas-domiciliares', name: 'Consultas Domiciliares', icon: '🔹' },
  { id: 'comunicacao-institucional', name: 'Comunicação Institucional', icon: '🔹' },
];

export const categoriesBonus = [
  { id: 'instagram', name: 'Scripts para Instagram', icon: '📱' },
  { id: 'reativacao', name: 'Reativação de Pacientes', icon: '🔄' },
];

// Função para extrair keywords do título e conteúdo
function extractKeywords(title: string, content: string): string[] {
  const keywords: string[] = [];
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();

  // Keywords comuns baseadas no título
  const commonKeywords = [
    'consulta', 'paciente', 'agendamento', 'retorno', 'desconto', 'valor',
    'convênio', 'particular', 'urgência', 'confirmação', 'reagendamento',
    'procedimento', 'cirurgia', 'tratamento', 'receita', 'exame',
    'pagamento', 'cobrança', 'reembolso', 'cancelamento', 'falta',
    'whatsapp', 'instagram', 'direct', 'avaliação', 'google',
    'primeira vez', 'novo paciente', 'médico', 'doutora', 'secretária'
  ];

  // Adiciona keywords que aparecem no título ou conteúdo
  commonKeywords.forEach(keyword => {
    if (titleLower.includes(keyword) || contentLower.includes(keyword)) {
      keywords.push(keyword);
    }
  });

  // Adiciona palavras do título
  const titleWords = title
    .toLowerCase()
    .replace(/[—–-]/g, ' ')
    .split(' ')
    .filter(word => word.length > 3 && !['para', 'quando', 'como', 'com', 'sem', 'que'].includes(word));

  keywords.push(...titleWords.slice(0, 3));

  // Remove duplicatas e limita a 10 keywords
  return [...new Set(keywords)].slice(0, 10);
}

// Processa os scripts do JSON e adiciona keywords
export const scriptsData: Script[] = scriptsJson.map((script: any) => ({
  ...script,
  keywords: extractKeywords(script.title, script.content),
})) as Script[];

export function getAllScripts(): Script[] {
  return scriptsData;
}

export function getScriptsByRole(role: 'secretaria' | 'medico' | 'ambos'): Script[] {
  if (role === 'ambos') {
    return scriptsData;
  }
  return scriptsData.filter(s => s.targetRole === role || s.targetRole === 'ambos');
}

export function searchScripts(query: string): Script[] {
  const lowerQuery = query.toLowerCase();
  return scriptsData.filter(script =>
    script.title.toLowerCase().includes(lowerQuery) ||
    script.keywords.some(k => k.toLowerCase().includes(lowerQuery)) ||
    script.content.toLowerCase().includes(lowerQuery)
  );
}

export function getScriptsByCategory(categoryId: string): Script[] {
  return scriptsData.filter(s => s.category === categoryId);
}

export function getScriptStats() {
  const total = scriptsData.length;
  const secretaria = scriptsData.filter(s => s.targetRole === 'secretaria').length;
  const medico = scriptsData.filter(s => s.targetRole === 'medico').length;
  const ambos = scriptsData.filter(s => s.targetRole === 'ambos').length;

  return {
    total,
    secretaria,
    medico,
    ambos,
  };
}
