import { Pagination } from 'antd'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdvertisementItem_grid from '../../app/components/ui/Advertisement/AdvertisementItem_grid'
import AdvertisementItem_list from '../../app/components/ui/Advertisement/AdvertisementItem_list'
import Loader from '../../app/components/ui/spiner/Loader'
import { categories } from '../../app/data/category'
import { useFetching } from '../../hooks/use-fetching'
import { useOutside } from '../../hooks/use-outside'
import { IAdvrt } from '../../types/IAdvrt'
import { getPageCount } from '../../utils/pages'

const SearchPage: FC = () => {
	const params = useParams()
	const navigate = useNavigate()
	const [totalPages, setTotalPages] = useState(0)
	const [limit, setLimit] = useState(40)
	const [page, setPage] = useState(1)
	const [minPrice, setMinPrice] = useState<null | number>(null)
	const [maxPrice, setMaxPrice] = useState<null | number>(null)
	const [townValue, setTownValue] = useState<null | string>(null)
	const { isShow, ref, setIsShow } = useOutside(false)
	const [foundAds, setFoundAds] = useState<IAdvrt[] | null>(null)
	const [view, setView] = useState('grid')
	const [currentCat, setCurrentCat] = useState<string | null>(null)
	const [currentSub, setCurrentSub] = useState<string | null>(null)

	const [filtration, filtrationLoading, filtrationError] = useFetching(
		async () => {
			// Find the category object in the categories array that matches the currentCat or currentSub
			const categoryObject = categories.find(
				(cat) => cat.name === currentCat || cat.name === currentSub
			);
	
			const filter = await axios.get(
				'https://api.xn--h1agbg8e4a.xn--p1ai/Ad/Filtration',
				{
					params: {
						// Set the title parameter to null if categoryObject is found, else use params.param
						tittle: categoryObject ? null : params.param,
						limit: limit,
						page: page,
						category: categoryObject ? currentCat : params.param,
						subcategory:categoryObject ? currentSub : params.param ,
						town: townValue || null,
						min: minPrice || null,
						max: maxPrice || null,
					},
				}
			);
	
			setFoundAds([...filter.data]);
			const totalCount = filter.headers['count'];
			setTotalPages(getPageCount(totalCount, limit));
		}
	);
	const [searchingAds, searchingLoading, searchingError] = useFetching(
		async () => {
			const response = await axios.get(
				'https://api.xn--h1agbg8e4a.xn--p1ai/Ad/SearchByQuery',
				{
					params: { query: params.param, page: page, limit: limit },
				}
			)
			setFoundAds([...response.data])
			const totalCount = response.headers['count']
			console.log(totalCount, 'is total ads', limit, 'is limit')
			setTotalPages(getPageCount(totalCount, limit))
		}
	)

	useEffect(() => {
		searchingAds()
	}, [page, true])

	const changePage = (page: number) => {
		setPage(page)
		const root = document.getElementById('root')
		if (root) {
			root.scrollTo(0, 0)
		}
	}

	const handleFilter = () => {
		if (minPrice || maxPrice || currentCat || currentSub || townValue) {
			filtration()
			// setMinPrice(null)
			// setMaxPrice(null)
			// setCurrentCat(null)
			// setCurrentSub(null)
		} else {
			searchingAds()
		}
		const newParams = {
			param:
				currentCat && currentSub
					? currentSub
					: currentCat
					? currentCat
					: params.param,
		}
		navigate(`/search/${newParams.param}`)
	}

	return (
		<div className='mt-14 text-3xl'>
			<h1>
				Объявления по запросу «
				{currentCat && currentSub ? (
					<>
						{currentCat}, {currentSub}
					</>
				) : currentCat ? (
					<>{currentCat}</>
				) : (
					params.param
				)}
				»{' '}
			</h1>
			<div className='flex max-lg:flex-col mt-7'>
				<div className='hidden max-lg:block'>
					<h1 className='text-2xl mb-5'>Город</h1>
					<input
						value={townValue ? townValue : ''}
						type='text'
						onChange={e => {
							setTownValue(e.target.value)
						}}
						placeholder='Введите город '
						className='border-2 outline-none rounded-xl text-base px-4 py-2'
					/>
					<div className=' mt-8 mb-10	'>
						<button
							onClick={handleFilter}
							className='text-white text-xl bg-[#166430] px-6 rounded-3xl py-2 h-[50px] w-[150px]'
						>
							Найти
						</button>
					</div>
				</div>
				<div className='flex-initial max-lg:hidden w-[30%] '>
					<h1 className='text-xl mb-5'>Город</h1>
					<input
						value={townValue ? townValue : ''}
						type='text'
						onChange={e => {
							setTownValue(e.target.value)
						}}
						placeholder='Введите город '
						className='border-2 outline-none rounded-xl text-base px-3 py-1'
					/>
					<h1 className='text-xl mt-8 mb-3'>Категории</h1>
					<ul ref={ref} className='ml-5'>
						{categories.map(cat => (
							<>
								<li
									onClick={() => {
										setIsShow(true)
										setCurrentSub(null)
										setCurrentCat(currentCat === cat.name ? null : cat.name)
									}}
									className={
										cat.name === currentCat
											? 'text-base  mt-2  w-[200px] font-semibold cursor-pointer'
											: 'text-base hover:text-stone-400 transition-colors w-[200px]  mt-2 cursor-pointer'
									}
								>
									{cat.name}
								</li>
								{isShow && currentCat && currentCat === cat.name && (
									<ul
										className={
											cat.subcategories.length > 8
												? 'ml-5 grid grid-rows-4 grid-cols-2'
												: 'ml-5 '
										}
									>
										{cat.subcategories.map(sub => (
											<li
												onClick={() => {
													setIsShow(true)
													setCurrentSub(
														isShow && currentSub === sub ? null : sub
													)
												}}
												className={
													currentSub === sub
														? 'text font-semibold cursor-pointer w-[150px] text-xs mt-2'
														: 'cursor-pointer w-[150px] text-xs mt-2'
												}
											>
												{sub}
											</li>
										))}
									</ul>
								)}
							</>
						))}
					</ul>
					<div className='mt-12'>
						<h1 className='text-xl'>Цена</h1>
						<div className='flex mt-3 gap-5'>
							<input
								type='number'
								value={minPrice ? minPrice : ''}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setMinPrice(Number(e.target.value))
								}}
								className='placeholder:text-base border-stone-400 outline-none border-b px-3 py-1 text-base w-[150px]'
								placeholder='от'
							/>
							<input
								value={maxPrice ? maxPrice : ''}
								type='number'
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setMaxPrice(Number(e.target.value))
								}}
								className='w-[150px] border-stone-400 border-b px-3 py-1 outline-none text-base placeholder:text-base'
								placeholder='до, в рублях'
							/>
						</div>
					</div>
					<div className='flex justify-center mt-12	'>
						<button
							onClick={handleFilter}
							className='text-white flex justify-center items-center text-lg bg-[#166430] px-4 rounded-3xl py-2 h-[45px] w-[150px]'
						>
							Найти
						</button>
					</div>
				</div>
				<div className='flex-initial justify-center max-lg:w-[100%] w-[75%]'>
					{searchingLoading ? (
						<div className='flex justify-center items-center mt-24'>
							<Loader />
						</div>
					) : searchingError ? (
						<div></div>
					) : foundAds && foundAds.length === 0 ? (
						<div className=''>
							<h1 className='text-2xl mt-28 text-center text-stone-400'>
								Ничего не найдено
							</h1>
						</div>
					) : (
						foundAds &&
						foundAds.length > 0 && (
							<ul
								className={
									view === 'list'
										? ' flex flex-col justify-center items-center gap-5'
										: ' grid grid-cols-4 max-lg:grid-cols-2 max-lg:gap-3 gap-5 '
								}
							>
								{foundAds.map(advrt =>
									view === 'list' ? (
										<AdvertisementItem_list key={advrt.id} advrt_data={advrt} />
									) : (
										<AdvertisementItem_grid mini={true} key={advrt.id} advrt_data={advrt} />
									)
								)}
							</ul>
						)
					)}
					{totalPages > 1 && (
						<Pagination
							className='mt-10 flex justify-center'
							onChange={changePage}
							current={page}
							total={totalPages * 10}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default SearchPage
