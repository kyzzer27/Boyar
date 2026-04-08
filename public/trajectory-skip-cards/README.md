# Trajectory skip cards (`card-1.png` … `card-4.png`, `card-5-orange.png`)

Processed with `npm run trajectory-cards:strip-margins` (`scripts/trajectory-cards-remove-white-margins.js`).

**How it works:** **Edge flood-fill** — only pixels connected to the image border through light/neutral “paper” pixels are made transparent. Saturated card colors block the flood, so **white text on the card stays opaque** (the old global luminance rule wrongly removed white text).

After replacing art, copy files here and re-run the command. Tune `isFloodableMargin` in the script if a border is too soft or a margin doesn’t clear.
