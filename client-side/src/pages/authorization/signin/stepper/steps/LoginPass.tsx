import { FC, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri'
import { IUserData } from '../SingInStepper'

interface ILoginPassProps {
	userData: IUserData
	setUserData: (data: IUserData) => void
}

const LoginPass: FC<ILoginPassProps> = ({ userData, setUserData }) => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	return (
		<form className='px-[50px] flex text-center flex-col mt-10'>
			<div className='flex mb-4 justify-center '>
				<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
					<AiOutlineUser className='scale-[.7] w-8 h-8 text-stone-400' />
				</div>
				<input
					className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[250px]'
					placeholder='Введите логин'
					value={userData.login}
					required
					onChange={e => {
						const valueWithoutSpaces = e.target.value.replace(/\s/g, '')
						setUserData({ ...userData, login: valueWithoutSpaces })
					}}
					type='text'
				/>
			</div>
			<div className='flex mb-4 justify-center '>
				<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
					<RiLockPasswordLine className='scale-[.6] w-8 h-8 text-stone-400' />
				</div>
				<input
					className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[250px]'
					placeholder='Придумайте пароль'
					value={userData.pass}
					required
					onChange={e => {
						const valueWithoutSpaces = e.target.value.replace(/\s/g, '')
						setUserData({ ...userData, pass: valueWithoutSpaces })
					}}
					type='text'
				/>
			</div>
			<div className='flex mb-4 justify-center '>
				<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
					<RiLockPasswordFill className='scale-[.6] w-8 h-8 text-stone-400' />
				</div>
				<input
					className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[250px]'
					placeholder='Повторите пароль'
					value={userData.repeatPass}
					required
					onChange={e => {
						const valueWithoutSpaces = e.target.value.replace(/\s/g, '')
						setUserData({ ...userData, repeatPass: valueWithoutSpaces })
					}}
					type='text'
				/>
			</div>
			<div className='flex justify-center'>
				<h1 className='text-sm text-red-500 w-[300px]'>{errorMessage}</h1>
			</div>
		</form>
	)
}

export default LoginPass
