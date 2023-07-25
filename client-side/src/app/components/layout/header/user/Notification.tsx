import { Badge, Button, Drawer } from 'antd'
import { FC, useEffect, useState } from 'react'
import { IoIosNotifications } from 'react-icons/io'
import { useFetching } from '../../../../../hooks/use-fetching'
import NotificationService from '../../../../../services/NotificationService'
import { INotification } from '../../../../../types/INotification'
import NotificationsItem from './notifications/notifications-item/NotificationsItem'

const Notification: FC = () => {
	const [open, setOpen] = useState(false)
	const [notifications, setNotifications] = useState<INotification[] | never[]>(
		[]
	)
	const [count, setCount] = useState(notifications.length)

	const [fetchNotifications] = useFetching(async () => {
		const response = await NotificationService.GetNotifications()
		setNotifications(response.data)
		setCount(response.data.length) // Assuming the count is the length of notifications array
	})

	const [ClearNewNotifications] = useFetching(async () => {
		const response = await NotificationService.ClearNotifications()
	})

	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	const handleClearNotifications = () => {
		setNotifications([])
		ClearNewNotifications()
		setCount(0)
		onClose()
	}

	useEffect(() => {
		fetchNotifications()

		// Set up the interval to fetch notifications every minute
		const interval = setInterval(() => {
			fetchNotifications()
		}, 60000)

		// Clean up the interval when the component unmounts
		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div className='ml-[15px] translate-y-[2px]'>
			<Badge count={count}>
				<IoIosNotifications
					onClick={showDrawer}
					className='text-stone-400 w-[28px] h-[28px] cursor-pointer hover:text-stone-500 transition-colors'
				/>
			</Badge>
			<Drawer
				placement={'right'}
				closable={false}
				onClose={onClose}
				open={open}
			>
				<div className='flex flex-col justify-between h-[100%]'>
					<h1 className='text-2xl mt-3 text-center'>Мои уведомления</h1>
					<ul className='flex flex-1 flex-col mt-10 gap-4'>
						{notifications.length > 0 ? (
							<>
								{notifications.map(notif => (
									<NotificationsItem handleHideModal={onClose} data={notif} />
								))}
							</>
						) : (
							<div className='flex justify-center items-center mt-32'>
								<h1 className='text-xl text-stone-500'>Ничего не найдено</h1>
							</div>
						)}
					</ul>
					<div className='flex justify-center'>
						<Button onClick={handleClearNotifications} size='large'>
							Прочитать все
						</Button>
					</div>
				</div>
			</Drawer>
		</div>
	)
}

export default Notification
