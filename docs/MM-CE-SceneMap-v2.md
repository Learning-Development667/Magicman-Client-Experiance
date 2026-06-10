# MM-CE Scene Map v2.0

## Magicman Client Experience - Accurate, As-Built Scene Map

**Generated:** 09 June 2026
**Branch:** `claude/happy-bardeen-Qx9h7`
**Scope:** Every stage file present in `stages/` (S1 to S4). Stages 5 to 7 have no files and are listed as Not started.

> This document reflects what is **actually built in the code**, scene by scene, not the planned narrative in `MM-CE-JourneyMap-v2.md` (which describes an earlier intended design that differs from the current build, e.g. the planned S1 browser-search opening is not what ships - S1 is now a Ken Burns cinematic).

---

## Stage Overview

| Stage | File | Title | Built? | Interaction model | MARV emotion states used |
|---|---|---|---|---|---|
| 1 | MM-CE-S1-claim.html | The Problem Lands | Built | Cinematic + click-through | Silent welcome video (no emotion sprite in the active flow); legacy path uses `confident` |
| 2 | MM-CE-S2-gap.html | The Decision Gap | Built | Passive timed animation + 2 clicks | marvwincing, marvalarmed, marvconfident |
| 3 | MM-CE-S3-newway.html | The New Way | Built | Simulated CMS/browser + sequential reveals | marvconfident, marvexcited |
| 4 | MM-CE-S4-assessment.html | Assessment | Built | Video + intro + fruit machine + multiple-choice challenge | marvexcited, marvconfident, marvtriumphant, marvfocussed, marvthumbsup, marvdisappointed |
| 5 | (none) | Dispatch | Not started | - | - |
| 6 | (none) | Repair | Not started | - | - |
| 7 | (none) | Outcome | Not started | - | - |

Note: S4's final button links to `MM-CE-S5-dispatch.html`, which does not yet exist (dead link until Stage 5 is built).

---

## Stage 1 - The Problem Lands

**File:** `MM-CE-S1-claim.html`
**Status:** Built.

Stage 1 ships as a full-screen cinematic overlay (`#kb-overlay`) that runs on load and is removed at the end. A legacy interactive "claims CMS / browser simulation" (`#scene-intro`, `#scene-fnol`, `#scene-website`, `#scene-transition`, `#scene-marv`, driven by `setMarv()`) still exists in the file **beneath** the overlay but is **not reached** in the current flow - the overlay's final button calls `goToStage3()`, which navigates straight to Stage 2. See "Legacy / non-active" below.

### Scene S1-0 - Start gate (`.kb-start`)
- Built by script. Title "The Repair Journey", subtitle "Sound on for the full experience", button "Begin the journey".
- Clicking starts the looped ambient music and the cinematic (`advance()`).
- MARV: none. Interaction: 1 click (begin).

### Scene S1-1 - Ken Burns incident montage (`.kb-panel` x8)
- Eight real damage photographs with location labels (Manchester, Leeds, Edinburgh, London, Cornwall, Birmingham, Bristol, Glasgow), each with an incident report typed out character by character at 30ms/char.
- Each panel holds for ~7s minimum (extends with report length). Slow Ken Burns zoom (`kb-dir-a` / `kb-dir-b`).
- MARV: none. Interaction: passive.

### Scene S1-2 - Title card (`.kb-title-card`)
- "Every day. Everywhere." / "A better answer exists." Shown ~3.8s, then ambient music stops.
- MARV: none. Interaction: passive.

### Scene S1-3 - Customer CTA (`#kb-cta`)
- Button "Hear from a customer". The click is the user gesture that unlocks the customer video's audio.
- MARV: none. Interaction: 1 click.

### Scene S1-4 - Customer video (`#kb-video-stage`)
- `assets/video/customer_contractor_conversation.mp4` plays in a navy card. On end, the card fades to navy over 800ms, then MARV materialises.
- MARV: none. Interaction: passive.

### Scene S1-5 - MARV materialisation + three-beat dialogue (`#kb-marv-stage`)
*This is the "Scene 4 MARV dialogue" referenced in the build brief.*
- Wasabi pulse rings fire, then MARV's silent welcome video (`assets/video/marv_welcome_video.mp4`) materialises (scale 0.3 to 1).
- A speech bubble then steps through **three beats**, advanced by the user clicking the button (label "Next" for beats 1 to 2, becomes "Continue" on beat 3):
  1. "That claim you just submitted? In the old world it would join a queue of emails, phone calls and missing details. Nobody quite sure what happens next. That's not how we do it."
  2. "Six steps. From the moment damage is reported to the moment the job is closed with a warranty. I'll show you every one."
  3. "I'm MARV - MAterial Repair Validator. Welcome to my world. Every repair request that comes to Magicman comes through me. Let me show you what happens next."
- Final "Continue" calls `goToStage3()` to `MM-CE-S2-gap.html`.
- MARV: silent video only - **there is no emotion sprite in this scene**, so no `marv*` emotion state applies; the performance is the materialising video plus the bubble text.
- Interaction: 3 clicks (advance beat 1 to 2, beat 2 to 3, then Continue).

**Dev aids:** a `#test-skip` "SKIP" button (TEST ONLY) and the standard DEV nav panel (incl. the demo-only Colossyan customer video link).

### Legacy / non-active (present but bypassed)
- `#scene-intro`, `#scene-fnol`, `#scene-website`, `#scene-transition`, `#scene-marv` - an interactive claims CMS and Magicman browser simulation driven by `setMarv('confident', ...)` and `startJourney()`. Reachable functions exist (`activateMarv`, `showSiteView`, etc.) but the active overlay navigates to Stage 2 before this UI is ever revealed.
- MARV state in this dead path: `confident`. Status: Built but not in the active flow.

---

## Stage 2 - The Decision Gap

**File:** `MM-CE-S2-gap.html`
**Status:** Built.

A single, continuous animated scene in a three-column layout: MARV (left) | day counter (centre) | email chain (right). It runs as timed phases.

### Scene S2-1 - Opening (`boot()`)
- Day counter shows "Day 1". MARV `marvwincing`, bubble "Before MARV, this is what happened next." Pulsing button "See what happens next".
- Interaction: 1 click to start.

### Scene S2-2 - The email chain builds (`startChain()`)
- Eight emails drop in top-down, one every ~1.8s (Sarah Mitchell / David Reeves / Mrs Patricia Howard / Karen Briggs / Pete Hollis), each with a `ping`.
- The centre day counter flips Day 1 to Day 14 like a departure board, colour interpolating green (Day 1) to amber (Day 7) to red (Day 14).
- The email chain (`#email-chain`) is a fixed 65vh region that **scrolls internally** to keep the newest email in view (by design).
- MARV: `marvwincing` (bubble dropped while the inbox builds). Interaction: passive.

### Scene S2-3 - Closing (`closing()`)
- MARV `marvalarmed`, bubble "Fourteen days. Four people. One customer still waiting. This is the decision gap." Alert sound. Then a pulsing hero button "There's a better way".
- Interaction: 1 click.

### Scene S2-4 - Transition out (`transitionOut()`)
- MARV `marvconfident`, bubble "Let me show you what happens when you do this properly." Chime, then after ~2.2s navigates to `MM-CE-S3-newway.html`.
- Interaction: passive.

**MARV states:** marvwincing, marvalarmed, marvconfident.

---

## Stage 3 - The New Way

**File:** `MM-CE-S3-newway.html`
**Status:** Built (scenes S3-4 and S3-5 added this session).

Uses a `.scene` / `showScene()` system. Flow: CMS sim - browser sim - timer comparison - client account block - onboarding card - Stage 4.

### Scene S3-1 - The CMS (`#scene-fnol`, `runCms()`) - active on load
- Desktop CMS simulation. Caption "A claim lands. A familiar decision to make." A notification toast pings; decision buttons arrive then fade; a handler "thought" pops and fades; finally the `#ask-marv-panel` reveals with a `marvconfident` icon and an "Ask MARV" button.
- MARV: `marvconfident` (panel icon). Interaction: click "Ask MARV" (`activateMarv()`).

### Scene S3-2 - The browser simulation (`#scene-website`)
- A simulated Magicman website inside a browser frame: homepage (`magicman.co.uk`) loads, then the online-estimate view (`goToEstimate()`), then a client enquiry selection (`selectClientEnquiry()`).
- MARV: none in-frame. Interaction: simulated site navigation (button clicks).

### Scene S3-3 - Timer comparison (`#scene-comparison`, `showComparison()`)
- Two comparison cards land: "14 Days. The old way." (red) and "1 Day. With Magicman." (wasabi). **These timer comparison cards are unchanged.**
- Then `#s3-marv` (`marvexcited`) shows, bubble "One day versus fourteen. Let me show you how it all fits together.", button "Continue" - now advances to the client account block (`goToAccount()`).
- MARV: `marvexcited`. Interaction: 1 click.

### Scene S3-4 - Client account block (`#scene-account`, `goToAccount()` / `revealAccount()`) - NEW
- Wasabi heading "Every Magicman client gets their own identity in MARV."
- Three dark-navy, wasabi-glow cards animate in one at a time:
  1. (tag icon) **Your client code** - "A unique code that tags every job to your account. Reporting, history and invoicing all kept together, on your terms."
  2. (door icon) **Your portal** - "A single place for your sites to raise a repair and upload photos, set up for the way your organisation works."
  3. (folder icon) **Your client record** - "Your sites, contacts, access notes and agreed terms held in one place. We are not re-gathering them every time."
- MARV `marvconfident`, bubble "One account. Every site. Every job. All in one place."
- After all three cards are visible, a wasabi Continue button "And getting set up?" appears - advances to the onboarding card (`goToOnboard()`).
- MARV: `marvconfident`. Interaction: 1 click.

### Scene S3-5 - Onboarding card (`#scene-onboard`, `goToOnboard()` / `revealOnboard()`) - NEW
- Onboarding card "Getting set up with Magicman takes one conversation." with a wasabi-bulleted list:
  - Your sites and locations
  - Access requirements
  - Key contacts
  - The types of repairs you need
- Subtext "All we really need is location, access and contact. Everything else MARV works out from the photos."
- MARV `marvconfident`, bubble "Want to see how I do it?", button "Show me" - `goToAssessment()` to `MM-CE-S4-assessment.html`.
- MARV: `marvconfident`. Interaction: 1 click.

**MARV states:** marvconfident, marvexcited.

---

## Stage 4 - Assessment

**File:** `MM-CE-S4-assessment.html`
**Status:** Built. Final button targets `MM-CE-S5-dispatch.html` (not yet created).

### Scene S4-1 - Transition video (`#s4-transition`, `startS41()`)
- `assets/video/marv_world_transition.mp4` plays full screen; on end it reveals the lab.
- MARV: none. Interaction: passive (audio unlocked via the gesture that arrived from Stage 3).

### Scene S4-2 - MARV intro (lab + clock, `startIntro()` beats)
- Lab background fades in with a tracking analogue clock overlay.
- Beat 0: `marvexcited` "Right - you have seen the old way. Now let me show you mine."
- Beat 1: `marvconfident` "Before we look at your claim - let me take thirty seconds to introduce myself properly. Don't worry, I work fast. We have time."
- Beat 2: `marvexcited` "I am MARV. MAterial Repair Validator. Thirty-five years of Magicman craft expertise - built into a single system."
- Beat 3: three stat cards animate in - "35+ Years", "24/7", "Minutes".
- Beat 4: `marvconfident` "Every decision I make is reviewed by a Magicman expert. When they agree, I learn. When they know better, I learn faster."
- Beat 5: `marvtriumphant` "Right. Let us look at that claim." + pulsing "Run the assessment" button.
- MARV: marvexcited, marvconfident, marvtriumphant. Interaction: 1 click ("Run the assessment").

### Scene S4-3 - Fruit machine, Phase 1: spin and lock (`runMachineSequence()` / `startSpin()`)
- A 5-reel fruit machine (image `fruit_machine.png` with positioned reel overlays) spins and locks one reel at a time: Surface, Damage, Repair viability, Technician match, Duration. A scan box (damaged basin image + moving scan line), scan labels and a progress bar sync to the locks; mechanical clunks, completion chime, win flash.
- Final values: Vitreous china / Impact crack / Repair viable / Specialist / Half day.
- MARV: `marvfocussed` (during scan), then `marvconfident` ("I have completed my scan ... want to see if you can keep up with me?") + "Try me" button.
- Interaction: 1 click ("Try me").

### Scene S4-4 - Phase 2: user challenge (`askMaterial()` / `askDamage()`)
- Two multiple-choice questions with image options:
  - Material: Vitreous china (correct) vs uPVC panel / Marble.
  - Damage: Impact crack (correct) vs Hairline crack / Scratch.
- Correct: green flash, `marvthumbsup` then `marvtriumphant`. Wrong: red flash, `marvdisappointed` with a tailored hint, retry.
- MARV: marvconfident, marvthumbsup, marvtriumphant, marvdisappointed. Interaction: pick answers (retry on wrong).

### Scene S4-5 - Phase 3: verdict (`revealVerdict()`)
- A full-width verdict card reveals six items: Surface, Damage, Verdict, Technician, Duration, Price ("Priced against your agreed account terms").
- `marvtriumphant` "That took me three seconds. Thirty years of experience will do that.", then `marvconfident` long line on repair viability ("... Either way, you have your answer on day one.").
- A "Magicman Quality Guaranteed" stamp, two confidence boxes ("MARV assesses." / "A Magicman Master Technician validates."), then a "Continue to Stage 5" button to `MM-CE-S5-dispatch.html` (dead link - Stage 5 not built).
- MARV: marvtriumphant, marvconfident. Interaction: 1 click (Continue).

**MARV states:** marvexcited, marvconfident, marvtriumphant, marvfocussed, marvthumbsup, marvdisappointed.

---

## Stages 5 to 7 - Not started

No files exist for Dispatch (5), Repair (6) or Outcome (7). The DEV nav panels list them as "Coming soon", and S4's final button points to a not-yet-created `MM-CE-S5-dispatch.html`.

---

## MARV emotion sprite inventory (assets/marv/)

Available: marvalarmed, marvclose, marvconfident, marvcongratulatory, marvdisappointed, marvexcited, marvfocussed, marvmixing, marvthinking, marvthumbsup, marvtriumphant, marvwincing.

In active use across S1 to S4: marvwincing, marvalarmed, marvconfident, marvexcited, marvfocussed, marvthumbsup, marvdisappointed, marvtriumphant. (S1's materialisation scene uses a silent video rather than a sprite.)
