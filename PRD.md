# TowerGreens — Product Requirements Document
# Version 3.0 | Complete UI Redesign + Full UX Flow Spec
# Antigravity IDE Handoff | 2026

---

## CHANGELOG v2.0 → v3.0

- REDESIGNED: Complete visual identity — new theme "Neon Greenhouse"
- REDESIGNED: Landing page with 10 cinematic sections, frame-by-frame animation spec
- REDESIGNED: Web app with dark glassmorphism + neon-accent design language
- REDESIGNED: Admin panel — command-center aesthetic
- REDESIGNED: Rider panel — field-ops minimal UI
- ADDED: Complete screen-by-screen UX flow for every user journey
- ADDED: Animation choreography with exact timing, easing, and trigger specs
- ADDED: Micro-interaction library (every button, card, input behavior)
- ADDED: Component library tokens (shadows, gradients, blurs, borders)
- ADDED: How the app works — complete user journey narrative
- ADDED: How the landing page is cinematically different from the app

---

## ═══════════════════════════════════════════
## PART 1: THE DESIGN PHILOSOPHY
## ═══════════════════════════════════════════

## 1. THE NEW VISUAL IDENTITY — "NEON GREENHOUSE"

### 1.1 Concept

Forget generic "clean green health food" design.

TowerGreens grows vegetables at night, under electric grow lights, in towers that look
like vertical architecture. The aesthetic draws from this reality: the luminous glow of
grow lights cutting through darkness, the architectural geometry of the towers, the sharp
contrast between living green and industrial structure.

The design language is: DARK LUXURY ORGANIC.

Think of it as if a high-end Japanese izakaya and a Silicon Valley food tech lab had a
child, raised in Lahore. Not pretty-pretty. Striking. Memorable. Slightly otherworldly.

The Feeling: When someone opens TowerGreens for the first time they should feel:
"This is not a vegetable shop. This is something new."

### 1.2 The Two Modes — Landing vs App

These are two different visual experiences on purpose:

LANDING PAGE (towergreens.site)
Mode: EDITORIAL DARK
Feel: Like a luxury magazine spread or a product launch film
Background: Deep near-black with luminous green glow
Typography: Large, dramatic, editorial — Urdu as art
Motion: Cinematic — slow reveals, parallax, video
Purpose: Seduce the visitor, create desire, build trust
Metaphor: The greenhouse at 2am — eerie, beautiful, alive

WEB APP (towergreens.site/app)
Mode: DARK FUNCTIONAL GLASS
Feel: Like a premium food delivery app — Zomato meets Apple
Background: Deep dark with glassy surface cards
Typography: Clean, readable, task-focused
Motion: Snappy, purposeful, never distracting
Purpose: Make ordering fast, delightful, addictive
Metaphor: The cockpit of a very beautiful machine

### 1.3 The Two Themes

DARK THEME (default — this IS the identity):
- Background: #080E0A (near-black with green tint)
- Surface: #0F1A12 (slightly lighter dark)
- Card: rgba(255,255,255,0.04) (glass)
- Glow: #39FF14 (electric neon green — the grow light)
- Primary Text: #F0F7F1 (warm off-white)
- Accent Green: #4ADE80
- Accent Amber: #F59E0B (grow light warmth)
- Border: rgba(74,222,128,0.12)

LIGHT THEME (secondary):
- Background: #F4F9F5
- Surface: #FFFFFF
- Card: #FFFFFF with subtle green border
- Primary: #14532D (deep forest green)
- Accent: #16A34A
- Accent Amber: #D97706
- Text: #0A1F0E
- Border: rgba(20,83,45,0.12)

System default: OS dark/light preference auto-detected.

---

## 2. TYPOGRAPHY SYSTEM

### 2.1 Font Stack

DISPLAY (headings, hero text):
- Font: "DM Serif Display" — italic available, elegant serifs
- Used for: Hero headlines, section titles, large product names
- Why: Unexpected for a food delivery app — creates editorial premium feel

URDU DISPLAY:
- Font: "Noto Nastaliq Urdu" — loaded with full subset
- Direction: ALWAYS direction: ltr; unicode-bidi: plaintext; text-align: left
- Size: Scale up 15% vs English equivalent (Nastaliq reads smaller optically)
- Used for: ALL Urdu text throughout both landing and app

BODY / UI:
- Font: "Satoshi" (Variable) — modern, geometric, distinct from Inter
- Fallback: "DM Sans"
- Weights: 300 / 400 / 500 / 700 / 900

MONO (numbers, OTP, order IDs):
- Font: "JetBrains Mono" — for order numbers, OTP digits, prices

### 2.2 Type Scale

| Name | Desktop | Mobile | Weight | Usage |
|---|---|---|---|---|
| hero-xl | 80px | 48px | DM Serif / Nastaliq 400 | Hero headline |
| hero-lg | 56px | 36px | DM Serif / Nastaliq 400 | Section headlines |
| heading-xl | 40px | 28px | Satoshi 700 | Page titles |
| heading-lg | 28px | 22px | Satoshi 700 | Card titles |
| heading-md | 22px | 18px | Satoshi 600 | Sub-sections |
| body-lg | 18px | 16px | Satoshi 400 | Primary body |
| body-md | 16px | 14px | Satoshi 400 | Secondary body |
| body-sm | 14px | 12px | Satoshi 400 | Labels, captions |
| mono-lg | 24px | 24px | JetBrains Mono | OTP digits |
| mono-md | 16px | 16px | JetBrains Mono | Order IDs, prices |

### 2.3 Urdu Typography Rules — CRITICAL

Apply these CSS rules to EVERY element containing Urdu text:

```css
.urdu-text {
  direction: ltr;
  unicode-bidi: plaintext;
  text-align: left;
  font-family: 'Noto Nastaliq Urdu', serif;
  line-height: 2.2;
  letter-spacing: 0.02em;
  word-spacing: 0.05em;
}
.urdu-hero {
  font-size: clamp(36px, 6vw, 80px);
  line-height: 2;
}
.urdu-heading {
  font-size: clamp(22px, 3vw, 40px);
  line-height: 2;
}
.urdu-body {
  font-size: clamp(15px, 1.5vw, 18px);
  line-height: 2.4;
}
```

---

## 3. COMPONENT DESIGN TOKENS

### 3.1 Glassmorphism Card (App) — Dark Mode

```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(74, 222, 128, 0.10);
  border-radius: 16px;
  box-shadow:
    0 4px 24px rgba(0,0,0,0.4),
    inset 0 1px 0 rgba(255,255,255,0.06);
}
```

### 3.2 Neon Glow Button (Primary CTA)

```css
.btn-primary {
  background: linear-gradient(135deg, #4ADE80, #16A34A);
  color: #080E0A;
  font-family: 'Satoshi', sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 14px 32px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(74, 222, 128, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 24px rgba(74, 222, 128, 0.5), 0 8px 32px rgba(74, 222, 128, 0.25);
}
.btn-primary:active {
  transform: translateY(0) scale(0.97);
}
```

### 3.3 Ghost Button (Secondary)

```css
.btn-ghost {
  background: transparent;
  color: #4ADE80;
  border: 1px solid rgba(74, 222, 128, 0.4);
  border-radius: 9999px;
  padding: 13px 32px;
  font-family: 'Satoshi', sans-serif;
  font-weight: 600;
  transition: all 0.25s ease;
}
.btn-ghost:hover {
  background: rgba(74, 222, 128, 0.08);
  border-color: rgba(74, 222, 128, 0.8);
  box-shadow: 0 0 16px rgba(74, 222, 128, 0.15);
}
```

### 3.4 Input Fields

```css
.input-field {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(74, 222, 128, 0.15);
  border-radius: 12px;
  color: #F0F7F1;
  font-family: 'Satoshi', sans-serif;
  padding: 14px 16px;
  font-size: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}
.input-field:focus {
  border-color: rgba(74, 222, 128, 0.6);
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
}
```

### 3.5 Product Card (App)

```css
.product-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(74, 222, 128, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.3s ease,
              box-shadow 0.3s ease;
  cursor: pointer;
}
.product-card:hover {
  transform: translateY(-6px);
  border-color: rgba(74, 222, 128, 0.25);
  box-shadow: 0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(74,222,128,0.1);
}
.product-card:active {
  transform: translateY(-2px) scale(0.98);
}
.product-card__image {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.product-card:hover .product-card__image {
  transform: scale(1.05);
}
```

### 3.6 Bottom Navigation Bar (App Mobile)

```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: calc(64px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  background: rgba(8, 14, 10, 0.9);
  backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid rgba(74, 222, 128, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.bottom-nav.hidden {
  transform: translateY(100%);
}
.bottom-nav__tab.active .bottom-nav__icon {
  color: #4ADE80;
  filter: drop-shadow(0 0 6px rgba(74,222,128,0.6));
}
```

Tabs: [ہوم] [پروڈکٹس] [کارٹ] [نوٹیفیکیشنز] [پروفائل]
Auto-hide on scroll down, reappear on scroll up.

### 3.7 Skeleton Loader

```css
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.04) 25%,
    rgba(74,222,128,0.08) 50%,
    rgba(255,255,255,0.04) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-wave 1.6s ease-in-out infinite;
  border-radius: 8px;
}
@keyframes skeleton-wave {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## ═══════════════════════════════════════════
## PART 2: LANDING PAGE — CINEMATIC EXPERIENCE
## ═══════════════════════════════════════════

## 4. HOW LANDING PAGE DIFFERS FROM APP

The landing page and the app are fundamentally different experiences by design:

LANDING PAGE PURPOSE:
It is a film. A story. A seduction.
The user is a stranger. They know nothing about TowerGreens.
Its ONLY job is to make them feel something, then convert them into a registered user.

It is cinematic and slow.
It uses full-screen sections.
Each section is designed like a magazine spread.
Scroll is theatrical — things happen AS you scroll.
It has a footer.
It is SSR-rendered for SEO and AI crawlers.

WEB APP PURPOSE:
It is a tool. A product. A machine.
The user is a customer. They want to order.
Its ONLY job is to get them from desire to cart to checkout FAST.

It is snappy and responsive.
Pages are short and task-focused.
No theatrical scroll effects — every pixel is functional.
No footer — bottom nav bar handles all navigation.
Auth-gated SPA — not indexed by search engines.

---

## 5. LANDING — GLOBAL HEADER

Structure:
[TowerGreens Logo]  spacer  [nav links]  [زبان: اردو | EN]  [ابھی آرڈر کریں button]

Behavior:
- On load: background transparent, logo and links white
- On scroll past 80px: rgba(8,14,10,0.92) background + backdrop-filter blur(20px)
- Transition: 400ms ease
- Mobile: hamburger → full-screen slide-down overlay

---

## 6. LANDING SECTION 1: HERO — "The Greenhouse at 2am"

Full viewport: 100vw x 100vh
Background: Autoplay looping video (muted, no controls)
  Video: hydroponic tower in near-darkness, neon grow lights, water trickling
  Fallback: Three.js animated scene — tower shape, floating green particles, grow light glow

Video overlay layers:
1. Noise texture (3% opacity SVG filter) — film grain feel
2. Radial gradient from center (transparent) to edges (rgba(8,14,10,0.6))
3. Bottom vignette: transparent to rgba(8,14,10,1) in last 20% of height

Content (centered, max-width 900px):

[Pre-heading badge — pill, glass style, neon border]
  لاہور کا پہلا ہائیڈروپونک فارم 🌱

[Main headline — Urdu Nastaliq, massive]
  صاف ستھری سبزیاں
  سیدھا آپ کے
  دروازے تک

[Subheadline — Urdu Nastaliq]
  ہائیڈروپونک ٹاورز میں اُگائی گئی — مٹی کے بغیر، کیمیکل کے بغیر

[CTA Row]
  [ابھی آرڈر کریں — btn-primary]    [یہ کیسے کام کرتا ہے؟ — btn-ghost]

[Trust badges row]
  ✓ مٹی کے بغیر    ✓ 100% صاف    ✓ لاہور میں ڈیلیوری

ENTRANCE ANIMATION CHOREOGRAPHY:
t=0ms:     Video starts playing
t=200ms:   Noise overlay fades in (600ms ease)
t=400ms:   Badge slides up + fades in (translateY 20px→0, 500ms ease-out)
t=700ms:   Headline line 1 slides up (translateY 30px→0, 700ms cubic-bezier(0.16,1,0.3,1))
t=900ms:   Headline line 2 slides up (same)
t=1100ms:  Headline line 3 slides up (same)
t=1400ms:  Subheadline fades up (600ms)
t=1700ms:  CTA buttons slide up (stagger 150ms each, 500ms ease-out)
t=2100ms:  Trust badges fade in (stagger 100ms each)
t=2300ms:  Scroll indicator bounces in at bottom

Scroll indicator: animated chevron, bounce animation 2s infinite

---

## 7. LANDING SECTION 2: THE NUMBERS

Background: Diagonal gradient transition from black to dark green

4 stat cards (4-column desktop, 2x2 mobile):
  [100% — کیمیکل فری] [0 — مٹی نہیں] [24/7 — تازگی] [★ 4.9 — ریٹنگ]

Numbers count up from 0 on scroll enter (requestAnimationFrame, 1500ms, ease-out)
Each card: glass style, neon border on hover

---

## 8. LANDING SECTION 3: THE STORY — What Is Hydroponics?

Background: Full black, editorial split layout

LEFT SIDE (55% — text):
  [Amber pre-label]: ہم کیا کرتے ہیں؟
  [Large headline — Nastaliq]:
    روایتی دکانوں سے
    ہٹ کر، کچھ نیا
  [Body Urdu text]
  [3 bullet points with neon green dots]

RIGHT SIDE (45% — visual):
  Tall image of hydroponic tower with grow lights
  Green glow overlay on edges (inset box-shadow)
  Floating annotation bubbles: "روشنی", "پانی", "سبزی" — pulse softly (scale 1.0→1.03, 3s infinite)

SCROLL ANIMATION:
Left: slides in from left (translateX -40px→0), staggered paragraphs
Right: fades in with scale (0.95→1.0)
Trigger: IntersectionObserver at 0.3 threshold

---

## 9. LANDING SECTION 4: PRODUCTS SHOWCASE

Background: #0A1A0E to #080E0A gradient

Header: ہمارے پروڈکٹس / تازہ، صاف، آپ کے لیے

Category filter pills (horizontal scroll):
[تمام] [سبزیاں] [سلاد] [صحت مند کھانا] [چائنیز اسٹائل] [سپر ہیلتھی]
Active pill: gradient background (green), dark text
Filter switch: cards crossfade (opacity 0→1, 300ms)

Product grid: 3-col desktop / 2-col tablet / 2-col mobile
Grid entrance: cards stagger in (translateY 40px→0, 80ms per card stagger)

Each landing product card:
  [Product Image 4:3]
  [thin green divider]
  [Urdu Name — Nastaliq 18px]
  [Category tag — amber pill]
  [Rs 450 — JetBrains Mono, green]
  [کارٹ میں شامل کریں — btn-primary full width]

Hover: card lifts translateY(-6px), image scale(1.05), border glows

"تمام پروڈکٹس دیکھیں" ghost button below grid

---

## 10. LANDING SECTION 5: HOW IT WORKS — 3 Steps

Background: Dark with diagonal decorative green gradient line

Headline: یہ کیسے کام کرتا ہے؟ / تین آسان قدم

Horizontal stepper (desktop) / Vertical (mobile):
  [01 آرڈر کریں] ——— [02 ہم تیار کریں] ——— [03 آپ تک پہنچائیں]

Connecting line animates width 0→100% over 1200ms on scroll enter
Each badge: scale 0→1 sequentially (400ms spring easing)
Each step has Lottie animation icon (fallback: CSS animated SVG)

---

## 11. LANDING SECTION 6: POPULAR DISHES — Bento Grid

Background: Near pure black

Headline: مشہور ڈشز / ہمارے ہائیڈروپونک سبزیوں سے تیار

BENTO GRID LAYOUT (asymmetric, editorial — NOT a regular grid):

Desktop:
  ┌──────────────────────┬──────────┬──────────┐
  │    Card 1 (LARGE)    │  Card 2  │  Card 3  │
  │                      ├──────────┴──────────┤
  │                      │    Card 4 (WIDE)    │
  ├──────────┬───────────┼──────────┬──────────┤
  │  Card 5  │  Card 6   │  Card 7  │  Card 8  │
  └──────────┴───────────┴──────────┴──────────┘

Each card:
  Full-bleed food image
  Bottom overlay gradient: transparent to rgba(8,14,10,0.9)
  Overlay: Urdu dish name (bottom-left) + price (bottom-right)
  Hover: image scale(1.05), overlay slides up slightly revealing calories
  Card 1 (Large): autoplay video on hover (making process clip)

Entrance: each card fadeIn + translateY(30px→0), 60ms stagger

---

## 12. LANDING SECTION 7: TESTIMONIALS

Background: #0A1A0E

Layout: Infinite horizontal marquee (CSS animation)

Marquee CSS:
  animation: marquee 40s linear infinite;
  pauses on hover

Each testimonial card (glass style):
  [★★★★★ — amber with glow]
  [Urdu quote — Nastaliq, LTR]
  [Avatar circle + name + city]

---

## 13. LANDING SECTION 8: TOWER SHOWCASE

Background: Full black, product-launch style

Visual: 3D tower render or high-quality photo, centered, large
Floating annotation cards (glassmorphism) with dotted connecting lines:
  "LED گرو لائٹس" | "پانی کا نظام" | "سبزی کی جگہ" | "کوئی مٹی نہیں"
Annotations rotate in one-by-one (300ms stagger, fadeIn + slideIn)

Headline: ہائیڈروپونک ٹاور — اندر سے دیکھیں
CTA: "مزید جانیں" → /hydroponic-towers

---

## 14. LANDING SECTION 9: FINAL CTA

Background: Deep green to near-black gradient + radial green glow at center

[Large Urdu headline — Nastaliq, massive]
  آج ہی شامل ہوں
  TowerGreens فیملی میں

[Sub]: لاہور کی سب سے صاف سبزیاں، ابھی آرڈر کریں

[ابھی آرڈر کریں — btn-primary large]  [اکاؤنٹ بنائیں — btn-ghost large]

[Subtle row]: 100% محفوظ | JazzCash ادائیگی | تیز ڈیلیوری

Background glow:
  Radial green glow, pulses in/out every 4s (opacity 0.5→1, scale 1→1.1)

---

## 15. LANDING FOOTER (2026 Layout)

Top: Animated gradient shimmer border line (green)

4-column grid (desktop) / stacked (mobile):
  Column 1: Logo + tagline "صاف ستھری سبزیاں، ہمیشہ تازہ"
  Column 2: Quick Links (ہم کون ہیں, ہائیڈروپونکس, بلاگ, رابطہ)
  Column 3: Categories (سبزیاں, سلاد, صحت مند کھانا, چائنیز اسٹائل)
  Column 4: Contact (support@towergreens.site, YouTube icon, Direct Message)

Bottom bar: © 2026 TowerGreens | شرائط | رازداری | اردو | EN
No location disclosed.
Footer columns: staggered fadeIn as user scrolls to footer

---

## ═══════════════════════════════════════════
## PART 3: WEB APP — HOW IT WORKS (COMPLETE)
## ═══════════════════════════════════════════

## 16. HOW THE APP WORKS — FIRST TIME USER JOURNEY

User opens https://towergreens.site/app
  ↓
LANGUAGE SELECTION SCREEN (full-screen, dark background, centered modal):
  TowerGreens logo at top
  Urdu headline: "زبان منتخب کریں"
  [اردو — تجویز کردہ] card (larger, green glow border, "RECOMMENDED" badge)
  [English] card (smaller, neutral border)
  User selects → preference saved to localStorage + profile
  ↓
LOGIN / SIGNUP PROMPT (card overlay, not blocking):
  [لاگ ان کریں] [سائن اپ کریں] [ابھی نہیں — تھوڑا دیکھیں]
  ↓
APP HOME → /app/home

---

## 17. APP HOME SCREEN — /app/home

Screen layout from top to bottom:

STICKY HEADER:
  [TowerGreens Logo, small]                [🔔 badge count] [🛒 cart count badge]

GREETING:
  "خوش آمدید، احمد 👋"  [Satoshi 600]
  "آج کیا کھائیں گے؟"  [lighter weight]

SEARCH BAR:
  🔍 "سبزیاں، سلاد، صحت مند کھانا تلاش کریں..." [glass input, Nastaliq placeholder]

CATEGORY CHIPS (horizontal scroll, no scrollbar):
  [تمام] [سبزیاں] [سلاد] [صحت مند] [چائنیز] [سپر ہیلتھی]

FEATURED BANNER CAROUSEL:
  Full-width glass card, 16:7 ratio
  Admin-set banners, auto-rotate every 4s, smooth crossfade (300ms)
  Dot indicators below

COINS WIDGET (if user has coins > 0):
  🪙 آپ کے پاس [350] TowerGreens Coins ہیں
  [500 پر 500 روپے کی چھوٹ ملے گی]  [→]
  Glass card, amber tint, coin icon with sparkle animation

"تازہ ترین پروڈکٹس" ROW:
  Header: [تازہ ترین] + [سب دیکھیں →]
  Horizontal scroll row of product cards (2.2 cards visible at once on mobile)

"مشہور ڈشز" GRID:
  2-column grid of dish cards

BOTTOM NAVIGATION (fixed, auto-hide on scroll down)

Page load sequence:
t=0ms:    Skeleton loaders appear (all sections)
t=0ms:    API calls made in parallel
t=~500ms: Data arrives → skeletons crossfade to real content (250ms)
          Content: stagger 40ms, translateY 12px→0

---

## 18. PRODUCT LISTING SCREEN — /app/products

HEADER: "تمام پروڈکٹس"

FILTER BAR (sticky below header, horizontal scroll):
  [Sort ▼] [Price: 100-1000] [کیٹیگری ▼] [صرف دستیاب]
  Active filters appear as removable pill tags below bar

PRODUCT GRID (2-col mobile / 3-col desktop):
  Each card: image, Urdu name, price, add-to-cart button

ADD-TO-CART BUTTON BEHAVIOR:
  State 1: [+ کارٹ میں شامل]  — default green button
    ↓ (tap) → button bounces (scale 0.9→1.1→1.0, 300ms)
              cart icon count increments with spring animation
  State 2: [- 1 +]  — quantity adjuster replaces button
  State 3: [- 2 +]  — quantity updates live

INFINITE SCROLL:
  Near bottom → fetch next 12 products
  Loading: 4 skeleton cards appear at bottom
  "کوئی مزید پروڈکٹ نہیں" when exhausted

EMPTY STATE:
  SVG illustration of empty basket
  "کوئی پروڈکٹ نہیں ملا"
  [فلٹرز ہٹائیں] button

BOTTOM NAV (fixed)

---

## 19. PRODUCT DETAIL SCREEN — /app/product/[id]

(No sticky header — translucent back+share overlay at top)

IMAGE GALLERY:
  Full-width swipeable carousel (4 images)
  Thumbnail strip below (4 small images, active = green border)
  Swipe: pan horizontal, snap to card

CONTENT CARD (glass, rounded top, overlaps image slightly):
  [Category pill — amber]
  [Urdu product name — Nastaliq, large]
  [Price: Rs 450]  [Calorie pill: 🔥 280 kcal]

  MAKING PROCESS VIDEO (custom player):
  Thumbnail + play button
  Full custom controls: progress bar, play/pause, time, volume, fullscreen
  No native browser player UI

  [Accordion: اجزاء (Ingredients)]
  [Accordion: کیلوریز کی تفصیل (Nutrition)]
  [Accordion: ڈیلیوری کی معلومات]

  [Urdu description — full text, Nastaliq, LTR]

  "متعلقہ پروڈکٹس" — horizontal scroll row

STICKY BOTTOM CTA (mobile only — appears after scrolling past price):
  [Rs 450]    [کارٹ میں شامل کریں — btn-primary, full-width]
  Smooth slide-up on appearance
  Disappears when product description CTA is in view

---

## 20. CART SCREEN — /app/cart

HEADER: "آپ کا کارٹ" + item count badge

CART ITEMS LIST:
  Each item row: [Image 60x60] [Urdu Name] [- qty +] [Rs 450] [🗑️]
  Swipe left → red delete zone appears (iOS-style)
  Tap delete → item slides out (height→0, 300ms ease-in)
  Remaining items shuffle up smoothly (350ms)

EMPTY CART:
  SVG: empty basket with single sad leaf
  "کارٹ خالی ہے"
  [خریداری شروع کریں → /app/products]

COINS WIDGET (if 500+ coins, online payment):
  🪙 500 TowerGreens Coins استعمال کریں؟
  [ہاں، 500 روپے کی چھوٹ لیں] [نہیں]

ORDER SUMMARY:
  آئٹمز کل:      Rs 900
  ڈیلیوری:        مفت
  کوائنز چھوٹ:  - Rs 500
  ━━━━━━━━━━━━
  کل ادائیگی:     Rs 400

[چیک آؤٹ پر جائیں — btn-primary, full width]

BOTTOM NAV (fixed)

---

## 21. CHECKOUT SCREEN — /app/checkout

Step indicator at top:
  [1: تفصیلات] ——— [2: ادائیگی] ——— [3: تصدیق]
  Active: green dot + green text | Complete: checkmark | Future: muted

STEP 1 — Delivery Details:
  نام: [text input]
  فون: [phone, Pakistan format]
  پتہ: [textarea, Urdu placeholder]
  شہر: لاہور (pre-filled, disabled)
  [اگلا → btn-primary]

STEP 2 — Payment Method (selectable tiles):
  ┌──────────────────────────────┐  ┌──────────────────────┐
  │ ● JazzCash                  │  │ ○ کیش آن ڈیلیوری  │
  │  موبائل نمبر: [03_________] │  │  ڈیلیوری پر ادائیگی │
  │  [JazzCash logo]            │  └──────────────────────┘
  └──────────────────────────────┘
  Active tile: green border + green dot + subtle glow
  [اگلا → btn-primary]

STEP 3 — Confirmation:
  Full order summary review
  [آرڈر دیں — btn-primary, large]

---

## 22. ORDER PLACED SCREEN — /app/order-placed

Full-screen celebration — no header, no bottom nav — pure animation

ANIMATION SEQUENCE:
t=0ms:    Dark background appears
t=200ms:  Large SVG checkmark draws itself (stroke animation, 600ms)
t=800ms:  Confetti explosion (CSS particles — 40 particles, brand green + amber)
t=1200ms: "آپ کا آرڈر موصول ہو گیا!" slides up (Nastaliq, large, white)
t=1600ms: Order ID fades in (JetBrains Mono): #TG-20260305-4821
t=2000ms: Delivery timer slides up

DELIVERY TIMER:
  SVG circular progress ring
  Center countdown: "35:00" counting down
  Ring color: green animated fill
  Text: "آپ کا آرڈر [35] منٹ میں پہنچ جائے گا"

BELOW TIMER:
  Order summary (collapsed, expandable accordion)
  [آرڈر ٹریک کریں → /app/orders/[id]]  [ہوم پر واپس → /app/home]

Confetti CSS:
  .confetti-particle { animation: confetti-fall 2s ease-in forwards; }
  @keyframes confetti-fall {
    0%   { transform: translateY(-100px) rotate(0deg);   opacity: 1; }
    100% { transform: translateY(100vh)  rotate(720deg); opacity: 0; }
  }

---

## 23. ORDER TRACKING SCREEN — /app/orders/[id]

HEADER: "آرڈر #TG-20260305-4821"  [← واپس]

STATUS TRACKER (vertical stepper):
  ● آرڈر موصول ✓         [timestamp]   ← completed (green, solid)
  ● آرڈر قبول ✓          [timestamp]   ← completed
  ○ تیاری جاری ہے                        ← current (pulsing glow dot)
  ○ ڈیلیوری پر ہے                        ← future (muted)
  ○ پہنچ گیا                             ← future (muted)

Current status: pulse animation (box-shadow glow, 1.5s infinite)

ORDER ITEMS LIST: images, names, quantities, prices

PAYMENT DETAILS:
  ادائیگی: JazzCash | حالت: ✓ کامیاب | کل: Rs 450

DELIVERY ADDRESS section

BOTTOM NAV (fixed)

---

## 24. OTP COINS POPUP (Post-Delivery, Online Payment Only)

Triggered: when customer opens app within 24 hours of delivery completion

[Semi-transparent overlay + backdrop blur]
┌──────────────────────────────────────────┐
│  🪙  مبارک ہو!                          │
│                                          │
│  آپ کے آرڈر #TG-4821 کی ڈیلیوری        │
│  مکمل ہو گئی۔                           │
│                                          │
│  اپنے 125 TowerGreens Coins حاصل       │
│  کرنے کے لیے OTP درج کریں:             │
│                                          │
│  [8-digit OTP input — JetBrains Mono]   │
│  _ _ _ _ - _ _ _ _                      │
│                                          │
│  [تصدیق کریں — btn-primary]             │
│  [بعد میں — ghost, small]              │
│                                          │
│  ⏱️ 18 گھنٹے 42 منٹ باقی ہیں         │
└──────────────────────────────────────────┘

On correct OTP:
  Coins counter animates up (+125 with count animation)
  Mini confetti burst from coin icon
  Toast: "125 Coins آپ کے اکاؤنٹ میں شامل ہو گئے! 🪙"

On wrong OTP:
  Input boxes shake (left-right keyframe, 500ms)
  Red border on all boxes
  "غلط OTP — دوبارہ کوشش کریں"

---

## 25. PROFILE SCREEN — /app/profile

HEADER: "پروفائل"

PROFILE HERO:
  [96px avatar circle — user image or initial]
  Tap → file picker for image upload
  Green ring around avatar if coins > 0
  [User Name — Satoshi 700]
  [user@email.com — muted]
  [ترمیم کریں — ghost, small]

COINS CARD (amber tint glass):
  🪙 [350] TowerGreens Coins
  Progress bar toward 500: ████████░░  350/500
  [Coins کی تفصیل → /app/coins]

MENU ITEMS (icon + Urdu label + arrow):
  📦 میرے آرڈرز
  🔔 نوٹیفیکیشنز
  💬 ڈائریکٹ میسج
  🌐 زبان تبدیل کریں
  📄 شرائط و ضوابط
  🔒 رازداری کی پالیسی
  🚪 لاگ آؤٹ  ← red text

Each item hover: background flash rgba(74,222,128,0.06) + arrow translateX(4px)

BOTTOM NAV (fixed)

---

## ═══════════════════════════════════════════
## PART 4: ADMIN PANEL — COMMAND CENTER
## ═══════════════════════════════════════════

## 26. ADMIN PANEL DESIGN

### Visual Identity — "Command Center"
- Background: Deep cool gray (#0F1117) — different from green-tinted app dark
- Accents: Electric green (#4ADE80) retained but more restrained
- Data tables: Dense, information-rich
- Typography: Satoshi only (no Nastaliq — admin is primarily functional English/Urdu)
- Sidebar: 240px (desktop), collapsible to 64px icon-only mode

### Admin Layout
  TOPBAR: [≡] TowerGreens Admin    [🔔 3]  [admin@... ▼]
  SIDEBAR (left):
    🏠 Dashboard
    📦 Orders ●3  (badge for pending)
    🛍️ Products
    🏷️ Categories
    👥 Users
    🏍️ Riders
    🪙 Coins
    🔔 Notify
    🚴 Delivery
    💳 Payments
    📊 Analytics
    💬 Messages
    📝 Content
    ⚙️ Settings
  MAIN CONTENT: right side

### Admin Dashboard — /admin/dashboard

4 STAT CARDS (top row):
  آج آرڈر | آمدنی | نئے Users | زیر التوا (with URGENT badge if > 0)
  Numbers with % change indicator and trend arrow

PENDING ORDERS ALERT (if any):
  Amber bordered glass card, pulsing border
  "X آرڈرز کا انتظار ہے" [ابھی دیکھیں →]

RECENT ORDERS TABLE:
  Columns: Order ID | Customer | Items | Amount | Status | Actions
  Status badges (color-coded pills):
    Placed: amber | Accepted: blue | Preparing: purple
    Out for Delivery: orange | Delivered: green | Rejected: red
  Per-row actions: [قبول] [مسترد] [تفصیل]

REVENUE CHART: Line chart (Recharts), last 30 days, green line + gradient fill

LOW STOCK ALERTS: Products with isAvailable = false

### Admin Order Single — slide-in right panel
  Full order details, status dropdown, [قبول کریں] / [مسترد کریں] buttons
  [رائیڈر تفویض کریں] dropdown → assign active rider

### Admin Rider Management — /admin/riders
  [+ نیا رائیڈر شامل کریں] — ONLY way to create rider accounts
  Modal form: نام, ای میل, پاس ورڈ, تصدیق
  Table: Name | Email | Status | Today's Deliveries | Activate/Deactivate toggle

---

## ═══════════════════════════════════════════
## PART 5: RIDER PANEL — FIELD OPS
## ═══════════════════════════════════════════

## 27. RIDER PANEL DESIGN

### Visual Identity — "Field Operations Minimal"
- Light mode (default for outdoor readability in sunlight)
- Large touch targets everywhere (minimum 56px)
- Clear large status badges
- Minimal animations — riders need speed, not beauty
- Language toggle always visible in header

### Rider Dashboard — /rider/dashboard

HEADER: TowerGreens Rider  [زبان اردو | EN]
Status: آن ڈیوٹی ●

TODAY SUMMARY: آج کی ڈیلیوریز: 6 مکمل | 2 باقی

ORDER CARDS:
  [Order ID] [Status badge — large]
  Customer name, phone (tap to call), address
  Rs amount, payment method
  Green border = JazzCash paid | Orange border = COD
  [آرڈر دیکھیں →] large tap target

### Rider Single Order — /rider/orders/[id]

Customer: نام, [tap-to-call], پتہ
Items list
Payment: JazzCash ✓ ادا شدہ | or COD
کل amount

[آرڈر ڈیلیور کر دیا] ← large green button, 64px tall, full width

### OTP Verification — /rider/otp-verify

"گاہک سے 8 ہندسوں کا OTP لیں"

8-BOX OTP INPUT (JetBrains Mono, large):
  Each box = 1 digit, 48x56px
  Auto-advance to next box after digit entry
  Backspace: move to previous box

[تصدیق کریں — large green, full width]

SUCCESS: Full screen green flash (1s) + "آرڈر مکمل!" + back to dashboard
ERROR: Input boxes shake + red border + "غلط OTP — دوبارہ کوشش کریں"
       Retry counter (3 attempts max shown)

---

## ═══════════════════════════════════════════
## PART 6: ANIMATION MASTER REFERENCE
## ═══════════════════════════════════════════

## 28. ANIMATION LIBRARY

### 28.1 Page Transitions (App SPA)

Forward: New page slides in from right (translateX 100%→0, 300ms ease)
Back: New page slides in from left (translateX -100%→0, 300ms ease)
Modal: Fade + scale (opacity 0→1, scale 0.95→1, 250ms)
Bottom sheet: Slides up from translateY(100%) → 0, 350ms spring

### 28.2 Toast Notifications

Position: top-center, fixed
Entrance: translateY(-80px)→0 + opacity 0→1, 350ms spring
Exit: translateY(-80px) + opacity 0, 300ms ease-in
Style: glass card, pill shape, green border, centered text
Auto-dismiss: 3000ms

### 28.3 Loading States

Button loading: Replace label with spinner (border-top-color white, 0.6s spin)
Page loading: Skeleton loaders (shimmer wave, see Section 3.7)
First app open: Logo breathe animation (scale 1.0→1.05, 1.5s ease infinite)
              → on data ready: logo scale(1.2) + opacity(0), 400ms, then content reveals

### 28.4 Micro-Interactions Master Table

| Element | Interaction | Animation | Duration |
|---|---|---|---|
| Button tap | Press | scale(0.95)→scale(1.02)→scale(1) | 300ms |
| Card tap | Press | scale(0.98)→scale(1) | 250ms ease-out |
| Cart add | Confirm | btn bounce, cart count spring +1 | 300ms |
| Cart delete | Remove | height→0 + opacity→0 | 300ms ease-in |
| Nav tab | Activate | icon scale(1.2)→1.0 + dot appears | 200ms |
| Input focus | Focus | border glow expand, ring appear | 200ms |
| Toggle | Switch | translateX spring (stiffness 400, damping 30) | — |
| OTP digit | Advance | auto-focus next + subtle bounce | 80ms |
| Coin earn | Reward | number counts up + sparkle particles | 1500ms |
| Error | Shake | -6px,+6px,-4px,+4px,-2px,+2px,0 | 500ms |
| Image load | Reveal | blur(8px)→blur(0) + opacity 0→1 | 400ms |
| Accordion | Open/Close | height animate + chevron rotate 180° | 300ms |
| Banner | Auto-rotate | opacity crossfade | 300ms |
| Search | Expand | width animate from icon | 300ms spring |

---

## ═══════════════════════════════════════════
## PART 7: ALL SYSTEM SPECS
## ═══════════════════════════════════════════

## 29. PROJECT OVERVIEW

Company: TowerGreens
Domain: https://towergreens.site
App: https://towergreens.site/app
Logo: logo.png (project folder — DO NOT replace or generate)
Favicon: Generated from logo.png, background removed (transparent)
Support Email: support@towergreens.site
Info Email: info@towergreens.site
Admin: admin@towergreens.site / quick@43_21aB
YouTube: https://youtube.com/@TowerGreens | https://www.youtube.com/@TowerGreens
Location: Not disclosed

---

## 30. TECH STACK

Framework: Vite + React (NOT Next.js)
Hosting: Vercel Free Tier
SSR: Vite SSR mode for all landing / public routes
SPA: Client-side React for /app/* /admin/* /rider/*
Auth: insforge.dev (email + Google OAuth)
Database: insforge.dev
Payments: JazzCash
Push: Web Push API (VAPID) + median.co push bridge
Email: Gmail SMTP via info@towergreens.site
App conversion: median.co → APK + iOS

---

## 31. SITE ARCHITECTURE — 73 PAGES

Public Landing (SSR, indexed):
1.  /                  Landing Page
2.  /about             About Us
3.  /products          All Products Overview
4.  /veggies           Vegetables Category
5.  /salads            Salads Category
6.  /healthy-food      Healthy Food Category
7.  /chinese-style     Chinese Style Dishes
8.  /super-healthy     Super Healthy Category
9.  /processed-food    Processed Food Category
10. /how-it-works      How Hydroponics Works
11. /hydroponic-towers Our Hydroponic Towers
12. /why-towergreens   Why Choose TowerGreens
13. /contact           Contact
14. /terms             Terms & Conditions (Urdu)
15. /terms-en          Terms & Conditions (English)
16. /privacy           Privacy Policy (Urdu)
17. /privacy-en        Privacy Policy (English)
18. /faq               FAQ
19. /blog              Blog Index
20. /blog/[slug]       Blog Post

Web App SPA (auth-gated, NOT indexed):
21. /app               Entry / Redirect
22. /app/home          App Home
23. /app/login         Login
24. /app/signup        Signup
25. /app/forgot-password
26. /app/reset-password
27. /app/language-select
28. /app/products      All Products
29. /app/veggies
30. /app/salads
31. /app/healthy-food
32. /app/chinese-style
33. /app/super-healthy
34. /app/processed-food
35. /app/product/[id]  Product Detail
36. /app/cart          Cart
37. /app/checkout      Checkout
38. /app/payment       Payment
39. /app/payment/callback  JazzCash Return
40. /app/order-placed  Confirmation
41. /app/orders        Order History
42. /app/orders/[id]   Single Order
43. /app/profile       Profile
44. /app/profile/edit  Edit Profile
45. /app/coins         Coins Wallet
46. /app/notifications Notifications
47. /app/direct-message Support Chat
48. /app/terms         T&C (language-aware)
49. /app/privacy       Privacy (language-aware)
50. /app/search        Search Products

Admin Panel (admin@towergreens.site only):
51. /admin             Entry
52. /admin/dashboard   Dashboard
53. /admin/orders      All Orders
54. /admin/orders/[id] Single Order
55. /admin/products    Product Management
56. /admin/categories  Category Management
57. /admin/users       User Management
58. /admin/riders      Rider Management
59. /admin/coins       Coins Management
60. /admin/notifications Push Notifications
61. /admin/delivery-settings Delivery ETA
62. /admin/payments    Payment Records
63. /admin/analytics   Analytics
64. /admin/messages    Support Messages
65. /admin/settings    Site Settings
66. /admin/content     Content Management

Rider Panel (rider accounts only):
67. /rider             Entry
68. /rider/dashboard   Dashboard
69. /rider/orders      Order List
70. /rider/orders/[id] Single Order + Deliver Button
71. /rider/otp-verify  OTP Screen
72. /rider/language-select Language Toggle
73. /rider/profile     Profile (read-only)

---

## 32. AUTHENTICATION

Provider: insforge.dev
Methods: Email/Password + Google OAuth

Roles:
  Customer  → /app/*     → self-signup via /app/signup
  Admin     → /admin/*   → pre-set admin@towergreens.site / quick@43_21aB
  Rider     → /rider/*   → admin creates only, NO self-signup anywhere in UI

Login routing:
  Customer  → /app/home
  Admin     → /admin/dashboard
  Rider     → /rider/dashboard

Terms & Privacy from auth pages:
  Urdu version → /app/terms, /app/privacy
  English version → /terms-en, /privacy-en

---

## 33. SEO & AI CRAWLER ACCESS

All public landing pages must be 100% accessible to:
Googlebot, Bingbot, GPTBot (OpenAI), ClaudeBot (Anthropic), Facebook, Apple,
Twitter/X, WhatsApp, LinkedIn, PerplexityBot

robots.txt:
  User-agent: * → Allow: all public paths, Disallow: /admin, /rider, /app
  User-agent: GPTBot → Allow: /
  User-agent: ClaudeBot → Allow: /
  User-agent: Google-Extended → Allow: /
  User-agent: PerplexityBot → Allow: /
  Sitemap: https://towergreens.site/sitemap.xml

All public pages: SSR-rendered meta tags (title, description, OG, Twitter Card)
Structured Data JSON-LD: FoodEstablishment on homepage, Product on product pages
hreflang: ur and en-PK alternates
Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1

---

## 34. LOGO, FAVICON & PWA ASSETS

Source: logo.png from project folder — ONLY logo source, never replace

Favicon (background removed — transparent):
  favicon.ico (32x32), favicon-16x16.png, favicon-32x32.png, favicon.svg
  Place in /public/

Apple Touch Icon:
  180x180px, logo centered on solid brand green (#1B4332) background
  NO transparency — Apple requires solid background
  File: /public/apple-touch-icon.png

PWA manifest.json (/public/manifest.json):
  name: "TowerGreens"
  short_name: "TowerGreens"
  description: "صاف ستھری سبزیاں، سیدھا آپ کے دروازے تک"
  start_url: "/app"
  display: "standalone"
  orientation: "portrait"
  theme_color: "#1B4332"
  background_color: "#0D1F17"
  lang: "ur", dir: "ltr"
  Icons: 72, 96, 128, 144, 152, 192 (maskable), 384, 512 (maskable)
  All icons: green background, logo centered (75% of icon area), /public/icons/

iOS Splash Screens (/public/splash/):
  iPhone SE, iPhone 14, iPhone 14 Pro Max sizes
  Design: green background + logo centered + Urdu tagline

HTML head meta (app + landing):
  apple-mobile-web-app-capable, apple-mobile-web-app-status-bar-style: black-translucent
  theme-color: #1B4332 (light) / #0D1F17 (dark)
  manifest: /manifest.json

---

## 35. PRODUCT SYSTEM

Categories (with Urdu):
  سبزیاں | سلاد | صحت مند کھانا | چائنیز اسٹائل | سپر ہیلتھی | پروسیسڈ فوڈ

Product Detail Page contains:
  4 images (carousel + thumbnail strip)
  Making process video (custom player)
  Urdu name + description (LTR, always)
  Ingredients accordion
  Calorie info
  Price in PKR
  Related products

Admin manages:
  Full CRUD, 4 images per product, making video, Urdu + English fields,
  ingredients, calories, price, category, isAvailable toggle, isFeatured toggle

---

## 36. ORDER SYSTEM

Flow: Browse → Cart → Checkout (3 steps) → Payment → Order Placed

Payment: JazzCash (online) | Cash on Delivery (COD)

Order statuses: Placed → Accepted → Preparing → Out for Delivery → Delivered
               or: Placed → Rejected

Push notifications:
  Placed, Accepted, Rejected, Out for Delivery, Delivered
  All in Urdu and English based on user language preference

---

## 37. RIDER OTP DELIVERY SYSTEM

Phase 1 — Delivery Verification:
  Rider taps "آرڈر ڈیلیور کر دیا"
  System emails 8-digit OTP from info@towergreens.site to customer
  Customer tells OTP to rider
  Rider enters OTP in /rider/otp-verify
  OTP correct → order completed

Phase 2 — Coins OTP (Online Payment Only):
  After delivery, OTP valid 24 hours
  Customer opens app within 24 hours → coins popup appears
  Customer enters same OTP → 25% of order value awarded as coins
  Example: Rs 500 order → 125 coins
  Missed window → no coins for that order

---

## 38. TOWERGREENS COINS SYSTEM

Earning:
  1–5% of order value per order (admin-configurable rate)
  25% bonus for online-paid orders with 24h OTP verification

Spending — Exact Rules:

  500 Coin Threshold:
    Trigger: 500+ coins + JazzCash payment selected
    Pop-up: "آپ کے پاس 500 TowerGreens Coins ہیں۔ کیا استعمال کرنا چاہتے ہیں؟"
    Accept → deduct exactly 500 coins → reduce total by Rs 500
    If order < Rs 500 → FREE order, 500 coins deducted, NO coin refund
    Reject → no change

  5000 Coin Threshold:
    Same logic at 5000 coins
    Deduct 5000 coins → reduce total by Rs 5000
    If order < Rs 5000 → FREE order, 5000 coins deducted, no refund

  Rules:
    Works ONLY with JazzCash, never COD
    750 coins → only 500 deducted → 250 remain (unusable until reach 500 again)
    Coin balance visible in /app/profile and /app/coins

---

## 39. JAZZCASH INTEGRATION (8-Step Guide)

Step 1: Merchant Account
  Sandbox: https://sandbox.jazzcash.com.pk
  Obtain: Merchant ID, Password, Integrity Salt

Step 2: .env Variables
  JAZZCASH_MERCHANT_ID, JAZZCASH_PASSWORD, JAZZCASH_INTEGRITY_SALT
  JAZZCASH_RETURN_URL=https://towergreens.site/app/payment/callback
  JAZZCASH_API_URL_SANDBOX (sandbox endpoint)
  JAZZCASH_API_URL_PROD (production endpoint)

Step 3: HMAC Hash (SHA-256)
  Sort params alphabetically, join values with &
  Prepend salt: hashString = salt + '&' + sortedValues
  Hash: crypto.createHmac('sha256', salt).update(hashString).digest('hex')

Step 4: /api/payment/initiate endpoint
  Accept: order total, order ID, customer phone
  Build JazzCash payload + HMAC
  Return redirect data

Step 5: /api/payment/callback endpoint
  Verify returned HMAC
  Update order payment status in insforge.dev
  Redirect to /app/order-placed (success) or /app/payment?status=failed

Step 6: Frontend flow
  User selects JazzCash → initiate → redirect to JazzCash hosted page → callback

Step 7: Sandbox testing
  Test phone: 03001234567 | Test OTP: 111222
  Test success and failure scenarios

Step 8: Go live
  Replace sandbox credentials with production
  Test one live transaction before launch

---

## 40. WEB PUSH NOTIFICATIONS

Setup:
  Service Worker at /sw.js
  VAPID keys (public + private) in .env
  Subscribe on app load after login
  Store endpoint in insforge.dev pushSubscriptions table
  median.co push bridge for APK/iOS native push

---

## 41. ADMIN PANEL FULL CAPABILITIES

Admin never needs to open insforge.dev directly. Everything managed from /admin:

Dashboard: stats, pending alerts, recent orders, revenue chart, low stock
Orders: filter by status, accept/reject (triggers notifications), manual status, rider assignment
Products: full CRUD, 4 images, video, Urdu+English content, availability, featured
Categories: add/edit/delete/reorder
Users: view profiles, order history, coins balance, ban/unban, manual coin adjust
Riders: create accounts (ONLY path), delivery history, activate/deactivate
Coins: all user balances, manual adjust per user, configure earn rate (1–5%)
Notifications: broadcast or targeted push, history log
Delivery Settings: set ETA (e.g., 30/45/60 min) shown on order placed page
Payments: JazzCash records, COD records, export
Analytics: sales by category, top products, revenue trends, user retention
Content: hero text (Urdu+English), hero video, banners, blog posts
Messages: customer messages, reply, mark resolved
Settings: site name, logo upload, emails, social links, maintenance mode toggle

---

## 42. TERMS & PRIVACY

Urdu Versions (primary):
  /terms, /privacy (public)
  /app/terms, /app/privacy (in-app, language-aware)
  Linked from Urdu auth pages

English Versions:
  /terms-en, /privacy-en (public)
  Linked from English auth pages

T&C must cover: service description, order/cancellation policy, payment terms,
coins terms (earning/spending/thresholds/expiry), OTP process, delivery liability,
user responsibilities, prohibited uses, governing law: Pakistan

Privacy must cover: data collected, purpose, third parties (insforge.dev, JazzCash,
Google OAuth), data retention, user rights, contact: support@towergreens.site

---

## 43. SECURITY

/admin/* — admin@towergreens.site ONLY
/rider/* — rider accounts ONLY
/app/* — authenticated only (except login, signup, forgot-password)
HTTPS everywhere
JazzCash HMAC verified on all callbacks
OTP: 8 digits, expires 24h after delivery
Rate limiting: login, OTP submit, payment initiate
CSRF protection on all POST/PUT/DELETE
Input sanitization and validation on all forms
No sensitive data in localStorage (tokens in httpOnly cookies)

---

## 44. DATABASE SCHEMA (insforge.dev)

users: id, name, email, phone, profileImage, role, language, coinsBalance, createdAt
products: id, nameUrdu, nameEn, descriptionUrdu, descriptionEn, images[4], videoUrl, ingredients, calories, price, category, isAvailable, isFeatured
categories: id, nameUrdu, nameEn, slug, sortOrder
orders: id, userId, items[], totalAmount, paymentMethod, paymentStatus, orderStatus, deliveryAddress, riderId, otp, otpExpiresAt, otpUsedAt, coinsApplied, coinsEarned, createdAt
riders: id, name, email, passwordHash, isActive, assignedOrders[]
notifications: id, userId, title, body, isRead, createdAt
messages: id, userId, message, reply, isResolved, createdAt
coinTransactions: id, userId, amount, type(earn/deduct), orderId, reason, createdAt
settings: key, value (delivery_duration, coin_earn_rate, maintenance_mode...)
pushSubscriptions: id, userId, endpoint, keys

---

## 45. MEDIAN.CO APK/iOS CHECKLIST

Before handing off to median.co:
  [ ] All /app/* pages functional as standalone SPA
  [ ] Service worker registered and tested
  [ ] Push notifications tested on mobile browser
  [ ] All interactions work on touch (no hover-only)
  [ ] Tap targets minimum 48x48px
  [ ] Bottom navigation bar implemented + auto-hide tested
  [ ] manifest.json validated
  [ ] apple-touch-icon.png present
  [ ] iOS splash screens present
  [ ] Deep linking works: /app/product/[id] etc.
  [ ] Auth state persists (localStorage/cookie)
  [ ] Correct scroll behavior, no overscroll issues
  [ ] theme-color meta set
  [ ] No console errors on mobile
  [ ] safe-area-inset applied to bottom nav

---

## 46. ANTIGRAVITY AGENT HANDOFF CHECKLIST

Before First Line of Code:
  [ ] Read entire PRD v3.0
  [ ] Load logo.png from project folder
  [ ] Install fonts: Satoshi, DM Serif Display, Noto Nastaliq Urdu, JetBrains Mono
  [ ] Set up CSS variables from Section 1.2 color tokens
  [ ] Set up component tokens from Section 3
  [ ] Set up Vite + React + Vite SSR
  [ ] Configure insforge.dev SDK
  [ ] Configure VAPID keys

Design Rules — NEVER BREAK:
  [ ] Dark theme = default everywhere (this IS the TowerGreens brand)
  [ ] Urdu text: direction: ltr; unicode-bidi: plaintext; always, no exceptions
  [ ] Landing page: always dark, SSR, has footer
  [ ] App: SPA, NO footer, bottom nav bar (5 tabs)
  [ ] Admin: completely self-sufficient — no insforge.dev access needed
  [ ] Rider: NO self-signup anywhere in UI

Quality Gates Before Launch:
  [ ] Lighthouse 90+ mobile on landing page
  [ ] 60fps animations (no jank on mid-range Android)
  [ ] OTP end-to-end tested: rider → customer email → rider verify → coins popup → coins credited
  [ ] JazzCash sandbox: success + failure + callback HMAC verified
  [ ] Coins thresholds tested: 500 and 5000, including order < threshold = free scenario
  [ ] median.co checklist completed
  [ ] PWA install tested on Android + iOS
  [ ] robots.txt with AI crawlers live
  [ ] sitemap.xml submitted to Google Search Console

---

*End of TowerGreens PRD v3.0*
*2026 © TowerGreens — Lahore, Pakistan*
*Prepared for Antigravity IDE*