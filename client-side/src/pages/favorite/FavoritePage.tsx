import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { FaList } from 'react-icons/fa'
import AdvertisementItem_grid from '../../app/components/ui/Advertisement/AdvertisementItem_grid'
import AdvertisementItem_list from '../../app/components/ui/Advertisement/AdvertisementItem_list'
import Loader from '../../app/components/ui/spiner/Loader'
import { useFetching } from '../../hooks/use-fetching'
import FavoriteAdvrtService from '../../services/FavouriteAdvrtService'
import { IAdvrt } from '../../types/IAdvrt'

const FavoritePage: FC = () => {
	const [view, setView] = useState('grid')
	const [fav, setFav] = useState<IAdvrt[]>([])
	const [fetchFav, isLoading, favError] = useFetching(async () => {
		const response = await FavoriteAdvrtService.GetFavorite()
		setFav([...fav, ...response.data])
	})

	useEffect(() => {
		fetchFav()
	}, [])

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		nextView: string
	) => {
		setView(nextView)
	}

	const RemoveAdFromFav = (id: number) => {
		setFav(prevFav => prevFav.filter(item => item.id !== id))
	}

	return (
		<div>
			<h1 className='mt-14 mb-5 text-3xl'>Мои избранные</h1>
			<ToggleButtonGroup
				orientation='horizontal'
				value={view}
				exclusive
				onChange={handleChange}
			>
				<ToggleButton value='list' aria-label='list'>
					<FaList className='w-6 h-5 ' />
				</ToggleButton>
				<ToggleButton value='grid' aria-label='grid'>
					<BsFillGrid3X3GapFill className='w-6 h-5' />
				</ToggleButton>
			</ToggleButtonGroup>
			{isLoading && (
				<div className='flex justify-center items-center mt-36'>
					<Loader />
				</div>
			)}
			<ul
				className={
					view === 'list'
						? 'mt-12 flex flex-col justify-center items-center gap-5'
						: 'mt-12 grid grid-cols-4 gap-5 '
				}
			>
				{fav.length > 0 &&
					fav.map(advrt =>
						view === 'list' ? (
							<AdvertisementItem_list key={advrt.id} advrt_data={advrt} />
						) : (
							<AdvertisementItem_grid
								key={advrt.id}
								advrt_data={advrt}
								onRemoveAdFromFav={RemoveAdFromFav}
							/>
						)
					)}
			</ul>
			{!isLoading && fav.length === 0 && (
				<div className='flex justify-center items-center mt-32'>
					<h1 className='text-xl text-stone-500'>У вас нет объявлений в избранном</h1>
				</div>
			)}
		</div>
	)
}

export default FavoritePage
