import { AxiosResponse } from 'axios'
import $user_api from '../api/user-api'
import { INotification } from '../types/INotification'

export default class NotificationService {
	static async GetNotifications(): Promise<AxiosResponse> {
		return $user_api.get<INotification[]>('/Subscriptions/GetNotifications')
	}

	static async ClearNotifications(): Promise<AxiosResponse> {
		return $user_api.delete('/Subscriptions/RemoveNotifications')
	}
}
