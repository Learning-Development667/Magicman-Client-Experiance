# MM-CE Handover, Session 4 FINAL

This brief lets a fresh chat continue with zero prior context. It supersedes
the Session 3 brief for current state, but the Session 2 and Session 3 briefs
plus both Journey Maps remain in `docs/` as background.

## 1. Repo and branch state

- Repo: `Learning-Development667/Magicman-Client-Experiance`
- Active development branch: `claude/happy-bardeen-Qx9h7`
- Latest commit at handover: `6a306c5` (Remove orphaned scorch-mark image)
- All work in this project lives on this branch, NOT on `main`. `main` only has
  the original README era content.

### GitHub Pages and previewing
- Pages is NOT confirmed to be enabled, and there is no Pages endpoint
  available through the GitHub tooling in this environment to verify it.
- Even if Pages is on, it almost certainly serves `main`, so feature branch
  work will not show on Pages until merged.
- The conventional (unconfirmed) Pages URL for Stage 1 would be:
  https://learning-development667.github.io/magicman-client-experiance/stages/MM-CE-S1-claim.html
- The reliable way to preview the branch right now is htmlpreview:
  https://htmlpreview.github.io/?https://github.com/Learning-Development667/Magicman-Client-Experiance/blob/claude/happy-bardeen-Qx9h7/stages/MM-CE-S1-claim.html
  Stage 1 is a standalone full HTML document, so htmlpreview renders it directly.

## 2. How binary assets reach the repo (important workflow)

Images and other binaries CANNOT be created from chat. The working pattern is:
1. The user uploads files through the GitHub web UI, which creates a commit
   titled "Add files via upload" on the branch.
2. Claude runs `git fetch` / `git pull origin claude/happy-bardeen-Qx9h7` to
   bring them into the container before referencing them.

If a referenced image is missing locally, check the remote branch first
(`git ls-tree -r --name-only origin/claude/happy-bardeen-Qx9h7 -- assets/images/`)
and pull, rather than assuming it does not exist. This happened with
`scorch_mark_burn.png` in this session.

## 3. Commit history this session (newest first)

- `6a306c5` Remove orphaned scorch-mark image
- `dc20cb1` Update Panel 1 Ken Burns image to scorch_mark_burn
- `539e6dd` Add files via upload (scorch_mark_burn.png)
- `436dc43` Update Ken Burns sequence, larger text, incident reports, revised timing
- `37fc393` Add Ken Burns opening sequence to Stage 1
- `59c1cf4` Fix image filenames, remove spaces and normalise casing
- `fd4c295` Add files via upload (the 17 before/after and damage images)
- `af4f0af` Increase 35 years screen duration and add Back button navigation
- `2d1d982` Speed up Visit the Magicman Website button fade-in
- `81673d2` Add finger pointer to homepage overlay, View 1
- `e3e982b` Rename MARV sprites to remove hyphens
- `e6d4675` Add Session 3 FINAL handover brief

## 4. Asset inventory

### MARV sprites, `assets/marv/` (hyphen free, this matters)
Filenames have NO hyphens. The root `js/main.js` builds a sprite path as
`'assets/marv/' + emotion + '.png'`, so the emotion key must match the exact
filename without extension.

marvalarmed, marvclose, marvconfident, marvcongratulatory, marvdisappointed,
marvexcited, marvfocussed (double s), marvmixing, marvthinking, marvthumbsup,
marvtriumphant, marvwincing. Plus `.gitkeep`.

Note: Stage 1 (`stages/MM-CE-S1-claim.html`) embeds its own MARV sprites as
base64 data URIs in a local `marvSprites` map keyed by `excited` and
`confident`, independent of the files above. Only one real file reference exists
in Stage 1: `../assets/marv/marvconfident.png` (the panel-title icon).

### Images, `assets/images/`
Website screenshots (hyphenated): `magicman-site-home.jpg`,
`magicman-site-estimate.jpg`.

Damage and before/after photos: `basin-after.png`, `basin-before.png`,
`cabinet-after.png`, `cabinet-before.png`, `counter_chip.png`,
`door_frame_chip.png`, `marble-after.png`, `marble-before.png`,
`polished_stone_scratch.png`, `scorch_mark_burn.png`, `sideboard-after.png`,
`sideboard-before.png`, `tile-after.png`, `tile-before.png`, `window-after.png`,
`window-before.png`. Plus `.gitkeep`.

Naming is mixed: most are kebab-case, a few are snake_case (`counter_chip`,
`door_frame_chip`, `polished_stone_scratch`, `scorch_mark_burn`). Earlier cleanup
removed spaces and a capitalised name, and deleted a duplicate `door frame_chip`.
The old `scorch-mark.png` was removed this session in favour of
`scorch_mark_burn.png`. Rule: `src` paths must match filenames exactly, including
underscores vs hyphens.

## 5. Stage 1 file structure, `stages/MM-CE-S1-claim.html`

This is a single self-contained document: its own CSS in one `<style>` block,
its own JS in one `<script>` block at the end of body, and a local `setMarv()`
plus scene manager. It does not depend on the root `index.html` or `js/main.js`.

### Scene flow (in order)
1. `scene-intro` (active on load): title plus "Start the Journey" button,
   calls `startJourney()`. This is the first scene.
2. `scene-fnol`: the FNOL claim narrative. A timed sequence (caption, toast,
   decision buttons, handler thought bubble) ending at 12s with the Ask MARV
   panel revealing the "Visit the Magicman Website" button (`activateMarv()`).
3. `scene-website`: the Magicman site, View 1 home then View 2 online estimate,
   navigated by clickable image overlays (`goToEstimate()`,
   `selectClientEnquiry()`), each with an animated finger pointer.
4. `scene-transition`: the "35 years of craft intelligence" interstitial, shrink
   plus whoosh animation, auto-advances to MARV.
5. `scene-marv`: MARV speaks, then the "MARV, show me what happens next"
   continue button (`goToStage2()`, currently an alert placeholder for Stage 2).

### Navigation specifics
- `showScene(id)` toggles the `.active` class on `.scene` sections.
- `goBack(targetSceneId)` is additive (it reuses `showScene`, changes no existing
  forward logic). Back buttons (secondary, outlined, class `.btn-secondary`,
  grouped in `.scene-actions`) appear only on scenes with a Next/Continue button:
  scene-fnol Back goes to scene-intro, scene-marv Back goes to scene-website.
  scene-intro (first scene) and scene-website (overlay hotspots, no Next button)
  have no Back button by design.
- The "35 years" interstitial holds for 4800ms before transitioning (doubled
  from 2400ms). Only the dwell changed, animation speeds are untouched.

## 6. Ken Burns opening sequence (newest major feature)

Runs once, full screen, before any Stage 1 content. Built and driven entirely by
a self-contained IIFE at the end of the `<script>` block. Markup is just one
empty `<div id="kb-overlay" class="kb-overlay">` inserted as the first body
child. CSS lives in the `<style>` block under the "KEN BURNS OPENING SEQUENCE"
comment.

### Structure
- 8 full-screen panels, then a title card, then the overlay removes itself from
  the DOM and reveals Stage 1 (which is already present underneath, so no change
  to existing content was needed).
- The overlay is `position: fixed; z-index: 1000`, covering the progress bar and
  scene-intro until teardown.

### Per panel
- Image fills screen with `object-fit: cover`.
- Ken Burns zoom via CSS `@keyframes kb-zoom-a` / `kb-zoom-b` (scale 1.0 to 1.08
  with a small translate), direction alternates by panel index, 4.5s.
- Location label, top left, `.kb-label`, Open Sans 16px uppercase wasabi
  `#AED284`, letter-spacing 2px, fades in at 0.5s.
- Incident description, bottom left, `.kb-text`, Open Sans Bold 28px white,
  max-width 500px, dark gradient behind via `.kb-panel::after`, fades in at 1s.
- Centred incident report, `.kb-report`, system-log style: dark semi-transparent
  card `rgba(0,0,0,0.6)`, subtle wasabi border `rgba(174,210,132,0.5)`, 20px
  padding, max-width 600px, monospace, wasabi `#AED284`, 16px. Types out
  character by character at 30ms/char starting at 1.5s.

### Timing
- Per-panel hold = `max(7000, 1500 + report.length * 30 + 2000)` ms. That is
  typing start at 1.5s, plus typing time, plus 2s reading, with a 7s minimum.
  In practice panels run about 7 to 8.5s. Driven by a sequential `advance()`
  scheduler (not fixed intervals).
- Title card: white "Every day. Everywhere." plus wasabi "A better answer
  exists." Fades in, holds about 3s, fades out, then overlay is removed.

### Panel data (order, image, label, bottom text, report)
The panel array `KB_PANELS` holds img, label, text, report per panel. Panel 1
currently uses `../assets/images/scorch_mark_burn.png` with bottom text
"A resident left a pan on the hob unattended. The worktop took the full heat."
The other 7 use basin-before, polished_stone_scratch, tile-before, counter_chip,
marble-before, door_frame_chip, cabinet-before in that order.

### Audio
- A subtle percussive thud is generated per panel via the Web Audio API
  (`kbThud()`): a low 120 to 50 Hz sine plus a faint high-passed noise crack.
  No external files.
- KNOWN LIMITATION: the sequence autoplays on load with no user gesture, so most
  browsers keep the AudioContext suspended and the thuds stay silent until the
  user interacts with the page. The code calls `resume()` defensively. This is a
  browser autoplay policy, not a bug. Visuals, typing, and timing all run on load.

## 7. Standing rules and conventions

1. Develop only on `claude/happy-bardeen-Qx9h7`, never push to `main` without
   explicit permission.
2. Commit and push only what the user asks, with the exact commit message given.
3. Do not create PRs unless explicitly asked.
4. Handover briefs and committed artifacts are kept em-dash free.
5. Binary assets arrive via web UI upload then pull, they cannot be made in chat.
6. Image and sprite `src` paths must match filenames exactly (hyphen vs
   underscore vs case all matter).
7. When asked to change one thing, change only that. Additive over invasive.
   Preserve existing progression logic.
8. Before deleting or renaming an asset, grep for references (excluding docs)
   to confirm nothing breaks.
9. Validate JS edits to Stage 1 with `node --check` on the extracted `<script>`
   block before committing.
10. There is no `gh` CLI here. GitHub work goes through the GitHub MCP tools,
    which do not expose a Pages endpoint. Be honest about what cannot be verified.

## 8. Not started yet

- Stages 2 to 6 (`stages/MM-CE-S2-...` through `S6`) are not built. The root
  `js/main.js` lists them (Assess, Dispatch, Repair, Quality, Outcome) and
  `goToStage2()` in Stage 1 is currently a placeholder alert.
- The assembly model is still undecided: single shell (root `index.html` plus
  `js/main.js` fetching stage fragments) versus standalone full-page stages like
  Stage 1 currently is. Decide this before building Stage 2, since Stage 1 is
  self-contained and would need adapting to fit a fetched-fragment model.
- The damage and before/after images (basin, cabinet, marble, tile, window,
  sideboard, counter, door frame) are in the repo but only the Ken Burns panels
  use a subset so far. The after images are unused, likely intended for the
  repair or outcome stages.

## 9. Suggested first tasks for the next session

1. Confirm whether Pages should be enabled and on which branch, then decide on
   merging to make a live URL possible.
2. Eyeball the Ken Burns sequence and the website overlay positions in a real
   browser (htmlpreview link above).
3. Decide the assembly model, then start Stage 2 (MARV Assesses), which will
   want the before/after image pairs.

## 10. Capacity note

Session 4 has run long. The largest context cost is repeated full reads of
Stage 1, which contains large base64 MARV sprite data URIs. Exact context usage
cannot be measured precisely from inside the session, but it is meaningfully
consumed. This is a clean stopping point. A fresh chat can resume from this brief
plus the current branch state at `6a306c5`.
