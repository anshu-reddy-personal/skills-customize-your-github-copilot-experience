/* US National Parks - Park Detail Page JavaScript */

class ParkDetailPage {
  constructor() {
    this.park = null;
    this.allParks = null;
    this.init();
  }

  async init() {
    try {
      const id = new URLSearchParams(window.location.search).get("id");
      if (!id) { this.showError("No park specified."); return; }

      const response = await fetch("data/parks.json");
      if (!response.ok) throw new Error("Failed to load data");
      const data = await response.json();

      this.allParks = data.parks;
      this.park = data.parks.find((p) => p.id === id);
      if (!this.park) { this.showError(`Park "${id}" not found.`); return; }

      this.render();
    } catch (err) {
      console.error(err);
      this.showError("Failed to load park information.");
    }
  }

  render() {
    const p = this.park;
    document.title = `${p.name} National Park | US National Parks`;
    this.renderHero(p);
    this.renderOverview(p);
    this.renderHighlights(p);
    this.renderSeasons(p);
    this.renderMustSee(p);
    this.renderTrails(p);
    this.renderWildlife(p);
    this.renderFees(p);
    this.renderSidebar(p);
    this.renderMap(p);
    this.renderNav(p);
  }

  renderHero(p) {
    const el = document.getElementById("park-hero");
    if (!el) return;
    const rankClass = p.rank <= 3 ? `rank-${p.rank}` : "rank-top";
    el.innerHTML = `
      <div class="container">
        <div class="park-hero-inner">
          <div class="park-hero-text">
            <div style="display:flex;align-items:center;gap:0.7rem;margin-bottom:0.5rem;">
              <span class="rank-badge ${rankClass}">${p.rank}</span>
              <span style="opacity:0.8;font-size:0.9rem">Ranked #${p.rank} of 15</span>
            </div>
            <h1>${p.name} National Park</h1>
            <p class="subtitle">📍 ${p.state.join(", ")} &bull; Established ${p.established}</p>
            <div class="park-hero-stats">
              <div class="hero-stat">
                <div class="value">${this.formatVisitors(p.annual_visitors)}</div>
                <div class="label">Annual Visitors</div>
              </div>
              <div class="hero-stat">
                <div class="value">${this.formatAcres(p.area_acres)}</div>
                <div class="label">Total Area</div>
              </div>
              <div class="hero-stat">
                <div class="value">${p.entrance_fees.vehicle === 0 ? "FREE" : "$" + p.entrance_fees.vehicle}</div>
                <div class="label">Vehicle Entry</div>
              </div>
            </div>
          </div>
          <div class="park-hero-image">
            <span style="font-size:4.5rem">${this.getParkEmoji(p.id)}</span>
            <small>${p.photo_credit}</small>
          </div>
        </div>
      </div>
    `;
  }

  renderOverview(p) {
    const el = document.getElementById("park-overview");
    if (el) el.textContent = p.overview;
  }

  renderHighlights(p) {
    const el = document.getElementById("park-highlights");
    if (!el) return;
    el.innerHTML = `<ul class="highlights-list">${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>`;
  }

  renderSeasons(p) {
    const el = document.getElementById("park-seasons");
    if (!el) return;
    const s = p.best_seasons;
    el.innerHTML = `
      <div class="seasons-wrap">
        ${s.peak.map((m) => `<span class="season-chip season-peak">✅ ${m}</span>`).join("")}
        ${s.shoulder.map((m) => `<span class="season-chip season-shoulder">🌤 ${m}</span>`).join("")}
        ${s.avoid.map((m) => `<span class="season-chip season-avoid">❌ ${m}</span>`).join("")}
      </div>
      <p style="margin-top:0.8rem;font-size:0.9rem;color:var(--text-muted)">${s.notes}</p>
    `;
  }

  renderMustSee(p) {
    const el = document.getElementById("park-must-see");
    if (!el) return;
    el.innerHTML = `<ul class="features-list">${p.must_see_features.map((f) => `<li>${f}</li>`).join("")}</ul>`;
  }

  renderTrails(p) {
    const el = document.getElementById("park-trails");
    if (!el) return;
    const rows = p.trails
      .map((t) => {
        const diffClass = `difficulty-${t.difficulty.toLowerCase()}`;
        return `
          <tr>
            <td><strong>${t.name}</strong></td>
            <td><span class="difficulty ${diffClass}">${t.difficulty}</span></td>
            <td>${typeof t.distance_miles === "number" ? t.distance_miles + " mi" : t.distance_miles}</td>
            <td>${t.notes}</td>
          </tr>
        `;
      })
      .join("");
    el.innerHTML = `
      <table class="trails-table">
        <thead>
          <tr>
            <th>Trail Name</th><th>Difficulty</th><th>Distance</th><th>Notes</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  renderWildlife(p) {
    const mammalEl = document.getElementById("park-mammals");
    const birdEl   = document.getElementById("park-birds");
    const notesEl  = document.getElementById("park-wildlife-notes");

    if (mammalEl) mammalEl.innerHTML = p.wildlife.mammals.map((m) => `<li>🦬 ${m}</li>`).join("");
    if (birdEl)   birdEl.innerHTML   = p.wildlife.birds.map((b) => `<li>🦅 ${b}</li>`).join("");
    if (notesEl)  notesEl.textContent = p.wildlife.notes;
  }

  renderFees(p) {
    const el = document.getElementById("park-fees");
    if (!el) return;
    const f = p.entrance_fees;
    const rows = [
      ["Private Vehicle (7 days)", f.vehicle],
      ["Motorcycle (7 days)", f.motorcycle],
      ["Walk-in / Bike-in (7 days)", f.individual],
      ["Annual Pass", f.annual_pass],
    ];
    el.innerHTML = `
      <table class="fee-table">
        <tbody>
          ${rows.map(([label, cost]) => `<tr><td>${label}</td><td>${cost === 0 ? "FREE" : "$" + cost}</td></tr>`).join("")}
        </tbody>
      </table>
      <p style="margin-top:0.8rem;font-size:0.85rem;color:var(--text-muted)">${f.notes}</p>
    `;
  }

  renderSidebar(p) {
    const linksEl = document.getElementById("park-nps-links");
    if (linksEl) {
      linksEl.innerHTML = `
        <a href="${p.nps_links.main}" class="nps-link" target="_blank" rel="noopener">🌐 Official NPS Page</a>
        <a href="${p.nps_links.plan_your_visit}" class="nps-link" target="_blank" rel="noopener">📋 Plan Your Visit</a>
        <a href="${p.nps_links.maps}" class="nps-link" target="_blank" rel="noopener">🗺️ Maps &amp; Downloads</a>
      `;
    }

    const coordEl = document.getElementById("park-coordinates");
    if (coordEl) {
      coordEl.textContent = `${p.coordinates.lat.toFixed(4)}° N, ${Math.abs(p.coordinates.lng).toFixed(4)}° W`;
    }
  }

  renderMap(p) {
    const mapEl = document.getElementById("park-map");
    if (!mapEl || typeof L === "undefined") return;

    const map = L.map("park-map").setView([p.coordinates.lat, p.coordinates.lng], 9);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const icon = L.divIcon({
      className: "",
      html: `<div style="background:#2d6a4f;color:#fff;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.4)">${p.rank}</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });

    L.marker([p.coordinates.lat, p.coordinates.lng], { icon })
      .addTo(map)
      .bindPopup(`<strong>${p.name} National Park</strong><br>${p.state.join(", ")}`)
      .openPopup();
  }

  renderNav(p) {
    const prev = this.allParks.find((x) => x.rank === p.rank - 1);
    const next = this.allParks.find((x) => x.rank === p.rank + 1);
    const el = document.getElementById("park-nav");
    if (!el) return;

    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;">
        ${prev ? `<a href="park.html?id=${prev.id}" class="btn btn-outline">← #${prev.rank} ${prev.name}</a>` : '<span></span>'}
        <a href="index.html" class="btn btn-outline">🏞️ All Parks</a>
        ${next ? `<a href="park.html?id=${next.id}" class="btn btn-outline">#${next.rank} ${next.name} →</a>` : '<span></span>'}
      </div>
    `;
  }

  showError(msg) {
    const main = document.getElementById("park-main");
    if (!main) return;
    const wrapper = document.createElement("div");
    wrapper.className = "container";
    const box = document.createElement("div");
    box.className = "error";
    box.style.marginTop = "2rem";
    box.textContent = msg;
    wrapper.appendChild(box);
    main.innerHTML = "";
    main.appendChild(wrapper);
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  formatVisitors(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return Math.round(n / 1000) + "K";
    return n.toString();
  }

  formatAcres(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M acres";
    if (n >= 1000) return Math.round(n / 1000) + "K acres";
    return n + " acres";
  }

  getParkEmoji(id) {
    const emojis = {
      yellowstone: "🌋", "grand-canyon": "🏜️", yosemite: "🏔️",
      zion: "🪨", "grand-teton": "⛰️", glacier: "🧊",
      "rocky-mountain": "🦌", acadia: "🌊", olympic: "🌲",
      "great-smoky-mountains": "🌿", arches: "🌅", "bryce-canyon": "🏜️",
      "sequoia-kings-canyon": "🌳", "joshua-tree": "🌵", denali: "🦅",
    };
    return emojis[id] || "🏞️";
  }
}

document.addEventListener("DOMContentLoaded", () => new ParkDetailPage());
