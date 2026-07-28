/* US National Parks - Main Portal JavaScript */

class NationalParksPortal {
  constructor() {
    this.parksData = null;
    this.init();
  }

  async init() {
    try {
      await this.loadData();
      this.renderMethodology();
      this.renderParks();
      this.renderMap();
    } catch (err) {
      console.error("Failed to load parks data:", err);
      document.getElementById("parks-grid").innerHTML =
        '<div class="error">Failed to load parks data. Please try refreshing the page.</div>';
    }
  }

  async loadData() {
    const response = await fetch("data/parks.json");
    if (!response.ok) throw new Error("Network response was not ok");
    this.parksData = await response.json();
  }

  // ── Rendering ──────────────────────────────────────────────────────────────

  renderParks() {
    const grid = document.getElementById("parks-grid");
    if (!grid || !this.parksData) return;

    const html = this.parksData.parks
      .sort((a, b) => a.rank - b.rank)
      .map((park) => this.createParkCard(park))
      .join("");

    grid.innerHTML = html;

    // Animate score bars after render
    requestAnimationFrame(() => {
      document.querySelectorAll(".score-bar-fill").forEach((bar) => {
        bar.style.width = bar.dataset.width;
      });
    });
  }

  createParkCard(park) {
    const rankClass = park.rank <= 3 ? `rank-${park.rank}` : "rank-top";
    const totalScore = this.calculateTotalScore(park.scores);
    const scorePct = Math.round((totalScore / 10) * 100);
    const isFree = park.entrance_fees.vehicle === 0;
    const stateLabel = park.state.join(", ");
    const emoji = this.getParkEmoji(park.id);

    return `
      <div class="park-card" data-park-id="${park.id}">
        <div class="park-card-image" style="background: ${this.getParkGradient(park.id)}">
          <div class="park-card-rank">
            <span class="rank-badge ${rankClass}">${park.rank}</span>
            #${park.rank} Ranked
          </div>
          <div class="park-card-img-placeholder">
            <span>${emoji}</span>
            <small>${park.name} NP</small>
          </div>
        </div>
        <div class="park-card-body">
          <div>
            <div class="park-card-title">${park.name}</div>
            <div class="park-card-state">📍 ${stateLabel} &bull; Est. ${park.established}</div>
          </div>
          <p class="park-card-desc">${park.overview}</p>
          <div class="park-card-meta">
            <span class="meta-tag">👥 ${this.formatVisitors(park.annual_visitors)}/yr</span>
            <span class="meta-tag">🏞️ ${this.formatAcres(park.area_acres)}</span>
            ${isFree ? '<span class="meta-tag fee-free">🆓 Free Entry</span>' : `<span class="meta-tag">🎫 $${park.entrance_fees.vehicle}/vehicle</span>`}
          </div>
        </div>
        <div class="park-card-footer">
          <div class="score-bar-wrap">
            <div class="score-label">Overall Score: ${totalScore.toFixed(1)}/10</div>
            <div class="score-bar">
              <div class="score-bar-fill" style="width: 0%" data-width="${scorePct}%"></div>
            </div>
          </div>
          &nbsp;
          <a href="park.html?id=${park.id}" class="btn btn-primary">Explore →</a>
        </div>
      </div>
    `;
  }

  renderMethodology() {
    const container = document.getElementById("methodology-factors");
    if (!container || !this.parksData) return;

    const factors = this.parksData.metadata.rankingMethodology.factors;
    const html = factors
      .map(
        (f) => `
        <div class="factor-card">
          <div class="weight">${Math.round(f.weight * 100)}%</div>
          <h4>${f.name}</h4>
          <p>${f.description}</p>
        </div>
      `
      )
      .join("");

    container.innerHTML = html;
  }

  renderMap() {
    const mapEl = document.getElementById("parks-map");
    if (!mapEl || !this.parksData || typeof L === "undefined") return;

    const map = L.map("parks-map").setView([39.5, -98.35], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const greenIcon = L.divIcon({
      className: "",
      html: '<div style="background:#2d6a4f;color:#fff;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    this.parksData.parks.forEach((park) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="background:#2d6a4f;color:#fff;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${park.rank}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker([park.coordinates.lat, park.coordinates.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<strong>#${park.rank} ${park.name}</strong><br>${park.state.join(", ")}<br><a href="park.html?id=${park.id}">View Details →</a>`
        );
    });
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  calculateTotalScore(scores) {
    const weights = {
      visitation: 0.25,
      iconic_status: 0.25,
      biodiversity: 0.20,
      scenery: 0.20,
      accessibility: 0.10,
    };
    return Object.entries(weights).reduce(
      (sum, [key, weight]) => sum + (scores[key] || 0) * weight,
      0
    );
  }

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
      yellowstone: "🌋",
      "grand-canyon": "🏜️",
      yosemite: "🏔️",
      zion: "🪨",
      "grand-teton": "⛰️",
      glacier: "🧊",
      "rocky-mountain": "🦌",
      acadia: "🌊",
      olympic: "🌲",
      "great-smoky-mountains": "🌿",
      arches: "🌅",
      "bryce-canyon": "🏜️",
      "sequoia-kings-canyon": "🌳",
      "joshua-tree": "🌵",
      denali: "🦅",
    };
    return emojis[id] || "🏞️";
  }

  getParkGradient(id) {
    const gradients = {
      yellowstone:             "linear-gradient(135deg,#7b5e3a 0%,#c9a227 100%)",
      "grand-canyon":          "linear-gradient(135deg,#c0552a 0%,#e8934a 100%)",
      yosemite:                "linear-gradient(135deg,#4a6741 0%,#7ba05b 100%)",
      zion:                    "linear-gradient(135deg,#c45c24 0%,#e0956a 100%)",
      "grand-teton":           "linear-gradient(135deg,#2e5d8a 0%,#6aabcf 100%)",
      glacier:                 "linear-gradient(135deg,#2d6a8f 0%,#72c4e8 100%)",
      "rocky-mountain":        "linear-gradient(135deg,#3d5a40 0%,#76a37a 100%)",
      acadia:                  "linear-gradient(135deg,#1e3f5c 0%,#4a8aad 100%)",
      olympic:                 "linear-gradient(135deg,#1f5e35 0%,#52aa6e 100%)",
      "great-smoky-mountains": "linear-gradient(135deg,#3d5a30 0%,#7aaf5e 100%)",
      arches:                  "linear-gradient(135deg,#b04c1a 0%,#e07b39 100%)",
      "bryce-canyon":          "linear-gradient(135deg,#b54c25 0%,#d9855a 100%)",
      "sequoia-kings-canyon":  "linear-gradient(135deg,#4a3a2a 0%,#9c7b50 100%)",
      "joshua-tree":           "linear-gradient(135deg,#8a6a2a 0%,#c9a840 100%)",
      denali:                  "linear-gradient(135deg,#2a4a5a 0%,#4a8090 100%)",
    };
    return gradients[id] || "linear-gradient(135deg,#2d6a4f 0%,#40916c 100%)";
  }
}

// Boot
document.addEventListener("DOMContentLoaded", () => new NationalParksPortal());
