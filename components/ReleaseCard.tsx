import { Github } from 'lucide-react';

interface Release {
  tag: string;
  url: string;
  publishedAt: string | null;
  isLatest: boolean;
  changelog: string;
  description: string;
}

interface ReleaseCardProps {
  release: Release;
}

export default function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <a
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      className="pixel-card block"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-foreground font-mono">Omarchy {release.tag}</span>
          {release.isLatest && (
            <span className="px-1.5 py-0.5 text-xs font-mono bg-green/20 text-green border border-green/30 rounded">
              Latest
            </span>
          )}
        </div>
        <Github size={16} className="text-blue" />
      </div>
    </a>
  );
}
