export const convertToPhoneNumber = (number: string) => {
	const numberStr = number.toString()
	const countryCode = '+7'
	const areaCode = numberStr.substr(1, 3)
	const firstPart = numberStr.substr(3, 3)
	const secondPart = numberStr.substr(6, 2)
	const thirdPart = numberStr.substr(8, 2)
	const formattedNumber = `${countryCode} ${areaCode} ${firstPart}-${secondPart}-${thirdPart}`

	return formattedNumber
}
