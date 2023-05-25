import { FC } from 'react'
import { MdAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

const AddAdvrt: FC = () => {
	return (
		<Link to='/createAdvrt'>
			<div className='bg-gradient '>
				<div className='bg-gradient-animation'></div>
				<MdAdd className='text-white w-16 h-16' />
			</div>
		</Link>
	)
}

export default AddAdvrt
