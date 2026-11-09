(function () {
  const S = window.SITE;
  const page = document.body.dataset.page; // "home" or a track key
  const root = document.body.dataset.root || "";
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const STATUS = {
    live: "Live",
    client: "Client work",
    academic: "Academic",
    progress: "In progress",
    planned: "Planned"
  };

  // ---------- Waveforms: each track drawn as its own signal ----------
  function wavePath(kind, w, h) {
    const mid = h / 2, pts = [];
    let seed = 7;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280) - 0.5;
    if (kind === "denoise") {
      for (let x = 0; x <= w; x += 3) {
        const t = x / w, noise = rnd() * h * 0.9 * Math.pow(1 - t, 1.6);
        pts.push([x, mid + Math.sin(x / 18) * h * 0.28 + noise]);
      }
      return "M" + pts.map((p) => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L");
    }
    if (kind === "square") {
      let d = "", hi = true, x = 0, period = 34;
      d = `M0 ${h * 0.2}`;
      while (x < w) {
        const y = hi ? h * 0.2 : h * 0.8;
        x = Math.min(w, x + period);
        d += ` L${x} ${y}`;
        hi = !hi;
        d += ` L${x} ${hi ? h * 0.2 : h * 0.8}`;
      }
      return d;
    }
    if (kind === "can") {
      // A CAN-like bit stream: start-of-frame, identifier, control, data, CRC, idle.
      const bits = "1111110110010100110000100011010110101100100111010011011111111110100101101001100";
      const bw = w / bits.length;
      let d = `M0 ${h * 0.22}`;
      for (let i = 0; i < bits.length; i++) {
        const y = bits[i] === "1" ? h * 0.22 : h * 0.78; // recessive high, dominant low
        d += ` L${(i * bw).toFixed(1)} ${y} L${((i + 1) * bw).toFixed(1)} ${y}`;
      }
      return d;
    }
    // burst: quiet line with gated spikes
    let d = `M0 ${mid}`;
    for (let x = 0; x <= w; x += 2) {
      const gate = (x > w * 0.18 && x < w * 0.24) || (x > w * 0.52 && x < w * 0.56) || (x > w * 0.83 && x < w * 0.9);
      const y = gate ? mid + Math.sin(x * 1.3) * h * 0.42 : mid + rnd() * 1.5;
      d += ` L${x} ${y.toFixed(1)}`;
    }
    return d;
  }

  function waveSVG(kind, cls) {
    const w = 600, h = 60;
    return `<svg class="wave ${cls || ""}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="${h / 2}" x2="${w}" y2="${h / 2}" class="wave-axis"/>
      <path d="${wavePath(kind, w, h)}" class="wave-line"/></svg>`;
  }

  // ---------- Shared pieces ----------
  function linksFor(p) {
    const out = [];
    if (p.links.live) out.push(`<a href="${esc(p.links.live)}" target="_blank" rel="noopener">Open live site</a>`);
    if (p.links.repo) out.push(`<a href="${esc(p.links.repo)}" target="_blank" rel="noopener">View code</a>`);
    return out.length ? `<p class="proj-links">${out.join("")}</p>` : "";
  }

  function projectRow(p, showTrack) {
    const trackNames = p.tracks.map((t) => `<a href="${root}${t}/">${esc(S.tracks[t].name)}</a>`).join(", ");
    return `<article class="proj" id="${p.id}">
      <header class="proj-head">
        <h3>${esc(p.title)}</h3>
        <span class="status status-${p.status}">${STATUS[p.status]}</span>
      </header>
      <p class="proj-what">${esc(p.what)}</p>
      <p class="proj-how">${esc(p.how)}</p>
      <p class="proj-stack">${p.stack.map(esc).join(", ")}</p>
      ${showTrack ? `<p class="proj-track">Part of ${trackNames}</p>` : ""}
      ${linksFor(p)}
    </article>`;
  }

  function contactBlock() {
    const L = S.links;
    return `<section class="contact" id="contact">
      <h2>Get in touch</h2>
      <p class="lede">I'm looking for engineering roles in AI, cloud or automotive software, in Europe, Canada or remote.</p>
      <ul class="contact-list">
        <li><a href="mailto:${esc(L.email)}">${esc(L.email)}</a></li>
        <li><a href="${esc(L.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a href="${esc(L.github)}" target="_blank" rel="noopener">GitHub</a></li>
        <li><a href="${esc(L.upwork)}" target="_blank" rel="noopener">Upwork reviews</a></li>
        <li><a href="${root}${esc(L.cv)}" download>Download CV (PDF)</a></li>
      </ul>
    </section>`;
  }

  function nav() {
    const items = Object.entries(S.tracks).map(([k, t]) =>
      `<a href="${root}${k}/"${page === k ? ' aria-current="page"' : ""}>${esc(t.name.split(" ")[0].replace(",", ""))}</a>`).join("");
    return `<a class="brand" href="${root}">${esc(S.name)}</a><nav aria-label="Tracks">${items}<a href="#contact">Contact</a></nav>`;
  }

  // ---------- Pages ----------
  function home() {
    const channels = Object.entries(S.tracks).map(([k, t]) => {
      const n = S.projects.filter((p) => p.tracks.includes(k)).length;
      return `<li><a class="channel" href="${k}/">
        <span class="ch-name">${esc(t.name)}</span>
        <span class="ch-short">${esc(t.short)}</span>
        ${waveSVG(t.wave)}
        <span class="ch-count">${n} projects</span>
      </a></li>`;
    }).join("");

    const featured = S.projects.filter((p) => p.featured).map((p) => projectRow(p, true)).join("");

    const exp = S.experience.map((e) => `<li>
      <p class="tl-when">${esc(e.when)}</p>
      <div><h3>${esc(e.title)}</h3><p class="tl-org">${esc(e.org)}</p><p>${esc(e.note)}</p></div></li>`).join("");
    const edu = S.education.map((e) => `<li>
      <p class="tl-when">${esc(e.when)}</p>
      <div><h3>${esc(e.title)}</h3><p class="tl-org">${esc(e.org)}</p></div></li>`).join("");

    return `
      <section class="hero">
        <h1>${esc(S.name)}</h1>
        <p class="lede">${esc(S.role)}</p>
        <p class="where">${esc(S.location)}</p>
        <p class="hero-actions"><a class="btn" href="${esc(S.links.cv)}" download>Download CV</a><a class="btn btn-quiet" href="#contact">Contact me</a></p>
      </section>
      <section aria-labelledby="tracks-h">
        <h2 id="tracks-h">Pick the track you're hiring for</h2>
        <ul class="channels">${channels}</ul>
      </section>
      <section aria-labelledby="sel-h">
        <h2 id="sel-h">Selected work</h2>
        <div class="projects">${featured}</div>
      </section>
      <section aria-labelledby="exp-h">
        <h2 id="exp-h">Experience</h2>
        <ol class="timeline">${exp}</ol>
      </section>
      <section aria-labelledby="edu-h" class="two-col">
        <div>
          <h2 id="edu-h">Education</h2>
          <ol class="timeline">${edu}</ol>
        </div>
        <div>
          <h2>Certifications</h2>
          <ul class="plain">${S.certifications.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
          <h2>Languages</h2>
          <p>${esc(S.languages)}</p>
        </div>
      </section>
      ${contactBlock()}`;
  }

  function track(k) {
    const t = S.tracks[k];
    const projs = S.projects.filter((p) => p.tracks.includes(k));
    const order = { live: 0, client: 1, academic: 2, progress: 3, planned: 4 };
    projs.sort((a, b) => order[a.status] - order[b.status]);
    const course = k === "automotive" ? `
      <section aria-labelledby="el-h">
        <h2 id="el-h">Embedded Linux toolkit</h2>
        <p class="lede small">What I work with when bringing up a board, from the toolchain to over-the-air updates.</p>
        <ul class="coursework">${S.embedded.map((c) => `<li><h3>${esc(c.area)}</h3><p>${esc(c.items)}</p></li>`).join("")}</ul>
      </section>
      <section aria-labelledby="cw-h">
        <h2 id="cw-h">Specialisation coursework, 2026/2027</h2>
        <p class="lede small">Final year at ENET'Com, GT-ACE class. Projects from these courses are added above as I finish them.</p>
        <ul class="coursework">${S.coursework.map((c) => `<li><h3>${esc(c.name)}</h3><p>${esc(c.detail)}</p></li>`).join("")}</ul>
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
        <h2 id="p-h">Projects</h2>
        <div class="projects">${projs.map((p) => projectRow(p, false)).join("")}</div>
      </section>
      ${course}
      ${contactBlock()}`;
  }

  $("#top").innerHTML = nav();
  $("#main").innerHTML = page === "home" ? home() : track(page);
  $("#foot").innerHTML = `<p>${esc(S.name)}, ${new Date().getFullYear()}. Built by hand, hosted on GitHub Pages.</p>`;
  requestAnimationFrame(() => document.body.classList.add("ready"));
})();
