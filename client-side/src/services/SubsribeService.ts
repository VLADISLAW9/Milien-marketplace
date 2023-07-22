import { AxiosResponse } from 'axios'
import $user_api from '../store/api/user-api'

export default class SubscribeService {
	static async CheckIsSub(followingId: number): Promise<AxiosResponse> {
		return $user_api.get('/Subscriptions/IsSubscribe', { params: { followingId: followingId } })
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
