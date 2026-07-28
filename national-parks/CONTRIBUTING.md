# Contributing to Top US National Parks

Thank you for your interest in improving this resource! Contributions are welcome from anyone.

## 📋 Ways to Contribute

- **Add a new park** — extend the ranked list with additional parks
- **Improve existing data** — correct trail distances, fees, visitor counts, or season info
- **Add itineraries** — write multi-day trip plans for parks that lack them
- **Add wildlife entries** — expand mammal or bird lists with accurate species
- **Fix broken NPS links** — URLs change; please report or update them
- **Improve the site** — CSS, JavaScript, accessibility, or new features

---

## 🚀 Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/skills-customize-your-github-copilot-experience.git
   cd skills-customize-your-github-copilot-experience/national-parks
   ```
3. **Create a branch** for your change:
   ```bash
   git checkout -b add-shenandoah-park
   ```
4. **Make your changes** (see guidelines below)
5. **Run locally** to verify everything looks correct:
   ```bash
   python -m http.server 8080
   # open http://localhost:8080
   ```
6. **Commit** with a clear message:
   ```bash
   git commit -m "Add Shenandoah National Park (rank 16)"
   ```
7. **Push** and open a **Pull Request** against `main`

---

## 🏞️ Adding a New Park

All park data lives in [`data/parks.json`](data/parks.json). To add a park:

1. Open `data/parks.json`
2. Add a new object to the `"parks"` array following the schema below
3. Assign a `rank` (the list can be extended beyond 15)
4. Verify your JSON is valid (paste into [jsonlint.com](https://jsonlint.com))

### Required Fields

```json
{
  "id": "shenandoah",
  "rank": 16,
  "name": "Shenandoah",
  "state": ["Virginia"],
  "established": 1935,
  "area_acres": 199218,
  "annual_visitors": 1500000,
  "scores": {
    "visitation": 5,
    "iconic_status": 6,
    "biodiversity": 7,
    "scenery": 8,
    "accessibility": 9
  },
  "overview": "A concise, accurate 2–4 sentence description of the park.",
  "highlights": ["List", "of", "top", "features"],
  "best_seasons": {
    "peak": ["October"],
    "shoulder": ["May", "September"],
    "avoid": [],
    "notes": "Explain why each season is rated as it is."
  },
  "must_see_features": ["At least 4 specific actionable experiences"],
  "trails": [
    {
      "name": "Old Rag Mountain",
      "difficulty": "Strenuous",
      "distance_miles": 9.0,
      "notes": "Rock scramble to the summit; timed-entry permit required"
    }
  ],
  "wildlife": {
    "mammals": ["Black bear", "White-tailed deer", "Wild turkey"],
    "birds": ["Peregrine falcon", "Ruffed grouse"],
    "notes": "Any safety or etiquette notes for wildlife viewing."
  },
  "entrance_fees": {
    "vehicle": 30,
    "motorcycle": 25,
    "individual": 15,
    "annual_pass": 55,
    "currency": "USD",
    "notes": "Any additional fee notes."
  },
  "nps_links": {
    "main": "https://www.nps.gov/shen/",
    "plan_your_visit": "https://www.nps.gov/shen/planyourvisit/index.htm",
    "maps": "https://www.nps.gov/shen/planyourvisit/maps.htm"
  },
  "photo_placeholder": "assets/images/shenandoah.jpg",
  "photo_credit": "Photo: NPS / [Photographer Name]",
  "coordinates": { "lat": 38.4926, "lng": -78.4678 }
}
```

### Scoring Guidelines

Score each factor **1–10** using these benchmarks:

| Score | Visitation | Iconic Status | Biodiversity | Scenery | Accessibility |
|---|---|---|---|---|---|
| 10 | >10M visitors | Global icon | 1000+ species documented | World-class, irreplaceable | Major airports, highways, shuttles |
| 8 | 3–10M | National icon | Exceptional diversity | Outstanding landscape | Good roads, some transit |
| 6 | 1–3M | Regional icon | Good diversity | Scenic | Moderate access |
| 4 | 500K–1M | Known to enthusiasts | Average | Nice | Limited access |
| 2 | <500K | Specialist interest | Low | Modest | Remote, difficult access |

---

## ✏️ Editing Existing Data

- Always cite your source (NPS website, academic paper, news article) in the PR description
- Entrance fees change annually — please link to the official NPS fee page
- Trail distances should match the NPS or AllTrails official measurements
- Visitor counts come from NPS Stats: [irma.nps.gov/Stats/](https://irma.nps.gov/Stats/)

---

## 🗓️ Adding an Itinerary

Create a new Markdown file in `itineraries/` following the pattern of existing files:

```
itineraries/
  yellowstone-3-day.md
  grand-canyon-2-day.md
  your-new-itinerary.md   ← add here
```

Update [`itineraries/index.html`](itineraries/index.html) to link to your new file.

**Itinerary template:**

```markdown
# [Park Name] — [N]-Day Itinerary

**Best for:** [type of traveler]
**Difficulty:** Easy / Moderate / Active

## Day 1: [Theme]
...

## Day 2: [Theme]
...

## Practical Tips
...

## Getting There
...
```

---

## 🌿 Content Standards

- **Accuracy first** — double-check facts against official NPS sources
- **Inclusive language** — write for all experience levels, abilities, and backgrounds
- **No promotional content** — do not mention or link to commercial tour operators
- **Leave No Trace** — any trail or wildlife advice should align with LNT principles
- **Accessibility** — note ADA-accessible facilities and trails where relevant

---

## 🐛 Reporting Issues

Found incorrect data, a broken link, or a bug? Please open a GitHub Issue with:
- What is wrong
- What the correct information is (with source link if possible)
- Which park or file is affected

---

## 📄 Licensing

By contributing, you agree that your contributions will be released under the
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license that covers this project.
