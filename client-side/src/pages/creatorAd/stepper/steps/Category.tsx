import { useState } from 'react'
import { categories } from '../../../../app/data/category'

const Category = () => {
	const [selectedCategory, setSelectedCategory] = useState('')
	const [subSelectedCategory, setSubSelectedCategory] = useState('')

	const handleCategoryClick = (category: string) => {
		setSelectedCategory(category)
		setSubSelectedCategory('')
	}

	const handleSubCategoryClick = (subcategory: string) => {
		setSubSelectedCategory(subcategory)
	}

	return (
		<div>
			<div className='py-4 border-b flex items-center text-[22px]'>
				<div className='w-26 mr-4'>
					<h1 className='font-semibold'>Выберите категорию: </h1>
				</div>
				{selectedCategory !== '' && (
					<div className='flex'>
						<h1 className='text-stone-400'>{selectedCategory}</h1>
					</div>
				)}
				{subSelectedCategory !== '' && (
					<div className='flex'>
						<h1 className='text-stone-400'>, {subSelectedCategory}</h1>
					</div>
				)}
			</div>
			<div className='flex mt-5 h-[100%]'>
				<ul>
					{categories.map(category => (
						<li
							className={
								category.name === selectedCategory
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
				{selectedCategory && (
					<ul className='ml-60 grid grid-rows-6 grid-flow-col gap-x-10'>
						{categories
							.find(category => category.name === selectedCategory)
							?.subcategories.map(subcategory => (
								<li
									className={
										subcategory !== subSelectedCategory
											? 'mb-3 hover:text-black transition-colors cursor-pointer   text-lg font-normal text-stone-500'
											: 'mb-3 text-black transition-colors cursor-pointer  text-lg '
									}
									key={subcategory}
									onClick={() => handleSubCategoryClick(subcategory)}
								>
									{subcategory}
								</li>
							))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default Category
