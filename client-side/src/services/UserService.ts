import { AxiosResponse } from 'axios'
import $user_api from '../store/axios/user-api'
import { ICustomer } from '../types/ICustomer'
import { IUserResponse } from '../types/IUserResponse'

export default class userService {
	static async getUserData(): Promise<AxiosResponse<IUserResponse>> {
		return $user_api.get<IUserResponse>('/Customer/User/GetOwnAds')
	}

	static async editUserData(
		login: string,
		aboutMe: string | null,
		firstName: string,
		lastName: string,
		email: string,
		phoneNumber: number
	): Promise<AxiosResponse<ICustomer>> {
		return $user_api.put<ICustomer>('/Customer/User/EditProfile', {
			login,
			aboutMe,
			firstName,
			lastName,
			email,
			phoneNumber
		})
	}
}
