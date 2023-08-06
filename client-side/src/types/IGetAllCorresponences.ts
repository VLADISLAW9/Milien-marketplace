import { ICustomer } from './ICustomer'

export interface IGetAllCorresponences {
	customer: ICustomer
	message: string
	dateOfDispatch: Date
}
