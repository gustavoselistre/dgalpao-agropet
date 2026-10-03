/* D Galpão — comportamento da página (sem dependências). Conteúdo vem de js/data.js. */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // api.whatsapp.com em vez de wa.me: o redirecionamento do wa.me corrompe emojis (vira "�").
  const waUrl = (message) =>
    `https://api.whatsapp.com/send?phone=${CONFIG.whatsapp}${message ? `&text=${encodeURIComponent(message)}` : ""}`;

  const instaUrl = `https://www.instagram.com/${CONFIG.instagram}/`;

  const formatPrice = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  /* ---------- Storage seguro (modo privado / bloqueado) ---------- */
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* sem persistência */ }
    },
  };

  /* ---------- Toast ---------- */
  const toastEl = $("[data-toast]");
  let toastTimer;
  function toast(html) {
    toastEl.innerHTML = html;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2600);
  }

  /* ---------- Ícones ---------- */
  const ICONS = {
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    insta: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" class="fill"/></svg>',
    truck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
    mate: `<svg viewBox="0 0 100 100" aria-hidden="true" class="fill">
      <path d="M68 6l6 3-14 34-5-2z"/>
      <path d="M26 40h48c0 6-2 10-5 13 4 6 5 13 3 21-3 12-12 20-22 20s-19-8-22-20c-2-8-1-15 3-21-3-3-5-7-5-13z"/>
      <ellipse cx="50" cy="40" rx="24" ry="6" fill="#8be300"/>
      <path d="M28 68h44" stroke="#8be300" stroke-width="4" fill="none"/></svg>`,
  };

  /* ---------- Embalagem ilustrada ---------- */
  function packSvg(product) {
    const { bg, accent, dark } = product.pack || { bg: "#0b4a2e", accent: "#8be300" };
    const text = dark ? "#0b4a2e" : "#ffffff";
    const words = product.name.toUpperCase().split(" ");
    const line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
    const line2 = words.slice(Math.ceil(words.length / 2)).join(" ");
    const size = Math.max(...[line1, line2].map((l) => l.length)) > 8 ? 14 : 18;
    return `<svg class="pack" viewBox="0 0 120 160" aria-hidden="true" style="stroke:none">
      <path d="M14 18 Q60 8 106 18 L112 150 Q60 158 8 150 Z" fill="${bg}"/>
      <path d="M14 18 Q60 8 106 18 L107 30 Q60 22 13 30 Z" fill="rgba(0,0,0,.18)"/>
      <path d="M10 104 Q60 92 110 104 L111 126 Q60 116 9 126 Z" fill="${accent}"/>
      <text x="60" y="48" text-anchor="middle" font-size="8" fill="${accent}" letter-spacing="1">${escapeHtml(product.brand.toUpperCase())}</text>
      <text x="60" y="${line2 ? 70 : 78}" text-anchor="middle" font-size="${size}" fill="${text}">${escapeHtml(line1)}</text>
      ${line2 ? `<text x="60" y="${70 + size}" text-anchor="middle" font-size="${size}" fill="${text}">${escapeHtml(line2)}</text>` : ""}
      <circle cx="60" cy="138" r="7" fill="${text}" opacity=".9"/>
      <path d="M57 138l2 2 4-4" stroke="${bg}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M22 40 Q24 90 20 140" stroke="rgba(255,255,255,.18)" stroke-width="5" fill="none" stroke-linecap="round"/>
    </svg>`;
  }

  const productVisual = (p) =>
    p.image ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy">` : packSvg(p);

  /* ---------- Config na página ---------- */
  function bindConfig() {
    $$("[data-config]").forEach((el) => {
      const value = CONFIG[el.dataset.config];
      el.textContent = Array.isArray(value) ? value.join(" · ") : value;
    });
    $$("[data-wa]").forEach((el) => {
      el.href = waUrl(el.dataset.wa);
      el.target = "_blank";
      el.rel = "noopener";
    });
    $$("[data-insta-link]").forEach((el) => (el.href = instaUrl));
    const mapsQ = encodeURIComponent(CONFIG.mapsQuery);
    $("[data-map]").src = `https://www.google.com/maps?q=${mapsQ}&output=embed`;
    // "Ver no mapa" / "Como chegar": perfil da loja no Google (se configurado) ou busca pelo nome da loja.
    const profileUrl = CONFIG.mapsProfile ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapsProfileQuery || CONFIG.mapsQuery)}`;
    $$("[data-maps-link]").forEach((el) => (el.href = profileUrl));
    $("[data-year]").textContent = new Date().getFullYear();
    $("[data-payment-select]").innerHTML = CONFIG.payments
      .map((p) => `<option>${escapeHtml(p)}</option>`)
      .join("");
  }

  /* ---------- Header ---------- */
  function initHeader() {
    const header = $(".header");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const nav = $("#nav");
    const btn = $(".menu-btn");
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };
    btn.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("is-open") && !e.target.closest("#nav, .menu-btn")) setOpen(false);
    });
  }

  /* ---------- Carrossel ---------- */
  function initHero() {
    const hero = $(".hero");
    const track = $("[data-hero-track]");
    const dotsEl = $("[data-hero-dots]");
    const progress = $("[data-hero-progress]");
    const DURATION = 6000;

    track.innerHTML = SLIDES.map((s, i) => {
      const isWa = s.action === "whatsapp";
      const href = isWa ? waUrl(s.message) : s.action;
      const badge = i === 0 ? `${ICONS.truck}<span>Tele-entrega<br>9h às 21h</span>` : `${ICONS.check}<span>D Galpão<br>Gravataí</span>`;
      return `
      <article class="slide slide--${s.theme}" role="group" aria-roledescription="slide" aria-label="${i + 1} de ${SLIDES.length}" ${i ? 'aria-hidden="true"' : ""}>
        <div class="container slide__inner">
          <div class="slide__content">
            <p class="slide__eyebrow">${escapeHtml(s.eyebrow)}</p>
            <${i === 0 ? "h1" : "h2"} class="slide__title">${s.title.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</${i === 0 ? "h1" : "h2"}>
            <p class="slide__text">${escapeHtml(s.text)}</p>
            <a class="btn btn--lg slide__cta" href="${escapeHtml(href)}" ${isWa ? 'target="_blank" rel="noopener"' : ""} ${s.filter ? `data-set-filter="${escapeHtml(s.filter)}"` : ""} ${i ? 'tabindex="-1"' : ""}>${escapeHtml(s.cta)}</a>
          </div>
          <div class="slide__media">
            <div class="slide__frame"><img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.alt)}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} draggable="false"></div>
            <div class="slide__badge">${badge}</div>
          </div>
        </div>
      </article>`;
    }).join("");

    dotsEl.innerHTML = SLIDES.map(
      (s, i) => `<button class="hero__dot" type="button" role="tab" aria-label="Slide ${i + 1}: ${escapeHtml(s.title.join(" "))}" aria-selected="${i === 0}"></button>`
    ).join("");

    const slides = $$(".slide", track);
    const dots = $$(".hero__dot", dotsEl);
    let current = 0;
    let timer = null;
    let paused = false;

    function restartProgress() {
      progress.classList.remove("run");
      void progress.offsetWidth; // reinicia a animação
      if (!reducedMotion) {
        progress.style.setProperty("--dur", `${DURATION}ms`);
        progress.classList.add("run");
      }
    }

    function go(index) {
      const next = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === next;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
        $$("a, button", slide).forEach((el) => (el.tabIndex = active ? 0 : -1));
      });
      dots.forEach((d, i) => d.setAttribute("aria-selected", String(i === next)));
      current = next;
      schedule();
    }

    function schedule() {
      clearTimeout(timer);
      restartProgress();
      if (paused) return;
      timer = setTimeout(() => go(current + 1), DURATION);
    }

    function setPaused(value) {
      paused = value;
      hero.classList.toggle("is-paused", value);
      if (value) clearTimeout(timer);
      else schedule();
    }

    $("[data-hero-prev]").addEventListener("click", () => go(current - 1));
    $("[data-hero-next]").addEventListener("click", () => go(current + 1));
    dots.forEach((d, i) => d.addEventListener("click", () => go(i)));

    // O carrossel ocupa a tela inteira, então não pausa com o mouse em cima nem com foco:
    // anda sempre sozinho e só para enquanto a aba está em segundo plano.
    document.addEventListener("visibilitychange", () => setPaused(document.hidden));

    hero.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(current - 1);
      if (e.key === "ArrowRight") go(current + 1);
    });

    // Swipe (toque e mouse)
    let startX = 0, startY = 0, tracking = false;
    hero.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      tracking = true; startX = e.clientX; startY = e.clientY;
    });
    hero.addEventListener("pointerup", (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1));
    });
    hero.addEventListener("pointercancel", () => (tracking = false));

    go(0);
  }

  /* ---------- Produtos ---------- */
  const productState = new Map(PRODUCTS.map((p) => [p.id, { size: p.sizes[0], qty: 1 }]));
  let activeFilter = "todos";

  function renderFilters() {
    const el = $("[data-filters]");
    el.innerHTML = CATEGORIES.map(
      (c) => `<button class="chip" type="button" data-filter="${c.id}" aria-pressed="${c.id === activeFilter}">${escapeHtml(c.label)}</button>`
    ).join("");
    el.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (btn) setFilter(btn.dataset.filter);
    });
  }

  function setFilter(id) {
    activeFilter = CATEGORIES.some((c) => c.id === id) ? id : "todos";
    $$("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === activeFilter)));
    renderProducts();
  }

  function productCard(p, index) {
    const st = productState.get(p.id);
    const cat = CATEGORIES.find((c) => c.id === p.category);
    return `
    <article class="product" data-id="${p.id}" style="animation-delay:${Math.min(index, 8) * 50}ms">
      <div class="product__media">
        ${productVisual(p)}
        <span class="product__tag">${escapeHtml(cat ? cat.label : "")}</span>
        ${p.featured ? '<span class="product__star">★ Mais vendido</span>' : ""}
      </div>
      <div class="product__body">
        <p class="product__brand">${escapeHtml(p.brand)} · ${escapeHtml(p.tag)}</p>
        <h3 class="product__name">${escapeHtml(p.name)}</h3>
        <ul class="checks">${p.features.map((f) => `<li>${escapeHtml(f)}</li>`).join("")}</ul>
        ${p.sizes.length > 1 ? `
        <div class="product__options" role="group" aria-label="Tamanho">
          ${p.sizes.map((s) => `<button class="size" type="button" data-size="${escapeHtml(s)}" aria-pressed="${s === st.size}">${escapeHtml(s)}</button>`).join("")}
        </div>` : ""}
        <p class="product__price">${p.price != null ? formatPrice(p.price) : "Consulte"}<small>${p.price != null ? "preço sujeito a alteração" : "preço confirmado no WhatsApp"}</small></p>
        <div class="product__buy">
          <div class="qty" role="group" aria-label="Quantidade">
            <button type="button" data-qty="-1" aria-label="Diminuir quantidade">−</button>
            <output aria-live="polite">${st.qty}</output>
            <button type="button" data-qty="1" aria-label="Aumentar quantidade">+</button>
          </div>
          <button class="btn btn--dark" type="button" data-add>${ICONS.bag}Adicionar</button>
        </div>
      </div>
    </article>`;
  }

  function renderProducts() {
    const list = PRODUCTS.filter((p) => activeFilter === "todos" || p.category === activeFilter);
    const el = $("[data-products]");
    el.scrollLeft = 0;
    el.innerHTML = list.length
      ? list.map(productCard).join("")
      : '<p class="products__empty">Nenhum produto nessa categoria ainda — chama a gente no WhatsApp!</p>';
  }

  function initProducts() {
    renderFilters();
    renderProducts();

    $("[data-products]").addEventListener("click", (e) => {
      const card = e.target.closest(".product");
      if (!card) return;
      const id = card.dataset.id;
      const st = productState.get(id);

      const sizeBtn = e.target.closest("[data-size]");
      if (sizeBtn) {
        st.size = sizeBtn.dataset.size;
        $$("[data-size]", card).forEach((b) => b.setAttribute("aria-pressed", String(b === sizeBtn)));
        return;
      }
      const qtyBtn = e.target.closest("[data-qty]");
      if (qtyBtn) {
        st.qty = Math.min(99, Math.max(1, st.qty + Number(qtyBtn.dataset.qty)));
        $("output", card).textContent = st.qty;
        return;
      }
      if (e.target.closest("[data-add]")) {
        cart.add(id, st.size, st.qty);
        const p = PRODUCTS.find((x) => x.id === id);
        toast(`<strong>${st.qty}×</strong> ${escapeHtml(p.name)} adicionado ao pedido`);
        st.qty = 1;
        $("output", card).textContent = 1;
      }
    });

    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-set-filter]");
      if (link) setFilter(link.dataset.setFilter);
    });
  }

  /* ---------- Departamentos e Instagram ---------- */
  function renderDepartments() {
    $("[data-depts]").innerHTML = DEPARTMENTS.map((d) => {
      const href = d.href || waUrl(d.message);
      const external = !d.href;
      const media = d.image
        ? `<img src="${escapeHtml(d.image)}" alt="${escapeHtml(d.alt)}" loading="lazy">`
        : ICONS[d.icon] || "";
      return `
      <a class="dept reveal" href="${escapeHtml(href)}" ${external ? 'target="_blank" rel="noopener"' : ""}>
        <div class="dept__text">
          <strong>${escapeHtml(d.title)}</strong>
          <span>${escapeHtml(d.text)}</span>
          <span class="dept__plus" aria-hidden="true">${ICONS.plus}</span>
        </div>
        <div class="dept__media">${media}</div>
      </a>`;
    }).join("");
  }

  function renderInstagram() {
    $("[data-insta]").innerHTML = INSTAGRAM_POSTS.map(
      (p) => `
      <a class="insta-post reveal" href="${escapeHtml(p.href)}" target="_blank" rel="noopener" aria-label="Ver no Instagram: ${escapeHtml(p.alt)}">
        <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.alt)}" loading="lazy">
        <span class="insta-post__badge"><img src="img/logo-mark.svg" alt=""><span>@${escapeHtml(CONFIG.instagram)}</span></span>
        <span class="insta-post__overlay">${ICONS.insta}</span>
      </a>`
    ).join("");
  }

  /* ---------- Carrinho ---------- */
  const CART_KEY = "dgalpao:cart:v1";
  const CUSTOMER_KEY = "dgalpao:customer:v1";

  const cart = {
    items: store.get(CART_KEY, []).filter((it) => PRODUCTS.some((p) => p.id === it.id) && it.qty > 0),

    key: (id, size) => `${id}::${size}`,

    add(id, size, qty) {
      const found = this.items.find((it) => this.key(it.id, it.size) === this.key(id, size));
      if (found) found.qty = Math.min(99, found.qty + qty);
      else this.items.push({ id, size, qty });
      this.save(true);
    },
    setQty(index, qty) {
      if (qty <= 0) this.items.splice(index, 1);
      else this.items[index].qty = Math.min(99, qty);
      this.save();
    },
    clear() { this.items = []; this.save(); },
    count() { return this.items.reduce((n, it) => n + it.qty, 0); },
    save(bump = false) {
      store.set(CART_KEY, this.items);
      renderCart();
      if (bump) {
        const btn = $(".cart-btn");
        btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump");
      }
    },
  };

  function renderCart() {
    const count = cart.count();
    $$("[data-cart-count]").forEach((el) => (el.textContent = count));
    $(".cart-btn").setAttribute("aria-label", `Abrir meu pedido (${count} ${count === 1 ? "item" : "itens"})`);

    const empty = cart.items.length === 0;
    $("[data-cart-empty]").hidden = !empty;
    $("[data-checkout]").hidden = empty;
    $("[data-cart-foot]").hidden = empty;

    $("[data-cart-list]").innerHTML = cart.items.map((it, i) => {
      const p = PRODUCTS.find((x) => x.id === it.id);
      const unit = p.price != null ? formatPrice(p.price * it.qty) : "Consultar preço";
      return `
      <li class="cart-item" data-index="${i}">
        <div class="cart-item__thumb">${productVisual(p)}</div>
        <div class="cart-item__info">
          <p class="cart-item__name">${escapeHtml(p.name)}</p>
          <p class="cart-item__meta">${escapeHtml(it.size)} · ${unit}</p>
          <button class="cart-item__remove" type="button" data-remove>Remover</button>
        </div>
        <div class="cart-item__side">
          <div class="qty" role="group" aria-label="Quantidade de ${escapeHtml(p.name)}">
            <button type="button" data-cart-qty="-1" aria-label="Diminuir">−</button>
            <output>${it.qty}</output>
            <button type="button" data-cart-qty="1" aria-label="Aumentar">+</button>
          </div>
        </div>
      </li>`;
    }).join("");
  }

  /* ---------- Drawer ---------- */
  function initDrawer() {
    const drawer = $("#carrinho");
    const backdrop = $(".drawer-backdrop");
    let lastFocus = null;

    const focusables = () =>
      $$('a[href], button:not([disabled]), input, select, textarea', drawer).filter((el) => el.offsetParent !== null);

    function open() {
      lastFocus = document.activeElement;
      backdrop.hidden = false;
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      setTimeout(() => $(".drawer__head .icon-btn").focus(), 50);
    }
    function close() {
      if (!drawer.classList.contains("is-open")) return;
      backdrop.hidden = true;
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }

    $$("[data-open-cart]").forEach((b) => b.addEventListener("click", open));
    $$("[data-close-cart]").forEach((b) => b.addEventListener("click", close));

    document.addEventListener("keydown", (e) => {
      if (!drawer.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    $("[data-cart-list]").addEventListener("click", (e) => {
      const li = e.target.closest(".cart-item");
      if (!li) return;
      const index = Number(li.dataset.index);
      if (e.target.closest("[data-remove]")) cart.setQty(index, 0);
      const q = e.target.closest("[data-cart-qty]");
      if (q) cart.setQty(index, cart.items[index].qty + Number(q.dataset.cartQty));
    });

    initCheckout(close);
  }

  /* ---------- Select personalizado ----------
     A lista nativa do <select> não aceita estilo. O <select> continua no formulário (guarda o valor
     e funciona sem JS); por cima dele vai um botão + listbox acessível com as cores do site.
     Depois de trocar as opções ou o valor por código, chame refreshSelect(select). */
  const selectUi = new WeakMap();
  let selectUid = 0;

  function enhanceSelect(select) {
    const id = `cs${++selectUid}`;
    const wrap = document.createElement("div");
    wrap.className = "cselect";
    select.classList.add("cselect__native");
    select.tabIndex = -1;
    select.setAttribute("aria-hidden", "true");
    select.parentNode.insertBefore(wrap, select);
    wrap.appendChild(select);
    wrap.insertAdjacentHTML("beforeend", `
      <button type="button" class="cselect__btn" aria-haspopup="listbox" aria-expanded="false" aria-controls="${id}">
        <span class="cselect__value"></span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <ul class="cselect__list" id="${id}" role="listbox" tabindex="-1" hidden></ul>`);
    const btn = $(".cselect__btn", wrap);
    const list = $(".cselect__list", wrap);
    const label = select.closest("label")?.querySelector("span");
    if (label) { label.id ||= `${id}-label`; btn.setAttribute("aria-labelledby", `${label.id} ${id}-value`); list.setAttribute("aria-labelledby", label.id); }
    $(".cselect__value", wrap).id = `${id}-value`;
    let active = 0;

    const options = () => [...select.options];
    function refresh() {
      const opts = options();
      list.innerHTML = opts.map((o, i) =>
        `<li class="cselect__opt" role="option" id="${id}-o${i}" data-i="${i}" aria-selected="${o.selected}">${escapeHtml(o.text)}</li>`).join("");
      $(".cselect__value", wrap).textContent = select.selectedOptions[0]?.text || "";
    }
    function setActive(i) {
      const items = $$(".cselect__opt", list);
      if (!items.length) return;
      active = Math.max(0, Math.min(items.length - 1, i));
      items.forEach((li, k) => li.classList.toggle("is-active", k === active));
      list.setAttribute("aria-activedescendant", items[active].id);
      items[active].scrollIntoView({ block: "nearest" });
    }
    function open() {
      refresh();
      list.hidden = false;
      wrap.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      setActive(select.selectedIndex);
      list.focus({ preventScroll: true });
      // Dentro da gaveta a lista pode abrir abaixo da área visível: rola só o necessário.
      list.scrollIntoView({ block: "nearest", behavior: reducedMotion ? "auto" : "smooth" });
    }
    function close(focusBtn = true) {
      if (list.hidden) return;
      list.hidden = true;
      wrap.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      if (focusBtn) btn.focus({ preventScroll: true });
    }
    function choose(i) {
      if (select.selectedIndex !== i) {
        select.selectedIndex = i;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
      refresh();
      close();
    }

    btn.addEventListener("click", () => (list.hidden ? open() : close()));
    btn.addEventListener("keydown", (e) => {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); open(); }
    });
    list.addEventListener("click", (e) => {
      const li = e.target.closest(".cselect__opt");
      if (li) choose(Number(li.dataset.i));
    });
    list.addEventListener("mousemove", (e) => {
      const li = e.target.closest(".cselect__opt");
      if (li && Number(li.dataset.i) !== active) setActive(Number(li.dataset.i));
    });
    list.addEventListener("keydown", (e) => {
      const n = select.options.length;
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Home") { e.preventDefault(); setActive(0); }
      else if (e.key === "End") { e.preventDefault(); setActive(n - 1); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); }
      else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); }
      else if (e.key === "Tab") close(false);
    });
    document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) close(false); });
    select.addEventListener("change", refresh);

    selectUi.set(select, refresh);
    refresh();
  }
  const refreshSelect = (select) => { const fn = selectUi.get(select); if (fn) fn(); };

  /* ---------- Checkout → WhatsApp ---------- */
  function initCheckout(closeDrawer) {
    const form = $("[data-checkout]");
    const errorEl = $("[data-form-error]");
    const addressField = $("[data-address-field]");
    const saved = store.get(CUSTOMER_KEY, {});

    ["name", "address", "cep", "number"].forEach((k) => { if (saved[k]) form.elements[k].value = saved[k]; });
    if (CONFIG.payments.includes(saved.payment)) form.elements.payment.value = saved.payment;
    if (saved.mode === "entrega" || saved.mode === "retirada") form.elements.mode.value = saved.mode;

    const syncMode = () => {
      addressField.hidden = form.elements.mode.value !== "entrega";
      $("[data-pickup]").hidden = form.elements.mode.value !== "retirada";
    };
    enhanceSelect(form.elements.payment);
    syncMode();
    form.addEventListener("change", syncMode);
    form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
    form.addEventListener("submit", (e) => { e.preventDefault(); send(); });

    /* CEP → endereço (ViaCEP: gratuito, sem chave, aceita chamada direto do navegador). */
    const cepInput = form.elements.cep;
    const cepStatus = $("[data-cep-status]");
    const cepHint = cepStatus.innerHTML;
    const cepDigits = () => cepInput.value.replace(/\D/g, "");
    let cepRequest = 0;
    async function lookupCep() {
      const cep = cepDigits();
      if (cep.length !== 8) return;
      const req = ++cepRequest;
      cepStatus.textContent = "Buscando endereço…";
      cepStatus.dataset.state = "loading";
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 6000);
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: ctrl.signal });
        clearTimeout(timer);
        if (req !== cepRequest) return; // o cliente já digitou outro CEP
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const d = await res.json();
        if (d.erro) {
          cepInput.classList.add("is-invalid");
          cepStatus.textContent = "CEP não encontrado. Confira o número ou preencha o endereço abaixo.";
          cepStatus.dataset.state = "error";
          return;
        }
        // Complemento do CEP às vezes vem entre parênteses, ex.: "(Bom Sucesso)".
        const street = [d.logradouro, d.complemento && (d.complemento.startsWith("(") ? d.complemento : `(${d.complemento})`)].filter(Boolean).join(" ");
        form.elements.address.value = [street, d.bairro, d.localidade && `${d.localidade}/${d.uf}`].filter(Boolean).join(", ");
        form.elements.address.classList.remove("is-invalid");
        cepStatus.textContent = `Endereço encontrado: ${d.localidade}/${d.uf}. Confira e informe o número.`;
        cepStatus.dataset.state = "ok";
        if (!form.elements.number.value.trim()) form.elements.number.focus();
      } catch {
        if (req !== cepRequest) return;
        cepStatus.textContent = "Não foi possível buscar o CEP agora. Preencha o endereço abaixo.";
        cepStatus.dataset.state = "error";
      }
    }
    cepInput.addEventListener("input", () => {
      const d = cepDigits().slice(0, 8);
      cepInput.value = d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
      if (d.length === 8) lookupCep();
      else { cepRequest++; cepStatus.innerHTML = cepHint; delete cepStatus.dataset.state; }
    });

    function buildMessage(data) {
      const lines = ["*Novo pedido pelo site – D Galpão* 🐾", ""];
      let total = 0;
      let allPriced = true;
      cart.items.forEach((it) => {
        const p = PRODUCTS.find((x) => x.id === it.id);
        let line = `• ${it.qty}x ${p.name} (${it.size})`;
        if (p.price != null) { line += ` – ${formatPrice(p.price * it.qty)}`; total += p.price * it.qty; }
        else allPriced = false;
        lines.push(line);
      });
      if (total > 0) lines.push("", `*Subtotal:* ${formatPrice(total)}${allPriced ? "" : " + itens a consultar"}`);
      lines.push(
        "",
        `*Nome:* ${data.name}`,
        `*Recebimento:* ${data.mode === "entrega" ? "Tele-entrega" : `Retirar na loja (${CONFIG.address})`}`
      );
      if (data.mode === "entrega") {
        const addr = [data.address, data.number && `nº ${data.number}`].filter(Boolean).join(", ");
        lines.push(`*Endereço:* ${addr}${data.cep ? ` – CEP ${data.cep}` : ""}`);
      }
      lines.push(`*Pagamento:* ${data.payment}`);
      if (data.notes) lines.push(`*Obs.:* ${data.notes}`);
      lines.push("", "Pode confirmar os valores e a disponibilidade? Obrigado!");
      return lines.join("\n");
    }

    function send() {
      const data = {
        name: form.elements.name.value.trim(),
        mode: form.elements.mode.value,
        address: form.elements.address.value.trim(),
        cep: form.elements.cep.value.trim(),
        number: form.elements.number.value.trim(),
        payment: form.elements.payment.value,
        notes: form.elements.notes.value.trim(),
      };
      const missing = [];
      if (!data.name) missing.push(form.elements.name);
      if (data.mode === "entrega" && data.cep && data.cep.replace(/\D/g, "").length !== 8) missing.push(form.elements.cep);
      if (data.mode === "entrega" && data.address.length < 6) missing.push(form.elements.address);
      if (data.mode === "entrega" && !data.number) missing.push(form.elements.number);
      missing.forEach((el) => el.classList.add("is-invalid"));
      if (!cart.items.length) { errorEl.textContent = "Seu pedido está vazio."; return; }
      if (missing.length) {
        const noName = missing.includes(form.elements.name);
        const noAddress = missing.some((el) => el !== form.elements.name);
        errorEl.textContent = noName && noAddress
          ? "Preencha seu nome e o endereço completo para a entrega."
          : noAddress ? "Preencha o endereço completo para a entrega (CEP válido, rua e número)." : "Preencha seu nome para continuar.";
        missing[0].focus();
        return;
      }
      errorEl.textContent = "";
      store.set(CUSTOMER_KEY, { name: data.name, mode: data.mode, address: data.address, cep: data.cep, number: data.number, payment: data.payment });

      const url = waUrl(buildMessage(data));
      const win = window.open(url, "_blank");
      if (win) win.opener = null;
      else window.location.href = url; // pop-up bloqueado

      form.elements.notes.value = "";
      cart.clear();
      closeDrawer();
      toast("Pedido enviado! <strong>Finalize a conversa no WhatsApp.</strong>");
    }

    $("[data-send-order]").addEventListener("click", send);
  }

  /* ---------- Reveal ---------- */
  function initReveal() {
    $$(".section-head, .visit__card, .visit__map, .depts__intro").forEach((el) => el.classList.add("reveal"));
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window) || reducedMotion) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Init ---------- */
  bindConfig();
  initHeader();
  initHero();
  initProducts();
  renderDepartments();
  renderInstagram();
  renderCart();
  initDrawer();
  initReveal();
})();
