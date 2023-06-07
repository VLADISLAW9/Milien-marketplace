import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { FC, useEffect, useState } from 'react'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { FaList } from 'react-icons/fa'
import AdvertisementItem_grid from '../../app/components/ui/Advertisement/AdvertisementItem_grid'
import AdvertisementItem_list from '../../app/components/ui/Advertisement/AdvertisementItem_list'
import ErrorMessage from '../../app/components/ui/error/ErrorMessage'
import Loader from '../../app/components/ui/spiner/Loader'
import { useGetAllAdvrtsQuery } from '../../services/AdvrtsService'
import axios from 'axios'
import { IAdvrt } from '../../types/IAdvrt'

const HomePage: FC = () => {
	const [ads, setAds] = useState<IAdvrt[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [view, setView] = useState('grid')
	const [limit, setLimit] = useState(4)
	const [page, setPage] = useState(1)
	const [fetching, setFetching] = useState(true)

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		nextView: string
	) => {
		setView(nextView)
	}

	useEffect(() => {
		if (fetching) setIsLoading(true)
		axios
			.get('http://192.168.0.160:5137/Ad/GetAll', {
				params: { limit: limit, page: page },
			})
			.then(res => {
				setAds([...ads, ...res.data])
				setPage(prevState => prevState + 1)
			})
			.finally(() => {
				setFetching(false)
				setIsLoading(false)
			})
	}, [fetching])

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)

		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, [])

	const scrollHandler = (e: any) => {
		if (
			e.target.documentElement.scrollHeight -
				(e.target.documentElement.scrollTop + window.innerHeight) <
			100
		) {
			setFetching(true)
		}
	}

	return (
		<div>
			<h1 className='mt-14 mb-5 text-3xl'>Все объявления</h1>
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
				{ads.map(advrt =>
					view === 'list' ? (
						<AdvertisementItem_list key={advrt.id} advrt_data={advrt} />
					) : (
						<AdvertisementItem_grid key={advrt.id} advrt_data={advrt} />
					)
				)}
			</ul>
			{isLoading && (
				<div className='flex justify-center items-center mt-36'>
					<Loader />
				</div>
			)}
		</div>
	)
}

export default HomePage
