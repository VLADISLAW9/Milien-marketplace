import { SearchOutlined } from '@ant-design/icons'
import { Input, Select } from 'antd'
import { FC, useEffect } from 'react'
import useSignalRConnectionChat from '../../hooks/use-signalR-chat'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import ChatItem from './chat-item/ChatItem'
import Messager from './messager/Messager'

const ChatPage: FC = () => {
	const { user } = useTypedSelector(state => state.user)
	const getAccessToken = async () => {
		const token = localStorage.getItem('token')
		return token || ''
	}

	const connection = useSignalRConnectionChat(getAccessToken)

	const SendMessage = async () => {
		const sendler = await connection.invoke('SendMessage', "82", "Привет")
		console.log(sendler, 'is send')
	}

	useEffect(() => {
		SendMessage()
	})

	return (
		<div>
			<h1 className='mt-14 mb-5 text-3xl'>Сообщения</h1>
			<div className='flex gap-10 mt-10'>
				<div className='w-[40%] h-[100%]'>
					<div className='flex gap-3'>
						<Select
							defaultValue='all'
							style={{ width: 220 }}
							options={[
								{ value: 'all', label: 'Все сообщения' },
								{ value: 'unread	', label: 'Непрочитанные' },
							]}
						/>
						<Input
							placeholder='Поиск по сообщениям'
							prefix={<SearchOutlined className='pr-1' />}
						/>
					</div>
					<ul className='flex flex-col mt-5'>
						<ChatItem />
					</ul>
				</div>
				<Messager />
			</div>
		</div>
	)
}

export default ChatPage
