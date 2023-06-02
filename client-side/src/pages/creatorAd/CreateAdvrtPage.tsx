import Step from '@mui/material/Step'
import StepConnector, {
	stepConnectorClasses,
} from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import { Dispatch } from '@reduxjs/toolkit'
import { FC, useState } from 'react'
import { BsFillGeoAltFill, BsTextParagraph } from 'react-icons/bs'
import { FaMagic } from 'react-icons/fa'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { TbCategory2 } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { useActions } from '../../hooks/use-actions'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import CreateAdvrtService from '../../services/CreatorAdvrtService'
import { removeSpacesFromString } from '../../utils/removeSpacesFromString'
import Address from './stepper/steps/Adress/Address'
import CaseSelector from './stepper/steps/CaseSelector/CaseSelector'
import Category from './stepper/steps/Category'
import MoreInfo from './stepper/steps/MoreInfo/MoreInfo'
import Params from './stepper/steps/Params'

export interface IAdvrtData {
	title: null | string
	description: null | string
	price: null | string
	adress: null | string
	category: null | string
	subcategory: null | string
	images: File[]
	case: string | null
}

const CreateAdvrtPage: FC = () => {
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
			1: <TbCategory2 />,
			2: <MdOutlineDriveFileRenameOutline />,
			3: <BsTextParagraph />,
			4: <BsFillGeoAltFill />,
			5: <FaMagic />,
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

	const steps = [
		'Категория',
		'Параметры',
		'Подробности',
		'Адрес',
		'Продвижение',
	]
	const [errorMessage, setErrorMessage] = useState('')
	const [activeStep, setActiveStep] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [advrtData, setAdvrtDate] = useState({
		title: null,
		description: null,
		subcategory: null,
		price: null,
		adress: null,
		category: null,
		images: [],
		case: null,
	} as IAdvrtData)

	const dispatch = useDispatch<Dispatch<any>>()
	const { addPaymentId, addAdvrtToStorage } = useActions()
	const { paymentId, advt } = useTypedSelector(state => state.payment)

	const handleNextParams = () => {
		if (advrtData.title !== null && advrtData.price !== null) {
			setErrorMessage('')
			setActiveStep(prevActiveStep => prevActiveStep + 1)
		} else {
			setErrorMessage('Пожалуйста заполните все поля')
		}
	}

	const handleNextAddress = () => {
		if (advrtData.adress !== null) {
			setErrorMessage('')
			setActiveStep(prevActiveStep => prevActiveStep + 1)
		} else {
			setErrorMessage('Пожалуйста найдите свой адрес на карте')
		}
	}

	const handleNextMoreInfo = () => {
		if (advrtData.description !== (null && '')) {
			setErrorMessage('')
			setActiveStep(prevActiveStep => prevActiveStep + 1)
		} else {
			setErrorMessage('Пожалуйста заполните поле')
		}
	}

	const handleNextCategory = () => {
		if (advrtData.category !== null) {
			if (advrtData.subcategory === null) {
				setErrorMessage('Пожалуйста выберите подкатегорию')
			} else {
				setActiveStep(prevActiveStep => prevActiveStep + 1)
				setErrorMessage('')
			}
		} else {
			setErrorMessage('Пожалуйста выберите категорию')
		}
	}

	const handleNextCaseSelector = async () => {
		if (advrtData.case !== null) {
			setErrorMessage('')
			if (advrtData.case === 'free') {
				if (
					advrtData.adress &&
					advrtData.category &&
					advrtData.description &&
					advrtData.images &&
					advrtData.price &&
					advrtData.subcategory &&
					advrtData.title
				) {
					try {
						setErrorMessage('')
						setIsLoading(true)
						const result = await CreateAdvrtService.createAdvrt(
							advrtData.title,
							advrtData.description,
							removeSpacesFromString(advrtData.price),
							advrtData.adress,
							advrtData.category,
							advrtData.subcategory,
							advrtData.images
						)
						window.location.href = '/'
					} catch (e) {
						console.log(e)
						setErrorMessage('Произошла ошибка при создании')
					} finally {
						setIsLoading(false)
					}
				}
			} else if (advrtData.case === 'prem') {
				try {
					setIsLoading(true)
					setErrorMessage('')
					if (
						advrtData.adress &&
						advrtData.category &&
						advrtData.description &&
						advrtData.images &&
						advrtData.price &&
						advrtData.subcategory &&
						advrtData.title
					) {
						const createAd = await CreateAdvrtService.createAdvrt(
							advrtData.title,
							advrtData.description,
							removeSpacesFromString(advrtData.price),
							advrtData.adress,
							advrtData.category,
							advrtData.subcategory,
							advrtData.images
						)
					}
					const navigate = await CreateAdvrtService.navigateToYookassa().then(
						res => {
							dispatch(addPaymentId(res.data.paymentId))
							dispatch(addAdvrtToStorage(advrtData))
							window.location.href = res.data.paymentUrl
						}
					)
				} catch (e) {
					setErrorMessage('Произошла ошибка при оплате')
					console.log(e)
				} finally {
					setIsLoading(false)
				}
			}
		} else {
			setErrorMessage('Пожалуйста выберите пакет услуг')
		}
	}

	const handleBack = () => {
		if (activeStep - 1 !== -1) {
			setActiveStep(prevActiveStep => prevActiveStep - 1)
		}
	}

	return (
		<div>
			<h1 className='mt-14 mb-14 text-3xl'>Создание объявления</h1>
			<Stepper
				connector={<ColorlibConnector />}
				alternativeLabel
				activeStep={activeStep}
			>
				{steps.map((label, index) => {
					const stepProps: { completed?: boolean } = {}
					const labelProps: {
						optional?: React.ReactNode
					} = {}

					return (
						<Step key={label} {...stepProps}>
							<StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>
								{label}
							</StepLabel>
						</Step>
					)
				})}
			</Stepper>

			<div className='flex px-28 mt-10 flex-col min-h-[200px]'>
				{activeStep === 0 && (
					<Category advrtData={advrtData} setAdvrtData={setAdvrtDate} />
				)}
				{activeStep === 1 && (
					<Params advrtData={advrtData} setAdvrtData={setAdvrtDate} />
				)}
				{activeStep === 2 && (
					<MoreInfo advrtData={advrtData} setAdvrtData={setAdvrtDate} />
				)}
				{activeStep === 3 && (
					<Address advrtData={advrtData} setAdvrtData={setAdvrtDate} />
				)}
				{activeStep === 4 && (
					<CaseSelector advrtData={advrtData} setAdvrtData={setAdvrtDate} />
				)}
				{errorMessage && (
					<div className='mt-5 px-4 w-[350px] bg-red-200 text-center flex justify-center rounded-md py-2'>
						<h1 className='text-[16px] text-red-600 '>{errorMessage}</h1>
					</div>
				)}
			</div>

			{activeStep === steps.length ? (
				<div></div>
			) : (
				<div className='flex justify-between mt-14 px-28'>
					<button
						className='px-4 py-2 border border-[#166430] h-[50px]  text-[#166430] outline-none rounded-3xl hover:opacity-80 transition-opacity w-[150px]'
						onClick={handleBack}
					>
						Назад
					</button>

					<button
						disabled={isLoading}
						className={
							isLoading
								? 'px-4 py-2 bg-gradient-to-r from-[#166430] via-[#168430] h-[50px] to-[#FEED00]  text-white translate-x-4 rounded-3xl opacity-50 transition-opacity w-[150px]'
								: 'px-4 py-2 bg-gradient-to-r from-[#166430] via-[#168430] h-[50px] to-[#FEED00]  text-white translate-x-4 rounded-3xl hover:opacity-50 transition-opacity w-[150px]'
						}
						onClick={() => {
							if (activeStep === 0) {
								handleNextCategory()
							}
							if (activeStep === 1) {
								handleNextParams()
							}
							if (activeStep === 2) {
								handleNextMoreInfo()
							}
							if (activeStep === 3) {
								handleNextAddress()
							}
							if (activeStep === 4) {
								handleNextCaseSelector()
							}
						}}
					>
						{activeStep === 4 && advrtData.case === 'free' ? (
							<>Создать</>
						) : activeStep === 4 && advrtData.case === 'prem' ? (
							<>Оплатить</>
						) : isLoading ? (
							<>Загрузка</>
						) : (
							<>Продолжить</>
						)}
					</button>
				</div>
			)}
		</div>
	)
}

export default CreateAdvrtPage
