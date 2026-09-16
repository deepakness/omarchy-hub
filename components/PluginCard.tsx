'use client';

import { useState } from 'react';
import { Check, Copy, Globe } from 'lucide-react';
import { getImageUrl } from './imageUrl';

// Display names for the plugin kinds declared in a plugin's manifest.json.
// See https://omarchy.org/manual/shell-plugins/ for the kind list.
export const KIND_LABELS: Record<string, string> = {
  'bar-widget': 'Bar Widget',
  panel: 'Panel',
  overlay: 'Overlay',
  menu: 'Menu',
  service: 'Service',
  bar: 'Bar',
  suite: 'Shell Suite',
};

export const KIND_PLURALS: Record<string, string> = {
  'bar-widget': 'Bar Widgets',
  panel: 'Panels',
  overlay: 'Overlays',
  menu: 'Menus',
  service: 'Services',
  bar: 'Bars',
  suite: 'Shell Suites',
};

interface PluginCardProps {
  name: string;
  description: string;
  kind: string;
  category: string;
  author: string;
  link: string;
  install: string;
  screenshot?: string;
  tags?: string[];
}

export default function PluginCard({
  name,
  description,
  kind,
  category,
  author,
  link,
  install,
  screenshot,
  tags,
}: PluginCardProps) {
  const [copied, setCopied] = useState(false);
  const linkProps = {
    href: link,
    target: '_blank',
    rel: 'noopener noreferrer nofollow',
  } as const;

  // Plugin screenshots go through the same CDN as theme and setup images.
  const imageSrc = screenshot ? getImageUrl(screenshot) : null;

  // Repo link text: drop the scheme so the line stays readable and short.
  const displayUrl = link.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText(install);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access needs a secure context; the command stays selectable.
    }
  };

  return (
    <div className="pixel-card overflow-hidden p-0 flex flex-col">
      {imageSrc && (
        <a
          {...linkProps}
          aria-label={`${name} on GitHub`}
          className="block w-full aspect-video bg-secondary/40 border-b border-secondary overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- matches the plain <img> used by Card.tsx */}
          <img
            src={imageSrc}
            alt={`${name} plugin screenshot`}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </a>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-mono text-green bg-green/10 px-2 py-1 rounded">
            {KIND_LABELS[kind] || kind}
          </span>
          <span className="text-xs font-mono text-foreground/70 border border-secondary px-2 py-1 rounded">
            {category}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-2 text-foreground">
          <a {...linkProps} className="hover:text-blue transition-colors">
            {name}
          </a>
        </h3>

        <p className="text-sm text-foreground/80 mb-3 leading-relaxed">{description}</p>

        <a
          {...linkProps}
          title={`${name} on GitHub`}
          className="inline-flex items-start gap-1.5 max-w-full mb-4 text-xs font-mono text-foreground/70 hover:text-blue transition-colors"
        >
          <Globe size={14} className="text-blue flex-shrink-0 mt-0.5" />
          <span className="break-words">{displayUrl}</span>
        </a>

        <div className="mt-auto">
          <div className="bg-background/60 border border-secondary rounded-lg p-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono text-foreground/50 tracking-wider">INSTALL</span>
              <button
                type="button"
                onClick={copyInstall}
                aria-label={copied ? `Copied install command for ${name}` : `Copy install command for ${name}`}
                className="inline-flex items-center gap-1 text-xs font-mono text-blue bg-blue/10 border border-blue/30 px-2 py-1 rounded hover:bg-blue hover:text-background transition-colors"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <code className="block font-mono text-xs text-foreground/90 whitespace-pre-wrap break-all">
              {install}
            </code>
          </div>

          <p className="text-xs text-blue font-mono mt-3">by {author}</p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-blue bg-blue/20 border border-blue/30 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
