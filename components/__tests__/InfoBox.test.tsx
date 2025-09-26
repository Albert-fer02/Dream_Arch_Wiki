import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import InfoBox from '../InfoBox'

describe('InfoBox', () => {

  it('renders note type with correct styling', () => {
    render(<InfoBox type="note" title="Test Note">Test content</InfoBox>)

    const infoBox = screen.getByRole('region')
    expect(infoBox).toHaveClass('border-cyan-400', 'bg-cyan-900/20')
    expect(screen.getByText('Test Note')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders tip type with correct styling', () => {
    render(<InfoBox type="tip" title="Test Tip">Test content</InfoBox>)

    const infoBox = screen.getByRole('status')
    expect(infoBox).toHaveClass('border-emerald-400', 'bg-emerald-900/20')
    expect(screen.getByText('Test Tip')).toBeInTheDocument()
  })

  it('renders warning type with correct styling', () => {
    render(<InfoBox type="warning" title="Test Warning">Test content</InfoBox>)

    const infoBox = screen.getByRole('alert')
    expect(infoBox).toHaveClass('border-amber-400', 'bg-amber-900/20')
    expect(screen.getByText('Test Warning')).toBeInTheDocument()
  })

  it('renders correct icon for each type', () => {
    const { rerender } = render(<InfoBox type="note" title="Note">Content</InfoBox>)
    expect(screen.getByTestId('info-icon')).toBeInTheDocument()

    rerender(<InfoBox type="tip" title="Tip">Content</InfoBox>)
    expect(screen.getByTestId('lightbulb-icon')).toBeInTheDocument()

    rerender(<InfoBox type="warning" title="Warning">Content</InfoBox>)
    expect(screen.getByTestId('warning-icon')).toBeInTheDocument()
  })

  it('applies proper ARIA attributes', () => {
    render(<InfoBox type="note" title="Test">Content</InfoBox>)

    const infoBox = screen.getByRole('region')
    expect(infoBox).toHaveAttribute('aria-labelledby', 'info-box-title-note')
  })

  it('renders title with correct id', () => {
    render(<InfoBox type="tip" title="Test Title">Content</InfoBox>)

    const title = screen.getByText('Test Title')
    expect(title).toHaveAttribute('id', 'info-box-title-tip')
  })

  it('renders children content', () => {
    render(
      <InfoBox type="note" title="Title">
        <p>Paragraph content</p>
        <strong>Bold text</strong>
      </InfoBox>
    )

    expect(screen.getByText('Paragraph content')).toBeInTheDocument()
    expect(screen.getByText('Bold text')).toBeInTheDocument()
  })

  it('applies correct base styling', () => {
    render(<InfoBox type="note" title="Title">Content</InfoBox>)

    const infoBox = screen.getByRole('region')
    expect(infoBox).toHaveClass(
      'p-4',
      'rounded-lg',
      'border-l-4',
      'flex',
      'space-x-4'
    )
  })

  it('hides icon from screen readers', () => {
    render(<InfoBox type="note" title="Title">Content</InfoBox>)

    const infoBox = screen.getByRole('region')
    const iconContainer = infoBox.firstElementChild
    expect(iconContainer).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders with proper flex layout', () => {
    render(<InfoBox type="note" title="Title">Content</InfoBox>)

    const infoBox = screen.getByRole('region')
    expect(infoBox).toHaveClass('flex', 'space-x-4')

    const iconContainer = infoBox.firstElementChild
    expect(iconContainer).toHaveClass('flex-shrink-0', 'pt-1')

    const contentContainer = infoBox.lastElementChild
    const contentDiv = contentContainer?.querySelector('div')
    expect(contentDiv).toHaveClass('text-slate-300', 'text-sm', 'mt-1')
  })

  it('renders title with correct styling', () => {
    render(<InfoBox type="note" title="Title">Content</InfoBox>)

    const title = screen.getByText('Title')
    expect(title).toHaveClass('font-bold', 'text-slate-100')
  })

  it('handles empty children gracefully', () => {
    render(<InfoBox type="note" title="Title"></InfoBox>)

    const infoBox = screen.getByRole('region')
    expect(infoBox).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
  })
})