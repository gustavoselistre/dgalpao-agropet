# Imagens

As fotos atuais são placeholders do Unsplash. Para usar as artes da loja:

1. Coloque os arquivos nesta pasta (JPG/WebP, ~1600px de largura para o carrossel, ~800px para produtos e Instagram).
2. Em `js/data.js`, troque a URL do item pelo caminho local, ex.: `image: "img/slide-banho.jpg"`.

Sugestão de nomes:

| Onde | Arquivo | Campo em `js/data.js` |
|------|---------|-----------------------|
| Carrossel | `slide-banho.jpg`, `slide-tele.jpg`, `slide-seven.jpg`, `slide-racao.jpg`, `slide-petiscos.jpg` | `SLIDES[].image` |
| Produtos (foto da embalagem, fundo transparente fica melhor) | `produto-seven-dogs.png`, … | `PRODUCTS[].image` (sem `image`, o site desenha uma embalagem ilustrada) |
| Departamentos | `depto-racoes.jpg`, … | `DEPARTMENTS[].image` |
| Grade do Instagram | `insta-1.jpg` … `insta-6.jpg` | `INSTAGRAM_POSTS[].image` (e `href` com o link do post) |

`logo-mark.svg` é o ícone da casinha com o "D", usado no topo, rodapé e na grade do Instagram.
