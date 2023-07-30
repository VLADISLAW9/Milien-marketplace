import { CardMedia } from '@mui/material'
import { Image } from 'antd'
import { FC, useRef, useState } from 'react'
import { GrNext } from 'react-icons/gr'
import Slider from 'react-slick'

interface AlbumProps {
	images: string[]
}

const Album: FC<AlbumProps> = ({ images }) => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const sliderRef = useRef<Slider>(null)
	const [openCurrentImage, setOpenCurrentImage] = useState(0)
	const [visibleImageGroup, setVisibleImageGroup] = useState(false)

	const prevSlide = () => {
		if (sliderRef.current) {
			sliderRef.current.slickPrev()
		}
	}

	const nextSlide = () => {
		if (sliderRef.current) {
			sliderRef.current.slickNext()
		}
	}

	const settings = {
		customPaging: function (i: number) {
			return (
				<a>
					<CardMedia
						className='album-thumbnail'
						sx={{ width: '98px', height: '70px' }}
						image={images[i]}
					/>
				</a>
			)
		},

		dots: true,
		dotsClass: 'album-dots',
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		beforeChange: (current: number, next: number) => setCurrentSlide(next),
		appendDots: (dots: any) => (
			<div>
				<ul className='flex'> {dots} </ul>
			</div>
		),
	}

	return (
		<div className='relative album-container'>
			<Image.PreviewGroup
				//@ts-ignore

				preview={{
					visible: visibleImageGroup,
					onVisibleChange: value => {
						setVisibleImageGroup(value)
					},
					current: openCurrentImage,
				}}
			>
				{images.map(img => (
					<Image className='hidden' width={100} src={img} />
				))}
				<Slider {...settings} ref={sliderRef}>
					{images.map((img, index) => (
						<button
							key={index}
							onClick={() => {
								setVisibleImageGroup(true)
								setOpenCurrentImage(index)
							}}
						>
							<CardMedia sx={{ width: '100%', height: '600px' }} image={img} />
						</button>
					))}
				</Slider>
			</Image.PreviewGroup>

			{images.length > 1 && (
				<>
					<div className='absolute top-[42%] -left-[10px]'>
						<button
							onClick={prevSlide}
							className='w-[40px] h-[40px] flex justify-center items-center bg-white rounded-lg shadow-lg z-[100] hover:bg-stone-100 transition-colors'
						>
							<GrNext className='rotate-180' />
						</button>
					</div>

					<div className='absolute top-[42%] -right-[10px]'>
						<button
							onClick={nextSlide}
							className='w-[40px] h-[40px] flex justify-center items-center bg-white rounded-lg shadow-lg z-[100] hover:bg-stone-100 transition-colors'
						>
							<GrNext />
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default Album
