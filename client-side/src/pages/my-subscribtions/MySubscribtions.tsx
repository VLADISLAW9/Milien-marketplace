import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AvatarItem from '../../app/components/ui/avatar/AvatarItem'
import Loader from '../../app/components/ui/spiner/Loader'
import { useFetching } from '../../hooks/use-fetching'
import UserService from '../../services/UserService'
import { ICustomer } from '../../types/ICustomer'

const MySubscribtions = () => {
	const [subs, setSubs] = useState<ICustomer[] | never[]>([])

	const [fetchSubs, isLoading, isError] = useFetching(async () => {
		const response = await UserService.getMyCountOfSub()
		setSubs(response.data)
	})

	useEffect(() => {
		fetchSubs()
	}, [])

	return (
		<div>
			<h1 className='mt-14 mb-5 text-3xl'>Мои подписки</h1>
			{isLoading ? (
				<div className='flex justify-center items-center mt-36'>
					<Loader />
				</div>
			) : isError ? (
				<div></div>
			) : subs.length > 0 ? (
				<ul className='grid grid-cols-6 mt-12'>
					{subs.map(sub => (
						<li>
							<Link
								className='flex flex-col items-center gap-3'
								to={`/customer/${sub.id}`}
							>
								<AvatarItem
									badgeS='15'
									fontSize='50'
									height='170'
									width='170'
									offset={[-20, 170]}
									user={sub}
								/>
								<h1 className='text-lg text-stone-600'>{sub.login}</h1>
							</Link>
						</li>
					))}
				</ul>
			) : (
				<div className='flex justify-center items-center mt-32'>
					<h1 className='text-xl text-stone-500'>У вас нет подписок</h1>
				</div>
			)}
		</div>
	)
}

export default MySubscribtions
