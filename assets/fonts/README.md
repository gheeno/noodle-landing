# Fonts

Self-hosted so the page makes no third-party requests and renders identically
offline. Latin subset only (`U+0000-00FF`), woff2, ~42 KB total.

| File | Family | Weight | Used for |
|---|---|---|---|
| `press-start-2p-400.woff2` | Press Start 2P | 400 | wordmark, buttons, headings, chrome |
| `chakra-petch-400.woff2` | Chakra Petch | 400 | body copy |
| `chakra-petch-600.woff2` | Chakra Petch | 600 | nav, tagline |
| `chakra-petch-700.woff2` | Chakra Petch | 700 | tagline emphasis |

Both families are licensed under the SIL Open Font License 1.1 — full text and
copyright holders in [`OFL.txt`](OFL.txt).

To refresh them, re-download the latin subset from Google Fonts:

```
https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Chakra+Petch:wght@400;600;700&display=swap
```

and keep only the `@font-face` blocks whose `unicode-range` contains
`U+0000-00FF`. The `@font-face` declarations live at the top of
`assets/css/styles.css`.
