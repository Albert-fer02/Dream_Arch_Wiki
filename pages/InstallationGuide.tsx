import React from 'react';
import InfoBox from '../components/InfoBox';
import CodeBlock from '../components/CodeBlock';

interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ number, title, children }) => (
  <div className="mb-8">
    <div className="flex items-center mb-4">
      <div className="bg-cyan-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">
        {number}
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
    <div className="ml-12">
      {children}
    </div>
  </div>
);

const InstallationGuide: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Installation guide</h1>
      </div>

      <InfoBox
        title="Pre-installation"
        type="note"
      >
        This document will guide you through the process of installing Arch Linux using the live system booted from an installation medium made from an official installation image.
      </InfoBox>

      <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700 mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-3">Before you start</h2>
        <ul className="space-y-2 text-slate-400">
          <li>• <strong className="text-slate-300">Read</strong> the entire installation guide before proceeding</li>
          <li>• <strong className="text-slate-300">Backup</strong> any existing data you want to keep</li>
          <li>• <strong className="text-slate-300">Download</strong> the latest Arch Linux ISO from the official website</li>
          <li>• <strong className="text-slate-300">Verify</strong> the ISO integrity with checksums</li>
        </ul>
      </div>

      <Step number={1} title="Verify boot mode">
        <p className="text-slate-400 mb-4">
          Verify the boot mode by checking if the UEFI mode is enabled. If the command shows no error, then the system is booted in UEFI mode.
        </p>
        <CodeBlock
          title="Check UEFI mode"
          code="cat /sys/firmware/efi/fw_platform_size"
        />
        <InfoBox
          title="Note"
          type="note"
        >
          If the file does not exist, the system may be booted in BIOS or CSM mode.
        </InfoBox>
      </Step>

      <Step number={2} title="Connect to the internet">
        <p className="text-slate-400 mb-4">
          To configure the network connection, check the network interface:
        </p>
        <CodeBlock
          title="List network interfaces"
          code="ip link"
        />
        <p className="text-slate-400 mb-4 mt-4">
          For wireless connections, use iwctl:
        </p>
        <CodeBlock
          title="Connect to Wi-Fi"
          code={`iwctl
[iwd]# device list
[iwd]# station device scan
[iwd]# station device get-networks
[iwd]# station device connect SSID`}
        />
        <p className="text-slate-400 mb-4 mt-4">
          Verify connectivity:
        </p>
        <CodeBlock
          title="Test connection"
          code="ping archlinux.org"
        />
      </Step>

      <Step number={3} title="Update the system clock">
        <p className="text-slate-400 mb-4">
          Ensure the system clock is accurate:
        </p>
        <CodeBlock
          title="Enable time synchronization"
          code="timedatectl set-ntp true"
        />
        <p className="text-slate-400 mb-4 mt-4">
          Check the service status:
        </p>
        <CodeBlock
          title="Check time status"
          code="timedatectl status"
        />
      </Step>

      <Step number={4} title="Partition the disks">
        <p className="text-slate-400 mb-4">
          Identify your storage devices:
        </p>
        <CodeBlock
          title="List block devices"
          code="lsblk"
        />
        <p className="text-slate-400 mb-4 mt-4">
          Use fdisk or gdisk to partition your disk:
        </p>
        <CodeBlock
          title="Partition with fdisk (UEFI example)"
          code={`fdisk /dev/sda

# Create GPT partition table
g

# Create EFI system partition (512MB)
n
1

+512M
t
1

# Create root partition (remaining space)
n
2



# Write changes
w`}
        />

        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <h4 className="font-bold text-cyan-400 mb-2">Recommended partition layout (UEFI)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-300 border-b border-slate-600">
                  <th className="text-left p-2">Mount point</th>
                  <th className="text-left p-2">Partition</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Size</th>
                </tr>
              </thead>
              <tbody className="text-slate-400">
                <tr>
                  <td className="p-2">/mnt/boot</td>
                  <td className="p-2">/dev/sda1</td>
                  <td className="p-2">EFI system</td>
                  <td className="p-2">512MB+</td>
                </tr>
                <tr>
                  <td className="p-2">/mnt</td>
                  <td className="p-2">/dev/sda2</td>
                  <td className="p-2">Linux filesystem</td>
                  <td className="p-2">Remainder</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Step>

      <Step number={5} title="Format the partitions">
        <p className="text-slate-400 mb-4">
          Format the EFI system partition:
        </p>
        <CodeBlock
          title="Format EFI partition"
          code="mkfs.fat -F 32 /dev/sda1"
        />
        <p className="text-slate-400 mb-4 mt-4">
          Format the root partition:
        </p>
        <CodeBlock
          title="Format root partition"
          code="mkfs.ext4 /dev/sda2"
        />
      </Step>

      <Step number={6} title="Mount the file systems">
        <p className="text-slate-400 mb-4">
          Mount the root volume:
        </p>
        <CodeBlock
          title="Mount root"
          code="mount /dev/sda2 /mnt"
        />
        <p className="text-slate-400 mb-4 mt-4">
          Create and mount the EFI system partition:
        </p>
        <CodeBlock
          title="Mount EFI partition"
          code={`mkdir -p /mnt/boot
mount /dev/sda1 /mnt/boot`}
        />
      </Step>

      <Step number={7} title="Install essential packages">
        <p className="text-slate-400 mb-4">
          Install the base system:
        </p>
        <CodeBlock
          title="Install base packages"
          code="pacstrap -K /mnt base linux linux-firmware"
        />
        <p className="text-slate-400 mb-4 mt-4">
          Install additional useful packages:
        </p>
        <CodeBlock
          title="Install additional packages"
          code="pacstrap -K /mnt base-devel grub efibootmgr networkmanager nano vim"
        />
      </Step>

      <Step number={8} title="Configure the system">
        <p className="text-slate-400 mb-4">
          Generate the fstab file:
        </p>
        <CodeBlock
          title="Generate fstab"
          code="genfstab -U /mnt >> /mnt/etc/fstab"
        />
        <p className="text-slate-400 mb-4 mt-4">
          Change root into the new system:
        </p>
        <CodeBlock
          title="Chroot"
          code="arch-chroot /mnt"
        />
        <p className="text-slate-400 mb-4 mt-4">
          Set the timezone:
        </p>
        <CodeBlock
          title="Set timezone"
          code={`ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
hwclock --systohc`}
        />
        <p className="text-slate-400 mb-4 mt-4">
          Configure localization:
        </p>
        <CodeBlock
          title="Set locale"
          code={`# Uncomment en_US.UTF-8 UTF-8 in /etc/locale.gen
nano /etc/locale.gen
locale-gen

# Create locale.conf
echo "LANG=en_US.UTF-8" > /etc/locale.conf`}
        />
        <p className="text-slate-400 mb-4 mt-4">
          Set the hostname:
        </p>
        <CodeBlock
          title="Set hostname"
          code="echo 'myhostname' > /etc/hostname"
        />
      </Step>

      <Step number={9} title="Install bootloader">
        <p className="text-slate-400 mb-4">
          Install GRUB:
        </p>
        <CodeBlock
          title="Install GRUB (UEFI)"
          code={`grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg`}
        />
      </Step>

      <Step number={10} title="Finish installation">
        <p className="text-slate-400 mb-4">
          Set the root password:
        </p>
        <CodeBlock
          title="Set root password"
          code="passwd"
        />
        <p className="text-slate-400 mb-4 mt-4">
          Enable NetworkManager:
        </p>
        <CodeBlock
          title="Enable NetworkManager"
          code="systemctl enable NetworkManager"
        />
        <p className="text-slate-400 mb-4 mt-4">
          Exit chroot and reboot:
        </p>
        <CodeBlock
          title="Finish and reboot"
          code={`exit
umount -R /mnt
reboot`}
        />

        <InfoBox
          title="Post-installation"
          type="tip"
        >
          After rebooting, you should have a working Arch Linux system. See the General recommendations page for system management directions and post-installation tutorials.
        </InfoBox>
      </Step>
    </div>
  );
};

export default InstallationGuide;