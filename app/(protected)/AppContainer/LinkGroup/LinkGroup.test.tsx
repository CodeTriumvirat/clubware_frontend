import { test, expect } from 'vitest'
import { render, screen, fireEvent } from '@/_utils/test'
import { LinkGroup } from '.'

test('renders LinkGroup component with links', () => {
    const links = [
        { label: 'Link 1', link: '/link1' },
        { label: 'Link 2', link: '/link2' },
        { label: 'Link 3', link: '/link3' },
    ]
    const label = 'Group Label'
    const icon = () => <div>Icon</div>
    const link = '/group-link'
    const openedNav = ''
    const setOpenedNav = () => {}

    render(
        <LinkGroup
            label={label}
            icon={icon}
            link={link}
            links={links}
            openedNav={openedNav}
            setOpenedNav={setOpenedNav}
        />
    )

    // Assert that the group label is rendered
    expect(screen.getByText(label)).toBeDefined()

    // Assert that the icon is rendered
    expect(screen.getByText('Icon')).toBeDefined()

    // Assert that the link group container is not rendered initially
    expect(screen.queryByTestId('linkGroupContainer')).toBeNull()
})
