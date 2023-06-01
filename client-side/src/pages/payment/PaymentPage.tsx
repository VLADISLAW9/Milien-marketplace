import { FC, useEffect, useState } from 'react'
import { BiCheck, BiError } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import CreateAdvrtService from '../../services/CreatorAdvrtService'

const PaymentPage: FC = () => {
	const { paymentId } = useTypedSelector(state => state.payment)

	const [isLoading, setIsLoading] = useState(false)
	const [check, setCheck] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const response = await CreateAdvrtService.cheakPayment(paymentId)
				setCheck(response.data)
				if (check) {
					try {
						const addPaid = await CreateAdvrtService.createPaidAdvrt()
					} catch (e) {
						console.log(e)
					}
				}
			} catch (e) {
				console.log(e)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	if (isLoading) {
		// Render loading state if still fetching the result
		return <div>Loading...</div>
	}

	if (check) {
		return (
			<div className='shadow-2xl shadow-stone-300 bg-white rounded-xl'>
				<div className='bg-[#33BA87] flex justify-center items-center rounded-t-xl px-28 py-10'>
					<BiCheck className='w-32 h-32 text-white' />
				</div>
				<div className='px-20 py-10'>
					<h1 className='text-center font-sans text-2xl font-bold text-stone-700'>
						Спасибо за покупку
					</h1>
					<p className='mt-3 text-center'>
						Ваше объявление с тарифом "Премиум" <br /> успешно опубликовано
					</p>
					<Link to='/' className='flex justify-center items-center mt-16 '>
						<button className='w-[200px] rounded-2xl  px-4 py-3 bg-[#33BA87] text-white'>
							Вернуться
						</button>
					</Link>
				</div>
			</div>
		)
	} else {
		return (
			<div className='shadow-2xl shadow-stone-300 bg-white rounded-xl'>
				<div className='bg-red-500 flex justify-center items-center rounded-t-xl px-28 py-10'>
					<BiError className='w-32 h-32 text-white' />
				</div>
				<div className='px-20 py-10'>
					<h1 className='text-center font-sans text-2xl font-bold text-stone-700'>
						Ваш платеж не прошел
					</h1>
					<p className='mt-3 text-center'>
						Ваше объявление опубликовано <br /> с тарифом "Бесплатный"
					</p>
					<Link to='/' className='flex justify-center items-center mt-16 '>
						<button className='w-[200px] rounded-2xl  px-4 py-3 bg-red-500 text-white'>
							Вернуться
						</button>
					</Link>
				</div>
			</div>
		)
	}
}

export default PaymentPage
