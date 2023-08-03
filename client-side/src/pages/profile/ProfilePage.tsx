import { DeleteOutlined } from '@ant-design/icons'
import { Avatar } from '@mui/material'
import { Dispatch } from '@reduxjs/toolkit'
import { Divider, message } from 'antd'
import { useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlineSetting } from 'react-icons/ai'
import { BiMessage } from 'react-icons/bi'
import { BsTelephoneFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import AdvertisementItem_grid from '../../app/components/ui/Advertisement/AdvertisementItem_grid'
import Loader from '../../app/components/ui/spiner/Loader'
import { useActions } from '../../hooks/use-actions'
import { useFetching } from '../../hooks/use-fetching'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import UserService from '../../services/UserService'
import { IAdvrt } from '../../types/IAdvrt'
import { ICustomer } from '../../types/ICustomer'
import {
	getSubscribersString,
	getSubscriptionString,
} from '../../utils/convertToCorrectFormatSubs'
import { convertToPhoneNumber } from '../../utils/convertToPhoneNumber'
import EditModal from './EditModal'

const ProfilePage = () => {
	const { isAuth, errorMessage, isLoadingAuth } = useTypedSelector(
		state => state.user
	)
	const location = useLocation()
	const [userData, setUserData] = useState<any>(null)
	const [userAds, setUserDataAds] = useState<IAdvrt[]>([])
	const dispatch = useDispatch<Dispatch<any>>()
	const { setUser, setUserAds } = useActions()
	const [messageApi, contextHolder] = message.useMessage()
	const [open, setOpen] = useState(false)
	const [countSubscribers, setCountSubscribers] = useState(0)
	const [mySubs, seMySub] = useState<ICustomer[] | never[]>([])

	const [fetchUserData, isLoading, userDataError] = useFetching(async () => {
		const fetcher = await UserService.getUserData()
		setUserData(fetcher.data.user)
		dispatch(setUser(fetcher.data.user))
		if (fetcher.data.userAds) {
			setUserDataAds([...fetcher.data.userAds, ...userAds])
			dispatch(setUserAds(fetcher.data.userAds))
		}
	})

	const [fetchCountSubscribers, isLoadingCountSubscribers] = useFetching(
		async () => {
			const response = await UserService.getCountSubscribers(userData.id)
			setCountSubscribers(response.data)
		}
	)

	const [fetchCountSubscriptions, isLoadingCountSubscriptions] = useFetching(
		async () => {
			const response = await UserService.getMyCountOfSub()
			seMySub(response.data)
		}
	)

	const messageRemoveFromFav = () => {
		messageApi.open({
			type: 'success',
			content: 'Ваше объявление удалено',
			className: 'custom-class',
			icon: <DeleteOutlined style={{ color: 'rgb(220 38 38)' }} />,
			style: {
				color: 'rgb(220 38 38)',
			},
		})
	}

	const handleOpenEdit = () => {
		setOpen(true)
	}

	const handleCloseEdit = () => {
		setOpen(false)
	}

	const RemoveAdFromMyAds = (id: number) => {
		setUserDataAds(prevFav => prevFav.filter(item => item.id !== id))
		messageRemoveFromFav()
	}

	useEffect(() => {
		fetchUserData()
	}, [])

	useEffect(() => {
		if (userData?.id) {
			fetchCountSubscribers()
			fetchCountSubscriptions()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData?.id])

	if (
		isLoading ||
		(isLoadingAuth && isLoadingCountSubscribers) ||
		isLoadingCountSubscriptions ||
		userData === null
	) {
		return (
			<div className='flex justify-center items-center mt-44'>
				<Loader />
			</div>
		)
	} else if (userData) {
		return (
			<>
				{contextHolder}
				<div className=''>
					<div className='mt-14 flex max-lg:flex-col'>
						<div className='flex flex-auto w-[25%] max-lg:w-[100%] flex-col'>
							{userData.avatar === null ? (
								<Avatar sx={{ width: 200, height: 200, fontSize: 60 }}>
									{userData.login?.slice(0, 1)}
								</Avatar>
							) : (
								<Avatar sx={{ width: 200, height: 200 }}>
									<img src={userData.avatar} />
								</Avatar>
							)}
							<div className='flex mt-10 text-3xl text-center items-center'>
								<h1>{userData.login}</h1>
							</div>
							<div className='mt-5 flex gap-5 '>
								<div className='text-stone-500'>
									<h1 className='text-xl font-medium '>{countSubscribers}</h1>
									<p className='text-stone-500 '>
										{getSubscribersString(countSubscribers)}
									</p>
								</div>
								<Link className='text-stone-500' 
								to='/my-subscriptions'>
									<h1 className='text-xl font-medium '>{mySubs.length}</h1>
									<p className='text-stone-500 '>
										{' '}
										{getSubscriptionString(mySubs.length)}
									</p>
								</Link>
							</div>
							<Divider />
							<div className=''>
								<h1 className='text-stone-500'>
									<span className='text-stone-500 font-bold'>Ваше имя: </span>
									{userData.firstName} {userData.lastName}
								</h1>
							</div>

							<div className='mt-3'>
								{userData.aboutMe && (
									<p
										style={{ whiteSpace: 'pre-wrap' }}
										className='text-stone-500'
									>
										<span className='text-stone-500 font-bold'>Обо мне: </span>
										{userData.aboutMe}
									</p>
								)}
								<Divider />
								<div className=' text-stone-500 flex items-center'>
									<BsTelephoneFill className='mr-2 ' />
									<p>{convertToPhoneNumber(userData.phoneNumber)}</p>
								</div>
								<div className='mt-3 text-stone-500 flex items-center'>
									<MdEmail className='mr-2 w-5 h-5 ' />
									<p>{userData.email}</p>
								</div>
							</div>
							<Divider />

							<EditModal open={open} handleCloseEdit={handleCloseEdit} />
							<Link to='/chat' className='text-stone-500 hover:text-stone-700 transition-all'>
								<button
									onClick={handleOpenEdit}
									className='flex  items-center gap-2 '
								>
									<BiMessage className='translate-y-[2px] w-[25px] h-[25px]' />
									<h1>Мои сообщения</h1>
								</button>
							</Link>
							<Link to='/favorite' className='text-stone-500 hover:text-stone-700 transition-all'>
								<button
									onClick={handleOpenEdit}
									className='flex mt-4 items-center gap-2 '
								>
									<AiOutlineHeart className='w-[25px] h-[25px]' />
									<h1>Мои избранные</h1>
								</button>
							</Link>
							<div className='text-stone-500 hover:text-stone-700 transition-all'>
								<button
									onClick={handleOpenEdit}
									className='flex mt-4 items-center gap-2 '
								>
									<AiOutlineSetting className='w-[25px] h-[25px]' />
									<h1>Редактировать профиль</h1>
								</button>
							</div>
						</div>
						<div className='flex ml-14 flex-auto max-lg:w-[100%] max-lg:ml-0 max-xl:mt-10  w-[80%] flex-col'>
							<h1 className='text-3xl font-'>Мои объявления</h1>
							{userAds ? (
								<ul className='grid grid-cols-4 max-lg:grid-cols-3 max-lg:gap-2 gap-5 mt-7'>
									{userAds.map((advrt: IAdvrt) => (
										<AdvertisementItem_grid
											advrt_data={advrt}
											mini={true}
											onRemoveAdFromMyAds={RemoveAdFromMyAds}
											key={advrt.id} // Add a unique key to each item in the map function
										/>
									))}
								</ul>
							) : (
								<h1>У вас нету активных объявлений</h1>
							)}
						</div>
					</div>
				</div>
			</>
		)
	} else return null
}

export default ProfilePage
