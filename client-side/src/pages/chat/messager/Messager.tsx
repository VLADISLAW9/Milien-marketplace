import {
	DeleteOutlined,
	EllipsisOutlined,
	SendOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { FC, useEffect, useRef, useState } from 'react'
import Loader from '../../../app/components/ui/spiner/Loader'
import { useTypedSelector } from '../../../hooks/use-typed-selector'
import { ICustomer } from '../../../types/ICustomer'
import { IGetCurrentCorresponence } from '../../../types/IGetCurrentCorresponence'
import { formatFromDateToTime } from '../../../utils/formatFromDateToTime'

interface IMessagerProps {
	isLoadingChat: boolean
	sendMessage: (receiver: string, message: string) => Promise<void>
	messages: IGetCurrentCorresponence[]
	companion: ICustomer | undefined
}

const Messager: FC<IMessagerProps> = ({
	messages,
	sendMessage,
	companion,
	isLoadingChat,
}) => {
	const items: MenuProps['items'] = [
		{
			label: (
				<div className='flex items-center gap-2'>
					<Avatar style={{ width: 20, height: 20 }} />
					<h1>Перейти в профиль</h1>
				</div>
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
	const { user } = useTypedSelector(state => state.user)
	const [message, setMessage] = useState('')
	const messageRef = useRef<any>()

	useEffect(() => {
		if (messageRef && messageRef.current) {
			const { scrollHeight, clientHeight } = messageRef.current
			messageRef.current.scrollTo({
				left: 0,
				top: scrollHeight - clientHeight,
				behavior: 'smooth',
			})
		}
	}, [messages, isLoadingChat])

	const handleSendMessage = (e: any) => {
		e.preventDefault()
		if (companion && message.length > 0) {
			sendMessage(String(companion.id), message)
			setMessage('')
		}
	}

	if (!companion) {
		return (
			<div className='w-[60%] min-h-[100%] bg-[#F5F5F4] rounded-lg flex flex-col justify-between h-[72vh]'></div>
		)
	} else if (isLoadingChat) {
		return (
			<div className='w-[60%] min-h-[100%] bg-[#F5F5F4] rounded-lg flex flex-col justify-between h-[72vh]'>
				<div className=' rounded-t-lg  py-5 px-8 bg-white shadow-lg shadow-stone-200  left-0 right-0 top-0 flex gap-3 items-start items-center justify-between'>
					<Avatar
						className='flex justify-center items-center'
						style={{ width: 40, height: 40, fontSize: 19 }}
						src={companion?.avatar}
					>
						{companion?.login.slice(0, 1)}
					</Avatar>
					<div className='flex-1'>
						<h1>{companion?.login}</h1>
						<p className='font-light text-xs'>В сети</p>
					</div>
					<div>
						<Dropdown
							placement='bottomRight'
							menu={{ items }}
							trigger={['click']}
						>
							<Button
								type='text'
								className='flex justify-center items-center '
								size='small'
								icon={<EllipsisOutlined />}
							/>
						</Dropdown>
					</div>
				</div>
				{/* Chat */}
				<div className='flex-1 overflow-y-scroll messager__chat'>
					<div className='flex justify-center mt-44'>
						<Loader />
					</div>
				</div>
				{/* Chat */}
				<form onSubmit={handleSendMessage}>
					<div className='rounded-b-lg py-4 px-8 bg-white shadow-lg shadow-stone-200  flex items-center justify-between'>
						<div className='flex-1 ml-3 mr-3'>
							<input
								value={message}
								onChange={(e: any) => {
									setMessage(e.target.value)
								}}
								className='w-[100%] border px-6 py-3 rounded-lg outline-none'
								placeholder='Написать сообщение'
								type='text'
							/>
						</div>
						<Button
							disabled={message.length === 0}
							onClick={handleSendMessage}
							type='text'
							size='large'
							className='flex translate-x-2 justify-center items-center text-stone-500'
							icon={<SendOutlined />}
						/>
					</div>
				</form>
			</div>
		)
	} else {
		return (
			<div className='w-[60%] min-h-[100%] bg-[#F5F5F4] rounded-lg flex flex-col justify-between h-[72vh]'>
				<div className=' rounded-t-lg  py-5 px-8 bg-white shadow-lg shadow-stone-200  left-0 right-0 top-0 flex gap-3 items-start items-center justify-between'>
					<Avatar
						className='flex justify-center items-center'
						style={{ width: 40, height: 40, fontSize: 19 }}
						src={companion?.avatar}
					>
						{companion?.login.slice(0, 1)}
					</Avatar>
					<div className='flex-1'>
						<h1>{companion?.login}</h1>
						<p className='font-light text-xs'>В сети</p>
					</div>
					<div>
						<Dropdown
							placement='bottomRight'
							menu={{ items }}
							trigger={['click']}
						>
							<Button
								type='text'
								className='flex justify-center items-center '
								size='small'
								icon={<EllipsisOutlined />}
							/>
						</Dropdown>
					</div>
				</div>
				{/* Chat */}
				<div
					ref={messageRef}
					className='flex-1 overflow-y-scroll messager__chat'
				>
					<ul className='flex flex-col gap-5 p-6'>
						{messages
							.slice()
							.reverse()
							.map((message, index) => {
								const date = new Date(message.dateOfDispatch)
								return (
									<>
										<li className='break-all' key={message.id}>
											{message.recipientId !== user.id ? (
												<div className='flex gap-2 justify-end'>
													<h1 className='text-stone-400  flex items-end text-[11px]'>
														{formatFromDateToTime(date)}
													</h1>
													<div className='bg-white px-4 py-3  max-w-[60%] rounded-lg'>
														<p>{message.text}</p>
													</div>
													<Avatar
														src={user.avatar}
														style={{ width: 35, height: 35 }}
													/>
												</div>
											) : (
												<div className='flex gap-3'>
													<Avatar
														className='flex justify-center items-center'
														src={companion?.avatar}
														style={{ width: 35, height: 35 }}
													>
														{companion.login.slice(0, 1)}
													</Avatar>
													<div className='bg-white px-4 py-3 max-w-[60%] rounded-lg'>
														<p>{message.text}</p>
													</div>
													<h1 className='text-stone-400 flex items-end text-xs'>
														{formatFromDateToTime(date)}
													</h1>
												</div>
											)}
										</li>
									</>
								)
							})}
					</ul>
				</div>
				{/* Chat */}
				<form onSubmit={handleSendMessage}>
					<div className='rounded-b-lg py-4 px-8 bg-white shadow-lg shadow-stone-200  flex items-center justify-between'>
						<div className='flex-1 ml-3 mr-3'>
							<input
								value={message}
								onChange={(e: any) => {
									setMessage(e.target.value)
								}}
								className='w-[100%] border px-6 py-3 rounded-lg outline-none'
								placeholder='Написать сообщение'
								type='text'
							/>
						</div>
						<Button
							disabled={message.length === 0}
							onClick={handleSendMessage}
							type='text'
							size='large'
							className='flex translate-x-2 justify-center items-center text-stone-500'
							icon={<SendOutlined />}
						/>
					</div>
				</form>
			</div>
		)
	}
}

export default Messager
