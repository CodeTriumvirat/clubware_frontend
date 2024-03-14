import { test, expect } from 'vitest'
import { render, screen } from '/app/test-utils'
import { Welcome } from './Welcome'

test('renders welcome message', () => {
    render(<Welcome />)
    expect(screen.getByText(/Welcome to Clubware/i)).toBeInTheDocument()
})
