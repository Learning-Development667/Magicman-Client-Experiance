# MM-CE Viewport Audit v1.0

## Target: 1280 x 800, F11 full-screen (no browser chrome)

**Generated:** 09 June 2026
**Branch:** `claude/happy-bardeen-Qx9h7`
**Scope:** Every scene in S1 to S4.

### Method and caveat
This is a **static analysis** of the layout CSS and the script-driven DOM (no live headless browser was run in this environment). Fixed/absolute sizing, `vh`/`vw` units, `min-height`, image `object-fit`, and the stacked height of script-injected content were assessed by hand against an 800px tall, 1280px wide viewport. Items marked **VERIFY** depend on rendered image dimensions or accumulated dynamic content and should be confirmed live. F11 is assumed (full 800px usable height, no toolbar).

### Severity key
- **OK** - fits comfortably, no scroll, nothing clipped.
- **WATCH** - fits but tight; small content/font changes could push it over.
- **VERIFY** - cannot be proven from CSS alone (depends on rendered media or accumulated DOM); check live.
- **FLAG** - likely to scroll, clip, or overflow at 1280x800.

---

## Summary of flags

| Stage / Scene | Finding | Severity |
|---|---|---|
| S1-5 MARV materialisation | Tallest bubble (beat 3) + 320px video + button stack; ~600px, fits but tightest S1 moment | WATCH |
| S2 whole page | Header + stage header + 65vh grid + 64px bottom padding ~= 738px; email chain scrolls internally by design | OK (WATCH at 800) |
| S3-1 CMS desktop sim | Desktop simulation height depends on the sim's fixed sizing; may exceed 748px scene box | VERIFY |
| S3-2 Browser sim | Screenshot/frame height (homepage, estimate views) may exceed viewport | VERIFY |
| S3-4 Client account block (new) | Heading + 3-card row + MARV + continue, centred; ~590px content | OK |
| S3-5 Onboarding card (new) | Card + list + subtext + MARV + button; ~560px content | OK |
| S4-2 MARV intro | Intro bubbles **accumulate** (not replaced) in the bubble column through beats 1 to 5 | VERIFY |
| S4-3 Fruit machine | Machine sized to rendered image by `positionMachine()`; scanbox + machine + MARV together | VERIFY |
| S4-5 Verdict | Left column (scanbox image + sprite + bubble + stamp + 2 boxes + button) plus full-width verdict row - densest scene | FLAG / VERIFY |

No fixed/absolute elements were found positioned **outside** the viewport bounds in any stage (the S4 clock overlay is positioned within the cover-scaled background and tracks the viewport).

---

## Stage 1 - MM-CE-S1-claim.html

The active experience is the full-screen overlay `#kb-overlay` (covers the viewport). The legacy claims UI beneath it is never revealed in the active flow, so it is not audited as visible.

- **S1-0 Start gate** - centred title/subtitle/button on navy. **OK.**
- **S1-1 Ken Burns montage** - `.kb-image` uses `object-fit: cover`, fills the viewport; label and typed report are overlaid. No overflow. **OK.**
- **S1-2 Title card** - two centred lines. **OK.**
- **S1-3 Customer CTA** - single centred button. **OK.**
- **S1-4 Customer video** - `#kb-video-card` holds the clip; ensure the card's max dimensions keep it within 800px tall (video is in a navy card, not full-bleed). **VERIFY** the card height for very tall aspect ratios, otherwise **OK.**
- **S1-5 MARV materialisation** - vertical stack: pulse rings, `.kb-marv-video` (width 320px, `max-width: 78vw`, height auto), `.kb-marv-bubble` (max-width 580px, 21px/1.45), then the button. The longest text is **beat 3** (4 sentences, ~5 to 6 lines ~= 180px). Estimated stack ~= 320 + 30 (margin) + 180 + 28 (margin) + 48 (button) ~= ~606px. Fits within 800, but this is the tightest S1 moment, especially if the welcome video renders taller than wide. **WATCH** (re-check after the beat-3 swap).

No element sits outside the viewport. **No horizontal scroll** (bubble and video are width-capped).

---

## Stage 2 - MM-CE-S2-gap.html

Single screen, three-column grid. Rough vertical budget at 800px:
- `header.progress-bar` ~= 52px
- `.gap-wrap` top padding 16px + back link ~= 28px + `.stage-header` ~= 58px
- `.gap-grid` `min-height: 65vh` = 520px
- `.gap-wrap` bottom padding 64px
- **Total ~= 738px** -> fits 800 with ~60px headroom.

- The right column `#email-chain` is a fixed `height: 65vh` (520px) region with `overflow-y: auto`; it **scrolls internally** as the 8 emails build - this is intended and does not scroll the page.
- The centre `.day-counter__num` is 84px; sits inside `.day-card` inside the vertically-centred `.gap-day-col`. **OK.**
- Buttons appear in reserved zones (`#gap-cta-zone`, `#gap-better-zone` with `min-height: 110px`) so the layout does not jump. **OK.**

**Verdict: OK.** WATCH only if the stage header wraps to two lines on narrower-than-1280 widths (not the case at 1280). No content outside the viewport.

---

## Stage 3 - MM-CE-S3-newway.html

Each `.scene` has `min-height: calc(100vh - 52px)` (= 748px at 800) with 40px padding. New scenes additionally centre their content with `min-height: calc(100vh - 160px)` (= 640px).

- **S3-1 The CMS (`#scene-fnol`)** - a desktop CMS simulation (`.desktop-sim`, box-shadowed). Its rendered height depends on the sim's internal sizing; a full desktop mock can be tall. **VERIFY** it stays within ~748px at 800; if the sim is a fixed large height it may clip or push the scene. Candidate for the only real S3 risk.
- **S3-2 Browser simulation (`#scene-website`)** - simulated browser frame with homepage/estimate screenshots (`.mm-view`). Screenshot height can exceed the viewport. **VERIFY** the browser frame and active view fit 800; constrain image max-height if not.
- **S3-3 Timer comparison (`#scene-comparison`)** - centred via `#scene-comparison .scene-inner` (`min-height: calc(100vh - 160px)`). Two `.compare-card`s (padding 40/48) plus `#s3-marv` (120px sprite + bubble + button) ~= ~500px. **OK.** (Cards unchanged.)
- **S3-4 Client account block (`#scene-account`, NEW)** - heading (~60) + `.s3-acc-row` of three 280px cards (~240 tall) + `.s3-acc-marv` (~200) + continue (~50) ~= ~590px inside a 640px centred box. Three cards at 280px + 2x24px gaps = 888px wide, well within 1280. **OK** - no horizontal or vertical overflow.
- **S3-5 Onboarding card (`#scene-onboard`, NEW)** - `.s3-onb-card` (heading + 4-item list + subtext ~= ~320) + `.s3-onb-marv` (sprite 120 + bubble + button ~= ~240) ~= ~560px inside 640px. Card max-width 640px. **OK.**

**Verdict:** New scenes (S3-4, S3-5) **OK**. Legacy sim scenes (S3-1, S3-2) are the **VERIFY** items.

---

## Stage 4 - MM-CE-S4-assessment.html

Full-screen scenes over a cover-scaled lab background; the clock overlay (`#clock-overlay`) is positioned by `positionClock()` relative to the cover-scaled image, so it tracks the viewport and is not off-screen.

- **S4-1 Transition video** - `.s4-video` `object-fit: cover`, full screen. **OK.**
- **S4-2 MARV intro** - `#s4-marv-bubbles` receives a **new** `.s4-intro-bubble` on each beat via `introBeat()` (they are appended, not replaced), so up to ~4 bubbles can stack alongside the stat-card content before `runMachineSequence()` clears them. At 800px tall this column can grow. **VERIFY** the accumulated bubbles + the 3 stat cards do not overflow by beat 5. The 3 stat cards row itself is **OK**.
- **S4-3 Fruit machine** - the machine is sized to its rendered image by `positionMachine()` (reel windows are derived as percentages of the 608x832 source), so it scales to fit. Combined with the scan box and MARV row it should fit, but the exact fit depends on the rendered machine height. **VERIFY** machine + scanbox + MARV stack at 800.
- **S4-4 Challenge** - choice buttons with images in a row, plus MARV bubble. Generally **OK**; **VERIFY** three image options sit on one row without forcing height growth on shorter viewports.
- **S4-5 Verdict** - `body.s4-verdict .s4-wrap` becomes a grid: `marv` (left) | `machine` (right), a full-width `verdict` row, then `cta`. The **left column** accumulates: scan box (basin image) + 130px sprite + bubble + "Magicman Quality Guaranteed" stamp + two confidence boxes + the Continue button. That is a tall stack, and the full-width verdict card row sits below the two columns. This is the **densest scene in the build** and the most likely to exceed 800px vertically. The verdict row itself (`.s4-vcard__row`, `flex-wrap: nowrap`, six `.s4-vitem` with `flex: 1 1 0; min-width: 0`) shrinks to fit and will **not** overflow horizontally. **FLAG / VERIFY** the combined vertical height at 1280x800; this is the top candidate for a vertical scroll.

**Verdict:** S4-1 **OK**; S4-2, S4-3, S4-4 **VERIFY**; S4-5 is the **primary overflow risk** to confirm live.

---

## Recommended live checks (priority order)
1. **S4-5 verdict** - measure left-column + verdict-row total height at 1280x800; trim paddings or sprite size if it scrolls.
2. **S4-2 intro** - confirm accumulating intro bubbles + stat cards stay on screen through beat 5.
3. **S3-1 CMS sim** and **S3-2 browser sim** - confirm the desktop/browser mocks and screenshots fit 748px; cap image max-height if needed.
4. **S1-5** - confirm beat 3 + welcome video + button clear 800px.
5. **S4-3 fruit machine** - confirm machine + scanbox + MARV fit together.
