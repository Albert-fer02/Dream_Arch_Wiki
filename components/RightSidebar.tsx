import React from 'react';
import type { Page } from '../App';
import { ChevronRightIcon, XIcon } from './icons';

interface RightSidebarProps {
    page: Page;
    isOpen: boolean;
    onClose: () => void;
}

const TocEntry: React.FC<{ children: React.ReactNode, nested?: boolean, active?: boolean }> = ({ children, nested, active }) => (
    <li className={`flex items-center text-sm py-1 cursor-pointer ${nested ? 'ml-4' : ''} ${active ? 'text-cyan-400' : 'hover:text-slate-100'}`}>
        <ChevronRightIcon className="h-4 w-4 mr-2 text-slate-500" />
        <span>{children}</span>
    </li>
);

const TocContent: React.FC<{ page: Page, onClose: () => void }> = ({ page, onClose }) => {
    const HomeTOC: React.FC = () => (
        <div>
            <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-100">Table Contents</h3>
                <button onClick={onClose} className="p-2 md:hidden">
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="p-4">
                <ul className="space-y-1">
                    <TocEntry>Desktop Environments</TocEntry>
                    <TocEntry active>Packages</TocEntry>
                    <TocEntry nested>Package Management</TocEntry>
                    <TocEntry>System Administration</TocEntry>
                    <TocEntry>Security</TocEntry>
                    <TocEntry>Network Configuration</TocEntry>
                    <TocEntry>Boot Process</TocEntry>
                    <TocEntry>Kernel</TocEntry>
                    <TocEntry>Hardware</TocEntry>
                    <TocEntry>Audio</TocEntry>
                    <TocEntry>Graphics</TocEntry>
                    <TocEntry>Virtualization</TocEntry>
                </ul>
            </div>
        </div>
    );

    const ArticleTOC: React.FC = () => (
        <div>
            <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-100">Unit Files</h3>
                <button onClick={onClose} className="p-2 md:hidden">
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="p-4">
                <ul className="space-y-1">
                    <TocEntry active>Systemd</TocEntry>
                    <TocEntry>Units</TocEntry>
                    <TocEntry nested>Service Units</TocEntry>
                    <TocEntry>Timers</TocEntry>
                    <TocEntry>Targets</TocEntry>
                    <TocEntry>Mounts</TocEntry>
                    <TocEntry>Paths</TocEntry>
                    <TocEntry>Connecting Units</TocEntry>
                    <TocEntry>Unit Files</TocEntry>
                </ul>
            </div>
        </div>
    );

    return page === 'home' ? <HomeTOC /> : <ArticleTOC />;
}


const RightSidebar: React.FC<RightSidebarProps> = ({ page, isOpen, onClose }) => {
    return (
        <aside
            className={`
        fixed md:sticky top-16 right-0 md:top-auto h-[calc(100vh-4rem)] md:h-auto z-30
        w-80 md:w-64 bg-slate-900 overflow-y-auto shadow-xl md:shadow-none
        transition-transform transform md:translate-x-0 duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
            aria-label="Table of contents"
        >
            <TocContent page={page} onClose={onClose} />
        </aside>
    );
};

export default RightSidebar;