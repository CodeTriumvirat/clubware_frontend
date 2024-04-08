import dayjs from 'dayjs'

export function formatKeyToUppercaseWords(key: string) {
    return key
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export function formatStringToDate(input: string | Date | null): Date | null {
    if (input === null) return null
    if (input instanceof Date) return input
    return dayjs(input, 'DD.MM.YYYY').toDate()
}

export function formatDateToString(input: string | Date | null): string | null {
    if (input === null) return null
    if (typeof input === 'string') return dayjs(input).format('DD.MM.YYYY')
    return dayjs(input).format('DD.MM.YYYY')
}
