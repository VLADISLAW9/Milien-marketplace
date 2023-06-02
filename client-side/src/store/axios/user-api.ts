import axios from 'axios'

export const USER_URL = 'http://192.168.0.160:5137'

const $user_api = axios.create({
	baseURL: USER_URL,
})

$user_api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

export default $user_api
