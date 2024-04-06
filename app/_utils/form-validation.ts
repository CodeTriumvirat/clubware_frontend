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
