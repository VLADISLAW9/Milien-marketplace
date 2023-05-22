import { useState } from 'react'
import { AiFillMail } from 'react-icons/ai'

const EmailAccept = () => {
	const [email, setEmail] = useState('')

	const phoneNumberPlaceholder = 'exa mple@mail.ru'

	return (
		<div className='px-[50px] flex text-center mt-10'>
			<div className='flex mb-4'>
				<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
					<AiFillMail className='scale-[.6] w-8 h-8 text-stone-400' />
				</div>
				<input
					className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[250px]'
					placeholder='Введите ваш e-mail'
					value={email}
					required
					onChange={e => {
						setEmail(e.target.value)
					}}
					type='text'
				/>
			</div>
		</div>
	)
}

export default EmailAccept
