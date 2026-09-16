'use client';
import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import PluginCard, { KIND_PLURALS } from '../../components/PluginCard';
import pluginsData from '../../data/plugins.json';
import { ShieldAlert } from 'lucide-react';

// The kind filter only earns its space once the list is big enough.
const FILTER_MIN_PLUGINS = 8;

export default function PluginsPage() {
  const [selectedKind, setSelectedKind] = useState<string | null>(null);

  // Show newest first across all views
  const sortedPlugins = [...pluginsData].sort((a, b) => Number(b.id) - Number(a.id));

  const kindCounts = sortedPlugins.reduce<Record<string, number>>((counts, plugin) => {
    counts[plugin.kind] = (counts[plugin.kind] || 0) + 1;
    return counts;
  }, {});
  const kinds = Object.keys(kindCounts).sort(
    (a, b) => kindCounts[b] - kindCounts[a] || a.localeCompare(b)
  );

  const filteredPlugins = selectedKind
    ? sortedPlugins.filter((plugin) => plugin.kind === selectedKind)
    : sortedPlugins;

  const showFilter = sortedPlugins.length >= FILTER_MIN_PLUGINS;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Plugins' }
          ]} />
          <h1 className="text-4xl font-bold text-green font-mono mb-4">{pluginsData.length} Omarchy Plugins</h1>
          <p className="text-foreground/80 text-lg">
            A hand-picked set of shell plugins for Omarchy 4 (Quattro), each one installable with a
            single command. Browse the full community catalog at{' '}
            <a
              href="https://plugins.omarchy.org/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue hover:text-blue-hover transition-colors underline"
            >
              plugins.omarchy.org
            </a>
            .
          </p>
        </div>

        {/* Trust note */}
        <div className="pixel-card mb-8 flex items-start gap-3">
          <ShieldAlert size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/80">
            Plugin installs are deliberate: each one is code that runs inside your long-lived shell
            process, with everything your user account can reach. Read a plugin before you enable
            it, and see the{' '}
            <a
              href="https://omarchy.org/manual/shell-plugins/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue hover:text-blue-hover transition-colors underline"
            >
              shell plugins manual
            </a>{' '}
            for how enabling, updating and removing works.
          </p>
        </div>

        {/* Kind Filter */}
        {showFilter && (
          <div className="mb-8">
            <h2 className="text-xl font-mono text-blue mb-4">Filter by Kind</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedKind(null)}
                className={`px-4 py-2 rounded-lg font-mono text-sm border-2 transition-all duration-200 ${
                  selectedKind === null
                    ? 'bg-blue text-background border-blue'
                    : 'bg-secondary text-foreground border-secondary hover:border-blue hover:bg-blue/10'
                }`}
              >
                All Plugins ({sortedPlugins.length})
              </button>
              {kinds.map((kind) => (
                <button
                  key={kind}
                  onClick={() => setSelectedKind(kind)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm border-2 transition-all duration-200 ${
                    selectedKind === kind
                      ? 'bg-blue text-background border-blue'
                      : 'bg-secondary text-foreground border-secondary hover:border-blue hover:bg-blue/10'
                  }`}
                >
                  {KIND_PLURALS[kind] || kind} ({kindCounts[kind]})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Plugins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlugins.map((plugin) => (
            <PluginCard
              key={plugin.id}
              name={plugin.name}
              description={plugin.description}
              kind={plugin.kind}
              category={plugin.category}
              author={plugin.author}
              link={plugin.link}
              install={plugin.install}
              screenshot={plugin.screenshot}
              tags={plugin.tags}
            />
          ))}
        </div>

        {/* Contribution CTA */}
        <div className="mt-16 text-center">
          <div className="pixel-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-green font-mono mb-4">
              Built a Plugin?
            </h3>
            <p className="text-foreground/80 mb-4">
              Share your shell plugin with the community. Include a screenshot and the install
              command, and it may be featured here.
            </p>
            <a
              href="https://github.com/deepakness/omarchy-hub/issues/new?template=plugin-submission.yml"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="pixel-button inline-flex items-center gap-2"
            >
              Submit a Plugin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
