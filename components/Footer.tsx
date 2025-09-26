import React from 'react';
import { LogoIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-20 py-4 sm:py-0 text-sm text-slate-400 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <LogoIcon className="h-8 w-8 text-cyan-400" aria-hidden="true" />
            <nav className="flex flex-wrap items-center space-x-4" role="navigation" aria-label="Footer navigation">
              <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2 py-1">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2 py-1">Disclaimer</a>
              <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2 py-1">About This Wiki</a>
              <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2 py-1">Contribute</a>
            </nav>
          </div>
          <div>
            <p>Content License: GFDL &copy; 2023 Arch Linux</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;