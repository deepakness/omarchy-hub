import Image from 'next/image';
import { Smartphone } from 'lucide-react';

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
          screenshotAlt?.includes('Setup') ? 'aspect-[5/4]' : 'h-48'
        }`}>
          <Image
            src={screenshot.startsWith('http') ? screenshot : `/${screenshot}`}
            alt={screenshotAlt || 'Screenshot'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
