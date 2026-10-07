"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { PICK_EVENT, type Product } from "./download-link";

type Platform = "windows" | "mac";
type CutSheetRelease = { version: string; url: string } | null;

const DESKTOP_REPO = "Inside-Success/istv-reel-editor-desktop";
const PLUGIN_REPO = "Inside-Success/istv-reels-tool-landingpage";
const d = (repo: string, f: string) => `https://github.com/${repo}/releases/latest/download/${f}`;

const files = {
  desktop: [
    { os: "windows", label: "Windows", note: "64-bit installer", url: d(DESKTOP_REPO, "ISTV-Reel-Editor-Setup.exe") },
    { os: "mac", label: "Mac, Apple Silicon", note: "M1 or newer", url: d(DESKTOP_REPO, "ISTV-Reel-Editor-arm64.dmg") },
    { os: "mac", label: "Mac, Intel", note: "Older Macs", url: d(DESKTOP_REPO, "ISTV-Reel-Editor-x64.dmg") },
  ],
  premiere: [
    { os: "windows", label: "Windows", note: "64-bit ZIP", url: d(PLUGIN_REPO, "ISTV-Reel-Tool-win-x64.zip") },
    { os: "mac", label: "Mac, Apple Silicon", note: "M1 or newer", url: d(PLUGIN_REPO, "ISTV-Reel-Tool-mac-arm64.zip") },
    { os: "mac", label: "Mac, Intel", note: "Older Macs", url: d(PLUGIN_REPO, "ISTV-Reel-Tool-mac-x64.zip") },
  ],
} as const;

const subscribe = () => () => {};
const browserPlatform = (): Platform | null => /Windows/i.test(navigator.userAgent) ? "windows" : /Mac/i.test(navigator.userAgent) ? "mac" : null;
const serverPlatform = (): Platform | null => null;

function FileRow({ label, note, url, mine }: { label: string; note: string; url: string; mine: boolean }) {
  return (
    <a className={mine ? "file-row mine" : "file-row"} href={url} download>
      <span className="file-text">
        <strong>{label}{mine && <em>Your computer</em>}</strong>
        <small>{note} · {url.split("/").at(-1)}</small>
      </span>
      <span className="file-go" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 4v11m-4.5-4.5L12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </a>
  );
}

export default function DownloadSelector({ pluginVersion, cutSheetRelease }: {
  pluginVersion: string | null;
  cutSheetRelease: CutSheetRelease;
}) {
  const [picked, setPicked] = useState<Product | null>(null);
  const platform = useSyncExternalStore(subscribe, browserPlatform, serverPlatform);

  // Tool cards above pick a product; its download card glows when you land here.
  useEffect(() => {
    const pick = (event: Event) => {
      setPicked(null);
      requestAnimationFrame(() => setPicked((event as CustomEvent<Product>).detail));
    };
    window.addEventListener(PICK_EVENT, pick);
    return () => window.removeEventListener(PICK_EVENT, pick);
  }, []);

  const cls = (p: Product, extra = "") => `glass dl-card${extra}${picked === p ? " picked" : ""}`;

  return (
    <div className="dl-grid">
      <article className={cls("desktop")} id="dl-desktop" aria-labelledby="dl-desktop-h">
        <header className="dl-head">
          <h3 id="dl-desktop-h">Reels desktop app</h3>
          <span className="chip">Standalone</span>
        </header>
        <p className="dl-sum">Find reel moments outside Premiere.</p>
        <div className="file-list">
          {files.desktop.map((f) => <FileRow key={f.url} {...f} mine={f.os === platform} />)}
        </div>
        <ul className="dl-notes">
          <li>Needs a connection to the ISTV backend.</li>
          <li>Your browser may ask you to confirm a download from GitHub.</li>
        </ul>
      </article>

      <article className={cls("premiere")} id="dl-premiere" aria-labelledby="dl-premiere-h">
        <header className="dl-head">
          <h3 id="dl-premiere-h">Reels for Premiere</h3>
          <span className="chip">{pluginVersion ? `v${pluginVersion}` : "Premiere 2021+"}</span>
        </header>
        <p className="dl-sum">Build vertical reels inside Premiere Pro.</p>
        <div className="file-list">
          {files.premiere.map((f) => <FileRow key={f.url} {...f} mine={f.os === platform} />)}
        </div>
        <ol className="dl-notes steps">
          <li>Unzip, then run <code>install.bat</code> on Windows or <code>install.command</code> on Mac.</li>
          <li>Restart Premiere and open Window, Extensions, ISTV Reel Tool.</li>
          <li>Enter the access token from your admin. This panel does not update itself.</li>
        </ol>
      </article>

      <article className={cls("cutsheet", " dl-dark")} id="dl-cutsheet" aria-labelledby="dl-cutsheet-h">
        <header className="dl-head">
          <h3 id="dl-cutsheet-h">Documentary Cut Sheet</h3>
          <span className="chip chip-glow">{cutSheetRelease ? `Beta v${cutSheetRelease.version}` : "Beta"}</span>
        </header>
        <p className="dl-sum">A separate Premiere plugin, not the Reels panel. One ZIP for Windows and Mac.</p>
        <div className="file-list">
          {cutSheetRelease
            ? <FileRow label="Windows and Mac" note="Premiere Pro 25.6+" url={cutSheetRelease.url} mine={false} />
            : <p className="file-empty" role="status">The Cut Sheet download is not published yet. Check back soon, or ask your admin for the beta build.</p>}
        </div>
        <ol className="dl-notes steps">
          <li>Needs Premiere Pro 25.6+ and Creative Cloud Desktop.</li>
          <li>Unzip and open the included <code>.ccx</code> file.</li>
          <li>Find it under Window, UXP Plugins, ISTV Documentary Cut Sheet.</li>
          <li>Voice-over needs a team token from your admin. Later updates install from Check Update in the panel.</li>
        </ol>
      </article>
    </div>
  );
}