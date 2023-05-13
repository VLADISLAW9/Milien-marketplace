import { FC } from 'react'
import AdvertisementItem_grid from '../../../app/components/ui/Advertisement/AdvertisementItem_grid'
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
				<h1>Oh no, there was an error</h1>
			) : isLoading ? (
				<h1>Loading...</h1>
			) : similar ? (
				<>
					<ul className='grid grid-cols-3'>
						{similar.map(advrt => (
							<AdvertisementItem_grid
								key={advrt.id}
								advrt_data={advrt}
								mini={true}
							/>
						))}
					</ul>
				</>
			) : null}
		</div>
	)
}

export default Similar
