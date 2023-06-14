import axios from 'axios'

export const CREATEADVT_URL = 'https://api.xn--h1agbg8e4a.xn--p1ai'

const $createAdvrt_api = axios.create({
	baseURL: CREATEADVT_URL
})

$createAdvrt_api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

export default $createAdvrt_api
