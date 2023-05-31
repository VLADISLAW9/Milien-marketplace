export function removeSpacesFromString(input: string): number {
	const numberString = input.replace(/\s/g, '')
	const number = parseInt(numberString)
	return number
}
