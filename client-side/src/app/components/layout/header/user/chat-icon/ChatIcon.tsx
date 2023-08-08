import { Badge } from 'antd'
import { useEffect, useState } from 'react'
import { BsFillChatSquareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useFetching } from '../../../../../../hooks/use-fetching'
import ChatService from '../../../../../../services/ChatService'

const ChatIcon = () => {
	const [countOfUnreadMessages, setCountOfUnreadMessages] = useState(0)

	const [fetchCountOfUnreadMessages, isLoadingCount, isErrorCount] =
		useFetching(async () => {
			const response = await ChatService.GetCountOfUnreadingMessages()
			setCountOfUnreadMessages(response.data)
		})

	useEffect(() => {
		fetchCountOfUnreadMessages()
	}, [])

	return (
		<Badge style={{ marginTop: '-3px' }} count={countOfUnreadMessages}>
			<Link to='/chat'>
				<BsFillChatSquareFill className='text-stone-400 ml-[19px] w-[21px] h-[21px] hover:text-stone-500  transition-colors ' />
			</Link>
		</Badge>
	)
}

export default ChatIcon
