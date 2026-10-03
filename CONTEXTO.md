# D Galpão Agropet: contexto do projeto

Este documento serve de referência para reaproveitar decisões, código e aprendizados deste site em outro projeto. Os arquivos do site são `index.html`, `css/style.css`, `js/data.js` e `js/main.js`.

---

## 1. O negócio

| Item | Valor |
|------|-------|
| Nome | D Galpão Agropecuária. No novo branding, **D GALPÃO AGROPET** |
| Ramo | Agropecuária com foco em pets: rações, petiscos, medicamentos e acessórios. Também vende artigos gaúchos (cuias, bombas, erva) |
| Público | Donos de cães e gatos da região, num clima de loja de bairro |
| Endereço | Rua Estácio dos Santos, 1144, Bom Sucesso, Gravataí/RS |
| Horário da loja | Seg a Sáb, 8h às 21h |
| Tele-entrega | Seg a Sáb, 9h às 21h |
| Pagamentos | Pix, cartão de crédito, cartão de débito, dinheiro |
| WhatsApp | `5551995035109` ((51) 99503-5109). Confirmado: o número com 9 dígitos abre a conversa certa |
| Instagram | [@dgalpaoagropecuaria](https://www.instagram.com/dgalpaoagropecuaria/), com cerca de 1,3 mil seguidores |
| Destaques do Instagram | Perguntas, Tele entrega, Horários, Clientes, Pagamentos, Endereço |
| Marcas vistas nos posts | Seven Pets (Seven Dogs / Seven Cats), Special Dog Gold, Mandala, Mastig (petiscos), Vetaglós (Vetnil), Drontal Gatos |

---

## 2. Identidade visual

### Paleta (tirada das artes do Instagram)
| Token | Hex | Uso |
|-------|-----|-----|
| `--lime` | `#8BE300` | Cor principal: fundos de seção, botões, destaques |
| `--dark` | `#0B4A2E` | Verde-escuro: textos, faixas atrás dos títulos, cards |
| `--deep` | `#04261A` | Fundo do Instagram e do rodapé |
| `--teal` | `#13A37A` | Terceira cor: seções e cards de informação |
| `--cream` | `#F3F5EF` | Fundo neutro |
| `--brown` | `#2B1D14` | Marrom do logo antigo |
| `--wa` | `#25D366` | Botões de WhatsApp |

### Tipografia
- **Títulos:** Lilita One (Google Fonts), em caixa alta, pesada e arredondada, no mesmo espírito das artes ("SEVEN PETS", "MANDALA!").
- **Texto:** Montserrat 400 a 800.

### Linguagem visual
- Títulos em **blocos verde-escuros** atrás de cada linha, como "TELE / ENTREGA" nas artes: classes `.block-title` e `.slide__title span`.
- Fotos de pets dentro de **molduras orgânicas (blob)** com borda branca grossa (`border-radius` assimétrico), já que não há fotos recortadas.
- Blobs e ondas SVG entre seções.
- Cards com cantos bem arredondados (22 a 34px), sombras suaves e verdes.
- Logo num **"crachá" branco pendurado** no topo do header (cantos de baixo arredondados).
- Bullets em quadradinho lime com check verde-escuro (`.checks`), igual às artes ("✓ Rico em proteínas").
- Botões em pílula com uma "sombra sólida" embaixo (`box-shadow: 0 6px 0`), que dá ar de adesivo.

### Novo logo (em andamento)
Foi gerado com IA um contorno de galpão em traço verde-escuro arredondado; o "D" forma a porta, há uma pata lime dentro do D e uma folha teal no telhado. O nome "GALPÃO" vem em letra condensada bold e "AGROPET" embaixo, em teal e espaçado.

Pendências:
- A folha teal está solta no telhado; o prompt de refinamento já pede para corrigir.
- Remover a marca d'água do Higgsfield.
- Vetorizar (SVG/PDF) antes de entregar.
- Trocar no site: hoje o topo e o rodapé usam `img/logo-mark.svg` + "GALPÃO" em Lilita One, uma recriação provisória.

**Bloco-base dos prompts do kit** (sempre anexar o logo como referência):
```
Use the attached logo as the exact reference. Brand: "D GALPÃO AGROPET", a pet store and
farm supply shop in southern Brazil. Logo description: a barn/house outline drawn with thick
rounded deep-green strokes, the letter "D" forms the barn door, a lime-green paw print sits
inside the D, a teal leaf shape on the roof. Wordmark "GALPÃO" in bold condensed deep green
letters with a clear tilde on the Ã, "AGROPET" below in widely spaced teal capitals.
Colors only: deep green #0B4A2E, lime #8BE300, teal #13A37A, white. Flat vector style,
no gradients, no shadows, no 3D. Keep the logo shapes identical to the reference.
```
Peças previstas: logo refinado, foto de perfil 1:1 (símbolo branco sobre lime), favicon, folha de variações (cor, branco sobre verde, monocromático, horizontal), banner de assinatura de e-mail 600×150 (dados de contato em HTML, não na imagem), 6 capas de destaque do Instagram, folha de apresentação do kit e mockups (camiseta, sacola, fachada, baú da moto).

---

## 3. Estrutura do site (página única)

| # | Seção | Âncora | Fundo | Conteúdo |
|---|-------|--------|-------|----------|
| 1 | Header fixo | `#topo` | transparente; verde-escuro com blur ao rolar | Crachá do logo, menu (Rações · Contato; **sem link do Instagram**, a pedido do cliente), botão "Meu pedido" com contador, hambúrguer no celular |
| 2 | Carrossel hero | — | varia por slide | 4 slides em tela cheia (`100svh`, máx. 1000px) |
| 3 | Faixa de benefícios | — | `--dark` | Tele-entrega · Saúde do pet · Pix e cartões · Artigos gaúchos |
| 4 | Destaques de ração | `#racoes` | `--lime` | Filtros, cards de produto, "Pergunte no WhatsApp" |
| 5 | Departamentos | — | `--teal` | 3 cards: Rações e Petiscos / Brinquedos, Caminhas e Medicamentos / Artigos Gaúchos |
| 6 | Instagram | `#instagram` | `--deep` | Grade estática de 6 fotos que linkam o perfil, botão "Seguir" |
| 7 | Visite-nos | `#contato` | `--lime` | Card "Venha nos visitar!" (endereço, horários, WhatsApp, pagamentos) + iframe do Google Maps |
| 8 | Rodapé | — | `--deep` | Logo, "Tudo para o bem-estar do seu pet em um só lugar!", redes |
| — | WhatsApp flutuante | — | — | Canto inferior direito, com pulso animado |
| — | Gaveta do pedido | `#carrinho` | `--cream` | Painel lateral no desktop, painel que sobe de baixo no celular |

### Slides do carrossel (copiados das artes)
1. "Direto na sua casa" / **TELE / ENTREGA**: rola até as rações.
2. "Cães e gatos" / **RAÇÕES / SEVEN PETS**: rola até as rações.
3. "Calma!" / **ESQUECEU / DA RAÇÃO?**: abre o WhatsApp.
4. "Temos muitos para o seu pet" / **PETISCOS / NATURAIS?**: rola até as rações e ativa o filtro de petiscos.

O serviço de banho e tosa foi retirado do site (slide, menu, faixa de benefícios e seção própria).

Temas por slide: `lime`, `dark`, `teal`, `light`. Cada tema troca as variáveis `--bg`, `--fg`, `--block-bg`, `--block-fg` e `--accent`.

---

## 4. Arquitetura técnica

- **HTML/CSS/JS puro, sem build e sem npm.** Abre direto pelo `file://` e hospeda em qualquer lugar (GitHub Pages, Netlify, Hostinger).
- Nenhuma biblioteca JS. Os ícones são SVG inline.
- **Todo o conteúdo editável fica em `js/data.js`**; `main.js` só renderiza. Para outro cliente, basta trocar o `data.js`.

### `js/data.js`: modelo de dados
```js
CONFIG = { whatsapp, whatsappDisplay, instagram, address, mapsQuery, hours, deliveryHours, payments[] }

SLIDES[] = { eyebrow, title: [linha1, linha2], text, cta,
             action: "whatsapp" | "#ancora", message?, filter?, image, alt,
             theme: "lime" | "dark" | "teal" | "light" }

PRODUCTS[] = { id, brand, name, category: "caes"|"gatos"|"petiscos"|"saude", tag,
               features[3], sizes[], price: number|null, image?,
               pack: { bg, accent, dark? }, featured? }

CATEGORIES[] = { id, label }                      // inclui "todos"
DEPARTMENTS[] = { title, text, image|null, icon?, alt, href? | message? }
INSTAGRAM_POSTS[] = { image, alt, href }
```
- `price: null` mostra "Consulte". Não foram inventados preços; com preço, aparece o valor no card e o subtotal na mensagem.
- Produto sem `image` recebe uma **embalagem ilustrada em SVG** gerada a partir de `pack.bg`/`pack.accent` (função `packSvg()` em `main.js`). Isso resolve a falta de fotos de produto.
- Fotos provisórias vêm do Unsplash pelo helper `unsplash(id, w)`. As instruções de troca estão em `img/README.md`.

### `js/main.js`: módulos
| Função | O que faz |
|--------|-----------|
| `bindConfig()` | Preenche `[data-config]`, transforma todo `[data-wa="mensagem"]` em link de WhatsApp, monta o mapa e o select de pagamento |
| `initHeader()` | Header muda ao rolar; menu hambúrguer fecha ao clicar fora ou num link |
| `initHero()` | Carrossel: setas, bolinhas, swipe por pointer events, teclado ←/→, barra de progresso |
| `initProducts()` | Filtros (chips com `aria-pressed`), tamanho, quantidade, adicionar ao pedido |
| `cart` | Itens com chave `id::tamanho` em `localStorage` (`dgalpao:cart:v1`), sempre com try/catch |
| `initDrawer()` | Abre e fecha a gaveta, prende o foco dentro dela, fecha com Esc, trava a rolagem do body |
| `initCheckout()` | Valida os campos, monta a mensagem, abre o WhatsApp e lembra os dados do cliente (`dgalpao:customer:v1`) |
| `initReveal()` | Animação de entrada com IntersectionObserver |

### Fechamento do pedido pelo WhatsApp
Campos: nome, tele-entrega ou retirada (endereço obrigatório só na entrega), pagamento, observação. Formato da mensagem:
```
*Novo pedido pelo site – D Galpão* 🐾

• 2x Seven Dogs (15 kg)
• 1x Mandala (15 kg)

*Nome:* Maria
*Recebimento:* Tele-entrega
*Endereço:* Rua X, 10, Centro
*Pagamento:* Pix
*Obs.:* ...

Pode confirmar os valores e a disponibilidade? Obrigado!
```

### Responsivo
- Mobile-first com breakpoints em 560, 640, 720 (gaveta), 960 (menu desktop e hero em 2 colunas) e 1200 (4 colunas de produto).
- **No celular, os produtos viram vitrine com rolagem lateral** (`scroll-snap`, cards com 80% da largura) e a dica "Arraste para ver mais →". Em uma coluna a página ficava longa demais.
- Hero no celular: texto em cima, foto embaixo, `92svh`.
- Inputs com `font-size: 16px` para o iOS não dar zoom; alvos de toque com 44px ou mais; `env(safe-area-inset-bottom)` no botão flutuante e na gaveta.

### SEO e acessibilidade
- `<title>`, meta description, Open Graph, `theme-color` e JSON-LD `PetStore` com endereço e horário.
- Link de pular conteúdo, `aria-live` no contador do pedido, `role="dialog"` com `aria-modal` na gaveta, foco visível em lime ou verde-escuro.
- O carrossel marca os slides inativos com `aria-hidden` e `tabindex=-1`.

---

## 5. Aprendizados e armadilhas (vale para o próximo site)

1. **Use `https://api.whatsapp.com/send?phone=...&text=...` e não `wa.me`.** O redirecionamento do `wa.me` corrompe emojis de 4 bytes (🐾 vira "�").
2. **`window.open(url, "_blank", "noopener")` sempre retorna `null`**, e o fallback de pop-up bloqueado acabava abrindo duas vezes. Solução: `const w = window.open(url, "_blank"); if (w) w.opener = null; else location.href = url;`.
3. **`[hidden]` perde para `display: grid/flex`** definido em classe. Precisa da regra global `[hidden] { display: none !important; }`.
4. **Carrossel em tela cheia não pode pausar com mouse em cima nem com foco**: o mouse quase sempre está sobre ele e o slide parava. O cliente pediu que ande sozinho sempre. Ele também **não deve depender de `prefers-reduced-motion`** para o autoplay. Hoje só pausa quando a aba fica oculta (`visibilitychange`).
5. O link curto do perfil (`wa.link/...`) não aceita mensagem pré-preenchida. É preciso o número cru.
6. O iframe do Google Maps funciona sem chave de API: `https://www.google.com/maps?q=ENDERECO&output=embed`. Para "Como chegar": `https://www.google.com/maps/search/?api=1&query=ENDERECO`.
7. Screenshots em Chrome headless com `--virtual-time-budget` podem pegar o carrossel no meio do fade e parecer "desbotado". Isso não é bug; confirme num navegador de verdade.

---

## 6. Pendências e próximos passos
- [x] Confirmar o número do WhatsApp: são 9 dígitos (`5551995035109`).
- [ ] Trocar as fotos do Unsplash pelas artes reais (`img/README.md`).
- [ ] Colocar preços (opcional) em `PRODUCTS[].price`.
- [ ] Aplicar o novo logo vetorizado no header, no rodapé, no favicon e no `og:image`.
- [ ] Assinatura de e-mail em HTML (banner da IA + dados em texto).
- [ ] Hospedagem e domínio.
