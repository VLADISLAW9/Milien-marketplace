import axios from 'axios'

// АПИ ДЛЯ АВТОКОМПЛИТА АДРЕСОВ

const DADATA_TOKEN = '66ab16bfcbb3198b44e4b114d095a0d0297f355a'

export const DADATA_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs'

const $dadata_api = axios.create({
	baseURL: DADATA_URL,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"Authorization": "Token " + DADATA_TOKEN
},
})

export default $dadata_api
