# MM-CE Handover Brief - Session 3 (FINAL)

This brief lets a fresh chat continue the Magicman Client Experience (MM-CE)
build with no prior context. Read it top to bottom before touching anything.

## Repository and branch

- Repo: `Learning-Development667/Magicman-Client-Experiance`
- Active development branch: `claude/happy-bardeen-Qx9h7`
  (Develop on this branch. Do NOT push to `main` without explicit permission.)
- Latest commit at handover: `553a352`

GitHub Pages caveat: the canonical preview URL only works once Pages is
pointed at this branch. Until then, use a local server or the htmlpreview
fallback. Note htmlpreview does not always resolve the relative
`../assets/...` image paths, so screenshots/sprites may look missing there
even though they are committed and correct.

## How to add binary assets (IMPORTANT)

Chat-uploaded images are NOT written to the container filesystem, so the
assistant cannot save them directly. The working method (used for both the
MARV sprites and the website screenshots) is:

1. The user uploads files via the GitHub web UI directly onto branch
   `claude/happy-bardeen-Qx9h7`, into the target folder, with exact names.
2. The assistant runs `git fetch` + `git pull` (or rebases local code on
   top of the upload commit) and continues.

If a local code commit and the user's upload commit diverge, rebase the
code commit onto the upload commit (they touch different files, so it is
clean): `git rebase origin/claude/happy-bardeen-Qx9h7`.

## Commit history (most recent first)

- `553a352` Calibrate website overlay positions to the uploaded screenshots
- `5e594ef` Replace coded Magicman replica with screenshot-based two-view scene
- `7396936` Add files via upload (the two website screenshots)
- `26971b5` Add Magicman website scene (coded replica, later superseded)
- `2eed1b1` Recolour claims UI to teal enterprise scheme with dark backdrop
- `adc0e41` Recolour claims UI to enterprise corporate palette + system fonts
- `04603c7` Neutralise claims UI colours to a generic insurance platform
- `9f2234f` Point MARV sprite references at the hyphenated asset filenames
- `be1eb98` Add files via upload (the 12 MARV sprite PNGs)
- `1573946` Stage 1: slow down and space out the Scene 1 timeline, staggered buttons
- `2a68ef4` Stage 1: enlarge thought bubble, extend FNOL toast, glow materialise
- `52d33d9` Session 2 FINAL handover brief
- earlier: scaffold, brand CSS/JS, journey maps, Stage 1 FNOL build

## Current tracked files of note

- `stages/MM-CE-S1-claim.html` - the entire Stage 1 build. Self-contained
  (its own scenes, CSS, JS, audio, and a local `setMarv`). This is the
  only stage file that exists.
- `index.html` + `js/main.js` - original scaffold/shell, predate the FNOL
  pivot. Reference MARV sprite `marv-excited.png`. Not part of the Stage 1
  flow. An assembly-time decision is still pending on whether the final
  product is one shell loading stages, or standalone stage files.
- `assets/marv/` - 12 sprite PNGs, hyphenated names (see below).
- `assets/images/` - the two website screenshots (see below).
- `assets/audio/` and `assets/video/` - empty except `.gitkeep`.
- `docs/` - journey maps v1 and v2, plus the Session 2 and this Session 3
  handover.

## Asset inventory

MARV sprites in `assets/marv/` (hyphenated convention, all valid PNG):
marv-alarmed, marv-close, marv-confident, marv-congratulatory,
marv-disappointed, marv-excited, marv-focussed, marv-mixing,
marv-thinking, marv-thumbsup, marv-triumphant, marv-wincing.

Convention note: filenames are hyphenated (`marv-confident.png`). Any code
that references a sprite by path MUST match the hyphen exactly or the image
404s. Code currently referencing sprites: Stage 1 Ask MARV panel uses
`../assets/marv/marv-confident.png`; `index.html` / `js/main.js` use
`marv-excited.png`. Stage 1 in-scene MARV (scene-marv) uses embedded
base64 JPEGs in a local `marvSprites` map, NOT file paths.

Website screenshots in `assets/images/`:
- `magicman-site-home.jpg` (1222x949)
- `magicman-site-estimate.jpg` (1111x938)

## Stage 1 flow (stages/MM-CE-S1-claim.html), scene by scene

1. `scene-intro` - title card, Begin button calls `startJourney()`.
2. `scene-fnol` - the claims handler scene. A teal enterprise claims UI
   simulation (recoloured from navy, see below) sits in a mac-style browser
   frame on a `#1A1A1A` backdrop. Deliberate timeline (absolute from scene
   load): 0s caption, 1.5s FNOL toast in, 2.0s decision buttons rise in
   staggered, 4.0s toast out, 6.0s buttons fade out, 7.2s handler thought
   bubble pops (holds 4s), 11.2s bubble fades, 12.0s Ask MARV panel begins
   its 3s glowing materialise, 15.0s panel fully visible and pulsing. The
   Ask MARV panel KEEPS full Magicman branding (navy + wasabi) - this
   contrast against the neutral teal claims UI is intentional. The Ask MARV
   button calls `activateMarv()`.
3. `scene-website` - NEW two-view scene (the focus of Session 3), plays
   between the Ask MARV click and the 3D transition. Details below.
4. `scene-transition` - the existing CSS 3D transition. The claims/website
   screen shrinks and rotates as MARV's world assembles. Triggered by
   `runTransition()`.
5. `scene-marv` - MARV at his workstation, speaks via local `setMarv`,
   then a Continue button (currently alerts a Stage 2 placeholder via
   `goToStage2()`).

## The new website scene (Session 3 work)

`scene-website` shows real screenshots of magicman.co.uk inside the same
browser chrome frame. No part of the page is rebuilt in code; the
screenshots ARE the page. There are two views:

- View 1 `#mm-view-home`: `magicman-site-home.jpg`, address bar shows
  `magicman.co.uk`. A single pulsing wasabi overlay
  (`.mm-overlay--estimate`) sits over the green ONLINE ESTIMATE button
  (top right). Clicking it calls `goToEstimate()`, which fades View 1 out
  and View 2 in and updates the address bar to
  `magicman.co.uk/online-estimate/`.
- View 2 `#mm-view-estimate`: `magicman-site-estimate.jpg`. A single
  pulsing wasabi overlay (`.mm-overlay--client`) sits over the Client
  Enquiry option box, with an animated bobbing pointer (`.mm-pointer`,
  the up-pointing hand). Clicking it calls `selectClientEnquiry()`, which
  fires the existing 3D transition into MARV's world.

JS helpers added: `showSiteView(viewId)` (fade in a view),
`goToEstimate()` (crossfade home to estimate), `selectClientEnquiry()`
(trigger transition). `activateMarv()` now loads `scene-website` View 1
instead of going straight to the transition.

### Overlay tuning (likely the first thing to revisit)

Overlays are absolutely positioned with PERCENTAGE top/left/width/height
so they track the image at any render size. They are grouped under a
clearly commented block in the CSS. Current calibrated values:

    .mm-overlay--estimate { top: 5%;  left: 80.5%; width: 10.5%; height: 4%; }
    .mm-overlay--client   { top: 57%; left: 66.5%; width: 20%;   height: 8%; }

These were measured from the actual screenshots and should be close. If a
nudge is needed it will be a percent or two. To adjust, edit only these
four values per overlay.

## Claims UI colour scheme (current)

The claims UI was recoloured several times. It now uses a TEAL enterprise
scheme (so it reads as a generic insurance platform, making the
Magicman-branded Ask MARV panel stand out):
- Header `#0D7377`, sidebar `#0A5C60`, active item bg `#E0F4F4` / text and
  border `#0D7377`, main area + container `#F2F8F8`, scene backdrop
  scoped to `#scene-website` and `#scene-fnol` as `#1A1A1A`.
- Card border `#CFE5E5`, dark text retinted to `#14292B` / `#2A3F3F`.
- Warning field stays amber `#fff3cd`, cost field stays red `#ffeaea`.
- Claims UI uses system fonts
  (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`); the
  Magicman website scene and Ask MARV panel keep Open Sans.

Two `#13294B` instances intentionally remain and are NOT claims chrome:
the global `--navy` variable (progress bar, MARV world, Ask MARV panel)
and the handler thought bubble border (a narrative element).

## Standing rules (apply every task)

1. Develop on `claude/happy-bardeen-Qx9h7`. Never push to `main` without
   explicit permission.
2. Commit with clear messages, then push
   `git push -u origin claude/happy-bardeen-Qx9h7`. Do NOT open a PR
   unless asked.
3. NO em dashes anywhere in on-screen text or files. Use hyphens. (This
   rule is about visible text; filenames and code are not the concern, but
   keep the whole file em-dash free to be safe.)
4. Console must be clean: no JS errors, balanced braces, all onclick
   handlers defined, no broken asset paths.
5. Brand colours: navy `--navy #13294B`, wasabi `--wasabi #AED284`,
   hunter `--hunter #93C847`, dark `#1A1A2E`. Fonts: Open Sans for brand
   surfaces.
6. The Ask MARV panel always keeps full Magicman branding. The claims UI
   stays neutral/teal. Keep that contrast.
7. Stage 1 is self-contained. When editing the large file, use anchored
   unique-string replacements; verify with grep after each change.
8. Binary assets arrive via the user's GitHub web UI upload, then pull or
   rebase (see "How to add binary assets").
9. Report back after each task with the commit hash and a preview URL.
10. Watch session capacity and offer a handover before running out of room.

## What is NOT started yet

Stages 2 to 6 do not exist. Per the journey maps they are roughly:
- Stage 2: MARV assesses / the surface scanner (forensic scan game).
  Needs surface damage images.
- Stage 3: Dispatch (UK map / routing). Needs a UK map asset.
- Stage 4: The repair (annotated workbench). Needs an annotated image.
- Stage 5: Quality check (before/after). Needs clean before/after photos.
- Stage 6: The outcome / close. Needs an optional closing MARV video and
  sound design.

The `goToStage2()` function in Stage 1 currently just alerts a placeholder.

## Suggested first tasks for the next session

1. Open Stage 1 in a browser (or Pages) and confirm the new website scene
   plays end to end: Ask MARV -> homepage -> estimate -> client enquiry ->
   3D transition. Fine-tune the two overlay percentages if needed.
2. Confirm the Pages source branch so a stable preview URL exists.
3. Decide the assembly model (single shell vs standalone stage files)
   before building Stage 2, since it affects sprite paths and navigation.
4. Begin Stage 2 once its surface images are uploaded.
