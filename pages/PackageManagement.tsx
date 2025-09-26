import React from 'react';
import InfoBox from '../components/InfoBox';
import CodeBlock from '../components/CodeBlock';

interface CommandTableProps {
  title: string;
  commands: { command: string; description: string }[];
}

const CommandTable: React.FC<CommandTableProps> = ({ title, commands }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <div className="overflow-x-auto">
      <table className="w-full bg-slate-800/50 rounded-lg border border-slate-700">
        <thead>
          <tr className="border-b border-slate-600">
            <th className="text-left p-4 text-cyan-400 font-semibold">Command</th>
            <th className="text-left p-4 text-cyan-400 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {commands.map((cmd, index) => (
            <tr key={index} className="border-b border-slate-700 last:border-b-0">
              <td className="p-4">
                <code className="text-sm bg-slate-700 px-2 py-1 rounded text-slate-200">{cmd.command}</code>
              </td>
              <td className="p-4 text-slate-400">{cmd.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PackageManagement: React.FC = () => {
  const basicCommands = [
    { command: "pacman -S package", description: "Install a package" },
    { command: "pacman -R package", description: "Remove a package" },
    { command: "pacman -Rs package", description: "Remove a package and its dependencies" },
    { command: "pacman -Syu", description: "Update the entire system" },
    { command: "pacman -Ss string", description: "Search for packages" },
    { command: "pacman -Q", description: "List installed packages" },
    { command: "pacman -Qi package", description: "Show package information" },
    { command: "pacman -Sc", description: "Clean package cache" },
  ];

  const queryCommands = [
    { command: "pacman -Q", description: "List all installed packages" },
    { command: "pacman -Qe", description: "List explicitly installed packages" },
    { command: "pacman -Qd", description: "List packages installed as dependencies" },
    { command: "pacman -Qdt", description: "List orphaned packages" },
    { command: "pacman -Qo file", description: "Show which package owns a file" },
    { command: "pacman -Ql package", description: "List files owned by a package" },
  ];

  const aurCommands = [
    { command: "git clone https://aur.archlinux.org/package.git", description: "Clone AUR package repository" },
    { command: "makepkg -si", description: "Build and install AUR package" },
    { command: "yay -S package", description: "Install AUR package with yay helper" },
    { command: "paru -S package", description: "Install AUR package with paru helper" },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Package Management</h1>
      </div>

      <InfoBox
        title="Pacman - The Arch Linux Package Manager"
        type="note"
      >
        Pacman is a command-line utility and the default package manager for Arch Linux. It combines a simple binary package format with an easy-to-use build system.
      </InfoBox>

      <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700 mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-3">Overview</h2>
        <p className="text-slate-400 leading-relaxed">
          Pacman keeps the system up-to-date by synchronizing package lists with the master server.
          This server/client model also allows the user to download/install packages with a simple command,
          complete with all required dependencies.
        </p>
      </div>

      <CommandTable title="Basic Operations" commands={basicCommands} />

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">System Updates</h2>
        <p className="text-slate-400 mb-4">
          Arch Linux is a rolling release distribution. Regular updates are essential:
        </p>
        <CodeBlock
          title="Full system update"
          code="sudo pacman -Syu"
        />
        <InfoBox
          title="Warning"
          type="warning"
        >
          Never use pacman -Sy without -u. This can lead to dependency issues and a broken system.
        </InfoBox>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="font-bold text-cyan-400 mb-2">Update flags</h4>
            <ul className="space-y-1 text-sm text-slate-400">
              <li><code className="bg-slate-700 px-1 rounded">-S</code> Synchronize packages</li>
              <li><code className="bg-slate-700 px-1 rounded">-y</code> Download fresh package databases</li>
              <li><code className="bg-slate-700 px-1 rounded">-u</code> Upgrade installed packages</li>
              <li><code className="bg-slate-700 px-1 rounded">-w</code> Download only, don't install</li>
            </ul>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="font-bold text-cyan-400 mb-2">Removal flags</h4>
            <ul className="space-y-1 text-sm text-slate-400">
              <li><code className="bg-slate-700 px-1 rounded">-R</code> Remove package</li>
              <li><code className="bg-slate-700 px-1 rounded">-s</code> Remove dependencies</li>
              <li><code className="bg-slate-700 px-1 rounded">-c</code> Remove config files</li>
              <li><code className="bg-slate-700 px-1 rounded">-n</code> Ignore backup files</li>
            </ul>
          </div>
        </div>
      </div>

      <CommandTable title="Package Queries" commands={queryCommands} />

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Configuration</h2>
        <p className="text-slate-400 mb-4">
          Pacman configuration is located at <code className="bg-slate-700 px-2 py-1 rounded">/etc/pacman.conf</code>:
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-cyan-400 mb-2">Useful options</h4>
            <CodeBlock
              title="/etc/pacman.conf"
              code={`# Enable colored output
Color

# Show download progress
ILoveCandy

# Enable parallel downloads
ParallelDownloads = 5

# Skip package integrity checks (not recommended)
#SigLevel = Never`}
            />
          </div>

          <div>
            <h4 className="font-bold text-cyan-400 mb-2">Repositories</h4>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-slate-400 mb-3">Default Arch Linux repositories:</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><strong className="text-cyan-400">core</strong> - Essential packages</li>
                <li><strong className="text-cyan-400">extra</strong> - Additional packages maintained by Arch developers</li>
                <li><strong className="text-cyan-400">community</strong> - Packages maintained by trusted users</li>
                <li><strong className="text-cyan-400">multilib</strong> - 32-bit libraries for 64-bit systems</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Arch User Repository (AUR)</h2>
        <p className="text-slate-400 mb-4">
          The AUR is a community-driven repository for Arch users. It contains package descriptions (PKGBUILDs)
          that allow you to compile packages from source with makepkg.
        </p>

        <InfoBox
          title="Installing AUR packages manually"
          type="note"
        >
          The traditional way to build and install packages from the AUR involves manually using git and makepkg.
        </InfoBox>

        <div className="mb-6">
          <CodeBlock
            title="Manual AUR installation"
            code={`# Clone the package repository
git clone https://aur.archlinux.org/package-name.git
cd package-name

# Review the PKGBUILD and .SRCINFO files
cat PKGBUILD

# Build and install the package
makepkg -si`}
          />
        </div>

        <CommandTable title="AUR Commands" commands={aurCommands} />

        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <h4 className="font-bold text-cyan-400 mb-2">Popular AUR Helpers</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-slate-200">yay</p>
              <p className="text-sm text-slate-400">Go-based AUR helper with pacman-like syntax</p>
            </div>
            <div>
              <p className="font-semibold text-slate-200">paru</p>
              <p className="text-sm text-slate-400">Rust-based AUR helper, successor to yay</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Package Maintenance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Clean Package Cache</h3>
            <p className="text-slate-400 mb-4">
              Pacman stores downloaded packages in <code className="bg-slate-700 px-1 rounded">/var/cache/pacman/pkg/</code>.
              Clean it regularly to free up disk space.
            </p>
            <CodeBlock
              title="Cache cleaning"
              code={`# Remove all cached packages except installed versions
sudo pacman -Sc

# Remove all cached packages
sudo pacman -Scc`}
            />
          </div>

          <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Remove Orphaned Packages</h3>
            <p className="text-slate-400 mb-4">
              Orphaned packages are dependencies that are no longer needed by any installed package.
            </p>
            <CodeBlock
              title="Remove orphans"
              code={`# List orphaned packages
pacman -Qdt

# Remove orphaned packages
sudo pacman -Rs $(pacman -Qtdq)`}
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="font-bold text-red-400 mb-2">Failed to commit transaction (conflicting files)</h4>
            <p className="text-slate-400 text-sm mb-2">
              This error occurs when files already exist in the filesystem. You can force the installation:
            </p>
            <code className="text-xs bg-slate-700 px-2 py-1 rounded">sudo pacman -S --overwrite='*' package-name</code>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="font-bold text-red-400 mb-2">Database lock file</h4>
            <p className="text-slate-400 text-sm mb-2">
              If pacman crashes, it may leave a lock file. Remove it only if you're sure no other pacman process is running:
            </p>
            <code className="text-xs bg-slate-700 px-2 py-1 rounded">sudo rm /var/lib/pacman/db.lck</code>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="font-bold text-red-400 mb-2">Signature verification failed</h4>
            <p className="text-slate-400 text-sm mb-2">
              Update the archlinux-keyring package if you encounter signature errors:
            </p>
            <code className="text-xs bg-slate-700 px-2 py-1 rounded">sudo pacman -S archlinux-keyring</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageManagement;