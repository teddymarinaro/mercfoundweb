import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import data from "../../data.json";
import { unansweredSubjects } from "../../content";
import { SiteFooter, SiteHeader } from "../../site-header";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return data.candidates.map((candidate) => ({ slug: candidate.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const candidate = data.candidates.find((item) => item.slug === slug);
  if (!candidate) return {};
  return {
    title: candidate.name,
    description: `${candidate.name}'s profile and questionnaire responses in the Santa Clara 2026 Mayoral Voter Guide.`,
  };
}

export default async function CandidatePage({ params }: PageProps) {
  const { slug } = await params;
  const candidateIndex = data.candidates.findIndex((item) => item.slug === slug);
  if (candidateIndex < 0) notFound();
  const candidate = data.candidates[candidateIndex];
  const answered = Boolean(candidate.answers);
  const previous = data.candidates[candidateIndex - 1];
  const next = data.candidates[candidateIndex + 1];
  const campaignSource = candidate.sources.find(([label]) => label.toLowerCase().includes("campaign"));

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <SiteHeader />
      <main id="main" className="candidate-page" data-candidate={candidate.slug}>
        <div className="breadcrumb"><Link href="/">Voter guide</Link><span aria-hidden="true">/</span>Candidate profile</div>
        <header className="candidate-hero" id="top">
          <div className="candidate-hero-grid">
            <div className="candidate-hero-copy">
              <span className={answered ? "status answered" : "status pending"}>
                {answered ? "Questionnaire received" : "No response received"}
              </span>
              <h1>{candidate.name}</h1>
              <p>{candidate.status}</p>
            </div>
            <figure className="candidate-portrait">
              <img
                src={`/candidates/${candidate.slug}.webp`}
                alt={`Campaign portrait of ${candidate.name}`}
                width={900}
                height={900}
              />
              {campaignSource?.[1] && (
                <figcaption>
                  Photo: <a href={campaignSource[1]} rel="noreferrer">candidate campaign website<span aria-hidden="true"> ↗</span></a>
                </figcaption>
              )}
            </figure>
          </div>
        </header>

        <div className="candidate-layout">
          <aside className="profile-index" aria-label="On this page">
            <strong>On this page</strong>
            <a href="#profile">Profile</a>
            {answered && <a href="#questionnaire">Questionnaire</a>}
            <a href="#sources">Sources</a>
          </aside>

          <div className="candidate-content">
            <section id="profile" aria-labelledby="profile-title">
              <p className="eyebrow">What the record shows</p>
              <h2 id="profile-title">Candidate profile</h2>
              <div className="profile-sections">
                {candidate.profile.map(([label, text]) => (
                  <section key={label}>
                    <h3>{label}</h3>
                    <p>{text}</p>
                  </section>
                ))}
              </div>
            </section>

            {answered ? (
              <section id="questionnaire" className="questionnaire" aria-labelledby="questionnaire-title">
                <p className="eyebrow">In the candidate’s own words</p>
                <h2 id="questionnaire-title">Complete questionnaire</h2>
                <p className="section-dek">
                  {candidate.key === "David_Kertes"
                    ? "These responses were provided in a recorded interview, edited for clarity, and reviewed by the candidate before publication."
                    : "These written responses were supplied directly by the candidate. Formatting and punctuation were standardized for readability without changing the substance."}
                </p>
                <div className="question-list">
                  {data.questions.map((question, index) => (
                    <details className="question" key={question.topic} open={index === 0}>
                      <summary>
                        <span className="question-number">{String(index + 1).padStart(2, "0")}</span>
                        <span><strong>{question.topic}</strong><small>{question.question}</small></span>
                        <span className="disclosure" aria-hidden="true">+</span>
                      </summary>
                      <div className="answer">
                        <p>{candidate.answers?.[index]}</p>
                        {candidate.key === "Kevin_Park" && index === 4 && (
                          <aside className="record-note">
                            <strong>Voting-record context</strong>
                            Park opposed the initial 2023 authorization and later joined the unanimous 2024 vote funding the revised 30-unit, family-focused project.
                          </aside>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ) : (
              <section className="no-response" aria-labelledby="no-response-title">
                <p className="eyebrow">Questionnaire status</p>
                <h2 id="no-response-title">No response received</h2>
                <p>
                  {candidate.name} was invited to answer the same 15 questions sent to every candidate.
                  No response had been received as of September 27, 2026. The unanswered subjects are {unansweredSubjects}.
                </p>
                <p>No position is inferred from the candidate’s background, endorsements, outside support, or connected organizations. This page will be updated if a direct response is received.</p>
              </section>
            )}

            <section id="sources" className="sources" aria-labelledby="sources-title">
              <p className="eyebrow">Documentation</p>
              <h2 id="sources-title">Sources</h2>
              <ul>
                {candidate.sources.map(([label, url]) => (
                  <li key={label}>
                    {url ? <a href={url} rel="noreferrer">{label}<span aria-hidden="true"> ↗</span></a> : <span>{label}</span>}
                  </li>
                ))}
              </ul>
              <p className="source-note">Candidate-provided numerical claims are identified as such when independent verification remains pending.</p>
            </section>
          </div>
        </div>

        <nav className="candidate-pagination" aria-label="Candidate profiles">
          {previous ? <Link href={`/candidates/${previous.slug}`}><small>Previous candidate</small>← {previous.name}</Link> : <span />}
          {next ? <Link href={`/candidates/${next.slug}`}><small>Next candidate</small>{next.name} →</Link> : <span />}
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
