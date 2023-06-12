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
	} else {
		const declension = getDeclension(daysDiff)
		return `${daysDiff} ${declension} назад`
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
