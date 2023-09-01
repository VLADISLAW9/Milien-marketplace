import { message } from 'antd'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { BiPhoneCall } from 'react-icons/bi'
import { BsArrowDown, BsPass } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useFetching } from '../../../hooks/use-fetching'
import AuthService from '../../../services/AuthService'
import { formatPhoneNumber } from '../../../utils/formatPhoneNumber'
import { reformatPhoneNumber } from '../../../utils/reformatPhoneNumber'

interface LoginPayload {
	login: string
	password: string
}

const LogInPage: FC = () => {
	const [phoneValue, setPhoneValue] = useState('')
	const [messageApi, contextHolder] = message.useMessage()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [isPasswordValid, setPasswordValid] = useState(true)
	const [isSendCode, setIsSend] = useState(false)
	const [isResendButtonDisabled, setResendButtonDisabled] = useState(false)
	const [resendTimer, setResendTimer] = useState(0)
	const [isTrueCode, setIsTrueCode] = useState(false)
	const [alertMessage, setAlertMessage] = useState<string | null>(null)
	const [codeValue, setCodeValue] = useState('')
	const [newPass, setNewPass] = useState('')
	const [requestId, setRequestId] = useState(null)
	const [repeatNewPass, setRepeatNewPass] = useState('')
	const [resetPass, resetPassLoading, resetPassError] = useFetching(
		async () => {
			if (isTrueCode) {
				const reset = await axios.put(
					'https://api.xn--h1agbg8e4a.xn--p1ai/api/Auth/create_new_password',
					null,
					{
						params: {
							password: newPass,
							email: reformatPhoneNumber(phoneValue),
						},
					}
				)
				if (reset.status === 200) {
					window.location.href = '/login'
				}
			}
		}
	)
	const [sendler, sendlerLoading, sendlerError] = useFetching(async () => {
		const sendCode: any = await axios.put(
			'https://api.xn--h1agbg8e4a.xn--p1ai/api/Auth/reset_password',
			null,
			{
				params: {
					email: reformatPhoneNumber(phoneValue),
				},
			}
		)
		if (sendCode.status === 200) {
			setIsSend(true)
			console.log(sendCode.data)
			setRequestId(sendCode.data.request_id)
			setAlertMessage(
				'На ваш телефон отправлено СМС с ссылкой, перейдите по ней для подтверждения номера'
			)
			// Блокируем кнопку и начинаем отсчет времени
			setResendButtonDisabled(true)
			setResendTimer(90) // 90 секунд

			// Запускаем таймер для разблокировки кнопки
			const timerInterval = setInterval(() => {
				setResendTimer(prevTimer => prevTimer - 1)
			}, 1000)

			// Через 90 секунд разблокируем кнопку и остановим таймер
			setTimeout(() => {
				setResendButtonDisabled(false)
				clearInterval(timerInterval)
			}, 90000) // 90 секунд
		}
	})

	const cheakPhoneAuth = async () => {
		if (requestId) {
			try {
				const response = await AuthService.cheakAuthMobilePhone(requestId)
				if (response.data.result_type === 1) {
					setIsTrueCode(true)
				}
			} catch (error) {
				console.log(error)
			}
		}
	}

	useEffect(() => {
		if (isSendCode) {
			const intervalId = setInterval(() => {
				cheakPhoneAuth()
			}, 5000) // Interval in milliseconds (5 seconds)

			// Clear the interval when the component unmounts
			return () => {
				clearInterval(intervalId)
			}
		}
	}, [isSendCode])

	return (
		<div className='p-10 shadow-2xl shadow-stone-300 bg-white rounded-xl'>
			{contextHolder}
			<Link to='/' className='flex justify-center items-center'>
				<img src='/logo.png' className='w-[200px]' alt='логотип' />
			</Link>
			<div className='flex flex-col mt-10'>
				{!isTrueCode && (
					<>
						<div className='flex mb-4'>
							<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
								<BiPhoneCall className='scale-[.8] w-8 h-8 text-stone-400' />
							</div>
							<input
								className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[320px]'
								placeholder='Введите ваш номер телефона'
								value={phoneValue}
								onKeyPress={e => {
									if (e.key === ' ') {
										e.preventDefault()
									}
								}}
								required
								onChange={e => {
									setPhoneValue(formatPhoneNumber(e.target.value))
								}}
								type='text'
							/>
						</div>
						{alertMessage && (
							<div className='relative py-5'>
								<div className='absolute opacity-60 rounded-full p-5 bg-stone-200 text-white top-2 right-20'>
									<AiOutlineMail className='w-12 h-12' />
								</div>
								<h1 className='max-w-[360px] text-[15px] text-stone-700'>
									{alertMessage}
								</h1>
								<div className='flex justify-center'>
									<button
										onClick={() => sendler()}
										disabled={isResendButtonDisabled}
										className={
											isResendButtonDisabled
												? 'text-white mt-10 bg-[#166434]/70 px-6 py-3 rounded-md'
												: 'text-white mt-10 bg-[#166434] px-6 py-3 rounded-md'
										}
									>
										{isResendButtonDisabled ? (
											<>Отправить код еще раз через {resendTimer} секунд</>
										) : (
											<>Отправить код еще раз</>
										)}
									</button>
								</div>
							</div>
						)}
					</>
				)}

				{isTrueCode && (
					<>
						<div className='flex mb-4'>
							<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
								<BsPass className='scale-[.8] w-8 h-8 text-stone-400' />
							</div>
							<input
								className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[300px]'
								placeholder='Введите новый пароль'
								value={newPass}
								onKeyPress={e => {
									if (e.key === ' ') {
										e.preventDefault()
									}
								}}
								required
								onChange={e => {
									setNewPass(e.target.value)
									setPasswordValid(true) // Сбросить состояние проверки при изменении пароля
								}}
								pattern='(?=.*\d)(?=.*[A-Z]).{8,}' // Проверка на требования
							/>
						</div>
						<div className='flex mb-4'>
							<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
								<BsPass className='scale-[.8] w-8 h-8 text-stone-400' />
							</div>
							<input
								className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[300px]'
								placeholder='Подтвердите новый пароль'
								onKeyPress={e => {
									if (e.key === ' ') {
										e.preventDefault()
									}
								}}
								value={repeatNewPass}
								required
								onChange={e => {
									setRepeatNewPass(e.target.value)
								}}
								type='text'
							/>
						</div>
					</>
				)}

				{errorMessage && (
					<h1 className='text-red-500 max-w-[256px] text-base  flex justify-start'>
						{errorMessage}
					</h1>
				)}
				{!isSendCode && (
					<button
						onClick={() => sendler()}
						disabled={phoneValue.length === 0 || sendlerLoading}
						className={
							phoneValue.length > 0
								? 'text-white mt-10 bg-[#166434] px-6 py-3 rounded-md'
								: 'text-white mt-10 bg-[#166434]/70 px-6 py-3 rounded-md'
						}
					>
						{sendlerLoading ? <>Загрузка...</> : <>Подтвердить номер</>}
					</button>
				)}
				{isTrueCode && (
					<button
						onClick={() => {
							// Проверка на требования к паролю
							const passwordRegex = /(?=.*\d)(?=.*[A-Z]).{8,}/
							if (!passwordRegex.test(newPass)) {
								setErrorMessage(
									'Пароль должен состоять минимум из 8 символов, содержать минимум одну заглавную букву и минимум одну цифру.'
								)
								return
							}

							// Удаление всех пробелов
							const formattedNewPass = newPass.replace(/\s/g, '')

							if (formattedNewPass !== repeatNewPass) {
								setErrorMessage('Пароли не совпадают')
								return
							}

							resetPass()
						}}
						disabled={
							newPass.length === 0 ||
							repeatNewPass.length === 0 ||
							resetPassLoading
						}
						className={
							phoneValue.length > 0
								? 'text-white mt-10 bg-[#166434] px-6 py-3 rounded-md'
								: 'text-white mt-10 bg-[#166434]/70 px-6 py-3 rounded-md'
						}
					>
						{resetPassLoading ? <>Загрузка...</> : <>Сменить пароль</>}
					</button>
				)}
			</div>

			<div className='flex mt-7 text-[13px] justify-center'>
				<h1 className='mr-2 text-stone-400 font-light'>Нет аккаунта? </h1>
				<Link
					to='/signin'
					className='hover:text-stone-400 transition-all font-medium flex items-center'
				>
					<h1 className='mr-[2px]'>Регистрация</h1>
					<BsArrowDown className='-rotate-90' />
				</Link>
			</div>
			<div className='flex mt-3 text-[13px] justify-center'>
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
