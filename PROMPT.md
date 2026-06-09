CRITICAL INSTRUCTION — READ BEFORE ANYTHING ELSE:
You have access to the reference image "homepage-reference.png".
Your ONLY job is to REPRODUCE this image as a pixel-perfect HTML/CSS page.
Do NOT interpret it. Do NOT simplify it. Do NOT "get inspired by it".
Do NOT make creative choices. Every color, every font size, every spacing,
every icon shape, every layout proportion must match the reference EXACTLY.
If you are unsure about a detail, zoom into the reference image and match it.
There is no room for approximation. The final result must be visually
indistinguishable from homepage-reference.png when viewed in a browser.

IMPORTANT: The reference image is located at assets/homepage-reference.png
Open it and study it carefully before writing any code.
Reproduce it pixel-perfectly.
---

## REFERENCE IMAGE
File: homepage-reference.png
→ This is your ground truth. Match it pixel by pixel.

## PROVIDED ASSETS
- assets/lfm-logo.svg → used in navbar, exact position as in reference
- assets/enfants-cm2.png → used in hero section, exact position/size as in reference

---

## FILE STRUCTURE TO GENERATE
- index.html
- styles.css (linked externally in index.html)
All SVG icons must be coded inline. No icon library. No placeholder images.

---

## FONT
Google Fonts — Montserrat, weights: 400, 600, 700, 800, 900
Import it at the top of styles.css.

---

## COLOR PALETTE — EXACT VALUES, DO NOT DEVIATE
- Navy:       #1a2b5e
- Red:        #c8102e
- Background: #f5f0eb  (warm off-white, used everywhere as page bg)
- White:      #ffffff
- Text gray:  #555555

---

## SECTION 1 — NAVBAR
Reproduce exactly as visible in reference:
- White background
- Left: lfm-logo.svg (height 55px) + "LYCÉE FRANÇAIS DE MADRID" uppercase, 
  Montserrat 800, 18px, #1a2b5e, letter-spacing 1px, flex row, gap 14px, vertically centered
- Right: hamburger icon — 3 horizontal bars:
    top bar:    #c8102e
    middle bar: #1a2b5e
    bottom bar: #c8102e
  Each bar: width 28px, height 3px, border-radius 2px, gap 5px between bars
- Navbar padding: 18px 48px
- Below navbar: full-width line, height 3px, background #c8102e

---

## SECTION 2 — HERO
CSS Grid: left 45% / right 55%. Background #f5f0eb. Padding: 50px 60px 0 60px.

### HERO LEFT:
Position relative. Contains:

1. DOT GRID (position: absolute, top: 0, left: 0):
   5 columns × 5 rows = 25 dots. Each dot: 7px circle.
   Top-left 3×3 block (9 dots): fill #1a2b5e
   Remaining 16 dots (right 2 cols + bottom 2 rows): fill #c8102e
   Gap between dots: 7px
   Reproduce the exact two-color dot pattern visible in the reference.

2. MAIN HEADING (margin-top: 60px to clear dots):
   Line 1 — "BIENVENUE":        Montserrat 900, 60px, #1a2b5e, line-height 1.05
   Line 2 — "SUR TON":          Montserrat 900, 60px, #1a2b5e, line-height 1.05
   Line 3 — "ESPACE D'APPRENTISSAGE !": Montserrat 900, 54px, #c8102e, line-height 1.05

3. SUBTITLE (margin-top: 18px):
   "Des ressources adaptées pour apprendre,
   s'entraîner et progresser en toute confiance."
   Montserrat 400, 15px, #555, line-height 1.65

4. GRADE BADGE (margin-top: 22px):
   Pill shape: background #1a2b5e, border-radius 30px, padding 11px 26px, display inline-block
   Content: "CM1 • CM2 • 6ÈME"
   The bullet "•" characters must be colored #c8102e — use <span> tags for them
   Text: Montserrat 800, 14px, white, letter-spacing 1px

5. FEATURE LIST (margin-top: 28px):
   4 rows. Each row: red checkmark + text. No bullet list — use div rows.
   Checkmark: "✓", color #c8102e, font-weight 700, margin-right 10px
   Text: Montserrat 600, 15px, #333
   Row gap: 10px
   Items:
   - "Des leçons claires"
   - "Des exercices variés"
   - "Des jeux pour réviser"
   - "Des défis pour aller plus loin"

### HERO RIGHT:
Position relative. Overflow visible.

1. IMAGE "enfants-cm2.png":
   Position: bottom-right of the hero column
   Width: ~68% of right column, no border-radius, object-fit cover
   Bottom-aligned (align-self: end on the grid or absolute bottom:0 right:0)

2. FLOATING DECORATIVE ICONS (position absolute, SVG inline, navy stroke #1a2b5e, 
   stroke-width 2px, no fill unless specified):
   Reproduce EXACTLY the icons visible in reference at their exact relative positions:

   A. PAPER AIRPLANE — top-left zone of right column (~15% from left, 5% from top)
      Simple origami plane shape, pointing top-right, size ~40px

   B. LIGHTBULB — top-center (~48% from left, 3% from top)
      Classic bulb outline with rays around it, size ~44px

   C. "E = mc²" TEXT — top-right (~78% from left, 6% from top)
      Not an icon — actual HTML text: font-style italic, Montserrat 700, 20px, #1a2b5e

   D. CHEMISTRY FLASK — far right (~92% from left, 18% from top)
      Erlenmeyer flask outline, red liquid fill at bottom (#c8102e at 30% opacity), size ~48px

   E. GLOBE — bottom-right (~88% from left, 55% from top)
      Circle with latitude/longitude lines, size ~50px

   F. SCATTERED DOTS — 4 small circles (5px), 2 in #c8102e, 2 in #1a2b5e,
      placed randomly around the icons area matching reference positions

---

## SECTION 3 — SUBJECT CARDS
Full width. Background #f5f0eb. Padding: 40px 60px 60px. 
CSS Grid: 5 equal columns, gap 20px.

Each card — exact structure:
- Background: white
- Border-radius: 14px
- Box-shadow: 0 4px 20px rgba(0,0,0,0.07)
- Padding: 40px 20px 30px
- Text-align: center
- Bottom colored accent bar: height 4px, width 100%, border-radius 0 0 14px 14px

Bottom bar colors (match reference exactly):
  Card 1 Français:       #1a2b5e
  Card 2 Mathématiques:  #c8102e
  Card 3 Sciences:       #1a2b5e
  Card 4 Histoire:       #c8102e
  Card 5 Informatique:   #1a2b5e

Inside each card (top to bottom):
  1. SVG ICON — 64×64px, stroke #1a2b5e, stroke-width 2.5, no fill
     Reproduce each icon exactly as drawn in the reference:

     FRANÇAIS: Open book, two pages, spine in center, 
               red bookmark ribbon hanging from bottom-center (#c8102e filled triangle)

     MATHÉMATIQUES: Square calculator face, 2×2 grid inside with math symbols:
               top-left ÷, top-right +, bottom-left ×, bottom-right ÷
               Grid lines in navy, symbols in #c8102e

     SCIENCES: Erlenmeyer flask (conical), liquid inside in red (#c8102e),
               bubbles above liquid (3 small circles)

     HISTOIRE: Greek temple / columns — 3 vertical pillars on a base,
               triangular pediment on top, all navy stroke

     INFORMATIQUE: Laptop outline — screen rectangle + keyboard base,
               red mouse cursor arrow on screen (#c8102e filled)

  2. CARD TITLE — uppercase text:
     Montserrat 800, 13px, #1a2b5e, letter-spacing 1.5px, margin-top 18px
     "FRANÇAIS" / "MATHÉMATIQUES" / "SCIENCES" / "HISTOIRE" / "INFORMATIQUE"

  3. RED UNDERLINE — width 38px, height 3px, background #c8102e, 
     margin: 10px auto, border-radius 2px

  4. "Accéder →" BUTTON:
     Background #1a2b5e, color white, border-radius 25px
     Padding: 10px 30px, font Montserrat 700, 13px
     Margin-top: 22px, border: none, cursor pointer
     Hover state: background #c8102e, transition: background 0.2s ease

---

## SECTION 4 — FOOTER DISCLAIMER
Background #f5f0eb. Padding: 22px 60px.
Top border: 1px solid #ddd.
Layout: flex row, align-items center, justify-content center, gap 20px

Left decorative line: flex-grow 1, height 1px, background #1a2b5e, opacity 0.3
Center block (text):
  - Small leaf icon SVG (18px, #1a2b5e stroke, no fill) to the left of text
  - Line 1: "Cet espace est conçu comme un support ponctuel d'entraînement 
             et de consolidation des apprentissages,"
  - Line 2: "dans le respect d'un " 
             + <span style="color:#c8102e; font-weight:700">usage mesuré</span> 
             + " des écrans."
  - Font: Montserrat 400, 13px, #555, text-align center, line-height 1.7
Right decorative line: same as left line

---

## RESPONSIVE (secondary priority — nail desktop first)
At 768px: hero becomes single column, cards become 2-col grid
At 480px: cards become 1 column

---

## FINAL CHECKLIST BEFORE DELIVERING
Before you output any code, re-examine homepage-reference.png and verify:
☑ Navbar matches — logo size, text, hamburger icon with red/navy bars
☑ Hero heading — 3 lines, correct colors, correct font sizes
☑ Dot grid — correct two-color pattern (navy top-left, red bottom-right)
☑ Grade badge — dark pill, red bullet dots, correct text
☑ Feature list — 4 items, red checkmarks
☑ Hero image — bottom-right aligned, correct proportions
☑ All 5 floating icons present at correct positions
☑ 5 subject cards — correct icons, titles, colored bottom bars, buttons
☑ Footer — leaf icon, two lines of text, "usage mesuré" in red bold
☑ Overall background color #f5f0eb throughout
☑ No icon library used — all SVG inline
☑ Only the two provided assets used (lfm-logo.svg, enfants-cm2.png)

REMINDER: The deliverable is a browser page that someone could place 
next to homepage-reference.png and see NO difference.
1. IMAGE "enfants-cm2.png":
   Position: bottom-right of the hero column
   Width: ~68% of right column, no border-radius, object-fit cover
   Bottom-aligned (align-self: end on the grid or absolute bottom:0 right:0)

   BACKGROUND BLENDING — CRITICAL:
   The image background must blend seamlessly into the page background (#f5f0eb).
   Do NOT display the image as a hard-edged rectangle.
   Implement ALL of the following techniques together:

   1. CSS MASK — apply a gradient mask that fades the image edges into transparency:
      -webkit-mask-image: linear-gradient(
        to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%
      ),
      linear-gradient(
        to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%
      );
      -webkit-mask-composite: destination-in;
      mask-composite: intersect;
      → Left edge: image fades from opaque (right) to transparent (left)
      → Top edge: image fades from transparent (top) to opaque (15% down)
      → Result: the children photo appears to emerge naturally 
        from the #f5f0eb background with no visible border

   2. OVERLAY GRADIENT — place a <div> absolutely on top of the image,
      same dimensions, pointer-events none, z-index 1:
      background: linear-gradient(
        to right, #f5f0eb 0%, transparent 35%
      );
      → Reinforces the left-side fade so the image melts into the hero text area

   3. mix-blend-mode: multiply on the <img> tag
      → Eliminates any remaining white/light halo from the photo background
      → Works because page background is #f5f0eb (light warm tone)

   4. The overall effect must match the reference image exactly:
      the children and laptop are clearly visible on the right,
      while the left side of the photo dissolves completely 
      into the warm beige background, with no hard edge, no shadow, 
      no rectangle outline visible anywhere.