import axios from 'axios'

export const USER_URL = 'https://api.xn--h1agbg8e4a.xn--p1ai'

const $user_api = axios.create({
	baseURL: USER_URL,
})

$user_api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

export default $user_api
