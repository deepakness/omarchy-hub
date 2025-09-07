'use client';
import { useState } from 'react';
import Card from '../../components/Card';
import Breadcrumb from '../../components/Breadcrumb';
import resourcesData from '../../data/resources.json';

export default function ResourcesPage() {
  const categories = [...new Set(resourcesData.map(resource => resource.category))].sort();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredResources = selectedCategory 
    ? resourcesData.filter(resource => resource.category === selectedCategory)
    : resourcesData;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Resources' }
          ]} />
          <h1 className="text-4xl font-bold text-green font-mono mb-4">Resources</h1>
          <p className="text-foreground/80 text-lg">
            Helpful documentation, communities, and learning resources shared by the community. Find guides, tutorials, and tools to enhance your Omarchy experience.
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
              All Resources ({resourcesData.length})
            </button>
            {categories.map((category) => {
              const count = resourcesData.filter(resource => resource.category === category).length;
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

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card
              key={resource.id}
              title={resource.name}
              description={resource.description}
              category={resource.category}
              author={resource.author}
              tags={resource.tags}
              link={resource.link}
            />
          ))}
        </div>

        {/* Contribution CTA */}
        <div className="mt-16 text-center">
          <div className="pixel-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-green font-mono mb-4">
              Know a Great Resource?
            </h3>
            <p className="text-foreground/80 mb-4">
              Found helpful documentation, tutorials, or communities? Help others discover valuable resources.
            </p>
            <a 
              href="https://github.com/deepakness/omarchy-hub/issues/new?template=resource-submission.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-button inline-flex items-center gap-2"
            >
              Suggest a Resource
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
