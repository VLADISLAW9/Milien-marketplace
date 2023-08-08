import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Link, Params, useNavigate } from 'react-router-dom'
import AvatarItem from '../../../app/components/ui/avatar/AvatarItem'
import { ICustomer } from '../../../types/ICustomer'
import { IGetAllCorresponences } from '../../../types/IGetAllCorresponences'
import { formatFromDateToCounts } from '../../../utils/formatFromDateToCounts'

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
	const [isReadState, setIsReadState] = useState(content.isRead)

	const handleClickToUser = () => {
		if (content.customer.id !== Number(params.id)) {
			closeConnection()
			setCompanion(content.customer)
			navigate(`/chat/${content.customer.id}`)
			setIsReadState(true)
		}
	}

	const handleMoreClick = (event: any) => {
		event.stopPropagation()
	}

	useEffect(() => {
		if (content.customer.id === Number(params.id)) {
			setIsReadState(true)
		}
	}, [])

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
				<AvatarItem
					badgeS='10'
					offset={[-10, 45]}
					user={content.customer}
					height={'50'}
					width={'50'}
					fontSize={'23'}
				/>
				{/* <Avatar
					className='flex justify-center items-center'
					src={content.customer.avatar}
					style={{ width: 50, height: 50, fontSize: 23 }}
				>
					{content.customer.login.slice(0, 1)}
				</Avatar> */}
				<div className='flex-1 truncate'>
					<h1 className={isReadState ? 'font-medium' : 'font-bold'}>
						{content.customer.login}
					</h1>
					<p
						className={
							isReadState
								? 'line-clamp-1 max-w-[400px] break-all text-stone-500 text-sm'
								: 'line-clamp-1 w-[200px] text-sm font-bold text-black'
						}
					>
						{content.message}
					</p>
				</div>
			</div>
			<div className='flex flex-col items-end gap-1 translate-y-[5px]'>
				<h1
					className={
						isReadState
							? 'text-xs text-stone-400'
							: 'text-xs text-black font-bold'
					}
				>
					{formatFromDateToCounts(dateOfDispatch)}
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
