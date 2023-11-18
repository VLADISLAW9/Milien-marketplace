import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import type { TabsProps } from 'antd';
import HowToCreateAd from './HowToCreateAd/HowToCreateAd'
import HowToSignIn from './HowToSignIn/HowToSignIn'

const GuideOfSite = () => {

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Регистрация на сайте ',
			children: <HowToSignIn/>,
		},
		{
			key: '2',
			label: 'Создание объявления',
			children: <HowToCreateAd/>,
		},
	];

	return (
		<div className='px-28 py-3  min-h-[100vh]'>
			<Link to='/'>
				<img className='w-[240px]' src='/logo.png' />
			</Link>
			<div className='mt-20  px-3 relative'>
				<h1 className='text-5xl text-[#1D1D1F] font-bold'>Руководство по сайту</h1>
				<p className='text-[20px] mt-5 leading-9 text-[#858585]'>
					Рассказываем о том как <br />
					пользоваться нашей платформой <br />
					по продаже товаров и услуг
				</p>

				<div className='absolute -top-32 rotate-12 right-10'>
					<img className='w-[600px]'src='/rukovdstvo.png' />
				</div>
			</div>
			<div className='px-3 mt-10'>
				<Tabs size='large' defaultActiveKey="1" items={items} />
			</div>
		</div>
	)
}

export default GuideOfSite
