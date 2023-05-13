import { FC } from 'react'
import { MdEmail } from 'react-icons/md'
import { RiFileCopy2Fill } from 'react-icons/ri'
import { ICustomer } from '../../../../types/ICustomer'
import { handleCopyToClipboard } from '../../../../utils/handleCopyToClipboard'

interface IEmailProps {
	customer: ICustomer
}

const Email: FC<IEmailProps> = ({ customer }) => {
	return (
		<div
			onClick={() => handleCopyToClipboard(customer.email)}
			className='py-5 hover:text-black transition-all cursor-pointer flex items-center text-stone-500'
		>
			<MdEmail className='w-5 h-5 translate-y-0.5 mr-4' />
			<h1 className='text-2xl font-semibold '>{customer.email}</h1>
			<div className=' ml-4'>
				<RiFileCopy2Fill className='w-5 h-5' />
			</div>
		</div>
	)
}

export default Email
