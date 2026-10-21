/* ============================================================
   SPECBUSTERS custom views (v1.TW: Tailwind utilities only).
   Shared bits first, then one renderer per page.
   ============================================================ */
(() => {
  const badgeCls = { ok: "border-ecto text-ecto", PASS: "border-ecto text-ecto",
    warn: "border-warn text-warn", err: "border-flash text-flash",
    PENDING: "border-line text-ink2", QUEUED: "border-warn text-warn",
    HELD: "border-flash text-flash", mut: "border-line text-ink2" };
  const badge = (t, k) => `<span class="font-mono text-[10px] font-semibold tracking-wider px-1.5 py-px rounded border ${badgeCls[k] || badgeCls.mut} whitespace-nowrap">${t}</span>`;
  const label = (t) => `<div class="section-label">${t}</div>`;
  const statCard = (l, v, d, cls = "text-accent") => `
    <div class="bg-surface border border-line rounded-[10px] px-4 py-3">
      <div class="font-mono text-[10px] tracking-wider text-ink2 uppercase">${l}</div>
      <div class="font-mono text-[21px] font-bold text-ink mt-0.5">${v}</div>
      <div class="font-mono text-[10px] mt-0.5 ${cls}">${d}</div>
    </div>`;
  const statRow = (cards) => `<div class="grid gap-3 mb-2" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr))">${cards.join("")}</div>`;
  const panelList = (items, mark = "✕", markCls = "text-flash") => `
    <ul class="list-none p-0 m-0">${items.map((i) => `<li class="text-[12.5px] text-ink2 leading-snug mb-1.5 pl-4 relative"><span class="absolute left-0 ${markCls} font-bold">${mark}</span>${i}</li>`).join("")}</ul>`;
  const panel = (title, inner, tone = "") => `
    <div class="bg-surface border ${tone || "border-line"} rounded-[10px] px-4 py-3.5">
      <h3 class="font-mono text-[14px] font-bold text-ink m-0 mb-2 uppercase tracking-wide">${title}</h3>${inner}</div>`;
  const stageRail = (current) => `
    <div class="stage-rail">${STAGES.map((s, i) => `
      ${i ? '<span class="stage-link"></span>' : ""}
      <span class="stage-node ${i < current ? "done" : i === current ? "now" : ""}">${s}</span>`).join("")}
    </div>`;

  window.CUSTOM = {

    capabilities(el, ctx) {
      const toneBorder = { ecto: "border-ecto/60", warn: "border-warn/60", flash: "border-flash/60" };
      const toneText = { ecto: "text-ecto", warn: "text-warn", flash: "text-flash" };
      el.innerHTML = `
        <div class="flex justify-center mt-1 mb-2">
          <img src="${SITE.logo}" alt="SPECBUSTERS — master logo" class="w-full max-w-[360px] rounded-[14px] border border-line" loading="eager">
        </div>
        <h2 class="font-mono text-[18px] font-bold text-ink text-center mt-0 mb-1">Who you gonna call?</h2>
        <p class="font-mono text-[12px] text-ink2 text-center mt-0 mb-1.5 max-w-[640px] mx-auto">Seven specialists, one pipeline, humans on every gate. A spec-driven Kiro Crew that takes geospatial, GEOINT, and space recon work from requirement to running service — under containment the whole way.</p>
        <p class="font-mono text-[10px] text-center mt-0 mb-3"><span class="text-ecto">🟢 Baseline v0.x</span> · <span class="text-warn">🟡 Dashboard in progress</span> · <span class="text-ink2">🔒 Public release pending</span></p>
        <div class="hazard mb-4" role="presentation"></div>

        <div class="grid gap-3 mb-2" style="grid-template-columns:repeat(auto-fit,minmax(120px,1fr))">
          ${NUMBERS.map(([v, l]) => `
            <div class="bg-surface border border-line rounded-[10px] px-4 py-3 text-center">
              <div class="font-mono text-[26px] font-bold text-accent leading-none">${v}</div>
              <div class="font-mono text-[10px] tracking-wider text-ink2 uppercase mt-1">${l}</div>
            </div>`).join("")}
        </div>

        ${label("How the Crew Wins")}
        <div class="grid gap-3" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">
          ${VALUE.map((v) => `
            <div class="bg-surface border border-line rounded-[10px] px-4 py-3.5">
              <div class="font-mono text-[12px] font-bold text-accent uppercase tracking-wide">${v.t}</div>
              <p class="text-[12.5px] text-ink2 mt-1.5 mb-0 leading-snug">${v.b}</p>
            </div>`).join("")}
        </div>

        ${label("Mission Domains")}
        <div class="grid gap-3.5" style="grid-template-columns:repeat(auto-fit,minmax(290px,1fr))">
          ${DOMAINS.map((m) => `
            <div class="bg-surface border ${toneBorder[m.tone]} rounded-[12px] px-4 py-4">
              <h3 class="font-mono text-[14px] font-bold ${toneText[m.tone]} m-0 tracking-wide">${m.name}</h3>
              <p class="text-[12.5px] text-ink mt-1.5 mb-2.5 leading-snug font-semibold">${m.hook}</p>
              <ul class="list-none p-0 m-0">
                ${m.caps.map((x) => `<li class="text-[12px] text-ink2 leading-snug mb-1.5 pl-4 relative"><span class="absolute left-0 ${toneText[m.tone]} font-bold">▸</span>${x}</li>`).join("")}
              </ul>
              <div class="font-mono text-[10.5px] ${toneText[m.tone]} mt-3 pt-2.5 border-t border-line leading-snug">${m.proof}</div>
            </div>`).join("")}
        </div>

        <div class="breach-banner px-4 py-3.5 mt-4 text-center">
          <p class="font-mono text-[12px] text-ink m-0 leading-snug">${ENGAGE}</p>
          <div class="mt-2.5 flex gap-2.5 justify-center flex-wrap">
            <a href="#/crew" class="font-mono text-[12px] font-bold text-accent no-underline border border-accent rounded px-3.5 py-1.5 hover:bg-accent/10">MEET THE CREW →</a>
            <a href="#/pipeline" class="font-mono text-[12px] font-bold text-ecto no-underline border border-ecto/60 rounded px-3.5 py-1.5 hover:bg-ecto/10">SEE THE PIPELINE →</a>
          </div>
        </div>`;
    },

    crew(el, ctx) {
      const { esc } = ctx;
      el.innerHTML = `
        <h2 class="font-mono text-[20px] font-bold text-ink mt-1 mb-0.5">The Crew</h2>
        <p class="font-mono text-[11px] text-ink2 mt-0 mb-3">Seven agents · one lane each · the crew is itself a P0 system</p>
        <div class="breach-banner px-4 py-3 mb-4 font-mono text-[12px] font-semibold text-accent">⛔ PHASE 1 PERMANENT — remote access, registry push/login, and cloud apply are denied for EVERY agent. Louis included.</div>
        <div class="grid gap-3.5" style="grid-template-columns:repeat(auto-fill,minmax(270px,1fr))">
          ${CREW.map((b) => `
          <div class="bot-card">
            <img class="bot-avatar" src="${esc(b.img)}" alt="${esc(b.call)} figure" loading="lazy">
            <div class="px-4 py-3.5">
              <div class="flex items-baseline justify-between gap-2">
                <h3 class="font-mono text-[15px] font-bold text-ink m-0">${esc(b.call)}</h3>
                ${badge(esc(b.lane), b.lane === "DEPLOYER" ? "err" : b.lane === "ADHOC" ? "mut" : "ok")}
              </div>
              <div class="font-mono text-[10px] tracking-wider text-ink2 uppercase mt-3 pt-2.5 border-t border-line">Charge</div>
              <p class="text-[12.5px] text-ink mt-0.5 mb-0 leading-snug">${esc(b.charge)}</p>
              <div class="font-mono text-[10px] tracking-wider text-ink2 uppercase mt-2.5">Containment Note</div>
              <p class="font-mono text-[11.5px] text-warn mt-0.5 mb-0 leading-snug">${esc(b.note)}</p>
              <div class="font-mono text-[10px] tracking-wider text-ink2 uppercase mt-2.5">Hard Limits</div>
              ${panelList(b.limits.map(esc))}
            </div>
          </div>`).join("")}
        </div>`;
    },

    gates(el, ctx) {
      el.innerHTML = `
        <h2 class="font-mono text-[20px] font-bold text-ink mt-1 mb-0.5">Gate Tests — T0–T15</h2>
        <p class="font-mono text-[11px] text-ink2 mt-0 mb-3">Run per instance · statuses live in js/data.js → GATES · T1–T15 labels DRAFT, sync with Build Guide v4.0</p>
        ${panel("Gate Rules", panelList(GATE_RULES, "§", "text-accent"), "border-flash/60")}
        <div class="mt-3 overflow-x-auto bg-surface border border-line rounded-[10px]">
          <table class="w-full border-collapse min-w-[560px]">
            <thead><tr>
              <th class="text-left font-mono text-[10px] tracking-wider uppercase text-ink2 px-3.5 py-2.5 border-b border-line">Gate</th>
              <th class="text-left font-mono text-[10px] tracking-wider uppercase text-ink2 px-3.5 py-2.5 border-b border-line">Proves</th>
              <th class="text-left font-mono text-[10px] tracking-wider uppercase text-ink2 px-3.5 py-2.5 border-b border-line">Status</th>
            </tr></thead>
            <tbody>${GATES.map((g) => `
              <tr class="hover:bg-bg">
                <td class="px-3.5 py-2.5 border-b border-line font-mono text-[12px] font-bold text-ink">${g.id}</td>
                <td class="px-3.5 py-2.5 border-b border-line font-mono text-[12px] text-ink2">${g.what}</td>
                <td class="px-3.5 py-2.5 border-b border-line">${badge(g.status, g.status)}</td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
        <p class="hint mt-2.5">Seeded defect battery <span class="text-accent font-bold">D1–D7</span> is scored under T13 — reviewer and appsec detection rate is the metric that matters.</p>`;
    },

    guard(el, ctx) {
      el.innerHTML = `
        <h2 class="font-mono text-[20px] font-bold text-ink mt-1 mb-0.5">Containment — Guard &amp; Governance</h2>
        <p class="font-mono text-[11px] text-ink2 mt-0 mb-3">The traps that hold. Guard + kiro-cli enforce every line below.</p>
        <div class="grid gap-3" style="grid-template-columns:repeat(auto-fit,minmax(290px,1fr))">
          ${panel("⛔ Phase-1 Denials — Permanent", panelList(DENIALS), "border-flash/60")}
          ${panel("🔑 Louis's Seven Verbs (NAS host)", `
            <p class="text-[12px] text-ink2 mt-0 mb-2">Forced-command deploy key — the only road in:</p>
            <div class="flex flex-wrap gap-1.5">${["put","pull","up","ps","logs","images","config"].map((v) => `<span class="font-mono text-[11px] font-bold text-ecto border border-ecto/50 rounded px-2 py-0.5">${v}</span>`).join("")}</div>
            <p class="font-mono text-[11px] text-warn mt-2.5 mb-0">Stacks: allow-listed project prefixes only. Critical names refused on the host itself.</p>`)}
          ${panel("🧾 Install Integrity — Middle Ground", panelList(INTEGRITY, "✓", "text-ecto"))}
          ${panel("👻 Specbuster PM — Subcontractor Rules (M-2026-014)", panelList(PM_RULES))}
        </div>`;
    },

    pipeline(el, ctx) {
      el.innerHTML = `
        <h2 class="font-mono text-[20px] font-bold text-ink mt-1 mb-0.5">Pipeline — GitLab Free Template</h2>
        <p class="font-mono text-[11px] text-ink2 mt-0 mb-3">Every agent branch walks the gauntlet. The last stage has a human finger on it.</p>
        <div class="bg-surface border border-line rounded-[10px] px-4 py-4 mb-3">
          <div class="stage-rail">${PIPE_STAGES.map((s, i) => `
            ${i ? '<span class="stage-link"></span>' : ""}
            <span class="stage-node ${i === PIPE_STAGES.length - 1 ? "now" : "done"}">${s}</span>`).join("")}
          </div>
          <p class="font-mono text-[10px] text-ink2 mt-2.5 mb-0">green = automated scan stages · red = manual deploy, human-pressed</p>
        </div>
        ${label("How It Works")}
        <div class="grid gap-3 mb-3" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
          ${FLOW.map(([t, b], i) => `
            <div class="bg-surface border border-line rounded-[10px] px-4 py-3">
              <div class="font-mono text-[18px] font-bold text-accent">${i + 1}</div>
              <div class="font-mono text-[12px] font-bold text-ink mt-0.5 uppercase tracking-wide">${t}</div>
              <p class="text-[11.5px] text-ink2 mt-1 mb-0 leading-snug">${b}</p>
            </div>`).join("")}
        </div>
        ${panel("Rules of the Road", panelList(PIPE_RULES, "§", "text-accent"))}`;
    },

    ops(el, ctx) {
      el.innerHTML = `
        <h2 class="font-mono text-[20px] font-bold text-ink mt-1 mb-0.5">Operations</h2>
        <p class="font-mono text-[11px] text-ink2 mt-0 mb-3">Nothing moves before WALK exits. Then the queue opens in order.</p>
        ${label("Instance Development Range")}
        ${INSTANCES.map((i) => `
          <div class="bg-surface border border-line rounded-[10px] px-4 py-3.5 mb-3">
            <div class="flex items-baseline justify-between gap-2 flex-wrap mb-2">
              <span class="font-mono text-[13px] font-bold text-ink">${i.name}</span>
              <span class="font-mono text-[10px] text-ink2">${i.detail}</span>
            </div>
            ${stageRail(i.stage)}
          </div>`).join("")}
        <p class="hint mb-3">Maturity rule: start with spec and review only; widen autonomy as gate tests stay green. Stage markers live in js/data.js → INSTANCES.</p>
        ${label("Mission Queue")}
        <div class="mb-3 overflow-x-auto bg-surface border border-line rounded-[10px]">
          <table class="w-full border-collapse min-w-[560px]">
            <thead><tr>${["#", "Mission", "What", "Opens When", "Status"].map((h) => `<th class="text-left font-mono text-[10px] tracking-wider uppercase text-ink2 px-3.5 py-2.5 border-b border-line">${h}</th>`).join("")}</tr></thead>
            <tbody>${MISSION_QUEUE.map((m) => `
              <tr class="hover:bg-bg">
                <td class="px-3.5 py-2.5 border-b border-line font-mono text-[12px] font-bold text-accent">${m.pri}</td>
                <td class="px-3.5 py-2.5 border-b border-line font-mono text-[12px] font-bold text-ink">${m.name}</td>
                <td class="px-3.5 py-2.5 border-b border-line font-mono text-[12px] text-ink2">${m.what}</td>
                <td class="px-3.5 py-2.5 border-b border-line font-mono text-[11px] text-warn">${m.gate}</td>
                <td class="px-3.5 py-2.5 border-b border-line">${badge(m.status, m.status)}</td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
        ${panel("Program Manager — " + SUBCONTRACTOR.name, `
          <p class="font-mono text-[11px] text-warn mt-0 mb-1.5">${SUBCONTRACTOR.role}</p>
          <p class="text-[12.5px] text-ink2 m-0 leading-snug">${SUBCONTRACTOR.body}</p>`, "border-warn/50")}
        ${label("Release 0.5.0 Package Checks")}
        <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">
          ${RELEASE_CHECKS.map(([n, v, k]) => `
            <div class="card"><div class="card-top"><h3 class="!text-[14px]">${n}</h3>${badge(v, k)}</div></div>`).join("")}
        </div>`;
    },

  };
})();
