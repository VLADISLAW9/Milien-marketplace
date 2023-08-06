import { AxiosResponse } from 'axios'
import $user_api from '../store/api/user-api'
import { IGetAllCorresponences } from '../types/IGetAllCorresponences'
import { IGetCurrentCorresponence } from '../types/IGetCurrentCorresponence'

export default class ChatService {
	static async GetAllCorresponences(): Promise<
		AxiosResponse<IGetAllCorresponences[]>
	> {
		return $user_api.get<IGetAllCorresponences[]>('/Chat/GetAllCorresponences')
	}

	static async GetCurrentCorresponence(
		recipientId: number
	): Promise<AxiosResponse> {
		return $user_api.get<IGetCurrentCorresponence[]>('Chat/GetCorrespondence', {
			params: { recipientId: recipientId },
		})
	}

	static async FindMessage(
		query: string
	): Promise<AxiosResponse<IGetAllCorresponences[]>> {
		return $user_api.get<IGetAllCorresponences[]>('/Chat/FindCorrespondence', {
			params: { query: query },
		})
	}
}
