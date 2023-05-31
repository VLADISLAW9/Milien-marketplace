import { FC } from 'react'
import { BsCheck } from 'react-icons/bs'
import { IAdvrtData } from '../../../../CreateAdvrtPage'

interface IFreeCaseProps {
	advrtData: IAdvrtData
	setAdvrtData: (data: IAdvrtData) => void
}

const FreeCase: FC<IFreeCaseProps> = ({ advrtData, setAdvrtData }) => {
	return (
		<div
			className={
				advrtData.case === 'free'
					? 'shadow-xl brightness-95 flex justify-center  flex-col bg-white shadow-stone-300 transition-transform  px-14 py-10 rounded-xl '
					: 'shadow-xl  flex justify-center  flex-col bg-white shadow-stone-300 transition-transform hover:scale-105 px-14 py-10 rounded-xl '
			}
		>
			<h1
				className='text-xl 
			font-[900] font-sans text-center'
			>
				Базовый
			</h1>
			<h1 className='mt-14 text-transparent bg-clip-text bg-gradient-to-r from-[#166430] via-[#33752A]  to-[#629120] font-[900] text-4xl font-sans text-center'>
				Бесплатно
			</h1>
			<ul className='mt-10 '>
				<li className='font-sans mb-2.5 flex items-center font-semibold'>
					<BsCheck className='w-5 h-5 rounded-full mr-1 text-white bg-gradient-to-r  from-[#166430] via-[#33752A]  to-[#629120]' />
					<h1>Лимит 15 фотографий</h1>
				</li>
				<li className='font-sans mb-2.5 flex items-center font-semibold'>
					<BsCheck className='w-5 h-5 rounded-full mr-1 text-white bg-gradient-to-r opacity-0 from-[#166430] via-[#33752A]  to-[#629120]' />
					<h1 className='text-stone-300'>Красивое выделение</h1>
				</li>
				<li className='font-sans mb-2.5 flex items-center font-semibold'>
					<BsCheck className='w-5 h-5 rounded-full mr-1 text-white bg-gradient-to-r opacity-0 from-[#166430] via-[#33752A]  to-[#629120]' />
					<h1 className='text-stone-300'>Накрутка просмотров</h1>
				</li>
				<li className='font-sans mb-2.5 flex items-center font-semibold'>
					<BsCheck className='w-5 h-5 rounded-full mr-1 text-white bg-gradient-to-r opacity-0 from-[#166430] via-[#33752A]  to-[#629120]' />
					<h1 className='text-stone-300'>Место в топах</h1>
				</li>
			</ul>
			<button
				disabled={advrtData.case === 'free'}
				onClick={() => {
					setAdvrtData({ ...advrtData, case: 'free' })
					console.log('fdsafdsafds')
				}}
				className={
					advrtData.case === 'free'
						? 'px-4 mt-10 py-2 bg-gradient-to-t from-[#166430] via-[#33752A]  to-[#629120]  text-white translate-x-4 h-[50px] rounded-3xl opacity-60 transition-opacity w-[150px]'
						: 'px-4 mt-10 py-2 bg-gradient-to-t from-[#166430] via-[#33752A]  to-[#629120]  text-white translate-x-4 h-[50px] rounded-3xl hover:opacity-80 transition-opacity w-[150px]'
				}
			>
				{advrtData.case === 'free' ? <>Выбран</> : <>Выбрать</>}
			</button>
		</div>
	)
}

export default FreeCase
