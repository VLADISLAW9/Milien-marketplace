import { SearchOutlined } from '@ant-design/icons'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { Input, Select } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../app/components/ui/spiner/Loader'
import { useFetching } from '../../hooks/use-fetching'
import ChatService from '../../services/ChatService'
import UsersService from '../../services/UsersService'
import { ICustomer } from '../../types/ICustomer'
import { IGetAllCorresponences } from '../../types/IGetAllCorresponences'
import { IGetCurrentCorresponence } from '../../types/IGetCurrentCorresponence'
import ChatItem from './chat-item/ChatItem'
import Messager from './messager/Messager'

const ChatPage: FC = () => {
	const params = useParams()
	const [isLoadingChat, setIsLoadingChat] = useState(false)
	const [connection, setConnection] = useState<any>()
	const [allChats, setAllChats] = useState<IGetAllCorresponences[]>([])
	const [messages, setMessages] = useState<IGetCurrentCorresponence[]>([])
	const [companion, setCompanion] = useState<ICustomer>()

	const [
		fetchAllCorrespondences,
		isLoadingAllCorrespondences,
		isErrorAllCorrespondence,
	] = useFetching(async () => {
		const response = await ChatService.GetAllCorresponences()
		setAllChats(response.data)
	})

	const fetchAllCorrespondencesWithoutLoading = async () => {
		const response = await ChatService.GetAllCorresponences()
		setAllChats(response.data)
	}

	const fetchCurrentCorrespondences = async (id: number) => {
		const response = await ChatService.GetCurrentCorresponence(id)
		setMessages(response.data)
	}

	const joinRoom = async (userId: string) => {
		setIsLoadingChat(true)
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
				fetchAllCorrespondencesWithoutLoading()
			}
		)

		await connection.start().then(() => {
			console.log('к чату все успешно подключено')
			setIsLoadingChat(false)
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
						{isErrorAllCorrespondence ? (
							<></>
						) : isLoadingAllCorrespondences ? (
							<div className='flex justify-center mt-32'>
								<Loader />
							</div>
						) : allChats.length > 0 ? (
							<>
								{allChats.map(chat => (
									<Link
										onClick={() => {
											setCompanion(chat.customer)
											closeConnection()
										}}
										to={`/chat/${chat.customer.id}`}
									>
										<ChatItem content={chat} key={chat.customer.id} />
									</Link>
								))}
							</>
						) : (
							<div className='flex justify-center items-center mt-32'>
								<h1 className='text-lg text-stone-500'>
									У вас нет историй переписок
								</h1>
							</div>
						)}
					</ul>
				</div>
				<Messager
					isLoadingChat={isLoadingChat}
					companion={companion}
					messages={messages}
					sendMessage={sendMessage}
				/>
			</div>
		</div>
	)
}

export default ChatPage
