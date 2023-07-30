import * as signalR from '@microsoft/signalr'
import { useEffect, useRef } from 'react'

const baseUrl = 'https://api.xn--h1agbg8e4a.xn--p1ai' // Замените на базовый URL вашего API

const useSignalRConnection = (accessTokenFactory: () => Promise<string>) => {
	const connectionRef = useRef<signalR.HubConnection | null>(null)

	useEffect(() => {
		let isMounted = true
		const configureSignalRConnection = async () => {
			const token = await accessTokenFactory()
			const connection = new signalR.HubConnectionBuilder()
				.withUrl(`${baseUrl}/status`, {
					accessTokenFactory: async () => token,
				})
				.configureLogging(signalR.LogLevel.Information) // Добавляем логирование для отладки
				.withAutomaticReconnect() // Включаем автоматическое переподключение
				.build()

			// Здесь вы можете добавить обработчики событий, как в предыдущем примере
			connection.on('UserStatusChanged', () => {
				console.log('UserStatusChanged connected')
			})

			connection
				.start()
				.then(() => {
					if (isMounted) {
						console.log('SignalR connection established.')
					}
				})
				.catch(error => {
					console.error('Error connecting to SignalR:', error)
				})

			connectionRef.current = connection
		}

		configureSignalRConnection()

		return () => {
			isMounted = false
			if (connectionRef.current) {
				connectionRef.current.stop()
			}
		}
	}, [accessTokenFactory])

	return [connectionRef.current]
}

export default useSignalRConnection
