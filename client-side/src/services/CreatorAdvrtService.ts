import { AxiosResponse } from 'axios'
import $createAdvrt_api from '../store/axios/createAdvrt-api'
import $createPremiumAdvrt_api from '../store/axios/createPaidAdvrt-api'

export default class CreateAdvrtService {
	static async editAdvrtData(
		title: string,
		description: string,
		price: number,
		id: number,
		adress: string,
		category: string,
		subcategory: string,
		images: File[],
		urls: string[]
	): Promise<AxiosResponse> {
		const formData = new FormData()
		formData.append('title', title)
		formData.append('description', description)
		formData.append('price', String(price))
		formData.append('adress', adress)
		formData.append('category', category)
		formData.append('subcategory', subcategory)
		formData.append('id', String(id))

		urls.forEach(urls => {
			formData.append(`urls`, urls)
		})

		images.forEach(image => {
			formData.append(`images`, image)
		})

		return $createAdvrt_api.put('/Ad/EditAd', formData)
	}

	static async createAdvrt(
		title: string,
		description: string,
		price: number,
		adress: string,
		category: string,
		subcategory: string,
		images: File[]
	): Promise<AxiosResponse> {
		const formData = new FormData()
		formData.append('title', title)
		formData.append('description', description)
		formData.append('price', String(price))
		formData.append('adress', adress)
		formData.append('category', category)
		formData.append('subcategory', subcategory)

		images.forEach(image => {
			formData.append(`images`, image)
		})

		return $createAdvrt_api.post('/Ad/CreateAd', formData, {
			headers: {
				'Access-Control-Allow-Origin': 'https://xn--h1agbg8e4a.xn--p1ai',
			},
		})
	}

	static async upgradeToPremium(id: number): Promise<AxiosResponse> {
		return $createAdvrt_api.post('/Ad/UpgradeToPremium', id, {
			headers: { 'Content-Type': 'application/json' },
		})
	}

	static async deleteAdvrt(id: number): Promise<AxiosResponse> {
		return $createAdvrt_api.delete('/Ad/DeleteAd', { params: { id } })
	}

	// for paid ads

	static async navigateToYookassa(): Promise<AxiosResponse> {
		return $createPremiumAdvrt_api.get('/Payment/CreatePayment')
	}

	static async cheakPayment(paymentId: string): Promise<AxiosResponse> {
		return $createPremiumAdvrt_api.get('/Payment/CheckPayment', {
			params: { paymentid: paymentId },
		})
	}

	static async createPaidAdvrt(
		title: string,
		description: string,
		price: number,
		adress: string,
		category: string,
		subcategory: string
	): Promise<AxiosResponse> {
		const formData = new FormData()
		formData.append('title', title)
		formData.append('description', description)
		formData.append('price', String(price))
		formData.append('adress', adress)
		formData.append('category', category)
		formData.append('subcategory', subcategory)

		return $createAdvrt_api.post('/Ad/CreatePaidAd', formData)
	}
}
