import React from 'react';
import { LogoIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 text-sm text-slate-400">
          <div className="flex items-center space-x-4">
            <LogoIcon className="h-8 w-8 text-cyan-400" />
            <nav className="flex items-center space-x-4">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Disclamier</a>
                <a href="#" className="hover:text-white">About This Wiki</a>
                <a href="#" className="hover:text-white">Contribute</a>
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