export function validateEmail(value: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(value) ? null : 'Invalid email'
}

export function validatePassword(value: string) {
    const regex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    return regex.test(value)
        ? null
        : 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
}

export function validatePhoneNumber(value: string) {
    const regex = /^(?:(?:\+|00)(?:[0-9] ?){6,14}[0-9])?$/
    return regex.test(value) || value === ''
        ? null
        : 'Number needs to start with a + or 00'
}

export function validateStreet(value: string) {
    return value.length > 0 ? null : 'Invalid Address'
}

export function validatePostcode(value: string) {
    return value.length > 0 ? null : 'Invalid Postcode'
}

export function validateCity(value: string) {
    return value.length > 0 ? null : 'Invalid City'
}

export function validateFirstName(value: string) {
    return value.length > 0 ? null : 'Invalid Firstname'
}

export function validateLastName(value: string) {
    return value.length > 0 ? null : 'Invalid Lastname'
}
