import { SearchOutlined } from '@ant-design/icons'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { Input, Select } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import ChatService from '../../services/ChatService'
import UsersService from '../../services/UsersService'
import { ICustomer } from '../../types/ICustomer'
import { IGetCurrentCorresponence } from '../../types/IGetCurrentCorresponence'
import ChatItem from './chat-item/ChatItem'
import Messager from './messager/Messager'

const ChatPage: FC = () => {
	const { user } = useTypedSelector(state => state.user)
	const params = useParams()
	const [connection, setConnection] = useState<any>()
	const [allChats, setAllChats] = useState<ICustomer[]>([])
	const [messages, setMessages] = useState<IGetCurrentCorresponence[]>([])
	const [companion, setCompanion] = useState<ICustomer>()

	const fetchAllCorrespondences = async () => {
		const response = await ChatService.GetAllCorresponences()
		setAllChats(response.data)
	}

	const fetchCurrentCorrespondences = async (id: number) => {
		const response = await ChatService.GetCurrentCorresponence(id)
		setMessages(response.data)
	}

	const joinRoom = async (userId: string) => {
		const getAccessToken = async () => {
			const token = localStorage.getItem('token')
			return token || ''
		}
		const token = await getAccessToken()
		const connection = new HubConnectionBuilder()
			.withUrl(`https://api.xn--h1agbg8e4a.xn--p1ai/chat?userId=${userId}`, {
				accessTokenFactory: async () => token,
			})
			.withAutomaticReconnect()
			.configureLogging(LogLevel.Information)
			.build()

		connection.on(
			'ReceiveMessage',
			(messageEntity: IGetCurrentCorresponence) => {
				setMessages(messages => [messageEntity, ...messages])
				fetchAllCorrespondences()
			}
		)

		await connection.start().then(() => {
			console.log('к чату все успешно подключено')
		})

		connection.onclose(e => {
			setConnection(null)
			setMessages([])
			console.log('вы отключились от чата')
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

	

	useEffect(() => {
		fetchAllCorrespondences()
		fetchUserById()
	}, [])

	useEffect(() => {
		fetchCurrentCorrespondences(Number(params.id))
		joinRoom(String(params.id))
	}, [params.id])

	return (
		<div>
			<h1 className='mt-14 mb-5 text-3xl'>Сообщения</h1>
			<div className='flex gap-10 mt-10'>
				<div className='w-[40%] h-[100%]'>
					{/* <div className='flex gap-3'>
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
					</div> */}
					<ul className='flex flex-col mt-5'>
						{allChats.map(user => (
							<Link
								onClick={() => {
									setCompanion(user)
									closeConnection()
								}}
								to={`/chat/${user.id}`}
							>
								<ChatItem content={user} key={user.id} />
							</Link>
						))}
					</ul>
				</div>
				<Messager
					companion={companion}
					messages={messages}
					sendMessage={sendMessage}
				/>
			</div>
		</div>
	)
}

export default ChatPage
