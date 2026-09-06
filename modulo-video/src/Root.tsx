import React from 'react';
import { Composition } from 'remotion';
import { FacelessReels } from './compositions/FacelessReels';
import { TalkingHeadReels } from './compositions/TalkingHeadReels';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Composição de Vídeos 100% Faceless (a partir de áudio) */}
      <Composition
        id="FacelessReels"
        component={FacelessReels}
        durationInFrames={30 * 15} // Exemplo de 15 segundos a 30 FPS
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          voiceAudioUrl: '',
          backgroundMusicUrl: '',
          musicVolume: 0.12,
          scenes: [
            {
              id: 'c1',
              mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&q=80',
              startInSeconds: 0,
              durationInSeconds: 5,
              zoomDirection: 'in',
            },
            {
              id: 'c2',
              mediaUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1080&q=80',
              startInSeconds: 5,
              durationInSeconds: 5,
              zoomDirection: 'out',
            },
            {
              id: 'c3',
              mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&q=80',
              startInSeconds: 10,
              durationInSeconds: 5,
              zoomDirection: 'in',
            },
          ],
          infographics: [
            {
              id: 'i1',
              type: 'metric',
              title: 'Crescimento de Alcance',
              subtitle: 'Com vídeos verticais automatizados',
              highlightValue: '+340%',
              startInSeconds: 2,
              durationInSeconds: 4,
            },
          ],
          subtitlesWords: [
            { word: 'SE', start: 0.2, end: 0.5 },
            { word: 'VOCÊ', start: 0.5, end: 0.9 },
            { word: 'QUER', start: 0.9, end: 1.3 },
            { word: 'ESCALAR', start: 1.3, end: 1.8 },
            { word: 'SEU', start: 1.8, end: 2.1 },
            { word: 'INSTAGRAM', start: 2.1, end: 2.7 },
            { word: 'PRECISA', start: 2.8, end: 3.2 },
            { word: 'CRIAR', start: 3.2, end: 3.6 },
            { word: 'VÍDEOS', start: 3.6, end: 4.1 },
            { word: 'DE', start: 4.1, end: 4.3 },
            { word: 'ALTA', start: 4.3, end: 4.7 },
            { word: 'RETENÇÃO', start: 4.7, end: 5.4 },
          ],
          brandHighlightColor: '#FFE600',
        }}
      />

      {/* 2. Composição de Edição Talking Head (a partir de vídeo gravado) */}
      <Composition
        id="TalkingHeadReels"
        component={TalkingHeadReels}
        durationInFrames={30 * 15}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          mainVideoUrl: '',
          backgroundMusicUrl: '',
          musicVolume: 0.08,
          zoomMoments: [
            { startInSeconds: 0, endInSeconds: 2.5 },
            { startInSeconds: 6, endInSeconds: 9 },
          ],
          brolls: [],
          infographics: [
            {
              id: 'step1',
              type: 'step',
              title: 'Grave apenas o seu áudio',
              subtitle: 'O agente faz todo o trabalho duro de edição',
              startInSeconds: 3,
              durationInSeconds: 4,
            },
          ],
          subtitlesWords: [
            { word: 'ESTE', start: 0.2, end: 0.6 },
            { word: 'É', start: 0.6, end: 0.8 },
            { word: 'O', start: 0.8, end: 1.0 },
            { word: 'FUTURO', start: 1.0, end: 1.5 },
            { word: 'DA', start: 1.5, end: 1.8 },
            { word: 'CRIAÇÃO', start: 1.8, end: 2.4 },
          ],
          brandHighlightColor: '#00FF88',
        }}
      />
    </>
  );
};
