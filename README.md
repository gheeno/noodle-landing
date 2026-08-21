<p align="center">
  <img src="assets/img/noodle-bowl-hot.svg" alt="Noodle — pixel-art ramen bowl, steaming hot" width="320">
</p>

# noodle-landing

The landing page for the **Noodle test framework** — 80s synthwave / cyberpunk,
with an animated pixel-art bowl of very hot ramen in the foreground.

> **Noodle framework** — a capability for AI and humans to generate
> deterministic tests using plain English BDD.

Framework itself: [gheeno/noodle](https://github.com/gheeno/noodle).

---

## What's here

```
index.html                        the whole page
assets/css/styles.css             scene, CRT overlay, layout, type
assets/js/main.js                 CRT power-on + pointer parallax (no deps)
assets/img/noodle-bowl-hot.svg    the logo — pixel art, self-animating
assets/img/guy-eating-ramen.svg   the desk scene — pixel art, self-animating
assets/img/og-cover.png           1200×630 social card
assets/img/favicon.svg
assets/fonts/                     self-hosted woff2 (SIL OFL), latin subset
tools/og-card.html                source for the social card (not part of the site)
```

Static. No build step, no framework, no third-party requests at runtime.

## Run it

Any static server will do:

```bash
python3 -m http.server 8000
# → http://127.0.0.1:8000
```

Opening `index.html` over `file://` works too, though some browsers block the
self-hosted fonts under that scheme.

## Deploying to GitHub Pages

Live at **<https://gheeno.github.io/noodle-landing/>**.

Pages is set to *Deploy from a branch* → `main`, folder `/ (root)`, so every push
to `main` republishes. `.nojekyll` is committed so the `assets/` tree is served
verbatim — without it Jekyll would swallow the fonts.

The social card is a static render of the hero, not a live screenshot. Its
source is `tools/og-card.html` — the same stylesheet the hero uses, laid out as
a fixed 1200×630 plate — so re-exporting it keeps the card and the page in step:

```bash
python3 -m http.server 8000
chrome --headless --force-prefers-reduced-motion \
       --window-size=1200,630 --screenshot=assets/img/og-cover.png \
       http://127.0.0.1:8000/tools/og-card.html
```

`--force-prefers-reduced-motion` is what makes the export deterministic: it
freezes the steam, the float and the halo pulse instead of catching whatever
frame the screenshot lands on. The absolute URLs in the `og:` tags are tied to
the Pages domain, so they need updating if the site moves.

---

## The bowl

`assets/img/noodle-bowl-hot.svg` is a redraw of the Noodle README bowl on the
same 12&nbsp;px pixel grid and the same palette — the ramen, the chopsticks and
the pixel-lettered `NOODLE` on the bowl face are unchanged, so it stays the
same mark. What's new is that it's *hot*:

- **Four steam wisps** — pixel columns that rise, widen and fade on staggered
  loops (4.1s–6.2s), so the plume never visibly repeats. They're painted
  *behind* the chopsticks, which keeps the sticks crisp through the vapour.
- **Heat haze** — a warm ellipse over the broth on `mix-blend-mode: screen`,
  breathing on a 2.8s loop.
- **Bubbling hot spots** — amber pixels flickering on the broth surface with
  `steps()` timing, so they pop rather than fade.
- **Neon rim light** — magenta key from the left, cyan fill from the right,
  plus a magenta/violet outer glow, to seat it in the synthwave scene.

Everything is CSS inside the SVG, so it animates as a plain `<img>` with no
JavaScript. `prefers-reduced-motion: reduce` freezes it.

## The scene

The background is one `position: fixed` layer — gradient sky, banded sun,
mountain ridge, skyline, scrolling perspective grid, drifting colour haze —
blurred as a whole with `filter: blur(13px)` and overscanned by 8% so the
blurred edges stay off-screen. Above it sits a *sharp* CRT layer (scanlines +
vignette), and the content sits above that. Nothing in the foreground is
blurred, so the pixel art stays hard-edged against a soft background.

`prefers-reduced-motion: reduce` disables the grid scroll, the haze drift, the
float, the halo pulse and the power-on wipe.

## The desk scene

The page closes on `assets/img/guy-eating-ramen.svg` — a developer in glasses
eating a bowl of ramen while his suite goes green behind him. Same 12&nbsp;px
grid and same palette as the logo, so the bowl on the desk *is* the bowl in the
mark, just sized for a desk.

It runs on one 3.6s loop that every moving part reads a slice of:

- **the eat cycle** — the chopsticks dip into the bowl, rise to his mouth, hold,
  and dip again. The clump of noodles only exists between the grab and the
  slurp, so he isn't holding food on the way down.
- **the strand** — pays out of the bowl as the sticks rise, then vanishes on the
  slurp. It's keylined in dark brown, or it disappears against his face on the
  way past it.
- **the mouth** — one slurp then two chews, swapped with `steps(1)` between a
  shut mouth and an open one, rather than tweened.
- **the head** leans in for the slurp and back out after it.

Everything else runs free of that loop: steam wisps on 4.1s–5.7s, heat shimmer
over the broth, a scanline crawling down the CRT, a blinking cursor on the last
green line, a glint sweeping across both lenses, and a blink about every six
seconds.

The whole thing is CSS inside the SVG, so it animates as a plain `<img>` with no
JavaScript, exactly like the logo. `prefers-reduced-motion: reduce` freezes it
with the mouth shut and the steam held at low opacity. The desk fades out at the
bottom instead of ending on a floor line, so the page's own scene shows through.

## Licence

Page code: see [`LICENSE`](LICENSE).
Bundled fonts: SIL OFL 1.1, see [`assets/fonts/OFL.txt`](assets/fonts/OFL.txt).
