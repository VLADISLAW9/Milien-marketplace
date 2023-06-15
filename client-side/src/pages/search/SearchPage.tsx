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
import { getPageCount, getPagesArray } from '../../utils/pages'

const SearchPage: FC = () => {
	const params = useParams()
	const navigate = useNavigate()
	const [totalPages, setTotalPages] = useState(0)
	const [limit, setLimit] = useState(16)
	const [page, setPage] = useState(1)
	const [minPrice, setMinPrice] = useState<null | number>(null)
	const [maxPrice, setMaxPrice] = useState<null | number>(null)
	const { isShow, ref, setIsShow } = useOutside(false)
	const [foundAds, setFoundAds] = useState<IAdvrt[] | null>(null)
	const [view, setView] = useState('grid')
	const [currentCat, setCurrentCat] = useState<string | null>(null)
	const [currentSub, setCurrentSub] = useState<string | null>(null)
	let pagesArray = getPagesArray(totalPages)
	const [filtration, filtrationLoading, filtrationError] = useFetching(
		async () => {
			const filter = await axios.get(
				'https://api.xn--h1agbg8e4a.xn--p1ai/Ad/Filtration',
				{
					params: {
						limit: limit,
						page: page,
						category: currentCat,
						subcategory: currentSub,
						min: minPrice,
						max: maxPrice,
					},
				}
			)
			setFoundAds([...filter.data])
			const totalCount = filter.headers['count']
			setTotalPages(getPageCount(totalCount, limit))
		}
	)
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
			setTotalPages(getPageCount(totalCount, limit))
		}
	)

	const handleChangeView = (
		event: React.MouseEvent<HTMLElement>,
		nextView: string
	) => {
		setView(nextView)
	}

	useEffect(() => {
		searchingAds()
	}, [page])

	const changePage = (page: number) => {
		setPage(page)
		window.scrollTo(0, 0)
	}

	const handleFilter = () => {
		if (minPrice || maxPrice || currentCat || currentSub) {
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
			<div className='flex mt-7'>
				<div ref={ref} className='flex-initial max-lg:hidden w-[30%] '>
					<h1 className='text-2xl mb-3'>Категории</h1>
					<ul className='ml-5' ref={ref}>
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
						<h1 className='text-2xl'>Цена</h1>
						<div className='flex mt-3 gap-5 ml-5'>
							<input
								type='number'
								value={minPrice ? minPrice : ''}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setMinPrice(Number(e.target.value))
								}}
								className='placeholder:text-lg border-stone-400 outline-none border-b px-3 py-2 text-lg w-[150px]'
								placeholder='от'
							/>
							<input
								value={maxPrice ? maxPrice : ''}
								type='number'
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setMaxPrice(Number(e.target.value))
								}}
								className='w-[150px] border-stone-400 border-b px-3 py-2 outline-none text-lg placeholder:text-lg'
								placeholder='до, в рублях'
							/>
						</div>
					</div>
					<div className='flex justify-center mt-28'>
						<button
							onClick={handleFilter}
							className='text-white text-xl bg-[#166430] px-6 rounded-3xl py-2 h-[50px] w-[150px]'
						>
							Найти
						</button>
					</div>
				</div>
				<div className='flex-initial justify-center max-lg:w-[100%] w-[70%]'>
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
									: ' grid grid-cols-3 max-lg:grid-cols-2 max-lg:gap-3 gap-5 '
								}
							>
								{foundAds.map(advrt =>
									view === 'list' ? (
										<AdvertisementItem_list key={advrt.id} advrt_data={advrt} />
									) : (
										<AdvertisementItem_grid key={advrt.id} advrt_data={advrt} />
									)
								)}
							</ul>
						)
					)}
					<ul className='mt-5 flex justify-center'>
						{pagesArray.map(p => (
							<li
								onClick={() => changePage(p)}
								className={
									page !== p
										? 'text-xl cursor-pointer mr-3 w-8 h-8 rounded-full flex justify-center items-center  text-white bg-[#166340]'
										: 'text-xl border-[#166430] border mr-3 w-8 h-8 rounded-full flex justify-center items-center  text-[#166430] bg-white'
								}
							>
								{p}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default SearchPage
