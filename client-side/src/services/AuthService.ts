import { AxiosResponse } from 'axios'
import $api from '../store/api/auth-api'
import { IAuthResponse } from '../types/IAuthResponse'

export default class AuthService {
	static async login(
		login: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>('/api/Auth/login', { login, password })
	}

	static async checkAcceptEmail(
		login: string
	): Promise<AxiosResponse<boolean>> {
		return $api.get('/api/Auth/check_accept_email', {
			params: { login: login },
		})
	}

	static async checkCode(
		email: string,
		code: string
	): Promise<AxiosResponse<boolean>> {
		return $api.get('/api/Auth/check_code', {
			params: { email: email, code: code },
		})
	}

	static async registration(
		login: string,
		pass: string,
		email: string,
		firstName: string,
		lastName: string,
		phoneNumber: string
	): Promise<AxiosResponse> {
		return $api.post('/api/Auth/register', {
			login,
			pass,
			email,
			firstName,
			lastName,
			phoneNumber,
		})
	}

	static async checkLogin(login: string): Promise<AxiosResponse<boolean>> {
		return $api.get('/api/Auth/check_login', { params: { login: login } })
	}

	static async checkEmailCode(
		login: string,
		code: string
	): Promise<AxiosResponse> {
		return $api.get('/api/Auth', {
			params: { login: login, code: code },
		})
	}

	static async sendEmailCode(login: string): Promise<AxiosResponse> {
		return $api.get('/api/Auth/send_email', {
			params: { login: login },
		})
	}

	static async checkPhone(
		phoneNumber: string
	): Promise<AxiosResponse<boolean>> {
		return $api.get('/api/Auth/check_phone', {
			params: { phoneNumber: phoneNumber },
		})
	}

	static async checkEmail(email: string): Promise<AxiosResponse<boolean>> {
		return $api.get('/api/Auth/check_email', { params: { email: email } })
	}

	static async logout(): Promise<void> {
		return $api.post('/api/Token/revoke')
	}
}
