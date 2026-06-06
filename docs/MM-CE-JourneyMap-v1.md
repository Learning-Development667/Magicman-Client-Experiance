# MM-CE Journey Map v1.0

**Magicman Client Experience - Signed-Off Stage Plan**

---

## Narrative Framing

The experience is told in second person. The user is addressed as "you" throughout. MARV is the guide. There is no named persona. The journey is universal - it works for a facilities manager, a property developer, an insurer, or any other decision-maker audience.

The story: You have a damaged surface in a property you manage. You need it fixed fast, properly, and without the cost and disruption of replacement. MARV takes you through the entire Magicman journey from first search to completed repair.

---

## Stage Overview

| Stage | Title | Format | Interaction Type | MARV States |
| --- | --- | --- | --- | --- |
| 1 | The Problem Lands | Video into interactive sim | Simulated browser / form entry | marvexcited, marvconfident |
| 2 | MARV Assesses | Decision scenario | Material identification selector | marvconfident, marvdisappointed, marvthumbsup |
| 3 | Dispatch and Coverage | Interactive map | Explorable coverage map with hotspots | marvconfident, marvexcited |
| 4 | The Repair | Video + sequence ordering | Drag-to-order repair steps | marvfocussed, marvdisappointed, marvthumbsup |
| 5 | Quality Check | Hotspot inspection + reveal | Click-to-inspect + before/after slider | marvfocussed, marvcongratulatory, marvtriumphant |
| 6 | The Outcome | Animated stats + video outro | Animated counters + CTA | marvtriumphant |

Pattern check - no two consecutive stages use the same interaction type. Confirmed.

---

## Stage 1 - The Problem Lands

**File:** MM-CE-S1-claim.html
**Format:** Short cinematic video transitioning into interactive simulated browser

### Narrative

You are managing a property. A repair is needed - a chipped and cracked vitreous china basin. You need to find the right specialist fast.

### Video Brief (30 seconds)

- Scene: Close-up of a damaged basin - realistic chip and crack on white vitreous china, natural light, no inspection lamp
- Cut to: Hands at a keyboard, about to search
- Tone: Real, craft-led, no voiceover needed - ambient sound only
- End frame: Browser search bar, cursor blinking

### Interactive Sequence

1. Simulated browser appears - Google-style search interface
2. Search query types itself out: "best surface repair specialist UK"
3. Results page appears - Magicman listed at top with correct branding
4. User clicks the Magicman result
5. Simplified but realistic Magicman website loads
6. User completes a short repair request form:
   - Surface type (dropdown - pre-selected to vitreous china)
   - Damage type (dropdown - chip and crack)
   - Location (text field - pre-filled to add realism)
   - Urgency (dropdown - same day if possible)
7. User clicks Submit
8. Confirmation screen appears

### MARV Introduction

First appearance. Speech bubble: "Claim received. I'm MARV - MAterial Repair Validator. I've been doing this for 30 years and I know exactly what your basin needs. Let me show you how this works."

- MARV emotion on entry: marvexcited
- MARV emotion on confirmation: marvconfident

### Progression Trigger

User submits the claim form. Button click only - never auto-progresses.

---

## Stage 2 - MARV Assesses the Damage

**File:** MM-CE-S2-assessment.html
**Format:** Decision scenario - material identification

### Narrative

Before a technician is dispatched, the right diagnosis has to be made. The wrong approach on the wrong surface produces the wrong result. MARV explains that Magicman matches the right technician to the right job - every time.

### Interaction

Three surface images are displayed side by side:

- Image A: Acrylic bath panel - white, smooth, slightly flexible appearance
- Image B: Vitreous china basin - harder, denser, more ceramic in appearance
- Image C: uPVC panel - white but with visible seam lines and slight sheen

The user must identify which surface matches the submitted claim (vitreous china - Image B).

Each image has a label and a brief descriptor visible on hover or tap.

### Correct Answer Feedback

MARV: "Exactly right. Vitreous china is a fired ceramic with a glass-like glaze. It needs a different approach to acrylics or polymeric panels - get that wrong and you make it worse. You've got the eye for it."

MARV emotion: marvthumbsup

### Wrong Answer Feedback

- If acrylic selected: "That's acrylic - you can tell from the slight flex and the smoother, less dense surface. Vitreous china is harder and heavier. The repair chemistry is completely different. Have another look."
- If uPVC selected: "That's a uPVC panel - you can see the seam lines and the slightly hollow finish. Vitreous china is a fired ceramic, much denser. Try again."

MARV emotion: marvdisappointed

### Technician Match

After correct identification, MARV presents a technician profile card:

- Name: [Technician first name only]
- Region: [Relevant UK region]
- Specialisms: Sanitaryware, ceramic, vitreous china
- Academy trained: Yes
- Directly employed: Yes - not a subcontractor
- Years with Magicman: [Number]

MARV: "This is who we're sending. Academy trained, directly employed - no subcontractors on insurance or commercial work. This is the standard on every job."

MARV emotion: marvconfident

### Progression Trigger

User clicks "Dispatch Technician" button after viewing profile.

---

## Stage 3 - Dispatch and Coverage

**File:** MM-CE-S3-dispatch.html
**Format:** Interactive UK coverage map with explorable hotspots

### Narrative

MARV confirms the technician is on the way. This stage showcases the national reach and operational scale of Magicman.

### Map Design

- Stylised illustrated UK and Ireland map - navy background, Wasabi green region highlights
- Not a real Google Maps embed - a designed SVG or canvas map
- Technician location marked with an animated pulse dot
- Route line animates from technician location toward the property

### Hotspot Regions (6 explorable areas)

Each region, when clicked, reveals a fact card:

- London and South East - "Our most active region. Commercial, hospitality, and insurance work across some of the UK's most demanding environments - including the Houses of Parliament and the New American Embassy."
- Midlands - "Construction snagging and new-build handover is a core part of our Midlands operation. Fast turnaround, no disruption to programme."
- North of England - "From Manchester city centre hotels to coastal marine facilities - our northern technicians cover it all."
- Scotland - "Full coverage across Scotland including remote locations. No job is too far if the surface needs us."
- Wales and South West - "Heritage buildings, coastal properties, and high-value residential. We know how to work sensitively in complex environments."
- Northern Ireland and Ireland - "Cross-border coverage. Same standards, same direct employment model, same Magicman quality."

### Key Stats Surfaced in This Stage

- Technicians operating nationwide
- Sectors covered: Commercial, Construction, Insurance, Marine, Domestic, Healthcare, Education, Transport
- Response typically same day or next day for urgent claims

### MARV Narration

- Opening: "Your technician is already moving. But before we follow them to the job, let me show you something. Click around the map - this is the scale of what we do."
- After exploring: "Nationwide coverage. Employed technicians. Every region, every sector. That is not something our competitors can match."

MARV emotion: marvconfident throughout, marvexcited on final map reveal

### Progression Trigger

User clicks "Follow the Technician" button after exploring at least one hotspot region.

---

## Stage 4 - The Repair

**File:** MM-CE-S4-repair.html
**Format:** Short video (arrival) + sequence ordering mini-game + short video (completion)

### Narrative

The technician arrives. This is the centrepiece of the experience - the craft showcase. MARV walks you through exactly how a vitreous china repair is carried out.

### Video 1 - Arrival (20 to 30 seconds)

- Technician arrives at property in branded van
- Unpacks professional kit - organised, clean, purposeful
- Examines the basin up close under natural light
- No voiceover - ambient sound, confident music bed
- Ends on a freeze frame of the technician setting up

### Sequence Ordering Mini-Game

MARV: "I want to show you exactly how this is done. These are the steps in a vitreous china repair - but they're in the wrong order. Put them right."

Six repair steps shown as illustrated cards, scrambled.

Correct order:

1. Surface cleaning and degreasing
2. Damage profiling and edge preparation
3. Filler application and shaping
4. Curing and hardening
5. Colour matching and pigment blending
6. Surface finishing and polishing

Each step when placed correctly reveals a brief MARV explanation:

1. "Always start clean. Any contamination and nothing bonds properly. This is non-negotiable."
2. "The edges of the damage have to be prepared before anything goes in. Rough edges mean visible repairs."
3. "The filler is built up in layers - not all at once. Rushing this is where most amateurs go wrong."
4. "Curing time is not optional. The material has to set fully before the next stage. Patience is part of the craft."
5. "Colour matching is where the skill really shows. We mix to match the exact glaze - not just close enough."
6. "The final polish brings the glaze back. When this is done right, you cannot find the repair."

Wrong placement: marvdisappointed + specific explanation of why that step cannot come at that point in the sequence.

### Video 2 - Completion (15 to 20 seconds)

- Final buff and polish applied
- Technician steps back
- Close-up of the repaired surface - natural light, clean finish
- Technician gives a nod - job done
- MARV reacts

MARV emotion: marvfocussed (during game), marvthumbsup (correct placements), marvtriumphant (video 2 complete)

### Progression Trigger

User clicks "Inspect the Repair" after completion video ends.

---

## Stage 5 - Quality Check and Sign-Off

**File:** MM-CE-S5-quality.html
**Format:** Click-to-inspect hotspot interaction + before/after reveal slider

### Narrative

Every Magicman repair is inspected before the technician leaves. MARV walks you through the quality check - the same one applied on every single job.

### Part 1 - Inspection Hotspots

An image of the repaired basin is shown. Three inspection point markers are overlaid on the image.

The user must click each marker to reveal the quality check criteria:

- Surface continuity - "No visible join line, no shadow, no edge definition. The repair blends into the surrounding surface. If you can see where it was, it is not finished."
- Colour match - "The pigment blend is checked against the existing glaze under natural light. Not artificial light - that masks variance. Natural light only."
- Edge finish - "The perimeter of the repair must be feathered out, not stepped. Run your finger across it - you should feel nothing."

MARV emotion: marvfocussed throughout

After all three markers clicked:

MARV: "Three for three. This repair passes. That is what every Magicman job looks like before we leave the site."

MARV emotion: marvcongratulatory

### Part 2 - Before and After Reveal

An interactive slider reveals the before (damaged) and after (repaired) state of the basin.

Instructions: "Drag the slider to see the full transformation."

MARV: "This is what repair over replacement looks like. Same surface. Same basin. No disruption, no waste, no waiting. Just like it never happened."

MARV emotion: marvtriumphant

### Progression Trigger

User clicks "See the Result" after interacting with the before/after slider.

---

## Stage 6 - The Outcome

**File:** MM-CE-S6-outcome.html
**Format:** Animated credential stats + closing video + sales CTA

### Narrative

The repair is done. The property is back in service. This stage lands the full Magicman proposition - credibility, scale, expertise, and the case for repair over replacement.

### Part 1 - Animated Stats Showcase

Six credential counters animate in sequence, each with a label and a supporting line:

- 30+ Years of specialist surface repair - since 1993
- 11 Major insurance company partners
- 300+ Contractor relationships across the UK
- 2-4 hrs Typical repair completion time
- Any hard surface Wood, ceramic, stone, glass, composite, uPVC, metal, acrylic and more
- ISO 9001 / 14001 / 45001 Accredited. SafeContractor, CHAS, ConstructionLine, Achilles, SMAS certified.

Each stat lands with a Wasabi green highlight and a short animation. MARV reacts with growing pride.

### Part 2 - Seven Pillars Summary

Brief animated reveal of Magicman's seven core pillars - shown as icons with short labels:

1. Expertise and Craftsmanship
2. Sustainability and Waste Reduction
3. Speed and Flexibility
4. Trusted by Leading Brands
5. Innovation and Technology
6. Customer Experience
7. Multi-Sector Capability

### Part 3 - Closing Video (20 to 30 seconds)

MARV direct to camera - confident, proud, dry humour.

Suggested script: "Thirty years. Every surface type. Every sector. Clients who thought their surfaces were beyond saving. They weren't. They never are. That is what Magicman does. That is what we have always done. The question is - what do you need fixed?"

### Part 4 - Sales CTA

Final screen - clean, impactful, brand-consistent:

- Headline: "Ready to make it like it never happened?"
- Subline: "Talk to your Magicman representative today."
- Contact block: 0345 458 1010 | enquiries@magicman.co.uk
- Logo: White Magicman wordmark on navy
- Optional: QR code or URL to magicman.co.uk

MARV emotion: marvtriumphant throughout

### Progression

No further progression - this is the end of the journey. The CTA is the action.

---

## Global Standards Reminder for Build

- No em dashes anywhere - use spaced hyphen ( - ) only
- UK English throughout
- setMarv(emotion, text, style) pattern on all MARV state changes
- Progress indicator visible at all times showing stage position
- Green for correct, red for wrong - consistent across all interactions
- Never auto-progress on load - all progression is user-triggered
- CSS grid with expandable content: always align-items: start on container, align-self: start on cards
- Hotspot coordinates: do not estimate - request annotated image before writing coordinate-based code
- Console must be clean before any file is marked complete

---

MM-CE Journey Map v1.0 - Signed off for build
Produced by MA Group Training and Development
