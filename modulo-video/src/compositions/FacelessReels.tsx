import React from 'react';
import { Audio, Sequence, staticFile, useVideoConfig } from 'remotion';
import { KenBurnsScene } from '../components/KenBurnsScene';
import { InfographicCard } from '../components/InfographicCard';
import { Subtitles, WordToken } from '../components/Subtitles';
import { ColorGrade, ColorGradePreset } from '../components/ColorGrade';

export interface SceneItem {
  id: string;
  mediaUrl: string;
  isVideo?: boolean;
  startInSeconds: number;
  durationInSeconds: number;
  zoomDirection?: 'in' | 'out';
}

export interface InfographicItem {
  id: string;
  type: 'metric' | 'step' | 'alert' | 'quote';
  title: string;
  subtitle?: string;
  highlightValue?: string;
  startInSeconds: number;
  durationInSeconds: number;
}

export interface SfxItem {
  id: string;
  soundUrl: string;
  startInSeconds: number;
  volume?: number;
}

export interface FacelessReelsProps {
  voiceAudioUrl: string;
  backgroundMusicUrl?: string;
  musicVolume?: number;
  scenes: SceneItem[];
  infographics?: InfographicItem[];
  subtitlesWords: WordToken[];
  brandHighlightColor?: string;
  colorGradePreset?: ColorGradePreset;
  sfxTracks?: SfxItem[];
}

export const FacelessReels: React.FC<FacelessReelsProps> = ({
  voiceAudioUrl,
  backgroundMusicUrl,
  musicVolume = 0.12,
  scenes = [],
  infographics = [],
  subtitlesWords = [],
  brandHighlightColor = '#FFE600',
  colorGradePreset = 'dark-moody',
  sfxTracks = [],
}) => {
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#05070D',
        position: 'relative',
        width: '1080px',
        height: '1920px',
        overflow: 'hidden',
      }}
    >
      {/* 1. Trilha Sonora de Fundo */}
      {backgroundMusicUrl && (
        <Audio src={backgroundMusicUrl} volume={musicVolume} loop />
      )}

      {/* 2. Áudio Principal da Locução */}
      {voiceAudioUrl && <Audio src={voiceAudioUrl} volume={1.0} />}

      {/* 3. Efeitos Sonoros (SFX: Whoosh, Pop, Impact) */}
      {sfxTracks.map((sfx) => {
        const fromFrame = Math.round(sfx.startInSeconds * fps);
        return (
          <Sequence key={sfx.id} from={fromFrame} durationInFrames={Math.round(2 * fps)}>
            <Audio src={sfx.soundUrl} volume={sfx.volume ?? 0.6} />
          </Sequence>
        );
      })}

      {/* 4. Sequência de Cenas Cinematográficas com Color Grading & Ken Burns */}
      <ColorGrade preset={colorGradePreset} brandGlowColor={brandHighlightColor}>
        {scenes.map((scene) => {
          const fromFrame = Math.round(scene.startInSeconds * fps);
          const durationFrames = Math.round(scene.durationInSeconds * fps);

          return (
            <Sequence
              key={scene.id}
              from={fromFrame}
              durationInFrames={durationFrames}
            >
              <KenBurnsScene
                mediaUrl={scene.mediaUrl}
                isVideo={scene.isVideo}
                zoomDirection={scene.zoomDirection || 'in'}
                durationInFrames={durationFrames}
              />
            </Sequence>
          );
        })}
      </ColorGrade>

      {/* 5. Infográficos e Cards Animados Flutuantes */}
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

      {/* 6. Legendas Animadas com Karaokê em Alta Visibilidade */}
      <Subtitles
        words={subtitlesWords}
        highlightColor={brandHighlightColor}
      />
    </div>
  );
};
