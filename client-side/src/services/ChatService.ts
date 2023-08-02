import { AxiosResponse } from 'axios'
import $user_api from '../store/api/user-api'
import { ICustomer } from '../types/ICustomer'
import { IGetCurrentCorresponence } from '../types/IGetCurrentCorresponence'

export default class ChatService {
	static async GetAllCorresponences(): Promise<AxiosResponse<ICustomer[]>> {
		return $user_api.get<ICustomer[]>('/Chat/GetAllCorresponences')
	}

	static async GetCurrentCorresponence(recipientId: number): Promise<
		AxiosResponse
	> {
		return $user_api.get<IGetCurrentCorresponence[]>('Chat/GetCorrespondence', {
			params: { recipientId: recipientId },
		})
	}
}
