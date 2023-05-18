import { FC } from 'react'

const Loader: FC = () => {
	return (
		<div className='lds-ring flex justify-center items-center	'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Loader
