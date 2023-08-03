import {
	DeleteOutlined,
	EllipsisOutlined,
	SendOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { FC, useEffect, useRef, useState } from 'react'
import useSignalRConnectionChat from '../../../hooks/use-signalR-chat'
import { useTypedSelector } from '../../../hooks/use-typed-selector'
import { formatFromDateToDMY } from '../../../types/formatFromDateToDMY'
import { formatFromDateToTime } from '../../../types/formatFromDateToTime'
import { ICustomer } from '../../../types/ICustomer'
import { IGetCurrentCorresponence } from '../../../types/IGetCurrentCorresponence'

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

interface MessagerProps {
	SendMessage: (recipientId: number, text: string) => void
	companion: ICustomer | null
	content: IGetCurrentCorresponence[]
}

const Messager: FC<MessagerProps> = ({ companion, content, SendMessage }) => {
	const getAccessToken = async () => {
		const token = localStorage.getItem('token')
		return token || ''
	}
	const { user } = useTypedSelector(state => state.user)
	const [message, setMessage] = useState('')
	const chatRef = useRef<HTMLDivElement | null>(null)

	const handleSendMessage = (e: any) => {
		e.preventDefault()
		if (companion && message.length > 0) {
			SendMessage(companion.id, message)
			setMessage('')
		}
	}

	useEffect(() => {
		if (chatRef && chatRef.current) {
			const { scrollHeight, clientHeight } = chatRef.current
			chatRef.current.scrollTo({
				left: 0,
				top: scrollHeight - clientHeight,
				behavior: 'smooth',
			})
		}
	}, [content])

	if (!companion) {
		return (
			<div className='w-[60%] min-h-[100%] bg-[#F5F5F4] rounded-lg flex flex-col justify-between h-[72vh]'></div>
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
				<div ref={chatRef} className='flex-1 overflow-y-scroll messager__chat'>
					<ul className='flex flex-col-reverse gap-5 p-6'>
						{content.map((message, index) => {
							const currentDate = new Date(message.dateOfDispatch)
							const nextMessage =
								index < content.length - 1 ? content[index + 1] : null
							const nextMessageDate = nextMessage
								? new Date(nextMessage.dateOfDispatch)
								: null

							const showDate =
								!nextMessageDate ||
								currentDate.toDateString() !== nextMessageDate.toDateString()
							return (
								<>
									{index !== content.length - 1 && showDate && (
										<li className='text-center text-gray-500 my-2'>
											{formatFromDateToDMY(currentDate)}
										</li>
									)}

									{message.recipientId !== user.id ? (
										<li>
											<div className='flex gap-2 justify-end'>
												<h1 className='text-stone-400  flex items-end text-[11px]'>
													{formatFromDateToTime(currentDate)}
												</h1>
												<div className='bg-white px-4 py-3  max-w-[60%] rounded-lg'>
													{message.text}
												</div>
												<Avatar
													src={user.avatar}
													style={{ width: 35, height: 35 }}
												/>
											</div>
										</li>
									) : (
										<div className='flex flex-col-reverse'>
											<li className='flex gap-3'>
												<Avatar
													src={companion?.avatar}
													style={{ width: 35, height: 35 }}
												/>
												<div className='bg-white px-4 py-3 max-w-[60%] rounded-lg'>
													{message.text}
												</div>
												<h1 className='text-stone-400 flex items-end text-xs'>
													{formatFromDateToTime(currentDate)}
												</h1>
											</li>
										</div>
									)}
								</>
							)
						})}
					</ul>
				</div>
				{/* Chat */}
				<form onSubmit={handleSendMessage}>
					<div className='rounded-b-lg py-4 px-8 bg-white shadow-lg shadow-stone-200  flex items-center justify-between'>
						{/* <Button
						type='text'
						size='large'
						className='flex justify-center items-center text-stone-500'
						icon={<PaperClipOutlined />}
					/> */}

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
