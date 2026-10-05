"use client";

import type { ReactNode } from "react";

export type Product = "desktop" | "premiere" | "cutsheet";

export const PICK_EVENT = "istv:pick-product";

// A tool card link: jumps to the download section with that tool already
// selected, so the editor lands on the right installer instead of the default.
export default function DownloadLink({ product, className, children }: {
  product: Product;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      className={className}
      href="#download"
      onClick={() => window.dispatchEvent(new CustomEvent<Product>(PICK_EVENT, { detail: product }))}
    >
      {children}
    </a>
  );
}
