import React, { FC } from 'react'
import { IAdvrt } from '../../../../types/IAdvrt'
import CardMedia from '@mui/material/CardMedia'
import { formatToCurrency } from '../../../../utils/formatToCurrency'
import { Link } from 'react-router-dom'

interface IAdvrtProps {
	advrt_data: IAdvrt
}

const AdvertisementItem_grid: FC<IAdvrtProps> = ({ advrt_data: advrt }) => {
	return (
		<Link to={`/advertisement/${advrt.id}`}>
			<li className='flex flex-col h-[100%] w-[100%] p-6 cursor-pointer hover:bg-slate-100 transition-all  rounded-2xl'>
				<div className='flex '>
					<CardMedia
						className='rounded-2xl'
						component='img'
						sx={{ height: 250, width: '100%' }}
						image='https://10.img.avito.st/image/1/1.JiINILa4iss7iUjOTVBfPjCCiM2zgQjDe4SIyb2JgsG7.6iMTXhfpUhbHJHa3mOOOH07SAs-GjziDqDXJPVQ1yvE'
						alt='cover'
					/>
				</div>
				<div className='mt-2'>
					<div className=''>
						<div>
							<h1 className='font-semibold line-clamp-2  text-[#166430] text-xl'>
								{advrt.title}
							</h1>
							<h2 className='text-black text-xl font-semibold'>
								{formatToCurrency(10000)}
							</h2>
						</div>

						<p className='text-gray-400 mt-3 line-clamp-4 text-sm font-normal'>
							{advrt.body}
						</p>
						<div className='mt-3'>
							<h1 className='text-gray-400 text-sm font-normal'>
								Томск, р-н Кировский
							</h1>
							<p className='text-gray-400 text-sm font-normal'>3 дня назад</p>
						</div>
					</div>
				</div>
			</li>
		</Link>
	)
}

export default AdvertisementItem_grid
