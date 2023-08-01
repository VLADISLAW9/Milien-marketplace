import { useRef } from 'react'
import { GrNext } from 'react-icons/gr'
import { Link, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const HomeCarousel = () => {
	let sliderRef = useRef<Slider>(null)
	const navigate = useNavigate()

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		centerMode: true,
		cssEase: 'linear',
	}

	const next = () => {
		sliderRef.current?.slickNext() // Access the slickNext method using current property
	}
	const previous = () => {
		sliderRef.current?.slickPrev() // Access the slickPrev method using current property
	}

	const handleClickOnCarouselItem = () => {
		let root = document.getElementById('root')
		root?.scrollTo(0, 0)
		navigate('/user-acception')
	}

	return (
		<>
			<div className='relative slick-initialized'>
				<button
					className='w-[32px] h-[32px] flex justify-center items-center absolute bg-white rounded-lg shadow-lg z-[10] left-[50px] max-lg:hidden top-[68px] hover:bg-stone-100 transition-colors'
					onClick={previous}
				>
					<GrNext className='rotate-180' />
				</button>
				<button
					className='w-[32px] h-[32px] flex justify-center items-center absolute bg-white max-lg:hidden  rounded-lg shadow-lg z-[10] right-[50px] top-[68px] hover:bg-stone-100 transition-colors'
					onClick={next}
				>
					<GrNext />
				</button>
			</div>
			<Slider ref={sliderRef} {...settings}>
				<div
					onClick={handleClickOnCarouselItem}
					className='bg-[#E0DCAC] cursor-pointer relative overflow-hidden rounded-xl h-[170px]  px-[36px] py-[18px]'
				>
					<div className='h-[100%] flex flex-col justify-end'>
						<h1 className='text-xl z-[20] font-medium text-[#454649]'>
							Пользовательское соглашение
						</h1>
						<p className='text-base z-[20] font-light'>
							Лицензионное соглашение с пользователем
						</p>
					</div>
					<div className='absolute z-[10] -top-[10px] -right-10 max-2xl:-right-20 '>
						<img className='w-[300px] max-lg:opacity-25 ' src='/polzSogl.png' />
					</div>
				</div>
				<Link to='/opportunities' className='bg-[#b5fa9c] relative overflow-hidden rounded-xl h-[170px] px-[36px] py-[18px]'>
					<div className='h-[100%] flex flex-col justify-end'>
						<h1 className='text-xl z-[20] font-medium text-[#454649]'>
							Наши преимущества
						</h1>
						<p className='text-base z-[20]  font-light'>
							О преимуществах нашего сайта
						</p>
					</div>
					<div className='absolute -top-10 -right-5 '>
						<img
							className='w-[300px] z-[10] max-lg:opacity-30 -rotate-[24deg]'
							src='/nashi.png'
						/>
					</div>
				</Link>
				<div className='bg-[#EAD8FE] relative overflow-hidden rounded-xl h-[170px] px-[36px] py-[18px]'>
					<div className='h-[100%] flex flex-col justify-end'>
						<h1 className='text-xl z-[20] font-medium text-[#454649]'>
							Руководство по сайту
						</h1>
						<p className='text-base z-[20] font-light'>
							Как пользоваться платформой
						</p>
					</div>
					<div className='absolute -top-10 -right-10 '>
						<img
							className='w-[400px] z-[10] max-lg:opacity-25'
							src='/rukovdstvo.png'
						/>
					</div>
				</div>
			</Slider>
		</>
	)
}

export default HomeCarousel
