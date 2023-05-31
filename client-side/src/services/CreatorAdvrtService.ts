import { AxiosResponse } from 'axios'
import $createAdvrt_api from '../store/axios/createAdvrt-api'
import $createPremiumAdvrt_api from '../store/axios/createPaidAdvrt-api'

export default class CreateAdvrtService {
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

		return $createAdvrt_api.post('/Ad/CreateAd', formData)
	}

	// for paid ads

	static async navigateToYookassa(): Promise<AxiosResponse> {
		return $createPremiumAdvrt_api.get('/Payment/CreatePayment')
	}

	static async createPaidAdvrt(): Promise<AxiosResponse> {
		return $createPremiumAdvrt_api.post('/Payment/CreatePaidAd')
	}
}
