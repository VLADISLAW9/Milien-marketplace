import { FC } from 'react'
import { IAdvrtData } from '../../../CreateAdvrtPage'
import FreeCase from './cases/FreeCase'
import PremiumCase from './cases/PremiumCase'

interface ICaseSelectorProps {
	advrtData: IAdvrtData
	setAdvrtData: (data: IAdvrtData) => void
}

const CaseSelector: FC<ICaseSelectorProps> = ({ advrtData, setAdvrtData }) => {
	return (
		<div>
			<div className='py-4 border-b text-[22px]'>
				<h1 className='font-semibold'>Выберите пакет услуг</h1>
			</div>
			<div className='mt-5 flex justify-center max-lg:gap-3 gap-10'>
				<FreeCase advrtData={advrtData} setAdvrtData={setAdvrtData} />
				<PremiumCase advrtData={advrtData} setAdvrtData={setAdvrtData}/>
			</div>
		</div>
	)
}

export default CaseSelector
