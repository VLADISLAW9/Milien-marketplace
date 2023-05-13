import { FC } from 'react'
import { BsHeart } from 'react-icons/bs'

const AddToFav: FC = () => {
	return (
		<button className='px-4 rounded-md  bg-[#EF7E1B] py-5 flex w-[320px] justify-center  items-center text-xl text-white'>
			Добавить в избранное
			<BsHeart className='ml-3' />
		</button>
	)
}

export default AddToFav
