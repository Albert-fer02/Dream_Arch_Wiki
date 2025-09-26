import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import LeftSidebar from '../LeftSidebar'

describe('LeftSidebar', () => {
  const defaultProps = {
    currentPage: 'home' as const,
    setPage: vi.fn(),
    isOpen: true,
    onClose: vi.fn(),
  }


  it('renders sidebar with navigation when open', () => {
    render(<LeftSidebar {...defaultProps} />)

    expect(screen.getByLabelText('Navigation sidebar')).toBeInTheDocument()
    expect(screen.getByText('Navigation')).toBeInTheDocument()
    expect(screen.getByText('Main page')).toBeInTheDocument()
  })

  it('renders close button on mobile', () => {
    render(<LeftSidebar {...defaultProps} />)

    const closeButton = screen.getByLabelText('Close navigation menu')
    expect(closeButton).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<LeftSidebar {...defaultProps} />)

    const closeButton = screen.getByLabelText('Close navigation menu')
    await user.click(closeButton)

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('highlights active navigation item', () => {
    render(<LeftSidebar {...defaultProps} />)

    const activeItem = screen.getByText('Main page').closest('li')
    expect(activeItem).toHaveClass('border-cyan-400', 'text-cyan-400')
  })

  it('calls setPage and onClose when navigation item is clicked', async () => {
    const user = userEvent.setup()
    render(<LeftSidebar {...defaultProps} currentPage="article" />)

    const homeLink = screen.getByText('Main page')
    await user.click(homeLink)

    expect(defaultProps.setPage).toHaveBeenCalledWith('home')
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('renders categories section with collapsible details', () => {
    render(<LeftSidebar {...defaultProps} />)

    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Installation')).toBeInTheDocument()
    expect(screen.getByText('Systemd')).toBeInTheDocument()
  })

  it('renders info section', () => {
    render(<LeftSidebar {...defaultProps} />)

    expect(screen.getByText('Info')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Development')).toBeInTheDocument()
    expect(screen.getByText('Contribute')).toBeInTheDocument()
  })

  it('renders tools section', () => {
    render(<LeftSidebar {...defaultProps} />)

    expect(screen.getByText('Tools')).toBeInTheDocument()
    expect(screen.getByText('Page Tools')).toBeInTheDocument()
    expect(screen.getByText('Special pages')).toBeInTheDocument()
  })

  it('applies correct CSS classes for open state', () => {
    render(<LeftSidebar {...defaultProps} />)

    const sidebar = screen.getByLabelText('Navigation sidebar')
    expect(sidebar).toHaveClass('translate-x-0')
    expect(sidebar).toHaveClass('fixed', 'md:sticky')
  })

  it('applies correct CSS classes for closed state', () => {
    render(<LeftSidebar {...defaultProps} isOpen={false} />)

    const sidebar = screen.getByLabelText('Navigation sidebar')
    expect(sidebar).toHaveClass('-translate-x-full')
  })

  it('has proper responsive width classes', () => {
    render(<LeftSidebar {...defaultProps} />)

    const sidebar = screen.getByLabelText('Navigation sidebar')
    expect(sidebar).toHaveClass('w-80', 'md:w-64')
  })

  it('renders with proper shadow and background', () => {
    render(<LeftSidebar {...defaultProps} />)

    const sidebar = screen.getByLabelText('Navigation sidebar')
    expect(sidebar).toHaveClass('bg-slate-900', 'shadow-xl', 'md:shadow-none')
  })

  it('has proper z-index for overlay behavior', () => {
    render(<LeftSidebar {...defaultProps} />)

    const sidebar = screen.getByLabelText('Navigation sidebar')
    expect(sidebar).toHaveClass('z-30')
  })

  it('renders navigation links with hover states', () => {
    render(<LeftSidebar {...defaultProps} />)

    const navLinks = screen.getAllByRole('listitem')
    navLinks.forEach(link => {
      expect(link).toHaveClass('cursor-pointer')
    })
  })
})