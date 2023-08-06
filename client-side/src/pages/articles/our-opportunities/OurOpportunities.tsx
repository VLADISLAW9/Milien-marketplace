import { Link } from 'react-router-dom'

const OurOpportunities = () => {
	return (
		<div className='px-28 py-3'>
			<Link to='/'>
				<img className='w-[240px]' src='/logo.png' />
			</Link>
			<div className='mt-20 px-3 relative'>
				<h1 className='text-5xl text-[#1D1D1F] font-bold'>Наши преимущества</h1>
				<p className='text-[20px] mt-5 leading-9 text-[#858585]'>
					Рассказываем о преимуществах <br />
					нашей платформы по поику и продаже <br />
					товаров и услуг
				</p>
				<div className='absolute -top-40 rotate-12 right-10'>
					<img className='w-[600px]' src='nashi.png' />
				</div>
			</div>
			<div className='bg-white py-12 px-7 rounded-xl mt-40'>
				<h1 className='text-3xl text-[#1D1D1F] font-bold'>
					Широкий выбор товаров
				</h1>
				<p className='text-[18px] mt-5 text-[#858585]'>
					Мильён.рф предлагает обширную базу объявлений, что позволяет
					пользователям найти разнообразные товары и услуги на одной платформе.
					Это упрощает процесс поиска и сравнения предложений.
				</p>
			</div>
		</div>
	)
}

export default OurOpportunities
