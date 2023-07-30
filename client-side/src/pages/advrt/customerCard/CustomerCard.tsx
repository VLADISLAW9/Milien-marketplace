import { FC } from 'react'
import { Link } from 'react-router-dom'
import AvatarItem from '../../../app/components/ui/avatar/AvatarItem'
import ErrorMessage from '../../../app/components/ui/error/ErrorMessage'
import Loader from '../../../app/components/ui/spiner/Loader'
import { useTypedSelector } from '../../../hooks/use-typed-selector'
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

	const { user } = useTypedSelector(state => state.user)

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
					<Link
						onClick={handleClick}
						to={
							user && user.id === customer.id
								? `/my-profile`
								: `/customer/${customer.id}`
						}
					>
						<div className='mt-14 max-lg:py-5 max-lg:px-1  p-5 w-[320px] max-lg:w-[500px] rounded-md hover:shadow-xl hover:shadow-stone-200 transition-all cursor-pointer '>
							<div className='flex items-center'>
								<AvatarItem
									badgeS='9'
									offset={[-8, 55]}
									fontSize={'20'}
									height={'60'}
									user={customer}
									width={'60'}
								/>
								<h1 className='text-xl ml-3 max-lg:text-3xl text-stone-500 max-lg:ml-5'>
									{customer.login}
								</h1>
							</div>
							<div className='mt-5 text-stone-500 text-center px-4 py-2 max-lg:px-6 max-lg:py-6 border max-lg:text-2xl max-lg:border-2 max-lg:border-stone-500'>
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
