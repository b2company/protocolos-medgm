# 🚀 Guia de Deploy - Protocolos MedGM

## ✅ Projeto Pronto!

O aplicativo está rodando localmente em: **http://localhost:3000**

## 📋 Próximos Passos

### 1. Testar Localmente

```bash
cd ~/protocolos-medgm
npm run dev
```

Acesse http://localhost:3000 e teste:
- ✅ Busca de scripts
- ✅ Filtro por categoria
- ✅ Copiar scripts com 1 clique
- ✅ Navegação entre Secretárias e Médicos

### 2. Preparar para Deploy

#### 2.1. Adicionar todos os scripts

Edite `lib/scripts-data.ts` e adicione os 110 scripts. Use este formato:

```typescript
{
  id: 'sec-XX',
  number: XX,
  title: 'Título do Script',
  category: 'categoria-id', // Veja categorias em scripts-data.ts
  targetRole: 'secretaria' | 'medico',
  keywords: ['palavra1', 'palavra2', 'palavra3'],
  content: `Conteúdo completo do script aqui...`
}
```

#### 2.2. Criar repositório no GitHub

```bash
cd ~/protocolos-medgm
git init
git add .
git commit -m "Initial commit: Protocolos de Conversão MedGM"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/protocolos-medgm.git
git push -u origin main
```

### 3. Deploy no Vercel (GRÁTIS)

#### Opção A: Via Interface (Recomendado)

1. Acesse https://vercel.com
2. Faça login com GitHub
3. Clique em **"New Project"**
4. Selecione o repositório `protocolos-medgm`
5. Vercel detecta Next.js automaticamente
6. Clique em **"Deploy"**
7. ✅ Pronto! Seu app está no ar

#### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd ~/protocolos-medgm
vercel

# Deploy em produção
vercel --prod
```

### 4. Configurar Domínio Customizado (Opcional)

No Vercel Dashboard:
1. Abra seu projeto
2. Settings → Domains
3. Adicione: `scripts.medgm.com.br`
4. Configure DNS conforme instruções

### 5. Adicionar Analytics (Opcional)

No Vercel Dashboard:
1. Settings → Analytics
2. Ativar Web Analytics (grátis)
3. Ver quantas pessoas usam cada script

## 🎨 Customizações Futuras

### Adicionar Autenticação

```bash
npm install next-auth
```

### Adicionar Banco de Dados

```bash
npm install @vercel/postgres
```

### Rastrear Uso dos Scripts

Adicione código no componente `ScriptCard` para enviar eventos quando scripts são copiados.

## 📊 Estrutura de Pastas

```
protocolos-medgm/
├── app/
│   ├── layout.tsx          # Layout com fonte Inter
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globais
├── components/
│   ├── script-card.tsx     # Card de script com botão copiar
│   ├── search-bar.tsx      # Busca em tempo real
│   └── category-filter.tsx # Filtro de categorias
├── lib/
│   ├── scripts-data.ts     # ADICIONE OS 110 SCRIPTS AQUI
│   └── utils.ts            # Utilitários
└── tailwind.config.ts      # Cores da MedGM
```

## 🎯 Checklist de Lançamento

- [ ] Adicionar todos os 110 scripts em `lib/scripts-data.ts`
- [ ] Testar busca com palavras-chave
- [ ] Testar em mobile (design responsivo)
- [ ] Criar repositório GitHub
- [ ] Deploy no Vercel
- [ ] Configurar domínio (scripts.medgm.com.br)
- [ ] Adicionar analytics
- [ ] Testar com clientes da MedGM

## 💡 Ideias de Features Futuras

### MVP+
- [ ] Favoritar scripts mais usados
- [ ] Histórico de scripts copiados
- [ ] Busca com IA (tipo: "como responder paciente que pediu desconto?")
- [ ] Personalização automática ([Nome do Médico] → Dr. João Silva)

### Versão Pro
- [ ] Login com email
- [ ] Dashboard de uso por clínica
- [ ] Scripts customizados por especialidade
- [ ] Exportar scripts para PDF
- [ ] Integração com WhatsApp Web

## 🆘 Problemas Comuns

### Erro de build no Vercel
```bash
# Localmente, rode:
npm run build
# Se funcionar aqui, vai funcionar no Vercel
```

### Scripts não aparecem
Verifique `lib/scripts-data.ts`:
- Array `scriptsData` está preenchido?
- Categorias estão corretas?
- `targetRole` está definido?

### Fonte não carrega
A fonte Inter (do Google Fonts) está sendo usada como alternativa à Gilroy.
Para usar Gilroy, adicione os arquivos .woff2 em `public/fonts/`.

## 📞 Suporte

Para dúvidas sobre o código:
1. Verifique este arquivo (DEPLOY.md)
2. Leia o README.md
3. Consulte https://nextjs.org/docs

---

**Feito com ❤️ para MedGM**
