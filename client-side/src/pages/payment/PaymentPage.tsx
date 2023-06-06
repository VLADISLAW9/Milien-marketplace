import { Dispatch } from '@reduxjs/toolkit'
import { FC, useEffect, useState } from 'react'
import { BiCheck, BiError } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../app/components/ui/spiner/Loader'
import { useActions } from '../../hooks/use-actions'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import CreateAdvrtService from '../../services/CreatorAdvrtService'
import { removeSpacesFromString } from '../../utils/removeSpacesFromString'

const PaymentPage: FC = () => {
	const { paymentId } = useTypedSelector(state => state.payment)
	const dispatch = useDispatch<Dispatch<any>>()
	const { removeAdvrtFromStorage } = useActions()
	const [isLoading, setIsLoading] = useState(false)
	const [check, setCheck] = useState(false)
	const { advt: advrtData } = useTypedSelector(state => state.payment)
	const [isPaymentChecked, setIsPaymentChecked] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const response = await CreateAdvrtService.cheakPayment(paymentId)
				// ЕСЛИ ВСЕ ОК ТО ПЛАТНАЯ ОБЪЯВА, ЕСЛИ НЕТ ТО СОЗДАЕМ ДЕФОЛТНОЕ
				if (response.data) {
					setCheck(response.data)
					if (
						advrtData &&
						advrtData.adress &&
						advrtData.category &&
						advrtData.description &&
						advrtData.images &&
						advrtData.price &&
						advrtData.subcategory &&
						advrtData.title
					) {
						const addPaid = await CreateAdvrtService.createPaidAdvrt(
							advrtData.title,
							advrtData.description,
							removeSpacesFromString(advrtData.price),
							advrtData.adress,
							advrtData.category,
							advrtData.subcategory,
							advrtData.images
						)
					}
				}
			} catch (e) {
				console.log(e)
			} finally {
				setIsLoading(false)
				setIsPaymentChecked(true)
				dispatch(removeAdvrtFromStorage())
			}
		}

		fetchData()
	}, [])

	if (isLoading || !isPaymentChecked) {
		// Render loading state if still fetching the result or payment check is not completed yet
		return (
			<div>
				<Loader />
			</div>
		)
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
