import { FC } from 'react'
import { AiFillMail } from 'react-icons/ai'
import { IUserData } from '../SingInStepper'

interface IEmailAccepttProps {
	userData: IUserData
	setUserData: (data: IUserData) => void
}

const EmailAccept: FC<IEmailAccepttProps> = ({ userData, setUserData }) => {
	const emailPlaceholder = 'example@mail.ru'

	return (
		<div className='px-[50px] flex text-center mt-10'>
			<div className='flex mb-4'>
				<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
					<AiFillMail className='scale-[.6] w-8 h-8 text-stone-400' />
				</div>
				<input
					className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[250px]'
					placeholder='Введите ваш e-mail'
					value={userData.email}
					required
					onChange={e => {
						setUserData({ ...userData, email: e.target.value })
					}}
					type='email'
					onFocus={e => {
						e.target.placeholder = emailPlaceholder
					}}
					onBlur={e => {
						e.target.placeholder = 'Введите ваш e-mail'
					}}
				/>
			</div>
		</div>
	)
}

export default EmailAccept
