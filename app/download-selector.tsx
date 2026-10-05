"use client";

import { useState, useSyncExternalStore } from "react";

type Product = "desktop" | "premiere" | "cutsheet";
type Platform = "windows" | "mac";
type MacChip = "arm64" | "x64";

const DESKTOP_REPO = "Inside-Success/istv-reel-editor-desktop";
const PLUGIN_REPO = "Inside-Success/istv-reels-tool-landingpage";

const files = {
  desktop: {
    windows: `https://github.com/${DESKTOP_REPO}/releases/latest/download/ISTV-Reel-Editor-Setup.exe`,
    arm64: `https://github.com/${DESKTOP_REPO}/releases/latest/download/ISTV-Reel-Editor-arm64.dmg`,
    x64: `https://github.com/${DESKTOP_REPO}/releases/latest/download/ISTV-Reel-Editor-x64.dmg`,
  },
  premiere: {
    windows: `https://github.com/${PLUGIN_REPO}/releases/latest/download/ISTV-Reel-Tool-win-x64.zip`,
    arm64: `https://github.com/${PLUGIN_REPO}/releases/latest/download/ISTV-Reel-Tool-mac-arm64.zip`,
    x64: `https://github.com/${PLUGIN_REPO}/releases/latest/download/ISTV-Reel-Tool-mac-x64.zip`,
  },
};

const subscribeToPlatform = () => () => {};
const browserPlatform = (): Platform => /Windows/i.test(navigator.userAgent) ? "windows" : "mac";
const serverPlatform = (): Platform => "mac";

type CutSheetRelease = { version: string; url: string } | null;

export default function DownloadSelector({ pluginVersion, cutSheetRelease }: {
  pluginVersion: string | null;
  cutSheetRelease: CutSheetRelease;
}) {
  const [product, setProduct] = useState<Product>("desktop");
  const detectedPlatform = useSyncExternalStore(subscribeToPlatform, browserPlatform, serverPlatform);
  const [chosenPlatform, setPlatform] = useState<Platform | null>(null);
  const platform = chosenPlatform ?? detectedPlatform;
  const [macChip, setMacChip] = useState<MacChip>("arm64");

  const choice = platform === "windows" ? "windows" : macChip;
  const isCutSheet = product === "cutsheet";
  const url = isCutSheet ? cutSheetRelease?.url : files[product][choice];
  const fileName = url?.split("/").at(-1);
  const isPremiere = product === "premiere";

  return (
    <div className="download-panel">
      <p className="selector-kicker">CHOOSE YOUR WORKFLOW</p>
      <fieldset className="selector-group">
        <legend>What do you want to make?</legend>
        <div className="choice-row product-choices">
          <label className={product === "desktop" ? "choice active" : "choice"}>
            <input type="radio" name="product" checked={product === "desktop"} onChange={() => setProduct("desktop")} />
            <span className="choice-index">01</span>
            <span className="choice-copy"><strong>Find reel moments</strong><small>Reels desktop · Standalone app</small></span>
            <span className="choice-meta">Mac + Windows</span>
          </label>
          <label className={isPremiere ? "choice active" : "choice"}>
            <input type="radio" name="product" checked={isPremiere} onChange={() => setProduct("premiere")} />
            <span className="choice-index">02</span>
            <span className="choice-copy"><strong>Build a vertical reel</strong><small>Reels for Premiere · Short form</small></span>
            <span className="choice-meta">Premiere 2021+</span>
          </label>
          <label className={isCutSheet ? "choice active cutsheet-choice" : "choice cutsheet-choice"}>
            <input type="radio" name="product" checked={isCutSheet} onChange={() => setProduct("cutsheet")} />
            <span className="choice-index">03</span>
            <span className="choice-copy"><strong>Build a documentary assembly</strong><small>Documentary Cut Sheet · Premiere plugin</small></span>
            <span className="choice-meta">Premiere 25.6+</span>
          </label>
        </div>
        <p className="field-hint" aria-live="polite">
          {isCutSheet ? "Import an XLSX cut sheet, sync its recording times, and build a multicam assembly with ElevenLabs voice-over."
            : isPremiere ? "Create vertical reels with reframing and captions inside Premiere Pro."
            : "Transcribe footage and find reel moments in the standalone app."}
        </p>
      </fieldset>

      {!isCutSheet && <fieldset className="selector-group">
        <legend>Your computer</legend>
        <div className="choice-row">
          <label className={platform === "mac" ? "choice active" : "choice"}>
            <input type="radio" name="platform" checked={platform === "mac"} onChange={() => setPlatform("mac")} />
            <span>macOS</span>
          </label>
          <label className={platform === "windows" ? "choice active" : "choice"}>
            <input type="radio" name="platform" checked={platform === "windows"} onChange={() => setPlatform("windows")} />
            <span>Windows</span>
          </label>
        </div>
      </fieldset>}

      {!isCutSheet && platform === "mac" && (
        <fieldset className="selector-group chip-group">
          <legend>Mac processor</legend>
          <div className="choice-row">
            <label className={macChip === "arm64" ? "choice active" : "choice"}>
              <input type="radio" name="mac-chip" checked={macChip === "arm64"} onChange={() => setMacChip("arm64")} />
              <span>Apple Silicon <small>M1 or newer</small></span>
            </label>
            <label className={macChip === "x64" ? "choice active" : "choice"}>
              <input type="radio" name="mac-chip" checked={macChip === "x64"} onChange={() => setMacChip("x64")} />
              <span>Intel Mac</span>
            </label>
          </div>
          <p className="field-hint">Not sure? On your Mac, open Apple menu → About This Mac.</p>
        </fieldset>
      )}

      <div className="selection-result" aria-live="polite">
        <span>{isCutSheet ? "DOCUMENTARY PLUGIN" : "SELECTED FILE"}</span>
        <strong>{fileName ?? "Cut Sheet beta download coming soon"}</strong>
      </div>
      {url ? <a className="download-action" href={url}>
        Download {isCutSheet ? "Documentary Cut Sheet" : isPremiere ? "Reels for Premiere" : "Reels desktop"}
      </a> : <p className="field-hint" role="status">The Cut Sheet download is not available yet. Please check back soon.</p>}
      <p className="download-fineprint">
        {isCutSheet ? (
          <>
            <strong>This is the documentary workflow plugin—not the Reels panel.</strong> One ZIP works on Windows and macOS.
            Requires Premiere Pro 25.6+ and Creative Cloud Desktop. Unzip, open the included .ccx, then find it under Window → UXP Plugins → ISTV Documentary Cut Sheet. Voice-over needs a team token from your admin. Later updates install from the panel’s Check Update button.
            {cutSheetRelease ? <> Current beta: v{cutSheetRelease.version}.</> : null}
          </>
        ) : isPremiere ? (
          <>
            Requires Premiere Pro 2021 or newer. Unzip and run <strong>{platform === "windows" ? "install.bat" : "install.command"}</strong>, then restart Premiere and open Window → Extensions → ISTV Reel Tool. You’ll need an access token from your admin. The panel does not update itself.
            {pluginVersion ? <> Current release: v{pluginVersion}.</> : null}
          </>
        ) : (
          <>The desktop app requires a connection to the ISTV backend. Your browser may ask you to confirm a download from GitHub Releases.</>
        )}
      </p>
    </div>
  );
}
