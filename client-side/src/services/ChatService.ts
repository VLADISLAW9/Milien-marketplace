import { AxiosResponse } from 'axios'
import $user_api from '../api/user-api'
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

	static async GetCountOfUnreadingMessages(): Promise<AxiosResponse<number>> {
		return $user_api.get<number>('/Chat/CountOfUnreadingMessages')
	}
}
