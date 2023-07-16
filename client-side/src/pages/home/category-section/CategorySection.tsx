const CategorySection = () => {
	const handleNavigateToCategory = (category: string) => {
		window.location.href = `/search/${category}`
	}

	return (
		<ul className='mt-12 mb-12 flex flex-col gap-3'>
			<div className='flex gap-3 '>
				<li
					onClick={() => {
						handleNavigateToCategory('Услуги')
					}}
					className=' w-[230px] cursor-pointer transition-colors hover:bg-[#ececec] overflow-hidden relative h-[100px] rounded-2xl px-5 py-2 text-[15px] bg-[#F5F5F4]'
				>
					<h1>Услуги</h1>
					<div>
						<img
							className='w-[150px] max-lg:top-7 absolute right-0 top-2 h-[150px]'
							src='/yslugi.svg'
						/>
					</div>
				</li>
				<li
					onClick={() => {
						handleNavigateToCategory('Автотехника')
					}}
					className='w-[200px] cursor-pointer transition-colors hover:bg-[#ececec]  relative overflow-hidden h-[100px] rounded-2xl px-5 py-2 text-[15px] bg-[#F5F5F4]'
				>
					<h1 className='z-30'>Автотехника</h1>
					<div>
						<img
							className='w-[150px] max-lg:top-0 z-20 absolute -right-2 -top-7 h-[150px]'
							src='/autotexnika.svg'
						/>
					</div>
				</li>
				<li
					onClick={() => {
						handleNavigateToCategory('Автотовары')
					}}
					className='w-[180px] cursor-pointer transition-colors hover:bg-[#ececec]  relative overflow-hidden  h-[100px] rounded-2xl px-5 py-2 text-[15px] bg-[#F5F5F4]'
				>
					<h1 className='z-30'>Автотовары</h1>
					<div>
						<img
							className='w-[150px] z-20 absolute -right-1 top-12 h-[150px]'
							src='/avtotovari.svg'
						/>
					</div>
				</li>
				<li
					onClick={() => {
						handleNavigateToCategory('Вакансии')
					}}
					className='w-[210px] cursor-pointer transition-colors hover:bg-[#ececec]  overflow-hidden relative h-[100px] rounded-2xl px-5 py-2 text-[15px] bg-[#F5F5F4]'
				>
					<h1 className='z-30'>Вакансии</h1>
					<div>
						<img
							className='w-[130px] max-lg:top-10 z-20 absolute right-0 top-2 h-[130px]'
							src='/vakansii.svg'
						/>
					</div>
				</li>
				<li
					onClick={() => {
						handleNavigateToCategory('Электротехника')
					}}
					className='w-[300px] cursor-pointer transition-colors hover:bg-[#ececec]  overflow-hidden relative h-[100px] rounded-2xl px-5 py-2 text-[15px] bg-[#F5F5F4]'
				>
					<h1 className='z-30'>Электротехника</h1>
					<div>
						<img
							className='w-[200px] z-20 max-lg:top-3 absolute -right-2 -top-5 h-[200px]'
							src='/electronika.svg'
						/>
					</div>
				</li>
			</div>

			<div className='flex gap-2'>
				<li
					onClick={() => {
						handleNavigateToCategory('Одежда')
					}}
					className='w-[220px] cursor-pointer transition-colors hover:bg-[#ececec]  overflow-hidden relative h-[100px] rounded-2xl px-5 py-2 text-[15px] bg-[#F5F5F4]'
				>
					<h1 className='z-30'>Одежда</h1>
					<div>
						<img
							className='w-[250px] z-20 max-lg:right-7 absolute -right-[70px] -top-5 h-[250px]'
							src='/odezda.svg'
						/>
					</div>
				</li>
				<li
					onClick={() => {
						handleNavigateToCategory('Для дома и хозяйства')
					}}
					className='w-[270px] cursor-pointer transition-colors hover:bg-[#ececec]  overflow-hidden relative h-[100px] rounded-2xl px-5 py-2 text-[15px] bg-[#F5F5F4]'
				>
					<h1 className='z-30'>
						Для дома <br /> и хозяйства
					</h1>
					<div>
						<img
							className='w-[200px] max-lg:top-3 max-lg:-right-20 max-lg:-right-0 z-20 absolute -right-10 -top-5 h-[200px]'
							src='/dom.svg'
						/>
					</div>
				</li>
				<li
					onClick={() => {
						handleNavigateToCategory('Рукоделия')
					}}
					className='w-[240px] cursor-pointer transition-colors hover:bg-[#ececec]  overflow-hidden relative h-[100px] rounded-2xl px-5 py-2 text-[15px] bg-[#F5F5F4]'
				>
					<div className='z-30'>
						<h1>Рукоделия</h1>
					</div>
					<div className='z-0'>
						<img
							className='w-[130px] max-lg:top-6  absolute right-1 top-2 h-[130px]'
							src='/rukodeliya.svg'
						/>
					</div>
				</li>
				<li
					onClick={() => {
						handleNavigateToCategory('Недвижимость')
					}}
					className='w-[300px] cursor-pointer transition-colors hover:bg-[#ececec]  overflow-hidden relative h-[100px] rounded-2xl px-5 py-2 text-[15px] bg-[#F5F5F4]'
				>
					<h1 className='z-30'>Недвижимость</h1>
					<div>
						<img
							className='w-[170px] max-lg:top-3 z-20 absolute right-1 -top-2 h-[170px]'
							src='/house.svg'
						/>
					</div>
				</li>
			</div>
		</ul>
	)
}

export default CategorySection
