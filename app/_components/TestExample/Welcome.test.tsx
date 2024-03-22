import { test, expect } from 'vitest'
import { render, screen } from '@/_utils/test'
import { Welcome } from '.'

test('renders welcome message', () => {
    render(<Welcome />)
    expect(screen.getByText(/Welcome to Clubware/i)).toBeDefined()
})
