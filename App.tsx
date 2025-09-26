import React, { useState } from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CommunityPortal from './pages/CommunityPortal';
import InstallationGuide from './pages/InstallationGuide';
import PackageManagement from './pages/PackageManagement';
import { useDarkMode } from './hooks/useDarkMode';

export type Page = 'home' | 'article' | 'community' | 'installation' | 'pacman';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [theme, toggleTheme] = useDarkMode();
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-300 font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-cyan-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        Skip to main content
      </a>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        toggleLeftSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
        toggleRightSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
      />
      <div className="flex flex-1 max-w-7xl mx-auto w-full relative">
        {(isLeftSidebarOpen || isRightSidebarOpen) && (
          <div
            className="fixed inset-0 bg-black/60 z-20 md:hidden"
            onClick={() => {
              setIsLeftSidebarOpen(false);
              setIsRightSidebarOpen(false);
            }}
            aria-hidden="true"
          ></div>
        )}

        <LeftSidebar
          currentPage={page}
          setPage={setPage}
          isOpen={isLeftSidebarOpen}
          onClose={() => setIsLeftSidebarOpen(false)}
        />
        <main id="main-content" className="flex-1 bg-slate-800 md:border-x border-slate-700/50 min-w-0">
          {page === 'home' && <HomePage />}
          {page === 'article' && <ArticlePage />}
          {page === 'community' && <CommunityPortal />}
          {page === 'installation' && <InstallationGuide />}
          {page === 'pacman' && <PackageManagement />}
        </main>
        <RightSidebar
          page={page}
          isOpen={isRightSidebarOpen}
          onClose={() => setIsRightSidebarOpen(false)}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;