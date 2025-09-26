import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { vi } from 'vitest'

// Custom render function that includes common providers
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div data-testid="test-wrapper">{children}</div>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock hook for useDarkMode
export const mockUseDarkMode = (initialTheme: 'light' | 'dark' = 'dark') => {
  const mockToggle = vi.fn()
  const mockHook = vi.fn(() => [initialTheme, mockToggle])
  vi.doMock('../hooks/useDarkMode', () => ({
    useDarkMode: mockHook,
  }))
  return { mockToggle, mockHook }
}

// Mock icons component
export const mockIcons = () => {
  vi.doMock('../components/icons', () => ({
    LogoIcon: ({ className }: { className?: string }) => <div data-testid="logo-icon" className={className} />,
    SearchIcon: ({ className }: { className?: string }) => <div data-testid="search-icon" className={className} />,
    UserIcon: ({ className }: { className?: string }) => <div data-testid="user-icon" className={className} />,
    SunIcon: ({ className }: { className?: string }) => <div data-testid="sun-icon" className={className} />,
    MoonIcon: ({ className }: { className?: string }) => <div data-testid="moon-icon" className={className} />,
    MenuIcon: ({ className }: { className?: string }) => <div data-testid="menu-icon" className={className} />,
    TocIcon: ({ className }: { className?: string }) => <div data-testid="toc-icon" className={className} />,
    XIcon: ({ className }: { className?: string }) => <div data-testid="x-icon" className={className} />,
    ChevronRightIcon: ({ className }: { className?: string }) => <div data-testid="chevron-right-icon" className={className} />,
    InfoIcon: ({ className }: { className?: string }) => <div data-testid="info-icon" className={className} />,
    LightbulbIcon: ({ className }: { className?: string }) => <div data-testid="lightbulb-icon" className={className} />,
    WarningIcon: ({ className }: { className?: string }) => <div data-testid="warning-icon" className={className} />,
    DownloadIcon: ({ className }: { className?: string }) => <div data-testid="download-icon" className={className} />,
    SystemIcon: ({ className }: { className?: string }) => <div data-testid="system-icon" className={className} />,
    DesktopIcon: ({ className }: { className?: string }) => <div data-testid="desktop-icon" className={className} />,
    HardwareIcon: ({ className }: { className?: string }) => <div data-testid="hardware-icon" className={className} />,
    NetworkIcon: ({ className }: { className?: string }) => <div data-testid="network-icon" className={className} />,
    AppsIcon: ({ className }: { className?: string }) => <div data-testid="apps-icon" className={className} />,
    CopyIcon: ({ className }: { className?: string }) => <div data-testid="copy-icon" className={className} />,
    CheckIcon: ({ className }: { className?: string }) => <div data-testid="check-icon" className={className} />,
  }))
}

// Helper to create mock props
export const createMockProps = <T extends Record<string, any>>(defaults: T) => {
  return (overrides: Partial<T> = {}): T => ({
    ...defaults,
    ...overrides,
  })
}

// Test data helpers
export const mockCardData = {
  icon: <div data-testid="mock-icon" />,
  title: 'Test Title',
  description: 'Test description for the card component.',
}

export const mockArticleData = {
  title: 'Test Article',
  content: 'This is test content for the article page.',
}

// Accessibility helpers
export const testAccessibility = async (container: HTMLElement) => {
  // Check for ARIA labels
  const buttons = container.querySelectorAll('button')
  buttons.forEach(button => {
    expect(button).toHaveAttribute('aria-label')
  })

  // Check for alt text on images
  const images = container.querySelectorAll('img')
  images.forEach(img => {
    expect(img).toHaveAttribute('alt')
  })

  // Check for proper heading hierarchy
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let lastLevel = 0
  headings.forEach(heading => {
    const level = parseInt(heading.tagName.charAt(1))
    expect(level).toBeGreaterThanOrEqual(lastLevel)
    lastLevel = level
  })
}