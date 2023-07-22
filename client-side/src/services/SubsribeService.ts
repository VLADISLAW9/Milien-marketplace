import { AxiosResponse } from 'axios'
import $user_api from '../store/api/user-api'

export default class SubscribeService {
	static async CheckIsSub(id: number): Promise<AxiosResponse<boolean>> {
		return $user_api.get('/Subscriptions/IsSubscribe', { params: { id } })
	}

	static async SubscibeOnUser(followingId: number): Promise<AxiosResponse> {
		return $user_api.post('/Subscriptions/Subscribe', followingId, {
			headers: { 'Content-Type': 'application/json' },
		})
	}
	static async UnsubscibeOnUser(followingId: number): Promise<AxiosResponse> {
		return $user_api.delete('/Subscriptions/Unubscribe', {
			params: { followingId: followingId },
		})
	}
}
