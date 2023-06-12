import { FC } from 'react'
import { categories } from '../../../../app/data/category'
import { IAdvrtData } from '../../CreateAdvrtPage'

interface ICategoryProps {
	advrtData: IAdvrtData
	setAdvrtData: (data: IAdvrtData) => void
}

const Category: FC<ICategoryProps> = ({ advrtData, setAdvrtData }) => {
	const handleCategoryClick = (category: string) => {
		setAdvrtData({ ...advrtData, category: category, subcategory: null })
	}

	const handleSubCategoryClick = (subcategory: string) => {
		setAdvrtData({ ...advrtData, subcategory: subcategory })
	}

	return (
		<div>
			<div className='py-4 border-b flex items-center text-[22px]'>
				<div className='w-26 mr-4'>
					<h1 className='font-semibold'>Выберите категорию: </h1>
				</div>
				{advrtData.category !== null && (
					<div className='flex mr-2'>
						<h1 className='text-stone-400'>{advrtData.category}</h1>
					</div>
				)}
				{advrtData.subcategory !== null && (
					<div className='flex'>
						<h1 className='text-stone-400'> {advrtData.subcategory}</h1>
					</div>
				)}
			</div>
			<div className='flex mt-5 h-[100%]'>
				<ul>
					{categories.map(category => (
						<li
							className={
								category.name === advrtData.category
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
				{advrtData.category && (
					<ul className='ml-60 max-lg:ml-10 max-lg:gap-x-3 grid  grid-rows-6 grid-flow-col gap-x-10'>
						{categories
							.find(category => category.name === advrtData.category)
							?.subcategories.map(subcategory => (
								<li
									className={
										subcategory !== advrtData.subcategory
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
