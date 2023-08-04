import { SearchOutlined } from '@ant-design/icons'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { Input, Select } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ChatService from '../../services/ChatService'
import UsersService from '../../services/UsersService'
import { ICustomer } from '../../types/ICustomer'
import { IGetCurrentCorresponence } from '../../types/IGetCurrentCorresponence'
import ChatItem from './chat-item/ChatItem'
import Messager from './messager/Messager'

const ChatPage: FC = () => {
	const params = useParams()
	const [connection, setConnection] = useState<any>()
	const [allChats, setAllChats] = useState<ICustomer[]>([])
	const [messages, setMessages] = useState<IGetCurrentCorresponence[]>([])
	const [companion, setCompanion] = useState<ICustomer>()

	const joinRoom = async () => {
		const getAccessToken = async () => {
			const token = localStorage.getItem('token')
			return token || ''
		}
		const token = await getAccessToken()
		const connection = new HubConnectionBuilder()
			.withUrl('https://api.xn--h1agbg8e4a.xn--p1ai/chat', {
				accessTokenFactory: async () => token,
			})
			.withAutomaticReconnect()
			.configureLogging(LogLevel.Information)
			.build()

		await connection.start().then(() => {
			console.log('К чату все подключено')
		})

		connection.on('ReceiveMessage', (receiver: string, message: string) => {
			setMessages((messages: any) => [...messages, { message }])
			console.log('ReceiveMessage')
		})

		connection.onclose(e => {
			setConnection(null)
			setMessages([])
		})

		setConnection(connection)
	}

	const closeConnection = async () => {
		try {
			await connection.stop()
		} catch (e: any) {
			console.log('Произошла ошибка при отключении от чата', e)
		}
	}

	const sendMessage = async (receiver: string, message: string) => {
		console.log(receiver, message, 'is data of sendMessage method')
		try {
			await connection.invoke('SendMessageToGroup', receiver, message)
		} catch (e) {
			console.log('Произошла ошибка при отправке сообщения', e)
		}
	}

	const fetchUserById = async () => {
		const response = await UsersService.GetUserById(Number(params.id))
		setCompanion(response.data)
	}

	const fetchAllCorrespondences = async () => {
		const response = await ChatService.GetAllCorresponences()
		setAllChats(response.data)
	}

	useEffect(() => {
		fetchAllCorrespondences()
		fetchUserById()
		joinRoom()
	}, [])

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
						{allChats.map(user => (
							<Link onClick={() => setCompanion(user)} to={`/chat/${user.id}`}>
								<ChatItem content={user} key={user.id} />
							</Link>
						))}
					</ul>
				</div>
				<Messager
					companion={companion}
					messages={messages}
					sendMessage={sendMessage}
					joinRoom={joinRoom}
				/>
			</div>
		</div>
	)
}

export default ChatPage
