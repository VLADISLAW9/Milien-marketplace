import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { Button, Drawer, Select } from 'antd'
import { FC, useEffect, useState } from 'react'
import { AiOutlineHistory } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import Loader from '../../app/components/ui/spiner/Loader'
import { useFetching } from '../../hooks/use-fetching'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import ChatService from '../../services/ChatService'
import UsersService from '../../services/UsersService'
import { ICustomer } from '../../types/ICustomer'
import { IGetAllCorresponences } from '../../types/IGetAllCorresponences'
import { IGetCurrentCorresponence } from '../../types/IGetCurrentCorresponence'
import ChatItem from './chat-item/ChatItem'
import Messager from './messager/Messager'

const ChatPage: FC = () => {
	const params = useParams()
	const { user } = useTypedSelector(state => state.user)
	const [searchValue, setSearchValue] = useState('')
	const [isLoadingChat, setIsLoadingChat] = useState(false)
	const [connection, setConnection] = useState<any>()
	const [allChats, setAllChats] = useState<IGetAllCorresponences[]>([])
	const [searchResults, setSearchResults] = useState<IGetAllCorresponences[]>(
		[]
	)
	const [isLoadingSearch, setIsLoadingSearch] = useState(false)

	const [messages, setMessages] = useState<IGetCurrentCorresponence[]>([])
	const [companion, setCompanion] = useState<ICustomer>()
	const [selectValue, setSelectValue] = useState('all')
	const [showHistoryModal, setShowHistoryModal] = useState(false)

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

	const findMessage = async () => {
		try {
			setIsLoadingSearch(true)
			const response = await ChatService.FindMessage(searchValue)
			setSearchResults(response.data)
		} catch (error) {
			// Обработка ошибки, если необходимо
		} finally {
			setIsLoadingSearch(false)
		}
	}

	useEffect(() => {
		fetchAllCorrespondences()
		fetchUserById()
	}, [])

	useEffect(() => {
		if (searchValue.length > 0) {
			findMessage()
		} else {
			setSearchResults([])
			fetchAllCorrespondences()
		}
	}, [searchValue])

	useEffect(() => {
		const intervalId = setInterval(() => {
			fetchAllCorrespondencesWithoutLoading()
		}, 10000)

		return () => {
			clearInterval(intervalId) // Очищаем интервал при размонтировании компонента
		}
	}, [])

	useEffect(() => {
		fetchCurrentCorrespondences(Number(params.id))
		joinRoom(String(params.id))
	}, [params.id])

	return (
		<div>
			<h1 className='mt-14 mb-5 text-3xl'>Сообщения</h1>
			<div className='flex max-xl:flex-col gap-10 mt-10'>
				<div className='hidden max-xl:flex  max-xl:items-center'>
					<Button
						onClick={() => {
							setShowHistoryModal(true)
						}}
						icon={<AiOutlineHistory />}
						type='text'
						className='text-2xl flex justify-center items-center gap-3 -translate-x-4'
					>
						История переписок
					</Button>
					<Drawer
						placement={'left'}
						open={showHistoryModal}
						width={'100%'}
						closeIcon={<MdClose className='w-16 text-stone-600 h-16' />}
						onClose={() => {
							setShowHistoryModal(false)
						}}
						title={<h1 className='text-3xl text-center'>История переписок</h1>}
					>
						<div className='h-[100%]'>
							<div className='flex gap-3'>
								<Select
									onChange={(value: string) => {
										setSelectValue(value)
									}}
									defaultValue='all'
									className='w-[190px] max-xl:hidden'
									options={[
										{ value: 'all', label: 'Все сообщения' },
										{ value: 'unread	', label: 'Непрочитанные' },
									]}
								/>
							</div>
							<ul className='flex flex-col mt-5'>
								{isErrorAllCorrespondence ? (
									<></>
								) : isLoadingAllCorrespondences ? (
									<div className='flex justify-center mt-32'>
										<Loader />
									</div>
								) : searchResults.length > 0 && searchValue.length > 0 ? (
									searchResults.map(chat => (
										<ChatItem
											params={params}
											setCompanion={setCompanion}
											closeConnection={closeConnection}
											content={chat}
											key={chat.customer.id}
										/>
									))
								) : allChats.length > 0 && searchValue.length === 0 ? (
									<>
										{allChats
											.filter(
												selectValue !== 'all'
													? chat => chat.isRead === false
													: chat => chat
											)
											.map(chat => (
												<div
													onClick={() => {
														setShowHistoryModal(false)
													}}
												>
													<ChatItem
														params={params}
														setCompanion={setCompanion}
														closeConnection={closeConnection}
														content={chat}
														key={chat.customer.id}
													/>
												</div>
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
					</Drawer>
				</div>
				<div className='w-[40%] max-xl:hidden h-[100%]'>
					<div className='flex gap-3'>
						<Select
							onChange={(value: string) => {
								setSelectValue(value)
							}}
							defaultValue='all'
							style={{ width: 190 }}
							options={[
								{ value: 'all', label: 'Все сообщения' },
								{ value: 'unread	', label: 'Непрочитанные' },
							]}
						/>
					</div>
					<ul className='flex flex-col mt-5'>
						{isErrorAllCorrespondence ? (
							<></>
						) : isLoadingAllCorrespondences ? (
							<div className='flex justify-center mt-32'>
								<Loader />
							</div>
						) : searchResults.length > 0 && searchValue.length > 0 ? (
							searchResults.map(chat => (
								<ChatItem
									params={params}
									setCompanion={setCompanion}
									closeConnection={closeConnection}
									content={chat}
									key={chat.customer.id}
								/>
							))
						) : allChats.length > 0 && searchValue.length === 0 ? (
							<>
								{allChats
									.filter(
										selectValue !== 'all'
											? chat => chat.isRead === false
											: chat => chat
									)
									.map(chat => (
										<ChatItem
											params={params}
											setCompanion={setCompanion}
											closeConnection={closeConnection}
											content={chat}
											key={chat.customer.id}
										/>
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
