/* =====================================================
   PORTAL INSTITUCIONAL — COLÉGIO ESTADUAL SANTA FELICIDADE
   JavaScript principal
===================================================== */

/* 1. DADOS DO COLÉGIO
   Preencha os campos quando tiver os dados oficiais.
   WhatsApp: somente números, incluindo DDI e DDD.
*/
const CONFIG = {
  whatsapp: "", // Exemplo: "5541999999999"
  email: "",
  mapa: "" // URL do Google Maps
};

/* 2. NOTÍCIAS
   Adicione objetos seguindo este modelo:
   {
     titulo: "Título da notícia",
     categoria: "Institucional",
     descricao: "Resumo da notícia.",
     data: "05/11/2026",
     imagem: "https://endereco-da-imagem.jpg",
     link: "https://..."
   }
*/
const noticias = [];

/* 3. AVISOS E COMUNICADOS
   Modelo:
   {
     titulo: "Comunicado importante",
     descricao: "Publicado em 05/11/2026",
     link: "https://..."
   }
*/
const avisos = [];

/* 4. HORÁRIOS
   Inclua aulas dentro do turno correspondente.
   Modelo de aula: { aula: "1ª aula", inicio: "07:30", termino: "08:20" }
*/
const horarios = {
  matutino: {
    titulo: "Turno Matutino",
    descricao: "Horários referentes ao período da manhã.",
    aulas: []
  },
  vespertino: {
    titulo: "Turno Vespertino",
    descricao: "Horários referentes ao período da tarde.",
    aulas: []
  },
  

  }
};

/* 5. FUNÇÕES AUXILIARES DE SEGURANÇA */
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function safeLink(value) {
  const link = String(value ?? "").trim();
  if (
    link.startsWith("#") ||
    link.startsWith("/") ||
    link.startsWith("https://") ||
    link.startsWith("mailto:")
  ) return escapeHTML(link);

  return "#";
}

/* 6. RENDERIZAÇÃO DAS NOTÍCIAS */
function renderNoticias() {
  const newsGrid = document.getElementById("newsGrid");

  if (!noticias.length) {
    newsGrid.innerHTML = `
      <div class="empty-message" style="grid-column:1/-1;">
        <i class="fa-regular fa-newspaper" style="font-size:25px;margin-bottom:10px;"></i>
        <br>As notícias e novidades do colégio serão publicadas em breve.
      </div>`;
    return;
  }

  newsGrid.innerHTML = noticias.map(noticia => {
    const imagem = noticia.imagem
      ? `<img src="${escapeHTML(noticia.imagem)}" alt="${escapeHTML(noticia.titulo)}" loading="lazy">`
      : `<i class="fa-regular fa-image"></i>`;

    return `
      <article class="news-card">
        <div class="news-image">${imagem}</div>
        <div class="news-content">
          <span class="news-category">${escapeHTML(noticia.categoria)}</span>
          <h3>${escapeHTML(noticia.titulo)}</h3>
          <p>${escapeHTML(noticia.descricao)}</p>
          <div class="news-date"><i class="fa-regular fa-calendar"></i> ${escapeHTML(noticia.data)}</div>
          <br>
          <a class="section-link" href="${safeLink(noticia.link)}">
            Ler notícia <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </article>`;
  }).join("");
}

/* 7. RENDERIZAÇÃO DOS AVISOS */
function renderAvisos() {
  const noticeList = document.getElementById("noticeList");

  if (!avisos.length) {
    noticeList.innerHTML = `
      <li><div class="empty-message" style="border:0;">
        Nenhum comunicado publicado no momento.
      </div></li>`;
    return;
  }

  noticeList.innerHTML = avisos.map(aviso => `
    <li>
      <a href="${safeLink(aviso.link)}">
        <i class="fa-regular fa-file-lines" style="color:var(--verde);margin-right:6px;"></i>
        ${escapeHTML(aviso.titulo)}
        <small>${escapeHTML(aviso.descricao)}</small>
      </a>
    </li>`).join("");
}

/* 8. SISTEMA DE HORÁRIOS */
const scheduleContent = document.getElementById("scheduleContent");
const scheduleTabs = document.querySelectorAll(".schedule-tab");

function renderHorario(turno) {
  const dados = horarios[turno];
  if (!dados) return;

  let conteudo = "";

  if (!dados.aulas.length) {
    conteudo = `
      <div class="schedule-placeholder">
        <i class="fa-regular fa-calendar-days"></i>
        <strong>Horários em atualização</strong>
        <p>As informações referentes ao ${dados.titulo.toLowerCase()} serão disponibilizadas em breve.</p>
      </div>`;
  } else {
    conteudo = `
      <div class="schedule-table-wrapper">
        <table class="schedule-table">
          <thead><tr><th>Aula</th><th>Início</th><th>Término</th></tr></thead>
          <tbody>
            ${dados.aulas.map(aula => `
              <tr>
                <td>${escapeHTML(aula.aula)}</td>
                <td>${escapeHTML(aula.inicio)}</td>
                <td>${escapeHTML(aula.termino)}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`;
  }

  scheduleContent.innerHTML = `
    <h3>${escapeHTML(dados.titulo)}</h3>
    <p>${escapeHTML(dados.descricao)}</p>
    ${conteudo}`;
}

scheduleTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    scheduleTabs.forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    renderHorario(tab.dataset.turno);
  });
});

renderHorario("matutino");

/* 9. MENU MOBILE / OFF-CANVAS */
const drawer = document.getElementById("mobileDrawer");
const overlay = document.getElementById("drawerOverlay");
const openButton = document.getElementById("openDrawer");
const closeButton = document.getElementById("closeDrawer");

function openMenu() {
  drawer.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("menu-open");
  drawer.setAttribute("aria-hidden", "false");
  openButton.setAttribute("aria-expanded", "true");
  closeButton.focus();
}

function closeMenu() {
  drawer.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("menu-open");
  drawer.setAttribute("aria-hidden", "true");
  openButton.setAttribute("aria-expanded", "false");
}

openButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});

/* 10. ACORDEÕES DO MENU MOBILE */
document.querySelectorAll(".drawer-accordion").forEach(button => {
  button.addEventListener("click", () => {
    const submenu = button.nextElementSibling;
    const isOpen = submenu.classList.contains("open");

    submenu.classList.toggle("open");
    button.classList.toggle("active");
    button.setAttribute("aria-expanded", String(!isOpen));
  });
});

/* 11. FECHAR MENU AO NAVEGAR */
document.querySelectorAll(".mobile-drawer a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

/* 12. CONFIGURAÇÃO DOS CONTATOS */
function configureLink(id, url) {
  const element = document.getElementById(id);

  if (url && url.trim()) {
    element.href = url;

    if (url.startsWith("https://")) {
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    }
  } else {
    element.addEventListener("click", event => {
      event.preventDefault();
      alert("Este canal de atendimento será configurado em breve.");
    });
  }
}

configureLink(
  "whatsappLink",
  CONFIG.whatsapp
    ? "https://wa.me/" + CONFIG.whatsapp.replace(/\D/g, "")
    : ""
);

configureLink(
  "emailLink",
  CONFIG.email ? "mailto:" + CONFIG.email : ""
);

configureLink("mapLink", CONFIG.mapa);

/* 13. BOTÃO VOLTAR AO TOPO */
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 350);
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* 14. ANO AUTOMÁTICO NO RODAPÉ */
document.getElementById("currentYear").textContent = new Date().getFullYear();

/* 15. INICIALIZAÇÃO */
renderNoticias();
renderAvisos();
