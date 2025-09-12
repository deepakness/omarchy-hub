import Card from '../components/Card';
import NavButton from '../components/NavButton';
import ReleaseCard from '../components/ReleaseCard';
import { Globe, Palette, Monitor, BookOpen, Github, Download, Tag } from 'lucide-react';

// Import data
import themesData from '../data/themes.json';
import setupsData from '../data/setups.json';
import resourcesData from '../data/resources.json';
import linksData from '../data/links.json';
import releasesData from '../data/releases.json';

export default function Home() {
  const featuredThemes = themesData.slice(0, 6);
  const featuredSetups = [...setupsData]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 6);
  const featuredResources = resourcesData.slice(0, 6);
  const featuredReleases = releasesData.slice(0, 3);
  const latestRelease = releasesData.find(release => release.isLatest) || releasesData[0];

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
              <span className="text-foreground/60 font-mono text-base ml-2">~/omarchy-hub</span>
            </div>
            <div className="font-mono text-sm">
              <div className="text-base text-green mb-2">$ cat README.md</div>
              <div className="text-foreground/80 mb-6">
                <div className="mb-3">
                    <div className="text-base">Community hub for Omarchy — DHH&apos;s keyboard-driven, developer-focused Linux distribution built on Arch + Hyprland</div>
                </div>
              </div>
              
              <div className="text-base text-green mb-2">$ ls -la</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-foreground/80">
                <div className="flex items-center gap-2">
                  <Monitor size={18} className="text-blue" />
                  <span className="text-base">{setupsData.length} setups/</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette size={18} className="text-blue" />
                  <span className="text-base">{themesData.length} themes/</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-blue" />
                  <span className="text-base">{resourcesData.length} resources/</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards - Main CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <a href="#setups" className="pixel-card">
              <div className="flex items-center gap-4 py-2 md:flex-col md:text-center md:gap-0 md:py-3">
                <Monitor size={24} className="text-blue md:mx-auto md:mb-2 flex-shrink-0" />
                <div className="md:w-full">
                  <h3 className="font-mono font-bold text-green text-lg md:text-base md:mb-1">Browse Setups ({setupsData.length})</h3>
                  <p className="text-foreground/70 text-sm hidden md:block">Hardware configs & workstations</p>
                </div>
              </div>
            </a>
            
            <a href="#themes" className="pixel-card">
              <div className="flex items-center gap-4 py-2 md:flex-col md:text-center md:gap-0 md:py-3">
                <Palette size={24} className="text-blue md:mx-auto md:mb-2 flex-shrink-0" />
                <div className="md:w-full">
                  <h3 className="font-mono font-bold text-green text-lg md:text-base md:mb-1">Discover Themes ({themesData.length})</h3>
                  <p className="text-foreground/70 text-sm hidden md:block">Color schemes & visual styles</p>
                </div>
              </div>
            </a>
            
            <a href="#resources" className="pixel-card">
              <div className="flex items-center gap-4 py-2 md:flex-col md:text-center md:gap-0 md:py-3">
                <BookOpen size={24} className="text-blue md:mx-auto md:mb-2 flex-shrink-0" />
                <div className="md:w-full">
                  <h3 className="font-mono font-bold text-green text-lg md:text-base md:mb-1">Find Resources ({resourcesData.length})</h3>
                  <p className="text-foreground/70 text-sm hidden md:block">Guides, docs & tutorials</p>
                </div>
              </div>
            </a>
          </div>

          {/* Quick Links - Secondary */}
          <div className="flex flex-wrap justify-center gap-3 opacity-75">
            <a href="https://omarchy.org/" target="_blank" rel="noopener noreferrer nofollow" 
               className="text-foreground/60 hover:text-blue transition-colors font-mono text-base flex items-center gap-2">
              <Globe size={18} />
              Official Website
            </a>
            <span className="text-foreground/40">•</span>
            {latestRelease && (
              <>
                <a href={latestRelease.url} target="_blank" rel="noopener noreferrer nofollow"
                   className="text-foreground/60 hover:text-blue transition-colors font-mono text-base flex items-center gap-2">
                  <Tag size={18} />
                  Latest Release
                </a>
                <span className="text-foreground/40">•</span>
              </>
            )}
            <a href="https://github.com/deepakness/omarchy-hub" target="_blank" rel="noopener noreferrer nofollow"
               className="text-foreground/60 hover:text-blue transition-colors font-mono text-base flex items-center gap-2">
              <Github size={18} />
              Contribute
            </a>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <div className="container mx-auto px-4 py-8">
        {/* Setups Section */}
        <section id="setups" className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-green font-mono mb-1">Featured Setups</h2>
              <div className="w-12 h-1 bg-green rounded-full"></div>
            </div>
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
                category={setup.category}
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-green font-mono mb-1">Featured Themes</h2>
              <div className="w-12 h-1 bg-green rounded-full"></div>
            </div>
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-green font-mono mb-1">Featured Resources</h2>
              <div className="w-12 h-1 bg-green rounded-full"></div>
            </div>
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

        {/* Releases Section */}
        <section id="releases" className="mb-16">
          <div className="mb-6">
            <div>
              <h2 className="text-2xl font-bold text-green font-mono mb-1">Latest Releases</h2>
              <div className="w-12 h-1 bg-green rounded-full"></div>
            </div>
          </div>
          <p className="text-foreground/80 mb-8">
            Stay up to date with the latest Omarchy releases and updates from the official repository.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredReleases.map((release, index) => (
              <ReleaseCard
                key={release.tag || index}
                release={release}
              />
            ))}
          </div>
          {featuredReleases.length === 0 && (
            <div className="pixel-card text-center py-8">
              <Download size={48} className="text-foreground/40 mx-auto mb-4" />
              <p className="text-foreground/60 font-mono">
                No releases data available. Check back later or visit the{' '}
                <a 
                  href="https://github.com/basecamp/omarchy/releases" 
                  target="_blank" 
                  rel="noopener noreferrer nofollow"
                  className="text-blue hover:text-blue-hover transition-colors underline"
                >
                  GitHub releases page
                </a>
                .
              </p>
            </div>
          )}
        </section>

        {/* Links Section */}
        <section id="links" className="mb-16">
          <div className="mb-6">
            <div>
              <h2 className="text-2xl font-bold text-green font-mono mb-1">Useful Links</h2>
              <div className="w-12 h-1 bg-green rounded-full"></div>
            </div>
          </div>
          <p className="text-foreground/80 mb-8">
            Quick access to official Omarchy resources and related projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {linksData.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
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
          <div className="mb-6">
            <div>
              <h2 className="text-2xl font-bold text-green font-mono mb-1">Contribute to Omarchy Hub</h2>
              <div className="w-12 h-1 bg-green rounded-full"></div>
            </div>
          </div>
          <p className="text-foreground/80 mb-8 max-w-3xl">
            Help grow the Omarchy community by sharing your setups, themes, and resources. 
            Your contributions help others discover new ways to customize and use Omarchy.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <a 
              href="https://github.com/deepakness/omarchy-hub/issues/new?template=setup-submission.yml"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="pixel-card flex items-center gap-3"
            >
              <Monitor size={18} className="text-blue flex-shrink-0" />
              <span className="font-mono text-base text-foreground">Share Setup</span>
            </a>
            <a 
              href="https://github.com/deepakness/omarchy-hub/issues/new?template=theme-submission.yml"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="pixel-card flex items-center gap-3"
            >
              <Palette size={18} className="text-blue flex-shrink-0" />
              <span className="font-mono text-base text-foreground">Submit Theme</span>
            </a>
            <a 
              href="https://github.com/deepakness/omarchy-hub/issues/new?template=resource-submission.yml"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="pixel-card flex items-center gap-3"
            >
              <BookOpen size={18} className="text-blue flex-shrink-0" />
              <span className="font-mono text-base text-foreground">Add Resource</span>
            </a>
            <a 
              href="https://github.com/deepakness/omarchy-hub/issues/new?template=link-submission.yml"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="pixel-card flex items-center gap-3"
            >
              <Globe size={18} className="text-blue flex-shrink-0" />
              <span className="font-mono text-base text-foreground">Suggest Link</span>
            </a>
          </div>
          
          <p className="text-foreground/60 text-sm">
            <a 
              href="https://github.com/deepakness/omarchy-hub/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue hover:text-blue-hover transition-colors underline font-mono"
            >
              Read our contribution guidelines
            </a>
          </p>
        </section>
      </div>

      {/* Footer moved to global layout */}
    </div>
  );
}
