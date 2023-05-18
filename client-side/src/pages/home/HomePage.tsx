import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { FC, useState } from 'react'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { FaList } from 'react-icons/fa'
import AdvertisementItem_grid from '../../app/components/ui/Advertisement/AdvertisementItem_grid'
import AdvertisementItem_list from '../../app/components/ui/Advertisement/AdvertisementItem_list'
import ErrorMessage from '../../app/components/ui/error/ErrorMessage'
import Loader from '../../app/components/ui/spiner/Loader'
import { useGetAllAdvrtsQuery } from '../../services/AdvrtsService'

const HomePage: FC = () => {
	const [limit, setLimit] = useState(8)
	const [page, setPage] = useState(1)

	const {
		data: dataAdvrts,
		error: errorAdvrts,
		isLoading: isLoadingAdvrts,
	} = useGetAllAdvrtsQuery({ limit, page })

	const [view, setView] = useState('grid')
	// const [sort, setSort] = useState('default')

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
			{errorAdvrts ? (
				<div className='mt-36'>
					<ErrorMessage />
				</div>
			) : isLoadingAdvrts ? (
				<div className='flex justify-center items-center mt-36'>
					<Loader />
				</div>
			) : dataAdvrts ? (
				<>
					<ul
						className={
							view === 'list'
								? 'mt-12 flex flex-col justify-center items-center gap-5'
								: 'mt-12 grid grid-cols-4 gap-5 '
						}
					>
						{dataAdvrts.map(advrt =>
							view === 'list' ? (
								<AdvertisementItem_list key={advrt.id} advrt_data={advrt} />
							) : (
								<AdvertisementItem_grid key={advrt.id} advrt_data={advrt} />
							)
						)}
					</ul>
				</>
			) : null}
		</div>
	)
}

export default HomePage
