import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Santa Clara Voter Guide home">
          <span className="brand-mark" aria-hidden="true">SC</span>
          <span><strong>2026 Voter Guide</strong><small>Santa Clara mayor</small></span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link className="nav-standard" href="/#compare">Compare</Link>
          <Link className="nav-standard" href="/#candidates">Candidates</Link>
          <Link className="nav-standard" href="/methodology">Methodology</Link>
          <a
            className="register-link"
            href="https://vote.santaclaracounty.gov/register-vote"
            rel="noreferrer"
            target="_blank"
          >
            Register to vote <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Santa Clara 2026 Mayoral Voter Guide</strong>
        <p>An independent voter-information project by Mercenary Foundry. No candidates are ranked or endorsed.</p>
      </div>
      <div className="footer-links">
        <Link href="/methodology">Methodology & corrections</Link>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
