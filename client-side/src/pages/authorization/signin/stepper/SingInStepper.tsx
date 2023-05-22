import { Step, StepLabel, Stepper } from '@mui/material'
import StepConnector, {
	stepConnectorClasses,
} from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import { styled } from '@mui/material/styles'
import { FC, useState } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { IoMdKeypad } from 'react-icons/io'
import { MdCheck, MdOutlineNavigateNext } from 'react-icons/md'
import { RiUserSettingsLine } from 'react-icons/ri'
import LoginPass from './steps/LoginPass'
import UserData from './steps/UserData'
import EmailAccept from './steps/EmailAccept'

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
					'linear-gradient( 95deg,#165830 0%,#166430 50%,#FEED00 100%)',
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

	const [activeStep, setActiveStep] = useState(0)

	const handleNext = () => {
		setActiveStep((prevActiveStep: any) => prevActiveStep + 1)
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

			<div>
				{activeStep === 0 && <LoginPass />}
				{activeStep === 1 && <UserData />}
				{activeStep === 2 && <EmailAccept />}
			</div>

			<div className='grid grid-cols-3 mt-10'>
				<div className='flex justify-center'>
					<button
						onClick={handleBack}
						disabled={activeStep === 0}
						className={
							activeStep !== 0
								? 'text-white hover:opacity-80 transition-all rounded-full bg-[#166434]'
								: 'text-white rounded-full bg-[#166434] opacity-30'
						}
					>
						<MdOutlineNavigateNext className='rotate-180 w-[50px] h-[50px]' />
					</button>
				</div>
				<div className='flex justify-center'>
					{activeStep === steps.length - 1 && (
						<button className='flex gap-2 h-[50px] px-5 text-white rounded-3xl py-[25px] bg items-center bg-gradient-to-r from-[#166430] via-[#168430] to-[#FEED00]'>
							<h1>Продолжить</h1>
							<MdCheck className='w-6 h-6' />
						</button>
					)}
				</div>
				<div className='flex justify-center'>
					{activeStep !== steps.length - 1 && (
						<button
							onClick={handleNext}
							disabled={activeStep === steps.length - 1}
							className={
								activeStep !== steps.length - 1
									? 'text-white hover:opacity-80 transition-all rounded-full bg-[#166434]'
									: 'text-white rounded-full bg-[#166434] opacity-30'
							}
						>
							<MdOutlineNavigateNext className='w-[50px] h-[50px]' />
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default SingInStepper
