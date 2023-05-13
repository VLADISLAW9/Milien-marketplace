import { Avatar } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IAdvrt } from '../../../../types/IAdvrt'
import { formatToCurrency } from '../../../../utils/formatToCurrency'

interface IAdvrtProps {
	advrt_data: IAdvrt
}

const AdvertisementItem_list: FC<IAdvrtProps> = ({ advrt_data: advrt }) => {
	const handleClick = () => {
		window.scrollTo(0,0)
	}

	return (
		<Link className='w-[100%] h-[100%]' onClick={handleClick} to={`/advertisement/${advrt.id}`}>
			<li className='flex p-5 shadow-xl shadow-stone-200 h-[100%] w-[100%]  cursor-pointer hover:bg-stone-200 hover:shadow-stone-300	 hover:s transition-all  rounded-2xl'>
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
						<h1 className='font-semibold text-[#166430] text-2xl line-clamp-1'>
							{advrt.title}
						</h1>
						<h2 className='text-black mt-1 text-2xl font-semibold'>
							{formatToCurrency(advrt.price)}
						</h2>
					</div>

					<p className='text-gray-400 w-[70%] text-sm line-clamp-5 font-normal'>
						{advrt.description}
					</p>
					<div>
						<h1 className='text-gray-400 text-sm font-normal'>
							{advrt.adress}
						</h1>
						<p className='text-gray-400 text-sm font-normal'>3 дня назад</p>
					</div>
				</div>
				<div className='border-l flex-auto w-[30%] pl-10 ml-10  flex flex-col'>
					<Avatar sx={{ height: 45, width: 45 }} />
					<h1 className='mt-1 text-lg'>Алексей</h1>
				</div>
			</li>
		</Link>
	)
}

export default AdvertisementItem_list
