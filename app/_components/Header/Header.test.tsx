import { test, expect } from 'vitest'
import { render, screen } from '@/_utils/test'
import { Header } from '.'

test('renders header component', () => {
    render(<Header isNavOpened={false} toggle={() => {}} />)

    // Assert that the header container is rendered
    expect(screen.getByTestId('headerContainer')).toBeDefined()

    // Assert that the header left container is rendered
    expect(screen.getByTestId('headerLeft')).toBeDefined()

    // Assert that the header right container is rendered
    expect(screen.getByTestId('headerRight')).toBeDefined()

    // Assert that the burger icon is rendered
    expect(screen.getByTestId('burger')).toBeDefined()

    // Assert that the logo is rendered
    expect(screen.getByTestId('logo')).toBeDefined()

    // Assert that the search input is rendered
    expect(screen.getByPlaceholderText('Suche:')).toBeDefined()

    // Assert that the color scheme toggle is rendered
    expect(screen.getByTestId('colorSchemeToggle')).toBeDefined()
})
