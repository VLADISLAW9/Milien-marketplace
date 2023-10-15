import { AxiosResponse } from 'axios'
import $dadata_api from '../api/dadata-api'

export default class DaDataService {
	static async AutoCompleteAdress(query: string): Promise<AxiosResponse> {
		return $dadata_api.post('/suggest/address', "москва")
	}
}
