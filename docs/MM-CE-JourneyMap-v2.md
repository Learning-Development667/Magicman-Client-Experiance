# MM-CE Journey Map v2.0
## Magicman Client Experience - Updated Stage Plan
### 05 June 2026

---

## Narrative Framing

The experience is told in second person. The user is addressed as "you" throughout. MARV is the guide. There is no named persona - the journey is universal.

The story opens in the real world - a convincing browser simulation that any client will immediately recognise. A repair problem is searched for, Magicman is found, a claim is submitted. Then the world transforms. The browser is revealed to have been MARV's monitor all along. We pull back into MARV's world and the journey begins.

MARV is both a real AI tool deployed inside the Magicman system AND the character guide for this experience. He bridges both identities naturally.

His introduction line:
"I'm MARV - MAterial Repair Validator. I live inside the Magicman system, but today I'm stepping out to show you exactly how this works. From the moment a repair is requested to the moment it's done. Let's go."

---

## Stage Overview

| Stage | Title | Format | Game Type | MARV States |
|---|---|---|---|---|
| 1 | The Problem Lands | Real world sim - transition - MARV's world | Simulated browser and claim form | marvexcited, marvconfident |
| 2 | MARV Assesses | Scanner game | Forensic surface scanning | marvconfident, marvdisappointed, marvthumbsup |
| 3 | Dispatch and Coverage | Dispatch command game | Mission control drag-and-drop | marvconfident, marvexcited |
| 4 | The Repair | Repair bench simulation | Craft tool selection game | marvfocussed, marvdisappointed, marvthumbsup, marvtriumphant |
| 5 | Quality Check | Walkaround inspection | Clipboard inspection game | marvfocussed, marvcongratulatory, marvtriumphant |
| 6 | The Outcome | Reveal and credentials | Animated debrief sequence | marvtriumphant |

Pattern check - no two consecutive stages use the same interaction type. Confirmed.

---

## Stage 1 - The Problem Lands

**File:** MM-CE-S1-claim.html

### Scene 1 - The Real World Search

A full-screen convincing browser simulation. Not a generic search engine - a realistic browser chrome with address bar, tabs, and familiar UI.

The search query types itself out character by character:
"my bathroom basin is cracked who is the best to fix it"

A realistic search results page appears. Magicman is the top result with correct branding, tagline "UK's Leading Surface Repair Specialists - Since 1993", and a green ad or organic result indicator. Two muted competitor results appear below to reinforce Magicman's top position.

The Magicman result pulses gently - inviting a click. The user clicks it.

### Scene 2 - The Magicman Website

The browser navigates to a pixel-accurate replication of magicman.co.uk built in code. Must match the real site in:
- Header with logo, navigation, phone number
- Hero section with headline and subheading
- Colour scheme, typography, button styles
- The Online Estimate / claim form

The user completes the claim form:
- Surface type: Vitreous china basin (pre-selected)
- Damage type: Chip and crack (pre-selected)
- Location: (pre-filled realistically)
- Urgency: Same day if possible
- Brief description: field for user to type or pre-filled

User clicks Submit. A confirmation screen appears with a reference number. "Your repair request has been received. A specialist will be in touch shortly."

### Scene 3 - The Transition (Option C - The Reveal)

This is the centrepiece moment of Stage 1.

After the confirmation screen settles, a beat of silence. Then the camera begins to pull back - slowly at first, then with increasing drama. The browser window shrinks as the view widens. The surrounding environment is revealed - the browser was always a monitor on MARV's workbench. We were always inside his world.

The workbench comes into view - surface samples, tools, diagnostic screens. The claymation environment assembles around the browser window. The real world recedes as MARV's world expands to fill the screen.

Technical approach: CSS 3D perspective transform - the flat browser scales down and rotates slightly as surrounding content fades in. The browser becomes a screen element within the larger MARV workshop scene. Smooth, cinematic, achievable in CSS and JS with no video required.

### Scene 4 - MARV's World

MARV is at his workstation. His diagnostic screen (the browser the user just used) shows the submitted claim. He turns to camera - genuinely delighted.

MARV emotion: marvexcited

Speech bubble: "I'm MARV - MAterial Repair Validator. I live inside the Magicman system, but today I'm stepping out to show you exactly how this works. From the moment a repair is requested to the moment it's done. Let's go."

After a beat:
MARV emotion: marvconfident

Speech bubble: "That claim you just submitted? I've already read it. Vitreous china basin, chip and crack, same day if possible. Let me show you what happens next."

A "Continue" button appears. User clicks to proceed to Stage 2.

### Firefly Asset Required
Wide landscape claymation workshop scene - MARV at workbench with diagnostic screens, surface samples, and tools. Navy and Wasabi tones. Warm studio lighting. No text in image. See handover brief for full Firefly prompt.

### Progression Trigger
User clicks Continue after MARV's introduction. Never auto-progresses.

---

## Stage 2 - MARV Assesses the Damage

**File:** MM-CE-S2-assessment.html
**Game type:** The MARV Scanner - forensic investigation tool

### Narrative
Before a technician is dispatched, the right diagnosis must be made. The wrong approach on the wrong surface makes things worse. MARV activates his diagnostic scanner. The user wields it.

### Game Design - Full Specification

The screen shows MARV's diagnostic lab. Three surface sample panels are displayed in a darkened environment - each one partially obscured, waiting to be scanned.

The user controls a scanning beam with their mouse or finger. The beam is a Wasabi green elliptical light that moves fluidly with cursor movement - slight lag and momentum so it feels physical.

When the beam dwells on a surface for 1.5 seconds a scan initiates. A progress ring fills around the beam. Data begins populating on a readout panel on the side of the screen:

- Surface A (acrylic): Flex index HIGH - Density LOW - Glaze: None - Composition: Polymethyl methacrylate
- Surface B (vitreous china): Flex index NONE - Density HIGH - Glaze: Fired glass layer - Composition: Ceramic with vitreous coating
- Surface C (uPVC): Flex index MEDIUM - Density LOW - Glaze: None - Composition: Unplasticised polyvinyl chloride

MARV commentates as each scan completes - one line per surface in character. Dry, expert, confident.

Once all three surfaces are scanned, MARV asks: "The claim is for a vitreous china basin. Which surface are you dealing with?"

Three buttons appear labelled A, B, C. User makes the call.

### Correct Answer
Surface B lights up with a full green diagnostic confirmation. Data readout expands with repair viability assessment.

MARV emotion: marvthumbsup
Speech: "Exactly right. Vitreous china - fired ceramic with a glass-like glaze. It needs a completely different approach to acrylics or polymeric panels. Get that wrong and you make it worse. You've got the eye for it."

Technician match card appears:
- Region: Matched to claim location
- Specialisms: Sanitaryware, ceramic, vitreous china
- Training tier: Senior Repair Technician
- Academy trained: Yes
- Directly employed: Yes - not a subcontractor
- Experience: [years]

MARV: "This is who we're sending. Academy trained, directly employed. No subcontractors on commercial work. That is the Magicman standard on every single job."

### Wrong Answer Feedback
- If Surface A selected: "That is acrylic - a polymer. You can see the flex index is high and there is no fired glaze layer. Vitreous china is a completely different material. The repair chemistry is not even close. Scan again."
- If Surface C selected: "That is uPVC - used in window frames and panels. Note the medium flex and the polymer composition. Vitreous china is ceramic - fired at high temperature. Fundamentally different. Have another look at the data."

MARV emotion: marvdisappointed on wrong answer

### Sound Design
- Scanner beam activation: low electronic hum
- Scan progress: rising tone as ring fills
- Scan complete: satisfying data-lock beep
- Data populating: rapid keyboard/readout sound
- Correct answer: positive confirmation chime
- Wrong answer: low buzz

### Progression Trigger
User clicks "Dispatch Technician" after viewing the matched technician profile.

---

## Stage 3 - Dispatch and Coverage

**File:** MM-CE-S3-dispatch.html
**Game type:** Dispatch Command - mission control

### Narrative
MARV confirms the technician is on the way. This stage puts the user in the operations seat and showcases the national scale of Magicman.

### Game Design - Full Specification

The screen is a live Magicman operations dashboard. Split screen:
- Left: Stylised UK and Ireland map with animated job indicators - pulsing dots appearing across the country like a radar screen
- Right: Incoming job queue - job cards sliding in with surface type, location, and urgency

Three rounds of dispatch. Each round a job flashes as urgent on the right panel. The user must:
1. Identify the correct technician from a panel of three profiles (matched by surface type specialism and region)
2. Drag the technician card to the correct job on the map

Round 1: Standard pace. One job, clear match.
Round 2: Two simultaneous jobs. Slightly faster.
Round 3: Three jobs, one mismatch to avoid - a technician whose specialism does not match. User must identify the right one under time pressure.

Each correct dispatch triggers:
- A route line animating from technician location to job site on the map
- A confirmation ping
- MARV live commentary - one line per dispatch

MARV commentary examples:
- "Fast. That is exactly how we work."
- "Right technician, right surface, right region. Every time."
- "Three dispatches. Three correct matches. That is the operation."

After all three rounds complete the full coverage network lights up - every active technician location visible across the UK and Ireland as glowing dots. The scale of the operation is visible in one frame.

MARV emotion: marvconfident throughout, marvexcited on full network reveal

Key facts surfaced:
- 65 active technicians nationwide (projected 88)
- Sectors: Commercial, Construction, Insurance, Marine, Domestic, Healthcare, Education, Transport
- Employed technicians - not subcontractors
- Same day and next day response on urgent claims

### Wrong Dispatch Feedback
If wrong technician dragged to job: the card bounces back. MARV: "Check the specialism. You would not send a timber technician to a vitreous china job. Match the surface to the skill."
MARV emotion: marvdisappointed

### Sound Design
- Ambient: low operations room hum throughout
- Job alert arriving: radio crackle and ping
- Drag initiation: card lift sound
- Correct dispatch: satisfying confirmation tone and map activation
- Wrong dispatch: card bounce sound and MARV alert tone
- Network reveal: building activation sound, rising to a satisfying complete tone

### Progression Trigger
User clicks "Follow the Technician" after network reveal completes.

---

## Stage 4 - The Repair

**File:** MM-CE-S4-repair.html
**Game type:** The Repair Bench - craft simulation

### Narrative
The technician arrives. This is the centrepiece of the experience. The craft showcase. MARV puts you at the workbench.

### Opening Video (20 to 30 seconds)
Technician arrives at property in branded van. Unpacks professional kit - organised, clean, purposeful. Examines the basin under natural light. No voiceover - ambient sound, confident music. Ends on technician setting up at the basin.

### Game Design - Full Specification

The screen becomes a first-person workbench view. The damaged basin sits in front of the user. A tool and materials tray is visible at the bottom of the screen - eight items laid out, only some correct for each step.

Six repair steps must be completed in sequence. For each step:
1. MARV describes what needs to happen next (one line - direct and expert)
2. The correct tool or material glows subtly in the tray
3. The user must identify and click or drag it to the work area
4. If correct: a satisfying application animation plays on the basin - the repair visibly progresses. The basin physically improves with each correct step.
5. If wrong: MARV physically moves the item back. "Not that one. Think about what the surface needs right now."

Six steps and correct tools:

Step 1 - Surface cleaning: Cleaning solution and lint-free cloth
Step 2 - Edge preparation: Fine diamond abrasive pad
Step 3 - Filler application: Specialist ceramic filler and applicator
Step 4 - Curing: Heat lamp (handheld, not fixed - acceptable in repair context as it is tool use not inspection)
Step 5 - Colour matching: Pigment mixing palette and colour reference card
Step 6 - Surface finishing: Polishing compound and buffing pad

After each correct step MARV gives one line of craft knowledge:
1. "Any contamination and nothing bonds. This step cannot be skipped."
2. "The edges have to be prepared before anything goes in. Rough edges mean visible repairs."
3. "Built up in layers - not all at once. Rushing this is where amateurs go wrong."
4. "Curing time is not optional. The material has to set before the next stage."
5. "Colour matching is where the real skill shows. We mix to match the exact glaze."
6. "The final polish brings the glaze back. When this is done right, you cannot find the repair."

The basin visually repairs itself incrementally. By step 6 it looks completely restored.

### Completion Video (15 to 20 seconds)
Final buff applied. Technician steps back. Close-up of the repaired surface under natural light. Clean finish. Technician gives a nod - job done.

MARV emotion: marvfocussed during game, marvthumbsup on correct tool selections, marvdisappointed on wrong selections, marvtriumphant on completion video

### Sound Design
- Ambient: workshop atmosphere throughout
- Tool selection: satisfying pick-up click
- Wrong tool: dull thud as it is returned
- Correct application: surface-specific sound (scrubbing, sanding, applying filler, buffing)
- Step completion: satisfying progress chime
- Basin restoration: each step audibly and visually improves the repair
- Final completion: triumphant craft completion tone

### NOTE FOR BUILD
This stage requires an annotated workbench image before coordinate-based code is written. Request the image from the user at the start of Stage 4 build. Do not estimate hotspot positions.

### Progression Trigger
User clicks "Inspect the Repair" after completion video ends.

---

## Stage 5 - Quality Check and Sign-Off

**File:** MM-CE-S5-quality.html
**Game type:** The Walkaround Inspection - professional site inspection

### Narrative
Every Magicman repair is inspected before the technician leaves. Natural light only. No inspection lamps. MARV hands you the clipboard.

### Game Design - Full Specification

The user holds a digital inspection clipboard - the same format a Magicman technician uses on every job. The clipboard is visible as a UI element at the bottom of the screen.

The repair scene is displayed as a 3D-perspective view of the basin. The user drags left and right to shift the camera angle - a smooth parallax walkround effect simulating moving around the repair.

Three inspection angles are available. Each angle reveals a different quality criterion on the clipboard:

**Angle 1 - Straight on (colour match)**
The repaired area is viewed front-on in natural light. The clipboard shows: "Colour match - does the repaired area match the surrounding glaze in natural light?"
User judges: Pass or Needs attention

**Angle 2 - Side angle (surface continuity)**
The user has dragged to a 45 degree side view. The clipboard shows: "Surface continuity - is the repaired area flush with the surrounding surface?"
User judges: Pass or Needs attention

**Angle 3 - Close up (edge feathering)**
The user has dragged to a close-up angle. The clipboard shows: "Edge feathering - can you see where the repair begins and ends?"
User judges: Pass or Needs attention

A deliberate flaw exists at one angle - a slight edge that has not been fully feathered. The user must identify it as "Needs attention". MARV steps in and corrects it in real time - a brief animation shows the edge being finished properly. Then the user re-inspects and passes it.

This moment is important - it shows that Magicman's quality standard catches things before the client sees them. That is the point.

After all three criteria pass:
MARV stamps the clipboard with a satisfying animation - the Magicman quality stamp lands on the page.
MARV emotion: marvcongratulatory
Speech: "Three for three. That repair is signed off. That is what every Magicman job looks like before we leave the site."

### Before and After Reveal
The basin scene transitions to a split reveal - interactive slider.
Left side: the damaged basin (before image - clean original photo, no UI overlaid)
Right side: the repaired basin (after image - clean original photo, no UI overlaid)

The slider has a satisfying physical resistance feel - not a plain drag. A Magicman-branded handle on the divider line.

MARV emotion: marvtriumphant
Speech: "This is what repair over replacement looks like. Same surface. Same basin. No disruption, no waste, no waiting. Just like it never happened."

### Sound Design
- Clipboard appearance: paper shuffle sound
- Dragging the walkround: smooth ambient shift
- Pass judgement: clipboard tick sound
- Flaw identified: MARV alert tone, correction animation sound
- Quality stamp: satisfying rubber stamp sound
- Slider drag: smooth slide sound with resistance feel
- Reveal complete: emotional completion chime

### NOTE FOR BUILD
Needs clean original basin before/after photos - no UI text overlaid. Request from user before Stage 5 build begins. User has originals on phone/camera.

### Progression Trigger
User clicks "See the Outcome" after interacting with the before/after slider.

---

## Stage 6 - The Outcome

**File:** MM-CE-S6-outcome.html
**Game type:** The Reveal - animated mission debrief

### Narrative
The repair is done. The property is back in service. This stage lands the full Magicman proposition.

### Game Design - Full Specification

The screen starts completely dark and silent. A single cursor blink. Then the debrief begins.

Each credential lands as a distinct animated event - not just a counter. The sequence builds like the end of a heist film:

**Beat 1 - The guarantee**
A Magicman-branded certificate slides onto the screen. "12-month guarantee. Every repair. No exceptions." MARV signs it with a flourish.

**Beat 2 - Years of experience**
A timeline unspools across the screen from 1993 to today. Key milestones appear along it. The counter at the end lands on "30+ Years."

**Beat 3 - The technicians**
Individual technician silhouettes walk onto the screen one by one. They organise into tiers - Graduates, Technicians, Seniors, Masters. The count lands: 65 active technicians. Growing to 88.

**Beat 4 - The trust network**
Logos or representations of 11 insurance company partners appear. 300+ contractor relationships. Major client references: Harrods, Houses of Parliament, New American Embassy, Premier League stadia.

**Beat 5 - The accreditations**
ISO badges assemble piece by piece - 9001, 14001, 45001. SafeContractor, CHAS, ConstructionLine, Achilles, SMAS stamps land in sequence. Each one clicks into place.

**Beat 6 - The awards**
Sustainable Product of the Year 2020. Best Hard Surfaces Restoration and Repair Service 2022. Trophy animations.

**Beat 7 - The surfaces**
A rapid-fire montage of surface types scrolls across - every material Magicman works with. Wood, ceramic, stone, glass, composite, uPVC, metal, acrylic, marble, granite, vitreous china, stainless steel, enamel, brick, limestone.

Throughout all seven beats MARV stands centre screen, progressively more triumphant. Each beat landing makes him grow in confidence and pride.

MARV emotion: marvtriumphant throughout, growing in intensity

### Seven Pillars
After the debrief, the seven Magicman pillars appear as animated cards:
1. Expertise and Craftsmanship
2. Sustainability and Waste Reduction
3. Speed and Flexibility
4. Trusted by Leading Brands
5. Innovation and Technology
6. Customer Experience
7. Multi-Sector Capability

### Closing Video (20 to 30 seconds) - Optional
MARV direct to camera. Confident, proud, dry.
Script: "Thirty years. Every surface type. Every sector. Clients who thought their surfaces were beyond saving. They weren't. They never are. That is what Magicman does. That is what we have always done. The question is - what do you need fixed?"

### Sales CTA
Final screen - clean, impactful:
- Headline: "Ready to make it like it never happened?"
- Subline: "Talk to your Magicman representative today."
- Contact: 0345 458 1010 | enquiries@magicman.co.uk | magicman.co.uk
- White Magicman wordmark on navy
- MARV in marvtriumphant state alongside

### Sound Design
- Opening: silence, then single low tone
- Each beat: distinct arrival sound building in energy
- Technician silhouettes: footstep sounds as they walk on
- Badge assembly: satisfying click per badge
- Award animations: fanfare stings
- Building through all seven beats to a triumphant full orchestral resolution
- CTA screen: calm, confident resolution tone

### Progression
No further progression. CTA is the action. Sales team takes over.

---

## Global Build Standards

- No em dashes - spaced hyphen only
- UK English throughout
- setMarv(emotion, text, style) on all MARV state changes
- Progress indicator visible at all times
- Green for correct, red for wrong - consistent
- Never auto-progress on load
- CSS grid expandable content: align-items: start on container, align-self: start on cards
- Hotspot coordinates: request annotated image before writing code
- Console clean before any file marked complete
- Speech bubble classes: correct-reaction and wrong-reaction (canonical)
- Sound designed in from the start on every game stage

---

*MM-CE Journey Map v2.0 - 05 June 2026*
*Produced by MA Group Training and Development*
