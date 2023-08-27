import { FC } from 'react'
import { formatPhoneNumber } from '../../../../../utils/formatPhoneNumber'
import { IUserData } from '../SingInStepper'

interface IEmailAccepttProps {
	userData: IUserData
	setUserData: (data: IUserData) => void
	isSendCodeToEmail: boolean
}

const EmailAccept: FC<IEmailAccepttProps> = ({
	isSendCodeToEmail,
	userData,
	setUserData,
}) => {
	return (
		<div className='px-[50px] flex  justify-center translate-x-24 flex-col mt-5 w-[600px]'>
			<h1 className='text-xl mb-3 font-semibold text-stone-700'>
				Проверьте входящие <br /> СМС на вашем телефоне
			</h1>
			<p className='text-sm text-stone-500'>
				Перейдите по ссылке в сообщении <br /> для подтверждения входа на сайт.{' '}
				<br /> Не закрывайте браузер до авторизации
			</p>
			<p className='mt-7 font-medium text-stone-700'>
				СМС-сообщение <br /> отправлено на номер <br /> +7 000 000 00 00{' '}
				{formatPhoneNumber(userData.phoneNumber)}
			</p>
		</div>
	)
}

export default EmailAccept
