import Link from 'next/link';

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function NavButton({ href, children }: NavButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm font-semibold transition-all duration-200 border-2 border-blue/30 bg-blue/5 text-blue hover:bg-blue hover:text-background hover:border-blue hover:transform hover:scale-105 rounded-xl";
  
  return (
    <Link href={href} className={baseClasses}>
      {children}
    </Link>
  );
}
