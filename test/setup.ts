import React from 'react'
import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend expect with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock window.ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock navigator.clipboard
if (!navigator.clipboard) {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: vi.fn().mockResolvedValue(undefined),
    },
    writable: true,
  })
} else {
  // If it exists, just mock the method
  navigator.clipboard.writeText = vi.fn().mockResolvedValue(undefined)
}

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock icons
vi.mock('../components/icons', () => ({
  LogoIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'logo-icon', className }),
  SearchIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'search-icon', className }),
  UserIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'user-icon', className }),
  SunIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'sun-icon', className }),
  MoonIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'moon-icon', className }),
  MenuIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'menu-icon', className }),
  TocIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'toc-icon', className }),
  XIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'x-icon', className }),
  ChevronRightIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'chevron-right-icon', className }),
  InfoIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'info-icon', className }),
  LightbulbIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'lightbulb-icon', className }),
  WarningIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'warning-icon', className }),
  DownloadIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'download-icon', className }),
  SystemIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'system-icon', className }),
  DesktopIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'desktop-icon', className }),
  HardwareIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'hardware-icon', className }),
  NetworkIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'network-icon', className }),
  AppsIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'apps-icon', className }),
  CopyIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'copy-icon', className }),
  CheckIcon: ({ className }: { className?: string }) => React.createElement('div', { 'data-testid': 'check-icon', className }),
}))