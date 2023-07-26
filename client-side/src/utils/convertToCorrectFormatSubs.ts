export function getSubscribersString(count: number): string {
	if (count === 1) {
		return `подписчик`
	} else if (count > 1 && count < 5) {
		return `подписчика`
	} else {
		return `подписчиков`
	}
}

export function getSubscriptionString(count: number): string {
	let word = 'подписка'

	if (count % 10 === 1 && count % 100 !== 11) {
		// Для чисел оканчивающихся на 1, кроме чисел оканчивающихся на 11
		word = 'подписка'
	} else if (
		[2, 3, 4].includes(count % 10) &&
		![12, 13, 14].includes(count % 100)
	) {
		// Для чисел оканчивающихся на 2, 3 или 4, кроме чисел оканчивающихся на 12, 13, 14
		word = 'подписки'
	} else {
		// Для всех остальных случаев
		word = 'подписок'
	}

	return `${word}`
}
