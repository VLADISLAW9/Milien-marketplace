import { ICustomer } from './ICustomer'

export interface IGetCurrentCorresponence {
	id: number
	senderId: number
	recipientId: number
	text:string
	dateOfDispatch: Date
}