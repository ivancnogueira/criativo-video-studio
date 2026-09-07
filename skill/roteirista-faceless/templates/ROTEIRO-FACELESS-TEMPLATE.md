# 🌌 Roteiro Faceless: {{TITULO_DO_VIDEO}}

> **Nicho / Tema:** {{TEMA}}  
> **Duração Alvo:** {{DURACAO_SEGUNDOS}}s ({{CONTAGEM_PALAVRAS}} palavras a 140 WPM)  
> **Estilo de Cor (Color Grade):** {{COLOR_GRADE}} (dark-moody / teal-orange / apple-clean)  
> **Voz Recomendada:** {{ESTILO_VOZ}} (ex: Grave autoritária / Curiosa / Voz IA ElevenLabs)

---

## 🎙️ Bloco 1: Texto Limpo para Locução / Áudio (Pronto para Gravar ou TTS)

{{TEXTO_LOCUCAO_CONTINUO}}

---

## 🎬 Bloco 2: Tabela de Direção Cena a Cena (Áudio x Visual x Efeitos)

| Cena | Tempo | O Que o Áudio Fala | O Que a Tela Mostra (Visual Prompt / B-Roll) | Tipo de Mídia | SFX / Efeito |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | 00 - 04s | "{{FALA_CENA_1}}" | {{PROMPT_VISUAL_1}} | **Pexels / Stock** | *Bass Drop + Whoosh* |
| **02** | 04 - 08s | "{{FALA_CENA_2}}" | {{PROMPT_VISUAL_2}} | **IA / Stock** | *Som ambiente sutil* |
| **03** | 08 - 18s | "{{FALA_CENA_3}}" | {{PROMPT_VISUAL_3}} | **Infográfico Glassmorphism** | *Pop Elástico* |
| **04** | 18 - 32s | "{{FALA_CENA_4}}" | {{PROMPT_VISUAL_4}} | **Pexels / Stock** | *Whoosh de corte* |
| **05** | 32 - 45s | "{{FALA_CENA_5}}" | {{PROMPT_VISUAL_5}} | **Asset Marca / CTA** | *Ding de confirmação* |

---

## ⚙️ Bloco 3: Esboço de Configuração do Vídeo (`timeline-edicao.json`)

```json
{
  "tipo": "faceless",
  "titulo": "{{TITULO_DO_VIDEO}}",
  "colorGrade": "{{COLOR_GRADE}}",
  "brandHighlightColor": "{{COR_MARCA}}",
  "scenes": [
    {{CENAS_JSON}}
  ],
  "infographics": [
    {{INFOGRAFICOS_JSON}}
  ]
}
```

---

## ✍️ Legenda Estratégica para o Instagram
{{LEGENDA_POST_INSTAGRAM}}
