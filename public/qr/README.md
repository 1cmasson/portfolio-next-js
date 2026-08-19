# `/qr` — the QR code for the contact card

A scannable code pointing at `/hi`, plus the source files to print it from.

The page lives at `src/app/(card)/qr/page.tsx` — in the `(card)` route group, so it inherits
`card.css` and the pop-art theme instead of the cosmic-terminal chrome. These two files are
the printable artifacts; the page loads `qr.svg` with `<img>` rather than inlining it, so the
displayed code and the download can never drift apart.

## Files

| File | Purpose |
|---|---|
| `qr.svg` | Vector QR. Black modules on an **opaque** white rect, 4-module quiet zone. The file to print, laser, or import into CAD. |
| `qr.png` | 1024×1024 raster of the same code, for slides and chat. |

## What it encodes

```
https://carlosmasson.netlify.app/hi
```

No trailing slash — Netlify 308-redirects `/hi/` to `/hi`, so this is the canonical form and
scanners skip a hop.

## Regenerating

Both files are regenerated, never edited. `node-qrcode` via `npx`, so nothing is installed into
this project as a dependency:

```bash
URL="https://carlosmasson.netlify.app/hi"
npx -y qrcode -t svg -e M -q 4 -l FFFFFFFF -d 000000FF -o public/qr/qr.svg "$URL"
npx -y qrcode -t png -e M -q 4 -w 1024 -l FFFFFFFF -d 000000FF -o public/qr/qr.png "$URL"
```

- `-e M` — 15 % error correction. Enough for a scuffed print; bump to `H` only if you ever
  overlay a logo, which costs you version headroom.
- `-q 4` — the 4-module quiet zone the spec requires. Cropping it is the most common way a
  printed QR stops scanning.
- `-l FFFFFFFF` — light color at **full alpha**. A transparent background inverts on dark
  surfaces (dark filament, a black slide) and the code dies.

Then verify the payload actually round-trips — a rendered QR that looks fine can encode the
wrong string:

```bash
cd "$(mktemp -d)" && npm init -y >/dev/null && npm i jsqr pngjs >/dev/null
node -e '
const fs=require("fs"),{PNG}=require("pngjs"),jsQR=require("jsqr");
const p=PNG.sync.read(fs.readFileSync(process.argv[1]));
console.log(jsQR(new Uint8ClampedArray(p.data),p.width,p.height).data);
' /path/to/portfolio-next-js/public/qr/qr.png
```

For the SVG, rasterize first: `rsvg-convert -w 1024 public/qr/qr.svg -o /tmp/svg.png`, then
decode that.

## Changing the domain

Two halves, and doing only one leaves the page displaying an address the code doesn't go to:

1. **`src/app/(card)/qr/page.tsx`** — the target URL shown under the code and the QR's `alt`
   text are plain text; update both.
2. **`qr.svg` / `qr.png`** — `sed` cannot reach these; the URL lives in the module pattern.
   Re-run both commands above with the new `$URL`, re-run the decode check, and **reprint
   anything already handed out**.

Next serves `public/` assets with a short cache by default, so the swap propagates on the next
deploy.
