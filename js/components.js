/* Shared component renderers + behaviours, ported 1:1 from the JSX components.
   Each render*() function returns an HTML string; each init*() function wires
   up the interactive behaviour after the markup is in the DOM (mirrors the
   React useEffect/useState logic of the original components). */

const NAV_ROUTES = { work: "projects.html", about: "about.html", connect: "contact.html", logo: "index.html" };

/* --------------------------------- Navbar --------------------------------- */
function renderNavbar(variant, currentPath, rootPrefix) {
  rootPrefix = rootPrefix || "";
  const dark = variant === "dark";
  const cls = dark ? "sy-navbar-dark" : "sy-navbar-light";
  const linkColor = dark ? "#F5F3EF" : "#1A1A2E";
  const mutedOpacity = (href) => (currentPath === href ? 0.55 : 0.85);
  return `
  <header class="sy-navbar-wrap">
    <nav class="sy-navbar ${cls}" id="sy-navbar">
      <a class="sy-navbar-logo" href="${rootPrefix}${NAV_ROUTES.logo}" style="color:${linkColor};">SARAH.DESIGN</a>
      <div class="sy-navbar-links" id="sy-nav-group">
        <span class="sy-nav-highlight" id="sy-nav-highlight" aria-hidden="true"></span>
        <a href="${rootPrefix}${NAV_ROUTES.work}" data-nav-item class="sy-hide-mobile sy-nav-link sy-navbar-link" style="color:${linkColor};opacity:${mutedOpacity(NAV_ROUTES.work)};">
          Projects<span class="sy-nav-indicator${currentPath === NAV_ROUTES.work ? " sy-nav-indicator-active" : ""}"></span>
        </a>
        <a href="${rootPrefix}${NAV_ROUTES.about}" data-nav-item class="sy-hide-mobile sy-nav-link sy-navbar-link" style="color:${linkColor};opacity:${mutedOpacity(NAV_ROUTES.about)};">
          About<span class="sy-nav-indicator${currentPath === NAV_ROUTES.about ? " sy-nav-indicator-active" : ""}"></span>
        </a>
        <a href="${rootPrefix}${NAV_ROUTES.connect}" class="sy-btn-press sy-navbar-connect">Let&rsquo;s Connect</a>
      </div>
    </nav>
  </header>`;
}

function initNavbar() {
  const nav = document.getElementById("sy-navbar");
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add("sy-navbar-scrolled");
    else nav.classList.remove("sy-navbar-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const group = document.getElementById("sy-nav-group");
  const highlight = document.getElementById("sy-nav-highlight");
  if (!group || !highlight) return;
  const moveTo = (el) => {
    const groupRect = group.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    highlight.style.left = (rect.left - groupRect.left - 14) + "px";
    highlight.style.width = (rect.width + 28) + "px";
    highlight.style.opacity = "1";
  };
  const hide = () => { highlight.style.opacity = "0"; };
  group.querySelectorAll("[data-nav-item]").forEach((el) => {
    el.addEventListener("mouseenter", () => moveTo(el));
    el.addEventListener("mouseleave", hide);
    el.addEventListener("focus", () => moveTo(el));
    el.addEventListener("blur", hide);
  });
}

/* --------------------------------- Scroll cue --------------------------------- */
function renderScrollCue() {
  return `<button class="sy-scroll-cue-btn sy-scroll-cue" id="sy-scroll-cue" aria-label="Scroll to Home page">
    <span class="sy-scroll-cue-label">Explore</span>
  </button>`;
}

/* --------------------------------- Footer --------------------------------- */
function renderFooter(rootPrefix) {
  rootPrefix = rootPrefix || "";
  return `
  <footer class="sy-footer">
    <div class="sy-footer-inner">
      <div style="max-width:340px;">
        <p style="font-family:'Roboto',sans-serif;font-size:13px;color:#F5F3EF;margin:0;">SARAH.DESIGN</p>
        <p style="font-family:'Roboto',sans-serif;font-size:13px;line-height:1.7;color:#9A9AA3;margin-top:14px;">
          Designing thoughtful digital products that simplify complexity and create meaningful user experiences.
          <br />Melbourne, Australia.
        </p>
      </div>
      <div class="sy-footer-cols">
        <div>
          <p class="sy-footer-heading">Navigate</p>
          <div class="sy-footer-linklist">
            <a class="sy-footer-link sy-btn-press sy-footer-link-item" href="${rootPrefix}projects.html">Work</a>
            <a class="sy-footer-link sy-btn-press sy-footer-link-item" href="${rootPrefix}about.html">About</a>
            <a class="sy-footer-link sy-btn-press sy-footer-link-item" href="${rootPrefix}contact.html">Let&rsquo;s Talk</a>
          </div>
        </div>
        <div>
          <p class="sy-footer-heading">Connect</p>
          <div class="sy-footer-linklist">
            <a href="mailto:connect.sarah.design@gmail.com" class="sy-footer-link sy-footer-link-item">connect.sarah.design@gmail.com</a>
            <a href="tel:+61424323385" class="sy-footer-link sy-footer-link-item">+61 424 323 385</a>
            <a href="https://linkedin.com/in/sharayuyannawar" target="_blank" rel="noopener noreferrer" class="sy-footer-link sy-footer-link-item">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
    <div class="sy-footer-bottom">
      <p class="sy-footer-copy">&copy; 2026 Sarah.Design. All Rights Reserved.</p>
    </div>
  </footer>`;
}

/* --------------------------------- CTA band --------------------------------- */
function renderCTASection(rootPrefix) {
  rootPrefix = rootPrefix || "";
  return `
  <section class="sy-cta-section">
    <div class="sy-reveal" data-reveal>
      <h2 class="sy-heading" style="font-size:clamp(1.75rem, 3.6vw, 3rem);font-weight:500;margin:0;color:#F5F3EF;">
        Thoughtful Work<br /><span class="sy-gradient-text">Starts With A Conversation.</span>
      </h2>
      <a href="${rootPrefix}contact.html" class="sy-btn-press sy-cta-btn">Let&rsquo;s Connect</a>
    </div>
  </section>`;
}

/* --------------------------------- Reveal-on-scroll --------------------------------- */
function initReveal(root) {
  root = root || document;
  const reduced = window.SY_REDUCED_MOTION;
  const items = root.querySelectorAll("[data-reveal]");
  if (reduced) {
    items.forEach((el) => el.classList.add("sy-in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("sy-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => io.observe(el));
}

/* --------------------------------- Eyebrow / heading --------------------------------- */
function caseStudyEyebrow(text, align) {
  align = align || "left";
  return `<span style="display:block;font-family:'Roboto',sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#75757F;text-align:${align};">${text}</span>`;
}

function caseStudyHeading(lineOne, lineTwo, align, onDark) {
  align = align || "left";
  return `<h2 class="sy-heading" style="font-size:clamp(1.75rem, 3.4vw, 2.75rem);line-height:1.18;font-weight:500;margin:12px 0 0;color:${onDark ? "#F5F3EF" : "#1A1A2E"};text-align:${align};">
    ${lineOne}${lineTwo ? `<br /><span style="color:#8B7FD4;">${lineTwo}</span>` : ""}
  </h2>`;
}

/* --------------------------------- Project cards (Home route) --------------------------------- */
function renderCardCta(ctaPosition) {
  const posStyle = ctaPosition === "bottom-left" ? "left:32px;bottom:32px;" : "right:32px;bottom:32px;";
  return `<span class="sy-card-cta sy-btn-press" style="position:absolute;${posStyle}display:inline-flex;align-items:center;gap:8px;font-family:'Roboto',sans-serif;font-size:13px;color:#fff;background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.2);border-radius:9999px;padding:10px 18px;cursor:pointer;transition:background 300ms cubic-bezier(0.16,1,0.3,1), border-color 300ms cubic-bezier(0.16,1,0.3,1);">
    <span class="sy-card-cta-arrow" style="display:inline-block;transition:transform 300ms cubic-bezier(0.16,1,0.3,1);">&rarr;</span> View Case Study
  </span>`;
}

function renderProjectCard(project, rootPrefix) {
  rootPrefix = rootPrefix || "";
  return `
  <a href="${rootPrefix}${project.route}" class="sy-reveal sy-project-card sy-project-card-link" data-reveal style="position:relative;border-radius:24px;overflow:hidden;width:100%;aspect-ratio:${project.nativeWidth} / ${project.nativeHeight};display:block;text-decoration:none;">
    <img src="${project.image}" alt="${project.title}" class="sy-project-card-img" style="display:block;width:100%;height:100%;object-fit:contain;transition:transform 450ms cubic-bezier(0.16,1,0.3,1);" />
    ${renderCardCta(project.ctaPosition)}
  </a>`;
}

function initProjectCards(root) {
  root = root || document;
  root.querySelectorAll(".sy-project-card-link").forEach((card) => {
    const img = card.querySelector(".sy-project-card-img");
    const cta = card.querySelector(".sy-card-cta");
    const arrow = card.querySelector(".sy-card-cta-arrow");
    card.addEventListener("mouseenter", () => {
      if (img) img.style.transform = "scale(1.02)";
      if (cta) { cta.style.background = "rgba(0,0,0,0.5)"; cta.style.borderColor = "rgba(255,255,255,0.35)"; }
    });
    card.addEventListener("mouseleave", () => {
      if (img) img.style.transform = "scale(1)";
      if (cta) { cta.style.background = "rgba(0,0,0,0.35)"; cta.style.borderColor = "rgba(255,255,255,0.2)"; }
      if (arrow) arrow.style.transform = "translateX(0)";
    });
    if (cta && arrow) {
      cta.addEventListener("mouseenter", () => { arrow.style.transform = "translateX(4px)"; });
      cta.addEventListener("mouseleave", () => { arrow.style.transform = "translateX(0)"; });
    }
  });
}

/* --------------------------------- Trusted-by / testimonial --------------------------------- */
function renderTrustedSection() {
  const tabs = PRINCIPLES.map((label, i) => `
    <button role="tab" data-principle-tab="${i}" aria-selected="${i === 0}" class="sy-tab-pill" style="font-family:'Roboto',sans-serif;font-size:13px;padding:9px 18px;border-radius:9999px;cursor:pointer;transition:background 300ms cubic-bezier(0.16,1,0.3,1), border-color 300ms cubic-bezier(0.16,1,0.3,1), color 300ms cubic-bezier(0.16,1,0.3,1), transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms cubic-bezier(0.16,1,0.3,1);border:1px solid ${i === 0 ? "#1A1A2E" : "#E7E2D9"};background:${i === 0 ? "#1A1A2E" : "transparent"};color:${i === 0 ? "#FFFFFF" : "#1A1A2E"};">${label}</button>
  `).join("");
  const dots = PRINCIPLES.map((label, i) => `<button class="sy-tab-dot" data-principle-dot="${i}" aria-label="Show ${label} testimonial" style="background:${i === 0 ? "#1A1A2E" : "#D9D4CA"};"></button>`).join("");
  return `
  <section style="padding:96px 24px;background:#FAF7F2;">
    <div style="max-width:900px;margin:0 auto;text-align:center;">
      <div class="sy-reveal" data-reveal>
        <h2 class="sy-heading" style="font-size:clamp(1.75rem, 3.4vw, 2.75rem);color:#1A1A2E;font-weight:500;margin:0;">
          Trusted By Teams Building<br /><span style="color:#8B7FD4;">Products That Matter.</span>
        </h2>
      </div>
      <div class="sy-reveal" data-reveal style="transition-delay:100ms;">
        <div role="tablist" aria-label="Testimonial principles" style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:40px;" id="sy-principle-tabs">${tabs}</div>
      </div>
      <div class="sy-reveal" data-reveal style="transition-delay:180ms;">
        <div style="margin-top:48px;min-height:260px;">
          <div style="font-size:40px;color:#D5BBE0;line-height:1;font-family:'Cormorant Garamond',serif;">&ldquo;&rdquo;</div>
          <div id="sy-testimonial-content">
            <p style="font-family:'Roboto',sans-serif;font-size:clamp(15px, 1.6vw, 18px);line-height:1.6;color:#1A1A2E;max-width:640px;margin:0 auto;">&ldquo;${TESTIMONIALS[0].quote}&rdquo;</p>
            <p style="margin-top:24px;font-family:'Roboto',sans-serif;font-weight:700;color:#1A1A2E;margin:24px 0 0;">${TESTIMONIALS[0].name}</p>
            <p style="font-family:'Roboto',sans-serif;font-size:13px;color:#75757F;margin:2px 0 0;">${TESTIMONIALS[0].role}</p>
          </div>
        </div>
      </div>
      <div style="display:flex;justify-content:center;gap:8px;margin-top:24px;" id="sy-principle-dots">${dots}</div>
    </div>
  </section>`;
}

function initTrustedSection() {
  const tabsWrap = document.getElementById("sy-principle-tabs");
  const dotsWrap = document.getElementById("sy-principle-dots");
  const content = document.getElementById("sy-testimonial-content");
  if (!tabsWrap || !content) return;
  let active = 0;
  const setActive = (i) => {
    active = i;
    tabsWrap.querySelectorAll("[data-principle-tab]").forEach((btn, idx) => {
      const isActive = idx === i;
      btn.setAttribute("aria-selected", isActive);
      btn.style.border = "1px solid " + (isActive ? "#1A1A2E" : "#E7E2D9");
      btn.style.background = isActive ? "#1A1A2E" : "transparent";
      btn.style.color = isActive ? "#FFFFFF" : "#1A1A2E";
    });
    if (dotsWrap) {
      dotsWrap.querySelectorAll("[data-principle-dot]").forEach((dot, idx) => {
        dot.style.background = idx === i ? "#1A1A2E" : "#D9D4CA";
      });
    }
    const t = TESTIMONIALS[i];
    content.style.animation = window.SY_REDUCED_MOTION ? "none" : "sy-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards";
    content.innerHTML = `
      <p style="font-family:'Roboto',sans-serif;font-size:clamp(15px, 1.6vw, 18px);line-height:1.6;color:#1A1A2E;max-width:640px;margin:0 auto;">&ldquo;${t.quote}&rdquo;</p>
      <p style="margin-top:24px;font-family:'Roboto',sans-serif;font-weight:700;color:#1A1A2E;margin:24px 0 0;">${t.name}</p>
      <p style="font-family:'Roboto',sans-serif;font-size:13px;color:#75757F;margin:2px 0 0;">${t.role}</p>`;
  };
  tabsWrap.querySelectorAll("[data-principle-tab]").forEach((btn, idx) => {
    btn.addEventListener("click", () => setActive(idx));
  });
  if (dotsWrap) {
    dotsWrap.querySelectorAll("[data-principle-dot]").forEach((dot, idx) => {
      dot.addEventListener("click", () => setActive(idx));
    });
  }
  if (!window.SY_REDUCED_MOTION) {
    setInterval(() => setActive((active + 1) % PRINCIPLES.length), 3000);
  }
}

/* --------------------------------- Logo strip --------------------------------- */
function renderLogoStrip() {
  const logos = LOGOS.map((logo) => `<img src="${logo.src}" alt="${logo.name}" style="height:44px;width:auto;filter:grayscale(100%);opacity:1;" />`).join("");
  return `
  <section style="padding:0 24px 96px;background:#FAF7F2;">
    <div class="sy-reveal" data-reveal>
      <div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:48px;">${logos}</div>
    </div>
  </section>`;
}

/* --------------------------------- View more / next project --------------------------------- */
function renderViewMoreProjectsSection(rootPrefix) {
  rootPrefix = rootPrefix || "";
  const cards = VIEW_MORE_ITEMS.map((project, i) => `
    <a href="${rootPrefix}${project.route}" class="sy-reveal sy-project-card sy-vmp-card" data-reveal style="transition-delay:${i * 80}ms;display:block;width:100%;text-align:left;background:none;border:none;padding:0;cursor:pointer;border-radius:16px;overflow:hidden;position:relative;z-index:1;text-decoration:none;">
      <div style="aspect-ratio:410 / 276;overflow:hidden;">
        <img src="${project.image}" alt="${project.title}" class="sy-vmp-img" style="width:100%;height:100%;object-fit:cover;transition:transform 450ms cubic-bezier(0.16,1,0.3,1);" />
      </div>
      <div style="background:#F5F3EF;padding:18px 20px;">
        <h4 class="sy-heading" style="font-size:1rem;font-weight:500;color:#1A1A2E;margin:0;">${project.title}</h4>
        <p style="font-family:'Roboto',sans-serif;font-size:12px;color:#75757F;margin:4px 0 0;">Enterprise Design | Pwc</p>
      </div>
    </a>
  `).join("");
  return `
  <section style="padding:96px 24px;background:#0A0A0C;">
    <div style="max-width:1200px;margin:0 auto;">
      <div class="sy-reveal" data-reveal>
        <span style="font-family:'Roboto',sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#75757F;">View More Projects</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(${VIEW_MORE_ITEMS.length}, 1fr);gap:24px;margin-top:28px;" class="sy-vmp-grid">${cards}</div>
    </div>
  </section>
  <style>@media (max-width: 900px) { .sy-vmp-grid { grid-template-columns: 1fr !important; } }</style>`;
}

function initViewMoreCards(root) {
  root = root || document;
  root.querySelectorAll(".sy-vmp-card").forEach((card) => {
    const img = card.querySelector(".sy-vmp-img");
    card.addEventListener("mouseenter", () => { if (img) img.style.transform = "scale(1.02)"; });
    card.addEventListener("mouseleave", () => { if (img) img.style.transform = "scale(1)"; });
  });
}

function renderNextProjectSection(nextRoute, nextTitle, rootPrefix) {
  rootPrefix = rootPrefix || "";
  return `
  <section style="padding:140px 24px;background:#0A0A0C;">
    <div class="sy-reveal" data-reveal>
      <div style="max-width:1200px;margin:0 auto;">
        <span style="font-family:'Roboto',sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#75757F;">Next Project</span>
        <a href="${rootPrefix}${nextRoute}" class="sy-btn-press sy-next-project" style="display:flex;align-items:center;justify-content:space-between;width:100%;margin-top:28px;background:none;border:none;border-top:1px solid #232326;padding-top:40px;cursor:pointer;text-align:left;gap:24px;text-decoration:none;">
          <span class="sy-heading sy-next-title" style="font-size:clamp(1.5rem, 3.2vw, 2.5rem);font-weight:500;color:#F5F3EF;opacity:0.85;transition:opacity 350ms ease;">${nextTitle}</span>
          <span class="sy-next-arrow" style="flex-shrink:0;width:52px;height:52px;border-radius:9999px;border:1px solid rgba(255,255,255,0.25);display:flex;align-items:center;justify-content:center;color:#F5F3EF;background:transparent;transform:translateX(0);transition:transform 350ms cubic-bezier(0.16,1,0.3,1), background 350ms ease;">${icon("arrowRight", 20)}</span>
        </a>
      </div>
    </div>
  </section>`;
}

function initNextProjectSection(root) {
  root = root || document;
  const link = root.querySelector(".sy-next-project");
  if (!link) return;
  const title = link.querySelector(".sy-next-title");
  const arrow = link.querySelector(".sy-next-arrow");
  link.addEventListener("mouseenter", () => {
    if (title) title.style.opacity = "1";
    if (arrow) { arrow.style.transform = "translateX(6px)"; arrow.style.background = "rgba(255,255,255,0.08)"; }
  });
  link.addEventListener("mouseleave", () => {
    if (title) title.style.opacity = "0.85";
    if (arrow) { arrow.style.transform = "translateX(0)"; arrow.style.background = "transparent"; }
  });
}

/* --------------------------------- Preloader --------------------------------- */
function initPreloader() {
  const el = document.getElementById("sy-preloader");
  if (!el) return;
  if (window.SY_SKIP_PRELOADER) { el.remove(); return; }
  if (window.SY_REDUCED_MOTION) { el.remove(); return; }
  setTimeout(() => el.classList.add("sy-preloader-out"), 1050);
  setTimeout(() => el.remove(), 1600);
}
