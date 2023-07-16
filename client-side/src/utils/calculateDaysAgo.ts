export const calculateDaysAgo = (date: any) => {
	const currentDate = new Date()
	const createdDate = new Date(date)

	const timeDiff = Math.abs(currentDate.getTime() - createdDate.getTime())
	const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

	if (
		currentDate.getFullYear() === createdDate.getFullYear() &&
		currentDate.getMonth() === createdDate.getMonth() &&
		currentDate.getDate() === createdDate.getDate()
	) {
		return 'сегодня'
	} else if (daysDiff === 1) {
		return 'вчера'
	} else if (daysDiff > 10) {
		const formattedDate = formatDate(createdDate)
		return formattedDate
	} else {
		const declension = getDeclension(daysDiff)
		return `${daysDiff} ${declension} назад`
	}
}

const formatDate = (date: Date) => {
	const day = date.getDate()
	const month = date.toLocaleString('default', { month: 'long' })
	const monthInGenitive = getMonthInGenitive(month)

	if (date.getFullYear() !== new Date().getFullYear()) {
		const year = date.getFullYear()
		return `${day} ${monthInGenitive} ${year} года`
	} else {
		return `${day} ${monthInGenitive}`
	}
}

const getMonthInGenitive = (month: string) => {
	switch (month) {
		case 'январь':
			return 'января'
		case 'февраль':
			return 'февраля'
		case 'март':
			return 'марта'
		case 'апрель':
			return 'апреля'
		case 'май':
			return 'мая'
		case 'июнь':
			return 'июня'
		case 'июль':
			return 'июля'
		case 'август':
			return 'августа'
		case 'сентябрь':
			return 'сентября'
		case 'октябрь':
			return 'октября'
		case 'ноябрь':
			return 'ноября'
		case 'декабрь':
			return 'декабря'
		default:
			return month
	}
}

const getDeclension = (number: any) => {
	const cases = [2, 0, 1, 1, 1, 2]
	const titles = ['день', 'дня', 'дней']
	const index =
		number % 100 > 4 && number % 100 < 20
			? 2
			: cases[number % 10 < 5 ? number % 10 : 5]
	return titles[index]
}
