import React from 'react'

const HowToCreateAd = () => {
	return (
		<div className='mt-10  mb-20'>
			<h1 className='font-semibold text-2xl text-center'>
				Создание объявления
			</h1> 
			<div className='mt-16'>
				<p className='mt-7 text-xl leading-9'>
						<span className='font-medium'>Шаг 1. </span> <br/>
						В правом нижнем углу экрана вы можете найти плюс в кружке (рис.1)  – это кнопка<br/>создания объявления, которая перенесёт вас в меню (рис.2).
				</p>
				
					<div className='flex flex-col justify-center items-center mt-5'>
						<img width={300}  src='/how-to-create-img-1.jpg'/>
						<p className='text-sm text-stone-500'>Рисунок 1</p>
					</div>
			</div>
			<div className='mt-16'>
				<p className='mt-7 text-xl leading-9'>
						<span className='font-medium'>Шаг 2.</span> <br/>
						В открывшемся окне (рис.2) выберите категорию, в которой будет находится объявление.<br/> Будьте внимательны при выборе, ведь в случае некорректного ввода интересующиеся люди <br/>не смогут найти его не прибегнув к вводу названия в строке «Поиск».
				</p>
				<div className='flex flex-col justify-center items-center mt-10'>
						<img width={700}  src='/how-to-create-img-2.jpg'/>
						<p className='text-sm text-stone-500 mt-2'>Рисунок 2</p>
					</div>
			</div>
			<div className='mt-16'>
				<p className='mt-7 text-xl leading-9'>
						<span className='font-medium'>Шаг 3.</span> <br/>
						По завершении предыдущего этапа нажмите кнопку «Продолжить». Следующий этап будет <br/> заключатся в вводе названия объявления и цены (рис.3).
				</p>
				<div className='flex flex-col justify-center items-center mt-10'>
						<img width={700}  src='/how-to-create-img-3.jpg'/>
						<p className='text-sm text-stone-500 mt-2'>Рисунок 3</p>
					</div>
			</div>
			<div className='mt-16'>
				<p className='mt-7 text-xl leading-9'>
						<span className='font-medium'>Шаг 4.</span> <br/>
						Немаловажным пунктом в создании объявления является подробное описание предмета сделки. <br/>Внесите характеристики (рис.4) продаваемого предмета или предоставляемой услуги <br/>
						(цены на дополнительные действия или, к примеру, условия торга)
				</p>
				<div className='flex flex-col justify-center items-center mt-10'>
						<img width={700}  src='/how-to-create-img-4.jpg'/>
						<p className='text-sm text-stone-500 mt-2'>Рисунок 4</p>
					</div>
			</div>
			<div className='mt-16'>
				<p className='mt-7 text-xl leading-9'>
						<span className='font-medium'>Шаг 5.</span> <br/>
						Внесите адрес, где вы готовы предоставить услугу или продать вещь.
				</p>
				<div className='flex flex-col justify-center items-center mt-10'>
						<img width={700}  src='/how-to-create-img-5.jpg'/>
						<p className='text-sm text-stone-500 mt-2'>Рисунок 5</p>
					</div>
			</div>
			<div className='mt-16'>
				<p className='mt-7 text-xl leading-9'>
						<span className='font-medium'>Шаг 6.</span> <br/>
						Выберите возможность продвижения вашего объявления (рис.6). Премиум тариф позволит вам <br/>привлечь большее количество клиентов или покупателей, находится в верхних строчках <br/>поисковой системы. Нажмите кнопку «создать», поздравляем, ваше объявление в общем <br/>доступе.
				</p>
				<div className='flex flex-col justify-center items-center mt-10'>
						<img width={700}  src='/how-to-create-img-6.jpg'/>
						<p className='text-sm text-stone-500 mt-2'>Рисунок 6</p>
					</div>
			</div>
		</div>
	)
}

export default HowToCreateAd