# Vimmie — a dating app disguised as a design portfolio

React + Vite + Framer Motion.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173. `npm run build` makes an optimised production build in `dist/`.

## Edit content

Everything you'd want to change lives in **`src/content/site.js`**:

- `profile`: name, age, location, headline, intro, photo
- `links`: email, LinkedIn, Instagram, Behance and the resume PDF. An empty value shows a friendly "coming soon" message instead of a broken link.
- `heroPrompts`, `twoTruths`: Hinge-style prompts
- `tools`, `interests`, `greenFlags`: the Green Flags toy box (add any tool as a monogram tile; see the comment above `tools`)
- `projects`, `featuredWork`: the folders. Set `thumbnail` (image in `public/projects/`) and `href` (case study) per project
- `match`: the swipe deck cards and the match screen copy
- `footer`: closing line, chat bubble and the link list

## Page structure

Hero (profile card) → Green Flags (physics toy box) → Featured Work (stacking folders) → It's a match (swipe deck + match modal) → Footer.
Every like a visitor taps is remembered for the session (`src/components/likes/LikesContext.jsx`) and shows up on the match screen and in the email draft.
- `projects`: featured work (title, tagline, tags, link, thumbnail)
- `microcopy`: toasts and small UI lines

The resume lives at `public/Vimla-Issar-Resume.pdf`. To update it, replace that file (keep the name), or change `links.resume`. Every Resume button opens a small menu with **View** (new tab) and **Download**.

## Pixel cursor

`src/components/cursor/PixelCursor.jsx`. Any element can opt into a cursor state:

```html
<a data-cursor="open" data-cursor-label="OPEN FILE">…</a>
```

States: `default`, `hand`, `like`, `open`, `connect`, plus `left` / `right` during swipes (`setCursorSwipe('left')`).
It only replaces the cursor on devices with a fine, hovering pointer; touch stays native, and reduced-motion turns off the trail, lag and particles.

Sprites are pixel art written as text in `src/components/pixel/PixelSprite.jsx`, so they're easy to redraw.
