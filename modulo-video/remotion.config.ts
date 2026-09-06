import { Config } from '@remotion/cli/config';

// Configurações globais de renderização em alta definição (1080x1920 9:16)
Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setCrf(18); // Alta qualidade visual
Config.setPixelFormat('yuv420p');
