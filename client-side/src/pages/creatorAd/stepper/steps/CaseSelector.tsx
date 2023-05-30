import { FC } from 'react'

const CaseSelector: FC = () => {
	return (
		<div>
			<div className='py-4 border-b text-[22px]'>
				<h1 className='font-semibold'>Выберите пакет услуг</h1>
			</div>
			<div className='mt-5 flex justify-center gap-10'>
				<div className='border-2 p-5 rounded-lg'></div>
				<div className='border-2 p-5 rounded-lg'></div>
			</div>
		</div>
	)
}

export default CaseSelector
