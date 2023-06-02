import { Avatar } from '@mui/material'
import { BsTelephoneFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import AdvertisementItem_grid from '../../app/components/ui/Advertisement/AdvertisementItem_grid'
import Loader from '../../app/components/ui/spiner/Loader'
import { useTypedSelector } from '../../hooks/use-typed-selector'

const ProfilePage = () => {
	const { user, isLoadingAuth, userAds } = useTypedSelector(state => state.user)

	console.log(Object.keys(user).length === 0, 'is lenght')

	if (isLoadingAuth && Object.keys(user).length === 0) {
		return (
			<div className='flex justify-center items-center mt-44'>
				<Loader />
			</div>
		)
	} else {
		return (
			<div className=''>
				<div className='mt-14 flex'>
					<div className='flex flex-auto w-[25%] flex-col'>
						<Avatar sx={{ width: 150, height: 150 }} />
						<div className='flex mt-10 text-3xl text-center items-center'>
							<h1>{user.login}</h1>
						</div>
						<div className='mt-2'>
							<h1 className='text-stone-400'>
								{user.firstName} {user.lastName}
							</h1>
						</div>
						<div className='mt-3'>
							<p>
								<span className='text-stone-500 font-bold'>Обо мне: </span>
								Вообще у меня бизнес свой, а продаю эти дырявые старые вещи,
								потому что моя бабка сдохла и это все некому отдать, и вообще
								купите зайбли
							</p>
							<div className='mt-5 text-stone-500 flex items-center'>
								<BsTelephoneFill className='mr-2 ' />
								<p>{user.phoneNumber}</p>
							</div>
							<div className='mt-3 text-stone-500 flex items-center'>
								<MdEmail className='mr-2 w-5 h-5 ' />
								<p>{user.email}</p>
							</div>
						</div>

						<div className='mt-10 text-center'>
							<button className='bg-[#F9CBA4] rounded-md text-[#F17E1B] hover:opacity-80 transition-opacity w-[100%] px-4 py-3'>
								Редактировать
							</button>
						</div>
					</div>
					<div className='flex ml-14 flex-auto w-[80%] flex-col'>
						<h1 className='text-3xl font-'>Мои объявления</h1>
						{userAds ? (
							<ul className='grid grid-cols-4 gap-5 mt-7'>
								{userAds.map(advrt => (
									<AdvertisementItem_grid advrt_data={advrt} mini={true} />
								))}
							</ul>
						) : (
							<h1>У вас нету активных объявлений</h1>
						)}
					</div>
				</div>
			</div>
		)
	}
}

export default ProfilePage
