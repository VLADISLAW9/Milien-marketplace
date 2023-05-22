export const formatPhoneNumber = (input: string) => {
	// Удаление всех символов, кроме цифр
	const phoneNumber = input.replace(/\D/g, '')

	// Проверка длины номера и добавление префикса +7, если необходимо
	let formattedNumber = phoneNumber
	if (formattedNumber.length > 0 && formattedNumber[0] !== '7') {
		formattedNumber = '7' + formattedNumber
	}

	// Форматирование номера телефона
	let formatted = formattedNumber
	if (formattedNumber.length > 0) {
		formatted = '+7'
		if (formattedNumber.length > 1) {
			formatted += ' (' + formattedNumber.substring(1, 4)
		}
		if (formattedNumber.length >= 5) {
			formatted += ') ' + formattedNumber.substring(4, 7)
		}
		if (formattedNumber.length >= 8) {
			formatted += '-' + formattedNumber.substring(7, 9)
		}
		if (formattedNumber.length >= 10) {
			formatted += '-' + formattedNumber.substring(9, 11)
		}
	}

	return formatted
}

export const deFormatPhoneNumber = (input: string) => {

}
