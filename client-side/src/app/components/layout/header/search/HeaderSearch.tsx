import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../../../../hooks/use-actions'
import { useFetching } from '../../../../../hooks/use-fetching'
import { useOutside } from '../../../../../hooks/use-outside'
import { categories } from '../../../../data/category'

const HeaderSearch = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const [isShowSearchRes, setIsShowSearchRes] = useState(false)
	const [isShowMore, setIsShowMore] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const [searchArray, setSearchArray] = useState<any[] | null>(null)

	const navigate = useNavigate()
	const [selectCategory, setSelectCategory] = useState<string | null>()
	const { setIsBlur } = useActions()
	const [fetchSearchResult, searchLoading, searchError] = useFetching(
		async () => {
			const response = await axios.get('http://37.140.199.105:5000/Ad/Search', {
				params: { query: searchValue },
			})
			setSearchArray([...response.data.categories, ...response.data.ads])
		}
	)

	const randomIndexCat = useMemo(
		() => Math.floor(Math.random() * (categories.length - 3)),
		[isShow]
	)

	const randomIndexSub = useMemo(
		() => Math.floor(Math.random() * (categories.length - 3)),
		[isShow]
	)

	useEffect(() => {
		setIsBlur(isShow)
	}, [isShow])

	useEffect(() => {
		fetchSearchResult()
		if (searchValue.length === 0) {
			setSearchArray([])
		}
	}, [searchValue])

	const handleSearch = (e: any) => {
		setSearchValue(e.target.value)
	}

	const handleCategoryClick = (category: string) => {
		setSelectCategory(category)
	}

	const handleNavigate = (value: string) => {
		if (value.length > 0) {
			navigate(`/search/${value}`)
			setSearchValue('')
			setIsShow(false)
			window.location.reload()
		}
	}

	return (
		<div
			className='flex-auto w-[80%] max-2xl:w-[60%] max-xl:w-[30%]  relative flex justify-center items-center max'
			ref={ref}
		>
			{isShow && isShowMore && (
				<div className='absolute w-[67.5%] top-[50px]'>
					<div className='flex bg-white border-gray-400 border-l 	border-r border-t border-b p-5 rounded-b-3xl '>
						<ul className='w-[22%]'>
							{categories.map(category => (
								<li
									className={
										category.name === selectCategory
											? 'mb-3	text-lg border-b-2 border-[#166430]   cursor-pointer font-medium'
											: 'mb-3	text-lg hover:text-stone-500 transition-colors border-b-2 border-[#fff] cursor-pointer font-medium'
									}
									key={category.name}
									onClick={() => handleCategoryClick(category.name)}
								>
									{category.name}
								</li>
							))}
						</ul>
						{selectCategory && (
							<ul className='ml-10 grid grid-rows-6 grid-flow-col gap-x-10'>
								{categories
									.find(category => category.name === selectCategory)
									?.subcategories.map(subcategory => (
										<li
											onClick={() => handleNavigate(subcategory)}
											className='mb-3 text-black transition-colors cursor-pointer text-lg '
											key={subcategory}
										>
											{subcategory}
										</li>
									))}
							</ul>
						)}
					</div>
				</div>
			)}
			<button
				onClick={() => {
					setIsShow(true)
					setIsShowMore(true)
					setIsShowSearchRes(false)
				}}
				className={
					isShowMore && isShow
						? 'relative text-white transition-all rounded-tl-3xl py-3 px-4 bg-[#166430] justify-center border-t border-l border-b border-[#166430] flex items-center'
						: 'relative text-gray-400 hover:text-white transition-all rounded-l-3xl py-3 px-4 hover:bg-[#166430] border-gray-400 justify-center border-t border-l border-b hover:border-[#166430] flex items-center'
				}
			>
				<RxHamburgerMenu className='translate-x-2 mr-2 w-6 h-6' />
			</button>
			<div className='relative w-[50%]'>
				<input
					onClick={() => {
						setIsShow(true)
						setIsShowSearchRes(true)
						setIsShowMore(false)
					}}
					// onBlur={() => {
					// 	setIsShowSearchRes(false)
					// }}
					value={searchValue}
					onChange={handleSearch}
					placeholder='Поиск'
					className='border-t border-r border-l border-b border-gray-400  py-3 w-[100%] px-6 outline-none '
					type='text'
				/>

				{isShow && isShowSearchRes && (
					<div className='absolute top-[49px]  border-gray-400 border-b w-[100%] border-l border-r bg-white pb-5 rounded-b-3xl'>
						{searchArray && searchArray.length > 0 ? (
							<ul>
								{searchArray.map(i => (
									<li
										onClick={() => {
											if (i.title) {
												handleNavigate(i.title)
											} else {
												handleNavigate(i)
											}
										}}
										className='py-3 cursor-pointer px-6 hover:bg-stone-300'
									>
										{i.title ? (
											i.title
										) : (
											<h1 className='font-[600] flex items-center gap-2'>
												<BiCategory />
												{i}
											</h1>
										)}
									</li>
								))}
							</ul>
						) : searchValue.length > 0 ? (
							<ul>
								<li className='cursor-pointer py-3 px-6 hover:bg-stone-300'>
									{searchValue}
								</li>
							</ul>
						) : (
							searchValue.length === 0 && (
								<ul>
									{categories
										.slice(randomIndexCat, randomIndexCat + 3)
										.slice(0, 2)
										.map(cat => (
											<li
												onClick={() => handleNavigate(cat.name)}
												className='py-3 cursor-pointer px-6 hover:bg-stone-300 flex gap-2 items-center font-[600]'
											>
												<BiCategory />
												{cat.name}
											</li>
										))}
									{categories.slice(0, 2).map(cat =>
										cat.subcategories
											.slice(randomIndexSub, randomIndexSub + 3)
											.slice(0, 2)
											.map(sub => (
												<li
													onClick={() => handleNavigate(sub)}
													className='py-3 cursor-pointer font-[600] px-6 hover:bg-stone-300 flex gap-2 items-center'
												>
													<BiCategory />
													{sub}
												</li>
											))
									)}
								</ul>
							)
						)}
					</div>
				)}
			</div>

			<button
				onClick={() => {
					setIsShow(false)
					handleNavigate(searchValue)
				}}
				className={
					isShowMore && isShow
						? 'text-white hover:border-[#166430]/10 hover:bg-[#166430]/80 transition-all rounded-tr-3xl py-3 px-4 bg-[#166430]  border border-[#166430] flex items-center'
						: 'text-white hover:border-[#166430]/10 hover:bg-[#166430]/80 transition-all rounded-r-3xl py-3 px-4 bg-[#166430]  border border-[#166430] flex items-center'
				}
			>
				<AiOutlineSearch className=' mr-1 w-6 h-6' />
				<h1>Найти</h1>
			</button>
		</div>
	)
}

export default HeaderSearch