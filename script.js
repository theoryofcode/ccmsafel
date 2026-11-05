
/* PORTAL INSTITUCIONAL — conteúdo e navegação */
const PAGE_DATA = {
  "inicio": {
    "title": "Início",
    "eyebrow": "Portal institucional",
    "heading": "Colégio Estadual Santa Felicidade",
    "intro": "Informação, educação e comunicação com toda a comunidade escolar.",
    "type": "home"
  },
  "sobre": {
    "title": "Sobre o Colégio",
    "eyebrow": "Institucional",
    "heading": "Sobre o Colégio",
    "intro": "Conheça a proposta, a organização e os espaços do Colégio Estadual Santa Felicidade.",
    "body": "Esta página será preenchida com a apresentação institucional, missão, valores e informações gerais do colégio."
  },
  "historia": {
    "title": "Nossa História",
    "eyebrow": "Institucional",
    "heading": "Nossa História",
    "intro": "A trajetória do Colégio Estadual Santa Felicidade.",
    "body": "Conte aqui a história da instituição, sua fundação, principais marcos e conquistas da comunidade escolar."
  },
  "direcao": {
    "title": "Direção",
    "eyebrow": "Institucional",
    "heading": "Direção",
    "intro": "Informações sobre a equipe diretiva do colégio.",
    "body": "Espaço reservado para apresentação da Direção e dos canais institucionais de atendimento."
  },
  "equipe": {
    "title": "Equipe Escolar",
    "eyebrow": "Institucional",
    "heading": "Equipe Escolar",
    "intro": "Conheça os profissionais que fazem parte da comunidade escolar.",
    "body": "Espaço reservado para apresentar a equipe escolar e suas respectivas funções."
  },
  "ppp": {
    "title": "Projeto Político-Pedagógico",
    "eyebrow": "Institucional",
    "heading": "Projeto Político-Pedagógico",
    "intro": "Documentos e orientações que norteiam o trabalho pedagógico.",
    "body": "Adicione aqui o resumo do Projeto Político-Pedagógico e o link para consultar o documento completo."
  },
  "apmf": {
    "title": "APMF",
    "eyebrow": "Setores",
    "heading": "Associação de Pais, Mestres e Funcionários — APMF",
    "intro": "Participação e parceria entre famílias, profissionais e escola.",
    "body": "Espaço reservado para apresentar a APMF, sua composição, objetivos, ações e formas de participação."
  },
  "militar": {
    "title": "Setor Militar",
    "eyebrow": "Setores",
    "heading": "Setor Militar",
    "intro": "Orientações e informações relacionadas à organização cívico-militar do colégio.",
    "body": "Espaço reservado para comunicados, orientações, atividades e informações do Setor Militar."
  },
  "biblioteca": {
    "title": "Biblioteca",
    "eyebrow": "Setores",
    "heading": "Biblioteca Escolar",
    "intro": "Leitura, pesquisa, conhecimento e acesso ao acervo escolar.",
    "body": "Espaço reservado para apresentar a biblioteca, orientações de empréstimo, horários de atendimento e acesso ao catálogo."
  },
  "pedagogica": {
    "title": "Equipe Pedagógica",
    "eyebrow": "Setores",
    "heading": "Equipe Pedagógica",
    "intro": "Acompanhamento pedagógico e apoio à aprendizagem dos estudantes.",
    "body": "Espaço reservado para informações, orientações e canais de contato da Equipe Pedagógica."
  },
  "secretaria": {
    "title": "Secretaria",
    "eyebrow": "Setores",
    "heading": "Secretaria Escolar",
    "intro": "Atendimento e informações sobre a vida escolar dos estudantes.",
    "body": "Espaço reservado para horários de atendimento, documentos, solicitações e orientações da Secretaria."
  },
  "manha": {
    "title": "Horários — Manhã",
    "eyebrow": "Horários de aula",
    "heading": "Turno da Manhã",
    "intro": "Consulte os horários de funcionamento e das aulas do período da manhã.",
    "type": "schedule",
    "shift": "manha"
  },
  "tarde": {
    "title": "Horários — Tarde",
    "eyebrow": "Horários de aula",
    "heading": "Turno da Tarde",
    "intro": "Consulte os horários de funcionamento e das aulas do período da tarde.",
    "type": "schedule",
    "shift": "tarde"
  },
  "noticias": {
    "title": "Notícias",
    "eyebrow": "Acompanhe o colégio",
    "heading": "Notícias e acontecimentos",
    "intro": "Projetos, atividades e acontecimentos da comunidade escolar.",
    "type": "news"
  },
  "comunicados": {
    "title": "Comunicados",
    "eyebrow": "Informações importantes",
    "heading": "Avisos e Comunicados",
    "intro": "Consulte os avisos e as informações divulgadas pelo colégio.",
    "type": "notices"
  },
  "contatos": {
    "title": "Contatos",
    "eyebrow": "Fale conosco",
    "heading": "Canais de atendimento",
    "intro": "Entre em contato com o Colégio Estadual Santa Felicidade.",
    "type": "contacts"
  },
  "ouvidoria": {
    "title": "Ouvidoria",
    "eyebrow": "Atendimento",
    "heading": "Ouvidoria",
    "intro": "Canal reservado para manifestações e encaminhamentos da comunidade escolar.",
    "body": "Adicione aqui as orientações oficiais e o canal institucional de ouvidoria utilizado pelo colégio."
  }
};

const NEWS = [];
const NOTICES = [];
const SCHEDULES = {
  manha: [],
  tarde: []
};

const pageKey = document.body.dataset.page || "inicio";
const page = PAGE_DATA[pageKey] || PAGE_DATA.inicio;
const content = document.getElementById("pageContent");

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[c]);
}
function banner() {
  return `<section class="page-banner"><div class="container">
    <div class="breadcrumb"><a href="index.html">Início</a> &nbsp;›&nbsp; ${escapeHTML(page.title)}</div>
    <span class="eyebrow">${escapeHTML(page.eyebrow || "Portal institucional")}</span>
    <h1>${escapeHTML(page.heading)}</h1><p>${escapeHTML(page.intro || "")}</p>
  </div></section>`;
}
function empty(message) {
  return `<div class="empty-state">${escapeHTML(message)}</div>`;
}
function renderHome() {
  const news = NEWS.length ? NEWS.map(item => `<article class="info-card">
    <h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.summary)}</p>
    <a href="${escapeHTML(item.url || "noticias.html")}">Ler notícia →</a></article>`).join("") : empty("As notícias e novidades do colégio serão publicadas aqui.");
  const notices = NOTICES.length ? NOTICES.map(item => `<li><a href="${escapeHTML(item.url || "comunicados.html")}">${escapeHTML(item.title)}</a><small>${escapeHTML(item.date || "")}</small></li>`).join("") : `<li>${empty("Nenhum comunicado publicado no momento.")}</li>`;
  return `<section class="home-hero"><div class="container">
    <span class="eyebrow">Bem-vindo ao nosso portal</span>
    <h1>Colégio Estadual<br>Santa Felicidade</h1>
    <p>Um espaço de informação, educação e comunicação com toda a comunidade escolar.</p>
    <div class="hero-links"><a class="button-link" href="noticias.html">Últimas notícias</a><a class="button-link secondary" href="sobre.html">Conheça o colégio</a></div>
  </div></section>
  <div class="container"><div class="home-shortcuts">
    <a class="shortcut" href="horarios-manha.html"><i class="fa-regular fa-clock"></i><span><strong>Horários de aula</strong><small>Manhã e tarde</small></span></a>
    <a class="shortcut" href="comunicados.html"><i class="fa-solid fa-bullhorn"></i><span><strong>Comunicados</strong><small>Informações importantes</small></span></a>
    <a class="shortcut" href="biblioteca.html"><i class="fa-solid fa-book-open"></i><span><strong>Biblioteca</strong><small>Conheça nosso espaço</small></span></a>
    <a class="shortcut" href="contatos.html"><i class="fa-regular fa-comments"></i><span><strong>Atendimento</strong><small>Entre em contato</small></span></a>
  </div>
  <div class="home-columns"><section><h2 class="section-title">Notícias</h2><p class="section-intro">Acompanhe os acontecimentos da comunidade escolar.</p><div class="card-list">${news}</div><p><a href="noticias.html">Ver todas as notícias →</a></p></section>
  <aside class="notice-box"><h2><i class="fa-solid fa-clipboard-list"></i> Avisos e Comunicados</h2><ul>${notices}</ul><div style="padding:13px 16px"><a href="comunicados.html">Consultar todos →</a></div></aside></div></div>`;
}
function renderSchedule() {
  const rows = SCHEDULES[page.shift] || [];
  const label = page.shift === "manha" ? "manhã" : "tarde";
  const table = rows.length ? `<table class="schedule-table"><thead><tr><th>Aula</th><th>Início</th><th>Término</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${escapeHTML(r.aula)}</td><td>${escapeHTML(r.inicio)}</td><td>${escapeHTML(r.fim)}</td></tr>`).join("")}</tbody></table>` : empty(`Os horários do turno da ${label} serão divulgados nesta página em breve.`);
  return `<div class="content-panel"><h2>Horários — ${label[0].toUpperCase()+label.slice(1)}</h2><p>Consulte abaixo a organização dos horários do período.</p>${table}<p style="margin-top:18px"><a href="${page.shift==="manha"?"horarios-tarde.html":"horarios-manha.html"}">Consultar turno da ${page.shift==="manha"?"tarde":"manhã"} →</a></p></div>`;
}
function renderNews() {
  return `<div class="content-panel"><h2>Publicações do colégio</h2>${NEWS.length ? `<div class="card-list">${NEWS.map(n=>`<article class="info-card"><h3>${escapeHTML(n.title)}</h3><p>${escapeHTML(n.summary)}</p></article>`).join("")}</div>` : empty("As notícias serão adicionadas aqui quando houver publicações.")}</div>`;
}
function renderNotices() {
  return `<div class="content-panel"><h2>Comunicados oficiais</h2>${NOTICES.length ? `<div class="card-list">${NOTICES.map(n=>`<article class="info-card"><h3>${escapeHTML(n.title)}</h3><p>${escapeHTML(n.date||"")}</p></article>`).join("")}</div>` : empty("Os comunicados oficiais serão publicados aqui.")}</div>`;
}
function renderContacts() {
  return `<div class="contact-items"><article class="contact-item"><i class="fa-brands fa-whatsapp"></i><h3>WhatsApp</h3><p>Canal de atendimento a ser informado.</p></article><article class="contact-item"><i class="fa-regular fa-envelope"></i><h3>E-mail</h3><p>Endereço institucional a ser informado.</p></article><article class="contact-item"><i class="fa-solid fa-location-dot"></i><h3>Endereço</h3><p>Endereço do colégio a ser confirmado.</p></article></div>`;
}
function renderBody() {
  if (page.type === "home") return renderHome();
  if (page.type === "schedule") return renderSchedule();
  if (page.type === "news") return `<div class="content-panel">${renderNews()}</div>`;
  if (page.type === "notices") return `<div class="content-panel">${renderNotices()}</div>`;
  if (page.type === "contacts") return renderContacts();
  return `<div class="content-panel"><h2>${escapeHTML(page.heading)}</h2><p>${escapeHTML(page.body || "Conteúdo desta página será incluído posteriormente.")}</p></div>`;
}
content.innerHTML = (page.type === "home" ? "" : banner()) + `<section class="content-wrap"><div class="container">${renderBody()}</div></section>`;
document.title = `${page.title} | Colégio Estadual Santa Felicidade`;
document.getElementById("year").textContent = new Date().getFullYear();

/* Navegação móvel: gaveta lateral e submenus expansíveis */
const drawer = document.getElementById("mobileDrawer");
const shade = document.getElementById("drawerShade");
const toggle = document.getElementById("mobileToggle");
const close = document.getElementById("drawerClose");
function openDrawer(){drawer.classList.add("open");shade.classList.add("open");drawer.setAttribute("aria-hidden","false");toggle.setAttribute("aria-expanded","true");}
function closeDrawer(){drawer.classList.remove("open");shade.classList.remove("open");drawer.setAttribute("aria-hidden","true");toggle.setAttribute("aria-expanded","false");}
toggle.addEventListener("click",openDrawer);
close.addEventListener("click",closeDrawer);
shade.addEventListener("click",closeDrawer);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDrawer();});
document.querySelectorAll(".mobile-accordion").forEach(button=>{
  button.addEventListener("click",()=>{
    const submenu=button.nextElementSibling;
    const opened=submenu.classList.toggle("open");
    button.setAttribute("aria-expanded",String(opened));
  });
});
document.querySelectorAll(".mobile-nav-list a").forEach(a=>a.addEventListener("click",closeDrawer));
