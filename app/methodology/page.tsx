import { SiteFooter, SiteHeader } from "../site-header";

export const metadata = {
  title: "Methodology & corrections",
  description: "How the Santa Clara 2026 Mayoral Voter Guide was assembled and updated.",
};

export default function MethodologyPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <SiteHeader />
      <main id="main" className="method-page" data-page="methodology">
        <header className="article-hero" id="top">
          <p className="kicker">About this project</p>
          <h1>Methodology<br />& corrections</h1>
          <p>This guide is designed to make substantive differences easier to see without reducing candidates to rankings, factions, or labels.</p>
        </header>

        <article className="method-content">
          <section>
            <span className="method-number">01</span>
            <div><h2>Positions and records</h2><p>A candidate’s own statement is treated as the best source for that candidate’s current position. Official votes and public records are used when they show how a candidate acted on a specific proposal.</p></div>
          </section>
          <section>
            <span className="method-number">02</span>
            <div><h2>Records provide context</h2><p>Voting records, official city materials, campaign websites, and directly relevant public reporting may add context. They are not used to overwrite a candidate’s explanation. When a statement and a voting record address different versions of a proposal, both are reported and the distinction is made explicit.</p></div>
          </section>
          <section>
            <span className="method-number">03</span>
            <div><h2>No scores or endorsements</h2><p>The guide does not score, rank, recommend, or endorse candidates. Candidate order is alphabetical, and pages use the same structure and visual treatment. Comparisons preserve policy distinctions rather than placing candidates on a single ideological spectrum.</p></div>
          </section>
          <section>
            <span className="method-number">04</span>
            <div><h2>Editing and attribution</h2><p>Candidate language may receive standardized punctuation and formatting for readability without changing substance. Candidate-provided statistics remain labeled when independent verification is pending, and outside reporting is linked directly.</p></div>
          </section>
          <section>
            <span className="method-number">05</span>
            <div><h2>Corrections and updates</h2><p>Substantive corrections and later candidate responses are added with a visible date. Historical descriptions are not silently changed in a way that obscures what was published earlier. The guide was last updated September 27, 2026.</p></div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
