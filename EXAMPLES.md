# Exemplos Práticos de Uso dos Scripts

## Exemplos de Código

### 1. Node.js / JavaScript

```javascript
const fs = require('fs');

// Carregar scripts
const scripts = JSON.parse(
  fs.readFileSync('scripts-full.json', 'utf-8')
);

// Buscar script específico
function getScript(id) {
  return scripts.find(s => s.id === id);
}

// Exemplo: Pegar script de conversão inicial
const conversaoScript = getScript('sec-01');
console.log(conversaoScript.title);
console.log(conversaoScript.content);

// Filtrar por categoria
function getScriptsByCategory(category) {
  return scripts.filter(s => s.category === category);
}

// Exemplo: Todos os scripts de confirmação
const confirmacaoScripts = getScriptsByCategory('confirmacao-reagendamento');
console.log(`${confirmacaoScripts.length} scripts de confirmação`);

// Busca textual
function searchScripts(query) {
  const lowerQuery = query.toLowerCase();
  return scripts.filter(s =>
    s.title.toLowerCase().includes(lowerQuery) ||
    s.content.toLowerCase().includes(lowerQuery)
  );
}

// Exemplo: Buscar scripts sobre "desconto"
const descontoScripts = searchScripts('desconto');
descontoScripts.forEach(s => {
  console.log(`${s.id}: ${s.title}`);
});
```

### 2. Python

```python
import json

# Carregar scripts
with open('scripts-full.json', 'r', encoding='utf-8') as f:
    scripts = json.load(f)

# Buscar script específico
def get_script(script_id):
    return next((s for s in scripts if s['id'] == script_id), None)

# Exemplo: Script de conversão
conversao = get_script('sec-01')
print(conversao['title'])
print(conversao['content'])

# Filtrar por público-alvo
def get_scripts_by_role(role):
    return [s for s in scripts if s['targetRole'] == role]

# Exemplo: Todos os scripts para médicos
medico_scripts = get_scripts_by_role('medico')
print(f'{len(medico_scripts)} scripts para médicos')

# Busca por palavras-chave
def search_scripts(query):
    query_lower = query.lower()
    return [s for s in scripts
            if query_lower in s['title'].lower() or
               query_lower in s['content'].lower()]

# Exemplo: Scripts sobre "convênio"
convenio_scripts = search_scripts('convênio')
for s in convenio_scripts:
    print(f"{s['id']}: {s['title']}")

# Estatísticas por categoria
from collections import Counter
categories = Counter(s['category'] for s in scripts)
for category, count in categories.most_common():
    print(f'{category}: {count} scripts')
```

### 3. TypeScript (Next.js / React)

```typescript
import scriptsData from './scripts-full.json';

interface Script {
  id: string;
  number: number;
  title: string;
  category: string;
  targetRole: 'secretaria' | 'medico' | 'ambos';
  content: string;
}

const scripts: Script[] = scriptsData;

// Hook para busca de scripts
import { useState, useMemo } from 'react';

export function useScripts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const filteredScripts = useMemo(() => {
    let filtered = scripts;

    // Filtrar por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(query) ||
        s.content.toLowerCase().includes(query)
      );
    }

    // Filtrar por categoria
    if (selectedCategory) {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }

    // Filtrar por público-alvo
    if (selectedRole) {
      filtered = filtered.filter(s => s.targetRole === selectedRole);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedRole]);

  return {
    scripts: filteredScripts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedRole,
    setSelectedRole,
  };
}

// Componente de exemplo
export function ScriptCard({ script }: { script: Script }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-sm text-gray-500">{script.id}</span>
          <h3 className="font-semibold">{script.title}</h3>
          <span className="text-xs text-gray-400">{script.category}</span>
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-600 line-clamp-3">
        {script.content}
      </p>
    </div>
  );
}
```

### 4. Integração com CRM (Exemplo API)

```javascript
// Exemplo de integração com API de CRM
async function importScriptsToCRM(crmApiKey) {
  const scripts = require('./scripts-full.json');

  // Scripts de confirmação para automação
  const confirmacaoScripts = scripts.filter(
    s => s.category === 'confirmacao-reagendamento'
  );

  for (const script of confirmacaoScripts) {
    await fetch('https://api.seucrm.com/templates', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${crmApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: script.title,
        category: script.category,
        content: script.content,
        tags: [script.targetRole, script.category]
      })
    });
  }
}
```

### 5. WhatsApp Business API

```javascript
// Exemplo de resposta rápida para WhatsApp Business
function createWhatsAppQuickReplies() {
  const scripts = require('./scripts-full.json');

  // Scripts mais usados
  const quickReplies = [
    { shortcut: '/conversao', scriptId: 'sec-01' },
    { shortcut: '/confirmacao', scriptId: 'sec-12' },
    { shortcut: '/desconto', scriptId: 'sec-27' },
    { shortcut: '/convenio', scriptId: 'sec-35' },
  ];

  return quickReplies.map(qr => {
    const script = scripts.find(s => s.id === qr.scriptId);
    return {
      shortcut: qr.shortcut,
      message: script.content
    };
  });
}

// Usar com WhatsApp Business API
const quickReplies = createWhatsAppQuickReplies();
quickReplies.forEach(qr => {
  console.log(`${qr.shortcut} -> ${qr.message.substring(0, 50)}...`);
});
```

---

## Casos de Uso Reais

### Caso 1: Dashboard de Scripts para Equipe

```typescript
// components/ScriptsDashboard.tsx
export function ScriptsDashboard() {
  const { scripts, setSearchQuery, setSelectedCategory } = useScripts();
  
  const categories = useMemo(() => {
    const cats = new Set(scripts.map(s => s.category));
    return Array.from(cats);
  }, [scripts]);

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Buscar scripts..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="flex gap-2 mb-4 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scripts.map(script => (
          <ScriptCard key={script.id} script={script} />
        ))}
      </div>
    </div>
  );
}
```

### Caso 2: Automação de Confirmações

```python
# automation/confirmations.py
import json
from datetime import datetime, timedelta

def send_confirmation_sequence(patient):
    """Envia sequência de confirmações automaticamente"""
    
    # Carregar scripts
    with open('scripts-full.json', 'r', encoding='utf-8') as f:
        scripts = json.load(f)
    
    # Scripts de confirmação
    primeira_msg = next(s for s in scripts if s['id'] == 'sec-12')
    sete_dias = next(s for s in scripts if s['id'] == 'sec-13')
    um_dia = next(s for s in scripts if s['id'] == 'sec-14')
    
    # Personalizar mensagens
    consulta_data = patient['appointment_date']
    
    # Agendar envios
    schedule_message(
        patient_phone=patient['phone'],
        message=primeira_msg['content'].replace('[NOME]', patient['name']),
        send_at=datetime.now()
    )
    
    schedule_message(
        patient_phone=patient['phone'],
        message=sete_dias['content'].replace('[PACIENTE]', patient['name']),
        send_at=consulta_data - timedelta(days=7)
    )
    
    schedule_message(
        patient_phone=patient['phone'],
        message=um_dia['content'].replace('[PACIENTE]', patient['name']),
        send_at=consulta_data - timedelta(days=1)
    )
```

### Caso 3: Treinamento de Equipe

```javascript
// training/quiz.js
// Sistema de quiz para treinar secretárias com scripts

const scripts = require('./scripts-full.json');

function generateQuiz(category) {
  const categoryScripts = scripts.filter(s => s.category === category);
  
  return categoryScripts.map(script => ({
    question: `Qual script usar para: ${script.title}?`,
    correctAnswer: script.id,
    options: [
      script.id,
      ...getRandomScripts(3).map(s => s.id)
    ].sort(() => Math.random() - 0.5),
    scriptContent: script.content
  }));
}

// Quiz sobre conversão
const conversaoQuiz = generateQuiz('conversao-agendamento');
console.log(conversaoQuiz);
```

---

## Performance Tips

### Cache em Memória (Node.js)

```javascript
// utils/scripts-cache.js
let scriptsCache = null;

export function getScripts() {
  if (!scriptsCache) {
    scriptsCache = require('./scripts-full.json');
  }
  return scriptsCache;
}

export function getScript(id) {
  return getScripts().find(s => s.id === id);
}
```

### Index por ID (Python)

```python
# utils/scripts_index.py
import json

class ScriptsIndex:
    def __init__(self, filepath='scripts-full.json'):
        with open(filepath, 'r', encoding='utf-8') as f:
            self.scripts = json.load(f)
        
        # Criar índices
        self.by_id = {s['id']: s for s in self.scripts}
        self.by_category = {}
        for s in self.scripts:
            if s['category'] not in self.by_category:
                self.by_category[s['category']] = []
            self.by_category[s['category']].append(s)
    
    def get(self, script_id):
        return self.by_id.get(script_id)
    
    def get_by_category(self, category):
        return self.by_category.get(category, [])

# Uso
index = ScriptsIndex()
script = index.get('sec-01')
conversao_scripts = index.get_by_category('conversao-agendamento')
```

---

**Última atualização:** 2026-03-20
