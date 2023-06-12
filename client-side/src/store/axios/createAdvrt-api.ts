import axios from 'axios'

export const CREATEADVT_URL = 'http://37.140.199.105:5000'

const $createAdvrt_api = axios.create({
	baseURL: CREATEADVT_URL
})

$createAdvrt_api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

export default $createAdvrt_api
