import * as signalR from '@microsoft/signalr'
import { Avatar, Badge } from 'antd'
import { FC, useEffect, useRef, useState } from 'react'
import { ICustomer } from '../../../../types/ICustomer'
import { IUser } from '../../../../types/IUser'

interface AvatarItemProps {
	user: IUser | ICustomer
	fontSize: string
	width: string
	height: string
}

const AvatarItem: FC<AvatarItemProps> = ({ height, width, user, fontSize }) => {
	const baseUrl = 'https://api.xn--h1agbg8e4a.xn--p1ai'
	const connectionRef = useRef<signalR.HubConnection | null>(null)
	const [onlineUsers, setOnlineUsers] = useState<number[]>([])
	const [isOnline, setIsOnline] = useState(false)

	useEffect(() => {
		async function getAccessToken() {
			try {
				// Здесь реализуйте ваш механизм получения токена аутентификации
				// Например, можете использовать localStorage или cookies
				const token = localStorage.getItem('token')
				return token || ''
			} catch (error) {
				throw new Error('Failed to get access token.')
			}
		}

		async function configureSignalRConnection() {
			const token = await getAccessToken()
			const connection = new signalR.HubConnectionBuilder()
				.withUrl(`${baseUrl}/status`, {
					accessTokenFactory: async () => token,
				})
				.build()

			connection.on('UserStatusChanged', (userId, isOnline) => {
				setOnlineUsers(prevOnlineUsers =>
					isOnline
						? [...prevOnlineUsers, userId]
						: prevOnlineUsers.filter(id => id !== userId)
				)
			})

			connection
				.start()
				.then(() => {
					console.log('SignalR connection established.')
				})
				.catch(error => {
					console.error('Error connecting to SignalR:', error)
				})

			connectionRef.current = connection
		}

		configureSignalRConnection()

		return () => {
			if (connectionRef.current) {
				connectionRef.current.stop()
			}
		}
	}, [])

	// Новая функция для вызова IsUserOnline на сервере
	const checkUserOnlineStatus = async (userId: any) => {
		try {
			if (
				connectionRef.current &&
				connectionRef.current.state === signalR.HubConnectionState.Connected
			) {
				const isUserOnline = await connectionRef.current.invoke(
					'IsUserOnline',
					userId
				)
				console.log('IsOnline before?', isOnline)
				console.log('Online?', isUserOnline)
				setIsOnline(isUserOnline) // Fix: Update setIsOnline with the correct value
				console.log('IsOnline after?', isOnline)
			}
		} catch (error) {
			console.log('Error checking user online status:', error)
		}
	}

	useEffect(() => {
		checkUserOnlineStatus(user.id)
	})
	return (
		<Badge
			offset={[-36, 180]}
			style={{ width: '15px', height: '15px' }}
			dot={true}
			color={isOnline ? 'green' : '##8c8c8c'}
			status={isOnline ? 'success' : 'default'}
		>
			<Avatar
				src={user.avatar}
				style={{
					height: `${height}px`,
					width: `${width}px`,
					fontSize: `${fontSize}px`,
				}}
			>
				{user.login?.slice(0, 1)}
			</Avatar>
		</Badge>
	)
}

export default AvatarItem
