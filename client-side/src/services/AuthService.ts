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
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>('/api/Auth/registration', { login, password })
	}

	static async logout(): Promise<void> {
		return $api.post('/api/Token/revoke')
	}
}
