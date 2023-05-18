import { FC } from 'react'
import { BsTelephoneFill } from 'react-icons/bs'
import { RiFileCopy2Fill } from 'react-icons/ri'
import { ICustomer } from '../../../../types/ICustomer'
import { convertToPhoneNumber } from '../../../../utils/convertToPhoneNumber'
import { handleCopyToClipboard } from '../../../../utils/handleCopyToClipboard'

interface ITelProps {
	customer: ICustomer
}

const Tel: FC<ITelProps> = ({ customer }) => {
	return (
		<div
			onClick={() =>
				handleCopyToClipboard(convertToPhoneNumber(customer.phoneNumber))
			}
			className='flex hover:text-black cursor-pointer transition-all items-center text-stone-500 border-b py-5'
		>
			<BsTelephoneFill className='mr-4' />
			<h1 className='text-2xl font-semibold '>
				{convertToPhoneNumber(customer.phoneNumber)}
			</h1>
			<div className='ml-4'>
				<RiFileCopy2Fill className='w-5 h-5' />
			</div>
		</div>
	)
}

export default Tel
