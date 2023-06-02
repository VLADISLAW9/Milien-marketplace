import CardMedia from '@mui/material/CardMedia'
import { Carousel } from 'antd'
import { FC } from 'react'
import { MdOutlineNoPhotography } from 'react-icons/md'
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
			<li
				className={
					advrt.premium
						? 'flex flex-col justify-between shadow-stone-200 shadow-xl  p-5 cursor-pointer bg-gradient-to-r from-[#166430] via-[#168430] to-[#FEED00]	  hover:shadow-stone-300 h-[100%] 	 transition-all  rounded-2xl'
						: 'flex flex-col justify-between  shadow-stone-200 shadow-xl  p-5 cursor-pointer hover:bg-stone-200 hover:shadow-stone-300 h-[100%] 	 transition-all  rounded-2xl'
				}
			>
				<div className='flex justify-center'>
					{advrt.photoPath.length > 0 ? (
						advrt.premium && !mini ? (
							<Carousel dots={false} className='w-[297px] h-[250px]' autoplay>
								{advrt.photoPath.map(img => (
									<div className='flex justify-center'>
										<CardMedia
											className='rounded-2xl'
											component='img'
											sx={
												!mini
													? { height: 250, width: '100%' }
													: { height: 170, width: '100%' }
											}
											image={img}
											alt='cover'
										/>
									</div>
								))}
							</Carousel>
						) : (
							<CardMedia
								className='rounded-2xl'
								component='img'
								sx={
									!mini
										? { height: 250, width: '100%' }
										: { height: 170, width: '100%' }
								}
								image={advrt.photoPath[0]}
								alt='cover'
							/>
						)
					) : (
						<div
							className={
								!mini
									? 'bg-stone-100 rounded-2xl flex justify-center items-center w-[100%] h-[250px]'
									: 'rounded-2xl flex justify-center items-center w-[100%] h-[170px]'
							}
						>
							<MdOutlineNoPhotography className='text-stone-300 w-20 h-20' />
						</div>
					)}
				</div>
				<div className='mt-2 h-[50%]'>
					<div className=''>
						<div>
							<h1
								className={
									!mini
										? advrt.premium
											? 'font-semibold line-clamp-1  text-stone-200  text-xl'
											: 'font-semibold line-clamp-1  text-[#166430] text-base'
										: advrt.premium
										? 'font-semibold line-clamp-1  text-white text-base'
										: 'font-semibold line-clamp-1  text-[#166430] text-base'
								}
							>
								{advrt.title}
							</h1>
							<div>
								<h2
									className={
										!mini
											? advrt.premium
												? 'text-stone-200 rounded-2xl text-xl font-semibold mt-1 line-clamp-1'
												: 'text-black text-xl font-semibold mt-1 line-clamp-'
											: advrt.premium
											? 'text-white text-base font-semibold mt-1 line-clamp-'
											: 'text-black text-base font-semibold mt-1 line-clamp-'
									}
								>
									{formatToCurrency(advrt.price)}
								</h2>
							</div>
						</div>
						{!mini && (
							<div className='h-[62px]'>
								<p
									className={
										advrt.premium
											? 'text-stone-200  mt-3 line-clamp-3 text-sm font-normal'
											: 'text-gray-400 mt-3 line-clamp-3 text-sm font-normal'
									}
								>
									{advrt.description}
								</p>
							</div>
						)}
						<div className={!mini ? 'mt-3' : 'mt-2'}>
							<h1
								className={
									advrt.premium
										? mini
											? 'text-stone-200   text-sm line-clamp-2 font-normal'
											: 'text-stone-200   text-sm line-clamp-1 font-normal'
										: mini
										? 'text-gray-400 line-clamp-2 text-sm font-normal'
										: 'text-gray-400 line-clamp-1 text-sm font-normal'
								}
							>
								{advrt.adress}
							</h1>
							<p
								className={
									advrt.premium
										? 'text-stone-200 mt-3 text-sm font-normal'
										: 'text-gray-400 mt-3 text-sm font-normal'
								}
							>
								3 дня назад
							</p>
						</div>
					</div>
				</div>
			</li>
		</Link>
	)
}

export default AdvertisementItem_grid
