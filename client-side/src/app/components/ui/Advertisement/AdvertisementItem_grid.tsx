import { CardMedia, Checkbox } from '@mui/material'
import { Carousel } from 'antd'
import { FC, useContext, useEffect, useState } from 'react'
import { MdFavoriteBorder, MdOutlineNoPhotography } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../../context/UserContext'
import { useTypedSelector } from '../../../../hooks/use-typed-selector'
import FavoriteAdvrtService from '../../../../services/FavouriteAdvrtService'
import { IAdvrt } from '../../../../types/IAdvrt'
import { formatToCurrency } from '../../../../utils/formatToCurrency'

interface IAdvrtProps {
	advrt_data: IAdvrt
	mini?: boolean
	onRemoveAdFromFav?: (id: number) => void
}
const AdvertisementItem_grid: FC<IAdvrtProps> = ({
	advrt_data: advrt,
	mini,
	onRemoveAdFromFav,
}) => {
	const handleClick = () => {
		window.scrollTo(0, 0)
	}
	const [isHover, setIsHover] = useState(false)
	const [isFav, setIsFav] = useState(false)
	const { isAuth } = useTypedSelector(state => state.user)
	const { userData, isUserLoading } = useContext(UserContext)

	const handleCheckboxChange = async () => {
		if (!isFav) {
			setIsFav(true)
			try {
				const addToFav = await FavoriteAdvrtService.AddToFavourite(advrt.id)
			} catch (e: any) {
				console.log(e.response)
			}
		} else {
			try {
				setIsFav(false)
				const removeFromFav = await FavoriteAdvrtService.RemoveFromFavourite(
					advrt.id
				)
				if (onRemoveAdFromFav) {
					const handleRemoveFromFav = () => {
						onRemoveAdFromFav(advrt.id)
					}
					handleRemoveFromFav()
				}
			} catch (e: any) {
				console.log(e.response)
			}
		}
	}

	useEffect(() => {
		if (isAuth) {
			try {
				const fetchData = async () => {
					const isFav: any = await FavoriteAdvrtService.CheckIsFavourite(
						advrt.id
					)
					setIsFav(isFav.data)
				}
				fetchData() // Add this line to invoke the fetch function
			} catch (e) {
				console.log(e)
			}
		}
	}, [])

	return (
		<div
			onMouseEnter={() => {
				setIsHover(true)
			}}
			onMouseLeave={() => {
				setIsHover(false)
			}}
			className='relative'
		>
			<div className='absolute z-50 bottom-5 right-5'>
				{isHover && isAuth && userData && advrt.customerId !== userData.id && (
					<Checkbox
						checked={isFav}
						onChange={handleCheckboxChange}
						color='default'
						icon={<MdFavoriteBorder className='text w-6 h-6' />}
						checkedIcon={<MdFavoriteBorder className='w-6 h-6' />}
						sx={{
							color: '#A8A29E',
							'&.Mui-checked': {
								color: 'red',
							},
						}}
					/>
				)}
			</div>
			<li
				className={
					advrt.premium
						? 'flex flex-col justify-between shadow-stone-200 shadow-xl  p-5 bg-gradient-to-r from-[#166430] via-[#168430] to-[#FEED00] relative	  hover:shadow-stone-300 h-[100%]	 transition-all  rounded-2xl'
						: isHover
						? 'flex flex-col relative justify-between  shadow-stone-200 shadow-xl  p-5 bg-stone-200 shadow-stone-300 h-[100%]  transition-all  rounded-2xl'
						: 'flex flex-col relative justify-between  shadow-stone-200 shadow-xl  p-5 hover:bg-stone-200 hover:shadow-stone-300 h-[100%] 	 transition-all  rounded-2xl'
				}
			>
				<Link
					onClick={handleClick}
					to={`/advertisement/${advrt.id}`}
					className='flex justify-center'
				>
					{advrt.photoPath.length > 0 ? (
						advrt.premium && !mini ? (
							<div className='w-[100%]  rounded-2xl'>
								<Carousel
									style={{ borderRadius: '16px' }}
									dots={false}
									className='h-[250px] rounded-2xl'
									autoplay
								>
									{advrt.photoPath.map((img, index) => (
										<CardMedia
											className='rounded-2xl'
											component='img'
											sx={{
												height: 250,
												width: '100%',
											}}
											image={img}
											alt='cover'
										/>
									))}
								</Carousel>
							</div>
						) : (
							<CardMedia
								className='rounded-2xl'
								component='img'
								sx={{
									height: !mini ? 250 : 170,
									width: '100%',
								}}
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
				</Link>
				<div className='mt-2 h-[50%]'>
					<div className=''>
						<div>
							<Link
								to={`/advertisement/${advrt.id}`}
								onClick={handleClick}
								className={
									!mini
										? advrt.premium
											? 'font-semibold line-clamp-1  text-stone-200  text-xl'
											: 'font-semibold line-clamp-1 text-xl  text-[#166430] text-base'
										: advrt.premium
										? 'font-semibold line-clamp-1  text-white text-base'
										: 'font-semibold line-clamp-1  text-[#166430] text-base'
								}
							>
								{advrt.title}
							</Link>
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
											? 'text-stone-200   text-sm line-clamp-2	 font-normal'
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
		</div>
	)
}

export default AdvertisementItem_grid
