import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export interface WordToken {
  word: string;
  start: number; // segundos
  end: number;   // segundos
}

export interface SubtitlesProps {
  words: WordToken[];
  highlightColor?: string; // Cor de destaque da marca (ex: #FFE600 ou #00FF88)
  textColor?: string;
  fontSize?: number;
}

export const Subtitles: React.FC<SubtitlesProps> = ({
  words = [],
  highlightColor = '#FFE600',
  textColor = '#FFFFFF',
  fontSize = 62,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Encontrar o bloco de palavras ativo (janela de 3 a 5 palavras para não poluir a tela)
  const activeWordIndex = words.findIndex(
    (w) => currentTime >= w.start && currentTime <= w.end
  );

  if (activeWordIndex === -1 && words.length > 0) {
    // Se estiver entre palavras, pega a mais recente se a pausa for pequena
    const lastWord = words.findLast((w) => currentTime >= w.end);
    if (!lastWord || currentTime - lastWord.end > 0.6) {
      return null;
    }
  }

  // Agrupa em janelas de exibição curtas (ex: 4 palavras de cada vez)
  const currentIdx = activeWordIndex !== -1 ? activeWordIndex : 0;
  const windowSize = 4;
  const windowStart = Math.floor(currentIdx / windowSize) * windowSize;
  const currentChunk = words.slice(windowStart, windowStart + windowSize);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '220px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '14px',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      {currentChunk.map((item, idx) => {
        const isCurrent = currentTime >= item.start && currentTime <= item.end;

        // Animação pop elástica quando a palavra é dita
        const scale = isCurrent ? 1.15 : 1.0;
        const color = isCurrent ? highlightColor : textColor;

        return (
          <span
            key={idx}
            style={{
              fontFamily: "'Montserrat', 'Inter', 'Arial Black', sans-serif",
              fontSize: `${fontSize}px`,
              fontWeight: 900,
              textTransform: 'uppercase',
              color: color,
              transform: `scale(${scale})`,
              transition: 'transform 0.08s ease-out, color 0.08s ease-out',
              textShadow:
                '0 4px 18px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.9), 0 0 1px #000',
              letterSpacing: '1px',
              padding: '4px 8px',
              borderRadius: '8px',
              backgroundColor: isCurrent ? 'rgba(0, 0, 0, 0.45)' : 'transparent',
              backdropFilter: isCurrent ? 'blur(4px)' : 'none',
              display: 'inline-block',
            }}
          >
            {item.word}
          </span>
        );
      })}
    </div>
  );
};
