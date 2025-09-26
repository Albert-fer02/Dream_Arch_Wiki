import React from 'react';
import type { Page } from '../App';
import { XIcon } from './icons';

interface LeftSidebarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NavLink: React.FC<{ active?: boolean; onClick?: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <li 
    onClick={onClick}
    className={`pl-4 py-1.5 text-sm cursor-pointer border-l-2 ${active ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10' : 'border-transparent hover:border-slate-500 hover:text-slate-100'}`}
  >
    {children}
  </li>
);

const SectionTitle: React.FC<{children: React.ReactNode}> = ({children}) => (
    <h3 className="text-xs font-bold uppercase text-slate-500 px-2 mb-2">{children}</h3>
);

const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentPage, setPage, isOpen, onClose }) => {
  const handleLinkClick = (page: Page) => {
    setPage(page);
    onClose();
  }

  return (
    <aside className={`
      fixed md:sticky top-0 md:top-auto h-full md:h-auto z-30 
      w-64 bg-slate-900 p-4 space-y-6 overflow-y-auto 
      transition-transform transform md:translate-x-0 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex justify-between items-center md:hidden">
          <h2 className="font-bold text-lg text-white">Menu</h2>
          <button onClick={onClose} className="p-2">
              <XIcon className="w-6 h-6"/>
          </button>
      </div>

      <div>
        <SectionTitle>Navigation</SectionTitle>
        <ul className="space-y-1">
          <NavLink active={currentPage === 'home'} onClick={() => handleLinkClick('home')}>Main page</NavLink>
          <NavLink>Community portal</NavLink>
          <NavLink>Recent changes</NavLink>
          <NavLink>Random page</NavLink>
        </ul>
      </div>

      <div>
        <SectionTitle>Categories</SectionTitle>
        <details open className="mt-2">
            <summary className="text-sm font-semibold text-slate-100 cursor-pointer list-none flex items-center justify-between p-2 rounded hover:bg-slate-700/50">Installation</summary>
            <ul className="mt-1 ml-2 space-y-1">
                <NavLink>Installation guide</NavLink>
                <NavLink>Boot process</NavLink>
                <NavLink active={currentPage === 'article'} onClick={() => handleLinkClick('article')}>Systemd</NavLink>
                <NavLink>GRUB</NavLink>
            </ul>
        </details>
         <details className="mt-2">
            <summary className="text-sm font-semibold text-slate-100 cursor-pointer list-none flex items-center justify-between p-2 rounded hover:bg-slate-700/50">System</summary>
            <ul className="mt-1 ml-2 space-y-1">
                <NavLink>Pacman</NavLink>
                <NavLink>Kernel</NavLink>
                <NavLink>Security</NavLink>
            </ul>
        </details>
      </div>
       <div>
        <SectionTitle>Info</SectionTitle>
        <ul className="space-y-1">
          <NavLink>About</NavLink>
          <NavLink>Development</NavLink>
          <NavLink>Contribute</NavLink>
        </ul>
      </div>
       <div>
        <SectionTitle>Tools</SectionTitle>
        <ul className="space-y-1">
          <NavLink>Page Tools</NavLink>
          <NavLink>Special pages</NavLink>
        </ul>
      </div>
    </aside>
  );
};

export default LeftSidebar;