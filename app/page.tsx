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
  const featuredSetups = [...setupsData]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 3);
  const featuredResources = resourcesData.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        {/* Terminal-style header */}
        <div className="max-w-4xl mx-auto">
          <div className="pixel-card mb-8 bg-secondary border-green/20">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-green/20">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green"></div>
              <span className="text-foreground/60 font-mono text-sm ml-2">~/omarchy-hub</span>
            </div>
            <div className="font-mono text-sm">
              <div className="text-green mb-2">$ cat README.md</div>
              <div className="text-foreground/80 mb-6">
                <div className="mb-3">
                  <div className="text-base">Community resource website for Omarchy Linux: an opinionated Arch + Hyprland setup by DHH</div>
                </div>
              </div>
              
              <div className="text-green mb-2">$ ls -la</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-foreground/80">
                <div className="flex items-center gap-2">
                  <Monitor size={16} className="text-blue" />
                  <span>{setupsData.length} setups/</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette size={16} className="text-blue" />
                  <span>{themesData.length} themes/</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-blue" />
                  <span>{resourcesData.length} resources/</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards - Main CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <a href="#setups" className="pixel-card hover:border-green hover:bg-green/5 transition-all group transform hover:scale-105 border-blue/50">
              <div className="text-center py-3">
                <Monitor size={28} className="mx-auto mb-2 text-blue group-hover:text-green transition-colors" />
                <h3 className="font-mono font-bold text-green mb-1">Browse Setups ({setupsData.length})</h3>
                <p className="text-foreground/70 text-xs">Hardware configs & workstations</p>
              </div>
            </a>
            
            <a href="#themes" className="pixel-card hover:border-green hover:bg-green/5 transition-all group transform hover:scale-105 border-blue/50">
              <div className="text-center py-3">
                <Palette size={28} className="mx-auto mb-2 text-blue group-hover:text-green transition-colors" />
                <h3 className="font-mono font-bold text-green mb-1">Discover Themes ({themesData.length})</h3>
                <p className="text-foreground/70 text-xs">Color schemes & visual styles</p>
              </div>
            </a>
            
            <a href="#resources" className="pixel-card hover:border-green hover:bg-green/5 transition-all group transform hover:scale-105 border-blue/50">
              <div className="text-center py-3">
                <BookOpen size={28} className="mx-auto mb-2 text-blue group-hover:text-green transition-colors" />
                <h3 className="font-mono font-bold text-green mb-1">Find Resources ({resourcesData.length})</h3>
                <p className="text-foreground/70 text-xs">Guides, docs & tutorials</p>
              </div>
            </a>
          </div>

          {/* Quick Links - Secondary */}
          <div className="flex flex-wrap justify-center gap-3 opacity-75">
            <a href="https://omarchy.org/" target="_blank" rel="noopener noreferrer" 
               className="text-foreground/60 hover:text-blue transition-colors font-mono text-sm flex items-center gap-2">
              <Globe size={14} />
              Official Site
            </a>
            <span className="text-foreground/40">•</span>
            <a href="https://github.com/deepakness/omarchy-hub" target="_blank" rel="noopener noreferrer"
               className="text-foreground/60 hover:text-blue transition-colors font-mono text-sm flex items-center gap-2">
              <Github size={14} />
              Contribute
            </a>
          </div>
        </div>
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
                className="pixel-card block"
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

      {/* Footer moved to global layout */}
    </div>
  );
}
