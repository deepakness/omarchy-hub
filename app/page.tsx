import OmarchyLogo from '../components/OmarchyLogo';
import PixelButton from '../components/PixelButton';
import Card from '../components/Card';
import NavButton from '../components/NavButton';
import { Globe, Palette, Monitor, BookOpen, Github } from 'lucide-react';

// Import data
import themesData from '../data/themes.json';
import setupsData from '../data/setups.json';
import resourcesData from '../data/resources.json';
import linksData from '../data/links.json';

export default function Home() {
  const featuredThemes = themesData.slice(0, 3);
  const featuredSetups = setupsData.slice(0, 3);
  const featuredResources = resourcesData.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <OmarchyLogo />
        
        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <PixelButton href="https://omarchy.org/" external>
            <Globe size={20} />
            Official Website
          </PixelButton>
          <PixelButton href="#setups">
            <Monitor size={20} />
            Setups
          </PixelButton>
          <PixelButton href="#themes">
            <Palette size={20} />
            Themes
          </PixelButton>
          <PixelButton href="#resources">
            <BookOpen size={20} />
            Resources
          </PixelButton>
        </div>

        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          Welcome to the community-driven collection of themes, setups, and resources for Omarchy. 
          Share your configurations, discover new themes, and get inspired by fellow users.
        </p>
      </section>

      {/* Featured Sections */}
      <div className="container mx-auto px-4 py-8">
        {/* Setups Section */}
        <section id="setups" className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-green font-mono">Featured Setups</h2>
            <NavButton href="/setups">
              View All
            </NavButton>
          </div>
          <p className="text-foreground/80 mb-8">
            Inspiring workstation configurations and hardware setups from the Omarchy community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSetups.map((setup) => (
              <Card
                key={setup.id}
                title={setup.name}
                description={setup.description}
                link={setup.link}
                screenshot={setup.screenshot}
                screenshotAlt="Setup Screenshot"
                device={setup.device}
                tags={setup.tags}
              />
            ))}
          </div>
        </section>


        {/* Themes Section */}
        <section id="themes" className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-green font-mono">Featured Themes</h2>
            <NavButton href="/themes">
              View All
            </NavButton>
          </div>
          <p className="text-foreground/80 mb-8">
            Beautiful color schemes and visual themes to customize your Omarchy experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredThemes.map((theme) => (
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
        </section>

        {/* Resources Section */}
        <section id="resources" className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-green font-mono">Featured Resources</h2>
            <NavButton href="/resources">
              View All
            </NavButton>
          </div>
          <p className="text-foreground/80 mb-8">
            Helpful guides, articles, and community discussions about Omarchy and related technologies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
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
        </section>

        {/* Links Section */}
        <section id="links" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-green font-mono">Useful Links</h2>
            <p className="text-foreground/80 mt-2">
              Quick access to official Omarchy resources and related projects.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {linksData.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-card block hover:border-blue transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-mono">{link.name}</span>
                  <Globe size={16} className="text-blue" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contribution Section */}
        <section className="mb-16">
          <div className="pixel-card max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-green font-mono mb-4">Contribute to Omarchy Hub</h2>
            <p className="text-foreground/80 mb-6">
              Help grow the Omarchy community by sharing your setups, themes, and resources. 
              Your contributions help others discover new ways to customize and use Omarchy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <a 
                href="https://github.com/deepakness/omarchy-hub/issues/new?template=setup-submission.yml"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-button text-center"
              >
                <Monitor size={20} className="mx-auto mb-2" />
                Share Setup
              </a>
              <a 
                href="https://github.com/deepakness/omarchy-hub/issues/new?template=theme-submission.yml"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-button text-center"
              >
                <Palette size={20} className="mx-auto mb-2" />
                Submit Theme
              </a>
              <a 
                href="https://github.com/deepakness/omarchy-hub/issues/new?template=resource-submission.yml"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-button text-center"
              >
                <BookOpen size={20} className="mx-auto mb-2" />
                Add Resource
              </a>
              <a 
                href="https://github.com/deepakness/omarchy-hub/issues/new?template=link-submission.yml"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-button text-center"
              >
                <Globe size={20} className="mx-auto mb-2" />
                Suggest Link
              </a>
            </div>
            <p className="text-foreground/60 text-sm mt-4">
              <a 
                href="https://github.com/deepakness/omarchy-hub/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue hover:text-blue-hover transition-colors underline"
              >
                Read our contribution guidelines
              </a>
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-primary border-t border-secondary py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-foreground/60 font-mono">
              Created by{' '}
              <a 
                href="https://deepakness.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue hover:text-blue-hover transition-colors"
              >
                DeepakNess
              </a>
            </p>
            <a
              href="https://github.com/deepakness/omarchy-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-blue transition-colors font-mono"
            >
              <Github size={18} />
              View on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
