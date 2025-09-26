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

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-xs font-bold uppercase text-slate-500 px-2 mb-2">{children}</h3>
);

const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentPage, setPage, isOpen, onClose }) => {
  const handleLinkClick = (page: Page) => {
    setPage(page);
    onClose();
  }

  return (
    <aside
      className={`
        fixed md:sticky top-16 md:top-auto h-[calc(100vh-4rem)] md:h-auto z-30
        w-80 md:w-64 bg-slate-900 p-4 space-y-6 overflow-y-auto shadow-xl md:shadow-none
        transition-transform transform md:translate-x-0 duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      aria-label="Navigation sidebar"
    >
      <div className="flex justify-between items-center md:hidden pb-4 border-b border-slate-700">
        <h2 className="font-bold text-lg text-white">Navigation</h2>
        <button
          onClick={onClose}
          className="p-2 hover:text-cyan-400 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Close navigation menu"
        >
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      <div>
        <SectionTitle>Navigation</SectionTitle>
        <ul className="space-y-1">
          <NavLink active={currentPage === 'home'} onClick={() => handleLinkClick('home')}>Main page</NavLink>
          <NavLink active={currentPage === 'community'} onClick={() => handleLinkClick('community')}>Community portal</NavLink>
          <NavLink>Recent changes</NavLink>
          <NavLink>Random page</NavLink>
        </ul>
      </div>

      <div>
        <SectionTitle>Categories</SectionTitle>
        <details open className="mt-2">
          <summary className="text-sm font-semibold text-slate-100 cursor-pointer list-none flex items-center justify-between p-2 rounded hover:bg-slate-700/50">Installation</summary>
          <ul className="mt-1 ml-2 space-y-1">
            <NavLink active={currentPage === 'installation'} onClick={() => handleLinkClick('installation')}>Installation guide</NavLink>
            <NavLink>Boot process</NavLink>
            <NavLink active={currentPage === 'article'} onClick={() => handleLinkClick('article')}>Systemd</NavLink>
            <NavLink>GRUB</NavLink>
          </ul>
        </details>
        <details className="mt-2">
          <summary className="text-sm font-semibold text-slate-100 cursor-pointer list-none flex items-center justify-between p-2 rounded hover:bg-slate-700/50">System</summary>
          <ul className="mt-1 ml-2 space-y-1">
            <NavLink active={currentPage === 'pacman'} onClick={() => handleLinkClick('pacman')}>Pacman</NavLink>
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