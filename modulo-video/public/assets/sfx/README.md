# Biblioteca de Efeitos Sonoros (SFX) para Vídeos de Alta Retenção

Os arquivos de áudio (.mp3 ou .wav) colocados nesta pasta podem ser referenciados diretamente nas timelines de edição:

## Sons Padrão Recomendados:
1. `whoosh.mp3`: Som de vento/ar rápido para transições de cena e virada de câmera.
2. `pop.mp3`: Som elástico de "pop" para entrada de infográficos, badges e números gigantes.
3. `impact.mp3`: Batida grave de cinema (*bass drop*) para os primeiros 2 segundos do gancho.
4. `click.mp3`: Clique mecânico sutil para destaques de texto e CTAs.

Para referenciar no JSON de timeline do Remotion:
```json
{
  "sfxTracks": [
    { "id": "sfx-1", "soundUrl": "assets/sfx/whoosh.mp3", "startInSeconds": 0.0, "volume": 0.6 },
    { "id": "sfx-2", "soundUrl": "assets/sfx/pop.mp3", "startInSeconds": 4.5, "volume": 0.7 }
  ]
}
```
