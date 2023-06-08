import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import axios from 'axios'
import { FC, useEffect, useRef, useState } from 'react'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { FaList } from 'react-icons/fa'
import AdvertisementItem_grid from '../../app/components/ui/Advertisement/AdvertisementItem_grid'
import AdvertisementItem_list from '../../app/components/ui/Advertisement/AdvertisementItem_list'
import ErrorMessage from '../../app/components/ui/error/ErrorMessage'
import Loader from '../../app/components/ui/spiner/Loader'
import { useFetching } from '../../hooks/use-fetching'
import { useObserver } from '../../hooks/use-observer'
import { IAdvrt } from '../../types/IAdvrt'
import { getPageCount, getPagesArray } from '../../utils/pages'

const HomePage: FC = () => {
	const [ads, setAds] = useState<IAdvrt[]>([])
	const [totalPages, setTotalPages] = useState(0)
	const [view, setView] = useState('grid')
	const [limit, setLimit] = useState(8)
	const [page, setPage] = useState(1)
	const lastElement = useRef<any>()
	let pagesArray = getPagesArray(totalPages)

	const [fetchAds, isAdsLoading, adsError] = useFetching(async () => {
		const response = await axios.get('http://192.168.0.160:5137/Ad/GetAll', {
			params: { limit: limit, page: page },
		})
		const totalCount = response.headers['count']
		setTotalPages(getPageCount(totalCount, limit))
		setAds([...ads, ...response.data])
	})

	useObserver(lastElement, page < totalPages, isAdsLoading, () => {
		setPage(page + 1)
	})

	useEffect(() => {
		fetchAds()
	}, [page])

	const changePage = (page: number) => {
		setPage(page)
		fetchAds()
	}

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		nextView: string
	) => {
		setView(nextView)
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
			<div ref={lastElement} className='h-[20px]'></div>
			{isAdsLoading && (
				<div className='flex justify-center items-center mt-36'>
					<Loader />
				</div>
			)}
			{adsError && (
				<div className='flex justify-center items-center mt-36'>
					<ErrorMessage />
				</div>
			)}
		</div>
	)
}

export default HomePage
