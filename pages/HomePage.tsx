import React from 'react';
import { InfoIcon, DownloadIcon, SystemIcon, DesktopIcon, NetworkIcon, HardwareIcon, AppsIcon } from '../components/icons';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-400 hover:bg-slate-700/50 hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in backdrop-blur-sm">
    <div className="flex items-start space-x-4">
      <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-200">{title}</h3>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const distributionCards = [
    { icon: <DownloadIcon className="w-8 h-8" />, title: "Installation guide", description: "Complete guide to installing Arch Linux on various systems and configurations." },
    { icon: <SystemIcon className="w-8 h-8" />, title: "General recommendations", description: "Post-installation configuration and optimization tips for Arch Linux." },
    { icon: <InfoIcon className="w-8 h-8" />, title: "Frequently asked questions", description: "Common questions and answers about Arch Linux and its usage." },
  ];

  const systemCards = [
    { icon: <SystemIcon className="w-8 h-8" />, title: "System administration", description: "Essential tools and practices for managing your Arch Linux system." },
    { icon: <HardwareIcon className="w-8 h-8" />, title: "Hardware", description: "Configuration guides for various hardware components and devices." },
    { icon: <NetworkIcon className="w-8 h-8" />, title: "Networking", description: "Network configuration, wireless setup, and connectivity solutions." },
  ];

  const applicationCards = [
    { icon: <DesktopIcon className="w-8 h-8" />, title: "Desktop environments", description: "Guide to desktop environments like GNOME, KDE, XFCE, and others." },
    { icon: <AppsIcon className="w-8 h-8" />, title: "Applications", description: "Software installation, configuration, and recommendations." },
    { icon: <SystemIcon className="w-8 h-8" />, title: "Development", description: "Programming tools, compilers, and development environment setup." },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Arch Wiki</h1>
        <button className="flex items-center space-x-2 text-sm text-cyan-400 bg-cyan-400/10 py-2 px-4 rounded-full hover:bg-cyan-400/20 transition">
          <InfoIcon className="w-5 h-5" />
          <span>Info fis</span>
        </button>
      </div>

      <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700 mb-8 shadow-lg backdrop-blur-sm animate-fade-in">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Welcome to the Arch Wiki!</h2>
        <p className="text-slate-400 leading-relaxed">
          A community-maintained knowledge base for Arch Linux and its derivative distributions. Feel free to explore, learn, and contribute.
        </p>
      </div>



      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Latest News</h2>
            <button className="flex items-center space-x-2 text-sm text-cyan-400 bg-cyan-400/10 py-2 px-4 rounded-full hover:bg-cyan-400/20 transition">
              <InfoIcon className="w-5 h-5" />
              <span>Infoqs</span>
            </button>
          </div>
          <div className="space-y-4 text-sm border-t border-slate-700 pt-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors animate-fade-in">
              <p className="font-semibold text-slate-300">Peytsad Browstsaod.tesa 12007</p>
              <p className="text-slate-400 text-xs mt-1">2023-10-26</p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <p className="font-semibold text-slate-300">BO.FIP Deixy toth Iso oes. 20031</p>
              <p className="text-slate-400 text-xs mt-1">2023-09-15</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-white mb-4">Did you know...</h2>
          <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700 space-y-3 text-sm text-slate-400 h-full shadow-lg backdrop-blur-sm animate-fade-in">
            <p>...that you can use <code className="text-xs bg-slate-700 px-1.5 py-0.5 rounded hover:bg-slate-600 transition-colors">pacman -Syu --noconfirm</code> to automate updates in scripts?</p>
            <p>...that the Arch Linux logo is meant to represent style and minimalism?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;