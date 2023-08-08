import { Link } from 'react-router-dom'

const OurOpportunities = () => {
	return (
		<div className='px-28 py-3  min-h-[100vh]'>
			<Link to='/'>
				<img className='w-[240px]' src='/logo.png' />
			</Link>
			<div className='mt-20  px-3 relative'>
				<h1 className='text-5xl text-[#1D1D1F] font-bold'>Наши преимущества</h1>
				<p className='text-[20px] mt-5 leading-9 text-[#858585]'>
					Рассказываем о преимуществах <br />
					нашей платформы по поику и продаже <br />
					товаров и услуг
				</p>

				<div className='absolute -top-52 rotate-12 right-10'>
					<img className='w-[600px]' src='nashi.png' />
				</div>
			</div>
			<div className='py-12 bg-white shadow-stone-200 px-10 shadow-xl mb-10 rounded-xl text-right mt-40 relative overflow-hidden'>
				<h1 className='text-3xl text-[#1D1D1F] font-bold'>
					Широкий выбор товаров
				</h1>
				<p className='text-[18px] mt-5 text-[#858585]'>
					Мильён.рф предлагает обширную базу объявлений, <br />
					что позволяет пользователям найти <br /> разнообразные товары и услуги
					на одной платформе. <br /> Это упрощает процесс поиска и сравнения
					предложений.
				</p>
				<div className='absolute left-32 top-0'>
					<img className='w-[250px]' src='/tovari.png' />
				</div>
			</div>
			<div className='py-12 bg-white shadow-stone-200 px-10 shadow-xl mb-16   rounded-xl relative '>
				<h1 className='text-3xl text-[#1D1D1F] font-bold'>
					Простота и удобство использования
				</h1>
				<p className='text-[18px]  mt-5 text-[#858585]'>
					Сайт обладает интуитивно понятным интерфейсом, что делает его легко{' '}
					<br />
					доступным для широкой аудитории. Пользователи могут быстро размещать{' '}
					<br />
					свои объявления или искать нужные товары без сложных процедур.
				</p>
				<div className='absolute right-32 top-5'>
					<img className='w-[250px]' src='/prostota.png' />
				</div>
			</div>
			<div className='py-12 bg-white shadow-stone-200 px-10 shadow-xl mb-16  rounded-xl text-right  relative'>
				<h1 className='text-3xl text-[#1D1D1F] font-bold'>
					Модерация объявлений
				</h1>
				<p className='text-[18px]  mt-5 text-[#858585]'>
					Модерация на Мильён.рф является важным инструментом для обеспечения{' '}
					<br />
					безопасности и качества объявлений. Фильтрация <br />
					позволяет исключить нежелательные или недобросовестные объявления,{' '}
					<br />
					что повышает доверие пользователей к платформе.
				</p>
				<div className='absolute left-32 top-0'>
					<img className='w-[250px]' src='/moderatia.png' />
				</div>
			</div>
			<div className='py-12 bg-white shadow-stone-200 px-10 shadow-xl mb-16 relative  rounded-xl'>
				<h1 className='text-3xl text-[#1D1D1F] font-bold'>
					Редактирование опечаток
				</h1>
				<p className='text-[18px]   mt-5 text-[#858585]'>
					Ошибки в объявлениях могут привести к недопониманию и снизить <br />
					вероятность успешной продажи. Благодаря возможности редактирования{' '}
					<br />
					опечаток модераторами, вы обеспечиваете точность и корректность <br />
					информации в объявлениях, улучшая <br />
					пользовательский опыт.
				</p>
				<div className='absolute right-24 top-5'>
					<img className='w-[350px]' src='/edit.png' />
				</div>
			</div>
			<div className='py-12 bg-white shadow-stone-200 px-10 shadow-xl mb-16 text-right relative rounded-xl'>
				<h1 className='text-3xl text-[#1D1D1F] font-bold'>
					Премиум объявления
				</h1>
				<p className='text-[18px]  mt-5 text-[#858585]'>
					Возможность приобрести премиум объявления является привлекательной{' '}
					<br />
					опцией для пользователей, желающих выделить свои предложения среди{' '}
					<br />
					других. Премиум объявления обычно получают больше просмотров и, <br />
					следовательно, повышают шансы на быструю продажу товара.
				</p>
				<div className='absolute left-28 top-0'>
					<img className='w-[250px]' src='/premium.png' />
				</div>
			</div>
			<div className='py-12 shadow-stone-200 px-10 shadow-xl mb-16 bg-white  relative  rounded-xl'>
				<h1 className='text-3xl text-[#1D1D1F] font-bold'>
					Высокая посещаемость
				</h1>
				<p className='text-[18px] mt-5 text-[#858585]'>
					Мильён.рф предоставляет доступ к большой базе потенциальных <br />
					покупателей. Высокая посещаемость сайта <br />
					обеспечивает больше <br />
					возможностей для продажи товаров и услуг.
				</p>
				<div className='absolute right-28 top-0'>
					<img className='w-[250px]' src='/mir.png' />
				</div>
			</div>
			<div className='py-12 bg-white text-right shadow-stone-200 px-10 shadow-xl mb-16 relative  rounded-xl'>
				<h1 className='text-3xl text-[#1D1D1F] font-bold'>Безопасные сделки</h1>
				<p className='text-[18px]  mt-5 text-[#858585]'>
					Платформа Мильён.рф следит за безопасностью <br />
					сделок и может предложить рекомендации по безопасным платежным
					<br />
					методам, что создает доверие у пользователей.
				</p>
				<div className='absolute left-28 top-0'>
					<img className='w-[250px]' src='/block.png' />
				</div>
			</div>
			<div className='py-12 shadow-stone-200 px-10 shadow-xl mb-16 relative bg-white rounded-xl'>
				<h1 className='text-3xl text-[#1D1D1F] font-bold'>Коммуникация</h1>
				<p className='text-[18px] mt-5 text-[#858585]'>
					Возможность общаться с другими пользователями <br /> сайта через
					встроенные системы обмена сообщениям
				</p>
				<div className='absolute right-28 -top-5'>
					<img className='w-[250px]' src='/chat.png' />
				</div>
			</div>
		</div>
	)
}

export default OurOpportunities
