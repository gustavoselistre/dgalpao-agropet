# D Galpão Agropet — site

Site de página única da **D Galpão Agropecuária** (Gravataí/RS): rações, petiscos, medicamentos, artigos gaúchos, tele-entrega e pedido fechado pelo WhatsApp.

- HTML, CSS e JS puros, sem build e sem dependências.
- **Conteúdo editável** (produtos, slides, contatos): `js/data.js`. O `js/main.js` só renderiza.
- Visual: `css/style.css`. Imagens: `img/`.
- Contexto do projeto, decisões e aprendizados: [`CONTEXTO.md`](CONTEXTO.md).

## Rodar localmente
Abra o `index.html` no navegador, ou sirva a pasta com `python3 -m http.server`.

## Deploy
Automático pelo **Cloudflare Pages**: todo push na `main` publica o site, e cada pull request ganha uma URL de prévia. Não há comando de build; o diretório de saída é a raiz (`/`). Os cabeçalhos HTTP ficam em `_headers`.
