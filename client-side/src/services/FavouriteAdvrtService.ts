import { AxiosResponse } from 'axios'
import $user_api from '../store/axios/user-api'
import { IAdvrt } from '../types/IAdvrt'

export default class FavoriteAdvrtService {
	static async AddToFavourite(adid: number): Promise<AxiosResponse<IAdvrt>> {
		return $user_api.post<IAdvrt>('/Ad/AddToFavorite', {
			params: { adid: adid },
		})
	}

	static async GetFavorite(): Promise<AxiosResponse> {
		return $user_api.post<IAdvrt[]>('/Ad/GetFavoritesAds')
	}
}
