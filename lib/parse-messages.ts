// Função para separar um script em mensagens individuais
export interface ParsedMessage {
  scriptId: string;
  scriptNumber: number;
  scriptTitle: string;
  messageNumber: number;
  messageTitle: string;
  messageContent: string;
  category: string;
  targetRole: string;
}

export function parseScriptMessages(script: any): ParsedMessage[] {
  const messages: ParsedMessage[] = [];
  const content = script.content;

  // Padrões para identificar mensagens separadas
  const patterns = [
    /###\s*💬\s*\*\*Mensagem\s+(\d+)[^\n]*\*\*\n\n([^#]+?)(?=###|$)/gs,
    /\*\*Mensagem\s+(\d+)[^\n]*\*\*\n\n([^*]+?)(?=\*\*Mensagem|\*\*Etapa|---|$)/gs,
    /\*\*Etapa\s+(\d+)[^\n]*\*\*\n\n([^*]+?)(?=\*\*Etapa|---|$)/gs,
    /\*\*Mensagem direta:\*\*\n\n([^#-]+?)(?=---|###|$)/gs,
  ];

  let foundMessages = false;

  // Tenta cada padrão
  for (const pattern of patterns) {
    const matches = Array.from(content.matchAll(pattern));

    if (matches.length > 0) {
      foundMessages = true;
      matches.forEach((match, index) => {
        const messageNumber = match[1] ? parseInt(match[1]) : index + 1;
        let messageContent = match[2] || match[1];

        // Extrai o título da mensagem (primeira linha ou contexto)
        const lines = messageContent.trim().split('\n');
        const firstLine = lines[0].replace(/^[-•]\s*/, '').trim();
        const messageTitle = firstLine.length > 50
          ? firstLine.substring(0, 50) + '...'
          : firstLine;

        messages.push({
          scriptId: script.id,
          scriptNumber: script.number,
          scriptTitle: script.title,
          messageNumber,
          messageTitle,
          messageContent: cleanMessageForWhatsApp(messageContent),
          category: script.category,
          targetRole: script.targetRole,
        });
      });
      break;
    }
  }

  // Se não encontrou mensagens separadas, retorna o script inteiro como uma mensagem
  if (!foundMessages) {
    // Remove cabeçalhos e notas de uso interno
    let cleanContent = content
      .replace(/###\s*🗂️[^\n]+\n/g, '')
      .replace(/---+\n/g, '')
      .replace(/📌\s*\*\*Notas para uso interno:\*\*[\s\S]*$/g, '')
      .replace(/##\s*📝[^\n]+[\s\S]*$/g, '')
      .trim();

    messages.push({
      scriptId: script.id,
      scriptNumber: script.number,
      scriptTitle: script.title,
      messageNumber: 1,
      messageTitle: script.title,
      messageContent: cleanMessageForWhatsApp(cleanContent),
      category: script.category,
      targetRole: script.targetRole,
    });
  }

  return messages;
}

// Limpa markdown e formata para WhatsApp (determinístico)
function cleanMessageForWhatsApp(text: string): string {
  if (!text) return '';

  let clean = text
    // Remove headers markdown
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove dividers
    .replace(/^[-_]{3,}$/gm, '')
    // Remove bullet points markdown
    .replace(/^[*+-]\s+/gm, '')
    // Remove links markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove linhas com apenas emojis/símbolos
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      // Remove linhas que são apenas emojis ou notas internas
      if (!trimmed) return true;
      if (trimmed.match(/^[🗂️📌💡✅❌⚠️🕓📆⏳🪄💬]\s*$/)) return false;
      if (trimmed.startsWith('Salvar como')) return false;
      if (trimmed.startsWith('Ideal para')) return false;
      if (trimmed.startsWith('Pode ser')) return false;
      if (trimmed.startsWith('Evita')) return false;
      if (trimmed.startsWith('Use')) return false;
      return true;
    })
    .join('\n')
    // Remove espaços extras
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return clean;
}

export function getAllMessages(scripts: any[]): ParsedMessage[] {
  return scripts.flatMap(script => parseScriptMessages(script));
}
