import { Avatar } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../../app/components/ui/error/ErrorMessage'
import Loader from '../../../app/components/ui/spiner/Loader'
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
	const handleClick = () => {
		window.scrollTo(0, 0)
	}

	return (
		<div>
			<>
				{isLoading ? (
					<div className='mt-14 p-5 w-[320px] transition-all flex justify-center items-center cursor-pointer  '>
						<Loader />
					</div>
				) : isError ? (
					<div className='mt-14 p-5 w-[320px] transition-all flex justify-center items-center cursor-pointer  '>
						<ErrorMessage />
					</div>
				) : customer ? (
					<Link onClick={handleClick} to={`/customer/${customer.id}`}>
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
					</Link>
				) : null}
			</>
		</div>
	)
}

export default CustomerCard
