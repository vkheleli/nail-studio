# Design Brief

## Direction
Premium nail salon portfolio with gallery-forward, magazine-like aesthetic. Rose-mauve elegance with cream grounds. Showcase-driven: large hero image, curated grid, soft luxury surfaces.

## Tone
Sophisticated, meticulous, trustworthy. Editorial, not trendy. High-confidence curation.

## Palette

| Token | Light | Dark |
|-------|-------|------|
| Primary | `49 0.22 354` (rose-mauve) | `72 0.18 354` (bright mauve) |
| Secondary | `92 0.04 82` (warm cream) | `20 0.02 354` (deep cool) |
| Accent | `62 0.16 28` (blush) | `75 0.14 28` (warm blush) |
| Background | `98 0.02 276` (off-white) | `12 0.01 354` (near-black) |
| Foreground | `20 0.02 354` (dark mauve) | `94 0.02 82` (near-white) |
| Border | `92 0.03 82` | `24 0.01 354` |

## Typography
**Display**: Fraunces (serif, editorial, elegant headings) — H1/H2 only. **Body**: DM Sans (clean, modern, readable). **Mono**: Geist Mono (metadata, code).

## Zones
- **Header**: `bg-card` with `border-b border-border`, sticky. Brand name left, nav menu center, admin login right.
- **Hero**: Full-width curated image with `surface-elevated` shadow, soft focus treatment.
- **Service Cards**: Horizontal scrolling, `bg-card`, `surface-card` shadow, soft `rounded-lg`, padding-dense.
- **Gallery**: Responsive grid (3 cols desktop, 2 tablet, 1 mobile), card-based, hover scale, `surface-card` shadow.
- **Nail Techs Grid**: Responsive card grid (1 col mobile, 2 tablet, 3 desktop), `bg-card`, `surface-card` shadow, with name/location/specialties. "Book Now" button with shimmer accent CTA.
- **Booking Form Modal**: Overlay modal, `bg-card`, form inputs with `border-input`, focus `ring-1 ring-ring`. Date picker (no past dates), time picker, customer name, phone, service selector. Submit button primary-color with shimmer.
- **Contact Footer**: `bg-secondary` or alternating `bg-muted/20`, `border-t`, address/phone/social stacked.

## Spacing & Rhythm
Mobile-first. 16px base grid. Dense cards (tight padding 12-16px), generous outer margins (24-32px). Breathing room between major zones.

## Component Patterns
- **Buttons**: Primary (rose-mauve bg, cream text), Secondary (cream bg, mauve text). No pill shape — `rounded-lg`.
- **Cards**: Always `surface-card` shadow, `bg-card`, `rounded-lg`. Image overlays: subtle dark gradient (0 transparency → `rgba(0,0,0,0.15)`).
- **Gallery**: Lightbox overlay with dark backdrop `backdrop-blur-sm`.
- **Form**: Input `border border-input`, focus ring `ring-1 ring-ring`.

## Motion
Smooth transitions (`transition-smooth` 0.3s) on hover, focus, active. No bounce or playful animations. Fade entries for modals/overlays.

## Constraints
- No rounded-full (pill shapes).
- No harsh shadows (max `surface-elevated`).
- No pure black text on white — use `text-foreground` (slight mauve tint).
- No rainbow gradients — stick to mauve/blush/cream palette.
- Avoid dark mode saturation oversaturation — maintain refinement.

## Signature Detail
**Shimmer accent**: Subtle gradient pulse on CTAs and accent text (mauve → transparent → mauve). Reinforces polish/shimmer aesthetic of nails.
