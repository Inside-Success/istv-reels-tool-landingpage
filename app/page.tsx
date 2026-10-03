import Image from "next/image";
import DownloadSelector from "./download-selector";

const PLUGIN_REPO = "Inside-Success/istv-reels-tool-landingpage";
const CUTSHEET_REPO = "Inside-Success/istv-documentary-cutsheet-downloads";
const CUTSHEET_RELEASE_TAG = "v1.2.1";

async function latestPluginVersion(): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${PLUGIN_REPO}/releases/latest`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!response.ok) return null;
    const { tag_name: tag } = (await response.json()) as { tag_name?: string };
    return tag?.replace(/^plugin-/, "").replace(/^v/, "") || null;
  } catch {
    return null;
  }
}

async function latestCutSheetRelease(): Promise<{ version: string; url: string } | null> {
  const repo = process.env.CUTSHEET_RELEASE_REPO || CUTSHEET_REPO;
  if (!repo || !/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(repo)) return null;
  try {
    const tag = process.env.CUTSHEET_RELEASE_TAG || CUTSHEET_RELEASE_TAG;
    const endpoint = tag ? `tags/${encodeURIComponent(tag)}` : "latest";
    const response = await fetch(`https://api.github.com/repos/${repo}/releases/${endpoint}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const release = await response.json() as {
      tag_name?: string; assets?: { name: string; browser_download_url: string }[];
    };
    const asset = release.assets?.find((item) => item.name === "ISTV-Documentary-Cut-Sheet.zip");
    const prefix = `https://github.com/${repo}/releases/download/`;
    if (!release.tag_name || !asset?.browser_download_url.startsWith(prefix)) return null;
    return { version: release.tag_name.replace(/^v/, ""), url: asset.browser_download_url };
  } catch {
    return null;
  }
}

const steps = [
  { number: "01", title: "Choose the job", detail: "Short-form reels, documentary assemblies, or transcript review." },
  { number: "02", title: "Work where you edit", detail: "Use the desktop app or stay inside Premiere Pro." },
  { number: "03", title: "Keep control", detail: "Every sequence stays editable and ready for an editor to refine." },
];

export default async function Home() {
  const [pluginVersion, cutSheetRelease] = await Promise.all([latestPluginVersion(), latestCutSheetRelease()]);

  return (
    <main id="top">
      {/* ── Navbar ── */}
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Inside Success TV home">
          <Image
            src="https://insidesuccesstv.com/wp-content/uploads/2026/06/Inside-Success-Logo-1024x147.png"
            alt="Inside Success TV"
            width={200}
            height={29}
            unoptimized
            priority
          />
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#top" className="nav-active">PLATFORM</a>
          <a href="#how-it-works">HOW IT WORKS</a>
          <a href="#tools">TOOLS</a>
          <a href="#download" className="nav-download">Get the tool</a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">EDITOR TOOLS</p>
          <h1 id="hero-title">ANY FOOTAGE.<br />ANY FORMAT.</h1>
          <p className="hero-description">
            One provider abstraction layer across Reels Desktop,
            Reels for Premiere and Documentary Cut Sheet. Switch per
            project, or per edit.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#download">
              Get the tool
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a className="secondary-link" href="#tools">
              Compare the tools
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <div className="hero-stat-label">TOOLS<br />AVAILABLE</div>
              <div className="hero-stat-value">3</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </div>
              <div className="hero-stat-label">PLATFORMS<br />SUPPORTED</div>
              <div className="hero-stat-value">Mac + Win</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94L6.73 20.2a2.12 2.12 0 01-3-3l6.73-6.73A6 6 0 0114.7 6.3z"/></svg>
              </div>
              <div className="hero-stat-label">PREMIERE<br />INTEGRATION</div>
              <div className="hero-stat-value">2021+</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <div className="hero-stat-label">WORKFLOW<br />TYPE</div>
              <div className="hero-stat-value">API First</div>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="product-frame">
            <div className="product-frame-header">
              <span className="frame-live-badge">
                <span className="frame-live-dot" />
                LIVE · ISTV EDITOR
              </span>
              <span className="frame-meta">TOOLS / 003</span>
            </div>
            <div className="product-image">
              <Image
                src="/hero-ai-editor.png"
                alt="Preview of the ISTV video editing experience"
                fill
                sizes="(max-width: 900px) 92vw, 49vw"
                priority
              />
            </div>
            <div className="product-frame-footer">
              <span>Purpose-built tools for the edit.</span>
              <span>ISTV</span>
            </div>
          </div>
          <div className="documentary-callout">
            <span>NEW · PREMIERE PRO</span>
            <strong>Documentary Cut Sheet</strong>
            <small>XLSX → synced footage → editable assembly</small>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="steps-section" id="how-it-works" aria-labelledby="steps-heading">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-header-text">
              <p className="section-label">ABSTRACTION LAYER</p>
              <h2 id="steps-heading">ONE TOOLKIT.<br /><em>THREE JOBS.</em></h2>
            </div>
            <div>
              <p className="section-header-desc">
                Every tool implements the same editorial contract — transcripts,
                markers, sequences, and exports. Change one field to change the workflow.
              </p>
              <ul className="section-header-checks">
                <li><span className="check-icon">✓</span> Unified editorial pipeline</li>
                <li><span className="check-icon">✓</span> Per-project tool selection</li>
                <li><span className="check-icon">✓</span> Full Premiere Pro integration</li>
                <li><span className="check-icon">✓</span> Editable output on every job</li>
              </ul>
            </div>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <article className="step" key={step.number}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools (dark section) ── */}
      <section className="tools-section" id="tools" aria-labelledby="tools-heading">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-header-text">
              <p className="section-label">THREE TOOLS</p>
              <h2 id="tools-heading">BUILT FOR<br />CONTROL.</h2>
            </div>
            <div>
              <p className="section-header-desc">
                A clean separation from footage to final cut. Every decision
                stays with the editor.
              </p>
              <ul className="section-header-checks">
                <li><span className="check-icon">✓</span> Desktop and Premiere workflows</li>
                <li><span className="check-icon">✓</span> Short-form and documentary</li>
                <li><span className="check-icon">✓</span> Captions and reframing built in</li>
                <li><span className="check-icon">✓</span> XLSX-driven documentary assembly</li>
              </ul>
            </div>
          </div>

          <div className="tools-grid">
            <article className="tool-item">
              <div className="tool-topline">
                <span className="tool-number">01</span>
                <span className="tool-badge">Mac + Windows</span>
              </div>
              <h3>Reels desktop app</h3>
              <p>Transcribe footage, surface strong short-form moments, and export a clear plan before opening an edit.</p>
              <ul><li>Best for reviewing footage</li><li>Runs outside Premiere Pro</li></ul>
              <a href="#download">Choose Reels desktop →</a>
            </article>
            <article className="tool-item">
              <div className="tool-topline">
                <span className="tool-number">02</span>
                <span className="tool-badge">Premiere 2021+</span>
              </div>
              <h3>Reels for Premiere</h3>
              <p>Build editable vertical reel sequences with cuts, reframing, and captions already placed in your project.</p>
              <ul><li>Best for social video</li><li>Premiere Pro 2021+</li></ul>
              <a href="#download">Choose Reels for Premiere →</a>
            </article>
            <article className="tool-item" id="documentary">
              <div className="tool-topline">
                <span className="tool-number">03</span>
                <span className="tool-badge">Premiere 25.6+</span>
              </div>
              <h3>Documentary Cut Sheet</h3>
              <p>Import the documentary team&apos;s XLSX, align recording time to synced footage, review every quote, and build markers or an editable assembly.</p>
              <ul><li>Best for long-form documentary</li><li>One ZIP for Mac and Windows</li></ul>
              {cutSheetRelease
                ? <a className="tool-download" href={cutSheetRelease.url}>Download Cut Sheet v{cutSheetRelease.version}</a>
                : <a href="#download">View Cut Sheet details →</a>}
            </article>
          </div>

          <div className="features-bar">
            <div className="feature-pill">
              <div className="feature-pill-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div className="feature-pill-text">
                <strong>NO LOCK-IN</strong>
                <small>Switch tools per project</small>
              </div>
            </div>
            <div className="feature-pill">
              <div className="feature-pill-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <div className="feature-pill-text">
                <strong>EDITABLE OUTPUT</strong>
                <small>Sequences you can refine</small>
              </div>
            </div>
            <div className="feature-pill">
              <div className="feature-pill-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="feature-pill-text">
                <strong>EDITOR CONTROL</strong>
                <small>Every cut is yours to keep</small>
              </div>
            </div>
            <div className="feature-pill">
              <div className="feature-pill-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </div>
              <div className="feature-pill-text">
                <strong>CROSS PLATFORM</strong>
                <small>Mac and Windows</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Download ── */}
      <section className="download-section" id="download" aria-labelledby="download-heading">
        <div className="download-copy">
          <p className="section-label">DOWNLOAD THE RIGHT TOOL</p>
          <h2 id="download-heading">What are you<br /><em>making today?</em></h2>
          <p>Select the job first. We&apos;ll show the correct installer, system requirements, and setup steps.</p>
          <span className="download-side-note">Documentary Cut Sheet is a separate Premiere Pro plugin from ISTV Reels.</span>
        </div>
        <DownloadSelector pluginVersion={pluginVersion} cutSheetRelease={cutSheetRelease} />
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <a className="footer-brand" href="https://insidesuccesstv.com/" target="_blank" rel="noreferrer">INSIDE SUCCESS TV<span>.</span></a>
        <p>Tools for the stories worth sharing.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
