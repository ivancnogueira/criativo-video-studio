/**
 * scripts/instalar-upgrade.mjs
 * Instalador NÃO-DESTRUTIVO do Upgrade de Vídeo (Criativo Video Studio).
 * Integra com segurança ao estúdio existente do usuário preservando 100% de seus dados e configurações pessoais.
 */
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const raizUpgrade = resolve(__dirname, '..');

// Função auxiliar para copiar diretórios recursivamente sem sobrescrever arquivos pessoais
async function copiarDiretorio(origem, destino, { apenasNovos = false } = {}) {
  await mkdir(destino, { recursive: true });
  const entradas = await readdir(origem, { withFileTypes: true });

  for (const entrada of entradas) {
    const src = join(origem, entrada.name);
    const dst = join(destino, entrada.name);

    if (entrada.isDirectory()) {
      if (entrada.name === 'node_modules' || entrada.name === '.git') continue;
      await copiarDiretorio(src, dst, { apenasNovos });
    } else {
      if (apenasNovos && existsSync(dst)) {
        // Preserva arquivo existente do usuário!
        continue;
      }
      await copyFile(src, dst);
    }
  }
}

export async function instalarUpgrade(caminhoStudioAlvo) {
  console.log('\n🚀 Iniciando Instalação Segura do UPGRADE: Criativo Video Studio...\n');

  const studioDir = resolve(caminhoStudioAlvo || process.cwd());

  // 1. Validar se é uma pasta válida do Criativo AI Studio
  const packageJsonPath = join(studioDir, 'package.json');
  if (!existsSync(packageJsonPath)) {
    throw new Error(`Pasta de estúdio inválida. Não foi encontrado package.json em: ${studioDir}`);
  }

  console.log(`📁 Estúdio Alvo Detectado: ${studioDir}`);

  // 2. Garantir criação das subpastas em conteudos/ e saidas/ sem apagar nada
  console.log('\n📦 [1/5] Estruturando pastas de mídia no estúdio...');
  const pastasCriar = [
    join(studioDir, 'conteudos', 'audios'),
    join(studioDir, 'conteudos', 'gravacoes'),
    join(studioDir, 'saidas', 'videos'),
  ];

  for (const p of pastasCriar) {
    await mkdir(p, { recursive: true });
    const keep = join(p, '.gitkeep');
    if (!existsSync(keep)) {
      await writeFile(keep, '');
    }
  }
  console.log('  ✅ Pastas conteudos/audios, conteudos/gravacoes e saidas/videos integradas!');

  // 3. Atualizar .env com novas variáveis sem sobrescrever as existentes
  console.log('\n🔑 [2/5] Verificando arquivo de ambiente .env...');
  const envPath = join(studioDir, '.env');
  const envExamplePath = join(studioDir, '.env.example');

  let envConteudo = existsSync(envPath) ? await readFile(envPath, 'utf8') : '';

  let atualizouEnv = false;
  if (!envConteudo.includes('GROQ_API_KEY')) {
    envConteudo += `\n\n# --- UPGRADE CRIATIVO VIDEO STUDIO ---\n`;
    envConteudo += `GROQ_API_KEY=\n`;
    envConteudo += `PEXELS_API_KEY=\n`;
    atualizouEnv = true;
  }

  if (atualizouEnv) {
    await writeFile(envPath, envConteudo.trim() + '\n', 'utf8');
    console.log('  ✅ Novas variáveis (GROQ_API_KEY, PEXELS_API_KEY) adicionadas ao .env com segurança!');
  } else {
    console.log('  ℹ️  Variáveis de vídeo já estavam presentes no .env. Nada alterado.');
  }

  // 4. Copiar o motor Remotion para dentro do studio (video/)
  console.log('\n🎬 [3/5] Integrando motor de vídeo Remotion...');
  const origemVideo = join(raizUpgrade, 'modulo-video');
  const destinoVideo = join(studioDir, 'video');

  await copiarDiretorio(origemVideo, destinoVideo);
  console.log('  ✅ Motor de vídeo Remotion integrado em /video!');

  // 5. Merge inteligente de scripts no package.json
  console.log('\n⚙️ [4/5] Registrando scripts de automação no package.json...');
  const pkgContent = JSON.parse(await readFile(packageJsonPath, 'utf8'));
  pkgContent.scripts = pkgContent.scripts || {};

  const novosScripts = {
    'video:preview': 'cd video ; npm run preview',
    'video:render': 'cd video ; npm run render',
    'video:transcrever': 'cd video ; npm run transcrever',
  };

  let scriptsAdicionados = 0;
  for (const [scriptName, scriptCmd] of Object.entries(novosScripts)) {
    if (!pkgContent.scripts[scriptName]) {
      pkgContent.scripts[scriptName] = scriptCmd;
      scriptsAdicionados++;
    }
  }

  await writeFile(packageJsonPath, JSON.stringify(pkgContent, null, 2) + '\n', 'utf8');
  console.log(`  ✅ ${scriptsAdicionados} novos scripts adicionados ao package.json sem alterar seus scripts originais!`);

  // 6. Instalar a nova Skill do Antigravity (Local e Global)
  console.log('\n🧠 [5/5] Registrando a Skill /criar-video-reels...');
  const skillOrigem = join(raizUpgrade, 'skill', 'criar-video-reels');
  const skillLocalDestino = join(studioDir, '.agents', 'skills', 'criar-video-reels');
  const skillGlobalDestino = join(homedir(), '.gemini', 'config', 'skills', 'criar-video-reels');

  await copiarDiretorio(skillOrigem, skillLocalDestino);
  console.log('  ✅ Skill instalada localmente em .agents/skills/criar-video-reels');

  try {
    await copiarDiretorio(skillOrigem, skillGlobalDestino);
    console.log('  ✅ Comando /criar-video-reels habilitado globalmente no Antigravity IDE!');
  } catch (err) {
    console.log('  ℹ️  Aviso: Não foi possível copiar para a pasta global, mas a skill local está ativa.');
  }

  console.log('\n========================================================');
  console.log('🎉 UPGRADE CRIATIVO VIDEO STUDIO INSTALADO COM SUCESSO!');
  console.log('========================================================');
  console.log('\nComo usar agora:');
  console.log('1. Jogue seu áudio em: conteudos/audios/ (ou gravação em conteudos/gravacoes/)');
  console.log('2. No chat do Antigravity, envie o comando: /criar-video-reels');
  console.log('3. O agente fará a transcrição, direção cinematográfica e montagem do seu Reels!\n');
}

// Execução direta
if (process.argv[1] && process.argv[1].endsWith('instalar-upgrade.mjs')) {
  const alvo = process.argv[2] || process.cwd();
  instalarUpgrade(alvo).catch((err) => {
    console.error('❌ Erro durante a instalação:', err.message);
    process.exit(1);
  });
}
