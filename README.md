# Protocolos de Conversão | MedGM

Aplicação web com 110+ scripts validados para médicos e secretárias da área da saúde.

## 🚀 Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones

## 🎨 Identidade Visual MedGM

- **Cores:**
  - Gold: `#D6B991`
  - Black: `#151515`
  - Dark Gray: `#2B2B2B`
  - Clean: `#F5F5F5`

- **Tipografia:** Gilroy (Light, Regular, Medium, SemiBold, Bold)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy no Vercel

### Via GitHub (Recomendado)

1. **Crie um repositório no GitHub:**
   ```bash
   cd protocolos-medgm
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/protocolos-medgm.git
   git push -u origin main
   ```

2. **Deploy no Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe o repositório do GitHub
   - Vercel vai detectar Next.js automaticamente
   - Clique em "Deploy"

### Via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy em produção
vercel --prod
```

## 📁 Estrutura do Projeto

```
protocolos-medgm/
├── app/
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx            # Layout raiz
│   └── page.tsx              # Página principal
├── components/
│   ├── category-filter.tsx   # Filtro de categorias
│   ├── script-card.tsx       # Card de script
│   └── search-bar.tsx        # Barra de busca
├── lib/
│   ├── scripts-data.ts       # Dados dos scripts
│   └── utils.ts              # Utilitários
├── public/
│   └── fonts/                # Fontes Gilroy (adicionar manualmente)
└── tailwind.config.ts        # Configuração Tailwind
```

## ✅ TODO

- [ ] Adicionar os 110 scripts completos em `lib/scripts-data.ts`
- [ ] Adicionar fontes Gilroy em `public/fonts/`
- [ ] Configurar domínio customizado (scripts.medgm.com.br)
- [ ] Adicionar analytics (opcional)
- [ ] Adicionar autenticação (opcional)

## 📝 Como Adicionar Mais Scripts

Edite o arquivo `lib/scripts-data.ts` e adicione novos scripts no array `scriptsData`:

```typescript
{
  id: 'sec-XX',
  number: XX,
  title: 'Título do Script',
  category: 'categoria-id',
  targetRole: 'secretaria' | 'medico',
  keywords: ['palavra1', 'palavra2'],
  content: `Conteúdo do script aqui...`
}
```

## 🎯 Features

- ✅ Busca em tempo real
- ✅ Filtro por categoria
- ✅ Copiar com 1 clique
- ✅ Design responsivo
- ✅ Identidade visual MedGM
- ✅ 110+ scripts profissionais

## 📧 Contato

**MedGM** - Assessoria de Growth para Profissionais da Saúde
