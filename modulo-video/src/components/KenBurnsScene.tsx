import React from 'react';
import { Img, Video, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export interface SceneProps {
  mediaUrl: string;
  isVideo?: boolean;
  zoomDirection?: 'in' | 'out';
  durationInFrames: number;
}

export const KenBurnsScene: React.FC<SceneProps> = ({
  mediaUrl,
  isVideo = false,
  zoomDirection = 'in',
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  // Interpolação suave do efeito Ken Burns
  const startScale = zoomDirection === 'in' ? 1.0 : 1.15;
  const endScale = zoomDirection === 'in' ? 1.18 : 1.0;

  const scale = interpolate(frame, [0, durationInFrames], [startScale, endScale], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#05070D',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.05s linear',
        }}
      >
        {isVideo ? (
          <Video
            src={mediaUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            muted
          />
        ) : (
          <Img
            src={mediaUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </div>

      {/* Vinheta de Cinema e Gradiente Inferior para Legibilidade das Legendas */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.55) 100%), linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 35%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
