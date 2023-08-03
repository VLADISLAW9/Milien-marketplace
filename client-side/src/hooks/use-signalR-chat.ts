import * as signalR from '@microsoft/signalr'
import { useEffect, useRef, useState } from 'react'
import { IGetCurrentCorresponence } from '../types/IGetCurrentCorresponence'

const baseUrl = 'https://api.xn--h1agbg8e4a.xn--p1ai' //

const useSignalRConnectionChat = (
	accessTokenFactory: () => Promise<string>
) => {
	const connectionRef = useRef<any>(null)

	useEffect(() => {
		const configureSignalRConnection = async () => {
			const token = await accessTokenFactory()
			const connection = new signalR.HubConnectionBuilder()
				.withUrl(`${baseUrl}/chat`, {
					accessTokenFactory: async () => token,
				})
				.build()

			connection
				.start()
				.then(() => {
					console.log('К чату все успешно подключено.')
				})
				.catch(error => {
					console.log('Ошибка при подключении к чату:', error)
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

export default useSignalRConnectionChat
