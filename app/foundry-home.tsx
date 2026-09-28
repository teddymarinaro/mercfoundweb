export function FoundryHome() {
  return (
    <div className="foundry-site">
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="foundry-header">
        <img
          src="/mercenary-foundry-logo.png"
          alt="Mercenary — The work of Jonathan Marinaro"
          width={926}
          height={223}
        />
      </header>
      <main id="main" className="foundry-main">
        <section className="foundry-intro" aria-labelledby="foundry-title">
          <p className="foundry-kicker">Independent work · Civic focus</p>
          <h1 id="foundry-title">Research built<br />for the public.</h1>
          <p>
            Mercenary Foundry is the independent work of Jonathan Marinaro: clear research,
            useful civic tools, and projects made to be read—not decoded.
          </p>
        </section>

        <section className="foundry-project" aria-labelledby="project-title">
          <div className="foundry-project-number" aria-hidden="true">01</div>
          <div className="foundry-project-copy">
            <p className="foundry-project-label">Current project · Santa Clara</p>
            <h2 id="project-title">2026 Mayoral<br />Voter Guide</h2>
            <p>
              Compare all six candidates across housing, homelessness, BART, Downtown,
              public spending, the 49ers, and city governance—then read every candidate’s
              complete questionnaire.
            </p>
            <a className="foundry-project-link" href="https://scmayor26.mercenaryfoundry.com">
              Open the voter guide <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <footer className="foundry-footer">
        <p>© 2026 Mercenary Foundry</p>
        <p>The work of Jonathan Marinaro</p>
      </footer>
    </div>
  );
}
