import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsGeoAlt } from 'react-icons/bs'
import { RxHamburgerMenu } from 'react-icons/rx'

const HeaderSearch = () => {
	return (
		<div className='flex-auto w-[70%] flex justify-center items-center'>
			<button className=' text-gray-400 hover:text-white transition-all rounded-l-3xl py-3 px-4 hover:bg-[#166430] border-gray-400 justify-center border hover:border-[#166430] flex items-center'>
				<RxHamburgerMenu className='translate-x-2 mr-2 w-6 h-6' />
			</button>
			<input
				placeholder='Поиск'
				className='border-t border-r border-b border-gray-400  py-3 px-6 outline-none w-[50%]'
				type='text'
			/>
			<button className=' text-white hover:border-[#166430]/10 hover:bg-[#166430]/80 transition-all rounded-r-3xl py-3 px-4 bg-[#166430]  border border-[#166430] flex items-center'>
				<AiOutlineSearch className=' mr-1 w-6 h-6' />
				<h1>Найти</h1>
			</button>
			{/* <button className='hover:text-[#166430] cursor-pointer ml-5 transition-all flex items-center'>
				<BsGeoAlt className='mr-1' />
				<h1>Томск</h1>
			</button> */}
		</div>
	)
}

export default HeaderSearch
