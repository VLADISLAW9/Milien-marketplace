import { IAdvrt } from './IAdvrt'
import { ICustomer } from './ICustomer'
import { IUser } from './IUser'

export interface INotification{
	id: number
	customer: ICustomer
	message: string
	dateOfCreation: Date
}