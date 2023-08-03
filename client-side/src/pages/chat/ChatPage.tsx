import { SearchOutlined } from '@ant-design/icons'
import { Input, Select } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../../hooks/use-fetching'
import useSignalRConnectionChat from '../../hooks/use-signalR-chat'
import ChatService from '../../services/ChatService'
import UsersService from '../../services/UsersService'
import { ICustomer } from '../../types/ICustomer'
import { IGetCurrentCorresponence } from '../../types/IGetCurrentCorresponence'
import ChatItem from './chat-item/ChatItem'
import Messager from './messager/Messager'

const ChatPage: FC = () => {
	const params = useParams()
	const [currentCorresponence, setCurrentCorresponence] = useState<
		IGetCurrentCorresponence[] | null
	>(null)
	const [allCorresponences, setAllCorresponences] = useState<
		ICustomer[] | never[]
	>([])
	const [currentCompanion, setCurrentCompanion] = useState<ICustomer | null>(
		null
	)

	const fetchUserByParamsId = async () => {
		try {
			const response = await UsersService.GetUserById(Number(params.id))
			fetchCurrentCorresponence(response.data.id)
			setCurrentCompanion(response.data)
		} catch (e: any) {
			console.log(e)
		}
	}

	const fetchCurrentCorresponence = async (id: number) => {
		try {
			const response = await ChatService.GetCurrentCorresponence(id)
			setCurrentCorresponence(response.data)
		} catch (e: any) {
			console.log('Ошибка при получении переписки с пользоватьлем')
		}
	}

	const [
		fetchAllCorresponences,
		isLoadingAllCorresponences,
		isErrorAllCorresponences,
	] = useFetching(async () => {
		const response = await ChatService.GetAllCorresponences()
		setAllCorresponences(response.data)
	})

	const getAccessToken = async () => {
		const token = localStorage.getItem('token')
		return token || ''
	}

	const connection = useSignalRConnectionChat(getAccessToken)

	const SendMessage = async (recipientId: number, message: string) => {
		console.log('is send message')
		const sendler = await connection.invoke(
			'SendMessage',
			String(recipientId),
			message
		)
		fetchAllCorresponences()
	}

	const handleClickToUser = (chat: ICustomer) => {
		fetchCurrentCorresponence(chat.id)
		setCurrentCompanion(chat)
	}

	useEffect(() => {
		fetchAllCorresponences()
		if (params.id) {
			fetchUserByParamsId()
		}
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
						{allCorresponences.map(chat => (
							<div key={chat.id} onClick={() => handleClickToUser(chat)}>
								<ChatItem content={chat} />
							</div>
						))}
					</ul>
				</div>
				<Messager
					SendMessage={SendMessage}
					companion={currentCompanion}
					content={currentCorresponence ? currentCorresponence : []}
				/>
			</div>
		</div>
	)
}

export default ChatPage
