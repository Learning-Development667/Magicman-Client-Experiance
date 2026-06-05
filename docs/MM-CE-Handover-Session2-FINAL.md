# MM-CE Handover Brief - Session 2 FINAL

## Magicman Client Experience

### Date: 05 June 2026 | Start of Session 3 document

---

## READ THIS FIRST

This brief hands over from Session 2. Stage 1 is built and refined to the
revised FNOL claims-handler brief. Stages 2 to 6 are NOT started. The journey
map and game specifications for Stages 2 to 6 are unchanged and live in
`docs/MM-CE-JourneyMap-v2.md`.

There is one outstanding blocker carried into Session 3: the MARV sprite PNG
files are not in the repository. See the Assets section.

---

## Repository

- Repo: `Learning-Development667/Magicman-Client-Experiance`
- Active branch: `claude/happy-bardeen-Qx9h7`
- All work to date is committed and pushed to that branch.
- GitHub Pages (serves whichever single branch Pages is configured for):
  `https://learning-development667.github.io/Magicman-Client-Experiance/`
- Stage 1 preview:
  `https://learning-development667.github.io/Magicman-Client-Experiance/stages/MM-CE-S1-claim.html`

### GitHub Pages caveat
All work is on the feature branch `claude/happy-bardeen-Qx9h7`, not `main`.
GitHub Pages serves a single configured source. If Pages is pointed at `main`,
the preview URL will not reflect this branch until it is merged or the Pages
source is repointed at the branch. Confirm the Pages source at the start of
Session 3.

---

## Commit History (most recent first)

| Hash | Summary |
|---|---|
| `8b5292b` | Stage 1: extend MARV pause, add FNOL toast, captions, reposition bubble, materialise panel |
| `0a8bf8b` | Add Journey Map v2 to docs |
| `392e5c3` | Stage 1: add handler thought bubble state and MARV sprite in panel |
| `5aba1d3` | Rebuild Stage 1 (FNOL claims handler) with two-state decision panel |
| `f5dc426` | Add Stage 1 - The Problem Lands (claim submission) - SUPERSEDED |
| `88f1156` | Standardise reaction classes, add journey map, fix MARV init sprite |
| `82dbc32` | Scaffold MM-CE: folder structure, brand CSS, MARV/navigation JS, index shell |

Note: `f5dc426` was the original consumer-search Stage 1. It was fully replaced
by the FNOL claims-handler version in `5aba1d3` and after. The supplied
FNOL HTML file is now the canonical Stage 1.

---

## Current Repository State (tracked files)

```
assets/audio/.gitkeep
assets/images/.gitkeep
assets/marv/.gitkeep          <- MARV PNG sprites still missing here
assets/video/.gitkeep
css/main.css
docs/.gitkeep
docs/MM-CE-JourneyMap-v1.md   <- v1, superseded by v2, kept for history
docs/MM-CE-JourneyMap-v2.md   <- CURRENT signed-off journey map
index.html                    <- scaffold shell (pre-FNOL pivot)
js/main.js                    <- scaffold setMarv/navigation (pre-FNOL pivot)
stages/.gitkeep
stages/MM-CE-S1-claim.html    <- CURRENT Stage 1, FNOL claims-handler version
```

### Important note on index.html and js/main.js
These were built during the original scaffolding (consumer-search concept,
fetch-based stage loader). The supplied Stage 1 file (`stages/MM-CE-S1-claim.html`)
is fully self-contained - its own scenes, CSS, JS, and a local `setMarv()`.
It does NOT depend on the root `index.html` or `js/main.js`. At final assembly,
the project is to be consolidated into a single `index.html` with stages as
inline templates and no `fetch()`. The current root `index.html` / `js/main.js`
will need reworking at that assembly stage to match the FNOL concept and the
self-contained stage pattern. Flag for the planning chat: decide whether the
root shell is rebuilt now or at final assembly.

---

## Stage 1 - Current Build (stages/MM-CE-S1-claim.html)

Self-contained FNOL claims-handler experience. Scene flow:

1. `scene-intro` - title card, Start the Journey button.
2. `scene-fnol` - simulated insurer claims system in a browser chrome. On
   entry: a narrator caption fades in; an FNOL toast slides in top-right; the
   claim card shows damage/cover/assessment/cost. Below the claim:
   - STATE 1: three handler decision buttons (Authorise Repair grey,
     Authorise Replacement amber `#ffc107`, Repudiate red `#dc3545`).
   - INTERMEDIATE: at 2.7s the buttons fade and a handler thought bubble pops
     in floating above the top-right of the screen - "We should send this to
     Magicman..." (white, navy border, down-left tail, 20px Open Sans Bold).
   - STATE 2: at 4.8s the Ask MARV panel materialises (wasabi glow bleeds in,
     then content fades) with the MARV sprite and the "Ask MARV" button.
3. `scene-transition` - Option C reveal. The claims screen shrinks via CSS 3D
   perspective into MARV's workshop; caption "35 years of craft intelligence.
   Now inside your claims system."
4. `scene-marv` - MARV at his workstation. Line 1 (marvexcited intro), then
   after a 7s pause line 2 (marvconfident, correct-reaction style), then the
   Continue button appears.

### Stage 1 interaction timing (scene-fnol)
- 0s: decision buttons visible
- 0.5s: narrator caption fades in
- 0.8s: FNOL toast slides in (holds 3s, then out); notification ping
- 2.5s: decision buttons fade out
- 2.7s: thought bubble pops in
- 4.5s: thought bubble fades out
- 4.8s: Ask MARV panel materialises

### Known Stage 1 detail
- MARV sprites in Stage 1 are referenced two ways: the scene-4 workstation
  sprite uses an embedded base64 JPEG (self-contained, renders fine); the
  Ask MARV panel uses `<img src="../assets/marv/marvconfident.png">` which
  depends on the missing PNG (see Assets).

---

## OUTSTANDING BLOCKER - MARV sprite PNGs

`assets/marv/` contains only `.gitkeep`. None of the sprite PNGs are committed.
The Ask MARV panel in Stage 1 references `../assets/marv/marvconfident.png`,
which currently renders as the "MARV" alt text.

Required sprite files (naming convention, no extension shown):
marvexcited, marvconfident, marvfocussed, marvthumbsup, marvcongratulatory,
marvtriumphant, marvdisappointed, marvwincing, marvalarmed, marvclose,
marvmixing, marvthinking

ACTION FOR SESSION 3: upload the MARV PNG binaries so they can be committed to
`assets/marv/`. Until then, any stage referencing a sprite by path will show a
broken image. The build agent cannot fabricate or commit binaries it does not
have.

---

## Stages 2 to 6 - NOT STARTED

Full specifications are in `docs/MM-CE-JourneyMap-v2.md`. Summary and the
assets each will need before build:

- Stage 2 - The MARV Scanner (forensic surface scanning game).
  Needs: three surface sample images (acrylic, vitreous china, uPVC) -
  Firefly macro photography style. Sound design from the start.
- Stage 3 - Dispatch Command (mission control drag-and-drop, 3 rounds).
  Needs: stylised UK and Ireland map (SVG/canvas). Sound design.
- Stage 4 - The Repair Bench (craft tool-selection simulation, 6 steps).
  Needs: ANNOTATED workbench image before any coordinate code (do not estimate
  hotspots). Arrival and completion video clips. Sound design.
- Stage 5 - The Walkaround Inspection (clipboard inspection + before/after
  slider). Needs: clean original basin before/after photos with NO UI text
  overlaid. Request from user before build. Sound design.
- Stage 6 - The Reveal (animated debrief, seven beats + seven pillars + CTA).
  Needs: optional MARV closing video (Colossyan candidate). Sound design.

Pattern check (no two consecutive stages share an interaction type) is already
confirmed in the journey map.

---

## Standing Rules - Never Break

1. No em dashes - spaced hyphen only ( - ). Check every file before complete.
2. UK English throughout, every file.
3. No inspection lamps, no UV lights, no raking light anywhere.
4. No wax fillers.
5. No specific insurer client names - generic across all relationships.
6. Architecture before code - confirmed spec before any build.
7. Console clean before any file marked complete.
8. CSS grid expandable content: align-items: start on container and
   align-self: start on cards.
9. Hotspot coordinates: request annotated image - never estimate.
10. Speech bubble classes: `correct-reaction` and `wrong-reaction` (canonical).
11. Progression never fires on load - always user-triggered.
12. Sound designed in from the start on every game stage.
13. Session capacity reported every response; handover brief at 70%.

---

## Brand Standards (quick reference)

- Navy (Crow Black Blue) `#13294B` - primary background and structure
- Wasabi `#AED284` - primary accent
- Lone Hunter `#93C847` - secondary accent
- White `#FFFFFF` - text on dark, card backgrounds
- Dark text `#1A1A2E` - text on light
- WCAG: Wasabi and Lone Hunter FAIL as readable text on white. Use only as
  decorative fills or badge backgrounds with dark text.
- Font: Open Sans (Bold headings, Regular body) via Google Fonts
- H1 48.8 / H2 39 / H3 31 / H4 25 / H5 20 / Body 16px
- Max content width 1100px centred; card shadow 0 4px 16px rgba(0,0,0,0.18);
  card padding minimum 24px.

---

## MARV setMarv pattern

```javascript
function setMarv(emotion, text, style) {
  // emotion: sprite filename without extension, e.g. 'marvconfident'
  // text: speech bubble content
  // style: 'default' | 'correct-reaction' | 'wrong-reaction'
  const marvImg = document.getElementById('marv-sprite');
  const marvBubble = document.getElementById('marv-bubble');
  marvImg.src = `assets/marv/${emotion}.png`;
  marvBubble.textContent = text;
  marvBubble.className = `marv-bubble ${style}`;
}
```

Note: Stage 1 is self-contained and carries its own local `setMarv()` with a
stage-relative sprite base (`../assets/marv/`). Final assembly into a single
`index.html` will use the global pattern with root-relative paths.

---

## Build Method Notes for Session 3

- Stage files are large. The supplied Stage 1 HTML exceeds the editor read
  token cap, so edits were applied with anchored, count-verified text
  replacements (each anchor asserted to match exactly once). Continue this
  approach for surgical edits to large stage files.
- Each stage is built as a standalone, console-clean, em-dash-free HTML file,
  then assembled into a single `index.html` at the end (no `fetch()` in the
  final build).
- Validate every stage before commit: em/en dash scan, extract the script and
  run a JS syntax check, confirm div balance, confirm no duplicated ids.

---

## First Tasks in Session 3

1. Confirm the GitHub Pages source branch and verify the Stage 1 preview URL.
2. Upload the MARV sprite PNGs so they can be committed to `assets/marv/`.
3. Decide (planning chat) whether the root `index.html` / `js/main.js` shell is
   rebuilt now to the FNOL concept or left until final assembly.
4. When ready to build Stage 2, generate the three surface sample images and
   confirm the scanner game spec, then build with sound from the start.

---

*MM-CE Handover Brief Session 2 FINAL - 05 June 2026*
*Produced by MA Group Training and Development*
