# MM-CE Mr Code Handover - Stage 5 Build (Session 13)

Date: 10 June 2026. For the NEW Mr Code build chat picking up the Stage 5 build.

## Project essentials
- Repo: Learning-Development667/Magicman-Client-Experiance
- Branch: claude/happy-bardeen-Qx9h7 - ALL commits go here, never to main.
  GitHub Pages deploys FROM this branch (verified via pages-build-deployment run
  history), so the live site reflects this branch.
- Pages URL: https://learning-development667.github.io/Magicman-Client-Experiance/
  (rebuilds ~1-2 min after each push; hard-refresh to bust cache)
- As of this handover the working tree is clean and fully pushed (latest commit
  3e7bf2f).

## Standing rules (non-negotiable)
- No em dashes anywhere - spaced hyphen only. UK English.
- Never say "AI" in user-facing content - always "MARV". For Stage 5: never say
  "directly employed" or "not a contractor"; focus on the standard, not the
  employment model.
- Audio gating: every scene with audio is triggered by a user interaction, never
  autoplay (attempt play + first-gesture fallback is the pattern).
- Console clean and em-dash free before marking anything done. Verify JS with
  node --check on the extracted inline script.
- Brand: Navy #13294B, Wasabi #AED284, Lone Hunter #93C847. Open Sans. Max
  content width 1100px.

## Current state - everything is built/polished except Stage 5 and 6 content
- S1-S4 and S7: built and heavily polished this session.
- S5 (MM-CE-S5-technician.html) and S6 (MM-CE-S6-repair.html): still PLACEHOLDERS
  - navy bg, progress bar (S5 = "Dispatch" active), MARV marvthinking sprite,
  "In development" text, wasabi Skip button (S5 to S6, S6 to S7), and a
  "Back to Stage X" button. S5 is the build target.
- Forward navigation works end to end: index to S1 to S2 to S3 to S4 to S5 to S6
  to S7. S4 "Continue to Stage 5" already points to MM-CE-S5-technician.html.

## Stage 5 spec (LOCKED - from the Session 12 planning brief)
Core proposition: Headline "Everyone who arrives is a Magicman." Credential line
"Trained and assessed to Magicman standard."

- Scene 1 - MARV marvconfident: "I have matched your claim to the right person.
  Let me show you who that is."
- Scene 2 - Marketing video plays. Gated behind a user click. Mark to upload the
  video to assets/video/ and confirm the filename (NOT yet in the repo).
- Scene 3 - Three or four credential cards animate in after the video. Wording to
  confirm with Paul: "Magicman Academy trained", "Trained and assessed to
  Magicman standard", plus others Paul confirms.
- Scene 4 - MARV marvtriumphant: "Everyone who arrives is a Magicman." Then a
  "Continue to Stage 6" button to MM-CE-S6-repair.html.

## Reusable patterns (study these when building S5)
- Scene system: S7 (scenes object + showScene() + DEV_ORDER + Prev/Next/Replay)
  and S3 (go()/cur() stepper). Every stage has a DEV panel (Prev/Next/Replay
  Scene + stage links) to be removed pre-launch.
- MARV sprites: assets/marv/marvconfident.png, marvtriumphant.png, etc.
- MARV speech bubbles: font-size at least 18px (standardised this session). Wasabi
  glow border via the shared marvGlowPulse in css/main.css.
- Credential cards: copy S7 .s7-cred-card (white card, wasabi border, staggered
  .show reveal, rotating circuit-trace ::after). S7's credentials scene is a
  near-exact template for Scene 3.
- Video + gated play: copy S7's closing-video pattern (play() with muted
  fallback, playing/ended handlers). If you want an "Entering" style title over
  the video, reuse the S4/S7 world-overlay pattern: keep it on its own
  compositing layer (will-change: transform + translateZ(0)) and scope the glitch
  to an inner text span, not the full-screen container.
- Progress bar: S5 already shows "5. Dispatch" active with the Magicman logo.
  Locked labels: 1. Claim, 2. The Decision Gap, 3. The New Way, 4. Assessment,
  5. Dispatch, 6. Repair, 7. Outcome.
- Buttons: class="btn btn-primary" (standard wasabi pill). Click-to-progress
  buttons carry the wasabi pulse (marvGlowPulse).

## Pending external inputs (flag to Mark/Paul before finalising)
1. Stage 5 marketing video - filename + upload to assets/video/. Critical Asset
   Upload Rule: switch GitHub to claude/happy-bardeen-Qx9h7 before uploading,
   never main.
2. Credential card wording (Paul).
3. Other open Paul items (not S5-blocking): MARV full name, guarantee wording,
   experience title "From damage to done", S7 contact details (still placeholders
   "Phone/Email/Web: Add details").

## Known issues / eyeball on the live demo
- Transition overlays ("Entering/Leaving MARV's world", S4/S7): glitch in (wasabi,
  2.5s) over the video on their own compositing layer. Confirm they read well.
- S4 verdict scene: MARV bubble bumped to 18px - verify the dense verdict grid
  does not overflow awkwardly.
- DEV panels across all stages and S1's TEST-only "SKIP" button: remove in the
  pre-launch tidy (handover tasks 12/13).
- main is stale/diverged (Pages does not use it) - leave it; reconcile later if
  needed.

## Suggested first steps in the new chat
1. Get Mark to confirm the Stage 5 video filename and upload it to the branch.
2. Build S5 by replacing the placeholder body of MM-CE-S5-technician.html with
   the 4-scene flow, modelled on S7's scene system + credentials cards. Keep the
   existing progress bar and Back button.
3. Wire Scene 4's "Continue to Stage 6" to MM-CE-S6-repair.html. Add a DEV stepper
   (Prev/Next/Replay) like the other stages.
4. Verify: node --check, em-dash free, console clean, then push to
   claude/happy-bardeen-Qx9h7.
