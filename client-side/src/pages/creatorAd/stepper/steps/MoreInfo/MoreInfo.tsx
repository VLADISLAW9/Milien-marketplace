import { FC } from 'react'
import { IAdvrtData } from '../../../CreateAdvrtPage'
import ImagesUploader from './ImagesUploader'


interface IMoreInfoProps {
	advrtData: IAdvrtData
	setAdvrtData: (data: IAdvrtData) => void
}

const MoreInfo: FC<IMoreInfoProps> = ({ advrtData, setAdvrtData }) => {
	return (
		<div>
			<div className='py-4 border-b text-[22px]'>
				<h1 className='font-semibold'>Подробности</h1>
			</div>
			<div className='flex justify-center flex-row'>
				<ImagesUploader advrtData={advrtData} setAdvrtData={setAdvrtData} />
			</div>
		</div>
	)
}

export default MoreInfo
