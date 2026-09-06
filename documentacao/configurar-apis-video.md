# Guia: Como Gerar as Chaves de API Gratuitas do Criativo Video Studio

Este guia rápido ensina como pegar suas chaves de API da **Groq Cloud** (para transcrição rápida de áudio) e do **Pexels** (para banco de vídeos stock gratuitos em 9:16).

Ambos os serviços oferecem **planos gratuitos generosos** e não exigem cartão de crédito para começar.

---

## ⚡ 1. Groq Cloud (Transcrição Relâmpago Whisper V3)

A Groq é uma das plataformas de inteligência artificial mais rápidas do planeta. O modelo Whisper Large V3 transcreve 1 minuto de áudio em menos de 2 segundos.

### Passo a Passo:
1. Acesse o site oficial: [https://console.groq.com](https://console.groq.com)
2. Clique em **"Sign Up"** ou faça login direto com sua conta **Google** ou **GitHub**.
3. No menu lateral esquerdo, clique em **"API Keys"** (ícone de chave).
4. Clique no botão **"Create API Key"**.
5. Digite um nome para a chave (ex: `Criativo Studio`) e clique em **Submit**.
6. **Copie a chave gerada** (ela começa com `gsk_...`).
7. Abra o arquivo `.env` na pasta do seu Criativo AI Studio e cole:
   ```env
   GROQ_API_KEY=gsk_sua_chave_aqui
   ```

*Custo: **R$ 0,00** (Cota gratuita diária mais que suficiente para dezenas de vídeos por dia).*

---

## 🎬 2. Pexels API (Banco de Vídeos Verticais 9:16)

O Pexels possui a maior biblioteca pública de vídeos stock em alta definição da internet, liberados para uso pessoal e comercial.

### Passo a Passo:
1. Acesse a página da API: [https://www.pexels.com/api/](https://www.pexels.com/api/)
2. Clique em **"Get Started"** e crie uma conta gratuita (ou faça login se já tiver).
3. Na tela seguinte, clique em **"Your API Key"**.
4. Se solicitar a finalidade do aplicativo, preencha de forma simples:
   - *Where will the API be used?* Digite: `Local content creation and social media Reels`.
5. Clique em **"Generate API Key"** e copie o código alfanumérico gerado.
6. Abra o arquivo `.env` no seu Criativo AI Studio e cole:
   ```env
   PEXELS_API_KEY=sua_chave_aqui
   ```

*Custo: **R$ 0,00** (Até 200 buscas por hora e 20.000 buscas por mês gratuitas).*

---

## 🧪 Como testar se suas chaves estão funcionando

No chat do Antigravity IDE, basta digitar:
```text
/criar-video-reels verificar-apis
```
O agente testará suas chaves e confirmará se o estúdio está pronto para renderizar!
