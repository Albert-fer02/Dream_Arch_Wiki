import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import InstallationGuide from '../InstallationGuide'

describe('InstallationGuide', () => {
  it('renders installation guide with title', () => {
    render(<InstallationGuide />)

    expect(screen.getByText('Installation guide')).toBeInTheDocument()
  })

  it('renders pre-installation info box', () => {
    render(<InstallationGuide />)

    expect(screen.getByText('Pre-installation')).toBeInTheDocument()
    expect(screen.getByText(/This document will guide you through/)).toBeInTheDocument()
  })

  it('renders before you start section', () => {
    render(<InstallationGuide />)

    expect(screen.getByText('Before you start')).toBeInTheDocument()
    expect(screen.getByText(/the entire installation guide before proceeding/)).toBeInTheDocument()
  })

  it('renders installation steps', () => {
    render(<InstallationGuide />)

    expect(screen.getByText('Verify boot mode')).toBeInTheDocument()
    expect(screen.getByText('Connect to the internet')).toBeInTheDocument()
    expect(screen.getByText('Update the system clock')).toBeInTheDocument()
    expect(screen.getByText('Partition the disks')).toBeInTheDocument()
  })

  it('renders code blocks with commands', () => {
    render(<InstallationGuide />)

    expect(screen.getByText('Check UEFI mode')).toBeInTheDocument()
    expect(screen.getByText('cat /sys/firmware/efi/fw_platform_size')).toBeInTheDocument()
  })

  it('renders finish installation section', () => {
    render(<InstallationGuide />)

    expect(screen.getByText('Finish installation')).toBeInTheDocument()
    expect(screen.getByText('Post-installation')).toBeInTheDocument()
  })
})