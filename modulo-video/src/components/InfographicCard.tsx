import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface InfographicProps {
  type: 'metric' | 'step' | 'alert' | 'quote';
  title: string;
  subtitle?: string;
  highlightValue?: string;
  brandColor?: string; // Cor primária da marca
  secondaryColor?: string;
  position?: 'top' | 'center' | 'bottom';
}

export const InfographicCard: React.FC<InfographicProps> = ({
  type = 'metric',
  title,
  subtitle,
  highlightValue,
  brandColor = '#6366F1',
  secondaryColor = '#EC4899',
  position = 'center',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animação de entrada com física de mola (Spring) hiper suave
  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.6,
    },
  });

  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [40, 0]);

  let topOffset = '35%';
  if (position === 'top') topOffset = '18%';
  if (position === 'bottom') topOffset = '55%';

  return (
    <div
      style={{
        position: 'absolute',
        top: topOffset,
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px) scale(${scale})`,
        opacity,
        zIndex: 80,
        width: '85%',
        maxWidth: '880px',
        padding: '36px 42px',
        background: 'rgba(15, 18, 28, 0.78)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '28px',
        border: `2px solid rgba(255, 255, 255, 0.18)`,
        boxShadow: `0 24px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 0 40px ${brandColor}33`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '16px',
        pointerEvents: 'none',
      }}
    >
      {/* Badge ou Tipo */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 18px',
          borderRadius: '999px',
          background: `linear-gradient(135deg, ${brandColor}40, ${secondaryColor}30)`,
          border: `1px solid ${brandColor}80`,
          color: '#FFFFFF',
          fontSize: '22px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}
      >
        {type === 'metric' && '📊 Insight'}
        {type === 'step' && '⚡ Próximo Passo'}
        {type === 'alert' && '⚠️ Atenção'}
        {type === 'quote' && '💡 Visão'}
      </div>

      {/* Valor em destaque (ex: 300%, R$ 100k, 10x) */}
      {highlightValue && (
        <div
          style={{
            fontSize: '84px',
            fontWeight: 900,
            lineHeight: 1,
            background: `linear-gradient(135deg, #FFFFFF 20%, ${brandColor} 80%, ${secondaryColor} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-2px',
            margin: '8px 0',
            filter: `drop-shadow(0 4px 20px ${brandColor}66)`,
          }}
        >
          {highlightValue}
        </div>
      )}

      {/* Título Principal */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '36px',
          fontWeight: 800,
          color: '#FFFFFF',
          lineHeight: 1.25,
          textShadow: '0 2px 10px rgba(0,0,0,0.6)',
        }}
      >
        {title}
      </div>

      {/* Subtítulo ou Descrição */}
      {subtitle && (
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '24px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
