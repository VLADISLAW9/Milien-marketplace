import axios from 'axios'

export const CREATEPAYED_URL = 'https://api.xn--h1agbg8e4a.xn--p1ai'

const $createPremiumAdvrt_api = axios.create({
	baseURL: CREATEPAYED_URL,
})

$createPremiumAdvrt_api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

export default $createPremiumAdvrt_api
