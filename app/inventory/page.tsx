'use client'
import { useState, useEffect } from 'react'
import {
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    Title,
    MultiSelect,
    rem,
} from '@mantine/core'
import {
    IconSelector,
    IconChevronDown,
    IconChevronUp,
    IconSearch,
} from '@tabler/icons-react'
import classes from './styles.module.css'

interface RowData {
    name: string
    stock: number
    purchasePrice: number
    sellingPrice: number
    category: string
    note: string
}

interface ThProps {
    children: React.ReactNode
    reversed: boolean
    sorted: boolean
    onSort(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted
        ? reversed
            ? IconChevronUp
            : IconChevronDown
        : IconSelector
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    )
}

const data: RowData[] = [
    {
        name: 'Cola',
        stock: 150,
        purchasePrice: 0.5,
        sellingPrice: 1.0,
        category: 'Softdrink',
        note: 'Koffeinhaltig',
    },
    {
        name: 'Fanta',
        stock: 120,
        purchasePrice: 0.5,
        sellingPrice: 1.0,
        category: 'Softdrink',
        note: 'Orangengeschmack',
    },
    {
        name: 'Sprite',
        stock: 130,
        purchasePrice: 0.45,
        sellingPrice: 0.95,
        category: 'Softdrink',
        note: 'Zitronen-Limetten',
    },
    {
        name: 'Wasser still',
        stock: 200,
        purchasePrice: 0.2,
        sellingPrice: 0.8,
        category: 'Wasser',
        note: 'Ohne Kohlensäure',
    },
    {
        name: 'Wasser sprudel',
        stock: 180,
        purchasePrice: 0.25,
        sellingPrice: 0.85,
        category: 'Wasser',
        note: 'Mit Kohlensäure',
    },
    {
        name: 'Apfelsaft',
        stock: 90,
        purchasePrice: 0.6,
        sellingPrice: 1.2,
        category: 'Saft',
        note: '100% Apfel',
    },
    {
        name: 'Orangensaft',
        stock: 95,
        purchasePrice: 0.65,
        sellingPrice: 1.25,
        category: 'Saft',
        note: 'Frisch gepresst',
    },
    {
        name: 'Bier',
        stock: 150,
        purchasePrice: 0.8,
        sellingPrice: 2.0,
        category: 'Alkohol',
        note: 'Pilsner',
    },
    {
        name: 'Wein',
        stock: 60,
        purchasePrice: 3.0,
        sellingPrice: 6.0,
        category: 'Alkohol',
        note: 'Rotwein, trocken',
    },
    {
        name: 'Sekt',
        stock: 70,
        purchasePrice: 2.5,
        sellingPrice: 5.0,
        category: 'Alkohol',
        note: 'Brut',
    },
    {
        name: 'Gin',
        stock: 40,
        purchasePrice: 5.0,
        sellingPrice: 10.0,
        category: 'Alkohol',
        note: 'Dry Gin',
    },
    {
        name: 'Tonic Water',
        stock: 110,
        purchasePrice: 0.6,
        sellingPrice: 1.2,
        category: 'Softdrink',
        note: 'Für Gin Tonic',
    },
    {
        name: 'Eistee Pfirsich',
        stock: 95,
        purchasePrice: 0.55,
        sellingPrice: 1.1,
        category: 'Softdrink',
        note: 'Pfirsichgeschmack',
    },
    {
        name: 'Eistee Zitrone',
        stock: 100,
        purchasePrice: 0.55,
        sellingPrice: 1.1,
        category: 'Softdrink',
        note: 'Zitronengeschmack',
    },
    {
        name: 'Energy Drink',
        stock: 85,
        purchasePrice: 1.0,
        sellingPrice: 2.0,
        category: 'Softdrink',
        note: 'Hoher Koffeingehalt',
    },
    {
        name: 'Ingwerbier',
        stock: 75,
        purchasePrice: 0.7,
        sellingPrice: 1.4,
        category: 'Softdrink',
        note: 'Nicht alkoholisch',
    },
    {
        name: 'Kombucha',
        stock: 50,
        purchasePrice: 1.2,
        sellingPrice: 2.4,
        category: 'Softdrink',
        note: 'Fermentierter Tee',
    },
    // Weitere Einträge können hier hinzugefügt werden
]

export default function Page() {
    const [search, setSearch] = useState('')
    const [categoryFilter, setCategoryFilter] = useState<string[]>([])
    const [sortedData, setSortedData] = useState<RowData[]>([])
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
    const [reverseSortDirection, setReverseSortDirection] = useState(false)

    // Funktion zum Verarbeiten der Daten
    useEffect(() => {
        let processedData = data

        if (search) {
            const lowercasedSearch = search.toLowerCase()
            processedData = processedData.filter((item) =>
                Object.values(item).some((value) =>
                    value.toString().toLowerCase().includes(lowercasedSearch)
                )
            )
        }

        if (categoryFilter.length > 0) {
            processedData = processedData.filter((item) =>
                categoryFilter.includes(item.category)
            )
        }

        if (sortBy) {
            processedData = processedData.sort((a, b) => {
                const valueA = a[sortBy]
                const valueB = b[sortBy]
                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return reverseSortDirection
                        ? valueB - valueA
                        : valueA - valueB
                }
                return reverseSortDirection
                    ? valueB.toString().localeCompare(valueA.toString())
                    : valueA.toString().localeCompare(valueB.toString())
            })
        }

        setSortedData(processedData)
    }, [search, categoryFilter, sortBy, reverseSortDirection])

    const handleSort = (key: keyof RowData) => {
        setReverseSortDirection(sortBy === key ? !reverseSortDirection : false)
        setSortBy(key)
    }

    return (
        <>
            <Title order={4}>Inventory Overview</Title>
            <MultiSelect
                my="xl"
                label="Kategorie"
                placeholder="Filter"
                data={['Softdrink', 'Alkohol', 'Wasser', 'Saft']}
                value={categoryFilter}
                onChange={setCategoryFilter}
            />
            <TextInput
                placeholder="Search by any field"
                mb="md"
                leftSection={
                    <IconSearch
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                    />
                }
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
            />
            <ScrollArea>
                <Table>
                    <thead>
                        <tr>
                            {[
                                'name',
                                'stock',
                                'purchasePrice',
                                'sellingPrice',
                                'category',
                                'note',
                            ].map((key) => (
                                <Th
                                    key={key}
                                    sorted={sortBy === key}
                                    reversed={reverseSortDirection}
                                    onSort={() =>
                                        handleSort(key as keyof RowData)
                                    }
                                >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </Th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item, index) => (
                            <tr key={index} className={classes.tr}>
                                <td className={classes.td}>{item.name}</td>
                                <td className={classes.td}>{item.stock}</td>
                                <td className={classes.td}>
                                    {item.purchasePrice}
                                </td>
                                <td className={classes.td}>
                                    {item.sellingPrice}
                                </td>
                                <td className={classes.td}>{item.category}</td>
                                <td className={classes.td}>{item.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ScrollArea>
        </>
    )
}
