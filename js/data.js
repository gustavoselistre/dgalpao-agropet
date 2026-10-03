/*
 * Conteúdo editável do site D Galpão.
 * Para trocar textos, produtos, fotos ou o WhatsApp, edite apenas este arquivo.
 * Imagens: coloque os arquivos em /img e troque a URL (ex.: "img/slide-1.jpg").
 */

const CONFIG = {
  // Número no formato internacional, só dígitos (55 + DDD + número).
  whatsapp: "5551995035109",
  whatsappDisplay: "(51) 99503-5109",
  instagram: "dgalpaoagropecuaria",
  address: "Rua Estácio dos Santos, 1144 – Bom Sucesso, Gravataí/RS – CEP 94130-420",
  // Ponto exato da loja (esquina). Busca por endereço punha o pin no meio da quadra.
  mapsQuery: "-29.929306,-51.033518",
  // Link do perfil da loja no Google ("Compartilhar" no Google Maps). Usado em "Ver no mapa" e "Como chegar".
  // Vazio = abre a busca pelo nome da loja em Gravataí.
  mapsProfile: "https://maps.app.goo.gl/YxQ5RdHMZ42HMMKg8",
  mapsProfileQuery: "D Galpão Agropecuária, Gravataí - RS",
  cep: "94130-420",
  hours: "Seg a Sáb · 8h às 21h",
  deliveryHours: "Tele-entrega · 9h às 21h, seg a sáb",
  payments: ["Pix", "Cartão de crédito", "Cartão de débito", "Dinheiro"],
};

const unsplash = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

/* Carrossel do topo. action: "whatsapp" abre conversa com `message`; "#id" rola até a seção. */
const SLIDES = [
  {
    eyebrow: "Direto na sua casa",
    title: ["Tele", "entrega"],
    text: "Entregamos a ração do seu pet direto na sua casa. Das 9h às 21h, de segunda a sábado.",
    cta: "Pedir agora",
    action: "#racoes",
    image: unsplash("1558788353-f76d92427f16"),
    alt: "Golden retriever sorrindo",
    theme: "dark",
  },
  {
    eyebrow: "Cães e gatos",
    title: ["Rações", "Seven Pets"],
    text: "Ingredientes selecionados, rico em proteínas e com probióticos.",
    cta: "Ver rações",
    action: "#racoes",
    image: unsplash("1450778869180-41d0601e046e"),
    alt: "Cachorro e gato deitados juntos",
    theme: "lime",
  },
  {
    eyebrow: "Calma!",
    title: ["Esqueceu", "da ração?"],
    text: "Peça a sua tele-entrega pelo WhatsApp e a gente leva rapidinho.",
    cta: "Chamar no WhatsApp",
    action: "whatsapp",
    message: "Olá! Esqueci da ração 😅 Vocês podem entregar hoje?",
    image: unsplash("1574158622682-e40e69881006"),
    alt: "Gato olhando para cima com olhos verdes",
    theme: "teal",
  },
  {
    eyebrow: "Temos muitos para o seu pet",
    title: ["Petiscos", "naturais?"],
    text: "Palitos, ossinhos e snacks naturais pra agradar sem culpa.",
    cta: "Ver petiscos",
    action: "#racoes",
    filter: "petiscos",
    image: unsplash("1517849845537-4d257902454a"),
    alt: "Pug preto em fundo amarelo",
    theme: "light",
  },
];

/*
 * Produtos em destaque.
 * category: "caes" | "gatos" | "petiscos" | "saude"
 * price: número em reais, ou null para "Consulte".
 * image: opcional. Sem imagem, o site desenha uma embalagem ilustrada com `pack` (cores).
 */
const PRODUCTS = [
  {
    id: "seven-dogs",
    brand: "Seven Pets",
    name: "Seven Dogs",
    category: "caes",
    tag: "Cães adultos",
    features: ["Ingredientes selecionados", "Rico em proteínas", "Com probióticos"],
    sizes: ["10,1 kg", "15 kg"],
    price: null,
    pack: { bg: "#1d1d1f", accent: "#e8442e" },
    featured: true,
  },
  {
    id: "seven-cats",
    brand: "Seven Pets",
    name: "Seven Cats",
    category: "gatos",
    tag: "Gatos adultos",
    features: ["Ingredientes selecionados", "Rico em proteínas", "Com probióticos"],
    sizes: ["1 kg", "10,1 kg"],
    price: null,
    pack: { bg: "#7d3c98", accent: "#f2a7c3" },
  },
  {
    id: "special-dog-gold",
    brand: "Special Dog",
    name: "Special Dog Gold",
    category: "caes",
    tag: "Adultos · com Whey Protein",
    features: ["Ômegas 3, 6 e zinco", "Batata-doce e BCAA", "Whey sem lactose"],
    sizes: ["15 kg", "20 kg"],
    price: null,
    pack: { bg: "#e07b12", accent: "#3a2510" },
    featured: true,
  },
  {
    id: "mandala",
    brand: "Mandala",
    name: "Mandala",
    category: "caes",
    tag: "Cães e gatos",
    features: ["Mais vitalidade", "Pelagem saudável e brilhante", "Sabor irresistível"],
    sizes: ["15 kg", "25 kg"],
    price: null,
    pack: { bg: "#6e1a2b", accent: "#d9b36c" },
    featured: true,
  },
  {
    id: "mandala-gatos",
    brand: "Mandala",
    name: "Mandala Gatos",
    category: "gatos",
    tag: "Gatos adultos",
    features: ["Mais vitalidade", "Pelagem brilhante", "Sabor irresistível"],
    sizes: ["10 kg", "20 kg"],
    price: null,
    pack: { bg: "#3e1f5c", accent: "#d9b36c" },
  },
  {
    id: "mastig-palitos",
    brand: "Mastig",
    name: "Palitos Mastig",
    category: "petiscos",
    tag: "Petisco natural",
    features: ["Palitos flexíveis", "Ajuda na higiene bucal", "Sem corantes"],
    sizes: ["Pacote"],
    price: null,
    pack: { bg: "#13a37a", accent: "#ffffff" },
  },
  {
    id: "mastig-naturais",
    brand: "Mastig",
    name: "Mastig Naturais",
    category: "petiscos",
    tag: "Petisco natural",
    features: ["100% natural", "Rico em proteína", "Para todas as raças"],
    sizes: ["Pacote"],
    price: null,
    pack: { bg: "#e5487a", accent: "#ffffff" },
  },
  {
    id: "vetaglos",
    brand: "Vetnil",
    name: "Vetaglós Pomada",
    category: "saude",
    tag: "Cicatrizante",
    features: ["Ferimentos superficiais", "Difícil cicatrização", "Bisnaga 20 g"],
    sizes: ["20 g", "50 g"],
    price: null,
    pack: { bg: "#f4f4ef", accent: "#2e8b3a", dark: true },
  },
  {
    id: "drontal-gatos",
    brand: "Elanco",
    name: "Drontal Gatos",
    category: "saude",
    tag: "Vermífugo",
    features: ["Dose única", "Amplo espectro", "Fácil de dar"],
    sizes: ["2 comprimidos", "4 comprimidos"],
    price: null,
    pack: { bg: "#0f8a4a", accent: "#ffffff" },
  },
  {
    id: "antipulgas",
    brand: "Diversas marcas",
    name: "Antipulgas",
    category: "saude",
    tag: "Pulgas e carrapatos",
    features: ["Comprimido ou pipeta", "Proteção prolongada", "Cães e gatos"],
    sizes: ["Até 10 kg", "10 a 25 kg", "Acima de 25 kg"],
    price: null,
    pack: { bg: "#0b4a2e", accent: "#8be300" },
  },
];

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "caes", label: "Cães" },
  { id: "gatos", label: "Gatos" },
  { id: "petiscos", label: "Petiscos" },
  { id: "saude", label: "Saúde" },
];

const DEPARTMENTS = [
  {
    title: "Rações e Petiscos",
    text: "As melhores marcas para cães e gatos, de filhote a sênior.",
    image: unsplash("1589924691995-400dc9ecc119", 800),
    alt: "Pote com ração e patas de cachorro",
    href: "#racoes",
  },
  {
    title: "Brinquedos, Caminhas e Medicamentos",
    text: "Conforto, diversão e saúde num só lugar.",
    image: unsplash("1583337130417-3346a1be7dee", 800),
    alt: "Buldogue francês vestindo blusa amarela",
    message: "Olá! Quero saber sobre brinquedos, caminhas e medicamentos.",
  },
  {
    title: "Artigos Gaúchos",
    text: "Cuias, bombas, erva e muito mais da nossa tradição.",
    image: null, // sem foto: mostra a ilustração da cuia
    icon: "mate",
    alt: "",
    message: "Olá! Quero ver os artigos gaúchos de vocês 🧉",
  },
];

/* Grade do Instagram. Troque `image` pelas artes reais e `href` pelo link do post. */
const INSTAGRAM_POSTS = [
  { image: unsplash("1561037404-61cd46aa615b", 600), alt: "Cachorro tricolor em fundo rosa" },
  { image: unsplash("1514888286974-6c03e2ca1dba", 600), alt: "Gato preto e branco" },
  { image: unsplash("1548199973-03cce0bbc87b", 600), alt: "Dois cachorros correndo" },
  { image: unsplash("1592194996308-7b43878e84a6", 600), alt: "Filhote de gato brincando" },
  { image: unsplash("1625316708582-7c38734be31d", 600), alt: "Schnauzer em fundo amarelo" },
  { image: unsplash("1587300003388-59208cc962cb", 600), alt: "Border collie na praia" },
].map((p) => ({ href: `https://www.instagram.com/${CONFIG.instagram}/`, ...p }));
