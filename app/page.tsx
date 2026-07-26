const features = [
  {
    title: "AI transcription",
    detail:
      "Speech-to-text with speaker detection across video, audio, and podcast files up to 2 hours — no setup required.",
    action: "Transcribe a file",
  },
  {
    title: "Reel moment detection",
    detail:
      "Automatically finds hook segments, key quotes, topic shifts, and high-energy moments ready for social cuts.",
    action: "Find best moments",
  },
  {
    title: "Instant exports",
    detail:
      "PDF reports, CSV spreadsheets, and clip previews generated directly from your transcript in seconds.",
    action: "Export outputs",
  },
];

const timeline = [
  { date: "00:00", label: "Upload", meta: "Video, audio, podcast" },
  { date: "00:30", label: "Transcribe", meta: "Speech-to-text, speakers" },
  { date: "01:10", label: "Analyze", meta: "Moments, topics, quotes" },
  { date: "02:00", label: "Export", meta: "PDF, CSV, clip list" },
];

const workflow = [
  "Transcript editor",
  "Reel detection",
  "Speaker labels",
  "PDF export",
  "CSV reports",
  "Clip preview",
];

const gallery = [
  "PDF Report",
  "CSV Export",
  "Clip Preview",
  "Reel List",
];

// See istv-reel-editor-desktop for the release process. These filenames are
// version-less and stable (electron-builder `artifactName`), so the
// `releases/latest/download/...` links keep resolving across every release.
const DESKTOP_REPO = "Inside-Success/istv-reel-editor-desktop";

// The Premiere Pro panel is released on THIS repo, not on the plugin's own repo.
// That repo is private (it holds the reel-selection prompts), and GitHub release
// assets inherit repo visibility — so links to a private repo's assets 404 for
// anonymous visitors. Publishing the zips here keeps the download public while the
// source stays private.
//
// The bundles carry no secret. The backend URL is baked in, but the access token is
// not: each editor enters that once in the panel and it is saved on their own
// machine. That is what makes a public download safe.
//
// Asset names are version-less, so `releases/latest/download/...` keeps resolving
// across future plugin releases without editing this file.
const PLUGIN_REPO = "Inside-Success/istv-reels-tool-landingpage";

const WindowsGlyph = (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
    <path d="M3 5.1 10.2 4v7.05H3zM11.15 3.87 21 2.5v8.55h-9.85zM3 12.55h7.2V19.6L3 18.5zM11.15 12.55H21V21.5l-9.85-1.36z" />
  </svg>
);

const AppleGlyph = (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
    <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 3-.76.9-2 1.6-3.02 1.52-.14-1.1.44-2.26 1.1-3 .74-.84 2.02-1.48 3.04-1.52zM20.5 17.2c-.5 1.16-.74 1.68-1.4 2.7-.9 1.44-2.18 3.22-3.76 3.24-1.4.02-1.76-.92-3.66-.9-1.9.01-2.3.92-3.7.9-1.58-.02-2.8-1.64-3.7-3.08-2.52-4.02-2.78-8.74-1.22-11.24 1.1-1.78 2.84-2.82 4.48-2.82 1.66 0 2.7.92 4.08.92 1.34 0 2.16-.92 4.08-.92 1.46 0 3 .8 4.1 2.18-3.6 1.98-3.02 7.12.4 8.32z" />
  </svg>
);

const downloads: {
  os: string;
  tag: string;
  ext: string;
  href: string;
  platform: "windows" | "apple";
  sha256?: string;
}[] = [
  {
    os: "Windows",
    tag: "64-bit",
    ext: ".exe installer",
    href: `https://github.com/${DESKTOP_REPO}/releases/latest/download/ISTV-Reel-Editor-Setup.exe`,
    platform: "windows",
  },
  {
    os: "macOS",
    tag: "Apple Silicon",
    ext: ".dmg · M1 and newer",
    href: `https://github.com/${DESKTOP_REPO}/releases/latest/download/ISTV-Reel-Editor-arm64.dmg`,
    platform: "apple",
  },
  {
    os: "macOS",
    tag: "Intel",
    ext: ".dmg · Intel Macs",
    href: `https://github.com/${DESKTOP_REPO}/releases/latest/download/ISTV-Reel-Editor-x64.dmg`,
    platform: "apple",
  },
];

// Premiere Pro panel (CEP extension). Same card shape as `downloads` above so the
// existing download-grid styles apply unchanged.
const pluginDownloads: typeof downloads = [
  {
    os: "Windows",
    tag: "64-bit",
    ext: ".zip · double-click install.bat",
    href: `https://github.com/${PLUGIN_REPO}/releases/latest/download/ISTV-Reel-Tool-win-x64.zip`,
    platform: "windows",
  },
  {
    os: "macOS",
    tag: "Apple Silicon",
    ext: ".zip · M1 and newer",
    href: `https://github.com/${PLUGIN_REPO}/releases/latest/download/ISTV-Reel-Tool-mac-arm64.zip`,
    platform: "apple",
  },
  {
    os: "macOS",
    tag: "Intel",
    ext: ".zip · Intel Macs",
    href: `https://github.com/${PLUGIN_REPO}/releases/latest/download/ISTV-Reel-Tool-mac-x64.zip`,
    platform: "apple",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Inside Success AI home">
          <span className="brand-mark">IS</span>
          <span>Inside Success AI</span>
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#download">Download</a>
          <a href="#download-plugin">Premiere plugin</a>
        </div>
        <a className="nav-cta" href="#download">
          Download free
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">AI video analysis tool</p>
          <h1>Raw footage to reel-ready content.</h1>
          <p className="hero-copy">
            ISTV Reels Tool transcribes your video and audio, detects the best
            moments, and exports PDFs, spreadsheets, and clip lists — so your
            team spends time editing, not watching.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#download">
              Download free
            </a>
            <a className="button secondary" href="#features">
              View features
            </a>
          </div>
        </div>

        <div className="clip-strip" aria-label="Output preview samples">
          {["Transcript ready", "12 reels found", "PDF exported"].map((item) => (
            <article className="clip-card" key={item}>
              <span className="play-dot" aria-hidden="true" />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section timeline-section" aria-labelledby="timeline">
        <div className="container">
          <div className="section-heading">
            <span aria-hidden="true" />
            <h2 id="timeline">From upload to export in minutes</h2>
          </div>
          <div className="timeline">
            {timeline.map((item) => (
              <article className="timeline-item" key={item.label}>
                <strong>{item.date}</strong>
                <h3>{item.label}</h3>
                <p>{item.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section feature-grid" id="features">
        <div className="container feature-layout">
          <div className="feature-visual" aria-hidden="true">
            <div className="editor-panel preview-panel">
              <div className="panel-topbar">
                <span>Interview 12.mp4</span>
                <strong>Analyzed</strong>
              </div>
              <div className="preview-stage">
                <div className="video-frame">
                  <div className="play-dot large" />
                  <p>Founder interview</p>
                </div>
                <div className="score-card">
                  <span>Key moments</span>
                  <strong>18</strong>
                </div>
              </div>
              <div className="clip-ruler">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="editor-panel transcript-panel">
              <div className="mini-panel-header">
                <span>AI transcript</span>
                <strong>Auto-corrected</strong>
              </div>
              <p className="quote-line">
                The product sold out in 48 hours.
              </p>
              <div className="suggestion-list">
                <span>Hook at 00:12</span>
                <span>Key quote at 02:34</span>
                <span>CTA moment at 04:10</span>
              </div>
            </div>
            <div className="editor-panel timeline-panel">
              <div className="timeline-header">
                <span>Export queue</span>
                <strong>PDF</strong>
                <strong>CSV</strong>
                <strong>Clips</strong>
              </div>
              <div className="edit-track">
                <span className="clip clip-red" />
                <span className="clip clip-cyan" />
                <span className="clip clip-dark" />
              </div>
              <div className="caption-row">
                <span>Transcript synced</span>
                <span>Reports ready</span>
              </div>
            </div>
          </div>
          <div className="feature-copy">
            <div className="section-heading">
              <span aria-hidden="true" />
              <h2>Built for teams who publish every week</h2>
            </div>
            <p>
              Drop in a video or podcast and get a full transcript, a ranked
              list of reel moments, and export-ready reports — without touching
              a timeline editor.
            </p>
            <a className="button primary" href="#download">
              Download free
            </a>
          </div>
        </div>
      </section>

      <section className="section cards-section" id="workflow">
        <div className="container">
          <div className="section-heading centered">
            <span aria-hidden="true" />
            <h2>AI analysis with full output control</h2>
          </div>
          <div className="cards">
            {features.map((feature, index) => (
              <article className={`info-card card-${index + 1}`} key={feature.title}>
                <p className="card-kicker">0{index + 1}</p>
                <h3>{feature.title}</h3>
                <p>{feature.detail}</p>
                <a href="#download">{feature.action}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section workflow-band" aria-label="Tool capabilities">
        <div className="container workflow-track">
          {workflow.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section download-section" id="download">
        <div className="container">
          <div className="section-heading centered">
            <span aria-hidden="true" />
            <h2>Download the desktop app</h2>
          </div>
          <p className="download-sub">
            Free to use. Requires backend connection. Available for Windows and macOS.
          </p>
          <div className="download-grid">
            {downloads.map((d) => (
              <a className="download-card" href={d.href} key={`${d.os}-${d.tag}`} target="_blank" rel="noreferrer">
                <span className="download-icon" aria-hidden="true">
                  {d.platform === "apple" ? AppleGlyph : WindowsGlyph}
                </span>
                <strong className="download-os">{d.os}</strong>
                <span className="download-tag">{d.tag}</span>
                <span className="download-ext">{d.ext}</span>
                <span className="download-btn">Download</span>
                {d.sha256 ? (
                  <span className="download-sha" title={`SHA-256: ${d.sha256}`}>
                    <span className="download-sha-label">SHA-256</span>
                    {d.sha256.slice(0, 10)}…{d.sha256.slice(-10)}
                  </span>
                ) : null}
              </a>
            ))}
          </div>
          <p className="download-note">
            Releases published on{" "}
            <a href={`https://github.com/${DESKTOP_REPO}/releases`} target="_blank" rel="noreferrer">
              GitHub Releases
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section download-section" id="download-plugin">
        <div className="container">
          <div className="section-heading centered">
            <span aria-hidden="true" />
            <h2>Or work inside Premiere Pro</h2>
          </div>
          <p className="download-sub">
            The ISTV Reel Tool panel builds each reel as an editable 9:16 sequence in your own
            Premiere project — the cuts, vertical reframe and karaoke captions already in place.
            You finish and export in Premiere, exactly as you would any other edit.
          </p>
          <div className="download-grid">
            {pluginDownloads.map((d) => (
              <a
                className="download-card"
                href={d.href}
                key={`plugin-${d.os}-${d.tag}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="download-icon" aria-hidden="true">
                  {d.platform === "apple" ? AppleGlyph : WindowsGlyph}
                </span>
                <strong className="download-os">{d.os}</strong>
                <span className="download-tag">{d.tag}</span>
                <span className="download-ext">{d.ext}</span>
                <span className="download-btn">Download</span>
              </a>
            ))}
          </div>
          <p className="download-note">
            Requires Adobe Premiere Pro 2021 (15.0) or newer. Unzip, double-click{" "}
            <strong>install.bat</strong> (Windows) or <strong>install.command</strong> (Mac), then
            open <strong>Window ▸ Extensions ▸ ISTV Reel Tool</strong>. FFmpeg is bundled — nothing
            else to install. The panel asks for an access token once on first run; ask your admin
            for it.
          </p>
          <p className="download-note">
            Releases published on{" "}
            <a href={`https://github.com/${PLUGIN_REPO}/releases`} target="_blank" rel="noreferrer">
              GitHub Releases
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section gallery-section" id="exports">
        <div className="container">
          <div className="section-heading centered">
            <span aria-hidden="true" />
            <h2>Every output from one upload</h2>
          </div>
          <div className="gallery-frame">
            <div className="gallery-main">
              <div>
                <p className="eyebrow">Single upload</p>
                <h3>Full transcript, reel list, PDF report, and CSV — all from one file.</h3>
              </div>
              <div className="metric-grid">
                <strong>10×</strong>
                <span>faster content review</span>
                <strong>4</strong>
                <span>export formats</span>
              </div>
            </div>
            <div className="gallery-list">
              {gallery.map((item) => (
                <article key={item}>
                  <span />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section demo-section" id="demo">
        <div className="container demo-panel">
          <div>
            <p className="eyebrow">Inside Success AI</p>
            <h2>Analyze your footage before the next team standup.</h2>
          </div>
          <a className="button primary" href="#download">
            Download free
          </a>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top" aria-label="Inside Success AI home">
          <span className="brand-mark">IS</span>
          <span>Inside Success AI</span>
        </a>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#download">Download</a>
          <a href="#exports">Exports</a>
        </div>
        <p>© 2026 Inside Success AI. Built for teams who publish video every day.</p>
      </footer>
    </main>
  );
}
