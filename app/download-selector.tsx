"use client";

import { useEffect, useState } from "react";

type Product = "desktop" | "premiere";
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

export default function DownloadSelector({ pluginVersion }: { pluginVersion: string | null }) {
  const [product, setProduct] = useState<Product>("desktop");
  const [platform, setPlatform] = useState<Platform>("mac");
  const [macChip, setMacChip] = useState<MacChip>("arm64");

  useEffect(() => {
    if (/Windows/i.test(navigator.userAgent)) setPlatform("windows");
  }, []);

  const choice = platform === "windows" ? "windows" : macChip;
  const url = files[product][choice];
  const fileName = url.split("/").at(-1);
  const isPremiere = product === "premiere";

  return (
    <div className="download-panel">
      <p className="selector-kicker">YOUR DOWNLOAD / 01</p>
      <fieldset className="selector-group">
        <legend>Which tool?</legend>
        <div className="choice-row">
          <label className={product === "desktop" ? "choice active" : "choice"}>
            <input type="radio" name="product" checked={product === "desktop"} onChange={() => setProduct("desktop")} />
            <span>Desktop app</span>
          </label>
          <label className={isPremiere ? "choice active" : "choice"}>
            <input type="radio" name="product" checked={isPremiere} onChange={() => setProduct("premiere")} />
            <span>Premiere Pro panel</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="selector-group">
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
      </fieldset>

      {platform === "mac" && (
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
        <span>SELECTED FILE</span>
        <strong>{fileName}</strong>
      </div>
      <a className="download-action" href={url}>
        Download {isPremiere ? "Premiere panel" : "desktop app"} <span aria-hidden="true">↗</span>
      </a>
      <p className="download-fineprint">
        {isPremiere ? (
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
