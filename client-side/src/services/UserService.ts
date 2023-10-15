import { AxiosResponse } from 'axios'
import $user_api from '../api/user-api'
import { IUserResponse } from '../types/IUserResponse'

export default class UserService {
	static async getCountSubscribers(userId: number): Promise<AxiosResponse> {
		return $user_api.get('/Subscriptions/GetCountOfSubscribers', {
			params: { userId: userId },
		})
	}

	static async getMyCountOfSub(): Promise<AxiosResponse> {
		return $user_api.get('/Subscriptions/GetMySubscriptions')
	}

	static async getUserData(): Promise<AxiosResponse<IUserResponse>> {
		return $user_api.get<IUserResponse>('/Customer/User/GetOwnAds')
	}

	static async editUserData(
		id: number,
		login: string,
		aboutMe: string | null,
		firstName: string,
		lastName: string,
		phoneNumber: string,
		avatar: File | string
	): Promise<AxiosResponse> {
		const formData = new FormData()
		formData.append('id', String(id))
		formData.append('login', login)
		formData.append('aboutMe', aboutMe ? aboutMe : '')
		formData.append('firstName', firstName)
		formData.append('lastName', lastName)
		formData.append('phoneNumber', phoneNumber)
		formData.append(`avatar`, avatar ? avatar : '')

		return $user_api.put('/Customer/User/EditProfile', formData, {
			headers: {
				'Access-Control-Allow-Origin': 'https://xn--h1agbg8e4a.xn--p1ai',
			},
		})
	}
}
