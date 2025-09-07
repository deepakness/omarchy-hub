import Card from '../../components/Card';
import Breadcrumb from '../../components/Breadcrumb';
import setupsData from '../../data/setups.json';

export default function SetupsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Setups' }
          ]} />
          <h1 className="text-4xl font-bold text-green font-mono mb-4">Setups</h1>
          <p className="text-foreground/80 text-lg">
            Beautiful Omarchy setups shared by the community. Browse different configurations and get inspired for your own setup.
          </p>
        </div>


        {/* Setups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {setupsData.map((setup) => (
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
              rel="noopener noreferrer"
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
