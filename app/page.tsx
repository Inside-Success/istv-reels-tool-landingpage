import Image from "next/image";
import DownloadSelector from "./download-selector";

const PLUGIN_REPO = "Inside-Success/istv-reels-tool-landingpage";
const CUTSHEET_REPO = "Inside-Success/istv-documentary-cutsheet-downloads";
const CUTSHEET_RELEASE_TAG = "v1.2.0";

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
  { number: "01", title: "Bring your footage", detail: "Start with video, audio or a podcast." },
  { number: "02", title: "Find the moments", detail: "Review transcripts, hooks and standout quotes." },
  { number: "03", title: "Make it yours", detail: "Export the plan or finish your reel in Premiere." },
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
          <p className="eyebrow"><span className="eyebrow-line" /> INSIDE SUCCESS TV / CREATOR TOOLS</p>
          <h1 id="hero-title">Make every <em>moment</em> worth watching.</h1>
          <p className="hero-description">
            From raw footage to reel-ready ideas. Find the best moments, shape
            the story, and spend less time searching through a timeline.
          </p>
          <a className="primary-button" href="#download">
            Get ISTV Reels Tool <span aria-hidden="true">↗</span>
          </a>
          <p className="hero-caption">A better starting point for every edit.</p>
        </div>

        <div className="hero-art">
          <div className="art-halo" aria-hidden="true" />
          <div className="product-frame">
            <div className="product-frame-top">
              <span className="frame-monogram">ISTV<span className="frame-dot">.</span></span>
              <span>REELS TOOL / 001</span>
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
              <span>Find the story in the footage.</span>
              <span aria-hidden="true">✳</span>
            </div>
          </div>
          <div className="art-stamp" aria-hidden="true"><span>CREATE<br />WITH<br />INTENT</span></div>
        </div>
      </section>

      <section className="steps-section" id="how-it-works" aria-labelledby="steps-heading">
        <div className="section-intro">
          <span className="section-index">THE PROCESS / 01—03</span>
          <h2 id="steps-heading">From hours of footage<br /><em>to the right few seconds.</em></h2>
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
          <span className="section-index">TOOLS FOR YOUR WORKFLOW</span>
          <h2 id="tools-heading">Your edit.<br /><em>Your workflow.</em></h2>
        </div>
        <div className="tools-grid">
          <article className="tool-item">
            <span className="tool-number">01 / STANDALONE</span>
            <h3>Reels desktop app</h3>
            <p>Transcribe footage, surface potential reel moments and export the reports you need to plan a cut.</p>
          </article>
          <article className="tool-item">
            <span className="tool-number">02 / IN YOUR EDIT</span>
            <h3>Reels for Premiere</h3>
            <p>Build editable vertical reel sequences in your Premiere project, with cuts, reframing and captions ready to refine.</p>
          </article>
        </div>
        <article className="tool-item cutsheet-tool">
          <span className="tool-number">03 / DOCUMENTARY · BETA</span>
          <h3>Documentary Cut Sheet</h3>
          <p>Bring a documentary spreadsheet into Premiere Pro, map quotes to your synced footage, and build markers or a rough-cut sequence. Requires Premiere Pro 25.6 or newer.</p>
          <a href="#download">Get the Cut Sheet plugin →</a>
        </article>
      </section>

      <section className="download-section" id="download" aria-labelledby="download-heading">
        <div className="download-copy">
          <span className="section-index">READY WHEN YOU ARE</span>
          <h2 id="download-heading">Start making<br /><em>the good stuff.</em></h2>
          <p>Choose how you edit and where you work. We’ll show you one matching download.</p>
          <span className="download-side-note">Public installers · Windows and macOS</span>
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
