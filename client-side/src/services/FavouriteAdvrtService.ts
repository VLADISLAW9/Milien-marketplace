import { AxiosResponse } from 'axios'
import $user_api from '../store/api/user-api'
import { IAdvrt } from '../types/IAdvrt'

export default class FavoriteAdvrtService {
	static async AddToFavourite(id: number): Promise<AxiosResponse> {
		return $user_api.post('/Ad/AddToFavorite', id, {
			headers: { 'Content-Type': 'application/json' },
		})
	}

	static async CheckIsFavourite(id: number): Promise<AxiosResponse<boolean>> {
		return $user_api.get('/Ad/IsFavoite', { params: { id: id } })
	}

	static async RemoveFromFavourite(
		id: number
	): Promise<AxiosResponse<boolean>> {
		return $user_api.delete('/Ad/RemoveFromFavorite', { params: { id: id } })
	}

	static async GetFavorite(): Promise<AxiosResponse<IAdvrt[]>> {
		return $user_api.get('/Ad/GetFavoriteAds')
	}
}
