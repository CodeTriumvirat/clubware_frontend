import { test, expect } from 'vitest'
import { ColorSchemeToggle } from '.'
import { render, screen } from '@/_utils/test'

test('renders color scheme toggle', () => {
    render(<ColorSchemeToggle />)
    expect(screen.getByText(/Light/i)).toBeDefined()
    expect(screen.getByText(/Dark/i)).toBeDefined()
})
