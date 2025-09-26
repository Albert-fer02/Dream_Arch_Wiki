import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import Header from '../Header'

describe('Header', () => {
  const defaultProps = {
    theme: 'dark' as const,
    toggleTheme: vi.fn(),
    toggleLeftSidebar: vi.fn(),
    toggleRightSidebar: vi.fn(),
  }


  it('renders header with logo and navigation', () => {
    render(<Header {...defaultProps} />)

    expect(screen.getByText('Arch Wiki')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders search input with proper attributes', () => {
    render(<Header {...defaultProps} />)

    const searchInput = screen.getByLabelText('Search wiki')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('type', 'text')
    expect(searchInput).toHaveAttribute('placeholder', 'Search the wiki...')
  })

  it('renders theme toggle button with correct aria-label', () => {
    render(<Header {...defaultProps} />)

    const themeButton = screen.getByLabelText('Switch to light mode')
    expect(themeButton).toBeInTheDocument()
  })

  it('calls toggleTheme when theme button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header {...defaultProps} />)

    const themeButton = screen.getByLabelText('Switch to light mode')
    await user.click(themeButton)

    expect(defaultProps.toggleTheme).toHaveBeenCalledTimes(1)
  })

  it('calls toggleLeftSidebar when menu button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header {...defaultProps} />)

    const menuButton = screen.getByLabelText('Open navigation menu')
    await user.click(menuButton)

    expect(defaultProps.toggleLeftSidebar).toHaveBeenCalledTimes(1)
  })

  it('calls toggleRightSidebar when TOC button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header {...defaultProps} />)

    const tocButton = screen.getByLabelText('Open table of contents')
    await user.click(tocButton)

    expect(defaultProps.toggleRightSidebar).toHaveBeenCalledTimes(1)
  })

  it('renders navigation links on desktop', () => {
    render(<Header {...defaultProps} />)

    expect(screen.getByText('Main Page')).toBeInTheDocument()
    expect(screen.getByText('Community')).toBeInTheDocument()
    expect(screen.getByText('News')).toBeInTheDocument()
  })

  it('renders user icon button', () => {
    render(<Header {...defaultProps} />)

    const userButton = screen.getByLabelText('User account')
    expect(userButton).toBeInTheDocument()
  })

  it('has proper responsive classes', () => {
    render(<Header {...defaultProps} />)

    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky', 'top-0', 'z-10', 'shadow-lg')
  })

  it('renders with correct theme toggle icon for dark mode', () => {
    render(<Header {...defaultProps} />)

    const sunIcon = screen.getByTestId('sun-icon')
    expect(sunIcon).toBeInTheDocument()
  })

  it('renders with correct theme toggle icon for light mode', () => {
    render(<Header {...defaultProps} theme="light" />)

    const moonIcon = screen.getByTestId('moon-icon')
    expect(moonIcon).toBeInTheDocument()
  })

  it('has proper focus management', async () => {
    const user = userEvent.setup()
    render(<Header {...defaultProps} />)

    const searchInput = screen.getByLabelText('Search wiki')
    await user.tab()
    expect(searchInput).toHaveFocus()
  })

  it('applies correct responsive breakpoints', () => {
    render(<Header {...defaultProps} />)

    // Check for responsive classes
    const container = screen.getByRole('banner').firstElementChild
    expect(container).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')
  })
})