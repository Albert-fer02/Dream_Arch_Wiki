import React from 'react';
import { LogoIcon, SearchIcon, UserIcon, SunIcon, MoonIcon, MenuIcon, TocIcon } from './icons';

interface HeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    toggleLeftSidebar: () => void;
    toggleRightSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, toggleLeftSidebar, toggleRightSidebar }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
           <div className="flex items-center space-x-2">
                <button onClick={toggleLeftSidebar} className="p-2 md:hidden hover:text-cyan-400">
                    <MenuIcon className="h-6 w-6" />
                </button>
                <LogoIcon className="h-8 w-8 text-cyan-400" />
           </div>

          <div className="flex-1 flex justify-center px-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search the wiki..."
                className="bg-slate-700 text-slate-200 placeholder-slate-400 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-6">
            <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
              <a href="#" className="hover:text-cyan-400">Main Page</a>
              <a href="#" className="hover:text-cyan-400">Community</a>
              <a href="#" className="hover:text-cyan-400">News</a>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
                <button className="hover:text-cyan-400"><UserIcon className="h-6 w-6" /></button>
                <button onClick={toggleTheme} className="hover:text-cyan-400">
                    {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                </button>
            </div>
             <button onClick={toggleRightSidebar} className="p-2 md:hidden hover:text-cyan-400">
                <TocIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;