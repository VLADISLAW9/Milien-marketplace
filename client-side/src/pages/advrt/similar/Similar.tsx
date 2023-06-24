import { FC } from 'react'
import AdvertisementItem_grid from '../../../app/components/ui/Advertisement/AdvertisementItem_grid'
import ErrorMessage from '../../../app/components/ui/error/ErrorMessage'
import Loader from '../../../app/components/ui/spiner/Loader'
import { IAdvrt } from '../../../types/IAdvrt'

interface ISimilatProps {
	isLoading: boolean
	isError: boolean
	similar?: IAdvrt[]
}

const Similar: FC<ISimilatProps> = ({ isLoading, isError, similar }) => {
	return (
		<div className='mt-9'>
			<h1 className='text-2xl font-semibold mb-4'>Похожие объявления</h1>
			{isError ? (
				<div className='flex justify-center items-center mt-10'>
					<ErrorMessage />
				</div>
			) : isLoading ? (
				<div className='flex justify-center items-center mt-10'>
					<Loader />
				</div>
			) : similar ? (
				<>
					<ul className='grid grid-cols-3 gap-5'>
						{similar.map(advrt => (
							<AdvertisementItem_grid
								key={advrt.id}
								advrt_data={advrt}
								mini={true}
							/>
						))}
					</ul>
					{similar.length === 0 && (
						<div className='flex  mt-10 justify-center items-center'>
							<h1 className='text-2xl text-stone-400 '>
								Нет похожих объявлений
							</h1>
						</div>
					)}
				</>
			) : null}
		</div>
	)
}

export default Similar
