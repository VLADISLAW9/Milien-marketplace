import * as signalR from '@microsoft/signalr'
import { Avatar, Badge } from 'antd'
import { FC, useEffect, useState } from 'react'
import useSignalRConnection from '../../../../hooks/use-signalR-connection'
import { ICustomer } from '../../../../types/ICustomer'
import { IUser } from '../../../../types/IUser'

interface AvatarItemProps {
	user: IUser | ICustomer
	fontSize: string
	width: string
	height: string
}

const AvatarItem: FC<AvatarItemProps> = ({ height, width, user, fontSize }) => {
	const [isOnline, setIsOnline] = useState(false)
	const getAccessToken = async () => {
		const token = localStorage.getItem('token')
		return token || ''
	}

	const [connection] = useSignalRConnection(getAccessToken)

	const checkUserOnlineStatus = async (userId: any) => {
		try {
			if (
				connection &&
				connection.state === signalR.HubConnectionState.Connected
			) {
				const isUserOnline = await connection.invoke('IsUserOnline', userId)
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
		checkUserOnlineStatus(82)
		console.log('fsdaifnasdbipfasdbfie3424321')
	},[])

	return (
		<Badge
			offset={[-36, 180]}
			style={{ width: '15px', height: '15px' }}
			dot={isOnline}
			status={'success'}
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
