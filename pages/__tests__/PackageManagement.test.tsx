import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import PackageManagement from '../PackageManagement'

describe('PackageManagement', () => {
  it('renders package management with title', () => {
    render(<PackageManagement />)

    expect(screen.getByText('Package Management')).toBeInTheDocument()
  })

  it('renders pacman overview info box', () => {
    render(<PackageManagement />)

    expect(screen.getByText('Pacman - The Arch Linux Package Manager')).toBeInTheDocument()
    expect(screen.getByText(/Pacman is a command-line utility/)).toBeInTheDocument()
  })

  it('renders basic operations table', () => {
    render(<PackageManagement />)

    expect(screen.getByText('Basic Operations')).toBeInTheDocument()
    expect(screen.getByText('pacman -S package')).toBeInTheDocument()
    expect(screen.getByText('Install a package')).toBeInTheDocument()
  })

  it('renders system updates section', () => {
    render(<PackageManagement />)

    expect(screen.getByText('System Updates')).toBeInTheDocument()
    expect(screen.getByText('Full system update')).toBeInTheDocument()
    expect(screen.getByText('sudo pacman -Syu')).toBeInTheDocument()
  })

  it('renders AUR section', () => {
    render(<PackageManagement />)

    expect(screen.getByText('Arch User Repository (AUR)')).toBeInTheDocument()
    expect(screen.getByText(/The AUR is a community-driven repository/)).toBeInTheDocument()
  })

  it('renders troubleshooting section', () => {
    render(<PackageManagement />)

    expect(screen.getByText('Troubleshooting')).toBeInTheDocument()
    expect(screen.getByText(/Failed to commit transaction/)).toBeInTheDocument()
  })

  it('renders package maintenance section', () => {
    render(<PackageManagement />)

    expect(screen.getByText('Package Maintenance')).toBeInTheDocument()
    expect(screen.getByText('Clean Package Cache')).toBeInTheDocument()
    expect(screen.getByText('Remove Orphaned Packages')).toBeInTheDocument()
  })
})