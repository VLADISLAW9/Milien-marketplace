import axios from 'axios'

export const CREATEPAYED_URL = 'http://37.140.199.105:5002'

const $createPremiumAdvrt_api = axios.create({
	baseURL: CREATEPAYED_URL,
})

$createPremiumAdvrt_api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

export default $createPremiumAdvrt_api
