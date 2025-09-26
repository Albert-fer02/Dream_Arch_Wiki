import React from 'react';
import InfoBox from '../components/InfoBox';
import { InfoIcon, AppsIcon, NetworkIcon, DesktopIcon } from '../components/icons';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-600 pb-2">{title}</h2>
    {children}
  </div>
);

const LinkCard: React.FC<{ icon: React.ReactNode; title: string; description: string; href?: string }> = ({
  icon, title, description, href = "#"
}) => (
  <a href={href} className="block p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-400 hover:bg-slate-700/50 transition-all duration-200 group">
    <div className="flex items-start space-x-3">
      <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-200">{icon}</div>
      <div>
        <h3 className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      </div>
    </div>
  </a>
);

const CommunityPortal: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Community portal</h1>
      </div>

      <InfoBox
        title="Welcome to the Arch community!"
        type="tip"
      >
        The Arch community is friendly and helpful. However, there is no such thing as an Arch expert. Everyone is a user, everyone's input is valued, and everyone learns.
      </InfoBox>

      <Section title="Getting involved">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LinkCard
            icon={<InfoIcon className="w-6 h-6" />}
            title="ArchWiki:Contributing"
            description="Learn how to contribute to the ArchWiki documentation"
          />
          <LinkCard
            icon={<NetworkIcon className="w-6 h-6" />}
            title="Bug reporting"
            description="Help improve Arch Linux by reporting bugs and issues"
          />
          <LinkCard
            icon={<AppsIcon className="w-6 h-6" />}
            title="Forum etiquette"
            description="Guidelines for participating in the Arch Linux forums"
          />
          <LinkCard
            icon={<DesktopIcon className="w-6 h-6" />}
            title="IRC channels"
            description="Join real-time discussions on IRC"
          />
        </div>
      </Section>

      <Section title="Community resources">
        <div className="space-y-4">
          <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Forums</h3>
            <p className="text-slate-400 mb-4">The official Arch Linux forums are the primary place for community discussion, support, and announcements.</p>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Arch Linux Forums</a></li>
              <li><a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Installation</a></li>
              <li><a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Newbie Corner</a></li>
              <li><a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Applications & Desktop Environments</a></li>
            </ul>
          </div>

          <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">IRC Channels</h3>
            <p className="text-slate-400 mb-4">Real-time chat channels for immediate help and community interaction.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Main Channels</h4>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li><code className="bg-slate-700 px-2 py-1 rounded">#archlinux</code> - Main support channel</li>
                  <li><code className="bg-slate-700 px-2 py-1 rounded">#archlinux-newbie</code> - Beginner-friendly help</li>
                  <li><code className="bg-slate-700 px-2 py-1 rounded">#archlinux-offtopic</code> - General discussion</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Specialized Channels</h4>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li><code className="bg-slate-700 px-2 py-1 rounded">#archlinux-aur</code> - AUR discussion</li>
                  <li><code className="bg-slate-700 px-2 py-1 rounded">#archlinux-women</code> - Women in Arch</li>
                  <li><code className="bg-slate-700 px-2 py-1 rounded">#archlinux-security</code> - Security topics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Code of conduct">
        <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
          <p className="text-slate-400 leading-relaxed mb-4">
            When seeking support, remember that community volunteers donate their free time to help you.
            Respect others and their viewpoints, even if you disagree.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">Do</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Search before asking questions</li>
                <li>• Be patient and respectful</li>
                <li>• Provide relevant system information</li>
                <li>• Stay on topic</li>
                <li>• Help others when you can</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-400 mb-2">Don't</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Ask to ask (just ask your question)</li>
                <li>• Cross-post the same question</li>
                <li>• Demand immediate responses</li>
                <li>• Use offensive language</li>
                <li>• Post off-topic content</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="International communities">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="font-semibold text-slate-200 mb-2">Deutsch</h4>
            <p className="text-sm text-slate-400">German-speaking community resources</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="font-semibold text-slate-200 mb-2">Español</h4>
            <p className="text-sm text-slate-400">Spanish-speaking community resources</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="font-semibold text-slate-200 mb-2">Français</h4>
            <p className="text-sm text-slate-400">French-speaking community resources</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="font-semibold text-slate-200 mb-2">Italiano</h4>
            <p className="text-sm text-slate-400">Italian-speaking community resources</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="font-semibold text-slate-200 mb-2">Polski</h4>
            <p className="text-sm text-slate-400">Polish-speaking community resources</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="font-semibold text-slate-200 mb-2">Русский</h4>
            <p className="text-sm text-slate-400">Russian-speaking community resources</p>
          </div>
        </div>
      </Section>

      <Section title="Contributing to Arch Linux">
        <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
          <p className="text-slate-400 leading-relaxed mb-4">
            Arch Linux is a community-driven distribution. There are many ways to contribute,
            regardless of your technical skill level.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-cyan-400 mb-3">Documentation</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Edit and improve wiki articles</li>
                <li>• Translate content</li>
                <li>• Write tutorials</li>
                <li>• Report documentation bugs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-400 mb-3">Development</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Maintain AUR packages</li>
                <li>• Report and fix bugs</li>
                <li>• Test packages</li>
                <li>• Submit patches</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CommunityPortal;