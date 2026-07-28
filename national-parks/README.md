# 🏞️ Top US National Parks

> A clean, data-driven guide to the **15 greatest national parks** in the United States — covering rankings, trails, wildlife, entrance fees, best seasons, and must-see experiences.

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Data: NPS](https://img.shields.io/badge/Data-NPS-2d6a4f)](https://www.nps.gov)

---

## 🗂️ Contents

| File / Folder | Purpose |
|---|---|
| [`data/parks.json`](data/parks.json) | Structured park data (JSON) — scores, trails, fees, wildlife, NPS links |
| [`index.html`](index.html) | Ranked parks landing page (static site) |
| [`park.html`](park.html) | Individual park detail page (rendered from URL `?id=park-id`) |
| [`css/parks.css`](css/parks.css) | Stylesheet |
| [`js/parks.js`](js/parks.js) | Portal page JavaScript |
| [`js/park-detail.js`](js/park-detail.js) | Park detail page JavaScript |
| [`guides/`](guides/) | Visitor guides: packing list & Leave No Trace |
| [`itineraries/`](itineraries/) | Sample multi-day itineraries |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | How to add or improve park data |

---

## 🏆 The 15 Parks (Ranked)

| Rank | Park | State(s) | Annual Visitors | Entry Fee |
|---:|---|---|---:|---|
| 1 | Yellowstone | WY / MT / ID | 4.86M | $35/vehicle |
| 2 | Grand Canyon | AZ | 4.73M | $35/vehicle |
| 3 | Yosemite | CA | 3.90M | $35/vehicle |
| 4 | Zion | UT | 4.69M | $35/vehicle |
| 5 | Grand Teton | WY | 3.30M | $35/vehicle |
| 6 | Glacier | MT | 3.08M | $35/vehicle |
| 7 | Rocky Mountain | CO | 4.40M | $30/vehicle |
| 8 | Acadia | ME | 3.97M | $35/vehicle |
| 9 | Olympic | WA | 3.00M | $30/vehicle |
| 10 | Great Smoky Mountains | TN / NC | 13.3M | **FREE** |
| 11 | Arches | UT | 1.80M | $30/vehicle |
| 12 | Bryce Canyon | UT | 2.60M | $35/vehicle |
| 13 | Sequoia & Kings Canyon | CA | 1.80M | $35/vehicle |
| 14 | Joshua Tree | CA | 3.20M | $30/vehicle |
| 15 | Denali | AK | 600K | $15/vehicle |

---

## 📊 Ranking Methodology

Rankings are computed as a weighted composite score across **five factors**, each scored 1–10:

| Factor | Weight | Source |
|---|---|---|
| **Visitation** | 25% | NPS annual statistics (irma.nps.gov) |
| **Iconic Status** | 25% | Cultural recognition, photography reach, global name recognition |
| **Biodiversity** | 20% | Documented species count, ecosystem variety (IUCN + NPS records) |
| **Scenery** | 20% | Landscape variety, geological uniqueness, visual impact |
| **Accessibility** | 10% | Road access, ADA infrastructure, gateway airports, shuttle availability |

### Composite Score Formula

```
score = (visitation × 0.25) + (iconic_status × 0.25)
      + (biodiversity × 0.20) + (scenery × 0.20)
      + (accessibility × 0.10)
```

All raw factor scores are stored in `data/parks.json` under each park's `"scores"` object,
making the rankings fully auditable and reproducible.

> **Caveats:** Rankings are inherently subjective and intended as a starting point for
> exploration, not a definitive list. Great parks like Shenandoah, Canyonlands, Badlands,
> and Capitol Reef narrowly missed this list. Contributions expanding to additional parks
> are very welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📦 Data Structure

Each park in [`data/parks.json`](data/parks.json) contains:

```json
{
  "id": "yellowstone",
  "rank": 1,
  "name": "Yellowstone",
  "state": ["Wyoming", "Montana", "Idaho"],
  "established": 1872,
  "area_acres": 2219791,
  "annual_visitors": 4860000,
  "scores": {
    "visitation": 9,
    "iconic_status": 10,
    "biodiversity": 10,
    "scenery": 10,
    "accessibility": 8
  },
  "overview": "...",
  "highlights": ["..."],
  "best_seasons": { "peak": [...], "shoulder": [...], "avoid": [...], "notes": "..." },
  "must_see_features": ["..."],
  "trails": [{ "name": "...", "difficulty": "Easy|Moderate|Strenuous", "distance_miles": 0, "notes": "..." }],
  "wildlife": { "mammals": [...], "birds": [...], "notes": "..." },
  "entrance_fees": { "vehicle": 35, "motorcycle": 30, "individual": 20, "annual_pass": 70, "currency": "USD", "notes": "..." },
  "nps_links": { "main": "https://...", "plan_your_visit": "https://...", "maps": "https://..." },
  "coordinates": { "lat": 44.4280, "lng": -110.5885 }
}
```

---

## 🚀 Running Locally

This is a **zero-dependency static site** — no build step required.

### Option 1: Python (built-in)

```bash
# Clone the repo
git clone https://github.com/anshu-reddy-personal/skills-customize-your-github-copilot-experience.git
cd skills-customize-your-github-copilot-experience/national-parks

# Serve (Python 3)
python -m http.server 8080

# Open in browser
open http://localhost:8080
```

### Option 2: Node.js (`npx serve`)

```bash
cd national-parks
npx serve .
# Follow the printed URL
```

### Option 3: VS Code Live Server

Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer),
right-click `national-parks/index.html` → **Open with Live Server**.

> **Note:** Opening `index.html` directly as a `file://` URL will not work because the
> JavaScript fetches `data/parks.json` via a relative URL, which requires an HTTP server.

---

## 🗺️ Interactive Map

The parks listing page includes an interactive Leaflet map loaded from the CDN. Each numbered
marker corresponds to a park's rank. Clicking a marker opens a popup with the park name and
a link to its detail page. No API key is required — the map uses OpenStreetMap tiles.

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Adding a new park
- Improving trail or wildlife data
- Adding itineraries or photo credits
- Reporting data errors

---

## 📄 License

Park data, written content, and code in this directory are released under the
[Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) license.

**Attribution required:** Please credit this repository and link to the National Park Service
(nps.gov) when reusing data.

Original NPS data is in the public domain per 17 U.S.C. § 105.

---

## 🔗 Useful Links

- [National Park Service](https://www.nps.gov)
- [America the Beautiful Annual Pass](https://www.nps.gov/findapark/passes.htm) — covers entrance fees at all NPS fee areas ($80/year)
- [NPS Stats Portal](https://irma.nps.gov/Stats/) — raw visitation data
- [Recreation.gov](https://www.recreation.gov) — campground and permit reservations
