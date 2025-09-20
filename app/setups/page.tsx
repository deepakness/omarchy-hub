'use client';
import { useState } from 'react';
import Card from '../../components/Card';
import Breadcrumb from '../../components/Breadcrumb';
import setupsData from '../../data/setups.json';

export default function SetupsPage() {
  const categories = [...new Set(setupsData.map(setup => setup.category))].sort();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Show newest first across all views
  const sortedSetups = [...setupsData].sort((a, b) => Number(b.id) - Number(a.id));
  const filteredSetups = selectedCategory 
    ? sortedSetups.filter(setup => setup.category === selectedCategory)
    : sortedSetups;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Setups' }
          ]} />
          <h1 className="text-4xl font-bold text-green font-mono mb-4">{setupsData.length} Workstation Setups</h1>
          <p className="text-foreground/80 text-lg">
            Beautiful Omarchy workstation setups shared by the community. Browse different configurations and get inspired for your own setup.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-mono text-blue mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-mono text-sm border-2 transition-all duration-200 ${
                selectedCategory === null
                  ? 'bg-blue text-background border-blue'
                  : 'bg-secondary text-foreground border-secondary hover:border-blue hover:bg-blue/10'
              }`}
            >
              All Setups ({setupsData.length})
            </button>
            {categories.map((category) => {
              const count = setupsData.filter(setup => setup.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm border-2 transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue text-background border-blue'
                      : 'bg-secondary text-foreground border-secondary hover:border-blue hover:bg-blue/10'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Setups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSetups.map((setup) => (
            <Card
              key={setup.id}
              title={setup.name}
              description={setup.description}
              link={setup.link}
              screenshot={setup.screenshot}
              screenshotAlt="Setup Screenshot"
              device={setup.device}
              category={setup.category}
              tags={setup.tags}
            />
          ))}
        </div>

        {/* Contribution CTA */}
        <div className="mt-16 text-center">
          <div className="pixel-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-green font-mono mb-4">
              Share Your Setup
            </h3>
            <p className="text-foreground/80 mb-4">
              Have an amazing Omarchy configuration? Share your setup, dotfiles, and screenshots with the community.
            </p>
            <a 
              href="https://github.com/deepakness/omarchy-hub/issues/new?template=setup-submission.yml"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="pixel-button inline-flex items-center gap-2"
            >
              Submit Your Setup
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}