export const handleCopyToClipboard = (text: string) => {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			console.log(`Text "${text}" copied to clipboard`)
		})
		.catch(error => {
			console.error(`Error copying text to clipboard: ${error}`)
		})
}