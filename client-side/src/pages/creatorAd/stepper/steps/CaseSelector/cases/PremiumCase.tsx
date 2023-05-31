import { FC } from 'react'
import { BsCheck } from 'react-icons/bs'
import { IAdvrtData } from '../../../../CreateAdvrtPage'

interface IPremiumCaseProps {
	advrtData: IAdvrtData
	setAdvrtData: (data: IAdvrtData) => void
}

const PremiumCase: FC<IPremiumCaseProps> = ({ advrtData, setAdvrtData }) => {
	return (
		<div
			className={
				advrtData.case === 'prem'
					? 'shadow-xl  flex brightness-95 justify-center flex-col bg-white opacity-60 shadow-stone-300 bg-gradient-to-t from-[#166430] via-[#33752A]  to-[#629120] transition-transform  px-14 py-10 rounded-xl '
					: 'shadow-xl  flex justify-center flex-col bg-white shadow-stone-300 bg-gradient-to-t from-[#166430] via-[#33752A]  to-[#629120] transition-transform hover:scale-105 px-14 py-10 rounded-xl '
			}
		>
			<h1
				className='text-xl text-white
			font-[900] font-sans text-center'
			>
				Премиум
			</h1>
			<h1 className='mt-14 text-white font-[900] text-4xl font-sans text-center'>
				50 руб
			</h1>
			<ul className='mt-10 '>
				<li className='font-sans mb-2.5 flex items-center font-semibold'>
					<BsCheck className='w-5 h-5 rounded-full mr-1 text-[#166430] bg-white to-[#629120]' />
					<h1 className='text-white'>Лимит 30 фотографий</h1>
				</li>
				<li className='font-sans mb-2.5 flex items-center font-semibold'>
					<BsCheck className='w-5 h-5 rounded-full mr-1 text-[#166430] bg-white to-[#629120]' />
					<h1 className='text-white'>Красивое выделение</h1>
				</li>
				<li className='font-sans mb-2.5 flex items-center font-semibold'>
					<BsCheck className='w-5 h-5 rounded-full mr-1 text-[#166430] bg-white to-[#629120]' />
					<h1 className='text-white'>Накрутка просмотров</h1>
				</li>
				<li className='font-sans mb-2.5 flex items-center font-semibold'>
					<BsCheck className='w-5 h-5 rounded-full mr-1 text-[#166430] bg-white to-[#629120]' />
					<h1 className='text-white'>Место в топах</h1>
				</li>
			</ul>
			<button
				disabled={advrtData.case === 'prem'}
				onClick={() => {
					setAdvrtData({ ...advrtData, case: 'prem' })
				}}
				className={
					advrtData.case === 'prem'
						? 'px-4 mt-10 py-2 bg-white  text- translate-x-4 rounded-3xl h-[50px]  opacity-60 transition-opacity w-[150px]'
						: 'px-4 mt-10 py-2 bg-white  text- translate-x-4 rounded-3xl h-[50px]  hover:opacity-80 transition-opacity w-[150px]'
				}
			>
				<h1 className='text-transparent bg-clip-text bg-gradient-to-r font-semibold from-[#166430] via-[#33752A]  to-[#629120]'>
					{advrtData.case === 'prem' ? <>Выбран</> : <>Выбрать</>}
				</h1>
			</button>
		</div>
	)
}

export default PremiumCase
