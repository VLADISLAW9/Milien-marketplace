import { FC } from 'react'
import { BsArrowDown } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import SingInStepper from './stepper/SingInStepper'

const LogInPage: FC = () => {
	return (
		<div className='p-10 shadow-2xl shadow-stone-300 bg-white rounded-xl'>
			<Link to='/' className='flex mb-10 justify-center items-center'>
				<img src='/logo.png' className='w-[200px]' alt='логотип' />
			</Link>
			<SingInStepper />
			<div className='flex mt-7 text-[13px] justify-center'>
				<h1 className='mr-2 text-stone-400 font-light'>
					Уже зарегистрированы?{' '}
				</h1>
				<Link
					to='/login'
					className='hover:text-stone-400 transition-all font-medium flex items-center'
				>
					<h1 className='mr-[2px]'>Войти</h1>
					<BsArrowDown className='-rotate-90' />
				</Link>
			</div>
		</div>
	)
}

export default LogInPage
