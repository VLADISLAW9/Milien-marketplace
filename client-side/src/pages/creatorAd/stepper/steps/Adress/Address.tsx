import { FC } from 'react'
import { IAdvrtData } from '../../../CreateAdvrtPage'
import MapComponent from './MapComponent'

interface IAdressProps {
	advrtData: IAdvrtData
	setAdvrtData: (data: IAdvrtData) => void
}

const Address: FC<IAdressProps> = ({ advrtData, setAdvrtData }) => {
	return (
		<div>
			<div className='py-4 border-b mb-5 text-[22px]'>
				<h1 className='font-semibold'>Адрес</h1>
			</div>
			<MapComponent advrtData={advrtData} setAdvrtData={setAdvrtData} />
		</div>
	)
}

export default Address
