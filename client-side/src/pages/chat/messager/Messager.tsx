import {
	DeleteOutlined,
	EllipsisOutlined,
	PaperClipOutlined,
	SendOutlined,
} from '@ant-design/icons'
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

const Messager: FC = () => {
	return (
		<div className='w-[60%] min-h-[100%] bg-[#F5F5F4] rounded-lg py-5 px-8 relative h-[70vh]'>
			<div className='absolute rounded-t-lg  py-5 px-8 bg-white shadow-lg shadow-stone-200  left-0 right-0 top-0 flex gap-3 items-start items-center justify-between'>
				<Avatar style={{ width: 40, height: 40 }} src='' />
				<div className='flex-1'>
					<h1>Fame</h1>
					<p className='font-light text-xs'>В сети</p>
				</div>
				<div>
					<Dropdown
						placement='bottomRight'
						menu={{ items }}
						trigger={['click']}
					>
						<Button
							type='text'
							className='flex justify-center items-center '
							size='small'
							icon={<EllipsisOutlined />}
						/>
					</Dropdown>
				</div>
			</div>
			{/* Chat */}
			<div className='mt-24'>
				<ul className='flex flex-col gap-5'>
					<li className='flex gap-3'>
						<Avatar style={{ width: 35, height: 35 }} />
						<div className='bg-white px-4 py-3 max-w-[60%] rounded-lg'>
							Ты козел, полудурок, лашара, дебил, лузер и какаха, ты имбицил!
						</div>
						<h1 className='text-stone-400 flex items-end text-xs'>18:02</h1>
					</li>
					<li className='flex gap-3 justify-end'>
						<h1 className='text-stone-400  flex items-end text-xs'>18:02</h1>
						<div className='bg-white px-4 py-3  max-w-[60%] rounded-lg'>
							Ебать ты лось таежный, хуй соси
						</div>
						<Avatar style={{ width: 35, height: 35 }} />
					</li>
				</ul>
			</div>
			{/* Chat */}
			<div className='absolute rounded-b-lg py-3 px-8 bg-white shadow-lg shadow-stone-200 left-0 right-0 bottom-0 flex items-center justify-between'>
				<Button
					type='text'
					size='large'
					className='flex justify-center items-center text-stone-500'
					icon={<PaperClipOutlined />}
				/>
				<div className='flex-1 ml-3'>
					<input
						className='w-[100%] outline-none'
						placeholder='Написать сообщение'
						type='text'
					/>
				</div>
				<Button
					type='text'
					size='large'
					className='flex justify-center items-center text-stone-500'
					icon={<SendOutlined />}
				/>
			</div>
		</div>
	)
}

export default Messager
