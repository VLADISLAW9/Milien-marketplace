import { ChangeEvent, FC } from 'react'
import { FaRubleSign } from 'react-icons/fa'
import { IAdvrtData } from '../../CreateAdvrtPage'

interface IParamsProps {
	advrtData: IAdvrtData
	setAdvrtData: (data: IAdvrtData) => void
}

const Params: FC<IParamsProps> = ({ advrtData, setAdvrtData }) => {
	const formatPrice = (value: string) => {
		const number = parseInt(value.replace(/\D/g, ''), 10)
		if (isNaN(number)) {
			return ''
		}
		return number.toLocaleString('ru-RU')
	}

	const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		const formattedPrice = formatPrice(value)
		setAdvrtData({ ...advrtData, price: formattedPrice })
	}

	return (
		<div>
			<div className='py-4 border-b text-[22px]'>
				<h1 className='font-semibold'>Параметры</h1>
			</div>
			<div className='flex flex-col justify-center mt-10 '>
				<div className='flex justify-center'>
					<input
						type='text'
						value={advrtData.title ? advrtData.title : ''}
						placeholder='Введите название объявления'
						className='px-4 py-3 border w-[300px] outline-none rounded-3xl border-stone-400'
						onChange={e => {
							setAdvrtData({ ...advrtData, title: e.target.value })
						}}
					/>
				</div>
				<div className='flex justify-center mt-4'>
					<div className='relative'>
						<input
							onInput={handlePriceChange}
							value={advrtData.price ? advrtData.price : ''}
							placeholder='Укажите цену на объявление'
							className='px-4 py-3 border w-[300px] pr-10 outline-none rounded-3xl border-stone-400'
						/>
						<div className='absolute top-[17px] right-6'>
							<FaRubleSign className='text-stone-400' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Params
