import { FC, useEffect, useState } from 'react'
import { AiFillMail } from 'react-icons/ai'
import { SiLastpass } from 'react-icons/si'
import AuthService from '../../../../../services/AuthService'
import { IUserData } from '../SingInStepper'

interface IEmailAccepttProps {
	userData: IUserData
	setUserData: (data: IUserData) => void
	isSendCodeToEmail: boolean
}

const EmailAccept: FC<IEmailAccepttProps> = ({
	isSendCodeToEmail,
	userData,
	setUserData,
}) => {
	const emailPlaceholder = 'example@mail.ru'
	const [countdown, setCountdown] = useState(30)
	const [loadingCode, setLoadingCode] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (countdown > 0) {
			interval = setInterval(() => {
				setCountdown(prevCountdown => prevCountdown - 1)
			}, 1000)
		} else {
			clearInterval(interval!)
		}

		return () => {
			clearInterval(interval!)
		}
	}, [countdown])

	const handleSendEmailCode = async () => {
		try {
			setLoadingCode(true)
			const response = await AuthService.sendEmailCode(userData.login)
			setCountdown(30) // Reset the countdown to 30 seconds
			console.log('код отправлен')
		} catch (e: any) {
			setError(e.response.data)
		} finally {
			setLoadingCode(false)
		}
	}

	return (
		<div className='px-[50px] flex justify-center items-center  flex-col text-center mt-10'>
			{isSendCodeToEmail && (
				<div className='flex mb-10'>
					<h1 className='text-stone-500'>
						На вашу почту{' '}
						<span className='font-semibold'>{userData.email}</span> отправелeно
						письмо с кодом
					</h1>
				</div>
			)}

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
					onKeyPress={e => {
						if (e.key === ' ') {
							e.preventDefault()
						}
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
			{isSendCodeToEmail && (
				<>
					<div className='flex mb-4'>
						<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
							<SiLastpass className='scale-[.6] w-8 h-8 text-stone-400' />
						</div>
						<input
							className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[250px]'
							placeholder='Введите код с почты'
							value={userData.emailCode}
							required
							onChange={e => {
								const valueWithoutSpaces = e.target.value.replace(/\s/g, '')
								setUserData({ ...userData, emailCode: valueWithoutSpaces })
							}}
							type='text'
						/>
					</div>
					<button
						className={
							countdown > 0
								? 'text-sm mt-2 text-start text-stone-300'
								: 'text-sm mt-2 text-start text-stone-500'
						}
						onClick={handleSendEmailCode}
						disabled={countdown > 0} // Disable the button when already sent or countdown is running
					>
						{loadingCode
							? 'Загрузка...'
							: countdown > 0
							? `Отправить код еще раз через ${countdown} сек`
							: 'Отправить код еще раз'}
					</button>
				</>
			)}
		</div>
	)
}

export default EmailAccept
