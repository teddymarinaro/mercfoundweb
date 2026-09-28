import Link from "next/link";

type CandidateCardProps = {
  name: string;
  slug: string;
  description: string;
};

export function CandidateCard({ name, slug, description }: CandidateCardProps) {
  const initials = name
    .replace(/[“”\"]/g, "")
    .split(/\s+/)
    .filter((part) => part.toLowerCase() !== "gary")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <article className="candidate-card">
      <div className="candidate-card-top">
        <span className="candidate-monogram" aria-hidden="true">{initials}</span>
        <div>
          <h3><Link href={`/candidates/${slug}`}>{name}</Link></h3>
          <span className="candidate-label">Mayoral candidate</span>
        </div>
      </div>
      <p>{description}</p>
      <Link className="text-link" href={`/candidates/${slug}`}>
        View candidate profile <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
