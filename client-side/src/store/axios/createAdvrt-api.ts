import axios from 'axios'
export const CREATEADVT_URL = 'http://192.168.0.160:5137'
export const CREATEPAYED_URL = 'http://192.168.0.160:5255'

const $createAdvrt_api = axios.create({
	withCredentials: true,
	baseURL: CREATEADVT_URL,
})

$createAdvrt_api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

export default $createAdvrt_api

