"use client";

import type { ReactNode } from "react";

export type Product = "desktop" | "premiere" | "cutsheet";

export const PICK_EVENT = "istv:pick-product";

// A tool card link: jumps to that tool's download card and makes it glow.
export default function DownloadLink({ product, className, children }: {
  product: Product;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      className={className}
      href={`#dl-${product}`}
      onClick={() => window.dispatchEvent(new CustomEvent<Product>(PICK_EVENT, { detail: product }))}
    >
      {children}
    </a>
  );
}