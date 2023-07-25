import Slider from 'react-slick'

const HomeCarousel = () => {
	const settings = {
		slickNext:() => {},
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		centerMode: true,
		cssEase: 'linear',
	}

	const handleNext = () => {
		settings.slickNext()
	}

	return (
		<Slider {...settings}>
			<div className='bg-[#E0DCAC] relative overflow-hidden rounded-xl h-[170px] px-[24px] py-[24px]'>
				<div className='h-[100%] flex flex-col justify-end'>
					<h1 className='text-xl font-medium text-[#454649]'>
						Пользовательское соглашение
					</h1>
					<p className='text-base font-light'>
						Лицензионное соглашение с пользователем
					</p>
				</div>
				<div className='absolute -top-[10px] -right-10 '>
					<img className='w-[300px]' src='/polzSogl.png' />
				</div>
			</div>
			<div className='bg-[#b5fa9c] relative overflow-hidden rounded-xl h-[170px] px-[24px] py-[24px]'>
				<div className='h-[100%] flex flex-col justify-end'>
					<h1 className='text-xl font-medium text-[#454649]'>
						Наши преимущества
					</h1>
					<p className='text-base font-light'>о преимуществах нашего сайта</p>
				</div>
				<div className='absolute -top-10 -right-5 '>
					<img className='w-[300px] -rotate-[24deg]' src='/nashi.png' />
				</div>
			</div>
		</Slider>
	)
}

export default HomeCarousel
