import { RollbackOutlined } from '@ant-design/icons'
import { Button, Divider, message, Modal, Tooltip } from 'antd'
import { FC, useState } from 'react'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { FaCopy, FaOdnoklassniki } from 'react-icons/fa'
import { SlPaperPlane, SlSocialVkontakte } from 'react-icons/sl'

interface ShareButtonProps {
	adId: number
	adTitle: string
	adImg: string
}

const ShareButton: FC<ShareButtonProps> = ({ adId, adImg, adTitle }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [messageApi, contextHolder] = message.useMessage();

	const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Ссылка скопирована',
    });
  };

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const handleCopyClick = () => {
		success()
		const url = `https://xn--h1agbg8e4a.xn--p1ai/advertisement/${adId}`
		navigator.clipboard
			.writeText(url)
			.then(() => {
				// URL copied to the clipboard
				console.log('URL copied to the clipboard:', url)
			})
			.catch(error => {
				// Unable to copy URL to the clipboard
				console.error('Failed to copy URL to the clipboard:', error)
			})
	}

	return (
		<>
			{contextHolder}	
			<Button
				size='large'
				icon={<RollbackOutlined className='-translate-y-1' />}
				onClick={showModal}
			>
				Поделиться
			</Button>
			<Modal
				title={<h1 className=''>Поделиться</h1>}
				open={isModalOpen}
				footer={[]}
				onCancel={handleCancel}
			>
				<>
					<Divider />
					<ul className='flex gap-5 justify-center items-center'>
						<li>
							<Tooltip title='Вконтакте'>
								<Button
									href={`https://vk.com/share.php?url=https://xn--h1agbg8e4a.xn--p1ai/advertisement/${adId}&title=${adTitle}&image=${adImg}`}
									target='_blank'
									style={{
										width: 70,
										height: 70,
										color: '#fff',
										borderColor: '#0077FF',
										backgroundColor: '#0077FF',
									}}
									className='flex justify-center items-center'
									shape='circle'
									icon={<SlSocialVkontakte className='w-10 h-10' />}
								/>
							</Tooltip>
						</li>
						<li>
							<Tooltip title='Одноклассники'>
								<Button
									href={`https://connect.ok.ru/offer?url=https://xn--h1agbg8e4a.xn--p1ai/advertisement/${adId}&title=${adTitle}&imageUrl=${adImg}`}
									target='_blank'
									style={{
										width: 70,
										height: 70,
										color: '#FF7700',
										borderColor: '#FF7700',
									}}
									className='flex justify-center items-center'
									shape='circle'
									icon={<FaOdnoklassniki className='w-10 h-10' />}
								/>
							</Tooltip>
						</li>
						<li>
							<Tooltip title='Телеграмм'>
								<Button
									href={`https://t.me/share/url?url=https://xn--h1agbg8e4a.xn--p1ai/advertisement/${adId}&text=${adTitle}`}
									target='_blank'
									style={{
										width: 70,
										height: 70,
										color: '#29A9EB',
										borderColor: '#29A9EB',
									}}
									className='flex justify-center items-center'
									shape='circle'
									icon={<SlPaperPlane className='w-8 h-8' />}
								/>
							</Tooltip>
						</li>
						<li>
							<Tooltip title='WhatsApp'>
								<Button
									href={`whatsapp://send?text=${adTitle} - https://xn--h1agbg8e4a.xn--p1ai/advertisement/${adId}&image=${adImg}`}
									data-action='share/whatsapp/share'
									target='_blank'
									style={{
										width: 70,
										height: 70,
										color: '#00A884',
										borderColor: '#00A884',
									}}
									className='flex justify-center items-center'
									shape='circle'
									icon={<AiOutlineWhatsApp className='w-9 h-9' />}
								/>
							</Tooltip>
						</li>
					</ul>
					<Divider />
					<h1 className='text-center font-medium mb-3'>Скопировать ссылку</h1>
					<div className='text-center items-center justify-center mb-3 flex gap-3'>
						<h1 className='py-2 border-b'>
							https://xn--h1agbg8e4a.xn--p1ai/advertisement/{adId}
						</h1>
						<button
							className='p-2 rounded-xl bg-[#166430] text-white'
							onClick={handleCopyClick}
						>
							<FaCopy />
						</button>
					</div>
				</>
			</Modal>
		</>
	)
}

export default ShareButton