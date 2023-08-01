import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { FC } from 'react'

const items: MenuProps['items'] = [
	{
		label: (
			<div className='flex items-center gap-2'>
				<Avatar style={{ width: 20, height: 20 }} />
				<h1>Перейти в профиль</h1>
			</div>
		),
		key: '1',
	},
	{
		label: (
			<div className='flex items-center gap-2'>
				<DeleteOutlined style={{ width: 20 }} />
				<h1>Удалить чат</h1>
			</div>
		),
		key: '0',
	},
]

const ChatItem: FC = () => {
	return (
		<li className='hover:bg-[#F5F5F4] shadow-stone-200 shadow-lg transition-all px-5 py-4 rounded-lg flex items-center justify-between gap-3'>
			<Avatar style={{ width: 50, height: 50 }} />
			<div className='flex-1'>
				<h1 className='font-medium '>Fame</h1>
				<p className='font-light text-sm'>Ты че, уебок, меня наебал!</p>
			</div>
			<div className='flex flex-col items-end gap-1 translate-y-[5px]'>
				<h1 className='text-xs text-stone-400'>16 июл</h1>
				<Dropdown placement='bottomRight' menu={{ items }} trigger={['click']}>
					<Button
						type='text'
						className='flex justify-center items-center'
						size='small'
						icon={<EllipsisOutlined />}
					/>
				</Dropdown>
			</div>
		</li>
	)
}

export default ChatItem
