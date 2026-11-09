(function () {
  const S = window.SITE;
  const page = document.body.dataset.page; // "home" or a track key
  const root = document.body.dataset.root || "";
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const byId = Object.fromEntries(S.projects.map((p) => [p.id, p]));

  const STATUS = { live: "Live", client: "Client work", academic: "Academic", progress: "In progress", planned: "Planned" };

  // ---------- Waveforms: each track drawn as its own signal ----------
  function wavePath(kind, w, h) {
    const mid = h / 2;
    let seed = 7;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280) - 0.5;
    if (kind === "denoise") {
      const pts = [];
      for (let x = 0; x <= w; x += 3) {
        const t = x / w, noise = rnd() * h * 0.9 * Math.pow(1 - t, 1.6);
        pts.push(x + " " + (mid + Math.sin(x / 18) * h * 0.28 + noise).toFixed(1));
      }
      return "M" + pts.join(" L");
    }
    if (kind === "square") {
      let d = `M0 ${h * 0.2}`, hi = true, x = 0;
      while (x < w) {
        x = Math.min(w, x + 34);
        d += ` L${x} ${hi ? h * 0.2 : h * 0.8}`;
        hi = !hi;
        d += ` L${x} ${hi ? h * 0.2 : h * 0.8}`;
      }
      return d;
    }
    if (kind === "can") {
      const bits = "1111110110010100110000100011010110101100100111010011011111111110100101101001100";
      const bw = w / bits.length;
      let d = `M0 ${h * 0.22}`;
      for (let i = 0; i < bits.length; i++) {
        const y = bits[i] === "1" ? h * 0.22 : h * 0.78;
        d += ` L${(i * bw).toFixed(1)} ${y} L${((i + 1) * bw).toFixed(1)} ${y}`;
      }
      return d;
    }
    let d = `M0 ${mid}`;
    for (let x = 0; x <= w; x += 2) {
      const gate = (x > w * 0.18 && x < w * 0.24) || (x > w * 0.52 && x < w * 0.56) || (x > w * 0.83 && x < w * 0.9);
      d += ` L${x} ${(gate ? mid + Math.sin(x * 1.3) * h * 0.42 : mid + rnd() * 1.5).toFixed(1)}`;
    }
    return d;
  }
  function waveSVG(kind, cls) {
    const w = 600, h = 60;
    return `<svg class="wave ${cls || ""}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="${h / 2}" x2="${w}" y2="${h / 2}" class="wave-axis"/>
      <path d="${wavePath(kind, w, h)}" class="wave-line"/></svg>`;
  }

  // ---------- Media ----------
  function media(id, size) {
    const m = S.media[id];
    if (!m) return "";
    const src = root + m.src;
    const img = `<img src="${esc(src)}" alt="${esc(m.alt)}" loading="lazy" decoding="async">`;
    if (m.kind === "shot") {
      return `<a class="frame frame-shot ${size || ""}" href="${esc(src)}" target="_blank" rel="noopener" aria-label="Open full-size screenshot">
        <span class="frame-bar"><span class="frame-dots" aria-hidden="true"></span><span class="frame-url">${esc(m.bar || "")}</span></span>${img}</a>`;
    }
    return `<a class="frame frame-diagram ${size || ""}" href="${esc(src)}" target="_blank" rel="noopener" aria-label="Open full-size diagram">${img}</a>`;
  }

  function linksFor(p) {
    const out = [];
    if (p.links.live) out.push(`<a href="${esc(p.links.live)}" target="_blank" rel="noopener">Open live site</a>`);
    if (p.links.repo) out.push(`<a href="${esc(p.links.repo)}" target="_blank" rel="noopener">View code</a>`);
    return out.length ? `<p class="proj-links">${out.join("")}</p>` : "";
  }
  const status = (p) => `<span class="status status-${p.status}">${STATUS[p.status]}</span>`;
  const trackLinks = (p) => p.tracks.map((t) => `<a href="${root}${t}/">${esc(S.tracks[t].name)}</a>`).join(", ");

  // Large alternating case study (home page)
  function caseStudy(p, i) {
    const m = (S.caseMeta || {})[p.id] || {};
    return `<article class="case ${i % 2 ? "case-flip" : ""}" id="${p.id}">
      <div class="case-media">${media(p.id, "frame-lg")}</div>
      <div class="case-text">
        <p class="case-meta">${status(p)}<span>${trackLinks(p)}</span></p>
        <h3>${esc(p.title)}</h3>
        <p class="proj-what">${esc(p.what)}</p>
        <p class="proj-how">${esc(p.how)}</p>
        <dl class="facts">
          ${m.role ? `<div><dt>Role</dt><dd>${esc(m.role)}</dd></div>` : ""}
          ${m.context ? `<div><dt>Context</dt><dd>${esc(m.context)}</dd></div>` : ""}
          <div><dt>Stack</dt><dd>${p.stack.map(esc).join(", ")}</dd></div>
        </dl>
        ${linksFor(p)}
      </div>
    </article>`;
  }

  // Card with image on top (grids)
  function card(p) {
    return `<article class="card" id="${p.id}">
      ${media(p.id)}
      <div class="card-body">
        <header class="proj-head"><h3>${esc(p.title)}</h3>${status(p)}</header>
        <p class="proj-what">${esc(p.what)}</p>
        <p class="proj-how">${esc(p.how)}</p>
        <p class="proj-stack">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</p>
        ${linksFor(p)}
      </div>
    </article>`;
  }

  function contactBlock() {
    const L = S.links;
    return `<section class="contact band" id="contact">
      <div>
        <h2>Let's talk</h2>
        <p class="lede">I'm looking for engineering roles in AI, cloud or embedded and automotive software, in Europe, Canada or remote.</p>
      </div>
      <ul class="contact-list">
        <li><span>Email</span><a href="mailto:${esc(L.email)}">${esc(L.email)}</a></li>
        <li><span>LinkedIn</span><a href="${esc(L.linkedin)}" target="_blank" rel="noopener">in/rayenabdelhafidh</a></li>
        <li><span>GitHub</span><a href="${esc(L.github)}" target="_blank" rel="noopener">rayen-abdelhafidh</a></li>
        <li><span>Upwork</span><a href="${esc(L.upwork)}" target="_blank" rel="noopener">Client reviews</a></li>
        <li><span>CV</span><a href="${root}${esc(L.cv)}" download>Download PDF</a></li>
      </ul>
    </section>`;
  }

  function nav() {
    const short = { ai: "AI & LLM", cloud: "Cloud & DevOps", automotive: "Embedded & automotive", security: "Security" };
    const items = Object.keys(S.tracks).map((k) =>
      `<a href="${root}${k}/"${page === k ? ' aria-current="page"' : ""}>${short[k]}</a>`).join("");
    return `<a class="brand" href="${root}"><img src="${root}img/rayen.webp" alt="" width="32" height="32">${esc(S.name)}</a>
      <nav aria-label="Portfolio tracks">${items}<a class="nav-cta" href="#contact">Contact</a></nav>`;
  }

  // ---------- Pages ----------
  function home() {
    const now = S.currently.map((x) => `<li><strong>${esc(x.role)}</strong><span>${esc(x.where)}</span></li>`).join("");
    const clients = S.clients.map((c) => `<li>${esc(c)}</li>`).join("");
    const toolbox = S.toolbox.map((g) => `<div class="tool-group"><h3>${esc(g.area)}</h3>
      <ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");

    const channels = Object.entries(S.tracks).map(([k, t]) => {
      const n = S.projects.filter((p) => p.tracks.includes(k)).length;
      return `<li><a class="channel" href="${k}/">
        <span class="ch-name">${esc(t.name)}</span>
        <span class="ch-short">${esc(t.short)}</span>
        ${waveSVG(t.wave)}
        <span class="ch-count">${n} projects</span>
      </a></li>`;
    }).join("");

    const cases = S.showcase.map((id, i) => caseStudy(byId[id], i)).join("");
    const more = S.more.map((id) => card(byId[id])).join("");

    const exp = S.experience.map((e) => `<li>
      <p class="tl-when">${esc(e.when)}</p>
      <div><h3>${esc(e.title)}</h3><p class="tl-org">${esc(e.org)}</p><p>${esc(e.note)}</p></div></li>`).join("");
    const edu = S.education.map((e) => `<li>
      <p class="tl-when">${esc(e.when)}</p>
      <div><h3>${esc(e.title)}</h3><p class="tl-org">${esc(e.org)}</p></div></li>`).join("");

    return `
      <section class="hero">
        <div class="hero-text">
          <p class="avail"><span class="dot" aria-hidden="true"></span>Open to engineering roles in Europe, Canada and remote</p>
          <h1>${esc(S.name)}</h1>
          <p class="lede">${esc(S.role)}</p>
          <p class="hero-actions"><a class="btn" href="${esc(S.links.cv)}" download>Download CV</a><a class="btn btn-quiet" href="#work">See my work</a></p>
        </div>
        <figure class="portrait"><img src="img/rayen.webp" alt="Portrait of Rayen Ben Abdelhafidh" width="720" height="720"><figcaption>Sfax, Tunisia. Open to relocation.</figcaption></figure>
        <div class="now">
          <h2 class="now-h">Currently</h2>
          <ul>${now}</ul>
        </div>
        <div class="clients"><h2 class="now-h">Worked with</h2><ul>${clients}</ul></div>
      </section>
      <section class="band tracks" aria-labelledby="tracks-h">
        <div class="sec-head"><h2 id="tracks-h">Four tracks, one engineer</h2><p>Pick the one you're hiring for. Each track has its own page you can share.</p></div>
        <ul class="channels">${channels}</ul>
      </section>
      <section id="work" aria-labelledby="sel-h">
        <div class="sec-head"><h2 id="sel-h">Selected work</h2><p>Real products, shown as they run. Click any image to see it full size.</p></div>
        <div class="cases">${cases}</div>
        <h2 class="sub-h">More projects</h2>
        <div class="cards">${more}</div>
      </section>
      <section class="editorial" aria-labelledby="exp-h">
        <div class="ed-head"><h2 id="exp-h">Experience</h2><p>Two years of shipping for real clients while studying.</p></div>
        <ol class="timeline">${exp}</ol>
      </section>
      <section class="editorial" aria-labelledby="tb-h">
        <div class="ed-head"><h2 id="tb-h">Toolbox</h2><p>What I use, grouped by domain.</p></div>
        <div class="toolbox">${toolbox}</div>
      </section>
      <section class="editorial" aria-labelledby="edu-h">
        <div class="ed-head"><h2 id="edu-h">Education</h2></div>
        <div>
          <ol class="timeline">${edu}</ol>
          <div class="creds">
            <div><h3>Certifications</h3><ul class="plain">${S.certifications.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
            <div><h3>Languages</h3><ul class="plain">${S.languages.split(", ").map((l) => `<li>${esc(l)}</li>`).join("")}</ul></div>
          </div>
        </div>
      </section>
      ${contactBlock()}`;
  }

  function track(k) {
    const t = S.tracks[k];
    const order = { live: 0, client: 1, academic: 2, progress: 3, planned: 4 };
    const projs = S.projects.filter((p) => p.tracks.includes(k)).sort((a, b) => order[a.status] - order[b.status]);
    const grid = (title, items) => `<ul class="skillgrid">${items.map((c) => `<li><h3>${esc(c[0])}</h3><p>${esc(c[1])}</p></li>`).join("")}</ul>`;
    const extra = k === "automotive" ? `
      <section aria-labelledby="el-h">
        <div class="sec-head"><h2 id="el-h">Embedded Linux toolkit</h2><p>What I work with when bringing up a board, from the toolchain to over-the-air updates.</p></div>
        ${grid("", S.embedded.map((c) => [c.area, c.items]))}
      </section>
      <section aria-labelledby="cw-h">
        <div class="sec-head"><h2 id="cw-h">Specialisation coursework, 2026/2027</h2><p>Final year at ENET'Com, GT-ACE class. Projects from these courses are added above as I finish them.</p></div>
        ${grid("", S.coursework.map((c) => [c.name, c.detail]))}
      </section>` : "";
    return `
      <section class="hero track-hero">
        <p class="back"><a href="${root}">All tracks</a></p>
        <h1>${esc(t.name)}</h1>
        ${waveSVG(t.wave, "wave-big")}
        <p class="lede">${esc(t.intro)}</p>
        <p class="hero-actions"><a class="btn" href="${root}${esc(S.links.cv)}" download>Download CV</a><a class="btn btn-quiet" href="#contact">Contact me</a></p>
      </section>
      <section aria-labelledby="p-h">
        <div class="sec-head"><h2 id="p-h">Projects</h2><p>${projs.length} projects. Screenshots show the real product; diagrams show how back-end and client systems are built.</p></div>
        <div class="cards">${projs.map(card).join("")}</div>
      </section>
      ${extra}
      ${contactBlock()}`;
  }

  $("#top").innerHTML = nav();
  $("#main").innerHTML = page === "home" ? home() : track(page);
  $("#foot").innerHTML = `<p>${esc(S.name)}, ${new Date().getFullYear()}</p><p><a href="${root}">Home</a> <a href="#top">Back to top</a></p>`;
  requestAnimationFrame(() => document.body.classList.add("ready"));
})();
