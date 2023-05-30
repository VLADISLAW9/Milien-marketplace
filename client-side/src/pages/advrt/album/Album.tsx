import { CardMedia } from '@mui/material'
import { Image } from 'antd'
import { FC, useState } from 'react'
import { MdOutlineNavigateNext } from 'react-icons/md'

interface IAlbumsProps {
	images: string[] 
}

const Album: FC<IAlbumsProps> = ({ images }) => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [isHover, setIsHover] = useState(false)

	const prevSlide = () => {
		if (currentSlide === 0) {
			setCurrentSlide(images.length - 1)
		} else {
			setCurrentSlide(currentSlide - 1)
		}
	}

	const nextSlide = () => {
		if (currentSlide === images.length - 1) {
			setCurrentSlide(0)
		} else {
			setCurrentSlide(currentSlide + 1)
		}
	}

	const currentImage = images[currentSlide]

	return (
		<div className='mt-10 relative'>
			<div
				onMouseLeave={() => setIsHover(false)}
				onMouseEnter={() => setIsHover(true)}
				className='cursor-pointer flex relative justify-center'
			>
				<div>
					<div
						className='absolute inset-0'
						style={{
							backgroundImage: `${images[currentSlide]}`,
							filter: 'blur(3px)',
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
						}}
					></div>
					<div className='flex justify-center items-center'>
						<Image className='max-h-[800px]' src={images[currentSlide]} />
					</div>
					{isHover && (
						<div className='absolute top-[42%] left-3'>
							<button onClick={prevSlide} className='p-2'>
								<MdOutlineNavigateNext className='text-white w-12 h-12 rotate-180' />
							</button>
						</div>
					)}
					{isHover && (
						<div className='absolute top-[42%] right-3'>
							<button onClick={nextSlide} className='text-white p-2 '>
								<MdOutlineNavigateNext className='text-white w-12 h-12 ' />
							</button>
						</div>
					)}
				</div>
			</div>

			<div className='grid grid-cols-8 gap-2 mt-3'>
				{images?.map((img, index) => (
					<div
						className={
							currentSlide === index
								? 'border-2 border-[#166430]'
								: 'border-2 cursor-pointer border-white hover:border-[#1d9246]'
						}
						onClick={() => setCurrentSlide(index)}
					>
						<CardMedia
							key={img}
							component='img'
							sx={{ height: 55, width: 80 }}
							image={img}
							alt='cover'
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default Album
