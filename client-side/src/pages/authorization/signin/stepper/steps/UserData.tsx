import { FC, useState } from 'react'
import { formatPhoneNumber } from '../../../../../utils/formatPhoneNumber'
import { IUserData } from '../SingInStepper'

interface IUserDataProps {
	userData: IUserData
	setUserData: (data: IUserData) => void
}

const UserData: FC<IUserDataProps> = ({ setUserData, userData }) => {
	const [phone, setPhone] = useState('')
	const phoneNumberPlaceholder = '+7 (000) 000-00-00'

	return (
		<div className='px-[50px] flex text-center flex-col mt-10'>
			<div className='flex mb-4 justify-center '>
				<input
					className='px-4 py-4  placeholder:text-stone-400 outline-none bg-stone-100 rounded-md w-[310px]'
					placeholder='Введите ваше имя'
					value={userData.firstName}
					required
					onChange={e => {
						setUserData({ ...userData, firstName: e.target.value })
					}}
					type='text'
				/>
			</div>
			<div className='flex mb-4 justify-center '>
				<input
					className='px-4 py-4 placeholder:text-stone-400 outline-none bg-stone-100 rounded-md w-[310px]'
					placeholder='Введите вашу фамилию'
					value={userData.lastName}
					required
					onChange={e => {
						setUserData({ ...userData, lastName: e.target.value })
					}}
					type='text'
				/>
			</div>
			<div className='flex mb-4 justify-center '>
				<input
					className='px-4 py-4 placeholder:text-stone-400 outline-none bg-stone-100 rounded-md w-[310px]'
					placeholder={'Введите ваш номер телефона'}
					value={userData.phoneNumber}
					required
					onChange={e => {
						setUserData({
							...userData,
							phoneNumber: formatPhoneNumber(e.target.value),
						})
					}}
					onFocus={e => {
						e.target.placeholder = phoneNumberPlaceholder
					}}
					onBlur={e => {
						e.target.placeholder = 'Введите ваш номер телефона'
					}}
					type='text'
				/>
			</div>
		</div>
	)
}

export default UserData
