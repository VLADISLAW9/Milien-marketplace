import { EllipsisOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Link, Params, useNavigate } from 'react-router-dom'
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

	const handleClickToUser = async () => {
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

	useEffect(() => {
		setIsReadState(content.isRead)
	}, [content])

	const items: MenuProps['items'] = [
		{
			label: (
				<Link
					to={`/customer/${content.customer.id}`}
					className='flex items-center gap-2'
				>
					<Avatar
						src={content.customer.avatar}
						className='flex justify-center items-center w-[20px] h-[20px] text-[12px] max-xl:w-[40px] max-xl:h-[40px] max-xl:text-[24px]'
					>
						{content.customer.login.slice(0, 1)}
					</Avatar>
					<h1 className='max-xl:text-2xl'>Перейти в профиль</h1>
				</Link>
			),
			key: '1',
		},
	]
	return (
		<li
			onClick={handleClickToUser}
			className='hover:bg-[#F5F5F4]  transition-all px-5 py-4 rounded-lg flex items-center cursor-pointer justify-between relative'
		>
			<div className='flex gap-3'>
				{/* <AvatarItem
					badgeS='10'
					offset={[-10, 50]}
					user={content.customer}
					height={'50'}
					width={'50'}
					fontSize={'23'}
				/> */}
				<Avatar
					className='flex justify-center items-center w-[50px] h-[50px] max-xl:w-[100px] max-xl:h-[100px] text-[23px]'
					src={content.customer.avatar}
				>
					{content.customer.login.slice(0, 1)}
				</Avatar>
				<div className='flex-1 truncate'>
					<h1
						className={
							isReadState
								? 'font-medium max-xl:text-2xl'
								: 'font-bold max-xl:text-2xl'
						}
					>
						{content.customer.login}
					</h1>
					<p
						className={
							isReadState
								? 'line-clamp-1 max-w-[400px] break-all text-stone-500 text-sm max-xl:text-xl'
								: 'line-clamp-1 w-[200px] text-sm font-bold text-black max-xl:text-xl'
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
							? 'text-xs text-stone-400 max-xl:text-xl   max-xl:-translate-y-5'
							: 'text-xs text-black font-bold max-xl:text-xl max-xl:-translate-y-5'
					}
				>
					{formatFromDateToCounts(dateOfDispatch)}
				</h1>
				<Dropdown placement='bottomRight' menu={{ items }} trigger={['click']}>
					<div onClick={handleMoreClick}>
						<Button
							type='text'
							className='flex max-xl:hidden justify-center items-center'
							size='small'
							icon={<EllipsisOutlined />}
						/>
						<Button size='large' className='hidden max-xl:block max-xl:text-xl'>
							Подробнее
						</Button>
					</div>
				</Dropdown>
			</div>
		</li>
	)
}

export default ChatItem
