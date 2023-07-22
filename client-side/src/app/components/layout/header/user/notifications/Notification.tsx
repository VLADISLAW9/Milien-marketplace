import { Avatar, Badge, Drawer } from 'antd'
import { FC, useState } from 'react'
import { IoIosNotifications } from 'react-icons/io'

const Notification: FC = () => {
	const [open, setOpen] = useState(false)
	const [count, setCount] = useState(0)

	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

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
				<h1 className='text-2xl mt-3 text-center'>
					Новые уведомления ({count} шт.)
				</h1>
				<ul className='flex flex-col mt-10 gap-4'>
					{/* <li className='rounded-xl shadow-lg shadow-stone-200 p-5'>
						<div className='flex items-start'>
							<div>
								<Avatar style={{ width: '40px', height: '40px' }} />
							</div>
							<div className='ml-2 -translate-y-[5px]'>
								<h1 className='font-medium text-[16px]'>Юрий</h1>
								<p>Подписался на вас</p>
							</div>
						</div>
					</li>
					<li className='rounded-xl  shadow-lg p-5'>
						<div className='flex items-start'>
							<div>
								<Avatar style={{ width: '40px', height: '40px' }} />
							</div>
							<div className='ml-2 -translate-y-[5px]'>
								<h1 className='font-medium text-[16px]'>Юрий</h1>
								<p>Подписался на вас</p>
							</div>
						</div>
					</li>
					<li className='rounded-xl  shadow-lg p-5'>
						<div className='flex items-start'>
							<Avatar size={'large'} />
							<div className='ml-2 -translate-y-[5px]'>
								<h1 className='font-medium text-[16px]'>Юрий</h1>
								<p>Подписался на вас</p>
							</div>
						</div>
					</li>
					<li className='rounded-xl  shadow-lg p-5'>
						<div className='flex items-start'>
							<div>
								<Avatar style={{ width: '40px', height: '40px' }} />
							</div>
							<div className='ml-2 -translate-y-[5px]'>
								<h1 className='font-medium text-[16px]'>Юрий</h1>
								<p>
									Добавил ваше объявление в избранное -{' '}
									<span className='font-medium'>Игровая мышь Razer Basilisk</span>
								</p>
							</div>
						</div>
					</li> */}
				</ul>
			</Drawer>
		</div>
	)
}

export default Notification
