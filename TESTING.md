# Testing Documentation

This document outlines the comprehensive testing setup for the Arch Wiki UI Clone project, built with React, TypeScript, and Vite.

## 🧪 Testing Stack

### Unit Testing
- **Framework**: Vitest (Vite-native testing framework)
- **React Testing Library**: Component testing utilities
- **Testing Library Jest DOM**: Additional DOM matchers
- **User Event**: User interaction testing

### End-to-End Testing
- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, WebKit
- **Devices**: Desktop and Mobile viewports

### Performance Testing
- **Lighthouse**: Automated performance audits
- **Bundle Analysis**: Build size monitoring

## 📁 Test Structure

```
├── src/
│   ├── components/__tests__/          # Component unit tests
│   │   ├── Header.test.tsx
│   │   ├── LeftSidebar.test.tsx
│   │   ├── RightSidebar.test.tsx
│   │   ├── Footer.test.tsx
│   │   └── InfoBox.test.tsx
│   │   └── CodeBlock.test.tsx
│   ├── pages/__tests__/               # Page unit tests
│   │   ├── HomePage.test.tsx
│   │   └── ArticlePage.test.tsx
│   └── test/                          # Test utilities
│       ├── setup.ts                   # Global test setup
│       ├── utils.tsx                  # Custom render and mocks
│       └── integration.test.tsx       # Integration tests
├── e2e/                               # E2E tests
│   └── navigation.spec.ts
├── scripts/
│   └── performance-test.js            # Performance testing script
├── vitest.config.ts                   # Vitest configuration
├── playwright.config.ts               # Playwright configuration
└── TESTING.md                         # This documentation
```

## 🚀 Running Tests

### Unit Tests
```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

### End-to-End Tests
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

### Performance Tests
```bash
# Run performance tests (requires dev server running)
npm run test:performance
```

## 📋 Test Categories

### Unit Tests

#### Component Tests
- **Header**: Navigation, search, theme toggle, responsive behavior
- **LeftSidebar**: Navigation menu, collapsible sections, mobile overlay
- **RightSidebar**: Table of contents, page-specific content
- **Footer**: Links, responsive layout, semantic HTML
- **InfoBox**: Different types (note, tip, warning), ARIA roles
- **CodeBlock**: Copy functionality, syntax highlighting

#### Page Tests
- **HomePage**: Card rendering, news section, responsive grid
- **ArticlePage**: Content sections, InfoBox integration, CodeBlock usage

### Integration Tests
- **Responsive Design**: Mobile/desktop breakpoints, layout changes
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **User Interactions**: Form inputs, button clicks, navigation
- **Performance**: Render times, bundle size monitoring

### End-to-End Tests
- **Navigation**: Page loading, routing, skip links
- **Responsive Behavior**: Mobile menu, desktop navigation
- **Accessibility**: Keyboard navigation, ARIA compliance
- **User Flows**: Search, theme switching, sidebar interactions

### Performance Tests
- **Lighthouse Scores**: Performance, accessibility, best practices, SEO
- **Bundle Analysis**: Build size monitoring, asset optimization
- **Load Times**: Page load performance, Core Web Vitals

## 🛠️ Configuration

### Vitest Configuration (`vitest.config.ts`)
```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [...],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
  },
})
```

### Playwright Configuration (`playwright.config.ts`)
```typescript
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

## 🧩 Test Utilities

### Custom Render (`src/test/utils.tsx`)
```typescript
const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export { customRender as render }
```

### Mock Functions
- **Icons**: Mocked icon components for testing
- **Hooks**: Mocked useDarkMode hook
- **Browser APIs**: Clipboard, ResizeObserver, IntersectionObserver

### Accessibility Helpers
```typescript
export const testAccessibility = async (container: HTMLElement) => {
  // ARIA label checks, heading hierarchy, etc.
}
```

## 📊 Coverage Requirements

- **Statements**: 70%
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%

Coverage reports are generated in multiple formats:
- Console output
- HTML report (`coverage/index.html`)
- LCOV format for CI/CD integration

## 🎯 Best Practices

### Unit Tests
- Use descriptive test names
- Test component behavior, not implementation details
- Mock external dependencies
- Test accessibility features
- Use `screen` queries over container queries

### Integration Tests
- Test user workflows
- Verify responsive behavior
- Check accessibility compliance
- Test performance thresholds

### E2E Tests
- Test critical user journeys
- Verify cross-browser compatibility
- Test mobile responsiveness
- Validate accessibility in real browsers

### Performance Tests
- Set realistic thresholds
- Monitor bundle size growth
- Track Core Web Vitals
- Automate regression detection

## 🔧 CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Unit Tests
  run: npm run test:run

- name: Run E2E Tests
  run: npm run test:e2e

- name: Performance Tests
  run: npm run test:performance

- name: Upload Coverage
  uses: codecov/codecov-action@v3
  with:
    file: ./coverage/lcov.info
```

## 📈 Monitoring & Reporting

### Coverage Reports
- Generated automatically with `npm run test:coverage`
- HTML reports for detailed analysis
- LCOV format for CI/CD tools

### Performance Reports
- Lighthouse JSON reports saved to `lighthouse-report.json`
- Bundle size analysis with size thresholds
- Automated failure on threshold breaches

### Test Results
- JUnit XML output for CI/CD integration
- Playwright HTML reports for E2E test results
- Screenshots and videos on test failures

## 🐛 Debugging Tests

### Common Issues
1. **Import Errors**: Check path aliases and file extensions
2. **Mock Issues**: Ensure mocks are properly configured
3. **Async Operations**: Use `waitFor` for async assertions
4. **Accessibility**: Verify ARIA attributes and semantic HTML

### Debugging Tools
- **Vitest UI**: `npm run test:ui` for interactive debugging
- **Playwright UI**: `npm run test:e2e:ui` for E2E debugging
- **Coverage Reports**: Analyze uncovered code paths
- **Performance Reports**: Identify bottlenecks

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Testing Library Jest DOM](https://github.com/testing-library/jest-dom)

## 🤝 Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Ensure all tests pass
3. Maintain coverage thresholds
4. Update this documentation as needed

When fixing bugs:
1. Write a test that reproduces the bug
2. Fix the implementation
3. Verify the test passes
4. Check for regressions