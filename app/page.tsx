import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import data from "./data.json";
import { CandidateCard } from "./candidate-card";
import { issueComparisons } from "./content";
import { FoundryHome } from "./foundry-home";
import { SiteFooter, SiteHeader } from "./site-header";

async function isFoundryHomepage() {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0];
  const hostname = (forwardedHost ?? requestHeaders.get("host") ?? "")
    .trim()
    .split(":")[0]
    .toLowerCase();

  return hostname === "mercenaryfoundry.com" || hostname === "www.mercenaryfoundry.com";
}

export async function generateMetadata(): Promise<Metadata> {
  if (await isFoundryHomepage()) {
    return {
      title: "Mercenary Foundry",
      description: "Independent civic research and public-interest projects by Jonathan Marinaro.",
    };
  }

  return {
    title: "Santa Clara 2026 Mayoral Voter Guide",
    description: "An independent, nonpartisan comparison of Santa Clara's 2026 mayoral candidates.",
  };
}

function VoterGuideHome() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <SiteHeader />
      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="kicker">Santa Clara mayor · November 3, 2026</div>
            <h1>A clearer look at the candidates.</h1>
            <p className="hero-dek">
              A side-by-side guide to the six candidates and the choices facing Santa Clara.
              Compare their positions, records, and complete responses.
            </p>
            <div className="hero-actions" aria-label="Jump to guide sections">
              <a className="primary-link" href="#compare">Compare the issues <span aria-hidden="true">↓</span></a>
              <a className="secondary-link" href="#candidates">Meet the candidates</a>
            </div>
          </div>
          <aside className="race-brief" aria-label="Race at a glance">
            <p className="race-brief-label">Race at a glance</p>
            <div className="response-stat">
              <strong>6</strong>
              <p>candidates seeking one citywide seat</p>
            </div>
            <dl>
              <div><dt>Election</dt><dd>November 3</dd></div>
              <div><dt>Winner</dt><dd>Plurality · no runoff</dd></div>
              <div><dt>Office</dt><dd>Mayor</dd></div>
              <div><dt>Updated</dt><dd>September 27</dd></div>
            </dl>
          </aside>
        </section>

        <section className="race-update" aria-labelledby="race-update-title">
          <p className="eyebrow">Dated race context · September 27</p>
          <h2 id="race-update-title">Outside spending and stadium finances remain central to the race.</h2>
          <div className="race-update-grid">
            <p>
              A 49ers-sponsored committee received $645,000 to support Gary Ferraris and oppose
              David Kertes and Kathy Watanabe. The San Francisco Chronicle reports that the team’s
              Santa Clara political spending since 2020 is approaching $10 million. These are
              independent expenditures and are not evidence of candidate coordination.
              {" "}<a href="https://www.sfchronicle.com/sports/49ers/article/49ers-owner-jed-york-s-arrest-looms-santa-clara-22432056.php" rel="noreferrer">Read the reporting ↗</a>
            </p>
            <p>
              Watanabe has called for an independent analysis of Levi’s Stadium’s financial benefit
              to Santa Clara. The Bay Area Host Committee disputes that the city is falling short and
              says it has paid 95% of submitted city invoices while awaiting additional information.
              {" "}<a href="https://sanjosespotlight.com/santa-clara-mayoral-candidate-claims-levis-stadium-financials-fall-short/" rel="noreferrer">Read the reporting ↗</a>
            </p>
          </div>
        </section>

        <section className="section-shell" id="candidates" aria-labelledby="candidates-title">
          <header className="section-heading">
            <div><span className="section-number">01</span><h2 id="candidates-title">The field</h2></div>
            <p>Presented alphabetically, with identical treatment.</p>
          </header>
          <div className="candidate-grid">
            {data.candidates.map((candidate) => (
              <CandidateCard
                key={candidate.slug}
                name={candidate.name}
                slug={candidate.slug}
                description={candidate.profile[0]?.[1] ?? "Candidate profile"}
              />
            ))}
          </div>
        </section>

        <section className="section-shell compare-shell" id="compare" aria-labelledby="compare-title">
          <header className="section-heading">
            <div><span className="section-number">02</span><h2 id="compare-title">Compare the issues</h2></div>
            <p>Short summaries first; full answers are on each candidate page.</p>
          </header>
          <nav className="issue-nav" aria-label="Issue sections">
            {issueComparisons.map((issue) => <a key={issue.id} href={`#${issue.id}`}>{issue.title}</a>)}
          </nav>
          <div className="issue-list">
            {issueComparisons.map((issue, index) => (
              <article className="issue" id={issue.id} key={issue.id}>
                <div className="issue-intro">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{issue.title}</h3><p>{issue.dek}</p></div>
                </div>
                <div className="position-grid">
                  {issue.positions.map(([name, position]) => (
                    <div className="position" key={name}>
                      <h4>{name}</h4><p>{position}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="closing-cta">
          <p className="kicker">Go to the source</p>
          <h2>Read the candidates in their own words.</h2>
          <p>Each candidate page includes the complete questionnaire response plus clearly separated public-record context.</p>
          <div className="candidate-links">
            {data.candidates.map((candidate) => (
              <Link key={candidate.slug} href={`/candidates/${candidate.slug}`}>{candidate.name} <span aria-hidden="true">→</span></Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export default async function Home() {
  return (await isFoundryHomepage()) ? <FoundryHome /> : <VoterGuideHome />;
}
