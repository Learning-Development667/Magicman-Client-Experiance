# MM-CE Handover, Session 5 FINAL

This brief lets a fresh chat continue with zero prior context. It supersedes the
Session 4 brief for current state. The Session 2, 3 and 4 briefs plus both
Journey Maps remain in `docs/` as background. The next planned work is the
**MARV Scanner game in Stage 2**, which is currently a placeholder.

## 1. Repo and branch state

- Repo: `Learning-Development667/Magicman-Client-Experiance`
- Active development branch: `claude/happy-bardeen-Qx9h7`
- Latest commit at handover: `3be234e` (Point Stage 1 customer video at actual uploaded filename)
- All project work lives on this branch, NOT on `main`. `main` only has the
  original README-era content. There is no open PR.
- Default branch on GitHub is `main`. GitHub Pages: the repo reports
  `has_pages: true` with homepage
  `https://learning-development667.github.io/Magicman-Client-Experiance/`, but
  the GitHub tooling here exposes no Pages config endpoint, so the serving
  branch/folder cannot be confirmed from inside a session. Pages almost
  certainly serves `main`, so feature-branch work will not appear live until
  merged.

### Previewing (the reliable method)
htmlpreview renders a branch file directly:
- Stage 1: `https://htmlpreview.github.io/?https://github.com/Learning-Development667/Magicman-Client-Experiance/blob/claude/happy-bardeen-Qx9h7/stages/MM-CE-S1-claim.html`
- Stage 2: `https://htmlpreview.github.io/?https://github.com/Learning-Development667/Magicman-Client-Experiance/blob/claude/happy-bardeen-Qx9h7/stages/MM-CE-S2-assessment.html`
Large media (the ~7MB customer video) loads through the htmlpreview proxy, so
allow a moment.

## 2. How binary assets reach the repo (critical workflow)

Images, audio and video CANNOT be created from chat. The pattern is:
1. The user uploads files via the GitHub web UI, creating an "Add files via
   upload" commit on the branch.
2. Claude runs `git fetch` / `git pull origin claude/happy-bardeen-Qx9h7` to
   bring them into the container before referencing them.

If a referenced asset is missing locally, check the remote branch first
(`git ls-tree -r --name-only origin/claude/happy-bardeen-Qx9h7 -- assets/`) and
pull, rather than assuming it does not exist.

### Filename gotcha: the customer video
The customer interview video churned through several uploads, alternating
between the misspelled `cusotmer_contractor_conversation.mp4` and the correct
`customer_contractor_conversation.mp4`, each upload silently replacing the
other and breaking whichever name the HTML referenced. As of this handover the
on-disk file is correctly named `customer_contractor_conversation.mp4` and
Stage 1 references `../assets/video/customer_contractor_conversation.mp4`. The
durable rule: **reference the actual on-disk filename, do not assume the
spelling, grep the file before referencing**, and after any push rejection
re-check this reference because uploads can swap it again.

## 3. Project architecture (read this before building Stage 2 features)

There are TWO parallel things in the repo, and it matters which one you touch:

### A. The shared shell
- `index.html` (root) is an app shell: a sticky six-step progress bar (rendered
  by `js/main.js` from a `STAGES` array), an intro card with a "Begin the
  journey" button and a MARV guide block, and an empty `#stage-host` that
  `loadStage()` fetches stage fragments into.
- `js/main.js` (IIFE, `window.MMCE` public API): defines the six `STAGES`
  (Claim, Assessment, Dispatch, Repair, Quality, Outcome), `setMarv()` (targets
  ids `marv-sprite` / `marv-bubble`, path `assets/marv/<emotion>.png`),
  `renderProgress()` (targets `#progress-steps`), `loadStage()` (fetch + inject),
  and **device detection** (see section 6).
- `css/main.css`: brand variables (`--navy #13294B`, `--wasabi #AED284`,
  `--lone-hunter #93C847`, `--white`, `--dark-text`, `--reaction-wrong #C0392B`,
  type scale, etc.), base/reset, components (`.card`, `.btn`/`.btn-primary`/
  `.btn-ghost`, `.progress-bar`/`.progress-step`, `.marv`/`.marv-sprite`/
  `.marv-bubble`), the mobile section, and the DEV nav styling.

### B. The standalone stage pages
- `stages/MM-CE-S1-claim.html` and `stages/MM-CE-S2-assessment.html` are
  full self-contained HTML documents (own `<style>` and `<script>`), each now
  ALSO linking `../css/main.css` and `../js/main.js`. They are NOT currently
  fetched as fragments by the shell; they are opened directly.
- `loadStage()` in `main.js` would `innerHTML`-inject a full document into
  `#stage-host`, which is not valid for these standalone pages. The assembly
  model (shell fetches fragments vs standalone full pages) is still UNDECIDED.
  In practice the experience is navigated via the DEV nav and in-page links, not
  via the shell fetch. Decide the assembly model before relying on `loadStage`.

### How the stages coexist with main.js safely
`main.js` runs on every page that links it. Its `init()` calls are written to
no-op where the shell elements are absent:
- `renderProgress()` returns unless `#progress-steps` exists. The stage pages use
  `class="progress-steps"` (no id) for their hardcoded bars, so main.js never
  resets them.
- `setMarv()` returns unless BOTH `#marv-sprite` and `#marv-bubble` exist. Stage
  pages deliberately avoid those exact ids (Stage 1 has `#marv-sprite` but its
  bubble is `#marv-speech`; Stage 2 uses `#s2-marv-sprite` / `#s2-marv-bubble`),
  so main.js does not overwrite stage MARV state or fetch a wrong-path sprite.
- The `#start-journey` listener simply is not attached if the button is absent.
RULE for new stages: do NOT reuse the ids `marv-sprite`, `marv-bubble` or
`progress-steps` unless you want main.js to drive them.

## 4. Stage 1 current state, `stages/MM-CE-S1-claim.html`

Self-contained document. Flow, in order:

1. **Ken Burns opening overlay** (`#kb-overlay`, fixed, z-index 1000), built and
   run by an IIFE at the end of the script:
   - A **start gate**: a navy screen ("The Repair Journey" / "Sound on for the
     full experience" / **Begin the journey** button). Nothing autoplays.
     Clicking Begin starts the ambient music AND the cinematic (the click is the
     gesture that satisfies browser autoplay policy).
   - **8 Ken Burns panels** (image + Ken Burns pan + top-left location label +
     centred typed incident report). The bottom-left description text was
     removed earlier; panels now carry only `img`, `label`, `report`. Location
     label is 40px wasabi uppercase. Current panel data (order, image, label,
     report) is in `KB_PANELS`; panel 1 scorch_mark_burn, panel 2 basin-before,
     panel 3 marble_polished_floor, panel 4 tile-before, panel 5 counter_chip,
     panel 6 marble-before, panel 7 door_frame_chip, panel 8 cabinet-before.
   - **Ambient music**: `<audio id="kb-music">` loads
     `../assets/audio/ambient_music.mp3`, loop, volume 0.3. Starts on Begin,
     stops/removed at the title-card fade-out. (Old Web Audio "thud" generator
     was removed.)
   - **Title card** ("Every day. Everywhere." / "A better answer exists.").
2. **Post-cinematic, still inside the overlay** (navy stages, fade between):
   - "Hear from a customer" button. Click plays the customer video with sound
     (`#kb-video`, full-width rounded navy card,
     `../assets/video/customer_contractor_conversation.mp4`). This click grants
     audio permission.
   - Customer video ends, fade to navy, a wasabi radial pulse fires, then MARV's
     **silent** welcome video (`#kb-marv-video`,
     `../assets/video/marv_welcome_video.mp4`, muted) materialises in place of a
     sprite. A speech bubble appears at 600ms
     ("Quite the adventure, she said..."), then a **Show me** button.
   - Show me fades the overlay out, revealing the claims UI underneath.
3. **Claims UI and scenes** (the original Stage 1 content): `scene-intro`
   ("Start the Journey"), `scene-fnol` (the FNOL claim, policyholder message now
   mentions the contractor recommending Magicman), `scene-website`,
   `scene-transition` ("35 years"), `scene-marv` (MARV speaks; includes the new
   **MARV verdict block** "How MARV makes the call" beneath the CLM reference
   card; continue button is a `goToStage2()` placeholder alert).

### Stage 1 dev tooling
- **Test SKIP button** (`#test-skip`, fixed **bottom-left**, marked `TEST ONLY`):
  each click jumps to the next action button (cinematic -> CTA -> Show me ->
  claims UI -> FNOL website button -> MARV continue). Works by cancelling all
  pending timers then setting the next state, so it touches no sequence code.
  Removable: delete the `.test-skip` CSS, the `#test-skip` markup, and the
  `testSkip()` function.
- **DEV nav panel** (see section 5).

## 5. Stage 2 current state, `stages/MM-CE-S2-assessment.html` (new this session)

Self-contained, wired to the shared files. Flow:

- **Progress bar**: six steps, Stage 1 complete, **Stage 2 active** (hardcoded,
  `class="progress-steps"` so main.js leaves it alone).
- **Persistent MARV** (`.marv` with ids `#s2-marv-sprite` / `#s2-marv-bubble`),
  updated by a local `marvSay(emotion, text)` using path `../assets/marv/`.
- **Section 1 (`#s2-intro`)**: intro line (marvexcited), "Click each panel to
  find out more" prompt with a wasabi pulse on panel 1.
  - **4 stat panels** (`.stat-panel`, 2x2 grid, click-to-reveal scale+fade).
    Each reveal fires a MARV reaction by `data-index` from `STAT_REACTIONS`
    (35+ years -> marvconfident, 24/7 -> marvconfident, Minutes -> marvexcited,
    Up to 90% -> marvtriumphant). After all four, the audience section reveals.
  - **4 audience cards** (`.audience-card`, 2x2, click-to-reveal, SILENT, no MARV
    reaction): For Customers, For Insurers, For Technicians, Craft Intelligence.
    After all four, MARV -> marvconfident ("That is who I am...") and the
    **Let's go** button appears.
- **Section 2 (`#s2-game`)**: hidden until Let's go. Currently a PLACEHOLDER:
  navy `.s2-scanner` card, wasabi "The MARV Scanner" heading, "This section is
  under construction..." body, MARV -> marvthinking. **This is where the MARV
  Scanner game gets built next.**
- No progression fires on load; every reveal is user-triggered; Let's go is the
  only advance. Back-to-Stage-1 buttons in both sections. Buttons use shared
  `.btn .btn-primary` / `.btn .btn-ghost`.

## 6. Device detection and mobile (added this session)

- `js/main.js` tags `<body>` with `device-mobile` (viewport < 768px) or
  `device-desktop` (>= 768px) via `applyDeviceClass()`, on load and on a
  debounced resize listener. `MOBILE_BREAKPOINT = 768`.
- All mobile CSS lives in `css/main.css`, scoped to `body.device-mobile`
  (overflow-x hidden, H1 32 / H2 26 / body 16, single-column grids, MARV stack,
  full-width 48px buttons, `video` 100%, simplified progress bar showing only
  the active step, lighter Ken Burns pan, plus Stage 1 specifics for
  `.btn-primary`/`.btn-secondary`/`.scene-actions`/`.marv-world`/`.claim-fields`).
- Both stage pages link `../css/main.css` BEFORE their own `<style>`, so the
  page's bespoke styles win the cascade while the higher-specificity
  `body.device-mobile` rules still apply. Stage 2 adds its own
  `body.device-mobile` rules for `.stat-grid` / `.audience-grid` etc.
- NOTE: loading the full `main.css` into the bespoke stages can leak a few
  element-level rules (`p`, `h1`, `img` margins). No class-name collisions were
  found. This was not visually verified in a browser; eyeball desktop + mobile
  if you touch base styling.

## 7. Developer Navigation panel (added this session)

- Present in `index.html`, Stage 1 and Stage 2. A small collapsed **wasabi DEV
  tab**, fixed bottom-right, very high z-index (always on top, never blocking the
  experience). Click expands a **navy panel** above the tab with a red
  "Developer Navigation - Remove Before Launch" heading and red border, and a
  link per built stage (Stage 1 -> The Problem Lands, Stage 2 -> Assessment).
  Toggle closed by clicking DEV again.
- Shared styling lives in ONE block in `css/main.css`. Each file's markup is a
  `#dev-nav` div preceded by the EXACT comment
  `DEVELOPER NAVIGATION - REMOVE BEFORE LAUNCH` (searchable).
- Add a new `.dev-nav__btn` link as each stage is built. Mind the relative
  paths: from `index.html` use `stages/MM-CE-S...`, from a stage file use the
  bare `MM-CE-S...` filename.
- To remove for launch: delete that CSS block and every `#dev-nav` markup div.
- The Stage 1 test SKIP button was moved to bottom-LEFT so it does not collide
  with the bottom-right DEV tab.

## 8. Asset inventory

### MARV sprites, `assets/marv/` (hyphen-free, exact filename matters)
marvalarmed, marvclose, marvconfident, marvcongratulatory, marvdisappointed,
marvexcited, marvfocussed (double s), marvmixing, marvthinking, marvthumbsup,
marvtriumphant, marvwincing. Path from a stage file is
`../assets/marv/<name>.png`; from the shell it is `assets/marv/<name>.png`.
(Stage 1 also embeds some MARV sprites as base64 data URIs in its scenes,
independent of these files.)

### Video, `assets/video/`
`customer_contractor_conversation.mp4` (customer interview, plays with sound;
spelling has churned across uploads, see section 2),
`marv_welcome_video.mp4` (silent welcome clip).

### Audio, `assets/audio/`
`ambient_music.mp3` (Ken Burns ambient track).

### Images, `assets/images/`
basin-after/before, cabinet-after/before, counter_chip, door_frame_chip,
lobby_floor_tile_scratch (now unused by Ken Burns after panel 3 swap),
magicman-site-estimate.jpg, magicman-site-home.jpg, marble-after/before,
marble_polished_floor (Ken Burns panel 3), polished_stone_scratch (now unused),
scorch_mark_burn (panel 1), sideboard-after/before, tile-after/before,
window-after/before. Naming is mixed kebab/snake; `src` must match exactly.
Many after/before pairs are still unused and likely intended for later stages.

## 9. Standing rules and conventions

1. Develop only on `claude/happy-bardeen-Qx9h7`; never push to `main` without
   explicit permission.
2. Commit and push only what the user asks; use the exact commit message when
   one is given.
3. Do not create PRs unless explicitly asked.
4. Handover briefs and committed artifacts are em-dash free. UK English.
5. Binary assets arrive via web UI upload then pull; they cannot be made in chat.
6. Image/sprite/video/audio `src` paths must match filenames exactly (hyphen vs
   underscore vs case all matter). Grep the actual file before referencing.
7. When asked to change one thing, change only that. Additive over invasive.
   Preserve existing progression logic.
8. Before deleting or renaming an asset, grep for references (excluding docs).
9. Validate JS edits by extracting the `<script>` block and running
   `node --check` before committing. Keep the browser console clean.
10. No `gh` CLI here; GitHub work goes through the GitHub MCP tools, which do not
    expose a Pages endpoint. Be honest about what cannot be verified (e.g. no
    in-session browser, so visual layout/regressions are unverified).
11. The remote can move under you (uploads). If a push is rejected, fetch, check
    `git log HEAD..origin/...`, merge, and re-check asset references afterwards.

## 10. Suggested first tasks for the next session (Stage 2 game)

1. Build the **MARV Scanner game** inside Stage 2's `#s2-game` section, replacing
   the placeholder `.s2-scanner` card. The before/after image pairs in
   `assets/images/` (basin, cabinet, marble, tile, window, sideboard) are the
   obvious raw material for an assess/scan interaction.
2. Keep it self-contained in Stage 2, reuse the shared `.btn` and MARV pattern,
   honour `body.device-mobile` for responsiveness, and keep MARV reactions going
   through the local `marvSay()` (do not reuse the protected ids from section 3).
3. When the game can complete, wire its end to advance toward Stage 3 (and add a
   Stage 3 DEV nav button once that file exists).
4. Optionally resolve the assembly-model question and whether to merge to `main`
   to get a live Pages URL.

## 11. Capacity note

Session 5 ran long. The biggest context cost remains repeated reads of
`MM-CE-S1-claim.html` (large base64 sprite data). Keep reads targeted (line
ranges, grep with base64 filtered). This is a clean stopping point: everything
is committed and pushed at `3be234e`. A fresh chat can resume from this brief
plus the current branch state.
