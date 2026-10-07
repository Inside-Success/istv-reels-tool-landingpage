import Image from "next/image";
import DownloadLink from "./download-link";
import DownloadSelector from "./download-selector";

const PLUGIN_REPO = "Inside-Success/istv-reels-tool-landingpage";
const CUTSHEET_REPO = "Inside-Success/istv-documentary-cutsheet-downloads";
// Empty follows the latest published release. Set CUTSHEET_RELEASE_TAG in the
// environment only to stage a specific tag; GitHub's latest skips prereleases.
const CUTSHEET_RELEASE_TAG = "";

async function latestPluginVersion(): Promise<string | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${PLUGIN_REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const { tag_name: tag } = (await response.json()) as { tag_name?: string };
    return tag?.replace(/^plugin-/, "").replace(/^v/, "") || null;
  } catch {
    return null;
  }
}

// A dedicated releases repository keeps Cut Sheet and Reels versions independent.
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
    const release = (await response.json()) as {
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
  { title: "Pick a tool", icon: "pick" },
  { title: "Download", icon: "down" },
  { title: "Install", icon: "plug" },
  { title: "Start editing", icon: "play" },
] as const;

function Icon({ name }: { name: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      {name === "pick" && <><rect x="3" y="3" width="7" height="7" rx="2" {...p} /><rect x="14" y="3" width="7" height="7" rx="2" {...p} /><rect x="3" y="14" width="7" height="7" rx="2" {...p} /><circle cx="17.5" cy="17.5" r="3.5" {...p} /></>}
      {name === "down" && <><path d="M12 4v11m-4.5-4.5L12 15l4.5-4.5" {...p} /><path d="M5 19h14" {...p} /></>}
      {name === "plug" && <><path d="M9 3v5m6-5v5M6 8h12v3a6 6 0 0 1-12 0V8Zm6 9v4" {...p} /></>}
      {name === "play" && <><circle cx="12" cy="12" r="9" {...p} /><path d="m10 8.5 5 3.5-5 3.5v-7Z" {...p} /></>}
      {name === "reel" && <><rect x="7" y="2.5" width="10" height="19" rx="2.5" {...p} /><path d="M10.5 9.5v5l4-2.5-4-2.5Z" {...p} /></>}
      {name === "desk" && <><rect x="2.5" y="4" width="19" height="12.5" rx="2" {...p} /><path d="M8 20.5h8M12 16.5v4" {...p} /></>}
      {name === "doc" && <><rect x="3" y="5" width="18" height="14" rx="2" {...p} /><path d="M3 9h18M7 5v4m5-4v4m5-4v4" {...p} /></>}
      {name === "spark" && <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z" {...p} />}
    </svg>
  );
}

const tools = [
  {
    id: "desktop", icon: "desk", name: "Reels desktop app", runs: "Mac and Windows",
    body: "Transcribe footage, find the strongest short-form moments, and export a plan before you open an edit.",
    points: ["Review footage fast", "Runs on its own, outside Premiere"],
    cta: "Get the desktop app",
  },
  {
    id: "premiere", icon: "reel", name: "Reels for Premiere", runs: "Premiere Pro 2021+",
    body: "Build vertical reel sequences with cuts, reframing and captions placed right in your project.",
    points: ["Made for social video", "Every cut stays editable"],
    cta: "Get the Premiere panel",
  },
  {
    id: "cutsheet", icon: "doc", name: "Documentary Cut Sheet", runs: "Premiere Pro 25.6+", beta: true,
    body: "Import the documentary team's XLSX, line it up with synced footage, and build a multicam assembly with ElevenLabs voice-over in story order.",
    points: ["Long-form documentary edits", "Keeps every camera angle", "Updates from inside the panel"],
    cta: "Get Cut Sheet",
  },
] as const;

export default async function Home() {
  const [pluginVersion, cutSheetRelease] = await Promise.all([latestPluginVersion(), latestCutSheetRelease()]);

  return (
    <main id="top">
      <div className="sky" aria-hidden="true"><span className="sun" /><span className="haze" /><span className="horizon" /></div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Inside Success TV home">
          <Image src="/inside-success-logo.png" alt="Inside Success TV" width={190} height={27} unoptimized priority />
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#top" aria-current="page">Home</a>
          <a href="#tools">Tools</a>
          <a href="#download">Download</a>
          <a href="https://insidesuccesstv.com/" target="_blank" rel="noreferrer">Inside Success TV</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title" className="load" style={{ ["--d" as string]: "0ms" }}>
            Find the story,<br />build the edit.
          </h1>
          <p className="hero-description load" style={{ ["--d" as string]: "100ms" }}>
            Three focused tools for post-production. Find reel moments, cut vertical edits, or turn a documentary cut sheet into a Premiere Pro assembly.
          </p>
          <div className="hero-actions load" style={{ ["--d" as string]: "200ms" }}>
            <a className="btn-dark" href="#download"><span className="btn-icon"><Icon name="spark" /></span>Download a tool</a>
            <a className="btn-glass" href="#tools">See what each one does</a>
          </div>
        </div>

        <div className="hero-art load" style={{ ["--d" as string]: "200ms" }}>
          <svg className="orbit" viewBox="0 0 600 600" aria-hidden="true">
            <defs>
              <linearGradient id="og" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" /><stop offset="1" stopColor="#ffd9b8" stopOpacity="0" /></linearGradient>
            </defs>
            <ellipse cx="300" cy="300" rx="285" ry="120" fill="none" stroke="url(#og)" strokeWidth="2.2" />
            <ellipse cx="300" cy="300" rx="240" ry="200" fill="none" stroke="url(#og)" strokeWidth="1.2" />
          </svg>
          <div className="capsule">
            <div className="capsule-bar">
              <span className="dots" aria-hidden="true"><i /><i /><i /></span>
              <span>ISTV Editor</span>
              <span className="live"><i />Assembling</span>
            </div>
            <div className="capsule-screen">
              <Image src="/hero-ai-editor.png" alt="The ISTV editor building a sequence" fill sizes="(max-width: 900px) 92vw, 52vw" priority />
              <span className="gloss" aria-hidden="true" />
            </div>
            <div className="timeline" aria-hidden="true">
              <span style={{ ["--w" as string]: "22%" }} /><span style={{ ["--w" as string]: "14%" }} /><span style={{ ["--w" as string]: "30%" }} /><span style={{ ["--w" as string]: "18%" }} />
              <b className="playhead" />
            </div>
          </div>
          <div className="pod pod-a"><Icon name="reel" /><span><strong>9:16 reel</strong>Captions placed</span></div>
          <div className="pod pod-b"><Icon name="doc" /><span><strong>Cut sheet</strong>4 cameras synced</span></div>
          <div className="pedestal" aria-hidden="true" />
        </div>

        <ol className="step-row load" style={{ ["--d" as string]: "380ms" }} aria-label="How it works">
          {steps.map((s, i) => (
            <li key={s.title} className="glass step">
              <Icon name={s.icon} />
              <strong>{s.title}</strong>
              <small>{i + 1} of {steps.length}</small>
            </li>
          ))}
        </ol>
      </section>

      <section className="tools" id="tools" aria-labelledby="tools-heading">
        <div className="section-head">
          <h2 id="tools-heading">One toolkit, three clear jobs</h2>
          <p>Choose by the edit you are making today. Each tool installs on its own.</p>
        </div>
        <div className="tool-grid">
          {tools.map((t) => (
            <article key={t.id} className={`glass tool${t.id === "cutsheet" ? " tool-dark" : ""}`} id={t.id === "cutsheet" ? "documentary" : undefined}>
              <div className="tool-top">
                <span className="tool-icon"><Icon name={t.icon} /></span>
                <span className="chip">{t.runs}</span>
                {"beta" in t && <span className="chip chip-glow">Beta</span>}
              </div>
              <h3>{t.name}</h3>
              <p>{t.body}</p>
              <ul>{t.points.map((x) => <li key={x}>{x}</li>)}</ul>
              <DownloadLink product={t.id} className="tool-link">{t.cta}</DownloadLink>
            </article>
          ))}
        </div>
      </section>

      <section className="download" id="download" aria-labelledby="download-heading">
        <div className="section-head">
          <h2 id="download-heading">Downloads</h2>
          <p>Every tool has its own card. Pick the file for your computer and follow the install note underneath.</p>
        </div>
        <DownloadSelector pluginVersion={pluginVersion} cutSheetRelease={cutSheetRelease} />
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-intro">
            <a className="footer-brand" href="https://insidesuccesstv.com/" target="_blank" rel="noreferrer">Inside Success TV</a>
            <p>Purpose-built editing tools for stories worth sharing.</p>
          </div>
          <nav className="footer-group" aria-label="Footer navigation">
            <h2>Explore</h2>
            <a href="#tools">Tools</a>
            <a href="#download">Downloads</a>
            <a href="#top">Back to top</a>
          </nav>
          <div className="footer-group">
            <h2>Compatibility</h2>
            <p>Desktop: macOS &amp; Windows</p>
            <p>Reels: Premiere Pro 2021+</p>
            <p>Cut Sheet: Premiere Pro 25.6+</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Inside Success TV</p>
          <p>Post-production tools for the ISTV edit team</p>
        </div>
      </footer>
    </main>
  );
}
