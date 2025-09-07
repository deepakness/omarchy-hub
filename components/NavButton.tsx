import Link from 'next/link';

interface NavButtonProps {
  href: string;
  showArrow?: boolean;
  children: React.ReactNode;
}

export default function NavButton({ href, showArrow = false, children }: NavButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 px-4 py-2 font-mono text-sm font-semibold transition-all duration-200 border-2 border-blue bg-blue/10 text-blue hover:bg-blue hover:text-background hover:border-blue-hover rounded-lg";
  
  return (
    <Link href={href} className={baseClasses}>
      {children}
      {showArrow && (
        <span className="text-lg">→</span>
      )}
    </Link>
  );
}
