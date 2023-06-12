import { FC } from 'react'
import { IAdvrtData } from '../../../CreateAdvrtPage'
import PhotoUploader from './PhotoUploder'

interface IMoreInfoProps {
	advrtData: IAdvrtData
	setAdvrtData: (data: IAdvrtData) => void
}

const MoreInfo: FC<IMoreInfoProps> = ({ advrtData, setAdvrtData }) => {
	return (
		<div className='flex justify-center flex-col'>
			<div className='py-4 border-b text-[22px]'>
				<h1 className='font-semibold'>Подробности</h1>
			</div>

			<div className='flex justify-center flex-col items-center mt-5 '>
				<div className='flex justify-center'>
					<PhotoUploader advrtData={advrtData} setAdvrtData={setAdvrtData} />
				</div>
				<div className='mt-5'>
					<textarea
						value={advrtData.description ? advrtData.description : ''}
						onChange={e => {
							setAdvrtData({ ...advrtData, description: e.target.value })
						}}
						placeholder='Введите описание объявления'
						className='border-2 max-lg:w-[600px] w-[848px] h-[250px] rounded-lg p-3'
					/>
				</div>
			</div>
		</div>
	)
}

export default MoreInfo
