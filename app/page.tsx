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

// See istv-reel-editor-desktop/README.md for the release process. These
// filenames must match the asset names actually published on the latest
// GitHub release (electron-builder names them with dots + build version).
const DESKTOP_REPO = "Inside-Success/istv-reel-editor-desktop";

const downloads: {
  os: string;
  ext: string;
  href: string;
  sha256?: string;
}[] = [
  {
    os: "Windows",
    ext: ".exe installer",
    href: `https://github.com/${DESKTOP_REPO}/releases/latest/download/ISTV.Reel.Editor.Setup.0.1.0.exe`,
  },
  {
    os: "macOS",
    ext: "Apple Silicon (.dmg)",
    href: `https://github.com/${DESKTOP_REPO}/releases/latest/download/ISTV.Reel.Editor-0.1.0-arm64.dmg`,
    sha256: "ca7ec782dad5741a356c7ce356fad274b828f607ef817b49f025b28096f9425d",
  },
  {
    os: "macOS",
    ext: "Universal — Intel & Apple Silicon (.dmg)",
    href: `https://github.com/${DESKTOP_REPO}/releases/latest/download/ISTV.Reel.Editor-0.1.0-universal.dmg`,
    sha256: "494ad3993ddc39bb3b7d343e3b5989d6c92b8f31e6cda91425789ab7faff0534",
  },
  {
    os: "Linux",
    ext: ".AppImage — coming soon",
    href: `https://github.com/${DESKTOP_REPO}/releases`,
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
            Free to use. Requires backend connection. Available for Windows, macOS, and Linux.
          </p>
          <div className="download-grid">
            {downloads.map((d) => (
              <a className="download-card" href={d.href} key={`${d.os}-${d.ext}`} target="_blank" rel="noreferrer">
                <strong className="download-os">{d.os}</strong>
                <span className="download-ext">{d.ext}</span>
                <span className="download-btn">Download</span>
                {d.sha256 ? (
                  <code className="download-sha" title={`SHA-256: ${d.sha256}`}>
                    SHA-256 {d.sha256}
                  </code>
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
