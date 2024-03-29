import { test, expect } from 'vitest'
import { render, screen } from '@/_utils/test'
import { Logo } from '.'

test('renders logo component', () => {
    render(<Logo />)

    // Assert that the logo link is rendered
    expect(screen.getByTestId('logo')).toBeDefined()

    // Assert that the logo text is rendered
    expect(screen.getByText('clubware.')).toBeDefined()

    // Assert that the logo span is rendered
    expect(screen.getByText('io')).toBeDefined()
})
