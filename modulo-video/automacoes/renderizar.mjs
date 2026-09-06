/**
 * automacoes/renderizar.mjs
 * Orquestra a renderização em alta definição (1080x1920) via CLI do Remotion.
 * Uso: node automacoes/renderizar.mjs --timeline timeline.json --saida saidas/videos/meu-reels.mp4
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const raizModulo = resolve(__dirname, '..');

export async function renderizarVideo({
  composicaoId = 'FacelessReels',
  propsJsonPath,
  propsObject,
  caminhoSaida,
}) {
  let propsString = '';
  if (propsJsonPath && existsSync(propsJsonPath)) {
    const conteudo = await readFile(propsJsonPath, 'utf8');
    propsString = `--props='${conteudo.replace(/'/g, "\\'")}'`;
  } else if (propsObject) {
    propsString = `--props='${JSON.stringify(propsObject).replace(/'/g, "\\'")}'`;
  }

  const comando = `npx remotion render src/Root.tsx ${composicaoId} "${caminhoSaida}" ${propsString} --log=info`;

  console.log(`\n🎬 Iniciando renderização cinematográfica do Remotion...`);
  console.log(`Composição: ${composicaoId}`);
  console.log(`Destino: ${caminhoSaida}\n`);

  try {
    execSync(comando, {
      cwd: raizModulo,
      stdio: 'inherit',
    });
    console.log(`\n✅ Vídeo renderizado com sucesso: ${caminhoSaida}`);
    return { sucesso: true, caminho: caminhoSaida };
  } catch (error) {
    console.error(`\n❌ Falha na renderização:`, error.message);
    throw error;
  }
}

// Execução direta via terminal
if (process.argv[1] && process.argv[1].endsWith('renderizar.mjs')) {
  const args = process.argv.slice(2);
  const composicao = args.includes('--talking-head') ? 'TalkingHeadReels' : 'FacelessReels';
  const saidaIdx = args.indexOf('--saida');
  const propsIdx = args.indexOf('--props');

  const caminhoSaida = saidaIdx !== -1 ? args[saidaIdx + 1] : resolve(raizModulo, '../../saidas/videos/reels-final.mp4');
  const propsPath = propsIdx !== -1 ? args[propsIdx + 1] : null;

  renderizarVideo({
    composicaoId: composicao,
    propsJsonPath: propsPath,
    caminhoSaida,
  }).catch((err) => {
    process.exit(1);
  });
}
