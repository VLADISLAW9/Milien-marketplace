import { AxiosResponse } from 'axios'
import $api from '../store/axios'
import { IAuthResponse } from '../types/IAuthResponse'

export default class AuthService {
	static async login(
		login: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>('/api/Auth/login', { login, password })
	}

	static async registration(
		login: string,
		pass: string,
		age: number,
		email: string,
		firstName: string,
		lastName: string,
		phoneNumber: number,
		role: ['user']
	): Promise<AxiosResponse> {
		return $api.post('/api/Auth/registr', {
			login,
			pass,
			age,
			email,
			firstName,
			lastName,
			phoneNumber,
			role,
		})
	}

	static async logout(): Promise<void> {
		return $api.post('/api/Token/revoke')
	}
}
