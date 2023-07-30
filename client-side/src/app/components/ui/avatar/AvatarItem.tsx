import * as signalR from '@microsoft/signalr'
import { Avatar, Badge } from 'antd'
import { FC, useEffect, useState } from 'react'
import useSignalRConnection from '../../../../hooks/use-signalR-connection'
import { ICustomer } from '../../../../types/ICustomer'
import { IUser } from '../../../../types/IUser'

interface AvatarItemProps {
	user: IUser | ICustomer
	badgeS: string
	fontSize: string
	width: string
	height: string
	offset: [string | number, string | number] | undefined
}

const AvatarItem: FC<AvatarItemProps> = ({
	height,
	width,
	user,
	fontSize,
	offset,
	badgeS,
}) => {
	const [isOnline, setIsOnline] = useState(false)
	const getAccessToken = async () => {
		const token = localStorage.getItem('token')
		return token || ''
	}
	const connnection = useSignalRConnection(getAccessToken)

	const checkUserOnlineStatus = async (userId: any) => {
		try {
			if (
				connnection &&
				connnection.state === signalR.HubConnectionState.Connected
			) {
				const isUserOnline = await connnection.invoke('IsUserOnline', userId)
				console.log(isUserOnline, 'response from bac')
				setIsOnline(isUserOnline)
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
			offset={offset}
			style={{ width: `${badgeS}px`, height: `${badgeS}px` }}
			dot={isOnline}
			status={'success'}
		>
			<Avatar
				className='flex justify-center items-center'
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
