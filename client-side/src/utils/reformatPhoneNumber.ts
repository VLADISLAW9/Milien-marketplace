export const reformatPhoneNumber = (phoneNumber: string) => {
	const digitsOnly = phoneNumber.replace(/\D/g, '')

	if (digitsOnly.length === 11) {
		if (digitsOnly.startsWith('7')) {
			return '8' + digitsOnly.slice(1)
		}
		return digitsOnly
	} else {
		return phoneNumber
	}
}
