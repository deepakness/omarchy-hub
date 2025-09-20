'use client';
import { useState } from 'react';
import Card from '../../components/Card';
import Breadcrumb from '../../components/Breadcrumb';
import themesData from '../../data/themes.json';

export default function ThemesPage() {
  const categories = [...new Set(themesData.map(theme => theme.category))].sort();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredThemes = selectedCategory 
    ? themesData.filter(theme => theme.category === selectedCategory)
    : themesData;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Themes' }
          ]} />
          <h1 className="text-4xl font-bold text-green font-mono mb-4">{themesData.length} Themes</h1>
          <p className="text-foreground/80 text-lg">
            Beautiful color schemes and themes shared by the community. Discover new visual styles and personalize your Omarchy desktop experience.
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
              All Themes ({themesData.length})
            </button>
            {categories.map((category) => {
              const count = themesData.filter(theme => theme.category === category).length;
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

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThemes.map((theme) => (
            <Card
              key={theme.id}
              title={theme.name}
              category={theme.category}
              author={theme.author}
              tags={theme.tags}
              link={theme.link}
              screenshot={theme.screenshot}
              screenshotAlt="Theme Screenshot"
            />
          ))}
        </div>

        {/* How to Use Themes */}
        <div className="mt-16">
          <div className="pixel-card max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-green font-mono mb-4">
              How to Use These Themes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-blue font-mono mb-2">Select Theme</h4>
                <p className="text-foreground/80 text-sm">
                  Press <code className="bg-secondary px-2 py-1 rounded text-xs">Super + Alt + Space</code> to open the Omarchy Menu, then go to <strong>Style → Theme</strong>
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue font-mono mb-2">Quick Selector</h4>
                <p className="text-foreground/80 text-sm">
                  Or use <code className="bg-secondary px-2 py-1 rounded text-xs">Super + Ctrl + Shift + Space</code> to jump directly to the theme selector
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue font-mono mb-2">Background Rotation</h4>
                <p className="text-foreground/80 text-sm">
                  Most themes have multiple backgrounds. Press <code className="bg-secondary px-2 py-1 rounded text-xs">Super + Ctrl + Space</code> to cycle through them
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue font-mono mb-2">What Gets Styled</h4>
                <p className="text-foreground/80 text-sm">
                  Each theme styles desktop, terminal, Neovim, btop, notifications, waybar, walker, and hyprlock
                </p>
              </div>
            </div>
            <div className="text-center pt-4 border-t border-secondary">
              <p className="text-foreground/70 text-sm mb-3">
                For detailed theme information and customization options:
              </p>
              <a 
                href="https://learn.omacom.io/2/the-omarchy-manual/52/themes"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-blue hover:text-blue-hover transition-colors font-mono text-sm underline"
              >
                View official Omarchy themes documentation
              </a>
            </div>
          </div>
        </div>

        {/* Contribution CTA */}
        <div className="mt-8 text-center">
          <div className="pixel-card max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-green font-mono mb-4">
              Share Your Themes
            </h3>
            <p className="text-foreground/80 mb-4">
              Created a beautiful theme? Share it with the community and help others customize their setups.
            </p>
            <a 
              href="https://github.com/deepakness/omarchy-hub/issues/new?template=theme-submission.yml"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="pixel-button inline-flex items-center gap-2"
            >
              Submit a Theme
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}