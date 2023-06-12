import { FC } from 'react'
import { MdAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

const AddAdvrt: FC = () => {
	return (
		<Link to='/createAdvrt'>
			<div className='bg-gradient '>
				<div className='bg-gradient-animation'></div>
				<MdAdd className='text-white w-16 h-16 max-lg:w-24 max-lg:h-24' />
			</div>
		</Link>
	)
}

export default AddAdvrt
