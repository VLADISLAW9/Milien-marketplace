import { Dialog } from '@mui/material'
import { FC, useState } from 'react'
import ErrorMessage from '../../../../app/components/ui/error/ErrorMessage'
import Loader from '../../../../app/components/ui/spiner/Loader'
import { ICustomer } from '../../../../types/ICustomer'
import Email from './Email'
import Tel from './Tel'

interface IShowContactsProps {
	customer?: ICustomer
	isLoading: boolean
	isError: boolean
}

const ShowContacts: FC<IShowContactsProps> = ({
	customer,
	isError,
	isLoading,
}) => {
	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<button
				onClick={handleClickOpen}
				className='mt-4 rounded-md px-4 bg-[#EF7E1B]/40 py-5 w-[320px] justify-center flex items-center text-xl text-[#EF7E1B]'
			>
				Показать контакты
			</button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<div className='p-10'>
					<div className='flex flex-col'>
						{isLoading ? (
							<div className='flex justify-center items-center'>
								<Loader />
							</div>
						) : isError ? (
							<div className='flex justify-center items-center'>
								<ErrorMessage />
							</div>
						) : customer ? (
							<>
								<div className='flex text-2xl'>
									<h1>{customer.firstName}</h1>
									<h1 className='ml-2 text-2xl'>{customer.lastName}</h1>
								</div>
								<div className='mt-10 px-10 py-5 rounded-md bg-slate-100 '>
									<Tel customer={customer} />
									<Email customer={customer} />
								</div>
							</>
						) : null}
					</div>
				</div>
			</Dialog>
		</>
	)
}

export default ShowContacts
