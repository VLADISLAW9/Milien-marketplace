import React, { FC } from 'react'
import { IAdvrt } from '../../../../types/IAdvrt'
import CardMedia from '@mui/material/CardMedia'
import { formatToCurrency } from '../../../../utils/formatToCurrency'
import { Avatar } from '@mui/material'

interface IAdvrtProps {
	advrt_data: IAdvrt
}

const AdvertisementItem_list: FC<IAdvrtProps> = ({ advrt_data: advrt }) => {
	return (
		<li className='flex px-6 pt-6 h-[100%] w-[100%] pb-10 cursor-pointer hover:bg-slate-100 transition-all  rounded-2xl'>
			<div className='flex-auto w-[30%] flex justify-start'>
				<CardMedia
					className='rounded-2xl'
					component='img'
					sx={{ height: 200, width: 270 }}
					image='https://10.img.avito.st/image/1/1.JiINILa4iss7iUjOTVBfPjCCiM2zgQjDe4SIyb2JgsG7.6iMTXhfpUhbHJHa3mOOOH07SAs-GjziDqDXJPVQ1yvE'
					alt='cover'
				/>
			</div>
			<div className='flex-auto w-[70%] flex flex-col justify-between justify-start'>
				<div>
					<h1 className='font-semibold text-[#166430] text-2xl'>
						{advrt.title}
					</h1>
					<h2 className='text-black text-2xl font-semibold'>
						{formatToCurrency(10000)}
					</h2>
				</div>

				<p className='text-gray-400 text-sm line-clamp-5 font-normal'>
					{advrt.body}
				</p>
				<div>
					<h1 className='text-gray-400 text-sm font-normal'>
						Томск, р-н Кировский
					</h1>
					<p className='text-gray-400 text-sm font-normal'>3 дня назад</p>
				</div>
			</div>
			<div className='border-l flex-auto w-[30%] pl-10 ml-10  flex flex-col'>
				<Avatar sx={{ height: 45, width: 45 }} />
				<h1 className='mt-1 text-lg'>Алексей</h1>
			</div>
		</li>
	)
}

export default AdvertisementItem_list
