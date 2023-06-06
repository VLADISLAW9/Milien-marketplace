import { AxiosResponse } from 'axios'
import $user_api from '../store/axios/user-api'
import { IAdvrt } from '../types/IAdvrt'

export default class FavoriteAdvrtService {
	static async AddToFavourite(id: number): Promise<AxiosResponse> {
		return $user_api.post(
			'/Ad/AddToFavorite',
			id,
			{ headers: { 'Content-Type': 'application/json' } }
		)
	}

	static async GetFavorite(): Promise<AxiosResponse> {
		return $user_api.post<IAdvrt[]>('/Ad/GetFavoritesAds')
	}
}
