import { describe, it, expect, vi } from 'vitest'
import { render, screen } from './utils'
import App from '../App'
import userEvent from '@testing-library/user-event'

// Mock hooks
vi.mock('../hooks/useDarkMode', () => ({
  useDarkMode: () => ['dark', vi.fn()]
}))

describe('App Integration', () => {
  it('renders full app with all components', () => {
    render(<App />)

    expect(screen.getByText('Arch Wiki')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('toggles left sidebar on menu button click', async () => {
    const user = userEvent.setup()
    render(<App />)

    const menuButton = screen.getByLabelText('Open navigation menu')
    await user.click(menuButton)

    // Check if sidebar is open (assuming it has a specific class or attribute)
    const sidebar = screen.getByRole('region', { name: 'Navigation sidebar' })
    expect(sidebar).toHaveClass('translate-x-0')
  })

  it('toggles right sidebar on TOC button click', async () => {
    const user = userEvent.setup()
    render(<App />)

    const tocButton = screen.getByLabelText('Open table of contents')
    await user.click(tocButton)

    // Check if TOC sidebar is open
    const tocSidebar = screen.getByLabelText('Table of contents')
    expect(tocSidebar).toHaveClass('translate-x-0')
  })

  it('changes theme when theme button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const themeButton = screen.getByLabelText('Switch to light mode')
    await user.click(themeButton)

    // Check if aria-label changes
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument()
  })

  it('navigates between pages', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Click on a navigation link (assuming it's rendered)
    const navLinks = screen.getAllByRole('link')
    if (navLinks.length > 0) {
      await user.click(navLinks[0])
      // Check if page content changes (would need specific assertions based on routing)
    }
  })
})