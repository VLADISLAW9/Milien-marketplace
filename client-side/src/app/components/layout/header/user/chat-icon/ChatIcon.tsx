import { Badge } from 'antd'
import { BsFillChatSquareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const ChatIcon = () => {
	return (
		<Badge style={{ marginTop: '-3px' }} count={0}>
			<Link to='/chat'>
				<BsFillChatSquareFill className='text-stone-400 ml-[19px] w-[21px] h-[21px] hover:text-stone-500  transition-colors ' />
			</Link>
		</Badge>
	)
}

export default ChatIcon
