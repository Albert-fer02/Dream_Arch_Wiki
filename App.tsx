import React, { useState } from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import { useDarkMode } from './hooks/useDarkMode';

export type Page = 'home' | 'article';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [theme, toggleTheme] = useDarkMode();
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-300 font-sans">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        toggleLeftSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
        toggleRightSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
      />
      <div className="flex flex-1 container mx-auto w-full px-4 relative">
        {(isLeftSidebarOpen || isRightSidebarOpen) && (
            <div 
                className="fixed inset-0 bg-black/60 z-20 md:hidden"
                onClick={() => {
                    setIsLeftSidebarOpen(false);
                    setIsRightSidebarOpen(false);
                }}
            ></div>
        )}

        <LeftSidebar 
            currentPage={page} 
            setPage={setPage} 
            isOpen={isLeftSidebarOpen}
            onClose={() => setIsLeftSidebarOpen(false)}
        />
        <main className="flex-1 bg-slate-800 md:border-x border-slate-700/50">
          {page === 'home' ? <HomePage /> : <ArticlePage />}
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