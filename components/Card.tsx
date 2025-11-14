import { Smartphone } from 'lucide-react';

// Helper function to add i0.wp.com prefix to all image URLs
function getImageUrl(screenshot: string): string {
  // If it's already a full URL
  if (screenshot.startsWith('http')) {
    try {
      const url = new URL(screenshot);
      // If it's from our domain, add i0.wp.com prefix
      if (url.hostname === 'omarchy.deepakness.com') {
        return `https://i0.wp.com/${url.hostname}${url.pathname}${url.search}${url.hash}`;
      }
    } catch {
      // Invalid URL, return as is
    }
    return screenshot;
  }
  
  // For relative paths, always add i0.wp.com prefix
  const path = screenshot.startsWith('/') ? screenshot : `/${screenshot}`;
  return `https://i0.wp.com/omarchy.deepakness.com${path}`;
}

interface CardProps {
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  author?: string;
  link?: string;
  screenshot?: string;
  screenshotAlt?: string;
  device?: string;
  children?: React.ReactNode;
}

export default function Card({ 
  title, 
  description, 
  category, 
  tags, 
  author, 
  link, 
  screenshot,
  screenshotAlt,
  device,
  children 
}: CardProps) {
  const CardWrapper = link ? 'a' : 'div';
  const cardProps = link 
    ? { href: link, target: '_blank', rel: 'noopener noreferrer nofollow' }
    : {};

  const cardClasses = screenshot 
    ? "pixel-card block overflow-hidden p-0" 
    : "pixel-card block";

  return (
    <CardWrapper {...cardProps} className={cardClasses}>
      {/* Screenshot at the top - full width, no padding */}
      {screenshot && (
        <div className={`w-full bg-secondary/50 border-b border-secondary relative overflow-hidden ${
          screenshotAlt?.includes('Setup') ? 'aspect-[1/1]' : 'h-64'
        }`}>
          <img
            src={getImageUrl(screenshot)}
            alt={screenshotAlt || 'Screenshot'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      
      {/* Content area with conditional padding */}
      <div className={screenshot ? "p-5" : ""}>
        <div className="mb-2">
          {category && (
            <span className="text-xs font-mono text-green bg-green/10 px-2 py-1 rounded">
              {category}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
        
        {description && (
          <p className="text-sm text-foreground/80 mb-3 leading-relaxed">{description}</p>
        )}
        
        {author && (
          <p className={`text-xs text-blue font-mono ${device || (tags && tags.length > 0) || children ? 'mb-2' : 'mb-0'}`}>by {author}</p>
        )}
        
        {device && (
          <p className={`text-xs text-foreground/70 font-mono flex items-center gap-1 ${(tags && tags.length > 0) || children ? 'mb-2' : 'mb-0'}`}>
            <Smartphone size={14} /> 
            {device}
          </p>
        )}
        
        {tags && tags.length > 0 && (
          <div className={`flex flex-wrap gap-1 mt-3 ${children ? 'mb-2' : 'mb-0'}`}>
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs font-mono text-blue bg-blue/20 border border-blue/30 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {children}
      </div>
    </CardWrapper>
  );
}
