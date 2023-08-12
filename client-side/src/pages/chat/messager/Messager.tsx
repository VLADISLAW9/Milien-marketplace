import { EllipsisOutlined, SendOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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
				<Link
					to={`/customer/${companion?.id}`}
					className='flex items-center gap-2'
				>
					<Avatar
						src={companion?.avatar}
						className='w-[20px] h-[20px] max-xl:w-[60px] max-xl:h-[60px]'
					>
						{companion?.login.slice(0, 1)}
					</Avatar>
					<h1 className='max-xl:text-2xl'>Перейти в профиль</h1>
				</Link>
			),
			key: '1',
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
			<div className='w-[60%] max-xl:w-[100%] min-h-[100%] bg-[#F5F5F4] rounded-lg flex flex-col justify-center items-center h-[72vh]'>
				<h1 className='text-3xl text-stone-400'>Выберите собеседника</h1>
			</div>
		)
	} else if (isLoadingChat) {
		return (
			<div className='w-[60%] max-xl:w-[100%] min-h-[100%] bg-[#F5F5F4] rounded-lg flex flex-col justify-between h-[72vh]'>
				<div className=' rounded-t-lg  py-5 px-8 bg-white shadow-lg shadow-stone-200  left-0 right-0 top-0 flex gap-3 items-start items-center justify-between'>
					<Avatar
						className='flex justify-center items-center w-[40px] h-[40px] text-[19px] max-xl:w-[80px] max-xl:h-[80px] max-xl:text-[30px]'
						src={companion?.avatar}
					>
						{companion?.login.slice(0, 1)}
					</Avatar>
					<div className='flex-1'>
						<h1>{companion?.login}</h1>
						{/* <p className='font-light text-xs'>В сети</p> */}
					</div>
					<div>
						<Dropdown
							placement='bottomRight'
							menu={{ items }}
							trigger={['click']}
						>
							<>
								<Button
									type='text'
									className='flex justify-center items-center '
									icon={<EllipsisOutlined />}
								/>
							</>
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
							<TextArea
								readOnly={true}
								value={message}
								onChange={(e: any) => {
									setMessage(e.target.value)
								}}
								maxLength={2000}
								placeholder='Загрузка чата...'
								size='large'
								className='flex items-center px-4 py-2'
								autoSize={{ minRows: 1, maxRows: 6 }}
							/>
						</div>
						<Button
							disabled={true}
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
			<div className='w-[60%] max-xl:w-[100%] min-h-[100%] bg-[#F5F5F4] rounded-lg flex flex-col justify-between h-[72vh]'>
				<div className=' rounded-t-lg  py-5 px-8 bg-white shadow-lg shadow-stone-200  left-0 right-0 top-0 flex gap-3 items-start items-center justify-between'>
					<Avatar
						className='flex justify-center items-center w-[40px] h-[40px] text-[19px] max-xl:w-[80px] max-xl:h-[80px] max-xl:text-[30px]'
						src={companion?.avatar}
					>
						{companion?.login.slice(0, 1)}
					</Avatar>
					<div className='flex-1 max-xl:text-3xl'>
						<h1>{companion?.login}</h1>
						{/* <p className='font-light text-xs'>В сети</p> */}
					</div>
					<div>
						<Dropdown
							placement='bottomRight'
							menu={{ items }}
							trigger={['click']}
						>
							<Button
								type='text'
								className='flex max-xl:text-3xl justify-center items-center '
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
					<ul className='flex flex-col max-xl:gap-12 gap-5 p-6'>
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
													<h1 className='text-stone-400  flex items-end text-[11px] max-xl:text-xl'>
														{formatFromDateToTime(date)}
													</h1>
													<div className='bg-white px-4 py-3  max-w-[60%] max-xl:text-2xl rounded-lg'>
														<p>{message.text}</p>
													</div>
													<Avatar
														src={user.avatar}
														className='flex justify-center items-center w-[35px] h-[35px] max-xl:w-[70px] max-xl:h-[70px]'
													/>
												</div>
											) : (
												<div className='flex gap-3'>
													<Avatar
														className='flex justify-center items-center w-[35px] h-[35px] max-xl:w-[70px] max-xl:h-[70px]'
														src={companion?.avatar}
													>
														{companion.login.slice(0, 1)}
													</Avatar>
													<div className='bg-white px-4 py-3 max-w-[60%] max-xl:text-2xl  rounded-lg'>
														<p>{message.text}</p>
													</div>
													<h1 className='text-stone-400 flex items-end text-xs max-xl:text-xl'>
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
					<div className='rounded-b-lg py-4 px-8 bg-white shadow-lg shadow-stone-200 max-xl:py-8 max-xl:px-6  flex items-center justify-between'>
						<div className='flex-1 ml-3 mr-3'>
							<TextArea
								onPressEnter={handleSendMessage}
								value={message}
								onChange={(e: any) => {
									setMessage(e.target.value)
								}}
								maxLength={2000}
								placeholder='Напишите сообщение...'
								size='large'
								className='flex items-center px-4 py-2 max-xl:placeholder:text-3xl max-xl:py-5 max-xl:text-3xl'
								autoSize={{ minRows: 1, maxRows: 6 }}
							/>
						</div>
						<Button
							disabled={message.length === 0}
							onClick={handleSendMessage}
							type='text'
							size='large'
							className='flex translate-x-2 justify-center items-center text-stone-500'
							icon={<SendOutlined className='max-xl:text-4xl' />}
						/>
					</div>
				</form>
			</div>
		)
	}
}

export default Messager
