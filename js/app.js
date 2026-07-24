/* App bootstrap + per-page render functions.
   Each HTML page sets window.SY_PAGE and window.SY_IMG_BASE inline, then loads
   icons.js, data.js, components.js, app.js in that order. On DOMContentLoaded
   this file renders the page body into #app (mirroring each React route),
   then wires up shared + page-specific interactivity. */

(function () {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.SY_REDUCED_MOTION = mq.matches;
  mq.addEventListener ? mq.addEventListener("change", (e) => { window.SY_REDUCED_MOTION = e.matches; }) : null;
})();

/* --------------------------------- Page renderers --------------------------------- */

function pageLanding() {
  return `
  <section style="height:100vh;background:#0A0A0C;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
    ${renderNavbar("dark", "index.html")}
    <div style="flex:1;display:flex;align-items:center;padding:0 24px;">
      <div style="max-width:1100px;margin:0 auto;text-align:center;">
        <h1 class="sy-heading sy-gradient-text sy-gradient-live sy-fade-up" id="sy-landing-title" style="font-size:clamp(2.25rem, 5.5vw, 5.75rem);line-height:1.12;font-weight:500;margin:0;">
          Designing Clarity For<br />Complex Digital Products.
        </h1>
        <p class="sy-fade-up" id="sy-landing-sub" style="margin-top:28px;font-family:'Roboto',sans-serif;font-size:clamp(13px, 1.2vw, 16px);letter-spacing:0.05em;color:#9A9AA3;animation-delay:220ms;">
          UX/UI Designer · Enterprise Systems · Melbourne, Australia
        </p>
      </div>
    </div>
    <div class="sy-fade-up" id="sy-landing-cue" style="display:flex;justify-content:center;padding-bottom:48px;animation-delay:500ms;">
      ${renderScrollCue()}
    </div>
  </section>`;
}

function initLanding() {
  initNavbar();
  const cue = document.getElementById("sy-scroll-cue");
  let triggered = false;
  const goHome = () => {
    if (triggered) return;
    triggered = true;
    if (window.SY_REDUCED_MOTION) { window.location.href = "home.html"; return; }
    document.body.style.transition = "opacity 700ms cubic-bezier(0.65,0,0.35,1), transform 700ms cubic-bezier(0.65,0,0.35,1)";
    document.body.style.opacity = "0";
    document.body.style.transform = "translateY(-24px)";
    setTimeout(() => { window.location.href = "home.html"; }, 650);
  };
  if (cue) cue.addEventListener("click", goHome);
  let touchStartY = null;
  window.addEventListener("wheel", (e) => { if (e.deltaY > 25) goHome(); }, { passive: true });
  window.addEventListener("touchstart", (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener("touchmove", (e) => {
    if (touchStartY == null) return;
    if (touchStartY - e.touches[0].clientY > 50) goHome();
  }, { passive: true });
}

function pageHome() {
  const cards = `
    ${renderProjectCard(PROJECTS[0], "")}
    <div class="sy-project-row" style="display:grid;grid-template-columns:${PROJECTS[1].nativeWidth}fr ${PROJECTS[2].nativeWidth}fr;gap:24px;align-items:start;">
      ${renderProjectCard(PROJECTS[1], "")}
      ${renderProjectCard(PROJECTS[2], "")}
    </div>`;
  return `
  <div id="sy-home-fade" style="opacity:${window.SY_REDUCED_MOTION ? 1 : 0};transition:opacity 800ms cubic-bezier(0.16,1,0.3,1);">
    <section style="background:${GRADIENT_SOFT};padding-top:160px;padding-bottom:340px;padding-left:24px;padding-right:24px;">
      ${renderNavbar("light", "home.html")}
      <div style="max-width:760px;margin:0 auto;text-align:center;">
        <h1 class="sy-heading sy-fade-up" style="font-size:clamp(1.75rem, 4vw, 3.25rem);line-height:1.15;font-weight:500;margin:0;color:#1A1A2E;">
          Products Shaped By<br /><span style="color:#8B7FD4;">Research, Strategy, And Execution.</span>
        </h1>
        <p class="sy-fade-up" style="margin-top:24px;font-family:'Roboto',sans-serif;font-size:15px;line-height:1.7;color:#75757F;animation-delay:150ms;">
          A Selection Of Enterprise Platforms And Digital Experiences Designed To Simplify Complex Systems Across
          Finance, Government, Education And Consumer Products.
        </p>
      </div>
    </section>
    <section style="background:#FAF7F2;padding:0 24px 32px;margin-top:-250px;">
      <div style="max-width:1200px;margin:0 auto;display:flex;flex-direction:column;gap:24px;">${cards}</div>
    </section>
    ${renderTrustedSection()}
    ${renderLogoStrip()}
    ${renderCTASection("")}
    ${renderFooter("")}
  </div>`;
}

function initHome() {
  initNavbar();
  initProjectCards();
  initTrustedSection();
  const fadeEl = document.getElementById("sy-home-fade");
  if (fadeEl && !window.SY_REDUCED_MOTION) {
    requestAnimationFrame(() => { fadeEl.style.opacity = "1"; });
  }
  // Logo click on Home mirrors the original reverse fade-transition back to Landing.
  const logo = document.querySelector(".sy-navbar-logo");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.SY_REDUCED_MOTION) { window.location.href = "index.html"; return; }
      document.body.style.transition = "opacity 700ms cubic-bezier(0.65,0,0.35,1), transform 700ms cubic-bezier(0.65,0,0.35,1)";
      document.body.style.opacity = "0";
      document.body.style.transform = "translateY(24px)";
      setTimeout(() => { window.location.href = "index.html"; }, 650);
    });
  }
}

/* --------------------------------- Case-study meta grid + hero back link ---------------------------------- */
function csBackLink(rootPrefix) {
  return `<a href="${rootPrefix}home.html" class="sy-back-link" style="color:#75757F;">&larr; Back</a>`;
}

function csMetaGrid(items) {
  const cells = items.map((m, i) => `
    <div style="padding:18px 20px;border-left:${i === 0 ? "none" : "1px solid #E7E2D9"};text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;">
      ${icon(m.icon, 16, "color:#8B7FD4;")}
      <p style="font-family:'Roboto',sans-serif;font-size:10px;letter-spacing:0.14em;color:#9A9A9A;margin:0;">${m.label}</p>
      <p style="font-family:'Roboto',sans-serif;font-size:13px;color:#1A1A2E;margin:0;">${m.value}</p>
    </div>`).join("");
  return `<div class="sy-meta-grid" style="display:grid;grid-template-columns:repeat(4, 1fr);border:1px solid #E7E2D9;border-radius:16px;overflow:hidden;margin-top:40px;max-width:900px;margin-left:auto;margin-right:auto;background:#FFFFFF;">${cells}</div>`;
}

function csTintCard(card) {
  return `
  <div class="sy-reveal" data-reveal style="background:${card.tint};border-radius:18px;padding:28px 24px;height:100%;">
    ${iconBadge(card.icon, { badgeSize: 44, size: 20, shape: "square", gradient: true })}
    <h3 class="sy-heading" style="font-size:1.15rem;font-weight:500;color:#1A1A2E;margin:18px 0 0;">${card.title}</h3>
    <p style="font-family:'Roboto',sans-serif;font-size:12.5px;line-height:1.6;color:#75757F;margin:8px 0 0;">${card.description}</p>
  </div>`;
}

function csListItem(item, badgeSize, iconSize) {
  return `
  <div class="sy-reveal" data-reveal style="display:flex;align-items:flex-start;gap:14px;">
    ${iconBadge(item.icon, { badgeSize: badgeSize || 48, size: iconSize || 22 })}
    <div>
      <h4 style="font-family:'Roboto',sans-serif;font-size:14px;font-weight:500;color:#1A1A2E;margin:0;">${item.title}</h4>
      <p style="font-family:'Roboto',sans-serif;font-size:13px;color:#75757F;margin:4px 0 0;">${item.description}</p>
    </div>
  </div>`;
}

function csTabSwitcher(idPrefix, tabs, bgColor, initialIndex) {
  initialIndex = initialIndex || 0;
  const buttons = tabs.map((t, i) => `<button data-tab-btn="${i}" style="font-family:'Roboto',sans-serif;font-size:13px;padding:9px 20px;border-radius:9999px;border:none;cursor:pointer;background:${i === initialIndex ? "#1A1A2E" : "transparent"};color:${i === initialIndex ? "#FFFFFF" : "#1A1A2E"};transition:all 300ms ease;">${t.label}</button>`).join("");
  const dots = tabs.map((t, i) => `<button data-tab-dot="${i}" aria-label="Show ${t.label}" class="sy-tab-dot" style="background:${i === initialIndex ? "#1A1A2E" : "#D9D4CA"};"></button>`).join("");
  return `
  <div id="${idPrefix}" data-bg="${bgColor}">
    <div class="sy-reveal" data-reveal style="transition-delay:100ms;">
      <div style="display:inline-flex;gap:6px;margin-top:32px;background:#FAF7F2;border-radius:9999px;padding:6px;" data-tab-buttons>${buttons}</div>
    </div>
    <div class="sy-reveal" data-reveal style="transition-delay:180ms;">
      <div style="margin-top:40px;border-radius:24px;overflow:hidden;background:${bgColor};padding:8px;">
        <img data-tab-image src="${tabs[initialIndex].image}" alt="${tabs[initialIndex].label}" style="width:100%;height:auto;display:block;border-radius:18px;" />
      </div>
      <p data-tab-caption style="max-width:620px;margin:24px auto 0;font-family:'Roboto',sans-serif;font-size:13px;line-height:1.7;color:#75757F;"></p>
      <div style="display:flex;justify-content:center;gap:8px;margin-top:20px;" data-tab-dots>${dots}</div>
    </div>
  </div>`;
}

function initTabSwitcher(idPrefix, tabs, caption, intervalMs, initialIndex) {
  const wrap = document.getElementById(idPrefix);
  if (!wrap) return;
  const img = wrap.querySelector("[data-tab-image]");
  const cap = wrap.querySelector("[data-tab-caption]");
  const btns = wrap.querySelectorAll("[data-tab-btn]");
  const dots = wrap.querySelectorAll("[data-tab-dot]");
  if (cap) cap.textContent = caption || "";
  let active = initialIndex || 0;
  const setActive = (i) => {
    active = i;
    btns.forEach((b, idx) => {
      const isActive = idx === i;
      b.style.background = isActive ? "#1A1A2E" : "transparent";
      b.style.color = isActive ? "#FFFFFF" : "#1A1A2E";
    });
    dots.forEach((d, idx) => { d.style.background = idx === i ? "#1A1A2E" : "#D9D4CA"; });
    if (img) {
      img.style.animation = "none";
      img.src = tabs[i].image;
      img.alt = tabs[i].label;
      if (!window.SY_REDUCED_MOTION) {
        void img.offsetWidth;
        img.style.animation = "sy-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards";
      }
    }
  };
  btns.forEach((b, idx) => b.addEventListener("click", () => setActive(idx)));
  dots.forEach((d, idx) => d.addEventListener("click", () => setActive(idx)));
  if (!window.SY_REDUCED_MOTION) {
    setInterval(() => setActive((active + 1) % tabs.length), intervalMs || 3000);
  }
}

function csReflection(heading1, heading2, body) {
  return `
  <section style="padding:100px 24px;background:${GRADIENT_SOFT};">
    <div class="sy-reveal" data-reveal>
      <div style="max-width:720px;margin:0 auto;text-align:center;">
        ${caseStudyEyebrow("Reflection", "center")}
        <div style="display:flex;justify-content:center;margin-top:16px;">${icon("quote", 30, "color:#8B7FD4;")}</div>
        <h2 class="sy-heading" style="font-size:clamp(1.5rem, 2.8vw, 2.25rem);font-weight:500;margin:8px 0 0;color:#1A1A2E;">
          ${heading1}<br /><span style="color:#8B7FD4;">${heading2}</span>
        </h2>
        <p style="margin-top:20px;font-family:'Roboto',sans-serif;font-size:14px;line-height:1.75;color:#4A4A52;">${body}</p>
      </div>
    </div>
  </section>`;
}

/* --------------------------------- Treasury page --------------------------------- */
function pageTreasury() {
  const rp = "../";
  const challengeCards = TREASURY_CHALLENGE_CARDS.map(csTintCard).join("");
  const track = TREASURY_PROCESS_STEPS.map((step, i) => `
    <div class="sy-reveal" data-reveal style="flex:1;text-align:center;position:relative;z-index:1;">
      ${gradientRingBadge(step.icon, { color: step.color, pastel: step.pastel, step: i + 1 })}
      <p style="margin-top:14px;font-family:'Roboto',sans-serif;font-size:12px;color:${step.color};line-height:1.4;font-weight:500;">${step.label}</p>
    </div>`).join("");
  const contribution = TREASURY_CONTRIBUTION.map((i) => csListItem(i, 48, 22)).join("");
  const impact = TREASURY_IMPACT.map((i) => csListItem(i, 48, 22)).join("");

  return `
  <div style="background:#FAF7F2;">
    ${renderNavbar("light", "", rp)}
    <section style="padding:160px 24px 0;">
      <div style="max-width:1200px;margin:0 auto;">
        ${csBackLink(rp)}
        <div class="sy-reveal" data-reveal style="text-align:center;margin-top:28px;">
          <h1 class="sy-heading" style="font-size:clamp(2rem, 4.2vw, 3.25rem);line-height:1.15;font-weight:500;margin:0;color:#1A1A2E;">
            Government Treasury<br /><span style="color:#8B7FD4;">Finance Platform</span>
          </h1>
          <p style="max-width:620px;margin:20px auto 0;font-family:'Roboto',sans-serif;font-size:14px;line-height:1.7;color:#75757F;">
            Designing A Modern Treasury Platform That Simplified Complex Financial Workflows While Maintaining
            Strict Compliance And Audit Requirements.
          </p>
        </div>
        <div class="sy-reveal" data-reveal style="transition-delay:140ms;">${csMetaGrid(TREASURY_META)}</div>
        <div class="sy-reveal" data-reveal style="transition-delay:220ms;margin-top:48px;border-radius:24px;overflow:hidden;background:#173A56;padding:8px;">
          <img src="${TREASURY_HERO}" alt="Government Treasury Finance Platform — hero mockup" style="width:100%;height:auto;display:block;border-radius:18px;" />
        </div>
      </div>
    </section>

    <section style="padding:120px 24px 0;">
      <div class="sy-cs-challenge" style="max-width:1200px;margin:0 auto;display:flex;gap:40px;align-items:flex-start;">
        <div class="sy-reveal" data-reveal style="flex:0 0 300px;">
          ${caseStudyEyebrow("The Challenge")}
          ${caseStudyHeading("Enterprise Complexity,", "Made Usable.")}
          <p style="margin-top:16px;font-family:'Roboto',sans-serif;font-size:13px;line-height:1.7;color:#75757F;">
            Government Finance Teams Relied On A Legacy Platform Where Approvals, Reporting And Payments Were
            Slow, Fragmented And Difficult To Navigate.
          </p>
        </div>
        <div class="sy-cs-grid-3" style="flex:1;display:grid;grid-template-columns:repeat(3, 1fr);gap:20px;">${challengeCards}</div>
      </div>
    </section>

    <section style="padding:120px 24px 0;">
      <div class="sy-cs-process" style="max-width:1200px;margin:0 auto;display:flex;gap:64px;align-items:center;">
        <div class="sy-reveal" data-reveal style="flex:1.4;position:relative;">
          <div class="sy-cs-timeline sy-process-track" style="display:flex;position:relative;">
            <div class="sy-timeline-line sy-process-line" style="position:absolute;left:0;right:0;top:21px;border-top:1px dashed #D9D4CA;z-index:0;"></div>
            ${track}
          </div>
        </div>
        <div class="sy-reveal" data-reveal style="transition-delay:120ms;flex:1;">
          ${caseStudyEyebrow("The Process")}
          ${caseStudyHeading("From Research", "To Release.")}
          <p style="margin-top:16px;font-family:'Roboto',sans-serif;font-size:13px;line-height:1.7;color:#75757F;">
            Every Design Decision Was Validated Through Stakeholder Collaboration, Workflow Testing And
            Iterative Design Before Engineering Handoff.
          </p>
        </div>
      </div>
    </section>

    <section style="padding:120px 24px;margin-top:64px;background:#FFFFFF;">
      <div style="max-width:1200px;margin:0 auto;text-align:center;">
        <div class="sy-reveal" data-reveal>
          ${caseStudyEyebrow("&nbsp;", "center")}
          <h2 class="sy-heading" style="font-size:clamp(1.75rem, 3.4vw, 2.75rem);font-weight:500;margin:0;color:#1A1A2E;">The Solution<br /><span style="color:#8B7FD4;">Designing For Clarity.</span></h2>
        </div>
        ${csTabSwitcher("sy-treasury-tabs", TREASURY_TABS, "#173A56", 2)}
      </div>
    </section>

    <section style="padding:120px 24px;">
      <div style="max-width:1200px;margin:0 auto;">
        <div class="sy-reveal" data-reveal>
          ${caseStudyEyebrow("&nbsp;", "center")}
          <h2 class="sy-heading" style="text-align:center;font-size:clamp(1.75rem, 3.4vw, 2.75rem);font-weight:500;margin:0;color:#1A1A2E;">From Insight<br /><span style="color:#8B7FD4;">To Implementation.</span></h2>
          <p style="max-width:620px;margin:16px auto 0;text-align:center;font-family:'Roboto',sans-serif;font-size:14px;line-height:1.7;color:#75757F;">
            Every Design Decision Was Grounded In Real Operational Workflows, Validated With Treasury
            Stakeholders, And Refined Into Production-Ready Enterprise Experiences.
          </p>
        </div>
        <div class="sy-cs-grid-2" style="display:grid;grid-template-columns:1fr 1fr;gap:64px;margin-top:56px;">
          <div>${caseStudyEyebrow("My Contribution")}<div style="display:flex;flex-direction:column;gap:22px;margin-top:20px;">${contribution}</div></div>
          <div>${caseStudyEyebrow("What It Enabled")}<div style="display:flex;flex-direction:column;gap:22px;margin-top:20px;">${impact}</div></div>
        </div>
      </div>
    </section>

    ${csReflection("Enterprise Design", "Is Built On Alignment.", "The Strongest Solutions Emerged From Aligning User Needs, Stakeholder Priorities, And Regulatory Requirements Throughout The Design Process. Rather Than Treating Compliance As A Constraint, This Project Demonstrated How Thoughtful Product Design Can Make Complex Enterprise Systems More Intuitive, Transparent, And Efficient.")}

    ${renderViewMoreProjectsSection(rp)}
    ${renderCTASection(rp)}
    ${renderFooter(rp)}
  </div>`;
}

function initTreasury() {
  initNavbar();
  initTabSwitcher("sy-treasury-tabs", TREASURY_TABS, "Desktop And Mobile Experiences Designed To Support High-Volume Banking Workflows With Clarity, Consistency And Scalability.", 3000, 2);
  initViewMoreCards();
}

/* --------------------------------- MSME page --------------------------------- */
function pageMsme() {
  const rp = "../";
  const opportunityCards = MSME_OPPORTUNITY_CARDS.map(csTintCard).join("");
  const contribution = MSME_CONTRIBUTION.map((i) => csListItem(i, 36, 16)).join("");
  const impact = MSME_IMPACT.map(csTintCard).join("");

  return `
  <div style="background:#FAF7F2;">
    ${renderNavbar("light", "", rp)}
    <section style="padding:160px 24px 0;">
      <div style="max-width:1200px;margin:0 auto;">
        ${csBackLink(rp)}
        <div class="sy-reveal" data-reveal style="transition-delay:60ms;">
          <div class="sy-msme-hero-grid" style="display:grid;grid-template-columns:1fr auto 1fr;align-items:start;gap:20px;margin-top:28px;">
            <div class="sy-msme-award-slot" style="justify-self:end;padding-top:4px;">
              <img src="${MSME_AWARD}" alt="Above &amp; Beyond Award — PwC" style="width:192px;height:192px;display:block;" />
            </div>
            <div style="text-align:center;max-width:620px;">
              <h1 class="sy-heading" style="font-size:clamp(2rem, 4.2vw, 3.25rem);line-height:1.15;font-weight:500;margin:0;color:#1A1A2E;">
                Designing MSME<br /><span style="color:#8B7FD4;">Banking At Scale.</span>
              </h1>
              <p style="margin-top:20px;font-family:'Roboto',sans-serif;font-size:14px;line-height:1.7;color:#75757F;">
                Designing A Unified Banking Experience That Simplified Everyday Financial Journeys Across Mobile
                And Web While Supporting A Growing Ecosystem Of Enterprise Banking Products.
              </p>
            </div>
            <div></div>
          </div>
        </div>
        <div class="sy-reveal" data-reveal style="transition-delay:140ms;">${csMetaGrid(MSME_META)}</div>
        <div class="sy-reveal" data-reveal style="transition-delay:220ms;margin-top:48px;text-align:center;">
          <img src="${MSME_HERO}" alt="Designing MSME Banking At Scale — hero mockup" style="max-width:100%;height:auto;display:inline-block;" />
        </div>
      </div>
    </section>

    <section style="padding:120px 24px 0;">
      <div class="sy-cs-challenge" style="max-width:1200px;margin:0 auto;display:flex;gap:40px;align-items:flex-start;">
        <div class="sy-reveal" data-reveal style="flex:0 0 430px;">
          ${caseStudyEyebrow("The Opportunity")}
          ${caseStudyHeading("Banking Designed", "For Growing Businesses.")}
          <p style="margin-top:16px;font-family:'Roboto',sans-serif;font-size:13px;line-height:1.7;color:#75757F;">
            MSME Customers Relied On Fragmented Digital Experiences That Made Routine Banking Tasks
            Unnecessarily Complex. The Goal Was To Create A Scalable Product That Made Essential Financial
            Services Easier To Navigate And Understand.
          </p>
        </div>
        <div class="sy-cs-grid-3" style="flex:1;display:grid;grid-template-columns:repeat(3, 1fr);gap:20px;">${opportunityCards}</div>
      </div>
    </section>

    <section style="padding:120px 24px;margin-top:64px;background:#FFFFFF;">
      <div style="max-width:1200px;margin:0 auto;text-align:center;">
        <div class="sy-reveal" data-reveal>
          ${caseStudyEyebrow("&nbsp;", "center")}
          <h2 class="sy-heading" style="font-size:clamp(1.75rem, 3.4vw, 2.75rem);font-weight:500;margin:0;color:#1A1A2E;">One Platform.<br /><span style="color:#8B7FD4;">Multiple Journeys.</span></h2>
          <p style="max-width:620px;margin:16px auto 0;font-family:'Roboto',sans-serif;font-size:14px;line-height:1.7;color:#75757F;">
            Rather Than Designing Isolated Screens, Every Experience Was Considered Part Of A Connected Banking
            Ecosystem. Product Decisions Balanced Customer Needs, Business Goals And Technical Constraints
            Throughout The Design Process.
          </p>
        </div>
        ${csTabSwitcher("sy-msme-tabs", MSME_TABS, "#12474F")}
      </div>
    </section>

    <section style="padding:120px 24px;">
      <div class="sy-cs-grid-2" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:0.45fr 1.55fr;gap:64px;align-items:center;">
        <div class="sy-reveal" data-reveal>
          ${caseStudyEyebrow("My Contribution")}
          ${caseStudyHeading("Driving Product", "Design Execution.")}
          <div style="display:flex;flex-direction:column;gap:22px;margin-top:28px;">${contribution}</div>
        </div>
        <div class="sy-reveal" data-reveal style="transition-delay:120ms;border-radius:24px;overflow:hidden;background:#12474F;padding:8px;">
          <div style="border-radius:18px;overflow:hidden;aspect-ratio:1008 / 622;">
            <img src="${MSME_FINALUI}" alt="Designing MSME Banking At Scale — final desktop and mobile experience" style="width:100%;height:100%;object-fit:cover;object-position:top;display:block;" />
          </div>
        </div>
      </div>
    </section>

    <section style="padding:0 24px 120px;">
      <div style="max-width:1200px;margin:0 auto;">
        <div class="sy-reveal" data-reveal>
          ${caseStudyEyebrow("Impact", "center")}
          <h2 class="sy-heading" style="text-align:center;font-size:clamp(1.75rem, 3.4vw, 2.75rem);font-weight:500;margin:0;color:#1A1A2E;">Delivering Value<br /><span style="color:#8B7FD4;">Beyond The Interface.</span></h2>
        </div>
        <div class="sy-cs-grid-3" style="display:grid;grid-template-columns:repeat(3, 1fr);gap:20px;margin-top:56px;">${impact}</div>
      </div>
    </section>

    ${csReflection("Designing Products", "People Rely On.", "Enterprise Banking Products Demand More Than Polished Interfaces — They Require Clarity, Consistency And Trust At Every Interaction. This Project Strengthened My Ability To Translate Complex Business Requirements Into Scalable Product Experiences By Collaborating Across Disciplines, Validating Ideas Early And Designing With Long-Term Growth In Mind.")}

    ${renderViewMoreProjectsSection(rp)}
    ${renderNextProjectSection("projects/pos-research.html", "Scaling Enterprise POS Under Pressure", rp)}
    ${renderCTASection(rp)}
    ${renderFooter(rp)}
  </div>`;
}

function initMsme() {
  initNavbar();
  initTabSwitcher("sy-msme-tabs", MSME_TABS, "End-To-End Banking Journeys Mapped Before Interface Design.", 3000);
  initViewMoreCards();
  initNextProjectSection();
}

/* --------------------------------- POS Research page --------------------------------- */
function pagePos() {
  const rp = "../";
  const challengeCards = POS_CHALLENGE_CARDS.map(csTintCard).join("");
  const journey = POS_JOURNEY.map((item, i) => `
    <div class="sy-reveal" data-reveal style="transition-delay:${i * 60}ms;">
      <div style="border-radius:16px;overflow:hidden;"><img src="${item.image}" alt="${item.label}" style="width:100%;height:auto;display:block;" /></div>
      <p style="margin-top:12px;font-family:'Roboto',sans-serif;font-size:12px;color:#75757F;">${item.label}</p>
    </div>`).join("");
  const methods = POS_METHODS.map((i) => csListItem(i, 36, 16)).join("");
  const methodsDots = POS_METHODS_IMAGES.map((_, i) => `<button data-methods-dot="${i}" aria-label="Show research photo ${i + 1}" class="sy-tab-dot" style="background:${i === 0 ? "#1A1A2E" : "#D9D4CA"};"></button>`).join("");
  const findingsEmployee = POS_FINDINGS_EMPLOYEE.map((item) => `
    <div class="sy-reveal" data-reveal style="background:${item.tint};border-radius:18px;padding:24px 20px;height:100%;">
      ${iconBadge(item.icon, { badgeSize: 40, size: 18, shape: "square", gradient: true })}
      <p style="font-family:'Roboto',sans-serif;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#8B7FD4;margin:14px 0 0;">Employee Experience</p>
      <h4 style="font-family:'Roboto',sans-serif;font-size:14px;font-weight:500;color:#1A1A2E;margin:6px 0 0;">${item.title}</h4>
      <p style="font-family:'Roboto',sans-serif;font-size:13px;color:#75757F;margin:6px 0 0;">${item.description}</p>
    </div>`).join("");
  const findingsCustomer = POS_FINDINGS_CUSTOMER.map((item) => `
    <div class="sy-reveal" data-reveal style="background:${item.tint};border-radius:18px;padding:24px 20px;height:100%;">
      ${iconBadge(item.icon, { badgeSize: 40, size: 18, shape: "square", gradient: true })}
      <p style="font-family:'Roboto',sans-serif;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#8B7FD4;margin:14px 0 0;">Customer Experience</p>
      <h4 style="font-family:'Roboto',sans-serif;font-size:14px;font-weight:500;color:#1A1A2E;margin:6px 0 0;">${item.title}</h4>
      <p style="font-family:'Roboto',sans-serif;font-size:13px;color:#75757F;margin:6px 0 0;">${item.description}</p>
    </div>`).join("");
  const recommendations = POS_RECOMMENDATIONS.map((card) => `
    <div class="sy-reveal" data-reveal style="background:${card.tint};border-radius:18px;padding:24px 18px;height:100%;">
      ${iconBadge(card.icon, { badgeSize: 40, size: 18, shape: "square", gradient: true })}
      <h3 class="sy-heading" style="font-size:1rem;font-weight:500;color:#1A1A2E;margin:16px 0 0;">${card.title}</h3>
      <p style="font-family:'Roboto',sans-serif;font-size:12px;line-height:1.55;color:#75757F;margin:8px 0 0;">${card.description}</p>
    </div>`).join("");
  const impact = POS_IMPACT.map(csTintCard).join("");

  return `
  <div style="background:#FAF7F2;">
    ${renderNavbar("light", "", rp)}
    <section style="padding:160px 24px 0;">
      <div style="max-width:1200px;margin:0 auto;">
        ${csBackLink(rp)}
        <div class="sy-reveal" data-reveal style="transition-delay:60ms;text-align:center;max-width:720px;margin:28px auto 0;">
          ${caseStudyEyebrow("UX Research · Enterprise · POS &amp; Billing", "center")}
          <h1 class="sy-heading" style="font-size:clamp(2rem, 4.2vw, 3.25rem);line-height:1.15;font-weight:500;margin:12px 0 0;color:#1A1A2E;">
            Scaling Enterprise<br /><span style="color:#8B7FD4;">POS Under Operational Pressure.</span>
          </h1>
          <p style="margin-top:20px;font-family:'Roboto',sans-serif;font-size:14px;line-height:1.7;color:#75757F;">
            Understanding How Real Operational Behaviour Exposed The Limitations Of A Legacy POS System Across
            High-Volume Restaurant Environments.
          </p>
        </div>
        <div class="sy-reveal" data-reveal style="transition-delay:140ms;">${csMetaGrid(POS_META)}</div>
        <div class="sy-reveal" data-reveal style="transition-delay:220ms;margin-top:48px;border-radius:20px;overflow:hidden;">
          <img src="${POS_HERO}" alt="Scaling Enterprise POS Under Operational Pressure — field research" style="width:100%;height:auto;display:block;" />
        </div>
      </div>
    </section>

    <section style="padding:120px 24px 0;">
      <div class="sy-cs-challenge" style="max-width:1200px;margin:0 auto;display:flex;gap:40px;align-items:flex-start;">
        <div class="sy-reveal" data-reveal style="flex:0 0 300px;">
          ${caseStudyEyebrow("The Challenge")}
          ${caseStudyHeading("When Systems", "Can't Keep Up.")}
          <p style="margin-top:16px;font-family:'Roboto',sans-serif;font-size:13px;line-height:1.7;color:#75757F;">
            Originally Designed For Lower-Volume Operations, The Legacy POS System Struggled Under Peak-Hour
            Demand, Forcing Frontline Staff To Rely On Manual Workarounds For Billing, Refunds And Reconciliation.
          </p>
        </div>
        <div class="sy-cs-grid-3" style="flex:1;display:grid;grid-template-columns:repeat(3, 1fr);gap:20px;">${challengeCards}</div>
      </div>
    </section>

    <section style="padding:120px 24px;margin-top:64px;background:#FFFFFF;">
      <div style="max-width:1200px;margin:0 auto;text-align:center;">
        <div class="sy-reveal" data-reveal>
          ${caseStudyEyebrow("From Field To Insight", "center")}
          <h2 class="sy-heading" style="font-size:clamp(1.75rem, 3.4vw, 2.75rem);font-weight:500;margin:12px 0 0;color:#8B7FD4;">POS Under Operational Pressure.</h2>
          <p style="max-width:620px;margin:16px auto 0;font-family:'Roboto',sans-serif;font-size:14px;line-height:1.7;color:#75757F;">A Field-First Research Journey Across Multiple Store Formats And Real Operational Conditions.</p>
        </div>
        <div class="sy-pos-gallery" style="display:grid;grid-template-columns:repeat(5, 1fr);gap:16px;margin-top:48px;">${journey}</div>
      </div>
    </section>

    <section style="padding:120px 24px 0;">
      <div style="max-width:1200px;margin:0 auto;text-align:center;">
        <div class="sy-reveal" data-reveal>
          ${caseStudyEyebrow("Research Methods", "center")}
          <h2 class="sy-heading" style="font-size:clamp(1.75rem, 3.4vw, 2.75rem);font-weight:500;margin:12px 0 0;color:#1A1A2E;">Going Where<br /><span style="color:#8B7FD4;">The Problems Happen.</span></h2>
          <p style="max-width:620px;margin:16px auto 0;font-family:'Roboto',sans-serif;font-size:14px;line-height:1.7;color:#75757F;">
            Rather Than Relying On Assumptions, Research Was Conducted Inside Live Operating Environments To
            Understand How People, Systems And Processes Behaved Under Real Service Conditions.
          </p>
        </div>
      </div>
      <div class="sy-cs-grid-2" style="max-width:1200px;margin:56px auto 0;display:grid;grid-template-columns:0.8fr 1.2fr;gap:56px;align-items:center;">
        <div class="sy-reveal" data-reveal><div style="display:flex;flex-direction:column;gap:22px;">${methods}</div></div>
        <div class="sy-reveal" data-reveal style="transition-delay:120ms;" id="sy-pos-methods">
          <div style="border-radius:20px;overflow:hidden;aspect-ratio:1008 / 564;">
            <img data-methods-image src="${POS_METHODS_IMAGES[0]}" alt="Research methods in the field" style="width:100%;height:100%;object-fit:cover;object-position:top;display:block;" />
          </div>
          <div style="display:flex;justify-content:center;gap:8px;margin-top:20px;" data-methods-dots>${methodsDots}</div>
        </div>
      </div>
    </section>

    <section style="padding:120px 24px;">
      <div style="max-width:1200px;margin:0 auto;">
        <div class="sy-reveal" data-reveal>
          ${caseStudyEyebrow("Key Findings", "center")}
          <h2 class="sy-heading" style="text-align:center;font-size:clamp(1.75rem, 3.4vw, 2.75rem);font-weight:500;margin:12px 0 0;color:#1A1A2E;">What Operations<br /><span style="color:#8B7FD4;">Beyond The Interface.</span></h2>
        </div>
        <div class="sy-pos-findings-grid" style="display:grid;grid-template-columns:repeat(4, 1fr);gap:20px;margin-top:56px;">${findingsEmployee}${findingsCustomer}</div>
      </div>
    </section>

    <section style="padding:0 24px 120px;">
      <div style="max-width:1200px;margin:0 auto;">
        <div class="sy-reveal" data-reveal>
          ${caseStudyEyebrow("Recommendations", "center")}
          <h2 class="sy-heading" style="text-align:center;font-size:clamp(1.75rem, 3.4vw, 2.75rem);font-weight:500;margin:12px 0 0;color:#1A1A2E;">Research-Backed<br /><span style="color:#8B7FD4;">Enterprise Recommendations.</span></h2>
          <p style="max-width:620px;margin:16px auto 0;text-align:center;font-family:'Roboto',sans-serif;font-size:13px;line-height:1.7;color:#75757F;">
            These Findings Informed A Set Of Enterprise Recommendations That Shaped Future Direction — Not Final
            Shipped Product Features.
          </p>
        </div>
        <div class="sy-pos-rec-grid" style="display:grid;grid-template-columns:repeat(5, 1fr);gap:16px;margin-top:56px;">${recommendations}</div>
      </div>
    </section>

    <section style="padding:0 24px 120px;">
      <div style="max-width:1200px;margin:0 auto;">
        <div class="sy-reveal" data-reveal>
          ${caseStudyEyebrow("Impact", "center")}
          <h2 class="sy-heading" style="text-align:center;font-size:clamp(1.75rem, 3.4vw, 2.75rem);font-weight:500;margin:12px 0 0;color:#1A1A2E;">Delivering Value<br /><span style="color:#8B7FD4;">Beyond The Interface.</span></h2>
        </div>
        <div class="sy-cs-grid-3" style="display:grid;grid-template-columns:repeat(3, 1fr);gap:20px;margin-top:56px;">${impact}</div>
      </div>
    </section>

    ${csReflection("Designing Beyond", "The Interface.", "Research Impact Isn't Measured By Screens Alone — It's Measured By How Clearly Real Operational Behaviour Gets Understood. This Project Reinforced The Value Of Grounding Enterprise Decisions In Field Evidence, Translating Frontline Reality Into Insights That Enterprise Teams Could Act On With Confidence.")}

    ${renderViewMoreProjectsSection(rp)}
    ${renderCTASection(rp)}
    ${renderFooter(rp)}
  </div>`;
}

function initPos() {
  initNavbar();
  initViewMoreCards();
  const wrap = document.getElementById("sy-pos-methods");
  if (!wrap) return;
  const img = wrap.querySelector("[data-methods-image]");
  const dots = wrap.querySelectorAll("[data-methods-dot]");
  let idx = 0;
  const setActive = (i) => {
    idx = i;
    dots.forEach((d, di) => { d.style.background = di === i ? "#1A1A2E" : "#D9D4CA"; });
    if (img) {
      img.style.animation = "none";
      img.src = POS_METHODS_IMAGES[i];
      if (!window.SY_REDUCED_MOTION) {
        void img.offsetWidth;
        img.style.animation = "sy-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards";
      }
    }
  };
  dots.forEach((d, i) => d.addEventListener("click", () => setActive(i)));
  if (!window.SY_REDUCED_MOTION) {
    setInterval(() => setActive((idx + 1) % POS_METHODS_IMAGES.length), 2000);
  }
}

/* --------------------------------- Crimson Neurology page --------------------------------- */
function pageCrimson() {
  const rp = "../";
  return `
  <div style="background:#FAF7F2;">
    ${renderNavbar("light", "", rp)}
    <section style="padding:160px 24px 0;">
      <div style="max-width:1200px;margin:0 auto;">
        ${csBackLink(rp)}
        <div class="sy-reveal" data-reveal style="transition-delay:60ms;text-align:center;max-width:900px;margin:36px auto 0;">
          <h1 class="sy-heading" style="font-size:clamp(2.25rem, 5vw, 3.5rem);line-height:1.1;font-weight:500;margin:0;">
            <span style="color:${CRIMSON};">Crimson</span> <span style="color:#1A1A2E;">Neurology</span>
          </h1>
          <p style="max-width:620px;margin:20px auto 0;font-family:'Roboto',sans-serif;font-size:14px;line-height:1.7;color:#75757F;">
            Designed A Cohesive Visual Identity For A Specialist Neurology Clinic, Translating Expertise, Care
            And Credibility Into A Consistent Brand Experience Across Every Touchpoint.
          </p>
        </div>
      </div>
    </section>
    <section style="padding:56px 24px 120px;">
      <div style="max-width:1200px;margin:0 auto;">
        <div class="sy-reveal" data-reveal style="transition-delay:120ms;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(26,26,46,0.08);">
          <img src="${CRIMSON_MAIN_IMAGE}" alt="Crimson Neurology — brand identity" style="width:100%;height:auto;display:block;" />
        </div>
      </div>
    </section>
    ${renderCTASection(rp)}
    ${renderFooter(rp)}
  </div>`;
}

function initCrimson() {
  initNavbar();
}

/* --------------------------------- Simple placeholder (Sterling Homes / Moodle Hive) --------------------------------- */
function pagePlaceholder(label) {
  const rp = "../";
  return `
  <div style="min-height:100vh;background:#FAF7F2;">
    ${renderNavbar("light", "", rp)}
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;">
      <p style="font-family:'Roboto',sans-serif;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;color:#75757F;">Coming soon</p>
      <h1 class="sy-heading" style="font-size:2rem;color:#1A1A2E;margin:0;">${label}</h1>
      <a href="${rp}home.html" class="sy-btn-press" style="margin-top:8px;font-family:'Roboto',sans-serif;font-size:13px;color:#1A1A2E;border:1px solid rgba(26,26,46,0.2);border-radius:9999px;padding:9px 18px;background:transparent;cursor:pointer;text-decoration:none;">&larr; Back to Home</a>
    </div>
  </div>`;
}

function initPlaceholder() { initNavbar(); }

/* --------------------------------- Projects listing page --------------------------------- */
function pageProjects() {
  const productItems = PROJECTS_PAGE_ITEMS.filter((p) => p.category === "product");
  const visualItems = PROJECTS_PAGE_ITEMS.filter((p) => p.category === "visual");
  const card = (project) => `
    <a href="${project.route}" class="sy-reveal sy-projects-card" data-reveal style="display:block;width:100%;text-align:left;background:#FFFFFF;border:none;border-radius:16px;overflow:hidden;cursor:pointer;padding:0;text-decoration:none;">
      <div style="aspect-ratio:3 / 2;overflow:hidden;">
        <img src="${project.image}" alt="${project.title}" class="sy-projects-card-img" style="width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.05);transition:transform 450ms cubic-bezier(0.16,1,0.3,1);" />
      </div>
      <div style="padding:20px 22px 24px;">
        <h3 class="sy-heading" style="font-size:1.15rem;font-weight:500;color:#1A1A2E;margin:0;">${project.title}</h3>
        <p style="font-family:'Roboto',sans-serif;font-size:13px;color:#75757F;margin:6px 0 0;">${project.subtitle}</p>
      </div>
    </a>`;
  const productCards = productItems.map((p) => `<div style="flex:0 0 340px;">${card(p)}</div>`).join("");
  const visualCards = visualItems.map((p) => `<div style="max-width:340px;" class="sy-projects-visual-card">${card(p)}</div>`).join("");

  return `
  <div style="background:${GRADIENT_SOFT};">
    ${renderNavbar("light", "projects.html")}
    <section style="padding:160px 24px 0;">
      <a href="home.html" class="sy-back-link" style="color:#75757F;max-width:1200px;margin:0 auto;width:100%;display:flex;">&larr; Back</a>
      <div class="sy-reveal" data-reveal style="transition-delay:60ms;max-width:720px;margin:36px auto 0;text-align:center;">
        <h1 class="sy-heading" style="font-size:clamp(2rem, 4.2vw, 3.25rem);line-height:1.15;font-weight:500;margin:0;color:#1A1A2E;">
          Products Shaped By<br /><span style="color:#8B7FD4;">Research, Strategy, And Execution.</span>
        </h1>
        <p style="margin-top:20px;font-family:'Roboto',sans-serif;font-size:14px;line-height:1.7;color:#75757F;">Enterprise Platforms And Digital Experiences Designed To Simplify Complexity.</p>
      </div>
    </section>

    <div style="max-width:1200px;margin:64px auto 0;padding:0 24px;"><div style="border-top:1px solid rgba(26,26,46,0.12);"></div></div>

    <section style="padding:56px 0 0;">
      <div style="max-width:1200px;margin:0 auto;padding:0 24px;">
        <div class="sy-reveal" data-reveal>${caseStudyEyebrow("Product Design &amp; Experience Research")}</div>
      </div>
      <div style="max-width:1200px;margin:0 auto;padding:0 24px;">
        <div id="sy-projects-scroll" class="sy-projects-scroll" style="display:flex;gap:20px;overflow-x:auto;margin-top:24px;padding-bottom:4px;">${productCards}</div>
        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px;">
          <button id="sy-projects-scroll-left" aria-label="Scroll product projects left" style="width:40px;height:40px;border-radius:9999px;border:none;cursor:pointer;background:#FBEAF1;color:#1A1A2E;font-size:16px;display:inline-flex;align-items:center;justify-content:center;">&larr;</button>
          <button id="sy-projects-scroll-right" aria-label="Scroll product projects right" style="width:40px;height:40px;border-radius:9999px;border:none;cursor:pointer;background:#FBEAF1;color:#1A1A2E;font-size:16px;display:inline-flex;align-items:center;justify-content:center;">&rarr;</button>
        </div>
      </div>
    </section>

    <div style="max-width:1200px;margin:40px auto 0;padding:0 24px;"><div style="border-top:1px solid rgba(26,26,46,0.12);"></div></div>

    <section style="padding:56px 24px 120px;">
      <div style="max-width:1200px;margin:0 auto;">
        <div class="sy-reveal" data-reveal>${caseStudyEyebrow("Visual Design")}</div>
        <div class="sy-projects-visual-grid" style="display:grid;grid-template-columns:repeat(3, 1fr);gap:20px;margin-top:24px;">${visualCards}</div>
      </div>
    </section>

    ${renderCTASection("")}
    ${renderFooter("")}
  </div>`;
}

function initProjects() {
  initNavbar();
  const scrollEl = document.getElementById("sy-projects-scroll");
  const leftBtn = document.getElementById("sy-projects-scroll-left");
  const rightBtn = document.getElementById("sy-projects-scroll-right");
  if (scrollEl) {
    const scrollBy = (dir) => {
      const card = scrollEl.querySelector(".sy-projects-card");
      const step = (card ? card.offsetWidth : 380) + 20;
      scrollEl.scrollBy({ left: dir * step, behavior: window.SY_REDUCED_MOTION ? "auto" : "smooth" });
    };
    if (leftBtn) leftBtn.addEventListener("click", () => scrollBy(-1));
    if (rightBtn) rightBtn.addEventListener("click", () => scrollBy(1));
  }
}

/* --------------------------------- About page --------------------------------- */
function pageAbout() {
  const stats = ABOUT_STATS.map((stat, i) => `
    <div class="sy-reveal" data-reveal style="transition-delay:${100 + i * 60}ms;">
      <p class="sy-heading sy-gradient-text" style="font-size:2.25rem;font-weight:500;margin:0;">${stat.value}</p>
      <p style="font-family:'Roboto',sans-serif;font-size:13px;color:#F5F3EF;margin:6px 0 0;">${stat.label}</p>
      <p style="font-family:'Roboto',sans-serif;font-size:12px;color:#75757F;margin:2px 0 0;max-width:160px;">${stat.detail}</p>
    </div>`).join("");
  const strengths = ABOUT_STRENGTHS.map((item, i) => `
    <div class="sy-reveal" data-reveal style="transition-delay:${320 + i * 50}ms;display:flex;flex-direction:column;align-items:center;gap:10px;flex:1 1 0;min-width:0;text-align:center;">
      ${iconBadge(item.icon, { badgeSize: 40, size: 18 })}
      <p style="font-family:'Roboto',sans-serif;font-size:11.5px;color:#C9C6C2;margin:0;line-height:1.4;">${item.title}</p>
    </div>`).join("");

  return `
  <div style="background:#0A0A0C;">
    ${renderNavbar("dark", "about.html")}
    <section style="padding:144px 24px 0;">
      <div style="max-width:1280px;margin:0 auto;">
        <a href="home.html" class="sy-back-link" style="color:#9A9AA3;">&larr; Back</a>
        <div class="sy-about-grid" style="display:grid;grid-template-columns:0.9fr 1.1fr;gap:80px;align-items:flex-start;margin-top:40px;">
          <div class="sy-reveal" data-reveal style="transition-delay:60ms;">
            <div>
              <h1 class="sy-heading sy-gradient-text" style="font-size:clamp(1.125rem, 2.2vw, 2.1rem);line-height:1.2;font-weight:500;margin:16px 0 0;white-space:nowrap;">Designing Products People Can Trust.</h1>
              <p style="margin-top:20px;font-family:'Roboto',sans-serif;font-size:14px;line-height:1.75;color:#9A9AA3;max-width:520px;">
                I&rsquo;m A Product &amp; UX Designer Specialising In Simplifying Complex Systems Through Research,
                Systems Thinking, And Thoughtful Interaction Design. Across Enterprise Platforms, Digital
                Products, And Brand Experiences, I Transform Business Requirements, User Needs, And Technical
                Constraints Into Intuitive Experiences That People Can Use With Confidence.
              </p>
              <div style="display:flex;gap:40px;margin-top:44px;flex-wrap:wrap;">${stats}</div>
              <div class="sy-reveal" data-reveal style="transition-delay:280ms;">
                <p style="margin-top:48px;font-family:'Roboto',sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#75757F;">I Bring To The Table</p>
                <div style="display:flex;flex-wrap:nowrap;gap:12px;margin-top:20px;">${strengths}</div>
              </div>
            </div>
          </div>
          <div class="sy-reveal" data-reveal style="transition-delay:140ms;">
            <div style="border-radius:20px;overflow:hidden;aspect-ratio:1190 / 1322;max-width:560px;margin:0 auto;">
              <img src="${ABOUT_COLLAGE}" alt="A collage of Sharayu's creative interests — clay miniatures, photography, sketching, cooking, painting and sunsets" style="width:100%;height:100%;object-fit:cover;transform:scale(1.02);display:block;" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section style="padding:140px 24px 100px;">
      <div class="sy-reveal" data-reveal>
        <p class="sy-heading sy-gradient-text" style="max-width:760px;margin:0 auto;text-align:center;font-size:clamp(1.5rem, 3vw, 2.25rem);font-style:italic;font-weight:500;line-height:1.4;">
          &ldquo;Curious By Nature. Creative By Choice.&rdquo;
        </p>
      </div>
    </section>

    ${renderCTASection("")}
    ${renderFooter("")}
  </div>`;
}

function initAbout() { initNavbar(); }

/* --------------------------------- Contact page --------------------------------- */
function pageContact() {
  const items = CONTACT_ITEMS.map((item, i) => {
    const content = `
      ${iconBadge(item.icon, { badgeSize: 44, size: 20, background: "rgba(139,127,212,0.22)" })}
      <div>
        <p style="font-family:'Roboto',sans-serif;font-size:10.5px;letter-spacing:0.14em;color:#9A9AA3;margin:0;">${item.label}</p>
        <p class="sy-contact-value" style="font-family:'Roboto',sans-serif;font-size:13.5px;color:#F5F3EF;margin:6px 0 0;word-break:break-word;">${item.value}</p>
      </div>`;
    const inner = item.href
      ? `<a href="${item.href}" ${item.href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""} ${item.download ? "download" : ""} class="sy-contact-item" style="display:flex;align-items:center;gap:12px;text-decoration:none;transition:opacity 300ms ease;">${content}</a>`
      : `<div style="display:flex;align-items:center;gap:12px;">${content}</div>`;
    return `<div class="sy-reveal" data-reveal style="transition-delay:${i * 70}ms;">${inner}</div>`;
  }).join("");

  return `
  <div style="background:#0A0A0C;">
    ${renderNavbar("dark", "contact.html")}
    <section style="padding:140px 24px 0;">
      <div style="max-width:1200px;margin:0 auto;">
        <a href="home.html" class="sy-back-link" style="color:#9A9AA3;">&larr; Back</a>
        <div class="sy-reveal" data-reveal style="transition-delay:60ms;text-align:center;margin-top:28px;">
          <h1 class="sy-heading" style="font-size:clamp(2rem, 3.8vw, 3.25rem);line-height:1.15;font-weight:500;margin:0;color:#F5F3EF;">
            Thoughtful Work Starts<br /><span class="sy-gradient-text">With A Conversation.</span>
          </h1>
          <p style="max-width:480px;margin:18px auto 0;font-family:'Roboto',sans-serif;font-size:14px;line-height:1.7;color:#9A9AA3;">
            Whether You&rsquo;re Building A New Product, Refining An Existing Experience, Or Experiencing New
            Ideas, I&rsquo;d Love To Hear About It.
          </p>
          <div style="display:inline-flex;align-items:center;gap:8px;margin-top:24px;font-family:'Roboto',sans-serif;font-size:13px;color:#C9C6C2;border:1px solid rgba(255,255,255,0.15);border-radius:9999px;padding:10px 18px;">
            <span style="width:7px;height:7px;border-radius:9999px;background:#8FD6A8;display:inline-block;"></span>
            I Respond Within 24 Hours.
          </div>
        </div>
        <div class="sy-reveal" data-reveal style="transition-delay:140ms;">
          <div style="display:flex;justify-content:center;flex-wrap:nowrap;gap:40px;margin-top:88px;" class="sy-contact-row">${items}</div>
        </div>
      </div>
    </section>
    <div style="min-height:38vh;"></div>
    ${renderFooter("")}
  </div>`;
}

function initContact() { initNavbar(); }

/* --------------------------------- Page transitions (between separate pages) --------------------------------- */
/* Smooth fade-out before following a normal internal link, complementing the
   existing .sy-page-enter fade-in that already runs on every page load. Skips
   any click that a more specific handler (e.g. the Landing/Home custom
   transitions) has already handled via preventDefault(). */
function navigateWithFade(url) {
  if (window.SY_REDUCED_MOTION) { window.location.href = url; return; }
  document.body.style.transition = "opacity 320ms cubic-bezier(0.16,1,0.3,1)";
  document.body.style.opacity = "0";
  setTimeout(() => { window.location.href = url; }, 300);
}

function initPageTransitions() {
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target.closest && e.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) return;
    if (link.hasAttribute("download")) return;
    if (link.target && link.target !== "" && link.target !== "_self") return;
    let url;
    try { url = new URL(href, window.location.href); } catch (err) { return; }
    if (url.origin !== window.location.origin) return;
    if (url.href === window.location.href) return;
    e.preventDefault();
    navigateWithFade(url.href);
  });
}

/* Guard against the browser's back/forward cache restoring a page frozen
   mid-fade-out (opacity: 0) from before the previous navigation. */
window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    document.body.style.transition = "none";
    document.body.style.opacity = "1";
  }
});

/* --------------------------------- Bootstrap --------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  initPreloader();
  initPageTransitions();
  const app = document.getElementById("app");
  const page = window.SY_PAGE;
  const renderers = {
    landing: pageLanding,
    home: pageHome,
    projects: pageProjects,
    about: pageAbout,
    contact: pageContact,
    treasury: pageTreasury,
    msme: pageMsme,
    pos: pagePos,
    crimson: pageCrimson,
    "sterling-homes": () => pagePlaceholder("Sterling Homes"),
    "moodle-hive": () => pagePlaceholder("Monash University Student Platform"),
  };
  const initers = {
    landing: initLanding,
    home: initHome,
    projects: initProjects,
    about: initAbout,
    contact: initContact,
    treasury: initTreasury,
    msme: initMsme,
    pos: initPos,
    crimson: initCrimson,
    "sterling-homes": initPlaceholder,
    "moodle-hive": initPlaceholder,
  };
  if (app && renderers[page]) {
    app.innerHTML = renderers[page]();
    app.classList.add(window.SY_REDUCED_MOTION ? "" : "sy-page-enter");
    if (initers[page]) initers[page]();
    initReveal(app);
  }
});
