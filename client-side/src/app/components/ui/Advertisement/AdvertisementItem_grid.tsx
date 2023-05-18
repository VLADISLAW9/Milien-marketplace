import CardMedia from '@mui/material/CardMedia'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IAdvrt } from '../../../../types/IAdvrt'
import { formatToCurrency } from '../../../../utils/formatToCurrency'

interface IAdvrtProps {
	advrt_data: IAdvrt
	mini?: boolean
}

const AdvertisementItem_grid: FC<IAdvrtProps> = ({
	advrt_data: advrt,
	mini,
}) => {
	const handleClick = () => {
		window.scrollTo(0, 0)
	}

	return (
		<Link onClick={handleClick} to={`/advertisement/${advrt.id}`}>
			<li className='flex flex-col shadow-stone-200 shadow-xl  p-5 cursor-pointer hover:bg-stone-200 hover:shadow-stone-300 h-[100%] 	 transition-all  rounded-2xl'>
				<div className='flex justify-center '>
					<CardMedia
						className='rounded-2xl'
						component='img'
						sx={
							!mini
								? { height: 250, width: '100%' }
								: { height: 170, width: '100%' }
						}
						image='https://10.img.avito.st/image/1/1.JiINILa4iss7iUjOTVBfPjCCiM2zgQjDe4SIyb2JgsG7.6iMTXhfpUhbHJHa3mOOOH07SAs-GjziDqDXJPVQ1yvE'
						alt='cover'
					/>
				</div>
				<div className='mt-2'>
					<div className=''>
						<div>
							<h1
								className={
									!mini
										? 'font-semibold line-clamp-1  text-[#166430] text-xl'
										: 'font-semibold line-clamp-2  text-[#166430] text-base'
								}
							>
								{advrt.title}
							</h1>
							<h2
								className={
									!mini
										? 'text-black text-xl font-semibold mt-1'
										: 'text-black text-base font-semibold mt-1'
								}
							>
								{formatToCurrency(advrt.price)}
							</h2>
						</div>
						{!mini && (
							<p className='text-gray-400 mt-3 line-clamp-4 text-sm font-normal'>
								{advrt.description}
							</p>
						)}
						<div className={!mini ? 'mt-3' : 'mt-2'}>
							<h1 className='text-gray-400 text-sm font-normal'>
								{advrt.adress}
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
