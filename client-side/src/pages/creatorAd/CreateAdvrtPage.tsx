import Step from '@mui/material/Step'
import StepConnector, {
	stepConnectorClasses,
} from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import { FC, useState } from 'react'
import { BsFillGeoAltFill, BsTextParagraph } from 'react-icons/bs'
import { FaMagic } from 'react-icons/fa'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { TbCategory2 } from 'react-icons/tb'
import Address from './stepper/steps/Address'
import CaseSelector from './stepper/steps/CaseSelector'
import Category from './stepper/steps/Category'
import MoreInfo from './stepper/steps/MoreInfo'
import Params from './stepper/steps/Params'

interface IAdvrtData {
	title: null | string
	description: null | string
	price: null | number
	adress: null | string
	category: null | string
	subcategory: null | string
	images: null | string[]
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
	const [activeStep, setActiveStep] = useState(0)
	const [advrtData, setAdvrtDate] = useState({
		title: null,
		description: null,
		price: null,
		adress: null,
		category: null,
		images: null,
	} as IAdvrtData)

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep(activeStep)
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
				{activeStep === 0 && <Category />}
				{activeStep === 1 && <Params />}
				{activeStep === 2 && <MoreInfo />}
				{activeStep === 3 && <Address />}
				{activeStep === 4 && <CaseSelector />}
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
						className='px-4 py-2 bg-gradient-to-r from-[#166430] via-[#168430] h-[50px] to-[#FEED00]  text-white translate-x-4 rounded-3xl hover:opacity-80 transition-opacity w-[150px]'
						onClick={handleNext}
					>
						Продолжить
					</button>
				</div>
			)}
		</div>
	)
}

export default CreateAdvrtPage
