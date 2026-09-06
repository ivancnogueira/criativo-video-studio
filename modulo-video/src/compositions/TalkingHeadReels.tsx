import React from 'react';
import { Audio, Sequence, Video, useCurrentFrame, useVideoConfig } from 'remotion';
import { ZoomContainer } from '../components/ZoomContainer';
import { InfographicCard } from '../components/InfographicCard';
import { Subtitles, WordToken } from '../components/Subtitles';
import { KenBurnsScene } from '../components/KenBurnsScene';

export interface BrollOverlay {
  id: string;
  mediaUrl: string;
  isVideo?: boolean;
  startInSeconds: number;
  durationInSeconds: number;
}

export interface TalkingHeadReelsProps {
  mainVideoUrl: string;
  backgroundMusicUrl?: string;
  musicVolume?: number;
  zoomMoments?: { startInSeconds: number; endInSeconds: number }[];
  brolls?: BrollOverlay[];
  infographics?: {
    id: string;
    type: 'metric' | 'step' | 'alert' | 'quote';
    title: string;
    subtitle?: string;
    highlightValue?: string;
    startInSeconds: number;
    durationInSeconds: number;
  }[];
  subtitlesWords: WordToken[];
  brandHighlightColor?: string;
}

export const TalkingHeadReels: React.FC<TalkingHeadReelsProps> = ({
  mainVideoUrl,
  backgroundMusicUrl,
  musicVolume = 0.08,
  zoomMoments = [],
  brolls = [],
  infographics = [],
  subtitlesWords = [],
  brandHighlightColor = '#00FF88',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Verifica se o momento atual tem zoom ativo
  const isZoomed = zoomMoments.some(
    (z) => currentTime >= z.startInSeconds && currentTime <= z.endInSeconds
  );

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#000000',
        position: 'relative',
        width: '1080px',
        height: '1920px',
        overflow: 'hidden',
      }}
    >
      {/* Trilha Sonora Sutil de Fundo */}
      {backgroundMusicUrl && (
        <Audio src={backgroundMusicUrl} volume={musicVolume} loop />
      )}

      {/* Vídeo Principal da Pessoa Falando com Zoom Dinâmico */}
      <ZoomContainer isZoomed={isZoomed}>
        <Video
          src={mainVideoUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </ZoomContainer>

      {/* Gradiente de contraste inferior suave */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '450px',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Overlays de B-Roll Cinematográficos (Pexels / IA) */}
      {brolls.map((broll) => {
        const fromFrame = Math.round(broll.startInSeconds * fps);
        const durationFrames = Math.round(broll.durationInSeconds * fps);

        return (
          <Sequence
            key={broll.id}
            from={fromFrame}
            durationInFrames={durationFrames}
          >
            <KenBurnsScene
              mediaUrl={broll.mediaUrl}
              isVideo={broll.isVideo}
              zoomDirection="in"
              durationInFrames={durationFrames}
            />
          </Sequence>
        );
      })}

      {/* Infográficos Animados em Glassmorphism */}
      {infographics.map((info) => {
        const fromFrame = Math.round(info.startInSeconds * fps);
        const durationFrames = Math.round(info.durationInSeconds * fps);

        return (
          <Sequence
            key={info.id}
            from={fromFrame}
            durationInFrames={durationFrames}
          >
            <InfographicCard
              type={info.type}
              title={info.title}
              subtitle={info.subtitle}
              highlightValue={info.highlightValue}
              brandColor={brandHighlightColor}
            />
          </Sequence>
        );
      })}

      {/* Legendas Animadas Karaokê */}
      <Subtitles
        words={subtitlesWords}
        highlightColor={brandHighlightColor}
      />
    </div>
  );
};
