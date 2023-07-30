import * as signalR from '@microsoft/signalr'
import { useEffect, useRef, useState } from 'react'

const baseUrl = 'https://api.xn--h1agbg8e4a.xn--p1ai' // Замените на базовый URL вашего API

const useSignalRConnection = (accessTokenFactory: () => Promise<string>) => {
	const connectionRef = useRef<any>(null)
	const [isOnline, setIsOnline] = useState(false)
	const [onlineUsers, setOnlineUsers] = useState<number[]>([])

	useEffect(() => {
		const configureSignalRConnection = async () => {
			const token = await accessTokenFactory()
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

	return connectionRef.current
}

export default useSignalRConnection
