/**
 * automacoes/transcrever.mjs
 * Transcreve áudio com timestamps palavra por palavra usando Groq Cloud Whisper (ou OpenAI Whisper).
 * Retorna JSON com o texto e o array de tokens { word, start, end }.
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, extname } from 'node:path';

export async function transcreverAudio(caminhoArquivo, apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY) {
  if (!existsSync(caminhoArquivo)) {
    throw new Error(`Arquivo de áudio não encontrado: ${caminhoArquivo}`);
  }

  const isGroq = process.env.GROQ_API_KEY ? true : false;
  const endpoint = isGroq
    ? 'https://api.groq.com/openai/v1/audio/transcriptions'
    : 'https://api.openai.com/v1/audio/transcriptions';

  const model = isGroq ? 'whisper-large-v3' : 'whisper-1';

  // Se não houver chave de API configurada, retornamos uma transcrição guiada de teste
  if (!apiKey) {
    console.warn('\n⚠️ [AVISO] Nenhuma GROQ_API_KEY ou OPENAI_API_KEY encontrada no .env.');
    console.warn('⚡ Dica: Crie uma chave gratuita em https://console.groq.com e adicione GROQ_API_KEY no seu .env para transcrição real em 1 segundo.');
    console.log('🔄 Gerando transcrição demonstrativa com timestamps para validação...\n');

    return {
      texto: "Se você quer criar vídeos de alta retenção no Instagram sem perder horas editando, este agente faz tudo por você.",
      words: [
        { word: "SE", start: 0.2, end: 0.5 },
        { word: "VOCÊ", start: 0.5, end: 0.8 },
        { word: "QUER", start: 0.8, end: 1.1 },
        { word: "CRIAR", start: 1.1, end: 1.5 },
        { word: "VÍDEOS", start: 1.5, end: 2.0 },
        { word: "DE", start: 2.0, end: 2.2 },
        { word: "ALTA", start: 2.2, end: 2.6 },
        { word: "RETENÇÃO", start: 2.6, end: 3.3 },
        { word: "NO", start: 3.4, end: 3.6 },
        { word: "INSTAGRAM", start: 3.6, end: 4.3 },
        { word: "ESTE", start: 4.4, end: 4.8 },
        { word: "AGENTE", start: 4.8, end: 5.3 },
        { word: "FAZ", start: 5.3, end: 5.6 },
        { word: "TUDO", start: 5.6, end: 6.0 },
        { word: "POR", start: 6.0, end: 6.2 },
        { word: "VOCÊ", start: 6.2, end: 6.8 }
      ],
      duracaoTotal: 7.2
    };
  }

  const buffer = await readFile(caminhoArquivo);
  const blob = new Blob([buffer], { type: 'audio/mpeg' });
  const formData = new FormData();
  formData.append('file', blob, basename(caminhoArquivo));
  formData.append('model', model);
  formData.append('response_format', 'verbose_json');
  formData.append('timestamp_granularities[]', 'word');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const erroTexto = await response.text();
    throw new Error(`Falha na API de Transcrição (${response.status}): ${erroTexto}`);
  }

  const data = await response.json();
  const words = (data.words || []).map((w) => ({
    word: w.word.trim().toUpperCase(),
    start: Number(w.start),
    end: Number(w.end),
  }));

  return {
    texto: data.text,
    words,
    duracaoTotal: data.duration || (words.length ? words[words.length - 1].end : 0),
  };
}

if (process.argv[1] && process.argv[1].endsWith('transcrever.mjs')) {
  const arquivo = process.argv[2];
  if (!arquivo) {
    console.log('Uso: node transcrever.mjs <caminho-do-audio>');
    process.exit(1);
  }
  transcreverAudio(arquivo)
    .then((res) => console.log(JSON.stringify(res, null, 2)))
    .catch((err) => {
      console.error('Erro na transcrição:', err.message);
      process.exit(1);
    });
}
