import { Badge } from 'antd'
import { useEffect, useState } from 'react'
import { BsFillChatSquareFill } from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'
import { useFetching } from '../../../../../../hooks/use-fetching'
import ChatService from '../../../../../../services/ChatService'

const ChatIcon = () => {
	const location = useLocation()
	const [countOfUnreadMessages, setCountOfUnreadMessages] = useState(0)

	const [fetchCountOfUnreadMessages, isLoadingCount, isErrorCount] =
		useFetching(async () => {
			const response = await ChatService.GetCountOfUnreadingMessages()
			setCountOfUnreadMessages(response.data)
		})

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (!location.pathname.includes('/chat')) {
				fetchCountOfUnreadMessages()
			} else {
				setCountOfUnreadMessages(0)
			}
		}, 10000)

		return () => {
			clearInterval(intervalId) // Очищаем интервал при размонтировании компонента
		}
	}, [])

	return (
		<Badge style={{ marginTop: '-3px' }} count={countOfUnreadMessages}>
			<Link onClick={() => setCountOfUnreadMessages(0)} to='/chat'>
				<BsFillChatSquareFill className='text-stone-400 ml-[19px] w-[21px] h-[21px] max-xl:h-[40px] max-xl:w-[40px] hover:text-stone-500  transition-colors ' />
			</Link>
		</Badge>
	)
}

export default ChatIcon
