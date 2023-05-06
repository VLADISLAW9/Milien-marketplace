import { FC } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsGeoAlt } from 'react-icons/bs'
import { RxHamburgerMenu } from 'react-icons/rx'
import LogIn from './buttons/LogIn'
import SingIn from './buttons/SingIn'

const Header: FC = () => {
	return (
		<div className='px-[50px] py-[20px] flex items-center'>
			<div className='flex-auto w-[15%] flex justify-start'>
				<img
					src='/logo.png'
					className='-translate-y-3 -translate-x-5 w-[300px]'
					alt='логотип'
				/>
			</div>
			<div className='flex-auto w-[70%] flex justify-center items-center'>
				<button className=' text-gray-400 hover:text-white transition-all rounded-l-3xl py-3 px-4 hover:bg-[#166430] border-gray-400 justify-center border hover:border-[#166430] flex items-center'>
					<RxHamburgerMenu className='translate-x-2 mr-2 w-6 h-6' />
				</button>
				<input
					placeholder='Поиск'
					className='border-t border-r border-b border-gray-400  py-3 px-6 outline-none w-[700px]'
					type='text'
				/>
				<button className=' text-white hover:border-[#166430]/10 hover:bg-[#166430]/80 transition-all rounded-r-3xl py-3 px-4 bg-[#166430]  border border-[#166430] flex items-center'>
					<AiOutlineSearch className=' mr-1 w-6 h-6' />
					<h1>Найти</h1>
				</button>
				<button className='hover:text-[#166430] cursor-pointer ml-5 transition-all flex items-center'>
					<BsGeoAlt className='mr-1' />
					<h1>Томск</h1>
				</button>
			</div>
			<div className='flex w-[15%] flex-auto justify-end'>
				<div className='mr-5'>
					<SingIn />
				</div>
				<LogIn />
			</div>
		</div>
	)
}

export default Header
