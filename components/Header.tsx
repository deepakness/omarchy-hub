'use client';

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="bg-primary border-b border-secondary">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-green font-mono tracking-wider">
              OMARCHY
            </h1>
            <span className="text-blue font-mono text-sm">Hub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/setups" 
              className="text-foreground hover:text-blue transition-colors font-mono"
            >
              Setups
            </Link>
            <Link 
              href="/themes" 
              className="text-foreground hover:text-blue transition-colors font-mono"
            >
              Themes
            </Link>
            <Link 
              href="/resources" 
              className="text-foreground hover:text-blue transition-colors font-mono"
            >
              Resources
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-foreground hover:text-blue transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-secondary">
          <div className="flex flex-col space-y-2">
            <Link 
              href="/setups" 
              className="text-foreground hover:text-blue transition-colors font-mono py-2"
            >
              Setups
            </Link>
            <Link 
              href="/themes" 
              className="text-foreground hover:text-blue transition-colors font-mono py-2"
            >
              Themes
            </Link>
            <Link 
              href="/resources" 
              className="text-foreground hover:text-blue transition-colors font-mono py-2"
            >
              Resources
            </Link>
          </div>
        </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
