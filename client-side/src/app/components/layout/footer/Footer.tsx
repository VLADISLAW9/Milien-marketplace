import { FC } from 'react'
import { Link } from 'react-router-dom'

const Footer: FC = () => {
	return (
		<div className='border-t text-stone-400 max-lg:px-[25px] px-[50px] py-[20px] bg-white flex items-center justify-between'>
			<div className='w-[33%] flex  justify-start'>
				<Link to={'/user-acception'}>Пользовательское соглашение</Link>
			</div>
			<div className='w-[33%] max-lg:w-[50%] flex justify-center'>
				<h1>
					Тех. поддержка и обратная связь - <span className='text-stone-500 font-semibold'>rumilien@gmail.com</span>
				</h1>
			</div>
			<div className='w-[33%] flex justify-end'>
				<h1>© «Мильен» 2023.</h1>
			</div>
		</div>
	)
}

export default Footer
