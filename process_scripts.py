#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
import re
from pathlib import Path

# Diretório base
BASE_DIR = "/Users/odavi.feitosa/Desktop/Private & Shared/Protocolos de Conversão"

# Mapeamento de categorias para scripts de secretárias
CATEGORIAS_SECRETARIA = {
    range(1, 12): "conversao-agendamento",
    range(12, 20): "confirmacao-reagendamento",
    range(20, 27): "orientacoes",
    range(27, 35): "valores-pagamento",
    range(35, 40): "transicao-convenio",
    range(40, 47): "relacionamento",
    range(47, 59): "scripts-especificos"
}

# Mapeamento de categorias para scripts de médicos
CATEGORIAS_MEDICO = {
    "gestao-consultas": [1, 9, 10, 26, 29, 30, 33, 36, 44, 46],
    "limites-comunicacao": [3, 4, 6, 12, 35, 37, 38, 40, 41, 42, 43],
    "cobranca-preco": [14, 15, 16, 20, 21, 22, 23, 34, 45, 47, 49],
    "receitas-exames": [5, 7, 37, 38, 40],
    "redes-sociais": [11, 16, 39, 48],
    "venda-procedimentos": [8, 13, 24, 25],
    "relacionamento-pos": [17, 31, 32],
    "situacoes-delicadas": [18, 19, 27, 28],
    "consultas-domiciliares": [49, 50],
    "comunicacao-institucional": [2, 29, 30, 46]
}

def get_categoria_secretaria(numero):
    """Retorna a categoria baseada no número do script de secretária"""
    for faixa, categoria in CATEGORIAS_SECRETARIA.items():
        if numero in faixa:
            return categoria
    return "outros"

def get_categoria_medico(numero):
    """Retorna a categoria baseada no número do script de médico"""
    for categoria, numeros in CATEGORIAS_MEDICO.items():
        if numero in numeros:
            return categoria
    return "outros"

def extract_script_number(filename):
    """Extrai o número do script do nome do arquivo"""
    match = re.search(r'SCRIPT (\d+)', filename)
    if match:
        return int(match.group(1))
    return None

def extract_title(filename):
    """Extrai o título do script do nome do arquivo"""
    # Remove o hash no final
    filename = re.sub(r'\s+[a-f0-9]{32}\.md$', '', filename)
    # Pega tudo depois de "SCRIPT XX —"
    match = re.search(r'SCRIPT \d+ — (.+?)$', filename)
    if match:
        return match.group(1).strip()
    return ""

def read_script_content(filepath):
    """Lê o conteúdo do arquivo de script"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read().strip()
            # Remove o título se ele estiver duplicado no início do arquivo
            lines = content.split('\n')
            if lines and lines[0].startswith('#'):
                # Remove a primeira linha se for título
                content = '\n'.join(lines[1:]).strip()
            return content
    except Exception as e:
        print(f"Erro ao ler {filepath}: {e}")
        return ""

def process_scripts():
    """Processa todos os scripts e gera o JSON"""
    scripts = []

    # 1. Scripts para Secretárias
    sec_dir = os.path.join(BASE_DIR, "Script para Secretárias")
    if os.path.exists(sec_dir):
        for filename in os.listdir(sec_dir):
            if filename.startswith('SCRIPT') and filename.endswith('.md'):
                filepath = os.path.join(sec_dir, filename)
                numero = extract_script_number(filename)
                if numero:
                    scripts.append({
                        "id": f"sec-{numero:02d}",
                        "number": numero,
                        "title": extract_title(filename),
                        "category": get_categoria_secretaria(numero),
                        "targetRole": "secretaria",
                        "content": read_script_content(filepath)
                    })

    # 2. Scripts para Médicos
    med_dir = os.path.join(BASE_DIR, "Scripts para Médicos")
    if os.path.exists(med_dir):
        for filename in os.listdir(med_dir):
            if filename.startswith('SCRIPT') and filename.endswith('.md'):
                filepath = os.path.join(med_dir, filename)
                numero = extract_script_number(filename)
                if numero:
                    scripts.append({
                        "id": f"med-{numero:02d}",
                        "number": numero,
                        "title": extract_title(filename),
                        "category": get_categoria_medico(numero),
                        "targetRole": "medico",
                        "content": read_script_content(filepath)
                    })

    # 3. Scripts para Instagram (Bônus)
    insta_dir = os.path.join(BASE_DIR, "Bônus - Scripts para o Instagram")
    if os.path.exists(insta_dir):
        for filename in os.listdir(insta_dir):
            if filename.startswith('SCRIPT') and filename.endswith('.md'):
                filepath = os.path.join(insta_dir, filename)
                numero = extract_script_number(filename)
                if numero:
                    scripts.append({
                        "id": f"insta-{numero:02d}",
                        "number": numero,
                        "title": extract_title(filename),
                        "category": "instagram",
                        "targetRole": "ambos",
                        "content": read_script_content(filepath)
                    })

    # 4. Mensagens de Reativação
    reativacao_file = os.path.join(BASE_DIR, "Bônus – 10 mensagens prontos para reativar pacient 2fbf811fb47480ae971cea9b797b2f47.md")
    if os.path.exists(reativacao_file):
        content = read_script_content(reativacao_file)
        scripts.append({
            "id": "reativacao-01",
            "number": 1,
            "title": "10 mensagens prontas para reativar pacientes",
            "category": "reativacao",
            "targetRole": "ambos",
            "content": content
        })

    # Ordenar scripts por targetRole e número
    scripts.sort(key=lambda x: (x['targetRole'], x['number']))

    return scripts

def main():
    print("Processando scripts...")
    scripts = process_scripts()

    # Estatísticas
    total = len(scripts)
    sec_count = len([s for s in scripts if s['targetRole'] == 'secretaria'])
    med_count = len([s for s in scripts if s['targetRole'] == 'medico'])
    insta_count = len([s for s in scripts if s['targetRole'] == 'ambos'])

    print(f"\n📊 Estatísticas:")
    print(f"   Total de scripts: {total}")
    print(f"   - Secretárias: {sec_count}")
    print(f"   - Médicos: {med_count}")
    print(f"   - Instagram/Ambos: {insta_count}")

    # Salvar JSON
    output_path = "/Users/odavi.feitosa/protocolos-medgm/scripts-full.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(scripts, f, ensure_ascii=False, indent=2)

    print(f"\n✅ JSON gerado com sucesso em: {output_path}")
    print(f"   Tamanho do arquivo: {os.path.getsize(output_path) / 1024:.2f} KB")

if __name__ == "__main__":
    main()
