import { AxiosResponse } from 'axios'
import $api from '../store/axios'
import { IUser } from '../types/IUser'
export default class AuthService {
	static async fetchUser(): Promise<AxiosResponse<IUser[]>> {
		return $api.get<IUser[]>('/api/Auth/getUser')
	}
}
