// The package's example images: cards drawn by cardEl and cardSlot, rendered by classes/render_images.py in headless Chrome.
import { cardEl, cardSlot } from "../implementation/web/cards.ts";
import type { CardSettings } from "../implementation/web/card-model.ts";

type Scene = { name: string; caption: string; width: number; height: number; look?: string; render: (root: HTMLElement) => void };

function row(root: HTMLElement, gap = 14): HTMLElement {
  const line = document.createElement("div");
  Object.assign(line.style, { display: "flex", gap: `${gap}px`, alignItems: "center", justifyContent: "center", flexWrap: "wrap" });
  root.append(line);
  return line;
}

function centred(root: HTMLElement): void {
  Object.assign(root.style, { display: "flex", flexDirection: "column", gap: "28px", alignItems: "center", justifyContent: "center", padding: "24px" });
}

const spread = ["As", "Kh", "Qd", "Jc", "Ts", "9h", "7d", "4c", "2s"];

function hand(settings: Partial<CardSettings>): (root: HTMLElement) => void {
  return (root) => {
    centred(root);
    const top = row(root);
    for (const code of ["As", "Kh", "Td", "7c"]) top.append(cardEl(code, { width: 96, settings }));
    top.append(cardEl(null, { width: 96, settings }), cardEl(null, { width: 96, settings }));
    const board = row(root, 10);
    for (const code of ["Qs", "Jh", "3d"]) board.append(cardEl(code, { width: 72, settings }));
    board.append(cardSlot(72, settings.cornerStyle), cardSlot(72, settings.cornerStyle));
  };
}

export const scenes: Scene[] = [
  { name: "hand-night", caption: "Faces, striped backs and empty board slots in the night look", width: 960, height: 480, look: "night", render: hand({ backStyle: "stripes" }) },
  { name: "hand-lounge", caption: "The same cards with plain backs in the lounge look", width: 960, height: 480, look: "lounge", render: hand({ backStyle: "plain" }) },
  {
    name: "corners-and-sizes", caption: "Rounded, soft and square corners at three widths", width: 960, height: 520, look: "night",
    render: (root) => {
      centred(root);
      for (const cornerStyle of ["rounded", "soft", "square"] as const) {
        const line = row(root);
        for (const [i, width] of [44, 64, 88].entries()) line.append(cardEl(spread[i * 3], { width, settings: { cornerStyle } }), cardEl(null, { width, settings: { cornerStyle } }));
      }
    },
  },
  {
    name: "every-rank", caption: "Ranks from ace to two in all four suits, with dimmed cards that cannot be played", width: 1200, height: 560, look: "night",
    render: (root) => {
      centred(root);
      for (const suit of ["s", "h", "d", "c"]) {
        const line = row(root, 8);
        for (const rank of ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]) line.append(cardEl(rank + suit, { width: 60, dim: suit === "c" && "2345".includes(rank) }));
      }
    },
  },
];
