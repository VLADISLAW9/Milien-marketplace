import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import { BsTelephoneFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import AdvertisementItem_grid from '../../app/components/ui/Advertisement/AdvertisementItem_grid'
import ErrorMessage from '../../app/components/ui/error/ErrorMessage'
import Loader from '../../app/components/ui/spiner/Loader'
import { useFetching } from '../../hooks/use-fetching'
import { useGetAdvrtsByCustomerIdQuery } from '../../services/AdvrtsService'
import { useGetCustomerByIdQuery } from '../../services/CustomerService'
import SubscribeService from '../../services/SubsribeService'
import { convertToPhoneNumber } from '../../utils/convertToPhoneNumber'

const CustomerPage = () => {
	const params = useParams()
	const [isSub, setIsSub] = useState<any>(false)

	const [checkedSubOnUser, isLoadingCheckedSubOnUser, isErrorCheckedOnUser] =
		useFetching(async () => {
			const response = SubscribeService.CheckIsSub(Number(params.id))
			setIsSub(response)
		})

	const [subOnUser, isLoadinSub, isErrorSub] = useFetching(async () => {
		const response = SubscribeService.SubscibeOnUser(Number(params.id))
		setIsSub(true)
	})

	const [unSub, isLoadingUnSub, isErrorUnSub] = useFetching(async () => {
		const response = SubscribeService.UnsubscibeOnUser(Number(params.id))
		setIsSub(false)
	})

	useEffect(() => {
		checkedSubOnUser()
	}, [])

	const {
		data: customer,
		isLoading: isLoadingCustomer,
		isError: isErrorCustomer,
	} = useGetCustomerByIdQuery(params.id)

	const {
		data: customerAdvrts,
		isLoading: isLoadingCustomerAdvrts,
		isError: isErrorCustomerAdvrts,
	} = useGetAdvrtsByCustomerIdQuery(params.id)

	return (
		<div className=''>
			{isLoadingCustomer ? (
				<div className='flex justify-center items-center mt-44'>
					<Loader />
				</div>
			) : isErrorCustomer ? (
				<div className='mt-44'>
					<ErrorMessage />
				</div>
			) : customer ? (
				<div className='mt-14 flex max-lg:flex-col'>
					<div className='flex flex-auto w-[25%] max-lg:w-[100%] flex-col'>
						{customer.avatar === null ? (
							<Avatar sx={{ width: 200, height: 200, fontSize: 60 }}>
								{customer.login?.slice(0, 1)}
							</Avatar>
						) : (
							<Avatar sx={{ width: 200, height: 200 }}>
								<img src={customer.avatar} />
							</Avatar>
						)}
						<div className='flex mt-10 text-3xl text-center items-center'>
							<h1>{customer.login}</h1>
						</div>
						<div
							className='mt-2
						'
						>
							<h1 className='text-stone-400'>
								{customer.firstName} {customer.lastName}
							</h1>
						</div>
						<div></div>
						<div className='mt-3'>
							{customer.aboutMe && (
								<p>
									<span className='text-stone-500 font-bold'>Обо мне: </span>
									{customer.aboutMe}
								</p>
							)}
							{customer.id === 107 ? (
								<></>
							) : (
								<>
									<div className='mt-5 text-stone-500 flex items-center'>
										<BsTelephoneFill className='mr-2 ' />
										<p>{convertToPhoneNumber(customer.phoneNumber)}</p>
									</div>{' '}
								</>
							)}

							<div className='mt-3 text-stone-500 flex items-center'>
								<MdEmail className='mr-2 w-5 h-5 ' />
								<p>{customer.email}</p>
							</div>
							<div className='mt-10'>
								{!isSub ? (
									<button
										onClick={subOnUser}
										className='bg-[#F17E1B] rounded-md text-[#fff] hover:opacity-80 transition-opacity w-[100%] px-4 py-3'
									>
										Подписаться
									</button>
								) : (
									<button
										onClick={unSub}
										className='bg-[#F9CBA4] rounded-md text-[#F17E1B] hover:opacity-80 transition-opacity w-[100%] px-4 py-3'
									>
										Отписаться
									</button>
								)}
							</div>
						</div>
					</div>
					<div className='flex ml-14 flex-auto max-lg:w-[100%] max-lg:ml-0 max-xl:mt-10  w-[80%] flex-col'>
						<h1 className='text-3xl font-'>Объявления пользователя</h1>
						{isLoadingCustomerAdvrts ? (
							<div className='flex justify-center items-center mt-36'>
								<Loader />
							</div>
						) : isErrorCustomerAdvrts ? (
							<div className='mt-36'>
								<ErrorMessage />
							</div>
						) : customerAdvrts ? (
							<ul className='grid grid-cols-4 max-lg:grid-cols-3 max-lg:gap-2 gap-5 mt-7'>
								{customerAdvrts.map(advrt => (
									<AdvertisementItem_grid advrt_data={advrt} mini={true} />
								))}
							</ul>
						) : null}
					</div>
				</div>
			) : null}
		</div>
	)
}

export default CustomerPage
