import Image from "next/image";
import DownloadSelector from "./download-selector";

const PLUGIN_REPO = "Inside-Success/istv-reels-tool-landingpage";
const CUTSHEET_REPO = "Inside-Success/istv-documentary-cutsheet-downloads";
const CUTSHEET_RELEASE_TAG = "v1.3.0";

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

// A dedicated releases repository keeps Cut Sheet and Reels versions independent.
// Environment overrides make it possible to stage the next release before launch.
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
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Inside Success TV home">
          <Image
            src="https://insidesuccesstv.com/wp-content/uploads/2026/06/Inside-Success-Logo-1024x147.png"
            alt="Inside Success TV"
            width={244}
            height={35}
            unoptimized
            priority
          />
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#tools">The tools</a>
          <a className="nav-download" href="#download">Get the tool</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> INSIDE SUCCESS TV / EDITOR TOOLS</p>
          <h1 id="hero-title">Find the story.<br /><em>Build the edit.</em></h1>
          <p className="hero-description">
            Three focused tools for post-production: discover reel moments,
            build vertical edits, or turn a documentary cut sheet into an
            editable Premiere Pro assembly.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#tools">Compare the tools</a>
            <a className="secondary-link" href="#documentary">Documentary Cut Sheet</a>
          </div>
          <p className="hero-caption">Reels desktop · Reels for Premiere · Documentary for Premiere</p>
        </div>

        <div className="hero-art">
          <div className="art-halo" aria-hidden="true" />
          <div className="product-frame">
            <div className="product-frame-top">
              <span className="frame-monogram">ISTV<span className="frame-dot">.</span></span>
              <span>EDITOR TOOLS / 003</span>
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
            <div className="product-frame-bottom">
              <span>Purpose-built tools for the edit.</span>
              <span aria-hidden="true">✳</span>
            </div>
          </div>
          <div className="documentary-callout">
            <span>NEW · PREMIERE PRO</span>
            <strong>Documentary Cut Sheet</strong>
            <small>XLSX → synced footage → editable assembly</small>
          </div>
        </div>
      </section>

      <section className="steps-section" id="how-it-works" aria-labelledby="steps-heading">
        <div className="section-intro">
          <span className="section-index">THE PROCESS / 01—03</span>
          <h2 id="steps-heading">Start with the work.<br /><em>Choose the right tool.</em></h2>
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
      </section>

      <section className="tools-section" id="tools" aria-labelledby="tools-heading">
        <div className="tools-heading">
          <span className="section-index">THREE TOOLS · THREE CLEAR JOBS</span>
          <h2 id="tools-heading">One toolkit.<br /><em>No guesswork.</em></h2>
        </div>
        <div className="tools-grid">
          <article className="tool-item reels-desktop">
            <div className="tool-topline"><span className="tool-number">01 / STANDALONE</span><span className="tool-badge">Mac + Windows</span></div>
            <h3>Reels desktop app</h3>
            <p>Transcribe footage, surface strong short-form moments, and export a clear plan before opening an edit.</p>
            <ul><li>Best for reviewing footage</li><li>Runs outside Premiere Pro</li></ul>
            <a href="#download">Choose Reels desktop</a>
          </article>
          <article className="tool-item reels-premiere">
            <div className="tool-topline"><span className="tool-number">02 / SHORT FORM</span><span className="tool-badge">Premiere Pro</span></div>
            <h3>Reels for Premiere</h3>
            <p>Build editable vertical reel sequences with cuts, reframing, and captions already placed in your project.</p>
            <ul><li>Best for social video</li><li>Premiere Pro 2021+</li></ul>
            <a href="#download">Choose Reels for Premiere</a>
          </article>
          <article className="tool-item cutsheet-tool" id="documentary">
            <div className="tool-topline"><span className="tool-number">03 / DOCUMENTARY · BETA</span><span className="tool-badge light">Premiere Pro 25.6+</span></div>
            <h3>Documentary Cut Sheet</h3>
            <p>Import the documentary team’s XLSX, align recording time to synced footage, review every quote, and build markers or an editable assembly.</p>
            <ul><li>Best for long-form documentary edits</li><li>One ZIP for Mac and Windows</li></ul>
            {cutSheetRelease ? <a className="tool-download" href={cutSheetRelease.url}>Download Cut Sheet v{cutSheetRelease.version}</a> : <a href="#download">View Cut Sheet details</a>}
          </article>
        </div>
      </section>

      <section className="download-section" id="download" aria-labelledby="download-heading">
        <div className="download-copy">
          <span className="section-index">DOWNLOAD THE RIGHT TOOL</span>
          <h2 id="download-heading">What are you<br /><em>making today?</em></h2>
          <p>Select the job first. We’ll show the correct installer, system requirements, and setup steps.</p>
          <span className="download-side-note">Documentary Cut Sheet is a separate Premiere Pro plugin from ISTV Reels.</span>
        </div>
        <DownloadSelector pluginVersion={pluginVersion} cutSheetRelease={cutSheetRelease} />
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="https://insidesuccesstv.com/" target="_blank" rel="noreferrer">INSIDE SUCCESS TV<span>.</span></a>
        <p>Tools for the stories worth sharing.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
