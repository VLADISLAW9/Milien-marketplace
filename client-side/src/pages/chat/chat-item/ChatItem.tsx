import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { FC } from 'react'
import { Link, Params, useNavigate } from 'react-router-dom'
import { ICustomer } from '../../../types/ICustomer'
import { IGetAllCorresponences } from '../../../types/IGetAllCorresponences'
import { formatFromDateToDMY } from '../../../utils/formatFromDateToDMY'

interface ChatItemProps {
	params: Readonly<Params<string>>
	content: IGetAllCorresponences
	closeConnection: () => void
	setCompanion: (user: ICustomer) => void
}

const ChatItem: FC<ChatItemProps> = ({
	params,
	content,
	closeConnection,
	setCompanion,
}) => {
	const navigate = useNavigate()
	const dateOfDispatch = new Date(content.dateOfDispatch)

	const handleClickToUser = () => {
		if (content.customer.id !== Number(params.id)) {
			closeConnection()
			setCompanion(content.customer)
			navigate(`/chat/${content.customer.id}`)
		}
	}

	const handleMoreClick = (event: any) => {
		event.stopPropagation()
	}

	const items: MenuProps['items'] = [
		{
			label: (
				<Link
					to={`/customer/${content.customer.id}`}
					className='flex items-center gap-2'
				>
					<Avatar
						src={content.customer.avatar}
						className='flex justify-center items-center'
						style={{ width: 20, height: 20, fontSize: 12 }}
					>
						{content.customer.login.slice(0, 1)}
					</Avatar>
					<h1>Перейти в профиль</h1>
				</Link>
			),
			key: '1',
		},
		
		{
			label: (
				<Link
					to={`/customer/${content.customer.id}`}
					className='flex items-center gap-2'
				>
					
					<h1>Перейти к объявлению</h1>
				</Link>
			),
			key: '2',
		},
		{
			label: (
				<div className='flex items-center gap-2'>
					<DeleteOutlined style={{ width: 20 }} />
					<h1>Удалить чат</h1>
				</div>
			),
			key: '0',
		},
	]
	return (
		<li
			onClick={handleClickToUser}
			className='hover:bg-[#F5F5F4]  transition-all px-5 py-4 rounded-lg flex items-center cursor-pointer justify-between relative'
		>
			<div className='flex gap-3'>
				<Avatar
					className='flex justify-center items-center'
					src={content.customer.avatar}
					style={{ width: 50, height: 50, fontSize: 23 }}
				>
					{content.customer.login.slice(0, 1)}
				</Avatar>
				<div className='flex-1 truncate'>
					<h1 className='font-medium '>{content.customer.login}</h1>
					<p className='line-clamp-1 text-stone-500 text-sm'>
						{content.message}
					</p>
				</div>
			</div>
			<div className='flex flex-col items-end gap-1 translate-y-[5px]'>
				<h1 className='text-xs text-stone-400'>
					{formatFromDateToDMY(dateOfDispatch).slice(0, 5)}
				</h1>
				<Dropdown placement='bottomRight' menu={{ items }} trigger={['click']}>
					<Button
						onClick={handleMoreClick}
						type='text'
						className='flex justify-center items-center'
						size='small'
						icon={<EllipsisOutlined />}
					/>
				</Dropdown>
			</div>
		</li>
	)
}

export default ChatItem
