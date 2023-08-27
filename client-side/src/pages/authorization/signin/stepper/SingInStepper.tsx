import { Step, StepLabel, Stepper } from '@mui/material'
import StepConnector, {
	stepConnectorClasses,
} from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import { styled } from '@mui/material/styles'
import { Dispatch, unwrapResult } from '@reduxjs/toolkit'
import axios from 'axios'
import { FC, useState } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { IoMdKeypad } from 'react-icons/io'
import { MdCheck, MdOutlineNavigateNext } from 'react-icons/md'
import { RiUserSettingsLine } from 'react-icons/ri'
import { TbSend } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../../../services/AuthService'

import {
	checkCodeEmail,
	checkEmail,
	checkLogin,
	checkPhone,
	sendCodeToEmail,
} from '../../../../store/slices/userSlice'
import { reformatPhoneNumber } from '../../../../utils/reformatPhoneNumber'
import EmailAccept from './steps/EmailAccept'
import LoginPass from './steps/LoginPass'
import UserData from './steps/UserData'

export interface IUserData {
	login: string
	pass: string
	repeatPass: string
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	role: ['user']

	emailCode: string
}

const SingInStepper: FC = () => {
	const ColorlibConnector = styled(StepConnector)(({ theme, ...props }) => ({
		[`&.${stepConnectorClasses.alternativeLabel}`]: {
			top: 22,
		},
		[`&.${stepConnectorClasses.active}`]: {
			[`& .${stepConnectorClasses.line}`]: {
				backgroundImage:
					activeStep === steps.length - 2
						? 'linear-gradient( 95deg,#165830 0%,#166430 50%,#FEED00 100%)'
						: 'linear-gradient( 95deg,#165830 0%,#166430 50%,#FEED00 100%)',
			},
		},
		[`&.${stepConnectorClasses.completed}`]: {
			[`& .${stepConnectorClasses.line}`]: {
				backgroundImage:
					activeStep === steps.length - 1
						? 'linear-gradient( 95deg,#165830 0%,#166430 50%,#FEED00 100%)'
						: 'linear-gradient( 95deg,#165830 0%,#166430 50%,#FEED00 100%)',
			},
		},
		[`& .${stepConnectorClasses.line}`]: {
			height: 3,
			border: 0,
			backgroundColor:
				theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
			borderRadius: 1,
			...(activeStep === steps.length - 1 && {
				backgroundImage:
					'linear-gradient( 95deg,#FEED00 0%,#166430 50%,#16530 100%)',
			}),
		},
	}))

	const ColorlibStepIconRoot = styled('div')<{
		ownerState: { completed?: boolean; active?: boolean }
	}>(({ theme, ownerState }) => ({
		backgroundColor:
			theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
		zIndex: 1,
		color: '#fff',
		width: 50,
		height: 50,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		...(ownerState.active && {
			backgroundImage:
				'linear-gradient( 136deg, #166430 0%, #166430 50%, #FEED00 100%)',
			boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
		}),
		...(ownerState.completed && {
			backgroundImage:
				'linear-gradient( 136deg, #166430 0%, #166430 50%, #FEED00 100%)',
		}),
	}))

	function ColorlibStepIcon(props: StepIconProps) {
		const { active, completed, className } = props

		const icons: { [index: string]: React.ReactElement } = {
			1: <IoMdKeypad />,
			2: <RiUserSettingsLine />,
			3: <AiOutlineMail />,
		}

		return (
			<ColorlibStepIconRoot
				ownerState={{ completed, active }}
				className={className}
			>
				{icons[String(props.icon)]}
			</ColorlibStepIconRoot>
		)
	}

	const steps = ['Логин и пароль', 'Личные данные', 'E-mail']

	const dispatch = useDispatch<Dispatch<any>>()
	const [activeStep, setActiveStep] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [isSendCodeToEmail, setIsSendCodeToEmail] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const navigate = useNavigate()

	const [userData, setUserData] = useState({
		login: '',
		pass: '',
		repeatPass: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		email: '',
		role: ['user'],
		emailCode: '',
	} as IUserData)

	const handleNextUserData = async () => {
		setErrorMessage(null)
		if (
			userData.firstName !== '' &&
			userData.lastName !== '' &&
			userData.phoneNumber !== ''
		) {
			try {
				setIsLoading(true)
				const sendMessage = await AuthService.sendMessageToMobilePhone()
				const result = await dispatch(
					checkPhone(reformatPhoneNumber(userData.phoneNumber))
				)
				const unwrappedResult = unwrapResult<any>(result)

				if (unwrappedResult) {
					setActiveStep(prevActiveStep => prevActiveStep + 1)
					setErrorMessage(null)
				} else {
					setErrorMessage(
						'Пользователь с данным номером телефона уже существует'
					)
				}
			} catch (error: any) {
				console.log('Error checking login:', error)
				setErrorMessage('Произошла ошибка при проверке логина')
			} finally {
				setIsLoading(false)
			}
		} else {
			setErrorMessage('Пожалуйста заполните все поля')
		}
	}

	const acceptCodeFromEmail = async () => {
		setErrorMessage(null)
		if (userData.emailCode !== '') {
			try {
				const resultCode = await dispatch(
					checkCodeEmail({ login: userData.login, code: userData.emailCode })
				)
				const unwrappedResult = unwrapResult<any>(resultCode)

				if (unwrappedResult) {
					setErrorMessage(null)
					window.location.href = '/login'
				}
			} catch (e: any) {
				setErrorMessage('Неверный код подтверждения')
			} finally {
				setIsLoading(false)
			}
		} else {
			setErrorMessage('Пожалуйста заполните поле для ввода кода')
		}
	}

	const handleNextEmail = async () => {
		setErrorMessage(null)
		if (userData.email !== '') {
			try {
				setIsLoading(true)
				const result = await dispatch(checkEmail(userData.email))
				const unwrappedResult = unwrapResult<any>(result)
				if (unwrappedResult) {
					try {
						setErrorMessage(null)
						const resultEmail = await dispatch(
							sendCodeToEmail({
								login: userData.login.replace(/\s/g, ''),
								pass: userData.pass.replace(/\s/g, ''),
								email: userData.email.replace(/\s/g, ''),
								firstName: userData.firstName,
								lastName: userData.lastName,
								phoneNumber: reformatPhoneNumber(userData.phoneNumber),
							})
						)
						const unwrappedResultEmail = unwrapResult<any>(resultEmail)
						if (unwrappedResultEmail) {
							setIsSendCodeToEmail(true)
						}
					} catch (error: any) {
						console.error('Error checking send code:', error)
						setErrorMessage('Произошла ошибка при отправке письма почты')
					}
				} else {
					setErrorMessage('Данная почта уже зарегистрирована, введите другую')
				}
			} catch (error: any) {
				console.error('Error checking email:', error)
				setErrorMessage('Произошла ошибка при проверке почты')
			} finally {
				setIsLoading(false)
			}
		} else {
			setErrorMessage('Пожалуйста заполните поле')
		}
	}

	const handleNextLogin = async () => {
		setErrorMessage(null)
		if (
			userData.login !== '' &&
			userData.pass !== '' &&
			userData.repeatPass !== ''
		) {
			// Проверка на соответствие требованиям к паролю
			const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
			if (!passwordRegex.test(userData.pass)) {
				setErrorMessage(
					'Пароль должен состоять минимум из 8 символов, содержать минимум одну заглавную букву и минимум одну цифру'
				)
				return
			}

			if (userData.pass === userData.repeatPass) {
				try {
					setIsLoading(true)
					const result = await dispatch(checkLogin(userData.login))
					const unwrappedResult = unwrapResult<any>(result)

					if (unwrappedResult) {
						setActiveStep(prevActiveStep => prevActiveStep + 1)
						setErrorMessage(null)
					} else {
						setErrorMessage(
							'Данный логин уже занят, пожалуйста придумайте другой'
						)
					}
				} catch (error: any) {
					console.error('Error checking login:', error)
					setErrorMessage('Произошла ошибка при проверке логина')
				} finally {
					setIsLoading(false)
				}
			} else {
				setErrorMessage('Пароли не совпадают')
			}
		} else {
			setErrorMessage('Пожалуйста заполните все поля')
		}
	}

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	return (
		<div>
			<Stepper
				className='w-[650px]'
				alternativeLabel
				activeStep={activeStep}
				connector={<ColorlibConnector />}
			>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
					</Step>
				))}
			</Stepper>

			<div className='flex justify-center items-center h-[250px]'>
				{activeStep === 0 && (
					<LoginPass setUserData={setUserData} userData={userData} />
				)}
				{activeStep === 1 && (
					<UserData setUserData={setUserData} userData={userData} />
				)}
				{activeStep === 2 && (
					<EmailAccept
						isSendCodeToEmail={isSendCodeToEmail}
						setUserData={setUserData}
						userData={userData}
					/>
				)}
			</div>

			{errorMessage && (
				<div className='flex justify-center'>
					<h1 className='text-sm text-red-500 w-[300px]'>{errorMessage}</h1>
				</div>
			)}

			<div className='grid grid-cols-3 mt-10'>
				<div className='flex justify-center'>
					{activeStep !== 0 && (
						<button
							onClick={handleBack}
							className='text-white hover:opacity-80 transition-opacity rounded-full bg-[#166434]'
						>
							<MdOutlineNavigateNext className='rotate-180 w-[50px] h-[50px]' />
						</button>
					)}
				</div>
				<div className='flex justify-center'>
					{activeStep === steps.length - 1 ? (
						<button
							onClick={() => {
								if (!isSendCodeToEmail) {
									handleNextEmail()
								} else {
									acceptCodeFromEmail()
								}
							}}
							disabled={isLoading}
							className={
								!isLoading
									? 'flex gap-2 h-[50px] px-5 text-white rounded-3xl hover:opacity-80 transition-opacity w-[200px] justify-center py-[25px] bg items-center bg-gradient-to-r from-[#166430] via-[#168430] to-[#FEED00]'
									: 'flex gap-2 h-[50px] px-5 text-white rounded-3xl opacity-80 transition-opacity w-[200px] justify-center py-[25px] bg items-center bg-gradient-to-r from-[#166430] via-[#168430] to-[#FEED00]'
							}
						>
							<h1>
								{isLoading
									? 'Загрузка...'
									: isSendCodeToEmail
									? 'Подтвердить код'
									: 'Отправить код'}
							</h1>
							{!isLoading && !isSendCodeToEmail && (
								<TbSend className='w-6 h-6' />
							)}
						</button>
					) : (
						<button
							onClick={() => {
								if (activeStep === 0) {
									handleNextLogin()
								}
								if (activeStep === 1) {
									handleNextUserData()
								}
							}}
							className={
								!isLoading
									? 'flex gap-2 h-[50px] px-5 text-white w-[200px] justify-center  rounded-3xl hover:opacity-80 transition-opacity  py-[25px] bg items-center bg-gradient-to-r from-[#166430] via-[#168430] to-[#FEED00]'
									: activeStep === 1
									? 'flex gap-2 h-[50px] px-5 text-white w-[300px] justify-center  rounded-3xl opacity-80 transition-opacity  py-[25px] bg items-center bg-gradient-to-r from-[#166430] via-[#168430] to-[#FEED00]'
									: 'flex gap-2 h-[50px] px-5 text-white w-[200px] justify-center  rounded-3xl opacity-80 transition-opacity  py-[25px] bg items-center bg-gradient-to-r from-[#166430] via-[#168430] to-[#FEED00]'
							}
						>
							<h1>
								{isLoading
									? 'Загрузка...'
									: activeStep === 1
									? 'Подтвердить телефон'
									: 'Продолжить'}
							</h1>
							{!isLoading && activeStep !== 1 && (
								<MdCheck className='w-8 h-8' />
							)}
						</button>
					)}
				</div>
				<div className='flex justify-center'></div>
			</div>
		</div>
	)
}

export default SingInStepper
