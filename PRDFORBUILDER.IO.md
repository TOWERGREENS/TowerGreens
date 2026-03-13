================================================================================
TOWERGREENS — PRODUCT REQUIREMENTS DOCUMENT
Version 4.0 | Master Spec | Antigravity IDE Handoff | 2026
================================================================================

This document is the single source of truth for the TowerGreens platform.
Every screen, every logic branch, every animation, every API call, every
database field, every edge case is specified here. Nothing is left to
interpretation. Read every word before writing the first line of code.

================================================================================
PART 0: QUICK REFERENCE
================================================================================

Domain:           https://towergreens.site
App:              https://towergreens.site/app
Admin:            https://towergreens.site/admin
Rider:            https://towergreens.site/rider
Support Email:    support@towergreens.site
Info Email:       info@towergreens.site (used for outgoing OTP emails)
Admin Email:      admin@towergreens.site
Admin Password:   quick@43_21aB
YouTube:          https://youtube.com/@TowerGreens
Logo File:        logo.png (in project root — never replace, never regenerate)
Framework:        Vite + React (NOT Next.js)
Hosting:          Vercel Free Tier
Auth/DB:          insforge.dev
Payments:         JazzCash
App Conversion:   median.co → APK + iOS
Push:             Web Push API (VAPID keys) + median.co push bridge
Language:         Urdu (primary), English (secondary)
Urdu Direction:   ALWAYS direction: ltr; unicode-bidi: plaintext; — NO EXCEPTIONS

================================================================================
PART 1: DESIGN PHILOSOPHY
================================================================================

--------------------------------------------------------------------------------
1.1 THE CONCEPT — "NEON GREENHOUSE"
--------------------------------------------------------------------------------

TowerGreens grows vegetables at night, under electric LED grow lights, in
vertical hydroponic towers. The visual identity draws from this reality:
the luminous glow of grow lights cutting through near-darkness, the geometric
precision of stacked grow pods, the living green against industrial structure.

The design language is: DARK LUXURY ORGANIC.

Not a generic "clean health food green" aesthetic.
Not a traditional Pakistani vegetable shop.
Not a typical food delivery app.

Something new. Something striking. Something slightly otherworldly.

When a user opens TowerGreens for the first time, the reaction must be:
"This is not a vegetable shop. This is something else."

The reference: A high-end Japanese izakaya crossed with a Silicon Valley food
tech lab, built in Lahore. Unexpected. Memorable.

--------------------------------------------------------------------------------
1.2 THE TWO EXPERIENCES
--------------------------------------------------------------------------------

There are two visually distinct experiences on the same domain:

LANDING PAGE (towergreens.site)
  Mode:       EDITORIAL DARK — like a luxury product launch film
  Feel:       Cinematic. Theatrical. Each section is a magazine spread.
  Background: Deep near-black with luminous green glow from grow lights
  Typography: Large, dramatic, editorial — Urdu as art, not just language
  Motion:     Slow, cinematic — parallax, scroll-triggered reveals, video
  Purpose:    Seduce the visitor. Build desire. Build trust. Convert to signup.
  Metaphor:   The greenhouse at 2am — eerie, beautiful, alive
  SEO:        SSR rendered. Fully indexed. AI crawlers welcome.
  Has:        Global header, section-by-section scroll, footer

WEB APP (towergreens.site/app)
  Mode:       DARK FUNCTIONAL GLASS — premium food delivery app
  Feel:       Snappy, purposeful. Zomato meets Apple. Every pixel functional.
  Background: Deep dark with glassy surface cards
  Typography: Clean, readable, task-focused
  Motion:     Fast micro-interactions. No theatrical scroll effects.
  Purpose:    Get the user from desire → cart → checkout as fast as possible.
  Metaphor:   The cockpit of a very beautiful machine
  Auth:       Gated. Not indexed. SPA navigation.
  Has:        Sticky header, bottom navigation bar (5 tabs), NO footer

These two experiences must NEVER visually bleed into each other.
The landing page is a film. The app is a tool.

--------------------------------------------------------------------------------
1.3 COLOR TOKENS
--------------------------------------------------------------------------------

DARK THEME (default — this IS the TowerGreens brand identity):

  --bg-base:         #080E0A   (near-black with slight green tint)
  --bg-surface:      #0F1A12   (slightly lighter, used for cards and panels)
  --bg-card:         rgba(255, 255, 255, 0.04)  (glass card background)
  --glow-green:      #39FF14   (electric neon green — the grow light color)
  --accent-green:    #4ADE80   (primary interactive green)
  --accent-amber:    #F59E0B   (warm amber — secondary accent)
  --text-primary:    #F0F7F1   (warm off-white — main body text)
  --text-secondary:  #8BA896   (muted green-gray for secondary text)
  --text-disabled:   #3D5040   (very muted — disabled states)
  --border-green:    rgba(74, 222, 128, 0.12)  (default card border)
  --border-active:   rgba(74, 222, 128, 0.60)  (focused input border)
  --border-hover:    rgba(74, 222, 128, 0.25)  (hovered card border)
  --shadow-card:     0 4px 24px rgba(0, 0, 0, 0.4)
  --shadow-glow:     0 0 24px rgba(74, 222, 128, 0.5)
  --overlay-dark:    rgba(8, 14, 10, 0.92)     (header scroll background)
  --success:         #4ADE80
  --error:           #F87171
  --warning:         #F59E0B
  --info:            #60A5FA

LIGHT THEME (secondary — user can switch):

  --bg-base:         #F4F9F5
  --bg-surface:      #FFFFFF
  --bg-card:         #FFFFFF
  --accent-green:    #16A34A
  --accent-amber:    #D97706
  --text-primary:    #0A1F0E
  --text-secondary:  #4B6652
  --border-green:    rgba(20, 83, 45, 0.12)
  --border-active:   rgba(20, 83, 45, 0.60)
  --success:         #16A34A
  --error:           #DC2626
  --warning:         #D97706

ADMIN THEME (separate — command center):

  --admin-bg:        #0F1117   (cool dark gray, distinct from green app)
  --admin-surface:   #171B26
  --admin-card:      #1E2433
  --admin-accent:    #4ADE80   (same green, more restrained use)
  --admin-text:      #E2E8F0
  --admin-border:    rgba(255, 255, 255, 0.08)

RIDER THEME (light, outdoor readability):

  --rider-bg:        #F8FAF8
  --rider-surface:   #FFFFFF
  --rider-accent:    #16A34A
  --rider-text:      #0A1F0E

System default: detect OS dark/light preference. Apply dark if undetected.
User preference stored in localStorage key: "tg_theme"

--------------------------------------------------------------------------------
1.4 TYPOGRAPHY SYSTEM
--------------------------------------------------------------------------------

FONT FAMILIES (install all before writing any UI code):

  Display (English headings, hero):
    Font: "DM Serif Display"
    Source: Google Fonts
    Weights: 400, 400 italic
    Used for: Hero headlines, large section titles, editorial moments
    Why: Unexpected serif for a food tech brand. Creates premium editorial feel.

  Urdu Display (ALL Urdu text throughout entire platform):
    Font: "Noto Nastaliq Urdu"
    Source: Google Fonts (load full subset, not Latin only)
    Weight: 400, 700
    Critical Rule: EVERY element with Urdu text must have:
      direction: ltr;
      unicode-bidi: plaintext;
      text-align: left;
    This is a NON-NEGOTIABLE design rule. No exceptions anywhere.
    Size: Visually scale up 15% vs English equivalent (Nastaliq reads smaller)

  Body / UI (everything else):
    Font: "Satoshi" (Variable font)
    Source: Fontshare.com or self-hosted
    Fallback: "DM Sans", system-ui, sans-serif
    Weights: 300, 400, 500, 600, 700, 900
    Used for: All UI labels, body text, buttons, inputs

  Monospace (numbers, codes, prices):
    Font: "JetBrains Mono"
    Source: Google Fonts or JetBrains CDN
    Weights: 400, 700
    Used for: OTP input boxes, order IDs, prices, countdown timers

FONT LOADING STRATEGY:
  - Add font-display: swap to all @font-face declarations
  - Preload the Satoshi woff2 file in HTML head
  - Preload Noto Nastaliq Urdu woff2 in HTML head
  - Use link rel="preconnect" to fonts.googleapis.com and fonts.gstatic.com

TYPE SCALE:

  Name          Desktop    Mobile    Weight         Font               Usage
  ──────────────────────────────────────────────────────────────────────────
  hero-xl       80px       48px      400            DM Serif/Nastaliq  Hero headline
  hero-lg       56px       36px      400            DM Serif/Nastaliq  Section headline
  heading-xl    40px       28px      700            Satoshi            Page titles
  heading-lg    28px       22px      700            Satoshi            Card titles
  heading-md    22px       18px      600            Satoshi            Sub-sections
  body-lg       18px       16px      400            Satoshi            Primary body
  body-md       16px       14px      400            Satoshi            Secondary body
  body-sm       14px       12px      400            Satoshi            Labels, captions
  label         12px       11px      600            Satoshi (uppercase) Tags, pills
  mono-lg       24px       20px      700            JetBrains Mono     OTP digits
  mono-md       16px       16px      400            JetBrains Mono     Order IDs, prices
  mono-sm       14px       14px      400            JetBrains Mono     Small numbers

URDU CSS RULES — APPLY TO EVERY SINGLE URDU ELEMENT:

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
    line-height: 2.0;
  }
  .urdu-heading {
    font-size: clamp(22px, 3vw, 40px);
    line-height: 2.0;
  }
  .urdu-body {
    font-size: clamp(15px, 1.5vw, 18px);
    line-height: 2.4;
  }
  .urdu-label {
    font-size: clamp(12px, 1.2vw, 14px);
    line-height: 2.0;
  }

--------------------------------------------------------------------------------
1.5 COMPONENT DESIGN TOKENS — CSS
--------------------------------------------------------------------------------

GLASSMORPHISM CARD (App — Dark Mode):

  .glass-card {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(74, 222, 128, 0.10);
    border-radius: 16px;
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

GLASS CARD HOVER STATE:

  .glass-card:hover {
    border-color: rgba(74, 222, 128, 0.25);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(74, 222, 128, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

PRIMARY BUTTON (Neon Glow CTA):

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
    box-shadow: 0 4px 16px rgba(74, 222, 128, 0.30);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow:
      0 0 24px rgba(74, 222, 128, 0.50),
      0 8px 32px rgba(74, 222, 128, 0.25);
  }
  .btn-primary:active {
    transform: translateY(0) scale(0.97);
    transition-duration: 0.1s;
  }
  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  .btn-primary.loading {
    /* Replace text with spinner */
    color: transparent;
    position: relative;
  }
  .btn-primary.loading::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    top: 50%;
    left: 50%;
    margin: -9px 0 0 -9px;
    border: 2px solid rgba(8, 14, 10, 0.3);
    border-top-color: #080E0A;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

GHOST BUTTON (Secondary):

  .btn-ghost {
    background: transparent;
    color: #4ADE80;
    border: 1px solid rgba(74, 222, 128, 0.40);
    border-radius: 9999px;
    padding: 13px 32px;
    font-family: 'Satoshi', sans-serif;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .btn-ghost:hover {
    background: rgba(74, 222, 128, 0.08);
    border-color: rgba(74, 222, 128, 0.80);
    box-shadow: 0 0 16px rgba(74, 222, 128, 0.15);
  }
  .btn-ghost:active {
    transform: scale(0.97);
  }

DANGER BUTTON (Delete, Reject):

  .btn-danger {
    background: rgba(248, 113, 113, 0.1);
    color: #F87171;
    border: 1px solid rgba(248, 113, 113, 0.30);
    border-radius: 9999px;
    padding: 12px 28px;
    font-family: 'Satoshi', sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .btn-danger:hover {
    background: rgba(248, 113, 113, 0.20);
    border-color: rgba(248, 113, 113, 0.70);
  }

TEXT BUTTON (Inline, no border):

  .btn-text {
    background: transparent;
    color: #4ADE80;
    border: none;
    padding: 8px 0;
    font-family: 'Satoshi', sans-serif;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

INPUT FIELDS:

  .input-field {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(74, 222, 128, 0.15);
    border-radius: 12px;
    color: #F0F7F1;
    font-family: 'Satoshi', sans-serif;
    font-size: 16px;
    padding: 14px 16px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    outline: none;
    caret-color: #4ADE80;
  }
  .input-field::placeholder {
    color: #3D5040;
  }
  .input-field:focus {
    border-color: rgba(74, 222, 128, 0.60);
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.10);
  }
  .input-field.error {
    border-color: rgba(248, 113, 113, 0.60);
    box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.10);
  }
  .input-field:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

INPUT LABEL (always above field):

  .input-label {
    display: block;
    font-family: 'Satoshi', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #8BA896;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

INPUT ERROR MESSAGE (below field):

  .input-error {
    font-family: 'Satoshi', sans-serif;
    font-size: 12px;
    color: #F87171;
    margin-top: 5px;
  }

PRODUCT CARD (App):

  .product-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(74, 222, 128, 0.08);
    border-radius: 16px;
    overflow: hidden;
    transition:
      transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      border-color 0.3s ease,
      box-shadow 0.3s ease;
    cursor: pointer;
  }
  .product-card:hover {
    transform: translateY(-6px);
    border-color: rgba(74, 222, 128, 0.25);
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(74, 222, 128, 0.10);
  }
  .product-card:active {
    transform: translateY(-2px) scale(0.98);
    transition-duration: 0.15s;
  }
  .product-card__image {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  .product-card:hover .product-card__image {
    transform: scale(1.05);
  }
  .product-card__body {
    padding: 12px;
  }

BOTTOM NAVIGATION BAR (App Mobile — Fixed):

  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: calc(64px + env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);
    background: rgba(8, 14, 10, 0.90);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-top: 1px solid rgba(74, 222, 128, 0.10);
    display: flex;
    align-items: center;
    justify-content: space-around;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .bottom-nav.hidden {
    transform: translateY(100%);
  }
  .bottom-nav__tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    background: transparent;
    -webkit-tap-highlight-color: transparent;
  }
  .bottom-nav__icon {
    width: 24px;
    height: 24px;
    color: #3D5040;
    transition: color 0.2s, filter 0.2s, transform 0.2s;
  }
  .bottom-nav__label {
    font-family: 'Noto Nastaliq Urdu', serif;
    font-size: 10px;
    color: #3D5040;
    direction: ltr;
    unicode-bidi: plaintext;
  }
  .bottom-nav__tab.active .bottom-nav__icon {
    color: #4ADE80;
    filter: drop-shadow(0 0 6px rgba(74, 222, 128, 0.60));
    transform: scale(1.2);
  }
  .bottom-nav__tab.active .bottom-nav__label {
    color: #4ADE80;
  }
  .bottom-nav__tab.active::before {
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #4ADE80;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 6px rgba(74, 222, 128, 0.8);
  }

Bottom nav auto-hide behavior:
  Track scroll direction with a listener: if scrolling DOWN → add class .hidden
  If scrolling UP or at top → remove class .hidden
  Threshold: direction change must be more than 8px before triggering

Bottom nav tabs (in order):
  Tab 1: Home icon + "ہوم"
  Tab 2: Grid icon + "پروڈکٹس"
  Tab 3: Shopping cart icon + "کارٹ" (with badge for item count)
  Tab 4: Bell icon + "نوٹیفیکیشنز" (with badge for unread count)
  Tab 5: User icon + "پروفائل"

Cart badge: small green circle, white number, positioned top-right of icon
Notification badge: small red circle, white number, positioned top-right of icon
Badge disappears when count = 0

SKELETON LOADER:

  .skeleton {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04) 25%,
      rgba(74, 222, 128, 0.08) 50%,
      rgba(255, 255, 255, 0.04) 75%
    );
    background-size: 200% 100%;
    animation: skeleton-wave 1.6s ease-in-out infinite;
    border-radius: 8px;
  }
  @keyframes skeleton-wave {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

TOAST NOTIFICATION:

  .toast {
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%) translateY(-80px);
    z-index: 9999;
    background: rgba(15, 26, 18, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(74, 222, 128, 0.30);
    border-radius: 9999px;
    padding: 12px 24px;
    font-family: 'Satoshi', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #F0F7F1;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                opacity 0.3s ease;
    opacity: 0;
  }
  .toast.visible {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  .toast.exit {
    transform: translateX(-50%) translateY(-80px);
    opacity: 0;
    transition-timing-function: ease-in;
    transition-duration: 0.3s;
  }
  .toast.success { border-color: rgba(74, 222, 128, 0.50); }
  .toast.error   { border-color: rgba(248, 113, 113, 0.50); }
  .toast.warning { border-color: rgba(245, 158, 11, 0.50); }

Toast auto-dismiss: 3000ms after appearing. Then play exit animation.
Toast queue: If multiple toasts, queue them (show next after current exits).

PILL / TAG:

  .pill {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 9999px;
    font-family: 'Satoshi', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.03em;
    white-space: nowrap;
  }
  .pill-green {
    background: rgba(74, 222, 128, 0.12);
    color: #4ADE80;
    border: 1px solid rgba(74, 222, 128, 0.25);
  }
  .pill-amber {
    background: rgba(245, 158, 11, 0.12);
    color: #F59E0B;
    border: 1px solid rgba(245, 158, 11, 0.25);
  }
  .pill-red {
    background: rgba(248, 113, 113, 0.12);
    color: #F87171;
    border: 1px solid rgba(248, 113, 113, 0.25);
  }
  .pill-blue {
    background: rgba(96, 165, 250, 0.12);
    color: #60A5FA;
    border: 1px solid rgba(96, 165, 250, 0.25);
  }

DIVIDER:

  .divider {
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(74, 222, 128, 0.20),
      transparent
    );
    margin: 24px 0;
  }

ACCORDION:

  .accordion__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    cursor: pointer;
    border-bottom: 1px solid rgba(74, 222, 128, 0.10);
    font-family: 'Satoshi', sans-serif;
    font-weight: 600;
    font-size: 15px;
    color: #F0F7F1;
    user-select: none;
  }
  .accordion__chevron {
    transition: transform 0.3s ease;
  }
  .accordion__header.open .accordion__chevron {
    transform: rotate(180deg);
  }
  .accordion__body {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease;
  }
  .accordion__body.open {
    max-height: 1000px;
  }

MODAL / DIALOG:

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.70);
    backdrop-filter: blur(8px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    animation: fadeIn 0.25s ease;
  }
  .modal-box {
    background: #0F1A12;
    border: 1px solid rgba(74, 222, 128, 0.20);
    border-radius: 20px;
    padding: 32px;
    width: 100%;
    max-width: 480px;
    animation: modalSlideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes modalSlideUp {
    from { opacity: 0; transform: scale(0.95) translateY(16px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }

BOTTOM SHEET (Mobile modals):

  .bottom-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #0F1A12;
    border: 1px solid rgba(74, 222, 128, 0.15);
    border-radius: 20px 20px 0 0;
    padding: 16px 20px 32px;
    z-index: 300;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUpSheet 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .bottom-sheet__handle {
    width: 40px;
    height: 4px;
    background: rgba(255, 255, 255, 0.20);
    border-radius: 9999px;
    margin: 0 auto 16px;
  }
  @keyframes slideUpSheet {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
  }

OTP INPUT BOXES:

  .otp-container {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }
  .otp-input {
    width: 48px;
    height: 56px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(74, 222, 128, 0.20);
    border-radius: 12px;
    color: #F0F7F1;
    font-family: 'JetBrains Mono', monospace;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    caret-color: #4ADE80;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .otp-input:focus {
    border-color: rgba(74, 222, 128, 0.70);
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.15);
  }
  .otp-input.filled {
    border-color: rgba(74, 222, 128, 0.50);
    background: rgba(74, 222, 128, 0.06);
  }
  .otp-input.error {
    border-color: rgba(248, 113, 113, 0.70);
    animation: shake 0.5s ease;
  }
  /* Separator dash between 4th and 5th box: */
  .otp-separator {
    color: #3D5040;
    font-size: 20px;
    font-family: 'JetBrains Mono', monospace;
  }

OTP input behavior:
  - 8 boxes total (4 + dash + 4 visual grouping, but one contiguous input string)
  - On digit entry: fill box, auto-advance to next box (80ms delay for micro-animation)
  - On backspace: clear current box, move to previous
  - On paste: distribute digits across boxes starting from current position
  - Only allow numeric input (0-9), reject all other characters
  - Each box has a subtle bounce animation (scale 1.0→1.15→1.0, 80ms) on fill

PROGRESS BAR:

  .progress-bar {
    height: 6px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 9999px;
    overflow: hidden;
  }
  .progress-bar__fill {
    height: 100%;
    background: linear-gradient(90deg, #4ADE80, #39FF14);
    border-radius: 9999px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 8px rgba(74, 222, 128, 0.50);
  }

STEP INDICATOR (Checkout, multi-step):

  .step-indicator {
    display: flex;
    align-items: center;
    gap: 0;
  }
  .step-indicator__step {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .step-indicator__dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    font-family: 'Satoshi', sans-serif;
    transition: all 0.3s ease;
  }
  .step-indicator__dot.done {
    background: #4ADE80;
    color: #080E0A;
  }
  .step-indicator__dot.active {
    background: rgba(74, 222, 128, 0.20);
    border: 2px solid #4ADE80;
    color: #4ADE80;
    box-shadow: 0 0 12px rgba(74, 222, 128, 0.30);
  }
  .step-indicator__dot.future {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #3D5040;
  }
  .step-indicator__line {
    flex: 1;
    height: 2px;
    background: rgba(255, 255, 255, 0.08);
    transition: background 0.3s ease;
  }
  .step-indicator__line.done {
    background: #4ADE80;
  }

--------------------------------------------------------------------------------
1.6 ANIMATION MASTER REFERENCE
--------------------------------------------------------------------------------

PAGE TRANSITIONS (App SPA — React Router):

  Forward navigation (new page):
    New page enters from right: translateX(100%) → translateX(0)
    Duration: 300ms
    Easing: ease

  Backward navigation (back button):
    New page enters from left: translateX(-100%) → translateX(0)
    Duration: 300ms
    Easing: ease

  Modal open:
    opacity: 0 → 1, scale: 0.95 → 1
    Duration: 250ms
    Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (spring)

  Bottom sheet open:
    translateY: 100% → 0
    Duration: 350ms
    Easing: cubic-bezier(0.34, 1.56, 0.64, 1)

  Page close (before next page enters):
    opacity: 1 → 0
    Duration: 150ms

SCROLL ANIMATIONS (Landing Page only):

  IntersectionObserver threshold: 0.25 (trigger when 25% visible)
  rootMargin: "0px 0px -50px 0px" (slight early trigger)

  Fade up (most common):
    opacity: 0 → 1, translateY: 30px → 0
    Duration: 600ms
    Easing: cubic-bezier(0.16, 1, 0.3, 1)

  Slide in from left:
    opacity: 0 → 1, translateX: -40px → 0
    Duration: 700ms
    Easing: cubic-bezier(0.16, 1, 0.3, 1)

  Slide in from right:
    opacity: 0 → 1, translateX: 40px → 0
    Duration: 700ms
    Easing: cubic-bezier(0.16, 1, 0.3, 1)

  Scale in:
    opacity: 0 → 1, scale: 0.95 → 1
    Duration: 600ms
    Easing: cubic-bezier(0.16, 1, 0.3, 1)

  Stagger children:
    Each child has a 60-100ms delay offset from previous

MICRO-INTERACTIONS:

  Element         | Interaction    | Animation                               | Duration
  ────────────────────────────────────────────────────────────────────────────────
  Button tap      | Press          | scale(0.95)→scale(1.02)→scale(1)        | 300ms
  Card tap        | Press          | scale(0.98)→scale(1)                    | 250ms ease-out
  Cart add        | Confirm        | btn bounce, cart count spring +1         | 300ms
  Cart delete     | Remove         | height→0 + opacity→0                    | 300ms ease-in
  Item shuffle    | After delete   | items above reflow smoothly             | 350ms ease
  Nav tab         | Activate       | icon scale(1.2)→1.0 + dot appears       | 200ms spring
  Input focus     | Focus          | border glow expand, ring appear         | 200ms ease
  Input error     | Shake          | -6px,+6px,-4px,+4px,-2px,+2px,0        | 500ms
  Toggle          | Switch         | translateX spring (k=400, d=30)         | spring
  OTP digit       | Entry+advance  | box bounce + auto-focus next            | 80ms
  Coin earn       | Reward         | number counts up + sparkle particles    | 1500ms
  Error state     | Shake          | horizontal keyframe oscillation         | 500ms
  Image load      | Reveal         | blur(8px)→blur(0) + opacity 0→1        | 400ms ease
  Accordion       | Open/Close     | max-height animate + chevron rotate 180°| 300ms ease
  Banner rotate   | Auto-rotate    | opacity crossfade                       | 300ms ease
  Search expand   | Expand         | width animate from 40px to 100%        | 300ms spring
  Badge increment | Count up       | scale(1.3)→1.0 (spring)                | 200ms
  Scroll to top   | Scroll         | smooth-behavior CSS                     | browser
  Star rating     | Fill           | fill animation left→right              | 500ms stagger
  Number count-up | Count          | requestAnimationFrame, ease-out         | 1500ms
  Swipe card      | Swipe L/R      | translateX + opacity fade              | 200ms + snap
  Pull refresh    | Pull down      | elastic overscroll, spinner appears     | native feel

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  30%       { transform: scale(0.90); }
  60%       { transform: scale(1.15); }
  80%       { transform: scale(0.97); }
}

@keyframes shake {
  0%   { transform: translateX(0); }
  15%  { transform: translateX(-6px); }
  30%  { transform: translateX(6px); }
  45%  { transform: translateX(-4px); }
  60%  { transform: translateX(4px); }
  75%  { transform: translateX(-2px); }
  90%  { transform: translateX(2px); }
  100% { transform: translateX(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes pulseShadow {
  0%, 100% { box-shadow: 0 0 12px rgba(74, 222, 128, 0.30); }
  50%       { box-shadow: 0 0 24px rgba(74, 222, 128, 0.60); }
}

@keyframes confetti-fall {
  0%   { transform: translateY(-100px) rotate(0deg);   opacity: 1; }
  100% { transform: translateY(100vh)  rotate(720deg); opacity: 0; }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 1.0; transform: scale(1.08); }
}

================================================================================
PART 2: LANDING PAGE — CINEMATIC EXPERIENCE
================================================================================

The landing page is SSR-rendered by Vite SSR. Every section is a scroll-based
cinematic experience. It has a persistent global header and a full footer.
The app and rider/admin panels do NOT share any of this layout.

All animations on the landing page use IntersectionObserver for scroll triggers.
Hero section animations play on page load without scroll trigger.

--------------------------------------------------------------------------------
2.1 GLOBAL HEADER (Landing Page)
--------------------------------------------------------------------------------

HTML structure:
  <header class="landing-header">
    <div class="header-logo">
      <img src="/logo.png" alt="TowerGreens" height="36" />
    </div>
    <nav class="header-nav">
      <a href="/about">ہم کون ہیں</a>
      <a href="/how-it-works">یہ کیسے کام کرتا ہے</a>
      <a href="/products">پروڈکٹس</a>
      <a href="/blog">بلاگ</a>
      <a href="/contact">رابطہ</a>
    </nav>
    <div class="header-actions">
      <button class="lang-toggle">اردو | EN</button>
      <a href="/app/signup" class="btn-primary header-cta">ابھی آرڈر کریں</a>
    </div>
    <button class="hamburger" aria-label="Menu">☰</button>
  </header>

Scroll behavior:
  - Initial state: background transparent, text white, no blur
  - After scrolling 80px down: apply background rgba(8,14,10,0.92) + backdrop-filter blur(20px)
  - Transition: 400ms ease on background-color and backdrop-filter
  - Logo and nav links stay white in both states
  - CTA button stays the same green

Mobile hamburger (< 768px):
  - Hamburger icon appears, desktop nav links disappear
  - On tap: full-screen overlay slides down from top
  - Overlay: 100vw × 100vh, background #080E0A, all nav links in large Nastaliq
  - Close button top-right × icon
  - Overlay open animation: translateY(-100%) → translateY(0), 350ms ease
  - Each link staggers in: 60ms delay per item, fadeUp

Language toggle behavior:
  - Shows current language
  - On click: switch displayed language label, store in localStorage key "tg_lang"
  - SSR renders Urdu by default; hydration respects stored preference
  - Toggle text: "اردو | EN" (click switches to "EN | اردو" style visually)

--------------------------------------------------------------------------------
2.2 LANDING SECTION 1: HERO — "The Greenhouse at 2am"
--------------------------------------------------------------------------------

Layout: 100vw × 100vh, fixed to viewport height. No overflow.

Background:
  Primary: Autoplay looping video (muted, playsinline, no controls, loop)
  Video subject: Hydroponic tower in near-darkness, LED grow lights glowing
    neon green/purple, water droplets on vines, slow zoom
  Video size: object-fit cover, fills 100vw × 100vh
  Video fallback (if loading slow or no autoplay): Three.js canvas
    Scene: vertical tower wireframe with floating green particle dots
    and simulated grow-light glow from above
    Particles drift slowly upward, fade at top
  Preload attribute: metadata (not full video — mobile data consideration)

Overlay layers (applied in order on top of video):
  Layer 1: SVG noise texture (3% opacity) — adds film grain aesthetic
  Layer 2: Radial gradient — center transparent, edges rgba(8,14,10,0.55)
  Layer 3: Bottom vignette — transparent at 80% height → rgba(8,14,10,1) at 100%

Content (position: absolute, centered, z-index above overlays, max-width 900px):

  Badge (pre-heading):
    Style: glass pill, neon green border rgba(74,222,128,0.4), padding 6px 16px
    Text (Urdu Nastaliq, 14px): لاہور کا پہلا ہائیڈروپونک فارم 🌱
    Background: rgba(255,255,255,0.06)

  Main Headline (3 lines, Urdu Nastaliq, hero-xl size):
    Line 1: صاف ستھری سبزیاں
    Line 2: سیدھا آپ کے
    Line 3: دروازے تک
    Color: #F0F7F1 (bright white)
    Text shadow: 0 2px 20px rgba(0,0,0,0.5)

  Subheadline (Urdu Nastaliq, body-lg):
    ہائیڈروپونک ٹاورز میں اُگائی گئی — مٹی کے بغیر، کیمیکل کے بغیر
    Color: rgba(240, 247, 241, 0.75)

  CTA Row (horizontal flex, gap 12px):
    Button 1: btn-primary — "ابھی آرڈر کریں" → href="/app/signup"
    Button 2: btn-ghost  — "یہ کیسے کام کرتا ہے؟" → href="/how-it-works" (smooth scroll to section 5)

  Trust badges row (horizontal flex, gap 20px):
    ✓ مٹی کے بغیر   ✓ 100% صاف   ✓ لاہور میں ڈیلیوری
    Style: Nastaliq 13px, color rgba(240,247,241,0.65), checkmark in #4ADE80

Scroll Indicator:
  Position: absolute bottom-24px, left 50%, transform translateX(-50%)
  Content: Down chevron SVG, color rgba(255,255,255,0.5)
  Animation: bounce 2s ease-in-out infinite (translateY 0→8px→0)
  Disappears on scroll past 50px: opacity 1 → 0, transition 300ms

ENTRANCE ANIMATION CHOREOGRAPHY (plays on page load, no scroll required):

  t=0ms    Video starts playing (background)
  t=200ms  Noise overlay: opacity 0→0.03, duration 600ms ease
  t=400ms  Badge: translateY(20px)→0 + opacity 0→1, duration 500ms ease-out
  t=700ms  Headline line 1: translateY(30px)→0 + opacity 0→1, 700ms cubic-bezier(0.16,1,0.3,1)
  t=900ms  Headline line 2: same animation, 700ms
  t=1100ms Headline line 3: same animation, 700ms
  t=1400ms Subheadline: opacity 0→1 + translateY(20px)→0, 600ms ease
  t=1700ms CTA button 1: translateY(20px)→0 + opacity 0→1, 500ms ease-out
  t=1850ms CTA button 2: translateY(20px)→0 + opacity 0→1, 500ms ease-out (150ms stagger)
  t=2100ms Trust badge 1: opacity 0→1, 400ms ease
  t=2200ms Trust badge 2: opacity 0→1, 400ms ease
  t=2300ms Trust badge 3: opacity 0→1, 400ms ease
  t=2500ms Scroll indicator: opacity 0→1 + bounce animation starts

All elements start at opacity:0, visibility:hidden in CSS.
JavaScript adds .animated class after the scheduled delay.

--------------------------------------------------------------------------------
2.3 LANDING SECTION 2: NUMBERS / STATS
--------------------------------------------------------------------------------

Background: Diagonal gradient from #080E0A to #0A1A0E (dark green)
  background: linear-gradient(135deg, #080E0A 0%, #0A1A0E 100%)

Section padding: 80px 0 (desktop), 60px 0 (mobile)

Headline area:
  Pre-label (amber, Satoshi, small uppercase): WHY TOWERGREENS
  Heading (Nastaliq, heading-xl): ہماری کامیابی کے نمبر

4 Stats (4-column desktop grid, 2×2 mobile grid):

  Card 1: 100% — کیمیکل فری
  Card 2: 0   — مٹی نہیں استعمال ہوتی
  Card 3: 24/7 — تازہ سبزیاں ہر وقت
  Card 4: ★4.9 — گاہکوں کی ریٹنگ

Each stat card:
  Background: glass-card style
  Stat number: JetBrains Mono, 48px desktop / 36px mobile, color #4ADE80
    Glow: text-shadow 0 0 20px rgba(74,222,128,0.5)
  Stat label: Nastaliq, 16px, color rgba(240,247,241,0.75)
  Hover: neon green border rgba(74,222,128,0.40), subtle scale(1.02)

Count-up animation:
  Trigger: IntersectionObserver when card enters viewport
  For numeric stats: animate from 0 to final value
  For "100%": animate from 0% to 100%
  For "★4.9": animate from ★0 to ★4.9 (1 decimal)
  For "24/7": no count-up, just fade in
  Duration: 1500ms, easing: ease-out (quadratic)
  Implementation: requestAnimationFrame loop with easing function

Entrance: each card stagger 100ms apart, fadeUp animation

--------------------------------------------------------------------------------
2.4 LANDING SECTION 3: THE STORY — What Is Hydroponics?
--------------------------------------------------------------------------------

Background: Pure #080E0A (full black)
Section padding: 100px 0 (desktop), 60px 0 (mobile)
Layout: Two-column split (desktop: 55% left / 45% right), stacked (mobile)

LEFT SIDE (text column):
  Pre-label (amber pill, Satoshi 12px uppercase): ہم کیا کرتے ہیں؟
  Headline (Nastaliq, hero-lg):
    روایتی دکانوں سے
    ہٹ کر، کچھ نیا
  Body paragraph 1 (Nastaliq, body-md):
    روایتی سبزی منڈیوں میں سبزیاں مٹی، کیمیکل کھاد، اور کئی ہاتھوں سے گزر کر
    آپ کے دستر خوان پر پہنچتی ہیں۔ TowerGreens نے یہ سب بدل دیا۔
  Body paragraph 2 (Nastaliq, body-md):
    ہمارے ہائیڈروپونک ٹاورز میں سبزیاں پانی اور روشنی سے اُگتی ہیں —
    مٹی نہیں، کیمیکل نہیں، فکر نہیں۔
  Bullet list (3 items, each with #4ADE80 dot):
    • زیادہ غذائیت — مٹی کے بغیر اُگائی گئی سبزیاں زیادہ وٹامن رکھتی ہیں
    • 100% صاف    — کوئی کیمیکل، کوئی کیڑے مار دوا نہیں
    • ہمیشہ تازہ  — فارم سے سیدھا آپ تک، وہی دن

  CTA: btn-ghost "مزید جانیں" → href="/how-it-works"

RIGHT SIDE (visual column):
  Image: tall full-width photo of hydroponic tower with LED grow lights
  border-radius: 16px
  Inset box-shadow on edges: inset 0 0 60px rgba(74,222,128,0.10) — glow effect
  3 floating annotation bubbles positioned absolutely:
    Bubble "روشنی" — top-right area
    Bubble "پانی"  — middle-left area
    Bubble "سبزی"  — bottom-right area
  Each bubble:
    Glass style pill, Nastaliq 14px
    Animation: scale 1.0→1.03→1.0, 3s ease-in-out infinite (stagger 1s between each)
    dotted connecting line from bubble to relevant tower area (SVG absolutely positioned)

SCROLL ANIMATION:
  Left side: translateX(-40px)→0 + opacity 0→1, 700ms cubic-bezier(0.16,1,0.3,1)
  Paragraphs: stagger 100ms after parent
  Right side: scale(0.95)→1.0 + opacity 0→1, 700ms ease
  IntersectionObserver threshold: 0.30

--------------------------------------------------------------------------------
2.5 LANDING SECTION 4: PRODUCTS SHOWCASE
--------------------------------------------------------------------------------

Background: linear-gradient(180deg, #0A1A0E 0%, #080E0A 100%)
Section padding: 100px 0 (desktop), 60px 0 (mobile)

Header area:
  Urdu title (Nastaliq, hero-lg): ہمارے پروڈکٹس
  Sub (Nastaliq, body-lg, muted): تازہ، صاف، آپ کے لیے

CATEGORY FILTER PILLS (horizontal scroll strip):
  Container: overflow-x auto, scrollbar hidden, gap 8px
  Pills list: [تمام] [سبزیاں] [سلاد] [صحت مند کھانا] [چائنیز اسٹائل] [سپر ہیلتھی]
  Default active: تمام

  Inactive pill CSS:
    background: rgba(255,255,255,0.05)
    border: 1px solid rgba(74,222,128,0.15)
    color: #8BA896
    border-radius: 9999px
    padding: 8px 18px
    Nastaliq 14px
    cursor: pointer
    transition: all 0.2s ease

  Active pill CSS:
    background: linear-gradient(135deg, #4ADE80, #16A34A)
    border: none
    color: #080E0A
    font-weight: 700

  On pill click:
    1. Add .active class to clicked pill, remove from others
    2. Filter product grid: cards not matching category do opacity 0 + scale(0.95), then display:none
    3. Matching cards do opacity 1 + scale(1.0), 300ms ease
    4. Grid re-layouts smoothly (use CSS grid, let browser handle reflow)
    5. If "تمام" selected → show all cards

PRODUCT GRID:
  Layout: CSS grid, 3-col desktop / 2-col tablet (>768px) / 2-col mobile
  Gap: 20px desktop, 12px mobile

  Entrance animation: IntersectionObserver on grid
    Each card: translateY(40px)→0 + opacity 0→1
    Stagger: 80ms per card

Each product card (landing version):
  border-radius: 16px
  overflow: hidden
  glass-card background
  cursor: pointer
  Link wraps card → /app/product/[id] (opens app, prompts login if not authed)

  Image (4:3 aspect ratio):
    width: 100%
    object-fit: cover
    transition: transform 0.5s ease

  Thin neon green divider: 1px, rgba(74,222,128,0.15), full width

  Body padding: 14px
    Category pill (amber): e.g. "سبزیاں"
    Product name (Nastaliq, 18px): e.g. "ہری پالک"
    Price row:
      Left: "Rs 450" (JetBrains Mono, 18px, color #4ADE80)
      Right: "🔥 280 kcal" (Satoshi 12px, amber)
    Add to cart button: btn-primary full width, "کارٹ میں شامل کریں"
      On click on landing page: redirect to /app/signup?redirect=/app/cart

  Hover state:
    Card: translateY(-6px), border-color rgba(74,222,128,0.25)
    Image: scale(1.05)

"تمام پروڈکٹس دیکھیں" button:
  Center below grid
  btn-ghost style
  → href="/app/products"
  Margin top: 40px

--------------------------------------------------------------------------------
2.6 LANDING SECTION 5: HOW IT WORKS
--------------------------------------------------------------------------------

Background: #080E0A with single diagonal decorative line
  (SVG line element, 1px, rgba(74,222,128,0.10), crossing diagonally left-bottom to right-top)
Section padding: 100px 0

Header:
  Amber pre-label (Satoshi, uppercase, small): HOW IT WORKS
  Title (Nastaliq, hero-lg): یہ کیسے کام کرتا ہے؟
  Sub (Nastaliq, body-md, muted): تین آسان قدم

STEP STEPPER:

  Desktop (horizontal): 3 steps connected by animated line
  Mobile (vertical): 3 steps stacked with vertical connecting line

  Step 1 — آرڈر کریں:
    Badge: "01" in neon green circle
    Lottie animation: shopping bag with green checkmark
    Fallback: CSS animated cart icon (items bouncing in)
    Heading (Nastaliq): آرڈر کریں
    Body (Nastaliq): ہماری ویب سائٹ یا ایپ سے اپنی پسند کی سبزیاں چنیں

  Step 2 — ہم تیار کریں:
    Badge: "02"
    Lottie animation: hands harvesting from tower
    Heading (Nastaliq): ہم تیار کریں
    Body (Nastaliq): آپ کا آرڈر ملتے ہی ہم تازہ سبزیاں کاٹ کر پیک کرتے ہیں

  Step 3 — آپ تک پہنچائیں:
    Badge: "03"
    Lottie animation: delivery bike riding
    Heading (Nastaliq): آپ تک پہنچائیں
    Body (Nastaliq): ہمارا رائیڈر آپ کے دروازے تک پہنچا دیتا ہے

Connecting line (desktop, between badges):
  Initial: width 0, opacity 0.5
  On scroll enter: width animates 0→100% in 1200ms ease
  Color: rgba(74,222,128,0.30)
  Height: 2px, dashed style

Each badge animation:
  Trigger: after connecting line fully drawn
  scale(0)→scale(1), 400ms, cubic-bezier(0.34,1.56,0.64,1) (spring pop)
  Badge 1: t=0ms, Badge 2: t=400ms, Badge 3: t=800ms

Each step body text: fade up 300ms after its badge pops in

--------------------------------------------------------------------------------
2.7 LANDING SECTION 6: POPULAR DISHES — BENTO GRID
--------------------------------------------------------------------------------

Background: #060C08 (near pure black, slightly darker than base)
Section padding: 100px 0

Header:
  Amber pre-label: OUR DISHES
  Title (Nastaliq): مشہور ڈشز
  Sub (Nastaliq, muted): ہمارے ہائیڈروپونک سبزیوں سے تیار

BENTO GRID LAYOUT:

Desktop layout (CSS grid with named areas):
  ┌──────────────────────────────┬──────────────┬──────────────┐
  │     Card 1 (LARGE)           │   Card 2     │   Card 3     │
  │     2 rows tall              │              │              │
  │                              ├──────────────┴──────────────┤
  │                              │     Card 4 (WIDE, 2-col)    │
  ├──────────────┬───────────────┴──────────────┬──────────────┤
  │   Card 5     │     Card 6                   │   Card 7     │
  └──────────────┴──────────────────────────────┴──────────────┘
    Additional Row (mobile/tablet shows as normal grid):
  ┌──────────────────────────────────────────────────────────────┐
  │   Card 8 (optional — promotional wide banner)                │
  └──────────────────────────────────────────────────────────────┘

Mobile: 2-column regular grid, all cards equal size

Each card:
  Position: relative
  Overflow: hidden
  border-radius: 16px
  cursor: pointer

  Image:
    position: absolute inset-0
    width: 100% height: 100%
    object-fit: cover
    transition: transform 0.5s ease

  Bottom gradient overlay:
    position: absolute
    bottom: 0 left: 0 right: 0
    height: 65%
    background: linear-gradient(to top, rgba(8,14,10,0.92) 0%, transparent 100%)

  Overlay content (bottom of card):
    padding: 16px
    display: flex
    justify-content: space-between
    align-items: flex-end

    Dish name (Nastaliq, 16px-22px depending on card size):
      bottom-left
      color #F0F7F1

    Price (JetBrains Mono, 14px-18px, color #4ADE80):
      bottom-right

    Calorie info (Nastaliq, 12px, amber):
      Hidden by default
      On hover: slides UP into view (translateY 20px→0, opacity 0→1, 250ms)
      Shows: "280 kcal"

  Hover state:
    Image: scale(1.06)
    Border: 1px solid rgba(74,222,128,0.30) appears

  Card 1 SPECIAL (large card):
    On hover: image pauses scale, instead plays a short "making process" video clip
    Video: autoplay on hover enter, pause on hover leave
    This shows the dish being assembled in kitchen (5-8s clip, loop)
    Fallback: just scale image on hover

Entrance animation:
  Each card: fadeIn + translateY(30px→0)
  Stagger: 60ms per card
  Trigger: IntersectionObserver 0.20 threshold

--------------------------------------------------------------------------------
2.8 LANDING SECTION 7: TESTIMONIALS — MARQUEE
--------------------------------------------------------------------------------

Background: #0A1A0E (dark green)
Section padding: 80px 0

Header:
  Title (Nastaliq): گاہکوں کی رائے
  Sub (Nastaliq, muted): وہ کیا سوچتے ہیں؟

INFINITE MARQUEE:
  Two rows of cards scrolling at different speeds (or single row)
  Row 1: left→right, 40s per cycle
  Row 2: right→left, 35s per cycle (optional second row)

  CSS implementation:
    .marquee-track {
      display: flex;
      gap: 16px;
      animation: marqueeScroll 40s linear infinite;
      width: max-content;
    }
    @keyframes marqueeScroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    /* Duplicate cards for seamless loop */

  On hover of any card:
    animation-play-state: paused on entire track

Each testimonial card (glass-card style):
  Width: 280px (fixed)
  Padding: 20px
  flex-shrink: 0

  Star row: ★★★★★ in amber (#F59E0B), each star has subtle glow
  Quote (Nastaliq, body-md):
    e.g. "بہت تازہ اور صاف سبزیاں! گھر میں سب کو پسند آئیں۔"
  Avatar row:
    Avatar: 36px circle, user initial or photo
    Name (Satoshi, 13px, bold): e.g. "احمد خان"
    City (Satoshi, 12px, muted): لاہور

  Fade edges: Apply gradient masks on left and right edges of marquee container
    Left:  linear-gradient(to right, #0A1A0E, transparent)
    Right: linear-gradient(to left, #0A1A0E, transparent)
    Width: 80px each

Minimum 8 testimonials needed. Duplicate set for seamless loop.
Source testimonials from real customers or create representative placeholders.

--------------------------------------------------------------------------------
2.9 LANDING SECTION 8: TOWER SHOWCASE
--------------------------------------------------------------------------------

Background: #060C08 (nearly pure black — product launch feel)
Section padding: 120px 0

Layout: Centered single column with annotated hero visual

Visual:
  Large centered image or 3D render of the hydroponic tower
  Minimum rendered size: 500px wide on desktop
  Object-fit: contain (show full tower)
  Optional: subtle rotation animation (3D CSS transform, tiltX 0→3deg, 6s ease-in-out infinite alternating)

Floating annotation cards (glass style, positioned absolutely around tower image):
  "LED گرو لائٹس"      — top-right, dotted SVG line to top of tower
  "پانی کا نظام"       — left-center, dotted SVG line to water pump area
  "سبزی کی جگہ"        — right-center, dotted SVG line to grow pod
  "کوئی مٹی نہیں"     — bottom-left, dotted SVG line to base

Each annotation card:
  Style: glass-card, padding 10px 16px, border-radius 12px
  Text: Nastaliq, 13px
  Animation: each rotates in one-by-one on scroll enter
    Card 1: t=0ms opacity 0→1 + translateX(20px)→0, 300ms ease
    Card 2: t=300ms same
    Card 3: t=600ms same
    Card 4: t=900ms same
  After appearing: gentle float (translateY 0→-4px→0, 3s ease infinite, staggered)

Header (above visual):
  Pre-label (amber, Satoshi): OUR TECHNOLOGY
  Title (Nastaliq, hero-lg): ہائیڈروپونک ٹاور
  Sub (Nastaliq, body-md, muted): اندر سے دیکھیں

CTA below visual:
  btn-ghost "مزید جانیں" → href="/hydroponic-towers"

--------------------------------------------------------------------------------
2.10 LANDING SECTION 9: FINAL CTA
--------------------------------------------------------------------------------

Background:
  base: #080E0A
  radial glow: radial-gradient(ellipse 60% 40% at 50% 50%, rgba(74,222,128,0.12), transparent)
  This glow pulses: animation glowPulse 4s ease-in-out infinite

Section padding: 140px 0

Content (centered, max-width 700px):
  Large Urdu headline (Nastaliq, hero-xl, centered):
    آج ہی شامل ہوں
    TowerGreens فیملی میں
  Sub (Nastaliq, body-lg, muted, centered):
    لاہور کی سب سے صاف سبزیاں، ابھی آرڈر کریں
  CTA row (centered, gap 16px):
    btn-primary (large, padding 18px 48px): "ابھی آرڈر کریں" → /app/signup
    btn-ghost (large): "اکاؤنٹ بنائیں" → /app/signup

Trust strip (below CTAs, centered, gap 24px):
  "100% محفوظ"   "JazzCash ادائیگی"   "تیز ڈیلیوری"
  Each: 🔒/💳/⚡ icon + Nastaliq text, color muted

Entrance: headline lines stagger in, then CTAs, then trust strip
All use scroll IntersectionObserver trigger

--------------------------------------------------------------------------------
2.11 LANDING FOOTER
--------------------------------------------------------------------------------

Top border: animated gradient shimmer line
  height: 1px
  background: linear-gradient(90deg, transparent, #4ADE80, transparent)
  background-size: 200% 100%
  animation: shimmer 3s linear infinite
  @keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }

Footer padding: 80px 0 40px
Background: #060C08

4-column desktop grid (stacked on mobile):

  Column 1 — Brand:
    Logo: img src="/logo.png" height 40px
    Tagline (Nastaliq, 15px, muted): صاف ستھری سبزیاں، ہمیشہ تازہ
    Social row: YouTube icon → https://youtube.com/@TowerGreens
    Support email: support@towergreens.site (linked)

  Column 2 — Quick Links:
    Header (Satoshi, uppercase, 11px, muted): QUICK LINKS
    Links (Nastaliq, 15px, each on own row):
      ہم کون ہیں → /about
      ہائیڈروپونکس → /how-it-works
      بلاگ → /blog
      رابطہ → /contact
      سوالات → /faq

  Column 3 — Categories:
    Header: CATEGORIES
    Links:
      سبزیاں → /veggies
      سلاد → /salads
      صحت مند کھانا → /healthy-food
      چائنیز اسٹائل → /chinese-style
      سپر ہیلتھی → /super-healthy

  Column 4 — Contact & Legal:
    Header: CONTACT
    Email: support@towergreens.site
    Direct message: [ڈائریکٹ پیغام → /app/direct-message]
    YouTube: https://youtube.com/@TowerGreens

Footer bottom bar (separated by thin divider):
  Left: © 2026 TowerGreens
  Center: [شرائط و ضوابط] | [رازداری کی پالیسی]
  Right: [اردو] | [EN] (language switch)
  Text: Satoshi 12px, muted
  Note: NO location disclosed anywhere in footer.

Footer entrance animation:
  Each column fades and slides up (translateY 20px→0) as user scrolls to footer
  Stagger: 100ms per column

================================================================================
PART 3: WEB APP — SPA, ALL SCREENS COMPLETE
================================================================================

The web app is a single-page React application. It is NOT SSR rendered.
It lives at /app/* routes. It is NOT indexed by search engines.
It has NO footer. Navigation is handled by the bottom nav bar (5 tabs).
All screens are auth-gated except: /app/login, /app/signup, /app/forgot-password,
/app/reset-password, /app/language-select.

Auth state: checked on every /app/* route. If not authenticated → redirect to /app/login.
Auth state source: insforge.dev session (httpOnly cookie preferred).

--------------------------------------------------------------------------------
3.1 APP ENTRY — /app
--------------------------------------------------------------------------------

Logic:
  IF user is logged in → redirect to /app/home
  IF user is NOT logged in AND has never visited → redirect to /app/language-select
  IF user is NOT logged in AND has visited before → redirect to /app/login

"Has visited before" check: localStorage key "tg_visited" = "1"
Set this key on first visit to /app/language-select.

--------------------------------------------------------------------------------
3.2 LANGUAGE SELECTION SCREEN — /app/language-select
--------------------------------------------------------------------------------

Purpose: First-time visitor language preference selection
Layout: Full-screen, dark background #080E0A, centered content
No header, no bottom nav. Pure selection screen.

Content:
  TowerGreens logo (centered top, 60px height)
  Margin below logo: 48px

  Title (Nastaliq + Satoshi bilingual):
    "زبان منتخب کریں" (Nastaliq, 28px)
    "Select Language" (Satoshi, 16px, muted — below Urdu title)

  Two language cards (stacked vertically, max-width 360px):

    Card 1 — اردو (RECOMMENDED):
      Style: glass-card + neon green border rgba(74,222,128,0.40) + subtle green glow
      Badge: "تجویز کردہ" pill (amber) + "RECOMMENDED" (Satoshi, 10px, uppercase)
      Urdu flag emoji + text: اردو
      Sub: ہماری بنیادی زبان
      Size: slightly taller/bigger than Card 2

    Card 2 — English:
      Style: glass-card, neutral border
      Flag emoji + text: English
      Sub: Available in English too

  Selection behavior:
    On card tap:
      1. Add selected state: green border + checkmark appears in corner
      2. Scale card: 1.0→1.03 (spring), 200ms
      3. Other card: opacity drops to 0.6

  Below cards:
    btn-primary (full-width): "جاری رکھیں / Continue"
    Disabled until one card selected

  On continue:
    1. Save preference to localStorage key "tg_lang" (value: "ur" or "en")
    2. Set localStorage key "tg_visited" = "1"
    3. API call: PATCH /api/user/language { language: "ur" | "en" } (if logged in)
    4. Redirect to /app/login (if not logged in) or /app/home (if logged in)

Entrance animation:
  Logo: fadeIn, 300ms
  Title: fadeUp, 400ms, t=200ms
  Card 1: fadeUp, 400ms, t=400ms
  Card 2: fadeUp, 400ms, t=500ms
  Button: fadeUp, 300ms, t=600ms

--------------------------------------------------------------------------------
3.3 LOGIN SCREEN — /app/login
--------------------------------------------------------------------------------

Layout: Full-screen, dark bg, centered card, max-width 420px

No header. No bottom nav.
Logo at top-center (small, 40px height).

Card (glass-card style, padding 32px):

  Title (Satoshi 600, 22px): لاگ ان کریں / Log In
  Sub (Satoshi 400, 14px, muted): خوش آمدید واپس!

  Google OAuth button (full width):
    White/very light background
    Google "G" colored icon + text "Google سے لاگ ان کریں"
    On click: initiate insforge.dev Google OAuth flow
    Redirect back to /app/home on success

  Divider: "یا" centered between two horizontal lines

  Form fields:
    Field 1: ای میل
      Type: email
      Placeholder: آپ کا ای میل درج کریں
      Validation: required, valid email format

    Field 2: پاس ورڈ
      Type: password
      Placeholder: پاس ورڈ
      Right-side eye icon: toggles password visibility
      Validation: required, min 8 chars

  "پاس ورڈ بھول گئے؟" — text link, right-aligned below password field → /app/forgot-password

  Submit button: btn-primary, full-width, "لاگ ان کریں"
    Loading state: spinner inside button while API call in progress
    Disabled while loading

  Error handling:
    Wrong credentials: toast "غلط ای میل یا پاس ورڈ" (error toast)
    Empty fields: inline error messages below each field
    Network error: toast "انٹرنیٹ کنیکشن چیک کریں"
    Rate limit (5 failed attempts): "بہت زیادہ کوششیں — 15 منٹ بعد دوبارہ کوشش کریں"
      Show countdown timer if rate limited

  Bottom text (centered, Nastaliq):
    "اکاؤنٹ نہیں ہے؟" [سائن اپ کریں → /app/signup]

On successful login:
  Check user role:
    role === "admin" → redirect /admin/dashboard
    role === "rider" → redirect /rider/dashboard
    role === "customer" → redirect /app/home (or original destination if redirect param set)

If URL has ?redirect=/app/cart → after login, redirect there.

Terms note (small text at bottom, outside card):
  Satoshi 11px, muted
  "لاگ ان کرکے آپ ہماری شرائط اور رازداری سے متفق ہیں"
  Links: "شرائط" → /app/terms | "رازداری" → /app/privacy

--------------------------------------------------------------------------------
3.4 SIGNUP SCREEN — /app/signup
--------------------------------------------------------------------------------

Layout: Same as login screen structure. Full-screen centered card.

Title: اکاؤنٹ بنائیں / Sign Up

Google OAuth button (same as login):
  On success: creates new user account, redirects to /app/language-select (if no language set) or /app/home

Divider: یا

Form fields:
  Field 1: پورا نام
    Type: text
    Placeholder: آپ کا نام
    Validation: required, min 2 chars, max 60 chars, no numbers

  Field 2: ای میل
    Type: email
    Validation: required, valid email, unique (checked on blur via /api/auth/check-email)
    Real-time uniqueness check: 500ms debounce after user stops typing
    If email taken: inline error "یہ ای میل پہلے سے استعمال میں ہے"
    If email free: small green checkmark appears right of input

  Field 3: فون نمبر
    Type: tel
    Placeholder: 03xxxxxxxxx
    Validation: required, Pakistan format (starts with 03, 11 digits)
    Auto-format as user types: add spaces 03XX XXXXXXX

  Field 4: پاس ورڈ
    Type: password
    Eye toggle
    Validation: required, min 8 chars, must have at least 1 number
    Strength indicator (4 segments): filled progressively
      1 segment: weak (red)
      2 segments: fair (amber)
      3 segments: good (green)
      4 segments: strong (bright green)

  Field 5: پاس ورڈ دوبارہ
    Validation: must match password field exactly
    Inline: "پاس ورڈ مطابقت نہیں رکھتے" if mismatch

  Checkbox: "میں شرائط و ضوابط سے متفق ہوں" [شرائط] [رازداری]
    Required to be checked before submit

Submit button: btn-primary full-width "اکاؤنٹ بنائیں"
  Disabled until: all fields valid + checkbox checked
  Loading state during API call

On successful signup:
  1. User created in insforge.dev with role: "customer"
  2. Default language: from localStorage tg_lang or "ur"
  3. coinsBalance: 0
  4. Welcome email sent (via Gmail SMTP from info@towergreens.site)
     Subject: "TowerGreens میں خوش آمدید! 🌱"
     Body: Welcome message, link to app
  5. Redirect: /app/language-select (if no language pref set) or /app/home

Error handling:
  Email already exists: inline error
  Server error: toast "سرور میں مسئلہ ہے — بعد میں کوشش کریں"
  Weak password (server-side): inline error

Bottom: "پہلے سے اکاؤنٹ ہے؟" [لاگ ان کریں → /app/login]

--------------------------------------------------------------------------------
3.5 FORGOT PASSWORD SCREEN — /app/forgot-password
--------------------------------------------------------------------------------

Layout: Full-screen centered card, single input

Title: پاس ورڈ بھول گئے؟
Sub: اپنا ای میل درج کریں — ہم آپ کو ری سیٹ لنک بھیجیں گے

Field: ای میل
  Validation: required, valid email

Button: btn-primary "ری سیٹ لنک بھیجیں"

On submit:
  1. API: POST /api/auth/forgot-password { email }
  2. Response always says success (security — don't reveal if email exists)
  3. Show success state:
     Green checkmark animation (stroke draw, 400ms)
     "ری سیٹ لنک بھیج دیا گیا!"
     Sub: "اپنا ای میل چیک کریں — لنک 30 منٹ میں ختم ہو جائے گا"
  4. "واپس لاگ ان → /app/login" link

Back link: arrow + "واپس" at top of card → /app/login

--------------------------------------------------------------------------------
3.6 RESET PASSWORD SCREEN — /app/reset-password?token=XXXX
--------------------------------------------------------------------------------

On load:
  1. Extract token from URL query param
  2. Validate token via GET /api/auth/validate-reset-token?token=XXXX
  3. If invalid/expired: show error state "لنک ختم ہو گیا یا غلط ہے" + "دوبارہ کوشش کریں → /app/forgot-password"
  4. If valid: show reset form

Form:
  Field 1: نیا پاس ورڈ (same strength indicator as signup)
  Field 2: پاس ورڈ دوبارہ

Button: "پاس ورڈ تبدیل کریں"

On submit:
  POST /api/auth/reset-password { token, newPassword }
  On success: toast "پاس ورڈ بدل گیا!" + redirect /app/login after 2s

--------------------------------------------------------------------------------
3.7 APP HOME SCREEN — /app/home
--------------------------------------------------------------------------------

This is the main screen of the app. Every logged-in user lands here.
It is a scrollable page with a sticky header at top and fixed bottom nav.

STICKY HEADER (height 56px, stays at top on scroll):
  Left: TowerGreens logo (small, 28px height)
  Right side icons row (gap 16px):
    Bell icon — notification count badge (red circle with white number)
      Tap → navigate to /app/notifications
    Cart icon — cart item count badge (green circle with white number)
      Tap → navigate to /app/cart
  Background:
    On load: rgba(8,14,10,0.90) + backdrop-filter blur(16px)
    Always has background (app header differs from landing which starts transparent)
  Header height total: 56px

CONTENT (scrollable, starts below header, ends above bottom nav):

GREETING SECTION (padding 20px 16px 8px):
  "خوش آمدید، [User First Name] 👋" (Satoshi 600, 20px, color #F0F7F1)
  "آج کیا کھائیں گے؟" (Satoshi 400, 14px, color #8BA896)
  
  Date sub-text: Today's date (e.g. "11 مارچ 2026") — Satoshi 12px, muted

SEARCH BAR (padding 0 16px 12px):
  Full width, glass input style
  Left: 🔍 search icon (inside input, color muted)
  Placeholder: "سبزیاں، سلاد، صحت مند کھانا تلاش کریں..." (Nastaliq)
  On tap: navigate to /app/search (dedicated search screen with autofocus)
  This input is NOT functional inline — it's a nav shortcut to /app/search

CATEGORY CHIPS (horizontal scroll strip, padding 0 0 4px):
  Container: 16px left padding (for first chip), overflow-x auto, no scrollbar
  Chips: [تمام] [سبزیاں] [سلاد] [صحت مند] [چائنیز] [سپر ہیلتھی]
  Gap: 8px
  Chip style (inactive): pill-green-muted (rgba bg, muted border, muted text, 32px height)
  Chip style (active): pill-green (gradient bg, dark text, 32px height)
  Chip text: Nastaliq 13px
  On chip tap: filter the product sections below to show only that category
    Also update URL param: /app/home?cat=salads for shareability
  Scrollable without visible scrollbar (overflow-x: auto, scrollbar-width: none)

FEATURED BANNER CAROUSEL (padding 0 16px 16px):
  Container: full available width (minus 16px each side = 16px padding)
  Card: glass-card, aspect-ratio 16:7, border-radius 14px, overflow: hidden
  Content: admin-set banners (image, title, subtitle, CTA link)
  Auto-rotate: every 4000ms, smooth crossfade (300ms opacity transition)
  On user swipe: switch to next/prev banner (pan gesture, snap)
  Dot indicators: row of small dots below card
    Active dot: #4ADE80 (wider, pill shaped 16px wide)
    Inactive dots: rgba(255,255,255,0.20) (4px wide circles)
    Transition: width + background-color, 300ms ease
  Banner count: loaded from admin content API
  Fallback: single static banner (TowerGreens branded) if no admin banners

COINS WIDGET (conditionally shown only if user has coinsBalance > 0):
  Position: below banner carousel
  Padding: 0 16px 16px
  Card: glass-card, amber tint (background has rgba(245,158,11,0.06) overlay)
  Border: 1px solid rgba(245,158,11,0.20)
  Content:
    Left: 🪙 coin icon (24px, amber) with sparkle animation (scale 1→1.2→1, 2s infinite)
    Center: "آپ کے پاس [coinsBalance] TowerGreens Coins ہیں" (Nastaliq, 14px)
    Sub text: progress toward next threshold
      If balance < 500: "500 پر 500 روپے کی چھوٹ ملے گی — [balance]/500"
      If 500 <= balance < 5000: "5000 پر 5000 روپے کی چھوٹ ملے گی — [balance]/5000"
      If balance >= 5000: "آپ کے پاس کافی Coins ہیں! چیک آؤٹ پر استعمال کریں"
    Right: Arrow icon → /app/coins
  Progress bar (shows remaining coins needed):
    width = (coinsBalance / nextThreshold) * 100%, capped at 100%

"تازہ ترین پروڈکٹس" ROW:
  Section header:
    Left: "تازہ ترین" (Satoshi 700, 18px, #F0F7F1)
    Right: "سب دیکھیں →" (Satoshi 500, 13px, #4ADE80) → /app/products
  Horizontal scroll row: overflow-x auto, no scrollbar
  Shows: product cards (compact, portrait format)
    Each card width: 160px on mobile, 180px on desktop
    Height: auto
    Image: 160×120 (4:3)
    Body: name (Nastaliq 14px), price (JetBrains Mono 13px green)
    Add to cart button: small, full width inside card
  Shows 2.2 cards visible at once on mobile (first card = 72% width of visible area to imply scroll)
  Data: latest 10 products by createdAt DESC from /api/products?sort=newest&limit=10

"مشہور ڈشز" SECTION:
  Section header: same format as above → "سب دیکھیں →" goes to /app/products
  2-column grid
  Shows: top 6 dishes sorted by order count DESC
  Data from: /api/products?sort=popular&limit=6
  Each card: standard product card (portrait format, full product-card CSS)

Bottom padding: 80px (to clear bottom nav bar)

PAGE LOAD SEQUENCE:
  t=0ms    Skeleton loaders render for all sections (header, greeting, banner, products)
  t=0ms    API calls fire in parallel:
             GET /api/user/me (for greeting name + coins)
             GET /api/banners (for carousel)
             GET /api/products?sort=newest&limit=10
             GET /api/products?sort=popular&limit=6
             GET /api/cart/count (for header badge)
             GET /api/notifications/unread-count (for header badge)
  t=~400ms First data arrives (depends on network)
  t=~400ms Skeletons crossfade to real content:
             opacity 1→0 on skeleton, then display:none
             Real content: opacity 0→1 + translateY(12px)→0
             Stagger: 40ms per section
  t=~600ms All content visible

Skeleton layouts:
  Greeting: 2 lines of skeleton text (full width line, 60% width line)
  Search bar: full-width skeleton rectangle (44px tall)
  Category chips: 6 pill-shaped skeletons
  Banner: full-width skeleton rectangle (16:7 ratio)
  Product row: 3 skeleton product cards side by side
  Product grid: 4 skeleton product cards (2-col)

--------------------------------------------------------------------------------
3.8 SEARCH SCREEN — /app/search
--------------------------------------------------------------------------------

Purpose: Dedicated search experience, replaces home on tap of search bar.
No bottom nav visible on mobile while keyboard is open (it auto-hides).

HEADER:
  Left: Back arrow → /app/home (or previous page)
  Center: Search input (autofocused on screen load, keyboard appears immediately)
    Placeholder: "تلاش کریں..."
    Clear (×) button appears on right when input has text
  No other header items

CONTENT — BEFORE TYPING (default state):
  "حالیہ تلاش" (Recent Searches) section:
    Shows last 5 search queries from localStorage array "tg_recent_searches"
    Each item: search icon + query text + × remove button
    On tap: populate search field + run search
  "مشہور تلاش" (Trending Searches) section:
    Hardcoded or fetched from /api/search/trending
    Shows 5-8 trending terms as pill chips
    On tap: run search

CONTENT — WHILE TYPING (real-time suggestions):
  Trigger: after 300ms debounce from last keystroke
  API: GET /api/products/search?q=QUERY&limit=5
  Shows: autocomplete dropdown below search bar
    Each suggestion: product image (small, 40px) + Urdu name + category
    On tap: navigate to /app/product/[id]
  "سب نتائج دیکھیں" link at bottom of dropdown → run full search

CONTENT — AFTER SUBMIT (full search results):
  User presses Enter OR taps "سب نتائج دیکھیں"
  Query saved to localStorage recent searches (deduplicated, max 5 stored)
  API: GET /api/products/search?q=QUERY&limit=20&page=1
  Results rendered as 2-column grid (same product cards as listing screen)
  Header shows: "'{QUERY}' کے نتائج — X پروڈکٹس ملے"
  No results state:
    SVG: magnifying glass with × 
    Text: "'{QUERY}' کے لیے کوئی نتیجہ نہیں ملا"
    Suggestion: "ان کی تلاش کریں:" + 3 related suggested chips
  Infinite scroll: same as /app/products

--------------------------------------------------------------------------------
3.9 PRODUCT LISTING SCREEN — /app/products
--------------------------------------------------------------------------------

HEADER (sticky):
  Title: "تمام پروڈکٹس" (Satoshi 700, 18px)
  Right: Filter icon button (activates bottom sheet filter panel)

FILTER BAR (sticky below main header, horizontal scroll):
  Row 1 — Sort & filter pills:
    [ترتیب ▼] [قیمت ▼] [کیٹیگری ▼] [صرف دستیاب]
  Row 2 — Active filter tags (appear dynamically as filters applied):
    Each active filter: amber pill with × remove button
    "تمام فلٹرز ہٹائیں" — link if any filters active

Sort bottom sheet (opens on [ترتیب ▼]):
  Options (radio):
    ● نیا → پرانا (default)
    ○ پرانا → نیا
    ○ کم قیمت پہلے
    ○ زیادہ قیمت پہلے
    ○ مشہور پہلے
  [لگائیں] button closes sheet and re-fetches

Price bottom sheet:
  Range slider: Rs 50 → Rs 2000
  Min/Max display with JetBrains Mono numbers
  [لگائیں] button

Category bottom sheet:
  Checkboxes:
    □ سبزیاں
    □ سلاد
    □ صحت مند کھانا
    □ چائنیز اسٹائل
    □ سپر ہیلتھی
    □ پروسیسڈ فوڈ
  Multiple selection allowed
  [لگائیں] button

PRODUCT GRID:
  Layout: 2-column mobile / 3-column desktop
  Gap: 12px mobile / 16px desktop
  Card: standard product-card (defined in section 1.5)

Each card content:
  Image: aspect-ratio 4:3, object-fit cover
  Body (padding 12px):
    Category pill (amber, small): e.g. "سبزیاں"
    Product name (Nastaliq, 16px): e.g. "ہری پالک"
    Calorie row: "🔥 280 kcal" (Satoshi 12px, amber)
    Price row:
      Left: "Rs 450" (JetBrains Mono, 17px, color #4ADE80)
      Right: Add-to-cart button
        State 1 (not in cart): small circular green + button (24px)
        State 2 (in cart): horizontal [-  2  +] counter (replaces button, same width)
    isFeatured badge: "⭐ مشہور" amber pill, positioned top-left on image

ADD TO CART INTERACTION:
  State 1 → tap "+" button:
    Button: scale(0.9)→scale(1.1)→scale(1.0), 300ms bounce
    Cart count badge in bottom nav: increment with spring animation (scale 1.3→1.0)
    Cart count badge in header: same
    Button transitions from "+" to "- 1 +" (animated, 200ms crossfade)
    A small "flying" product image animates from card to cart icon (arc trajectory, 400ms)
  State 2 "+ -":
    Tap "+": increment quantity, update badge counts
    Tap "-": decrement. If reaches 0: transition back to State 1

INFINITE SCROLL:
  IntersectionObserver on a sentinel div at bottom of grid
  On trigger (within 200px of bottom):
    Fetch next page: GET /api/products?page=N&limit=12&[filters]
    Show 4 skeleton cards at bottom while loading
    Append loaded cards to grid
    On all pages loaded: show "کوئی مزید پروڈکٹ نہیں" text + small divider

EMPTY STATE (no products matching filter):
  SVG: empty basket with single leaf falling
  Title (Nastaliq): "کوئی پروڈکٹ نہیں ملا"
  Sub: "فلٹرز تبدیل کریں"
  Button: btn-ghost "فلٹرز ہٹائیں" (clears all filters, re-fetches)

--------------------------------------------------------------------------------
3.10 PRODUCT DETAIL SCREEN — /app/product/[id]
--------------------------------------------------------------------------------

This screen has NO regular sticky header.
Instead: translucent top bar (position absolute, gradient from rgba(8,14,10,0.7) to transparent)
  Left: ← back arrow (white, 44px touch target)
  Right: ⋯ share icon (opens share sheet: native Web Share API or custom modal)

IMAGE GALLERY:
  Full-width swipeable image carousel (top section of screen, no padding)
  Height: 55vw desktop / 65vw mobile
  Background of gallery container: #080E0A (in case images have transparency)

  Main carousel:
    Shows 1 image at a time, full width
    Pan/swipe horizontally to change image
    Snap behavior: one image at a time
    Smooth momentum scroll with snap
    Indicator: image counter "2/4" (top right corner, glass pill)

  Thumbnail strip (below carousel):
    4 small thumbnail images (56px × 42px each, 4:3, border-radius 8px)
    Active thumbnail: 2px green border + slight scale(1.05)
    Tap thumbnail → main carousel jumps to that image
    Transition: crossfade 200ms

CONTENT CARD (glass-card, border-radius 20px top only, -20px margin-top to overlap image):
  This overlaps the bottom of the image carousel creating a smooth overlap effect
  Padding: 20px 16px

  Category pill (amber): e.g. "سبزیاں"

  Product Name (Nastaliq, hero-lg variant, 28px):
    e.g. "تازہ ہری پالک"
    Color: #F0F7F1

  Price + Calorie row:
    Left: "Rs 450" (JetBrains Mono, 24px, #4ADE80)
    Right: "🔥 280 kcal" (Satoshi 14px, amber glass pill)

  Availability badge:
    If isAvailable = true: "● دستیاب" (small green dot, Nastaliq 12px)
    If isAvailable = false: "✕ دستیاب نہیں — اسٹاک ختم" (red text)

  DIVIDER

  MAKING PROCESS VIDEO (custom player):
    Show only if product has videoUrl set. Otherwise this section is hidden.

    Layout:
      Thumbnail image (16:9, full width, border-radius 12px)
      Centered play button overlay (60px circle, semi-transparent, white triangle icon)
      Bottom-left label: "بنانے کا طریقہ" (Nastaliq, 12px, white on gradient overlay)

    On play tap:
      Video replaces thumbnail in same container
      Custom controls appear (overlaid at bottom):
        Progress bar (full width, 4px tall, green fill, scrubable)
        Left: Play/Pause button (32px, white icon)
        Center: current time / total time (JetBrains Mono, 12px, white)
        Right: volume icon + fullscreen icon (enter HTML5 fullscreen or modal fullscreen)
      Controls auto-hide after 3s of no interaction, reappear on tap

    No native browser player controls (controls attribute NOT added to video element)
    Fullscreen: pressing fullscreen opens the video in a modal overlay at full screen size

  ACCORDIONS (all collapsed by default):

    Accordion 1 — اجزاء (Ingredients):
      Header: "اجزاء" (Satoshi 600, 15px)
      Body: comma-separated list of ingredients in Nastaliq
        e.g. "پالک، لہسن، زیتون کا تیل، نمک"

    Accordion 2 — غذائی معلومات (Nutrition):
      Header: "کیلوریز کی تفصیل"
      Body: table-like layout:
        کیلوریز:      280 kcal
        پروٹین:       12g
        چکنائی:       8g
        کاربوہائیڈریٹ: 30g
        فائبر:         5g
      All labels Nastaliq, values JetBrains Mono

    Accordion 3 — ڈیلیوری کی معلومات:
      Header: "ڈیلیوری کی معلومات"
      Body:
        "ڈیلیوری وقت: [X] منٹ" (fetched from admin delivery settings)
        "علاقہ: لاہور"
        "مفت ڈیلیوری: ہاں"

  PRODUCT DESCRIPTION (full text):
    Nastaliq, body-md, direction: ltr; unicode-bidi: plaintext;
    Color: rgba(240,247,241,0.80)
    Line-height: 2.2
    Full text, no truncation on detail page

  RELATED PRODUCTS (horizontal scroll row):
    Header: "متعلقہ پروڈکٹس" (Satoshi 700, 16px)
    Same category products, excluding current, limit 8
    API: GET /api/products?category=CATEGORY&limit=8&exclude=PRODUCT_ID
    Compact product cards (horizontal scroll, 2.2 visible at once)

  CTA SECTION (at bottom of content card, above related products):
    Quantity selector: [-  1  +] (36px tall, glass background, green border)
    "کارٹ میں شامل کریں" button: btn-primary full width

STICKY BOTTOM CTA BAR (mobile only):
  Appears after user scrolls past the inline CTA section (in-page CTA goes out of viewport)
  IntersectionObserver on in-page CTA: when it leaves viewport → show sticky bar
  When in-page CTA returns to viewport → hide sticky bar

  Sticky bar (slides up from bottom, sits ABOVE bottom nav):
    Height: 64px
    Background: rgba(8,14,10,0.95) + backdrop-filter blur(20px)
    Border-top: 1px solid rgba(74,222,128,0.15)
    Padding: 0 16px

    Left: "Rs 450" (JetBrains Mono, 20px, green)
    Right: btn-primary (medium size) "کارٹ میں شامل کریں"

  Slide-up animation: translateY(100%)→translateY(0), 300ms ease
  Slide-down animation: translateY(0)→translateY(100%), 200ms ease

SHARE FUNCTIONALITY:
  On share icon tap:
    Try navigator.share API (mobile native share sheet):
      title: product name
      text: product description snippet
      url: https://towergreens.site/products/[id] (public landing product page)
    Fallback (if not supported): custom modal with copy link + WhatsApp + YouTube buttons

--------------------------------------------------------------------------------
3.11 CART SCREEN — /app/cart
--------------------------------------------------------------------------------

HEADER (sticky):
  Left: ← Back
  Center: "آپ کا کارٹ" (Satoshi 700, 18px)
  Right: Item count badge (glass pill, green) showing total item count

EMPTY CART STATE (shown when cart has 0 items):
  SVG illustration: empty wicker basket with a single sad green leaf falling
  Title (Nastaliq, heading-md): "کارٹ خالی ہے"
  Sub (Nastaliq, body-sm, muted): "ابھی تک کچھ نہیں ڈالا"
  Button: btn-primary "خریداری شروع کریں" → /app/products

CART ITEMS LIST (shown when cart has items):
  Each item row:
    Layout: horizontal flex, 12px gap
    Left: product image (60px × 60px, border-radius 8px, object-fit cover)
    Center (flex-1):
      Product name (Nastaliq, 15px, 1 line, overflow: ellipsis)
      Category (Nastaliq, 12px, amber, muted)
      Quantity adjuster row: [-  2  +] (small, glass pill style)
        Tap "-": decrement quantity
        If quantity becomes 0: remove item from cart (see delete animation below)
        Tap "+": increment quantity
    Right:
      Price (JetBrains Mono, 15px, green): Rs [unit price × qty]
      Delete icon (🗑️ red, 20px): tap → remove item

  SWIPE-TO-DELETE (mobile):
    Pan left on item row > 60px → red delete zone appears on right
    Zone shows trash icon + red background, width grows with swipe
    Release when > 80px: confirm delete
    Release when < 60px: snap back

  DELETE ANIMATION:
    Selected item: height animates to 0 + opacity to 0 (300ms ease-in)
    Items below shuffle up: smooth reflow (350ms ease)
    If last item deleted: cart becomes empty → switch to empty state (crossfade)
    Toast: "آئٹم ہٹا دیا گیا" with Undo option (5s window to undo)
      On Undo tap: item is restored, added back to cart API call

  Separator line between each item: 1px rgba(74,222,128,0.08)

COINS WIDGET IN CART (conditionally shown):
  Conditions: user has coinsBalance >= 500 AND at least one item is JazzCash payable
  Show even before payment method selected (user might select JazzCash)
  Card (amber tint glass-card):
    🪙 icon + "500 TowerGreens Coins استعمال کریں؟"
    Sub: "500 روپے کی چھوٹ ملے گی"
    Toggle switch (ON/OFF):
      ON: coins will be applied at checkout → update order summary
      OFF: no coins applied
    Shows: "⚠️ صرف JazzCash ادائیگی پر لاگو ہوتا ہے" in small muted text

  If balance ≥ 5000: show 5000-coin option additionally
    Two separate toggle rows if both thresholds available

ORDER SUMMARY CARD (glass-card, bottom section):
  Row: آئٹمز کل:    Rs [items subtotal]     (calculated client-side from cart items)
  Row: ڈیلیوری:     مفت                     (currently free delivery)
  Row (if coins toggle ON): کوائنز چھوٹ:   - Rs [coinsDiscount]   (amber text)
  Divider: thin neon line
  Row: کل ادائیگی:  Rs [final total]        (Satoshi 700, 18px, white)

  Note on discount calculation:
    If coinsToggle is ON and balance >= 500: subtract Rs 500 from total
    If coinsToggle is ON and balance >= 5000 AND user selects 5000-coin option: subtract Rs 5000
    If final total goes below 0: show Rs 0 (order is free)

[چیک آؤٹ پر جائیں — btn-primary full width]
  Disabled if cart is empty
  Loading state on tap
  → navigate to /app/checkout

API calls on cart screen:
  GET /api/cart → returns cart items for current user
  POST /api/cart/remove { productId } → remove item
  PATCH /api/cart/update { productId, quantity } → update quantity
  GET /api/user/coins → get current coins balance

Cart state is stored BOTH locally (for instant UI) and synced to server.
Local state: Redux store or React Context with useReducer
On mount: fetch server cart, merge with local (server is truth)

--------------------------------------------------------------------------------
3.12 CHECKOUT SCREEN — /app/checkout
--------------------------------------------------------------------------------

HEADER: "چیک آؤٹ" (Satoshi 700, 18px) + ← back

STEP INDICATOR (3 steps):
  [1: تفصیلات] ——— [2: ادائیگی] ——— [3: تصدیق]
  Rendered using step-indicator CSS component (section 1.5)

STEP 1 — DELIVERY DETAILS:

  Sub-header: "ڈیلیوری کی تفصیلات" (Satoshi 600, 16px)

  Form fields:
    نام:       text input, pre-filled with user's name, editable
    فون:       tel input, pre-filled with user's phone, editable
                Pakistan format validation (03xxxxxxxxx)
    پتہ:       textarea (4 rows), Nastaliq placeholder "اپنا مکمل پتہ لکھیں..."
                Validation: required, min 10 chars, max 300 chars
    شہر:       text input, pre-filled "لاہور", disabled (delivery only in Lahore)
    نوٹ (optional): textarea, placeholder "کوئی خاص ہدایت؟"

  "محفوظ کریں" checkbox: "یہ پتہ محفوظ کریں آئندہ استعمال کے لیے"
    If checked: save to user profile on submit

  "پہلے سے محفوظ پتے" (if user has saved addresses):
    Small section above form showing saved addresses as selectable cards
    On select: auto-fill all fields
    Each card: name/label + address snippet + ✏️ edit + trash icon

  [اگلا → ادائیگی] — btn-primary, full width
    Validates all required fields before proceeding
    Shows inline errors if validation fails
    Does NOT make API call yet — saves state locally

STEP 2 — PAYMENT METHOD:

  Sub-header: "ادائیگی کا طریقہ"

  Two option tiles (full width, selectable):

    Tile 1 — JazzCash:
      Icon: JazzCash logo (png from assets)
      Title (Satoshi 600, 16px): JazzCash
      Sub (Nastaliq, 13px, muted): آن لائن ادائیگی
      Badge: "25% بونس Coins" (small amber pill) — reminder of coins bonus
      Active state: green border + green dot (●) top-right + subtle glow
      Input field (appears when tile is active):
        Label: "JazzCash موبائل نمبر"
        Type: tel, placeholder: 03xxxxxxxxx
        Pre-filled: user's registered phone number (editable)

    Tile 2 — کیش آن ڈیلیوری:
      Icon: 💵 cash emoji or SVG
      Title: کیش آن ڈیلیوری
      Sub (Nastaliq): ڈیلیوری پر نقد ادائیگی
      Note (muted, small): "Coins نہیں ملیں گے — آن لائن ادا کریں تو Coins حاصل کریں"

  Only one tile active at a time. Default: JazzCash selected.

  [اگلا → تصدیق] — btn-primary, full width
    If JazzCash selected: validate phone field
    If COD selected: proceed immediately

STEP 3 — CONFIRMATION / REVIEW:

  Sub-header: "آرڈر کی تصدیق"

  Order review card (glass):
    Heading: "آرڈر کا خلاصہ"
    Item list (simplified, no quantity adjuster):
      [image 48px] [Urdu name] [qty] [price]
    Divider
    Delivery address section:
      Label: "ڈیلیوری پتہ"
      Shows: name, phone, address
      [تبدیل کریں] link → goes back to step 1
    Payment method section:
      Label: "ادائیگی"
      Shows: JazzCash / کیش آن ڈیلیوری
      [تبدیل کریں] link → goes back to step 2

  Order summary totals (same as cart summary section)

  Terms note:
    "آرڈر دے کر آپ ہماری شرائط سے متفق ہیں" + link to /app/terms
    Checkbox: must be checked (required)

  [آرڈر دیں — btn-primary, large, full width]
    On tap:
      If JazzCash:
        POST /api/orders/create { items, deliveryAddress, paymentMethod: "jazzcash", coinsApplied }
        Response includes order ID
        Then POST /api/payment/initiate { orderId, amount, phone }
        Response includes JazzCash redirect URL
        Navigate user to JazzCash hosted payment page (window.location.href = url)
        After payment: JazzCash redirects back to /app/payment/callback?...

      If COD:
        POST /api/orders/create { items, deliveryAddress, paymentMethod: "cod", coinsApplied }
        On success → navigate to /app/order-placed?orderId=XXXX

  Error handling:
    Payment initiation failed: toast "ادائیگی شروع نہیں ہو سکی — دوبارہ کوشش کریں"
    Network error: toast with retry option
    Out of stock item in cart: show error "بعض آئٹمز اب دستیاب نہیں — کارٹ اپڈیٹ کریں"

--------------------------------------------------------------------------------
3.13 PAYMENT CALLBACK — /app/payment/callback
--------------------------------------------------------------------------------

This page is a server-side endpoint (not a UI screen the user sees long).

On arrival (GET or POST from JazzCash):
  1. Extract all query/form params
  2. Verify HMAC signature (backend)
  3. If signature invalid: redirect /app/payment?status=failed&reason=invalid_sig
  4. If payment failed (pp_ResponseCode != "000"):
     Update order.paymentStatus = "failed" in database
     redirect /app/payment?status=failed&orderId=XXXX
  5. If payment successful (pp_ResponseCode == "000"):
     Update order.paymentStatus = "paid"
     Update order.orderStatus = "placed"
     Clear user's cart
     Generate 8-digit OTP for this order, store in orders.otp, orders.otpExpiresAt = now + 24h
     Send push notification to customer: "آپ کا آرڈر موصول ہو گیا! #TG-XXXX"
     Send push notification to admin: "نیا آرڈر #TG-XXXX آیا!"
     redirect /app/order-placed?orderId=XXXX

Payment failure screen (/app/payment?status=failed):
  Icon: X in red circle (draw animation)
  Title (Nastaliq): "ادائیگی ناکام ہو گئی"
  Sub: "آپ کا آرڈر مکمل نہیں ہوا"
  Retry button: btn-primary "دوبارہ کوشش کریں" → back to /app/checkout
  COD option: btn-ghost "کیش آن ڈیلیوری سے آرڈر کریں" → back to /app/checkout with COD pre-selected

--------------------------------------------------------------------------------
3.14 ORDER PLACED SCREEN — /app/order-placed
--------------------------------------------------------------------------------

URL: /app/order-placed?orderId=TG-20260305-4821

This is a full-screen CELEBRATION screen.
NO header. NO bottom nav. Pure moment.
Background: #080E0A

ANIMATION SEQUENCE:

  t=0ms:    Dark background renders (instant)
  t=200ms:  Large SVG checkmark circle (80px) appears in center
             Stroke draw animation: stroke-dashoffset animates from 300 to 0, 600ms ease
             Circle border: #4ADE80 (neon green)
             Checkmark inside: white, draws after circle at t=500ms
  t=800ms:  CSS Confetti explosion:
             40 particles, each is a small rectangle (6px × 10px or circle 8px)
             Colors: #4ADE80 (60%) + #F59E0B (40%)
             Spawn from center of checkmark
             Each particle: random direction, random speed, random rotation
             Animation: confetti-fall keyframe, 2s ease-in
  t=1200ms: "آپ کا آرڈر موصول ہو گیا!" — slides up from below, Nastaliq hero-lg, #F0F7F1
  t=1600ms: Order ID: "#TG-20260305-4821" fades in, JetBrains Mono 16px, muted
  t=2000ms: Delivery timer section slides up

DELIVERY TIMER:
  Data: admin's delivery_duration setting (e.g. 35 minutes)
  Display: SVG circular progress ring (120px diameter)
    Ring: full circle background in rgba(74,222,128,0.15)
    Animated fill: starts empty, animates to full over 1.5s (just for visual wow)
    Then: ring gradually empties over actual delivery time (optional real-time countdown)
  Center of ring:
    Countdown: "35:00" then counts down in realtime (JetBrains Mono, 22px)
    Below timer: "منٹ باقی" (Nastaliq, 12px)
  Below ring:
    Text (Nastaliq): "آپ کا آرڈر [35] منٹ میں پہنچ جائے گا"

BELOW TIMER:

  Order summary (accordion, collapsed by default):
    Header: "آرڈر کا خلاصہ" (tap to expand)
    Content: items list, total

  Action buttons:
    [آرڈر ٹریک کریں] btn-primary → /app/orders/[orderId]
    [ہوم پر واپس]     btn-ghost  → /app/home

  COD only — reminder:
    If payment method = COD:
      Glass amber card: "🧾 ادائیگی: Rs [total] — ڈیلیوری پر نقد ادا کریں"

  JazzCash payment — confirmation:
    "✓ JazzCash ادائیگی مکمل — Rs [total]" (green text)

After rendering this screen:
  1. Clear local cart state
  2. Dispatch cart badge count to 0

--------------------------------------------------------------------------------
3.15 ORDER TRACKING SCREEN — /app/orders/[id]
--------------------------------------------------------------------------------

URL: /app/orders/TG-20260305-4821

HEADER:
  ← Back
  "آرڈر #TG-20260305-4821" (Satoshi 700, 16px)
  Right: 📋 share icon (share order details via Web Share API)

ORDER STATUS TRACKER (vertical stepper, full width):

  5 status steps:
    1. آرڈر موصول
    2. آرڈر قبول
    3. تیاری جاری ہے
    4. ڈیلیوری پر ہے
    5. پہنچ گیا

  Each step visual:
    Left: status dot (28px circle)
      Completed: solid #4ADE80, checkmark icon inside
      Current: rgba(74,222,128,0.20) bg + #4ADE80 border + pulsing glow animation
        animation: pulseShadow 1.5s ease-in-out infinite
      Future: rgba(255,255,255,0.06) bg + rgba(255,255,255,0.12) border
    Connecting line between dots: 2px vertical line
      Completed segments: #4ADE80
      Upcoming segments: rgba(255,255,255,0.10)
    Right of dot: step label + timestamp
      Completed: Nastaliq label + Satoshi timestamp (e.g. "3:45 PM")
      Current: Nastaliq label (brighter), no timestamp yet
      Future: Nastaliq label (muted)

  If status = "rejected":
    Show only steps 1 + "آرڈر مسترد" in red
    Rejection reason (if admin set one): shown in red glass card below tracker
    Refund note (if JazzCash): "ادائیگی 3-5 کاری دنوں میں واپس ہو گی"

DATA REFRESH:
  Poll /api/orders/[id] every 30 seconds
  When status changes → update stepper with animation
  Push notification on status change is the primary trigger for user to open this

ORDER ITEMS LIST:
  Heading (Satoshi 600, 14px): "آرڈر میں شامل آئٹمز"
  Each item: [image 56px] [Urdu name] [qty × price] (horizontal flex)

PAYMENT DETAILS CARD (glass):
  ادائیگی کا طریقہ: JazzCash / COD
  حالت:            ✓ کامیاب / ● باقی (COD)
  کل:              Rs 450

DELIVERY ADDRESS CARD (glass):
  Shows: name, phone, full address

REORDER BUTTON (bottom):
  btn-ghost "دوبارہ آرڈر کریں"
  On tap: add same items to cart + navigate to /app/cart
  If some items unavailable: toast "بعض آئٹمز دستیاب نہیں — باقی شامل کیے گئے"

--------------------------------------------------------------------------------
3.16 OTP COINS POPUP — POST-DELIVERY
--------------------------------------------------------------------------------

TRIGGER CONDITIONS (all must be true):
  1. Order paymentMethod = "jazzcash" (NOT COD)
  2. Order orderStatus = "delivered" (delivery completed)
  3. User opens the app within 24 hours of delivery (checked against orders.otpExpiresAt)
  4. orders.otpUsedAt is NULL (OTP not yet used/claimed)
  5. User is logged in as the order's customer

TRIGGER MECHANISM:
  On every app load (/app/home, /app/products, any /app/* page):
    GET /api/user/pending-otp-orders
    Response: list of orders where conditions 1-4 are all true for current user
    If response is empty array → do nothing
    If response has items → show this popup for the first item

POPUP UI:
  Overlay: rgba(0,0,0,0.75) backdrop + blur(8px)
  Modal box: glass-card, max-width 380px, centered
  Padding: 32px 24px
  Cannot be dismissed by clicking outside (must explicitly tap "بعد میں")

  Content:
    🪙 large coin icon (48px, amber, sparkle animation)
    "مبارک ہو!" (Satoshi 700, 22px, #F0F7F1)
    Divider
    Body (Nastaliq):
      "آپ کے آرڈر #TG-[id] کی ڈیلیوری مکمل ہو گئی۔"
      "اپنے [X] TowerGreens Coins حاصل کرنے کے لیے OTP درج کریں جو رائیڈر نے دیا:"
    Coins to be earned: "[X] TowerGreens Coins" (large, amber, JetBrains Mono 28px)
      X = 25% of order value (admin-configured coin rate, default 25%)
      Example: Rs 500 order → 125 coins

    OTP INPUT (8 boxes):
      [_][_][_][_] - [_][_][_][_]
      Auto-advance behavior as defined in section 1.5

    Time remaining:
      "⏱️ [HH] گھنٹے [MM] منٹ باقی ہیں"
      Satoshi 13px, amber, countdown in real-time

    [تصدیق کریں — btn-primary, full width]
      Disabled until all 8 boxes filled
      Loading state during API call

    [بعد میں — btn-text, centered below primary]
      Dismisses popup
      Order remains claimable until otpExpiresAt
      Popup will show again on next app open

SUCCESS STATE (on correct OTP):
  1. API: POST /api/orders/[id]/verify-otp { otp: "12345678" }
  2. Server verifies OTP, awards coins, sets otpUsedAt = now
  3. Response: { success: true, coinsAwarded: 125, newBalance: 350 }
  4. UI:
     Popup content replaces with:
       Large ✓ checkmark (green, draw animation)
       "[125] Coins شامل ہو گئے!" (Satoshi 700, 22px, green)
       "نیا بیلنس: [350] Coins" (JetBrains Mono)
       Mini confetti from coin icon (20 particles)
       Coin sparkle particles float up and disappear
     After 2500ms: popup closes
     Header coin badge / profile coins balance updates live
     Toast (after popup closes): "125 Coins آپ کے اکاؤنٹ میں شامل ہو گئے! 🪙"

ERROR STATE (on wrong OTP):
  1. API returns: { success: false, error: "invalid_otp", attemptsRemaining: 2 }
  2. UI:
     All 8 OTP boxes shake (shake animation 500ms)
     All 8 boxes: red border (.error class)
     Below boxes: "غلط OTP — [X] کوششیں باقی ہیں" (red, Satoshi 13px)
     Boxes clear after 1s, user can retry
  3. After 3 failed attempts:
     Lock the form for this order's OTP
     Show: "بہت زیادہ کوششیں — OTP بند ہو گیا"
     [بند کریں] button only

--------------------------------------------------------------------------------
3.17 ORDER HISTORY — /app/orders
--------------------------------------------------------------------------------

HEADER: "میرے آرڈرز" (Satoshi 700, 18px)

FILTER TABS (horizontal scroll):
  [تمام] [زیر التوا] [مکمل] [مسترد]
  Active tab: underline + green text

ORDER LIST (sorted: newest first):
  Each order card (glass-card, tap → /app/orders/[id]):
    Top row:
      Left: "#TG-20260305-4821" (JetBrains Mono, 13px, muted)
      Right: Status badge pill (color per status)
    Middle row:
      Order items summary: "پالک، لیٹس + 2 مزید" (Nastaliq, 14px)
      Date/time: "5 مارچ، 3:45 PM" (Satoshi 12px, muted)
    Bottom row:
      Left: "Rs 450" (JetBrains Mono, 15px, green)
      Right: [دوبارہ آرڈر کریں] small ghost button

Status badge colors:
  Placed:           amber (pill-amber)
  Accepted:         blue (pill-blue)
  Preparing:        purple (rgba(167,139,250,0.20) bg + #A78BFA text)
  Out for Delivery: orange (rgba(251,146,60,0.20) + #FB923C)
  Delivered:        green (pill-green)
  Rejected:         red (pill-red)

PENDING OTP INDICATOR:
  On delivered JazzCash orders where OTP not yet claimed:
    Show small amber dot next to status badge
    Tooltip on tap: "Coins ابھی نہیں لیے!"

EMPTY STATE:
  SVG: empty box
  "ابھی تک کوئی آرڈر نہیں"
  btn-primary "پہلا آرڈر دیں" → /app/products

INFINITE SCROLL: same pagination pattern as products

--------------------------------------------------------------------------------
3.18 PROFILE SCREEN — /app/profile
--------------------------------------------------------------------------------

HEADER: "پروفائل"

PROFILE HERO SECTION:
  Full-width glass-card, padding 24px
  Background: subtle radial gradient with green tint at center

  Avatar:
    96px × 96px circle
    Source: user.profileImage (if set) or initials-based avatar
    Initials avatar: #1B4332 background + user's first letter in white (Satoshi 700, 32px)
    If user has coins > 0: 2px green glowing ring around avatar
      ring animation: pulseShadow 2s ease infinite
    Tap avatar: opens file picker (input type=file, accept=image/*)
      On file select: upload to storage, PATCH /api/user/profile { profileImage: url }
      Show loading spinner overlay on avatar during upload
      On success: avatar updates in real-time (no page reload)

  User name: Satoshi 700, 20px, #F0F7F1
  Email: Satoshi 400, 14px, #8BA896
  [ترمیم کریں] button: btn-ghost small → /app/profile/edit

COINS CARD (amber tint glass-card, margin 16px):
  🪙 coin icon (32px, amber, sparkle animation)
  "[350] TowerGreens Coins" (JetBrains Mono, 28px, amber)
  Progress bar + label:
    If < 500: "500 میں سے 350 — 150 مزید چاہیے"
    Fill: (350/500) × 100% = 70%
  [Coins کی تفصیل →] btn-text → /app/coins

MENU ITEMS LIST:
  Each item: horizontal row, glass hover effect, arrow on right
  Full list:

    Icon | Urdu Label              | Destination
    ─────────────────────────────────────────────
    📦   | میرے آرڈرز             | /app/orders
    🔔   | نوٹیفیکیشنز            | /app/notifications
    💬   | ڈائریکٹ میسج           | /app/direct-message
    🌐   | زبان تبدیل کریں        | /app/language-select
    📄   | شرائط و ضوابط          | /app/terms
    🔒   | رازداری کی پالیسی      | /app/privacy
    🚪   | لاگ آؤٹ                | (triggers logout)

  Hover/active: background flash rgba(74,222,128,0.06) + arrow moves translateX(4px)
  Each item: minimum 52px tall (touch target)

  لاگ آؤٹ styling:
    Text color: #F87171 (red — danger visual cue)
    Icon: 🚪 red tint
    On tap: confirmation modal
      "کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟"
      [ہاں، لاگ آؤٹ] (red btn) | [واپس] (ghost btn)
      On confirm: clear auth, clear localStorage, navigate /app/login

APP VERSION:
  Below menu, centered, muted
  "TowerGreens v1.0.0" (Satoshi 12px)

--------------------------------------------------------------------------------
3.19 PROFILE EDIT SCREEN — /app/profile/edit
--------------------------------------------------------------------------------

HEADER: ← + "پروفائل ترمیم"

Form (pre-filled with current values):
  Avatar (same tap-to-change as profile screen)
  نام:        text, required
  فون:        tel, Pakistan format
  ای میل:     email, NOT editable (greyed out)
                Note: "ای میل تبدیل نہیں کی جا سکتی" small muted text below
  زبان:       select dropdown: اردو / English (pre-selected per preference)

[تبدیلیاں محفوظ کریں] — btn-primary, full width
  PATCH /api/user/profile { name, phone, language }
  On success: toast "پروفائل اپڈیٹ ہو گیا" + navigate back to /app/profile
  On error: toast error

Password change section (separate card, below main form):
  [پاس ورڈ تبدیل کریں →] ghost button → opens bottom sheet
  Bottom sheet: current password + new password + confirm + [تبدیل کریں]

--------------------------------------------------------------------------------
3.20 COINS WALLET SCREEN — /app/coins
--------------------------------------------------------------------------------

HEADER: ← + "TowerGreens Coins"

COINS BALANCE HERO (amber tint glass-card, centered):
  Large 🪙 icon (60px, animated sparkle loop)
  Balance: JetBrains Mono, 48px, amber
  Label: "TowerGreens Coins" (Nastaliq, 16px, muted)
  Progress toward next threshold:
    Two progress bars shown (if applicable):
      Bar 1: "500 Coins چھوٹ کا ہدف: [balance]/500"
      Bar 2 (if balance > 500): "5000 Coins چھوٹ کا ہدف: [balance]/5000"

HOW COINS WORK (info card):
  Glass card with expand/collapse
  Nastaliq body text explaining:
    • آرڈر پر 1-5% Coins ملتے ہیں
    • آن لائن JazzCash ادائیگی پر 25% بونس Coins (OTP تصدیق کے بعد)
    • 500 Coins پر 500 روپے کی چھوٹ (صرف JazzCash پر)
    • 5000 Coins پر 5000 روپے کی چھوٹ (صرف JazzCash پر)
    • Coins کی میعاد: [admin configured — e.g. 1 year]

TRANSACTION HISTORY:
  Heading: "Coins کی سرگزشت" (Satoshi 700, 16px)
  Filter tabs: [تمام] [کمائی] [خرچ]

  Each transaction row:
    Left: icon (🪙 earn / 🛒 spend)
    Center: description (Nastaliq) + date (Satoshi 12px, muted)
    Right: + or - amount (JetBrains Mono, color green if earn, red if spend)

  Data from: GET /api/coins/transactions?userId=ME&page=1&limit=20
  Infinite scroll

EMPTY STATE (no transactions):
  "ابھی تک کوئی Coins نہیں — آرڈر دیں اور Coins کمائیں!"
  btn-primary "آرڈر کریں" → /app/products

--------------------------------------------------------------------------------
3.21 NOTIFICATIONS SCREEN — /app/notifications
--------------------------------------------------------------------------------

HEADER: ← + "نوٹیفیکیشنز" + [سب پڑھا] button (right, muted text)
  [سب پڑھا] taps: mark all as read via PATCH /api/notifications/mark-all-read
  Button only shows if unread count > 0

NOTIFICATION LIST (sorted: newest first):

  Each notification:
    Unread: slightly brighter background (rgba(74,222,128,0.04)) + left border rgba(74,222,128,0.4)
    Read: normal card background

    Layout:
      Left: icon (based on type)
        Order placed:      📦 (green)
        Order accepted:    ✓ (blue)
        Out for delivery:  🛵 (orange)
        Delivered:         🎉 (green)
        Rejected:          ✗ (red)
        Coins earned:      🪙 (amber)
        Promotional:       📢 (purple)
      Center:
        Title (Satoshi 600, 14px): e.g. "آرڈر ڈیلیوری پر ہے!"
        Body (Nastaliq, 13px, muted): e.g. "آپ کا آرڈر #TG-4821 راستے میں ہے"
        Time (Satoshi 11px, muted): "2 گھنٹے پہلے"
      Right: unread blue dot (6px, #60A5FA) if unread

  On tap: mark as read + navigate to relevant screen
    Order notification → /app/orders/[orderId]
    Coins notification → /app/coins
    Promo notification → relevant product or category

EMPTY STATE:
  Bell icon (48px, muted)
  "ابھی کوئی نوٹیفیکیشن نہیں"

WEB PUSH SETUP:
  On first login, app requests notification permission:
    Bottom sheet (not blocking modal):
      "نوٹیفیکیشنز چالو کریں"
      Sub: "آپ کو آرڈر اپڈیٹس فوری ملیں گی"
      [ہاں، چالو کریں] — btn-primary
      [ابھی نہیں] — btn-text

    On permission grant:
      navigator.serviceWorker.ready → registration.pushManager.subscribe
      VAPID public key from env
      POST /api/push/subscribe { endpoint, keys: { p256dh, auth } }
      Stored in pushSubscriptions table

    On denial: don't ask again for 30 days (localStorage timestamp check)

--------------------------------------------------------------------------------
3.22 DIRECT MESSAGE / SUPPORT CHAT — /app/direct-message
--------------------------------------------------------------------------------

HEADER: ← + "ڈائریکٹ میسج"
Sub-header: "TowerGreens سپورٹ" + 🟢 status dot (show "آن لائن" if within business hours)

CHAT AREA (scrollable, messages flow bottom-to-top newest):

  Welcome message (system):
    Left side, TowerGreens logo avatar
    "سلام! کیا مدد چاہیے؟" (Nastaliq, 15px)

  User messages (right side, green bubble):
    background: rgba(74,222,128,0.15)
    border-radius: 18px 18px 4px 18px
    text: Nastaliq, 14px, #F0F7F1
    timestamp: Satoshi 11px, muted, below bubble

  Admin messages (left side, dark bubble):
    background: rgba(255,255,255,0.06)
    border-radius: 18px 18px 18px 4px
    Same text style

  Message states: sending (muted) → sent (✓) → delivered (✓✓) → read (✓✓ green)

INPUT BAR (sticky at bottom, above bottom nav):
  height: 56px
  Glass background
  Left: textarea (grows up to 3 lines), Nastaliq placeholder: "پیغام لکھیں..."
  Right: Send button (green circle, white arrow icon)
  On send:
    POST /api/messages { message: text }
    Message appears immediately in chat (optimistic update)
    If API fails: message shows error state + retry option

DATA POLLING:
  GET /api/messages?page=1&limit=30 on screen load
  Poll every 15s for new admin replies

--------------------------------------------------------------------------------
PART 4: ADMIN PANEL — COMMAND CENTER
================================================================================

The admin panel is ONLY accessible via admin@towergreens.site credentials.
No other user can access /admin/* routes.
If non-admin tries to access: redirect to /app/home with toast "رسائی منع ہے"

Visual identity: "Command Center"
  Background: #0F1117 (cool dark gray — distinct from green-tinted app)
  Sidebar: #171B26 (slightly lighter)
  Cards/panels: #1E2433
  Accent: #4ADE80 (restrained use — only for key actions and status)
  Text: #E2E8F0
  Borders: rgba(255,255,255,0.08)
  Typography: Satoshi only (no Nastaliq in admin — functional English/Urdu mix)

ADMIN LAYOUT (desktop-first, collapsible sidebar):

  TOPBAR (fixed top, full width, height 56px):
    Left: ≡ hamburger (collapses/expands sidebar) + "TowerGreens Admin" (Satoshi 700, 16px)
    Right: 🔔 [3 badge] + [admin@towergreens.site ▼ dropdown]
    Dropdown: Profile link + Logout

  SIDEBAR (left, 240px expanded / 64px collapsed):
    Collapsed: show only icons
    Expanded: icons + text labels
    Transition: width 240px→64px, 250ms ease. Text opacity 1→0, 100ms.

    Navigation items:
      🏠  Dashboard         /admin/dashboard
      📦  Orders            /admin/orders       (badge: pending order count, red)
      🛍️  Products          /admin/products
      🏷️  Categories        /admin/categories
      👥  Users             /admin/users
      🏍️  Riders            /admin/riders
      🪙  Coins             /admin/coins
      🔔  نوٹیفیکیشنز       /admin/notifications
      🚴  Delivery Settings  /admin/delivery-settings
      💳  Payments          /admin/payments
      📊  Analytics         /admin/analytics
      💬  Messages          /admin/messages
      📝  Content           /admin/content
      ⚙️  Settings          /admin/settings

    Active item: green background rgba(74,222,128,0.10) + green left border 3px
    Hover: rgba(255,255,255,0.04) background

  MAIN CONTENT AREA (right of sidebar, scrollable):
    Page title + breadcrumb at top of each page
    Content fills available width

--------------------------------------------------------------------------------
4.1 ADMIN DASHBOARD — /admin/dashboard
--------------------------------------------------------------------------------

STAT CARDS ROW (4 cards, responsive grid):

  Card 1 — آج کے آرڈرز:
    Number: total orders today (count)
    % change vs yesterday: green arrow if up, red arrow if down
    Trend sparkline (small 60px line chart)

  Card 2 — آج کی آمدنی:
    "Rs [total]" (JetBrains Mono, 28px, green)
    % change vs yesterday

  Card 3 — نئے صارفین:
    Count of new users who signed up today

  Card 4 — زیر التوا آرڈرز:
    Count of orders with status = "placed" (not yet accepted)
    Badge: "URGENT" (red pill) if count > 0
    Card border pulses amber if count > 0 (animation: pulseShadow with amber color)

All cards: admin-card background, subtle hover effect, no border by default.
Data from: GET /api/admin/dashboard/stats

PENDING ORDERS ALERT (shown only if pending orders > 0):
  Full-width amber-tinted card
  "⚠️ [X] آرڈرز قبولیت کے منتظر ہیں"
  [ابھی دیکھیں →] button on right → /admin/orders?status=placed

RECENT ORDERS TABLE:
  Title: "حالیہ آرڈرز"
  Table columns:
    آرڈر ID | صارف | آئٹمز | رقم | حالت | وقت | اقدامات

  Each row:
    Order ID: JetBrains Mono, 13px, muted
    Customer: name (Satoshi, 14px)
    Items: "پالک × 2, لیٹس × 1..." (truncated at 40 chars)
    Amount: JetBrains Mono, 14px, green
    Status: pill badge (color per status)
    Time: relative time ("5 منٹ پہلے")
    Actions: 3 buttons in a row:
      [قبول کریں] — small green button (only if status = "placed")
      [مسترد کریں] — small red button (only if status = "placed")
      [تفصیل] — small ghost button → opens right-side panel

  Table is sorted: newest first
  Shows last 20 orders
  Auto-refreshes every 30 seconds

  On [قبول کریں] click:
    PATCH /api/admin/orders/[id]/accept
    Row status badge updates live
    Toast: "آرڈر #TG-XXXX قبول کر لیا گیا"
    Push notification sent to customer: "آپ کا آرڈر قبول ہو گیا!"

  On [مسترد کریں] click:
    Modal: "مسترد کرنے کی وجہ" (optional text input)
    [تصدیق کریں — red button]
    PATCH /api/admin/orders/[id]/reject { reason: "..." }
    Push notification sent to customer: "آپ کا آرڈر مسترد کر دیا گیا"
    If JazzCash: refund note in notification

REVENUE CHART:
  Recharts LineChart
  X axis: last 30 days (date labels)
  Y axis: revenue in Rs
  Line: #4ADE80, 2px stroke
  Area fill: gradient rgba(74,222,128,0.15)→transparent
  Dot on hover: shows tooltip with date + amount
  Data from: GET /api/admin/analytics/revenue?period=30d

LOW STOCK ALERTS:
  Title: "کم دستیاب پروڈکٹس"
  Shows products where isAvailable = false
  Each item: product name + [دستیاب کریں] toggle

--------------------------------------------------------------------------------
4.2 ADMIN ORDER DETAIL — SLIDE-IN RIGHT PANEL
--------------------------------------------------------------------------------

Triggered: clicking [تفصیل] on any order row
Implementation: right-side drawer panel (position fixed, right 0, full height, width 420px)
Animation: translateX(100%)→translateX(0), 350ms ease
Overlay: semi-transparent on left side, click to close

Panel content:
  Header: "آرڈر #TG-XXXX" + ✕ close button

  Status section:
    Current status badge (large pill)
    Status dropdown (admin can manually change):
      Options: Placed → Accepted → Preparing → Out for Delivery → Delivered / Rejected
      On change: PATCH /api/admin/orders/[id]/status { status: "..." }
      Push notification auto-sent to customer on status change

  Customer info:
    Name, phone (tap to call), email

  Items list:
    Each item: image (40px) + name + qty + unit price + line total
    Order total, payment method, payment status

  Delivery address

  Rider assignment:
    Dropdown: shows all active riders
    Pre-selected if already assigned
    On change: PATCH /api/admin/orders/[id]/assign-rider { riderId }
    Toast: "رائیڈر تفویض کر دیا گیا"

  Rejection reason (if rejected): shown in red box

  Created at timestamp + order age

  Action buttons (context-aware):
    If placed:    [قبول کریں] [مسترد کریں]
    If accepted:  [تیاری شروع کریں → Preparing]
    If preparing: [ڈیلیوری پر بھیجیں → Out for Delivery]
    All buttons: make API call + update panel state

--------------------------------------------------------------------------------
4.3 ADMIN ORDERS LIST — /admin/orders
--------------------------------------------------------------------------------

HEADER: "تمام آرڈرز" + [Export CSV] button

FILTER BAR:
  Status filter tabs: [تمام] [زیر التوا] [قبول شدہ] [تیاری] [ڈیلیوری پر] [مکمل] [مسترد]
  Date range picker: from — to
  Search: order ID or customer name
  Payment filter: [JazzCash] [COD]

TABLE (same columns as dashboard recent orders table + additional columns):
  Additional columns:
    ادائیگی طریقہ: JazzCash / COD badge
    رائیڈر: assigned rider name (or "غیر تفویض" muted)

BULK ACTIONS:
  Checkboxes on rows
  On select: bulk action bar appears: [قبول کریں (X)] [برآمد کریں]

PAGINATION: 20 per page, numbered pagination + prev/next

--------------------------------------------------------------------------------
4.4 ADMIN PRODUCT MANAGEMENT — /admin/products
--------------------------------------------------------------------------------

HEADER: "پروڈکٹس" + [+ نیا پروڈکٹ] button

PRODUCTS TABLE:
  Columns: تصویر (60×45) | اردو نام | انگریزی نام | کیٹیگری | قیمت | دستیاب | مشہور | اقدامات

  Actions: [ترمیم] [حذف]
  [ترمیم] → opens full-page edit form (or right panel)
  [حذف] → confirmation modal "کیا آپ اس پروڈکٹ کو حذف کرنا چاہتے ہیں؟" + [تصدیق]

PRODUCT CREATE/EDIT FORM:
  Two sections: Basic Info + Media

  Section 1 — Basic Info:
    اردو نام*: text (Noto Nastaliq Urdu font in input)
    انگریزی نام: text
    اردو تفصیل*: textarea (Nastaliq)
    انگریزی تفصیل: textarea
    کیٹیگری*: dropdown select (loads from /api/categories)
    قیمت*: number input (Rs prefix label, JetBrains Mono)
    اجزاء (اردو): textarea (comma-separated)
    کیلوریز: number
    پروٹین: number (g)
    چکنائی: number (g)
    کاربوہائیڈریٹ: number (g)
    فائبر: number (g)

  Section 2 — Media:
    4 image upload slots (drag-and-drop + click to browse):
      Each slot: shows thumbnail if uploaded, or empty dashed border area
      File accepts: JPG, PNG, WebP, max 5MB each
      Upload on select → POST to storage, get URL back → store URL in form state
      Reorder: drag-and-drop to change image order (image[0] = main image)
    Making process video:
      Single file upload slot
      Accepts: MP4, max 50MB
      OR URL input (YouTube/direct URL)
      Preview: small video player

  Section 3 — Settings:
    دستیاب ہے؟: toggle switch (isAvailable)
    مشہور؟: toggle switch (isFeatured)

  [محفوظ کریں] btn-primary | [منسوخ] btn-ghost
    On save: POST /api/admin/products (new) or PATCH /api/admin/products/[id] (edit)
    Validation: required fields must not be empty
    On success: toast + redirect to products list

--------------------------------------------------------------------------------
4.5 ADMIN CATEGORIES — /admin/categories
--------------------------------------------------------------------------------

List of categories as drag-and-drop sortable list:
  Each row: grab handle ≡ | icon | اردو نام | انگریزی نام | product count | [ترمیم] [حذف]
  Drag to reorder (updates sortOrder)

[+ نئی کیٹیگری] button → modal with:
  اردو نام* | انگریزی نام | Slug* | Icon (emoji or upload)
  [محفوظ کریں]

Slug is auto-generated from English name, editable (kebab-case, URL-safe)

Cannot delete category that has products → show error "X پروڈکٹس اس کیٹیگری میں ہیں"

--------------------------------------------------------------------------------
4.6 ADMIN USER MANAGEMENT — /admin/users
--------------------------------------------------------------------------------

SEARCH BAR: search by name, email, phone

TABLE:
  Columns: نام | ای میل | فون | Coins | آرڈرز | تاریخ | حالت | اقدامات

  Actions per user:
    [تفصیل] → right panel showing full profile + order history + coin transactions
    [Coins تبدیل کریں] → modal with input: "Coins شامل کریں / کاٹیں" + amount + reason
    [بلاک کریں] / [بلاک ہٹائیں] → toggle account active state
      Blocked user: cannot login, gets "آپ کا اکاؤنٹ معطل ہے" on login attempt

User detail panel:
  Avatar, name, email, phone, joined date, language preference
  Coins balance + coin transaction history
  Order history list (last 10, with status)
  [ای میل بھیجیں] link (opens mail client to user's email)

--------------------------------------------------------------------------------
4.7 ADMIN RIDER MANAGEMENT — /admin/riders
--------------------------------------------------------------------------------

IMPORTANT: Riders can ONLY be created from this screen. No self-signup anywhere.

HEADER: "رائیڈرز" + [+ نیا رائیڈر شامل کریں]

[+ نیا رائیڈر] opens modal:
  نام*: text
  ای میل*: email
  پاس ورڈ*: text (admin sets initial password, rider should change it)
  پاس ورڈ تصدیق*: must match
  [بنائیں] → POST /api/admin/riders/create
  insforge.dev account created with role: "rider"
  Rider receives welcome email with credentials

TABLE:
  Columns: نام | ای میل | آج کی ڈیلیوریز | کل ڈیلیوریز | حالت | اقدامات

  Rider status: Active / Inactive toggle
    On deactivate: rider cannot login to /rider/*
  Actions: [تفصیل] [پاس ورڈ ری سیٹ] [حذف]

Rider detail panel:
  Name, email, created date
  Delivery history: list of completed orders
  Today's stats: orders assigned, completed, pending

[پاس ورڈ ری سیٹ] → modal: enter new password for rider (admin-controlled)

--------------------------------------------------------------------------------
4.8 ADMIN COINS MANAGEMENT — /admin/coins
--------------------------------------------------------------------------------

SETTINGS CARD:
  Coin earn rate: [1][%] to [5][%] slider or number input
    Default: 1% (1 coin per Rs 100 order... actually configurable)
    Admin sets the percentage: X% of order value = coins earned per order
    Saved to settings table: key "coin_earn_rate", value "3" (e.g. 3%)
    Bonus rate for JazzCash OTP: always 25% on top of earn rate

  Example calculator (live preview):
    "Rs 500 آرڈر پر: [X] Coins (COD) / [X+25%] Coins (JazzCash + OTP)"

ALL USERS COINS TABLE:
  Columns: صارف | Coins بیلنس | کل کمائے | کل خرچ | آخری لین دین
  Sortable by balance

Per-user actions:
  [تفصیل] → modal: full coin transaction history for user
  [Coins تبدیل کریں] → modal:
    Amount input (positive = add, negative = deduct)
    Reason dropdown: Manual Bonus / Correction / Penalty / Other
    [تصدیق] → PATCH /api/admin/coins/adjust { userId, amount, reason }
    coinTransaction record created with type: "manual"

EXPORT: [CSV برآمد کریں] button for all user balances

--------------------------------------------------------------------------------
4.9 ADMIN PUSH NOTIFICATIONS — /admin/notifications
--------------------------------------------------------------------------------

BROADCAST SECTION:
  Title (Urdu)*: max 60 chars
  Body (Urdu)*: max 160 chars
  Target:
    ● تمام صارفین (broadcast)
    ○ مخصوص صارف (specific user — shows user search dropdown)
    ○ زبان کے مطابق (by language preference: Urdu / English)
  [بھیجیں] button → POST /api/admin/notifications/broadcast { title, body, target }

NOTIFICATION HISTORY TABLE:
  Columns: عنوان | ہدف | بھیجا گیا | کامیاب | ناکام | وقت
  Shows last 50 sent notifications

SYSTEM NOTIFICATIONS (auto-sent, reference):
  These are auto-triggered by order status changes — NOT manually sent:
    Order placed → customer
    Order accepted → customer
    Order rejected → customer (with reason if set)
    Out for delivery → customer
    Delivered → customer (also triggers coins OTP popup flow)

All notifications: stored in notifications table with isRead field
All push notifications: use Web Push API via VAPID keys

--------------------------------------------------------------------------------
4.10 ADMIN DELIVERY SETTINGS — /admin/delivery-settings
--------------------------------------------------------------------------------

Single form:

  تخمینی ڈیلیوری وقت*:
    Dropdown: [20 منٹ] [30 منٹ] [45 منٹ] [60 منٹ] [90 منٹ]
    Or custom number input: ____ منٹ
    Saved to settings: key "delivery_duration_minutes", value "35"
    This value is shown on the order-placed screen countdown timer

  ڈیلیوری علاقہ: "لاہور" (currently fixed, disabled field)

  مفت ڈیلیوری: toggle (currently ON, fixed)

[محفوظ کریں] → PATCH /api/admin/settings (batch update settings keys)
Toast: "ترتیبات محفوظ ہو گئیں"

--------------------------------------------------------------------------------
4.11 ADMIN ANALYTICS — /admin/analytics
--------------------------------------------------------------------------------

Date range filter: [آج] [7 دن] [30 دن] [اس مہینے] [Custom range]

REVENUE SECTION:
  Total revenue (Rs): large number, JetBrains Mono, 36px
  Chart: Recharts LineChart, daily revenue, last 30 days (or selected range)

TOP PRODUCTS:
  Bar chart: top 10 products by order count
  Table view toggle: shows product name + order count + revenue

CATEGORY BREAKDOWN:
  Pie/Donut chart: orders by category
  Legend below

USER METRICS:
  Total registered users
  New users (in range)
  Returning users % 
  Most active users (top 5 by order count)

ORDER STATUS BREAKDOWN:
  Stacked bar chart or donut: placed/accepted/preparing/delivered/rejected counts

All chart data from GET /api/admin/analytics/[endpoint]?from=DATE&to=DATE

--------------------------------------------------------------------------------
4.12 ADMIN CONTENT MANAGEMENT — /admin/content
--------------------------------------------------------------------------------

HERO SECTION (landing page hero):
  اردو headline (all 3 lines, editable individually):
    Line 1: text input (Nastaliq font in input)
    Line 2: text input
    Line 3: text input
  اردو subheadline: text input
  Hero video: file upload (MP4 ≤ 100MB) or URL

BANNERS (app home carousel):
  List of active banners (drag to reorder)
  Each: image preview + title + subtitle + link URL + on/off toggle
  [+ نیا بینر] → modal: image upload, title (Urdu), subtitle (Urdu), CTA link, on/off
  Max 5 banners

BLOG POSTS (/admin/content is split to /admin/blog for blog CRUD):
  Title, slug (auto from title), content (rich text editor, Quill or TipTap),
  cover image, published/draft toggle

[تمام تبدیلیاں محفوظ کریں] → PATCH /api/admin/content batch update

--------------------------------------------------------------------------------
4.13 ADMIN MESSAGES — /admin/messages
--------------------------------------------------------------------------------

Inbox of all customer direct messages

TABLE:
  Columns: صارف | آخری پیغام | وقت | حالت | اقدامات
  Status: [حل ہو گیا ✓] | [زیر التوا]
  Sort: newest unresolved first

On click row → opens chat thread in right panel
  Shows full conversation history
  Admin reply input (text area + send button)
  [حل شدہ نشان کریں] button → marks thread as resolved

Unread badge on sidebar nav item = count of unresolved threads with new messages

--------------------------------------------------------------------------------
4.14 ADMIN SETTINGS — /admin/settings
--------------------------------------------------------------------------------

SITE SETTINGS:
  Site name: "TowerGreens"
  Logo: [موجودہ لوگو دیکھیں] + [نیا لوگو اپلوڈ کریں]
    Note: Logo is set by dev team from logo.png — admin can update via this upload
  Support Email: support@towergreens.site (editable)
  YouTube URL: https://youtube.com/@TowerGreens (editable)

MAINTENANCE MODE:
  Toggle: ON/OFF
  When ON: all public pages show a maintenance screen
    "جلد آ رہے ہیں — TowerGreens" with logo and amber border
    Only /admin/* is accessible
  Saved to settings: key "maintenance_mode" value "true"/"false"

COIN EXPIRY:
  "Coins کی میعاد": number + unit dropdown [دن] [مہینے] [سال]
  Default: 1 سال (1 year)
  Stored as days in settings: key "coin_expiry_days" value "365"
  Expired coins are auto-deducted by a scheduled cron job

ALL SETTINGS stored in settings table as key-value pairs.
Fetched via GET /api/admin/settings
Updated via PATCH /api/admin/settings { updates: [{ key, value }] }

================================================================================
PART 5: RIDER PANEL — FIELD OPERATIONS
================================================================================

/rider/* routes. Accessible ONLY to accounts with role: "rider".
Rider accounts are created ONLY by admin via /admin/riders.
No self-signup path exists anywhere in the UI.

VISUAL IDENTITY: "Field Operations Minimal"
  Theme: Light mode (default — better outdoor sunlight readability)
  Background: #F8FAF8
  Cards: #FFFFFF
  Accent: #16A34A (standard green, not neon)
  Text: #0A1F0E
  Borders: rgba(20,83,45,0.12)
  Touch targets: minimum 56px tall everywhere
  Typography: Satoshi (no Nastaliq except for Urdu UI labels)
  Minimal animations — riders need speed and clarity, not beauty

RIDER LAYOUT:

  Header (fixed top, height 56px):
    Left: TowerGreens logo (small)
    Center: "TowerGreens Rider" (Satoshi 600, 14px, muted)
    Right: [زبان اردو | EN] toggle (saves to localStorage)
  No sidebar. No bottom nav in rider panel.

--------------------------------------------------------------------------------
5.1 RIDER DASHBOARD — /rider/dashboard
--------------------------------------------------------------------------------

HEADER: standard rider header

STATUS BANNER:
  Shows current duty status
  "آن ڈیوٹی 🟢" (active) or "آف ڈیوٹی 🔴"
  [Toggle Duty Status] button (secondary, small): switches status
    PATCH /api/rider/status { isOnDuty: true/false }

TODAY SUMMARY CARD (light green tint):
  "آج کی ڈیلیوریز: [6] مکمل | [2] باقی"
  "کل آرڈرز: [8]"

ASSIGNED ORDERS LIST:
  Heading: "تفویض کردہ آرڈرز"
  Sorted: newest first, pending first (status: out for delivery)

  Each order card (white, border, border-radius 12px, full width):
    Top row:
      Left: order ID (JetBrains Mono, 13px, muted)
      Right: status badge (large pill — "ڈیلیوری پر" orange, "مکمل" green)
    Customer info row:
      Name (Satoshi 600, 16px)
      Phone number: [tap to call link] (tel: link)
    Address: full address text (Satoshi 14px, muted)
    Amount row:
      Left: "Rs [total]" (JetBrains Mono, 18px, green)
      Right: payment badge:
        JazzCash: green border card "JazzCash ✓ ادا شدہ"
        COD: orange border card "نقد وصول کریں"
    [آرڈر دیکھیں →] button: btn-primary, full width, 56px tall → /rider/orders/[id]

COMPLETED ORDERS (at bottom, collapsed accordion):
  Title: "آج مکمل ہوئے — [6]"
  Same card format but greyed out/muted

DATA: GET /api/rider/orders?date=today

--------------------------------------------------------------------------------
5.2 RIDER SINGLE ORDER — /rider/orders/[id]
--------------------------------------------------------------------------------

HEADER: ← Back + "آرڈر #TG-XXXX"

CUSTOMER CARD (prominent, full width):
  Name (large, Satoshi 700, 20px)
  Phone: tap-to-call link (displayed as formatted number, 18px)
    [📞 کال کریں] button: large green, 56px, full width
  Full delivery address (Satoshi 16px, multi-line)
  [📍 نقشے میں دیکھیں] link: opens in Google Maps (opens maps:// or google.com/maps)

ORDER ITEMS CARD:
  Each item: name + quantity + unit price (simple list)
  Total: "کل رقم: Rs [total]" (Satoshi 700, 18px)

PAYMENT CARD:
  Payment method: JazzCash / COD
  If JazzCash: "✓ JazzCash سے ادائیگی ہو چکی ہے" (green, with checkmark)
  If COD: "⚠️ گاہک سے Rs [total] نقد وصول کریں" (amber, warning tone)

DELIVERY ACTION:
  Only shown if order status = "out for delivery" (rider has been assigned and order dispatched)
  [آرڈر ڈیلیور کر دیا ✓] — LARGE green button
    Height: 64px
    Font: Satoshi 700, 18px
    Full width
    On tap: navigate to /rider/otp-verify?orderId=XXXX

  If status = "delivered": show completed state (green card, "مکمل ✓")
  If status = "assigned" (but not yet out for delivery):
    Show muted button + "انتظار کریں — ابھی ڈیلیوری نہیں شروع ہوئی"

--------------------------------------------------------------------------------
5.3 RIDER OTP VERIFICATION — /rider/otp-verify?orderId=XXXX
--------------------------------------------------------------------------------

PURPOSE: Rider verifies delivery by getting OTP from customer.
This OTP was sent to customer's email when status became "out for delivery".
Customer verbally tells the OTP to the rider.

SCREEN (full-screen, clean):
  Header: ← Back + "ڈیلیوری تصدیق"

  Instruction card:
    Large text (Nastaliq, 18px):
      "گاہک سے 8 ہندسوں کا OTP لیں جو ان کے ای میل پر بھیجا گیا ہے"
    Order ID: "#TG-XXXX" (JetBrains Mono, muted)

  OTP INPUT:
    8 large boxes (48px width × 56px height each)
    Grouped visually: [_][_][_][_] — [_][_][_][_]
    Font: JetBrains Mono, 24px
    Auto-advance on digit entry
    Backspace: clear current + move to previous
    Numeric keyboard opens automatically on mobile

  [تصدیق کریں] — btn-primary, large (56px), full width
    Disabled until all 8 digits entered
    Loading state during API call

  Attempt counter:
    "کوشش: [1] / 3" shown below input
    Shown only after first wrong attempt

ON CORRECT OTP:
  API: POST /api/rider/verify-otp { orderId, otp }
  Server:
    1. Finds order by ID
    2. Compares otp (timing-safe compare)
    3. Checks otpExpiresAt (must be in future)
    4. If correct:
       Update order.orderStatus = "delivered"
       Update order.otpUsedAt = now
       Push notification to customer: "آپ کی ڈیلیوری مکمل ہو گئی! 🎉"
         This notification triggers the coins popup on next customer app open
       Response: { success: true }

  UI:
    Full screen green flash (background-color #4ADE80 fades in then out, 1s)
    Checkmark SVG animates in center (draw, 600ms)
    Text: "آرڈر مکمل!" (Satoshi 700, 28px, white)
    After 2s: auto-navigate to /rider/dashboard
    Toast on dashboard: "آرڈر #TG-XXXX مکمل ہو گیا!"

ON WRONG OTP:
  API response: { success: false, attemptsRemaining: 2 }
  UI:
    All 8 input boxes shake (shake keyframe, 500ms)
    All boxes: red border (transition 200ms)
    Below boxes: "غلط OTP — [2] کوششیں باقی ہیں" (red, Satoshi 14px)
    After 1s: boxes clear, borders reset, cursor to first box

ON 0 ATTEMPTS REMAINING:
  API response: { success: false, attemptsRemaining: 0, locked: true }
  Lock screen: all boxes disabled
  "تمام کوششیں ختم — آرڈر مینیجر سے رابطہ کریں"
  [واپس جائیں] button only
  Admin can reset attempts via admin panel or manually update DB

OTP EXPIRY EDGE CASE:
  If otpExpiresAt has passed (24 hours after delivery):
  API returns: { success: false, error: "otp_expired" }
  Show: "OTP ختم ہو گیا — گاہک سے نیا OTP منگوائیں"
  Admin can regenerate OTP from order detail panel

--------------------------------------------------------------------------------
5.4 RIDER PROFILE — /rider/profile
--------------------------------------------------------------------------------

READ-ONLY view (rider cannot edit their own profile — admin manages it):

  Name (Satoshi 700, 20px)
  Email (muted)
  Status: آن ڈیوٹی / آف ڈیوٹی

Stats (summary):
  "کل مکمل ڈیلیوریز: [142]"
  "آج: [6]"
  "یہ ہفتہ: [38]"

[پاس ورڈ تبدیل کریں]: opens form (current password + new + confirm)
[لاگ آؤٹ]: clears session, → /rider/login (or /app/login which routes to rider after auth check)

Language toggle (same as all rider panel pages, header-level): اردو | EN


PART 9: DESIGN NON-NEGOTIABLE RULES
These rules are FINAL. They cannot be adjusted at implementation time.
Any deviation requires explicit written approval.

DARK THEME IS DEFAULT EVERYWHERE.
The dark theme (#080E0A base) is not optional. It IS the TowerGreens brand.
Every page — landing, app, admin, rider — defaults to dark mode.
Exception: Rider panel uses light mode for outdoor readability.
URDU DIRECTION IS ALWAYS LTR.
Every single Urdu text element in the entire platform must have:
direction: ltr;
unicode-bidi: plaintext;
NO EXCEPTIONS. Not a single element. Never rtl, never auto.
This is a display constraint, not a preference.
LANDING PAGE HAS FOOTER. APP HAS NONE.
Landing page: global header + footer required.
Web app: NO footer. Bottom nav bar handles all navigation.
Admin panel: no footer, sidebar nav.
Rider panel: no footer, top header nav.
RIDER ACCOUNTS CANNOT SELF-SIGNUP.
There is no rider signup page anywhere.
Rider accounts are created ONLY by the admin via /admin/riders.
ADMIN PANEL MUST BE FULLY SELF-SUFFICIENT.
Admin never needs to touch insforge.dev dashboard.
Every data management operation has a UI in /admin/*.
JAZZCASH AND COD ARE THE ONLY PAYMENT METHODS.
No other payment gateway. No credit card forms. No IBAN.
COINS WORK ONLY WITH JAZZCASH.
Coins can be earned on COD orders (base rate only).
Coins CANNOT be spent on COD orders.
Coins can only be spent via JazzCash payment.
LOGO IS SACRED.
Only use logo.png from the project folder.
Never replace, never regenerate, never modify.
NO LOCATION DISCLOSED.
TowerGreens' physical address is never shown anywhere on the platform.
"لاہور" is mentioned only as the delivery city (not a specific address).
FONTS ARE MANDATORY.
All 4 fonts must be installed and used correctly:
Satoshi → UI/body
DM Serif Display → English display/headings
Noto Nastaliq Urdu → ALL Urdu text
JetBrains Mono → numbers, codes, OTP, prices