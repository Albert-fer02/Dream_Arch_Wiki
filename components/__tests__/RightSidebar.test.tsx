import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import RightSidebar from '../RightSidebar'

describe('RightSidebar', () => {
  const defaultProps = {
    page: 'home' as const,
    isOpen: true,
    onClose: vi.fn(),
  }


  it('renders sidebar with table of contents when open', () => {
    render(<RightSidebar {...defaultProps} />)

    expect(screen.getByLabelText('Table of contents')).toBeInTheDocument()
    expect(screen.getByText('Table Contents')).toBeInTheDocument()
  })

  it('renders close button on mobile', () => {
    render(<RightSidebar {...defaultProps} />)

    const closeButton = screen.getByTestId('x-icon').closest('button')
    expect(closeButton).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<RightSidebar {...defaultProps} />)

    const closeButton = screen.getByTestId('x-icon').closest('button')
    await user.click(closeButton)

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('renders home page TOC content', () => {
    render(<RightSidebar {...defaultProps} page="home" />)

    expect(screen.getByText('Table Contents')).toBeInTheDocument()
    expect(screen.getByText('Desktop Environments')).toBeInTheDocument()
    expect(screen.getByText('Packages')).toBeInTheDocument()
  })

  it('renders article page TOC content', () => {
    render(<RightSidebar {...defaultProps} page="article" />)

    expect(screen.getByRole('heading', { name: 'Unit Files' })).toBeInTheDocument()
    expect(screen.getByText('Systemd')).toBeInTheDocument()
    expect(screen.getByText('Units')).toBeInTheDocument()
  })

  it('highlights active TOC entry', () => {
    render(<RightSidebar {...defaultProps} page="home" />)

    const activeEntry = screen.getByText('Packages').closest('li')
    expect(activeEntry).toHaveClass('text-cyan-400')
  })

  it('renders nested TOC entries with proper indentation', () => {
    render(<RightSidebar {...defaultProps} page="home" />)

    const nestedEntry = screen.getByText('Package Management')
    const parentElement = nestedEntry.closest('li')
    expect(parentElement).toHaveClass('ml-4')
  })

  it('applies correct CSS classes for open state', () => {
    render(<RightSidebar {...defaultProps} />)

    const sidebar = screen.getByLabelText('Table of contents')
    expect(sidebar).toHaveClass('translate-x-0')
    expect(sidebar).toHaveClass('fixed')
  })

  it('applies correct CSS classes for closed state', () => {
    render(<RightSidebar {...defaultProps} isOpen={false} />)

    const sidebar = screen.getByLabelText('Table of contents')
    expect(sidebar).toHaveClass('translate-x-full')
  })

  it('has proper responsive width classes', () => {
    render(<RightSidebar {...defaultProps} />)

    const sidebar = screen.getByLabelText('Table of contents')
    expect(sidebar).toHaveClass('w-80', 'md:w-64')
  })

  it('renders with proper shadow and background', () => {
    render(<RightSidebar {...defaultProps} />)

    const sidebar = screen.getByLabelText('Table of contents')
    expect(sidebar).toHaveClass('bg-slate-900', 'shadow-xl', 'md:shadow-none')
  })

  it('has proper z-index for overlay behavior', () => {
    render(<RightSidebar {...defaultProps} />)

    const sidebar = screen.getByLabelText('Table of contents')
    expect(sidebar).toHaveClass('z-30')
  })

  it('renders TOC entries as clickable elements', () => {
    render(<RightSidebar {...defaultProps} />)

    const tocEntries = screen.getAllByRole('listitem')
    tocEntries.forEach(entry => {
      expect(entry).toHaveClass('cursor-pointer')
    })
  })

  it('renders ChevronRightIcon for each TOC entry', () => {
    render(<RightSidebar {...defaultProps} />)

    const chevronIcons = screen.getAllByTestId('chevron-right-icon')
    expect(chevronIcons.length).toBeGreaterThan(0)
  })

  it('applies hover states to TOC entries', () => {
    render(<RightSidebar {...defaultProps} />)

    const tocEntries = screen.getAllByRole('listitem')
    tocEntries.forEach(entry => {
      if (!entry.textContent?.includes('Packages')) { // Skip active item
        expect(entry).toHaveClass('hover:text-slate-100')
      }
    })
  })
})