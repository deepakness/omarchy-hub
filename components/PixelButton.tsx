import Link from 'next/link';

interface PixelButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export default function PixelButton({ href, children, external = false }: PixelButtonProps) {
  const Component = external ? 'a' : Link;
  const props = external 
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href };

  return (
    <Component {...props} className="pixel-button inline-flex items-center gap-2">
      {children}
    </Component>
  );
}
