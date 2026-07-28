/* =========================================================
   ABUELO CERCA — script.js
   MVP sin backend ni base de datos. Todo el estado vive en
   memoria del navegador. Los 5 casos son datos de DEMOSTRACIÓN.
   ========================================================= */

/* ---------- 1. DATOS DE LOS BENEFICIARIOS ----------
   Para AGREGAR o EDITAR una persona, solo modifica este arreglo.
   No necesitas tocar el HTML ni el resto del script.

   Campos:
   - id:                 1
   - name:               DOÑA MARUJITA
   - age:                88 AÑOS
   - city:               MEDELLIN
   - photo:              ruta a la foto en assets/ (si no existe o falla,
                         se muestra automáticamente un color con su inicial)
   - shortDescription:   Una ventana rota de su casa lo deja expuesto al frío de la noche.
   - story:              Jorge vive solo en una casa que ha ido deteriorándose con los años. Una ventana de su habitación se rompió durante la temporada de lluvias y no ha podido repararla. Las noches frías afectan directamente su salud, por lo que la reparación es una necesidad urgente.
   - need:               Vidrio, marco y mano de obra para reparar una ventana rota en su habitación.
   - goal:               500000 
   - raised:             20000
   - video:              video: "https://www.youtube.com/embed/fAPiCDMZX2U"
                         
------------------------------------------------------------ */
const beneficiaries = [
  {
    id: "maria",
    name: "María",
    age: 78,
    city: "Medellín",
    photo: "assets/maria.jpg",
    shortDescription: "María necesita ayuda para completar su mercado mensual.",
    story: "María tiene 78 años y vive en Medellín. Actualmente recibe apoyo de una organización social y necesita ayuda para completar su alimentación mensual.",
    need: "Mercado mensual",
    goal: 180000,
    raised: 130000,
    video: "https://www.youtube.com/embed/VIDEO_ID"
  },
  {
    id: "carlos",
    name: "Carlos",
    age: 81,
    city: "Medellín",
    photo: "assets/carlos.jpg",
    shortDescription: "Carlos perdió su fórmula de gafas hace un año y ya casi no puede leer.",
    story: "Carlos fue sastre durante más de 40 años. Hoy, sin gafas adecuadas, no puede leer la prensa ni coser como antes. La pérdida de visión también le dificulta moverse solo por el barrio. Con unas gafas nuevas podría recuperar buena parte de su independencia diaria.",
    need: "Gafas nuevas",
    goal: 250000,
    raised: 112500,
    video: "https://www.youtube.com/embed/VIDEO_ID"
  },
  {
    id: "ana",
    name: "Ana",
    age: 76,
    city: "Medellín",
    photo: "assets/ana.jpg",
    shortDescription: "Ana cuida de su nieto los fines de semana y estira cada peso del mercado.",
    story: "Ana recibe una pensión mínima que apenas cubre sus servicios públicos. Aun así, cada fin de semana recibe a su nieto y comparte con él lo poco que tiene. Un mercado básico le permitiría llegar tranquila a fin de mes sin sacrificar comidas.",
    need: "Mercado básico",
    goal: 150000,
    raised: 75000,
    video: "https://www.youtube.com/embed/VIDEO_ID"
  },
  {
    id: "jorge",
    name: "Jorge",
    age: 83,
    city: "Medellín",
    photo: "assets/jorge.jpg",
    shortDescription: "Una ventana rota de su casa deja a Jorge expuesto al frío de la noche.",
    story: "Jorge vive solo en una casa que ha ido deteriorándose con los años. Una ventana de su habitación se rompió durante la temporada de lluvias y no ha podido repararla. Las noches frías afectan directamente su salud, por lo que la reparación es una necesidad urgente.",
    need: "Reparación de ventana",
    goal: 300000,
    raised: 120000,
    video: "https://www.youtube.com/embed/VIDEO_ID"
  },
  {
    id: "carmen",
    name: "Carmen",
    age: 79,
    city: "Medellín",
    photo: "assets/carmen.jpg",
    shortDescription: "Después de una cirugía reciente, Carmen necesita apoyo con su alimentación.",
    story: "Carmen tuvo una cirugía hace algunas semanas y su movilidad todavía es limitada. Cocinar para ella misma le resulta difícil, así que necesita alimentos que pueda preparar con poco esfuerzo mientras continúa su recuperación.",
    need: "Suministro de alimentos",
    goal: 120000,
    raised: 60000,
    video: "https://www.youtube.com/embed/VIDEO_ID"
  }
];

const AMOUNT_OPTIONS = [10000, 20000, 50000];

const PREFERENCES = [
  { id: "dinero", label: "Dinero" },
  { id: "producto-directo", label: "Comprar el producto directamente" },
  { id: "donar-producto", label: "Donar el producto" },
  { id: "voluntariado", label: "Voluntariado de tiempo" },
  { id: "otro", label: "Otro" }
];

const FAQS = [
  { q: "¿Quién verifica a las personas mayores?", a: "Cada caso es identificado y verificado por organizaciones sociales aliadas que trabajan directamente en los barrios. Ellas confirman la situación, la necesidad específica y hacen seguimiento periódico." },
  { q: "¿Cómo se usa mi donación?", a: "En esta versión piloto, tu intención de ayuda se registra y un miembro del equipo se pondrá en contacto contigo para coordinar la forma de entrega. Aún no procesamos pagos en línea." },
  { q: "¿Puedo donar un producto en lugar de dinero?", a: "Sí. Al completar el formulario puedes elegir comprar o donar directamente el producto que la persona necesita, en lugar de un aporte en dinero." },
  { q: "¿Puedo ser voluntario?", a: "Sí, puedes indicarlo como tu forma preferida de ayudar y te contactaremos para contarte las opciones de voluntariado disponibles." },
  { q: "¿Mi donación es deducible de impuestos?", a: "Aún no. Esta es una fase piloto sin procesamiento de pagos, por lo que todavía no emitimos certificados de deducción tributaria." },
  { q: "¿Cómo se protege la información personal?", a: "Los datos sensibles de las personas mayores no se publican. Solo se muestra la información necesaria para explicar su situación, y su identidad completa está protegida por las organizaciones verificadoras." }
];

/* ---------- 2. UTILIDADES ---------- */
function formatCOP(value) {
  return "$" + value.toLocaleString("es-CO") + " COP";
}

function pct(raised, goal) {
  return Math.min(100, Math.round((raised / goal) * 100));
}

function getBeneficiary(id) {
  return beneficiaries.find((b) => b.id === id);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- 3. FRAGMENTOS REUTILIZABLES ---------- */
function avatarHTML(item, size) {
  // El color y la inicial se calculan automáticamente a partir del nombre
  // y la posición del beneficiario, así que no hay que definirlos a mano.
  const idx = beneficiaries.findIndex((b) => b.id === item.id);
  const colorClass = "avatar-" + (((idx >= 0 ? idx : 0) % 5) + 5) % 5;
  const initials = item.name.charAt(0).toUpperCase();
  // Si hay foto, se muestra encima del color de respaldo. Si la foto no
  // existe o no carga (404), la imagen se quita sola y queda el color
  // con la inicial — así el sitio nunca se ve roto por falta de una foto.
  const photoImg = item.photo
    ? `<img src="${item.photo}" alt="Foto de ${escapeHtml(item.name)}" class="media-photo" loading="lazy" onerror="this.remove()">`
    : "";
  return `<div class="avatar ${colorClass} ${size}"><span>${initials}</span>${photoImg}</div>`;
}

function videoHTML(item) {
  if (!item.video) return "";
  return `
    <div class="video-section">
      <h3 class="subsection-title">Conoce su historia</h3>
      <div class="video-frame">
        <iframe src="${item.video}" title="Video de ${escapeHtml(item.name)}" loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
    </div>`;
}

function progressHTML(raised, goal) {
  const p = pct(raised, goal);
  return `
    <div class="progress-wrap">
      <div class="progress-track" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-fill" style="width:${p}%"></div>
      </div>
      <div class="progress-nums">
        <span><b>${formatCOP(raised)}</b> recaudados</span>
        <span class="progress-pct">${p}%</span>
      </div>
    </div>`;
}

function caseCardHTML(c) {
  return `
    <article class="case-card reveal">
      <div class="case-card-body">
        ${avatarHTML(c, "avatar-md")}
        <div class="case-card-top">
          <div>
            <div class="case-card-name">${c.name}</div>
            <div class="case-card-meta">${c.age} años · ${c.city}</div>
          </div>
          <span class="demo-flag">Demo</span>
        </div>
        <p class="case-card-desc">${c.shortDescription}</p>
        <div class="case-card-need">Necesidad: ${c.need}</div>
        ${progressHTML(c.raised, c.goal)}
        <div class="case-card-foot">
          <span class="progress-nums" style="font-size:12.5px">Meta: <b>${formatCOP(c.goal)}</b></span>
          <a href="#/caso/${c.id}" class="btn btn-primary" style="padding:10px 20px;font-size:14px">Ayudar</a>
        </div>
      </div>
    </article>`;
}

/* ---------- 4. VISTAS ---------- */
function renderHome() {
  const featured = beneficiaries.slice(0, 3);
  return `
    <section class="hero">
      <div class="hero-bg-blob" aria-hidden="true"></div>
      <div class="wrap hero-grid">
        <div>
          <span class="eyebrow">Plataforma piloto · Colombia</span>
          <h1>Una pequeña ayuda puede <em>cambiar el día</em> de un adulto mayor</h1>
          <p class="lead">Conoce personas mayores que necesitan apoyo para cubrir necesidades específicas y ayúdalas con una contribución.</p>
          <div class="hero-actions">
            <a href="#/casos" class="btn btn-primary btn-lg">Quiero ayudar</a>
            <a href="#/#como-funciona" class="btn btn-outline btn-lg">Cómo funciona</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><b>5</b><span>Casos piloto activos</span></div>
            <div class="stat"><b>${formatCOP(beneficiaries.reduce((s, c) => s + c.raised, 0))}</b><span>Intención registrada</span></div>
            <div class="stat"><b>100%</b><span>Verificados por aliados</span></div>
          </div>
        </div>
        <div class="hero-art">
          <div class="hero-card">
            ${avatarHTML(beneficiaries[0], "avatar-lg")}
            <div class="hero-card-name">${beneficiaries[0].name}, ${beneficiaries[0].age} años</div>
            <div class="hero-card-meta">${beneficiaries[0].city} · ${beneficiaries[0].need}</div>
            ${progressHTML(beneficiaries[0].raised, beneficiaries[0].goal)}
          </div>
          <div class="hero-float-badge">
            <span style="font-size:20px">🧵</span>
            <div><b>Acompañamiento</b><span>verificado por aliados</span></div>
          </div>
        </div>
      </div>
      <div class="hilo" aria-hidden="true" style="margin-top:56px"></div>
    </section>

    <section class="section" id="como-funciona">
      <div class="wrap">
        <div class="section-head center">
          <span class="section-eyebrow">Cómo funciona</span>
          <h2>Cuatro pasos para ayudar</h2>
          <p>Un proceso simple, pensado para generar confianza de principio a fin.</p>
        </div>
        <div class="steps">
          <div class="step reveal"><div class="step-num">01</div><h3>Conoce</h3><p>Explora historias reales de personas mayores verificadas por organizaciones aliadas.</p></div>
          <div class="step reveal"><div class="step-num">02</div><h3>Elige</h3><p>Selecciona a la persona y la necesidad específica que quieres apoyar.</p></div>
          <div class="step reveal"><div class="step-num">03</div><h3>Apoya</h3><p>Deja tu intención de ayuda: dinero, un producto o tu tiempo como voluntario.</p></div>
          <div class="step reveal"><div class="step-num">04</div><h3>Conoce el impacto</h3><p>Te contamos cómo se usó tu aporte y cómo cambió el día de esa persona.</p></div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="wrap">
        <div class="section-head">
          <span class="section-eyebrow">Casos destacados</span>
          <h2>Personas mayores que necesitan apoyo hoy</h2>
        </div>
        <div class="demo-banner">
          <span>🧵</span>
          <span><strong>Casos de demostración.</strong> Estos perfiles son piloto mientras conectamos casos reales verificados por nuestras organizaciones aliadas.</span>
        </div>
        <div class="cases-grid">
          ${featured.map(caseCardHTML).join("")}
        </div>
        <div style="text-align:center;margin-top:40px">
          <a href="#/casos" class="btn btn-ghost btn-lg">Ver los 5 casos piloto</a>
        </div>
      </div>
    </section>

    <section class="section" id="confianza">
      <div class="wrap trust-grid">
        <div>
          <div class="section-head">
            <span class="section-eyebrow">Confianza y transparencia</span>
            <h2>Cómo cuidamos cada aporte</h2>
          </div>
          <div class="trust-list">
            <div class="trust-item reveal">
              <div class="trust-icon">✓</div>
              <div><h3>Casos verificados</h3><p>Cada persona es identificada y validada por organizaciones sociales aliadas que trabajan en el territorio.</p></div>
            </div>
            <div class="trust-item reveal">
              <div class="trust-icon">↺</div>
              <div><h3>Confirmación de uso</h3><p>Los donantes reciben información de cómo se utilizó su contribución una vez completada.</p></div>
            </div>
            <div class="trust-item reveal">
              <div class="trust-icon">🔒</div>
              <div><h3>Datos protegidos</h3><p>La información personal y sensible de las personas mayores nunca se muestra públicamente.</p></div>
            </div>
          </div>
        </div>
        <div class="trust-panel reveal">
          <span class="mono-tag">Fase piloto</span>
          <h3>Todavía no procesamos pagos en línea</h3>
          <p>Esta versión valida si las personas están dispuestas a ayudar antes de construir el sistema de pagos. Al completar el formulario, dejas tus datos y una persona del equipo te contacta para coordinar tu aporte.</p>
          <p style="margin-bottom:0">Así construimos una plataforma confiable desde el primer caso real.</p>
        </div>
      </div>
    </section>

    <section class="section section-alt" id="faq">
      <div class="wrap">
        <div class="section-head center">
          <span class="section-eyebrow">Preguntas frecuentes</span>
          <h2>Resolvemos tus dudas</h2>
        </div>
        <div class="faq-list">
          ${FAQS.map((f, i) => `
            <div class="faq-item" data-open="false" data-index="${i}">
              <button class="faq-q" aria-expanded="false">
                <span>${f.q}</span>
                <span class="icon">+</span>
              </button>
              <div class="faq-a"><p>${f.a}</p></div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="cta-band">
        <h2>¿Listo para cambiarle el día a alguien?</h2>
        <p>Elige un caso y deja tu intención de ayuda. Nosotros coordinamos el resto contigo.</p>
        <a href="#/casos" class="btn btn-primary btn-lg">Quiero ayudar</a>
      </div>
    </section>
  `;
}

function renderCasesList() {
  return `
    <div class="page-header wrap">
      <span class="eyebrow">Casos piloto</span>
      <h1>Personas mayores que necesitan tu apoyo</h1>
      <p>Cada caso fue identificado por una organización aliada y describe una necesidad específica y verificable.</p>
    </div>
    <section class="section">
      <div class="wrap">
        <div class="demo-banner">
          <span>🧵</span>
          <span><strong>Casos de demostración.</strong> Estos 5 perfiles son piloto mientras conectamos casos reales verificados. Ningún dato personal aquí corresponde a una persona real.</span>
        </div>
        <div class="cases-grid">
          ${beneficiaries.map(caseCardHTML).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderCaseDetail(id) {
  const c = getBeneficiary(id);
  if (!c) return renderNotFound();
  return `
    <div class="case-detail wrap">
      <a href="#/casos" class="back-link">← Volver a todos los casos</a>
      <div class="case-detail-grid">
        <div>
          <div class="case-detail-photo">${avatarHTML(c, "")}</div>
          <div class="case-detail-title">
            <h1>${c.name}</h1>
            <span class="demo-flag">Caso demo</span>
          </div>
          <p class="meta-line">${c.age} años · ${c.city}</p>
          <p class="story-short">${c.shortDescription}</p>

          ${videoHTML(c)}

          <div class="story-section">
            <h3 class="subsection-title">Su historia</h3>
            <p class="story">${c.story}</p>
          </div>

          <div class="need-box">
            <h4>Necesidad específica</h4>
            <p>${c.need}</p>
          </div>
        </div>

        <aside class="donate-panel reveal">
          <h3>Apoya a ${c.name}</h3>
          <p class="sub">Meta: ${formatCOP(c.goal)} · Ya recaudado: ${formatCOP(c.raised)}</p>
          ${progressHTML(c.raised, c.goal)}
          <div style="height:22px"></div>
          <p class="sub" style="margin-bottom:12px">Elige un monto</p>
          <div class="amount-grid" id="amountGrid">
            ${AMOUNT_OPTIONS.map((a) => `<button class="amount-opt" type="button" data-amount="${a}">${formatCOP(a)}</button>`).join("")}
            <div class="amount-other">
              <input type="number" min="1000" step="1000" id="otherAmount" placeholder="Otro monto en COP">
            </div>
          </div>
          <a href="#/ayudar/${c.id}" class="btn btn-primary btn-block btn-lg" id="goToFormBtn">Quiero ayudar a ${c.name}</a>
          <p class="fine">No se procesan pagos todavía. Dejas tus datos y te contactamos para coordinar.</p>
        </aside>
      </div>
    </div>
  `;
}

function renderDonationForm(id) {
  const c = getBeneficiary(id);
  if (!c) return renderNotFound();
  const preselected = sessionStorage.getItem("ac_amount_" + id) || "";
  return `
    <section class="form-page">
      <div class="wrap">
        <a href="#/caso/${c.id}" class="back-link">← Volver al caso de ${c.name}</a>
        <div class="form-shell">
          <div class="form-shell-header">
            ${avatarHTML(c, "")}
            <div>
              <h1>Quiero ayudar a ${c.name}</h1>
              <p>${c.age} años · ${c.city} · ${c.need}</p>
            </div>
          </div>

          <div id="formArea">
            <div class="selected-amount-recap">
              <span>Monto de tu intención de ayuda</span>
              <b id="recapAmount">${preselected ? formatCOP(Number(preselected)) : "Por definir"}</b>
            </div>

            <form id="donationForm" novalidate>
              <div class="field">
                <label for="fName">Nombre completo</label>
                <input type="text" id="fName" name="fName" autocomplete="name" required>
                <p class="error-msg">Escribe tu nombre completo.</p>
              </div>

              <div class="field">
                <label for="fWhatsapp">WhatsApp <span class="hint">para coordinar tu ayuda</span></label>
                <input type="tel" id="fWhatsapp" name="fWhatsapp" autocomplete="tel" placeholder="300 000 0000" required>
                <p class="error-msg">Escribe un número de WhatsApp válido.</p>
              </div>

              <div class="field">
                <label for="fEmail">Correo electrónico</label>
                <input type="email" id="fEmail" name="fEmail" autocomplete="email" placeholder="tucorreo@ejemplo.com" required>
                <p class="error-msg">Escribe un correo electrónico válido.</p>
              </div>

              <div class="field">
                <label for="fAmount">Aporte que te gustaría dar <span class="hint">en COP</span></label>
                <input type="number" id="fAmount" name="fAmount" min="1000" step="1000" value="${preselected}" required>
                <p class="error-msg">Indica un monto mayor a $1.000 COP.</p>
              </div>

              <div class="field">
                <label>¿Cómo prefieres ayudar?</label>
                <div class="pref-grid" id="prefGrid">
                  ${PREFERENCES.map((p, i) => `
                    <label class="pref-opt" data-id="${p.id}">
                      <input type="radio" name="preference" value="${p.id}" ${i === 0 ? "checked" : ""}>
                      <span>${p.label}</span>
                    </label>
                  `).join("")}
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-block btn-lg">Quiero completar mi ayuda</button>
              <p class="fine" style="margin-top:14px">Esta versión no procesa pagos. Un miembro del equipo te contactará por WhatsApp o correo para coordinar la entrega.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderConfirmation(data, caseObj) {
  const prefLabel = PREFERENCES.find((p) => p.id === data.preference)?.label || data.preference;
  return `
    <div class="confirm-box">
      <div class="confirm-icon">✓</div>
      <h2>¡Gracias, ${escapeHtml(data.name)}!</h2>
      <p>Registramos tu intención de ayudar a <strong>${caseObj.name}</strong>. Un miembro de nuestro equipo se pondrá en contacto contigo muy pronto para coordinar los detalles.</p>
      <div class="confirm-summary">
        <div><span>Persona a apoyar</span><span>${caseObj.name}, ${caseObj.city}</span></div>
        <div><span>Aporte propuesto</span><span>${formatCOP(Number(data.amount))}</span></div>
        <div><span>Forma de ayuda</span><span>${prefLabel}</span></div>
        <div><span>Contacto</span><span>${escapeHtml(data.whatsapp)}</span></div>
      </div>
      <div class="confirm-actions">
        <a href="#/casos" class="btn btn-outline">Ver otros casos</a>
        <a href="#/" class="btn btn-primary">Volver al inicio</a>
      </div>
    </div>
  `;
}

function renderNotFound() {
  return `<div class="not-found"><h1>404</h1><h2>No encontramos esa página</h2><p style="margin-top:10px"><a href="#/" class="btn btn-primary" style="margin-top:20px">Volver al inicio</a></p></div>`;
}

/* ---------- 5. ENRUTADOR ---------- */
const app = document.getElementById("app");

function parseRoute() {
  let hash = window.location.hash || "#/";
  hash = hash.replace(/^#/, "");
  const [path, anchor] = hash.split("#");
  return { path: path || "/", anchor };
}

function router() {
  const { path } = parseRoute();
  const segments = path.split("/").filter(Boolean);

  let html = "";
  if (segments.length === 0) {
    html = renderHome();
  } else if (segments[0] === "casos" && segments.length === 1) {
    html = renderCasesList();
  } else if (segments[0] === "caso" && segments[1]) {
    html = renderCaseDetail(segments[1]);
  } else if (segments[0] === "ayudar" && segments[1]) {
    html = renderDonationForm(segments[1]);
  } else {
    html = renderNotFound();
  }

  app.innerHTML = html;
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  attachViewHandlers(segments);
  updateActiveNav(segments);
  initScrollReveal();
  handleAnchorScroll();
}

function handleAnchorScroll() {
  const { anchor } = parseRoute();
  if (anchor) {
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }
}

function updateActiveNav(segments) {
  const links = document.querySelectorAll(".main-nav a[data-route]");
  links.forEach((link) => {
    const route = link.getAttribute("data-route");
    const current = "/" + segments.join("/");
    const isActive = route === "/" ? segments.length === 0 : current.startsWith(route);
    link.classList.toggle("active", isActive);
  });
}

/* ---------- 6. INTERACCIONES POR VISTA ---------- */
function attachViewHandlers(segments) {
  // FAQ acordeón (vista home)
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    btn.addEventListener("click", () => {
      const isOpen = item.getAttribute("data-open") === "true";
      // cerrar los demás para una experiencia más limpia
      document.querySelectorAll(".faq-item").forEach((other) => {
        if (other !== item) {
          other.setAttribute("data-open", "false");
          other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        }
      });
      item.setAttribute("data-open", String(!isOpen));
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  // Selector de monto (vista de detalle de caso)
  const amountGrid = document.getElementById("amountGrid");
  if (amountGrid) {
    const caseId = segments[1];
    let selected = null;
    const otherInput = document.getElementById("otherAmount");
    const goBtn = document.getElementById("goToFormBtn");

    amountGrid.querySelectorAll(".amount-opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        amountGrid.querySelectorAll(".amount-opt").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        selected = btn.getAttribute("data-amount");
        otherInput.value = "";
        sessionStorage.setItem("ac_amount_" + caseId, selected);
        goBtn.href = `#/ayudar/${caseId}`;
      });
    });

    otherInput.addEventListener("input", () => {
      amountGrid.querySelectorAll(".amount-opt").forEach((b) => b.classList.remove("selected"));
      if (otherInput.value) {
        sessionStorage.setItem("ac_amount_" + caseId, otherInput.value);
      } else {
        sessionStorage.removeItem("ac_amount_" + caseId);
      }
    });
  }

  // Formulario de intención de donación (vista de ayudar)
  const form = document.getElementById("donationForm");
  if (form) {
    const caseId = segments[1];
    const caseObj = getBeneficiary(caseId);

    // resaltar preferencia seleccionada
    const prefGrid = document.getElementById("prefGrid");
    function refreshPrefStyles() {
      prefGrid.querySelectorAll(".pref-opt").forEach((opt) => {
        const input = opt.querySelector("input");
        opt.classList.toggle("selected", input.checked);
      });
    }
    prefGrid.querySelectorAll("input").forEach((input) => input.addEventListener("change", refreshPrefStyles));
    refreshPrefStyles();

    // mantener el resumen de monto sincronizado
    const amountField = document.getElementById("fAmount");
    const recap = document.getElementById("recapAmount");
    function refreshRecap() {
      const val = Number(amountField.value);
      recap.textContent = val > 0 ? formatCOP(val) : "Por definir";
    }
    amountField.addEventListener("input", refreshRecap);
    refreshRecap();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm(form)) return;

      const data = {
        name: form.fName.value.trim(),
        whatsapp: form.fWhatsapp.value.trim(),
        email: form.fEmail.value.trim(),
        amount: form.fAmount.value,
        preference: form.querySelector('input[name="preference"]:checked').value
      };

      sessionStorage.removeItem("ac_amount_" + caseId);
      document.getElementById("formArea").innerHTML = renderConfirmation(data, caseObj);
    });
  }
}

function validateForm(form) {
  let valid = true;
  const rules = [
    { field: form.fName, test: (v) => v.trim().length >= 3 },
    { field: form.fWhatsapp, test: (v) => /^[0-9+()\-\s]{7,15}$/.test(v.trim()) },
    { field: form.fEmail, test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { field: form.fAmount, test: (v) => Number(v) >= 1000 }
  ];

  rules.forEach(({ field, test }) => {
    const wrapper = field.closest(".field");
    const ok = test(field.value);
    wrapper.classList.toggle("has-error", !ok);
    field.classList.toggle("field-error", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    form.querySelector(".has-error input, .has-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  return valid;
}

/* ---------- 7. ANIMACIÓN AL HACER SCROLL ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

/* ---------- 8. NAVEGACIÓN MÓVIL ---------- */
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
navToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------- 9. ARRANQUE ---------- */
window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
if (document.readyState !== "loading") router();
