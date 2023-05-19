import axios from 'axios'
import { IAuthResponse } from '../../types/IAuthResponse'

export const AUTH_URL = 'http://192.168.0.160:5243'

const $api = axios.create({
	withCredentials: true,
	baseURL: AUTH_URL,
})

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

$api.interceptors.request.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (
			error.response.status == 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const response = await axios.get<IAuthResponse>(
					`${AUTH_URL}/api/Token/refresh`,
					{ withCredentials: true }
				)
				localStorage.setItem('token', response.data.accessToken)
				return $api.request(originalRequest)
			} catch (e) {
				console.log('Не авторизован')
			}
		}
		throw error
	}
)

export default $api
