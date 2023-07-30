import { Divider } from 'antd'
import { useEffect, useState } from 'react'
import { BsTelephoneFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import AdvertisementItem_grid from '../../app/components/ui/Advertisement/AdvertisementItem_grid'
import AvatarItem from '../../app/components/ui/avatar/AvatarItem'
import ErrorMessage from '../../app/components/ui/error/ErrorMessage'
import Loader from '../../app/components/ui/spiner/Loader'
import { useFetching } from '../../hooks/use-fetching'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import { useGetAdvrtsByCustomerIdQuery } from '../../services/AdvrtsService'
import { useGetCustomerByIdQuery } from '../../services/CustomerService'
import SubscribeService from '../../services/SubsribeService'
import UserService from '../../services/UserService'
import { getSubscribersString } from '../../utils/convertToCorrectFormatSubs'
import { convertToPhoneNumber } from '../../utils/convertToPhoneNumber'

const CustomerPage = () => {
	const { isAuth } = useTypedSelector(state => state.user)
	const params = useParams()
	const [isSub, setIsSub] = useState<any>(false)
	const [countOfSub, setCountOfSub] = useState(0)

	const [fetchUserCountOfSubs] = useFetching(async () => {
		const response = await UserService.getCountSubscribers(Number(params.id))
		setCountOfSub(response.data)
	})

	const [checkedSubOnUser, isLoadingCheckedSubOnUser, isErrorCheckedOnUser] =
		useFetching(async () => {
			const response = await SubscribeService.CheckIsSub(Number(params.id))
			setIsSub(response.data)
		})

	const [subOnUser, isLoadinSub, isErrorSub] = useFetching(async () => {
		const response = await SubscribeService.SubscibeOnUser(Number(params.id))
		setIsSub(true)
		fetchUserCountOfSubs()
	})

	const [unSub, isLoadingUnSub, isErrorUnSub] = useFetching(async () => {
		const response = await SubscribeService.UnsubscibeOnUser(Number(params.id))
		setIsSub(false)
		fetchUserCountOfSubs()
	})

	useEffect(() => {
		checkedSubOnUser()
		fetchUserCountOfSubs()
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
			{isLoadingCustomer && isLoadingCheckedSubOnUser ? (
				<div className='flex justify-center items-center mt-44'>
					<Loader />
				</div>
			) : isErrorCustomer ? (
				<div className='mt-44'>
					<ErrorMessage />
				</div>
			) : customer ? (
				<div className='mt-14 flex max-lg:flex-col'>
					<div className='flex flex-auto w-[25%] mr-2 max-lg:w-[100%] flex-col'>
						<AvatarItem
							fontSize={'60'}
							height={'200'}
							width={'200'}
							user={customer}
						/>
						<div className='flex mt-10 text-3xl text-center items-center'>
							<h1>{customer.login}</h1>
						</div>
						<div className='mt-5 flex gap-5 '>
							<div className='text-stone-500'>
								<h1 className='text-xl font-medium '>{countOfSub}</h1>
								<p className='text-stone-500 '>
									{getSubscribersString(countOfSub)}
								</p>
							</div>
						</div>
						<Divider />
						<div className=''>
							<h1 className='text-stone-500'>
								<span className='text-stone-500 font-bold'> Имя: </span>
								{customer.firstName} {customer.lastName}
							</h1>
						</div>

						<div className='mt-3'>
							{customer.aboutMe && (
								<p
									className='text-stone-500'
									style={{ whiteSpace: 'pre-wrap' }}
								>
									<span className='text-stone-500 font-bold'>Обо мне: </span>
									{customer.aboutMe}
								</p>
							)}
							<Divider />
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
								{isAuth && !isLoadingCheckedSubOnUser && (
									<>
										{isSub ? (
											<button
												onClick={unSub}
												className='bg-[#F9CBA4] rounded-md text-[#F17E1B] hover:opacity-80 transition-opacity w-[100%] px-4 py-3'
											>
												Отписаться
											</button>
										) : (
											<button
												onClick={subOnUser}
												className='bg-[#F17E1B] rounded-md text-[#fff] hover:opacity-80 transition-opacity w-[100%] px-4 py-3'
											>
												Подписаться
											</button>
										)}
									</>
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
