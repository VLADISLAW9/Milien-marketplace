import { FC } from 'react'
import { Link } from 'react-router-dom'

const Footer: FC = () => {
	return (
		<div className='border-t mt-20 text-stone-400 px-[50px] py-[20px] flex items-center justify-between'>
			<div className='w-[33%] flex  justify-start'>
				<Link to={'/user-acception'}>Пользовательское соглашение</Link>
			</div>
			<div className='w-[33%] flex justify-center'>
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
