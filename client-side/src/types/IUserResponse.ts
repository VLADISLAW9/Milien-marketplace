import { IAdvrt } from './IAdvrt'
import { IUser } from './IUser'

export interface IUserResponse {
	user: IUser
	userAds: IAdvrt[] | null
}
