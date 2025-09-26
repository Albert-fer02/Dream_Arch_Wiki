import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import CodeBlock from '../CodeBlock'

describe('CodeBlock', () => {
  const defaultProps = {
    title: 'Test Code',
    code: 'console.log("Hello World");',
    language: 'javascript',
  }

  it('renders code block with title and content', () => {
    render(<CodeBlock {...defaultProps} />)

    expect(screen.getByText('Test Code')).toBeInTheDocument()
    expect(screen.getByText('console.log("Hello World");')).toBeInTheDocument()
  })

  it('renders copy button with correct label', () => {
    render(<CodeBlock {...defaultProps} />)

    const copyButton = screen.getByLabelText('Copy code to clipboard')
    expect(copyButton).toBeInTheDocument()
    expect(screen.getByText('Copy')).toBeInTheDocument()
  })

  it('copies code to clipboard when copy button is clicked', async () => {
    const user = userEvent.setup()
    render(<CodeBlock {...defaultProps} />)

    const copyButton = screen.getByLabelText('Copy code to clipboard')
    await user.click(copyButton)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('console.log("Hello World");')
  })

  it('shows "Copied!" text after successful copy', async () => {
    const user = userEvent.setup()
    render(<CodeBlock {...defaultProps} />)

    const copyButton = screen.getByLabelText('Copy code to clipboard')
    await user.click(copyButton)

    expect(screen.getByText('Copied!')).toBeInTheDocument()
    expect(screen.getByLabelText('Code copied to clipboard')).toBeInTheDocument()
  })

  it('reverts to "Copy" text after timeout', async () => {
    vi.useFakeTimers()
    const user = userEvent.setup()
    render(<CodeBlock {...defaultProps} />)

    const copyButton = screen.getByLabelText('Copy code to clipboard')
    await user.click(copyButton)

    expect(screen.getByText('Copied!')).toBeInTheDocument()

    vi.advanceTimersByTime(2000)

    expect(screen.getByText('Copy')).toBeInTheDocument()
    vi.useRealTimers()
  })

  it('renders with proper semantic structure', () => {
    render(<CodeBlock {...defaultProps} />)

    const codeRegion = screen.getByRole('region', { name: 'Code example: Test Code' })
    expect(codeRegion).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<CodeBlock {...defaultProps} />)

    const codeBlock = screen.getByText('Test Code').closest('.not-prose')
    expect(codeBlock).toHaveClass(
      'bg-slate-950',
      'rounded-lg',
      'border',
      'border-slate-700',
      'overflow-hidden'
    )
  })

  it('renders header with proper styling', () => {
    render(<CodeBlock {...defaultProps} />)

    const header = screen.getByText('Test Code').parentElement
    expect(header).toHaveClass(
      'flex',
      'justify-between',
      'items-center',
      'px-4',
      'py-2',
      'bg-slate-900/70',
      'border-b',
      'border-slate-700'
    )
  })

  it('renders pre element with proper styling', () => {
    render(<CodeBlock {...defaultProps} />)

    const preElement = screen.getByRole('region', { name: 'Code example: Test Code' }).querySelector('pre')
    expect(preElement).toHaveClass('p-4', 'text-sm', 'overflow-x-auto')
  })

  it('handles multi-line code properly', () => {
    const multiLineCode = `function test() {
  console.log("line 1");
  console.log("line 2");
}`
    render(<CodeBlock {...defaultProps} code={multiLineCode} />)

    expect(screen.getByText('function test() {')).toBeInTheDocument()
    expect(screen.getByText('  console.log("line 1");')).toBeInTheDocument()
    expect(screen.getByText('  console.log("line 2");')).toBeInTheDocument()
    expect(screen.getByText('}')).toBeInTheDocument()
  })

  it('applies syntax highlighting for brackets', () => {
    const bracketCode = '[Unit]\nDescription=Test'
    render(<CodeBlock {...defaultProps} code={bracketCode} />)

    const bracketLine = screen.getByText('[Unit]')
    expect(bracketLine).toHaveClass('text-cyan-400')
  })

  it('applies syntax highlighting for key-value pairs', () => {
    const kvpCode = 'Description=Test Service'
    render(<CodeBlock {...defaultProps} code={kvpCode} />)

    const keyPart = screen.getByText('Description')
    const valuePart = screen.getByText('=Test Service')

    expect(keyPart).toHaveClass('text-purple-400')
    expect(valuePart).toHaveClass('text-green-400')
  })

  it('renders copy button with focus states', () => {
    render(<CodeBlock {...defaultProps} />)

    const copyButton = screen.getByLabelText('Copy code to clipboard')
    expect(copyButton).toHaveClass(
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-cyan-400',
      'rounded',
      'px-2',
      'py-1'
    )
  })

  it('hides icons from screen readers', () => {
    render(<CodeBlock {...defaultProps} />)

    const copyIcon = screen.getByTestId('copy-icon')
    const checkIcon = screen.getByTestId('check-icon')

    expect(copyIcon).toHaveAttribute('aria-hidden', 'true')
    expect(checkIcon).toHaveAttribute('aria-hidden', 'true')
  })

  it('handles empty code gracefully', () => {
    render(<CodeBlock {...defaultProps} code="" />)

    const codeRegion = screen.getByRole('region', { name: 'Code example: Test Code' })
    expect(codeRegion).toBeInTheDocument()
  })

  it('handles very long code without breaking layout', () => {
    const longCode = 'console.log("test");\n'.repeat(100)
    render(<CodeBlock {...defaultProps} code={longCode} />)

    expect(screen.getByText(longCode.trim())).toBeInTheDocument()
  })

  it('handles special characters in code', () => {
    const specialCode = 'const x = "hello & <world>";\nconsole.log(x);'
    render(<CodeBlock {...defaultProps} code={specialCode} />)

    expect(screen.getByText('const x = "hello & <world>";')).toBeInTheDocument()
  })

  it('handles missing title prop', () => {
    render(<CodeBlock code={defaultProps.code} language={defaultProps.language} />)

    // Should still render with default or empty title
    const codeRegion = screen.getByRole('region')
    expect(codeRegion).toBeInTheDocument()
  })

  it('handles invalid language prop', () => {
    render(<CodeBlock {...defaultProps} language="invalidlang" />)

    // Should still render code
    expect(screen.getByText('console.log("Hello World");')).toBeInTheDocument()
  })
})