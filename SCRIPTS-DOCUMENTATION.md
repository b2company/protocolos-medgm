# Documentação dos Scripts JSON

Base completa de scripts de conversão para clínicas médicas, organizada e estruturada em formato JSON.

## Arquivos Gerados

### 1. `scripts-full.json` (149 KB)
Arquivo principal contendo **123 scripts** completos de conversão.

**Estrutura de cada script:**
```json
{
  "id": "sec-01",
  "number": 1,
  "title": "Conversão de Primeira Consulta",
  "category": "conversao-agendamento",
  "targetRole": "secretaria",
  "content": "Conteúdo completo do script..."
}
```

### 2. `scripts-metadata.json`
Metadados, estatísticas e guia de uso por categoria.

---

## Distribuição dos Scripts

### Por Público-Alvo
- **Secretárias:** 58 scripts
- **Médicos:** 50 scripts
- **Ambos (Instagram/Reativação):** 15 scripts

### Categorias - Secretárias

| Categoria | Scripts | Descrição |
|-----------|---------|-----------|
| `conversao-agendamento` | 11 (1-11) | Primeiros contatos, conversão de leads |
| `confirmacao-reagendamento` | 8 (12-19) | Confirmações, reagendamentos, faltas |
| `orientacoes` | 7 (20-26) | Orientações pré-consulta, formulários |
| `valores-pagamento` | 8 (27-34) | Descontos, preços, cobrança |
| `transicao-convenio` | 5 (35-39) | Convênio → Particular |
| `relacionamento` | 7 (40-46) | Reativação, fidelização |
| `scripts-especificos` | 12 (47-58) | Receitas, urgências, situações específicas |

### Categorias - Médicos

| Categoria | Quantidade | Principais Scripts |
|-----------|------------|-------------------|
| `gestao-consultas` | 10 | 1, 9, 10, 26, 29, 30, 33, 36, 44, 46 |
| `limites-comunicacao` | 11 | 3, 4, 6, 12, 35, 37, 38, 40-43 |
| `cobranca-preco` | 11 | 14-16, 20-23, 34, 45, 47, 49 |
| `receitas-exames` | 2 | 5, 7, 37, 38, 40 |
| `redes-sociais` | 3 | 11, 16, 39, 48 |
| `venda-procedimentos` | 4 | 8, 13, 24, 25 |
| `relacionamento-pos` | 3 | 17, 31, 32 |
| `situacoes-delicadas` | 4 | 18, 19, 27, 28 |
| `consultas-domiciliares` | 1 | 49, 50 |
| `comunicacao-institucional` | 1 | 2, 29, 30, 46 |

### Categorias - Ambos

| Categoria | Quantidade | Descrição |
|-----------|------------|-----------|
| `instagram` | 14 | Scripts para Direct e Stories |
| `reativacao` | 1 | 10 mensagens para reativar pacientes |

---

## Como Usar

### 1. Leitura Básica (Python)

```python
import json

with open('scripts-full.json', 'r', encoding='utf-8') as f:
    scripts = json.load(f)

# Buscar script específico
script = next(s for s in scripts if s['id'] == 'sec-01')
print(script['title'])
print(script['content'])
```

### 2. Filtrar por Categoria

```python
# Scripts de conversão para secretárias
conversao = [s for s in scripts
             if s['category'] == 'conversao-agendamento']

# Scripts de cobrança para médicos
cobranca = [s for s in scripts
            if s['category'] == 'cobranca-preco']
```

### 3. Buscar por Palavras-Chave

```python
# Scripts que mencionam "desconto"
descontos = [s for s in scripts
             if 'desconto' in s['content'].lower()]

# Scripts sobre convênio
convenio = [s for s in scripts
            if 'convênio' in s['content'].lower() or
               'convenio' in s['content'].lower()]
```

### 4. Integração com TypeScript (Next.js)

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

// Buscar por ID
const script = scriptsData.find(s => s.id === 'sec-01');

// Filtrar por categoria
const conversaoScripts = scriptsData.filter(
  s => s.category === 'conversao-agendamento'
);

// Busca textual
const searchScripts = (query: string) => {
  return scriptsData.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.content.toLowerCase().includes(query.toLowerCase())
  );
};
```

---

## Casos de Uso Práticos

### Para Secretárias

**Converter lead em agendamento:**
- Scripts `sec-01` a `sec-11`

**Reduzir no-show:**
- Scripts `sec-12` (confirmação 1ª mensagem)
- Script `sec-13` (7 dias antes)
- Script `sec-14` (24h antes)

**Lidar com pedidos de desconto:**
- Scripts `sec-27`, `sec-28`, `sec-29`

**Transição convênio → particular:**
- Scripts `sec-35` a `sec-39`

### Para Médicos

**Estabelecer limites profissionais:**
- Scripts `med-03` a `med-06` (renovação receita, orientação sem consulta)
- Script `med-12` (não ouvir áudios)
- Scripts `med-41`, `med-43` (WhatsApp fora de hora)

**Aumentar ticket médio:**
- Script `med-13` (oferecer procedimento)
- Script `med-08` (consulta eventual)

**Lidar com situações delicadas:**
- Script `med-18` (responder reclamação)
- Script `med-27` (pacientes difíceis)
- Script `med-28` (demitir paciente)

**Negociar preço sem desvalorizar:**
- Scripts `med-20` a `med-23`
- Script `med-34` (reclamação de reajuste)

### Para Instagram

**Converter curiosos em leads:**
- Scripts `insta-01`, `insta-02`

**Responder sobre convênio:**
- Scripts `insta-03`, `insta-06`, `insta-07`

**Educar sobre limites:**
- Scripts `insta-05` (exames via direct)
- Script `insta-13` (Instagram não é canal de atendimento)

**Transformar elogios em avaliações:**
- Script `insta-11`

---

## Dicas de Implementação

### 1. CRM / Sistema de Gestão
Importe os scripts como templates no seu CRM (RD Station, HubSpot, Kommo, etc.)

### 2. WhatsApp Business
Salve como **Respostas Rápidas**:
- `/conversao` → Script sec-01
- `/confirmacao` → Script sec-12
- `/desconto` → Script sec-27

### 3. Treinamento de Equipe
Use como base para onboarding de novos CSs e secretárias.

### 4. Automação
- Scripts de confirmação (sec-12, 13, 14) podem ser automatizados
- Scripts de reativação (reativacao-01) funcionam bem em campanhas

---

## Estrutura de IDs

### Formato
- **Secretárias:** `sec-01` a `sec-58`
- **Médicos:** `med-01` a `med-50`
- **Instagram:** `insta-01` a `insta-14`
- **Reativação:** `reativacao-01`

### Mapeamento Numérico

**Secretárias (1-58):**
- 1-11: Conversão e agendamento
- 12-19: Confirmação e reagendamento
- 20-26: Orientações
- 27-34: Valores e pagamento
- 35-39: Transição convênio
- 40-46: Relacionamento
- 47-58: Scripts específicos

**Médicos (1-50):**
- Distribuídos por categoria funcional (não sequencial)
- Ver `scripts-metadata.json` para mapeamento completo

---

## Manutenção

**Quando atualizar:**
- Mudança de preço → Revisar scripts de categoria `valores-pagamento`
- Novo procedimento → Adicionar variação de `med-13`
- Descredenciamento de convênio → Usar `med-02` + `sec-35` a `sec-39`

**Controle de versão:**
- Versão atual: **1.0** (2026-03-20)
- 123 scripts processados
- Origem: `/Users/odavi.feitosa/Desktop/Private & Shared/Protocolos de Conversão`

---

## Suporte

Para dúvidas sobre implementação ou adaptação dos scripts:
- Consultar arquivo `scripts-metadata.json` para estatísticas completas
- Revisar categorias por caso de uso específico
- Testar scripts antes de implementar em produção

---

**Gerado em:** 2026-03-20  
**Total de scripts:** 123  
**Tamanho médio:** ~1.000 caracteres por script  
**Formato:** JSON UTF-8
