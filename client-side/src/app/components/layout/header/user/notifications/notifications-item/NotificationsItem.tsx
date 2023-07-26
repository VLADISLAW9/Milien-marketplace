import { Avatar } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { INotification } from '../../../../../../../types/INotification'

interface NotificationsItemProps {
	data: INotification
	handleHideModal: () => void
}

const NotificationsItem: FC<NotificationsItemProps> = ({
	data,
	handleHideModal,
}) => {
	const onClickOnLink = () => {
		handleHideModal()
	}

	return (
		<Link
			onClick={onClickOnLink}
			to={`/customer/${data.customer.id}`}
			className='rounded-xl shadow-lg hover:text-black
			 shadow-stone-200 p-5'
		>
			<div className='flex items-start'>
				<div>
					<Avatar
						src={data.customer.avatar}
						style={{ width: '40px', height: '40px' }}
					></Avatar>
				</div>
				<div className='ml-2 -translate-y-[5px]'>
					<h1 className='font-medium text-[16px]'>{data.customer.login}</h1>
					<p>{data.message}</p>
				</div>
			</div>
		</Link>
	)
}

export default NotificationsItem
