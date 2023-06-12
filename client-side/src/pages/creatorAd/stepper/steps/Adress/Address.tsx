import { FC } from 'react'
import { IAdvrtData } from '../../../CreateAdvrtPage'

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
			<div className='mt-20 mb-20 flex justify-center items-center'>
				<input
					className='px-8 py-4 border-2'
					value={advrtData.adress ? advrtData.adress : ''}
					onChange={(e: any) => {
						setAdvrtData({ ...advrtData, adress: e.target.value })
					}}
					placeholder='Введите адрес'
				/>
			</div>
		</div>
	)
}

export default Address
