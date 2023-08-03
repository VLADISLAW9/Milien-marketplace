import { AxiosResponse } from 'axios'
import $user_api from '../store/api/user-api'

export default class UsersService {
	static async GetUserById(id: number): Promise<AxiosResponse> {
		return $user_api.get(`/Customer/User/GetById/${id}`)
	}
}
