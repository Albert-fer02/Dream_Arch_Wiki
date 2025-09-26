import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '../../test/utils'
import Footer from '../Footer'

describe('Footer', () => {

  it('renders footer with proper semantic role', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders logo icon', () => {
    render(<Footer />)

    const logoIcon = screen.getByTestId('logo-icon')
    expect(logoIcon).toBeInTheDocument()
  })

  it('renders navigation with proper role', () => {
    render(<Footer />)

    const navigation = screen.getByRole('navigation', { name: 'Footer navigation' })
    expect(navigation).toBeInTheDocument()
  })

  it('renders all footer links', () => {
    render(<Footer />)

    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Disclaimer')).toBeInTheDocument()
    expect(screen.getByText('About This Wiki')).toBeInTheDocument()
    expect(screen.getByText('Contribute')).toBeInTheDocument()
  })

  it('renders copyright information', () => {
    render(<Footer />)

    expect(screen.getByText('Content License: GFDL © 2023 Arch Linux')).toBeInTheDocument()
  })

  it('applies correct responsive layout classes', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')
  })

  it('has proper background and border styling', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-slate-900', 'border-t', 'border-slate-700/50')
  })

  it('renders footer links as anchor elements', () => {
    render(<Footer />)

    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)

    links.forEach(link => {
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href')
    })
  })

  it('applies hover effects to footer links', () => {
    render(<Footer />)

    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveClass('hover:text-white', 'transition-colors')
    })
  })

  it('has proper text color and spacing', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('text-sm', 'text-slate-400')
  })

  it('renders with proper flex layout for responsiveness', () => {
    render(<Footer />)

    const mainContainer = screen.getByRole('contentinfo').firstElementChild
    expect(mainContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'sm:items-center', 'sm:justify-between')
  })

  it('applies proper spacing and padding', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('h-auto', 'sm:h-20', 'py-4', 'sm:py-0')
  })

  it('renders navigation links with focus states', () => {
    render(<Footer />)

    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-cyan-400', 'rounded', 'px-2', 'py-1')
    })
  })

  it('has proper gap spacing for responsive layout', () => {
    render(<Footer />)

    const mainContainer = screen.getByRole('contentinfo').firstElementChild
    expect(mainContainer).toHaveClass('gap-4')
  })
})