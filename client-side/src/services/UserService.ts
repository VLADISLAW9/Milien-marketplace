import { AxiosResponse } from 'axios'
import $user_api from '../store/axios/user-api'
import { IUserResponse } from '../types/IUserResponse'

export default class userService {
	static async getUserData(): Promise<AxiosResponse<IUserResponse>> {
		return $user_api.get<IUserResponse>('/Customer/User/GetOwnAds')
	}
}
