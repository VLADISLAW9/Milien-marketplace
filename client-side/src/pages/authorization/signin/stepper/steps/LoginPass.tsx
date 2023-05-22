import React, { useState } from 'react'
import { AiFillMail, AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri'

const LoginPass = () => {
	const [login, setLogin] = useState('')
	const [pass, setPass] = useState('')
	const [repeatPass, setRepeatPass] = useState('')

	return (
		<div className='px-[50px] flex text-center flex-col mt-10'>
			<div className='flex mb-4 justify-center '>
				<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
					<AiOutlineUser className='scale-[.7] w-8 h-8 text-stone-400' />
				</div>
				<input
					className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[250px]'
					placeholder='Введите логин'
					value={login}
					required
					onChange={e => {
						setLogin(e.target.value)
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
					value={login}
					required
					onChange={e => {
						setLogin(e.target.value)
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
					value={login}
					required
					onChange={e => {
						setLogin(e.target.value)
					}}
					type='text'
				/>
			</div>
		</div>
	)
}

export default LoginPass
