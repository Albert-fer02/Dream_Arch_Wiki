import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import CommunityPortal from '../CommunityPortal'

describe('CommunityPortal', () => {
  it('renders community portal with title', () => {
    render(<CommunityPortal />)

    expect(screen.getByText('Community portal')).toBeInTheDocument()
    expect(screen.getByText('Welcome to the Arch community!')).toBeInTheDocument()
  })

  it('renders getting involved section', () => {
    render(<CommunityPortal />)

    expect(screen.getByText('Getting involved')).toBeInTheDocument()
    expect(screen.getByText('ArchWiki:Contributing')).toBeInTheDocument()
  })

  it('renders community resources section', () => {
    render(<CommunityPortal />)

    expect(screen.getByText('Community resources')).toBeInTheDocument()
    expect(screen.getByText('Forums')).toBeInTheDocument()
    expect(screen.getByText('IRC Channels')).toBeInTheDocument()
  })

  it('renders code of conduct section', () => {
    render(<CommunityPortal />)

    expect(screen.getByText('Code of conduct')).toBeInTheDocument()
    expect(screen.getByText('Do')).toBeInTheDocument()
    expect(screen.getByText("Don't")).toBeInTheDocument()
  })

  it('renders international communities section', () => {
    render(<CommunityPortal />)

    expect(screen.getByText('International communities')).toBeInTheDocument()
    expect(screen.getByText('Deutsch')).toBeInTheDocument()
    expect(screen.getByText('Español')).toBeInTheDocument()
  })
})