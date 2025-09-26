import React from 'react';
import { InfoIcon, DownloadIcon, SystemIcon, DesktopIcon, NetworkIcon, HardwareIcon, AppsIcon } from '../components/icons';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description }) => (
  <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 hover:bg-slate-700/50 transition-all cursor-pointer">
    <div className="flex items-center space-x-4">
      <div className="text-cyan-400">{icon}</div>
      <div>
        <h3 className="font-bold text-slate-100">{title}</h3>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      </div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const cards = [
    { icon: <DownloadIcon className="w-8 h-8"/>, title: "Installation", description: "Stone tsinerorse essbt aond thur tise baste." },
    { icon: <SystemIcon className="w-8 h-8"/>, title: "System Administration", description: "Thinse hstoruwa's dirsta rnond su Pira Sarne." },
    { icon: <DesktopIcon className="w-8 h-8"/>, title: "Desktop Envioraments", description: "Denin taso irintorass xovcert ad Pira Dasde." },
    { icon: <HardwareIcon className="w-8 h-8"/>, title: "Hardware", description: "Tures s bose tice to loor tire onutostoro exct eesvistis resi enstet." },
    { icon: <NetworkIcon className="w-8 h-8"/>, title: "Networking", description: "Suasre ne ant sei sias eets onst excesteeot s oroups nexc tistp." },
    { icon: <NetworkIcon className="w-8 h-8"/>, title: "Networking", description: "Toem slae tose sae saionusining tosm stias rpne ptstnes." },
    { icon: <HardwareIcon className="w-8 h-8"/>, title: "Hardware", description: "Tlower sat cst totne itone to tenses xerse si xistis." },
    { icon: <AppsIcon className="w-8 h-8"/>, title: "Applicaking", description: "Slone f at otrei dte, m a xistound caa tid uirnor storsm euoprusts." },
    { icon: <AppsIcon className="w-8 h-8"/>, title: "Applications", description: "Fesnons tmostse saxo waits Etre cB bst Suste." },
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

      <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700 mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Welcome to the Arch Wiki!</h2>
        <p className="text-slate-400">
            A community-maintained knowledge base for Arch Linux and its derivative distributions. Feel free to explore, learn, and contribute.
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} icon={card.icon} title={card.title} description={card.description} />
        ))}
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
                <div className="p-4 bg-slate-800/50 rounded-md border border-slate-700/50">
                    <p className="font-semibold text-slate-300">Peytsad Browstsaod.tesa 12007</p>
                    <p className="text-slate-400 text-xs mt-1">2023-10-26</p>
                </div>
                 <div className="p-4 bg-slate-800/50 rounded-md border border-slate-700/50">
                    <p className="font-semibold text-slate-300">BO.FIP Deixy toth Iso oes. 20031</p>
                    <p className="text-slate-400 text-xs mt-1">2023-09-15</p>
                </div>
            </div>
         </div>
         <div className="lg:col-span-1">
             <h2 className="text-2xl font-bold text-white mb-4">Did you know...</h2>
             <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 space-y-3 text-sm text-slate-400 h-full">
                <p>...that you can use <code className="text-xs bg-slate-700 px-1.5 py-0.5 rounded">pacman -Syu --noconfirm</code> to automate updates in scripts?</p>
                <p>...that the Arch Linux logo is meant to represent style and minimalism?</p>
             </div>
         </div>
      </div>
    </div>
  );
};

export default HomePage;