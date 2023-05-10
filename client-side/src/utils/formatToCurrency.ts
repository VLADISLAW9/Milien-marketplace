export const formatToCurrency = (price: number) =>
	new Intl.NumberFormat('ru', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
	}).format(price)
