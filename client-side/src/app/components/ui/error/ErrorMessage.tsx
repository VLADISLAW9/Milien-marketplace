import { FC } from 'react'
import { MdError } from 'react-icons/md'

const ErrorMessage: FC = () => {
	return (
		<div className='flex text-stone-400 items-center justify-center'>
			<MdError className='mr-1 w-20 h-20' />
			<h1 className='text-2xl font-semibold'>Error 404</h1>
		</div> 
	)
}

export default ErrorMessage
