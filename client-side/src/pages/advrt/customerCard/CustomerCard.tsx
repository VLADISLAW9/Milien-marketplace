import { Avatar } from '@mui/material'
import { FC } from 'react'
import { IAdvrt } from '../../../types/IAdvrt'
import { ICustomer } from '../../../types/ICustomer'

interface ICustomerCardProps {
	customer?: ICustomer
	isLoading: boolean
	isError: boolean
	customer_advrts?: IAdvrt[]
}

const CustomerCard: FC<ICustomerCardProps> = ({
	customer,
	isError,
	isLoading,
	customer_advrts,
}) => {
	return (
		<div>
			<>
				{isLoading ? (
					<div className='mt-14  p-5 w-[320px] rounded-md  '>Loading...</div>
				) : isError ? (
					<div className='mt-14  p-5 w-[320px] rounded-md hover:bg-stone-200 transition-all cursor-pointer '>
						Error
					</div>
				) : customer ? (
					<div className='mt-14  p-5 w-[320px] rounded-md hover:shadow-xl hover:shadow-stone-200 transition-all cursor-pointer '>
						<div className='flex items-center'>
							<Avatar sx={{ width: 60, height: 60 }} />
							<h1 className='text-xl ml-3 text-stone-500'>
								{customer?.firstName} {customer?.lastName}
							</h1>
						</div>
						<div className='mt-5 text-stone-500 text-center px-4 py-2 border'>
							<p>Всего {customer_advrts?.length} объявления</p>
						</div>
					</div>
				) : null}
			</>
		</div>
	)
}

export default CustomerCard
