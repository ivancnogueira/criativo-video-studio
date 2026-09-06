/**
 * automacoes/buscar-stock.mjs
 * Busca e baixa clipes de B-Roll verticais (9:16) em alta definição via Pexels API (gratuita).
 */
import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

export async function buscarVideosPexels(query, { apiKey = process.env.PEXELS_API_KEY, perPage = 3 } = {}) {
  if (!apiKey) {
    console.warn('⚠️ [AVISO] Nenhuma PEXELS_API_KEY configurada. Retornando URLs públicas demonstrativas.');
    return [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&q=80',
        isVideo: false,
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1080&q=80',
        isVideo: false,
      }
    ];
  }

  const endpoint = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&orientation=portrait&per_page=${perPage}`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Falha na API Pexels (${response.status}): ${await response.text()}`);
  }

  const data = await response.json();
  const resultados = [];

  for (const video of data.videos || []) {
    // Escolhe arquivo com boa resolução (HD vertical)
    const arquivoVideo = video.video_files.find(
      (f) => f.quality === 'hd' && f.width <= 1080 && f.height >= 1920
    ) || video.video_files[0];

    if (arquivoVideo) {
      resultados.push({
        id: video.id,
        duration: video.duration,
        url: arquivoVideo.link,
        thumbnail: video.image,
        isVideo: true,
      });
    }
  }

  return resultados;
}

export async function baixarArquivo(url, destino) {
  await mkdir(dirname(destino), { recursive: true });
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Falha ao baixar arquivo: ${response.statusText}`);
  }
  const stream = createWriteStream(destino);
  await pipeline(Readable.fromWeb(response.body), stream);
  return destino;
}
