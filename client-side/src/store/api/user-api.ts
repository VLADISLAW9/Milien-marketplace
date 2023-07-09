import axios from 'axios'
import { IAuthResponse } from '../../types/IAuthResponse'
import { AUTH_URL } from './auth-api'

export const USER_URL = 'https://api.xn--h1agbg8e4a.xn--p1ai'

const $user_api = axios.create({
	baseURL: USER_URL
})

$user_api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

$user_api.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const accessToken = localStorage.getItem('token')
		const refreshToken = localStorage.getItem('refresh')
		const originalRequest = error.config
		if (error.response.status === 401 && error.config && !error.config._isRetry) {
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
				return $user_api.request(originalRequest)
			} catch (e:any) {
				console.log(e.response)
				console.log('Не авторизован')
			}
		}
		throw error
	}
)

export default $user_api
