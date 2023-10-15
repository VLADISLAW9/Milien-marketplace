import axios from 'axios'
import { IAuthResponse } from '../types/IAuthResponse'
import { AUTH_URL } from './auth-api'

export const CREATEPAYED_URL = 'https://api.xn--h1agbg8e4a.xn--p1ai'

const $createPremiumAdvrt_api = axios.create({
	baseURL: CREATEPAYED_URL
})

$createPremiumAdvrt_api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

$createPremiumAdvrt_api.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const accessToken = localStorage.getItem('token')
		const refreshToken = localStorage.getItem('refresh')
		const originalRequest = error.config
		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const response = await axios.post<IAuthResponse>(
					`${AUTH_URL}/api/Token/refresh`,
					{ accessToken, refreshToken }
				)
				console.log(error, 'is error')
				console.log('interceptors is working')
				localStorage.setItem('token', response.data.accessToken)
				localStorage.setItem('refresh', response.data.refreshToken)
				return $createPremiumAdvrt_api.request(originalRequest)
			} catch (e) {
				console.log('Не авторизован')
			}
		}
		throw error
	}
)

export default $createPremiumAdvrt_api
