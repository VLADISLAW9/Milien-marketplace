import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { FaList } from 'react-icons/fa'
import AdvertisementItem_grid from '../../app/components/ui/Advertisement/AdvertisementItem_grid'
import AdvertisementItem_list from '../../app/components/ui/Advertisement/AdvertisementItem_list'
import FavoriteAdvrtService from '../../services/FavouriteAdvrtService'
import { IAdvrt } from '../../types/IAdvrt'

const FavoritePage: FC = () => {
	const [view, setView] = useState('grid')
	const [isLoading, setIsLoading] = useState(false)
	const [fav, setFav] = useState<IAdvrt[]>([])

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		nextView: string
	) => {
		setView(nextView)
	}

	useEffect(() => {
		try {
			const fetchData = async () => {
				setIsLoading(true)
				const getAd = await FavoriteAdvrtService.GetFavorite()
				setFav(getAd.data)
			}
			fetchData() // Add this line to invoke the fetch function
		} catch (e) {
			console.log(e)
		} finally {
			setIsLoading(false)
		}
	}, [])

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
			<ul
				className={
					view === 'list'
						? 'mt-12 flex flex-col justify-center items-center gap-5'
						: 'mt-12 grid grid-cols-4 gap-5 '
				}
			>
				{fav.length > 0 ? (
					fav.map(advrt =>
						view === 'list' ? (
							<AdvertisementItem_list key={advrt.id} advrt_data={advrt} />
						) : (
							<AdvertisementItem_grid key={advrt.id} advrt_data={advrt} />
						)
					)
				) : (
					<h1>Нет избранных</h1>
				)}
			</ul>
		</div>
	)
}

export default FavoritePage
