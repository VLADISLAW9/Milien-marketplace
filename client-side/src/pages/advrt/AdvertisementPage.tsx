import { Dispatch } from '@reduxjs/toolkit'
import { useContext, useEffect, useState } from 'react'
import { BsHeart } from 'react-icons/bs'
import { MdOutlineNoPhotography } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorMessage from '../../app/components/ui/error/ErrorMessage'
import Loader from '../../app/components/ui/spiner/Loader'
import { UserContext } from '../../context/UserContext'
import { useActions } from '../../hooks/use-actions'
import { useFetching } from '../../hooks/use-fetching'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import {
	useGetAdvrtByCategoryQuery,
	useGetAdvrtByIdQuery,
	useGetAdvrtsByCustomerIdQuery,
} from '../../services/AdvrtsService'
import CreateAdvrtService from '../../services/CreatorAdvrtService'
import { useGetCustomerByIdQuery } from '../../services/CustomerService'

import FavoriteAdvrtService from '../../services/FavouriteAdvrtService'
import { formatToCurrency } from '../../utils/formatToCurrency'
import Album from './album/Album'
import ShowContacts from './buttons/showContacts/ShowContacts'
import CustomerCard from './customerCard/CustomerCard'
import EditAdvrtModal from './editModal/EditAdvrtModal'
import Similar from './similar/Similar'

const AdvertisementPage = () => {
	const { addAdvrtToStorage, addPaymentId } = useActions()
	const params = useParams()
	const dispatch = useDispatch<Dispatch<any>>()
	const [openEdit, setOpenEdit] = useState(false)
	const { userData, isUserLoading, userError } = useContext(UserContext)
	const { isAuth } = useTypedSelector(state => state.user)
	const [visible, setVisible] = useState(false)
	const [isFavAd, setIsFavAd] = useState(false)
	const [checker, setChecker] = useState(true)
	const navigate = useNavigate()

	const {
		data: advrt,
		isLoading: isLoadingAdvrt,
		isError: isErrorAdvrt,
	} = useGetAdvrtByIdQuery(params.id)

	const {
		data: similar_advrts,
		isLoading: isLoadingSimilar,
		isError: isErrorSimilar,
	} = useGetAdvrtByCategoryQuery(advrt?.category)

	const {
		data: customer,
		isLoading: isLoadingCustomer,
		isError: isErrorCustomer,
	} = useGetCustomerByIdQuery(advrt?.customerId)

	const {
		data: customer_advrts,
		isLoading: isLoadingCustomerAdvrts,
		isError: isErrorCustomerAdvrts,
	} = useGetAdvrtsByCustomerIdQuery(advrt?.customerId)

	const [scrollPosition, setScrollPosition] = useState(window.pageYOffset)

	const handleOpenEdit = () => {
		setOpenEdit(true)
	}

	const handleCloseEdit = () => {
		setOpenEdit(false)
	}

	const [checkIsFav, favLoading, favError] = useFetching(async () => {
		if (isAuth) {
			const isFav = await FavoriteAdvrtService.CheckIsFavourite(
				Number(params.id)
			)
			setIsFavAd(isFav.data)
			console.log(isFav, 'in fetch')
		}
	})

	const [upgradeToPremium, upgrageLoading, upgradeError] = useFetching(
		async () => {
			if (advrt) {
				const navigate = await CreateAdvrtService.navigateToYookassa().then(
					res => {
						dispatch(addPaymentId(res.data.paymentId))
						dispatch(addAdvrtToStorage({ id: advrt.id, upgrade: true }))
						window.location.href = res.data.paymentUrl
					}
				)
			}
		}
	)

	const [addToFav, loadingAddToFav, addToFavError] = useFetching(async () => {
		if (advrt && isAuth) {
			const response = await FavoriteAdvrtService.AddToFavourite(advrt.id)
		} else {
			navigate('/login')
		}
	})

	const [removeFromFav, loadingRemoveFromFav, errorRemoveFromFav] = useFetching(
		async () => {
			if (advrt) {
				const response = await FavoriteAdvrtService.RemoveFromFavourite(
					advrt.id
				)
			}
		}
	)

	useEffect(() => {
		checkIsFav()
	}, [])

	useEffect(() => {
		function handleScroll() {
			setScrollPosition(window.pageYOffset)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const handleBuyPremium = () => {
		upgradeToPremium()
	}

	const handleAddToFav = () => {
		setIsFavAd(true)
		addToFav()
	}

	const handleDeleteFromFav = () => {
		setIsFavAd(false)
		removeFromFav()
	}

	return (
		<div className='mt-14'>
			{isLoadingAdvrt || isUserLoading ? (
				<div className='flex justify-center items-center mt-44'>
					<Loader />
				</div>
			) : isErrorAdvrt || userError ? (
				<div className='flex justify-center items-center mt-40 max-lg:mt-[340px]'>
					<ErrorMessage />
				</div>
			) : advrt ? (
				<div className=''>
					<div className='flex max-lg:flex-col justify-between'>
						<div
							className={
								scrollPosition >= 19
									? 'max-lg:w-[100%] relative w-[50%]'
									: 'max-lg:w-[100%] relative w-[55%]'
							}
						>
							<div className='max-w-[700px]'>
								<h1 className='text-4xl break-words font-semibold max-w-[700px]'>
									{advrt.title}
								</h1>
							</div>

							{advrt.photoPath.length > 0 ? (
								<Album images={advrt.photoPath} />
							) : (
								<div className='mt-10 rounded-2xl h-[396px] bg-stone-100 flex justify-center items-center w-[100%] '>
									<MdOutlineNoPhotography className='text-stone-300 w-20 h-20' />
								</div>
							)}
							<div className='hidden max-xl:block '>
								<div className={'mt-10 w-[100%]'}>
									<h1 className='text-5xl font-semibold'>
										{formatToCurrency(advrt.price)}
									</h1>
									<div className='flex items-center'>
										<div className='mt-10 '>
											{isAuth && userData && userData.id === customer?.id ? (
												<>
													<button
														onClick={handleBuyPremium}
														className='px-4 rounded-md  bg-[#EF7E1B] py-5 flex w-[320px] justify-center  items-center text-xl text-white'
													>
														Продвинуть объявление
													</button>
													<button
														onClick={handleOpenEdit}
														className='mt-4 rounded-md px-4 bg-[#EF7E1B]/40 py-5 w-[320px] justify-center flex items-center text-xl text-[#EF7E1B]'
													>
														Редактировать
													</button>
													<EditAdvrtModal
														advrt={advrt}
														open={openEdit}
														handleCloseEdit={handleCloseEdit}
													/>
												</>
											) : (
												<>
													{!isFavAd && advrt ? (
														<button
															disabled={favLoading}
															onClick={handleAddToFav}
															className='px-4 rounded-md  bg-[#EF7E1B] py-5 flex h-[68px] w-[320px] justify-center  items-center text-xl text-white'
														>
															{!favLoading && (
																<>
																	<h1>Добавить в избранное</h1>
																	<BsHeart className='ml-3' />
																</>
															)}
														</button>
													) : (
														<button
															onClick={handleDeleteFromFav}
															className='px-4 rounded-md  bg-[#EF7E1B] py-5 flex w-[320px] justify-center  items-center text-xl text-white'
														>
															Удалить из избранного
															<BsHeart className='ml-3' />
														</button>
													)}

													<ShowContacts
														isLoading={isLoadingCustomer}
														isError={isErrorCustomer}
														customer={customer}
													/>
												</>
											)}
										</div>
										<div>
											<CustomerCard
												customer_advrts={customer_advrts}
												isLoading={isLoadingCustomer}
												isError={isErrorCustomer}
												customer={customer}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className='mt-14'>
								<h1 className='text-3xl font-semibold mb-4'>Aдрес</h1>
								<p className=''>{advrt.adress}</p>
							</div>
							<div
								className='mt-14 border-b pb-12'
								style={{ whiteSpace: 'pre-wrap' }}
							>
								<h1 className='text-3xl font-semibold mb-4'>Описание</h1>
								<p className=''>{advrt.description}</p>
							</div>
							<Similar
								isError={isErrorSimilar}
								isLoading={isErrorSimilar}
								similar={similar_advrts}
							/>
						</div>
						<div
							className={
								scrollPosition >= 19
									? 'max-lg:w-[100%] max-lg:hidden fixed -right-16 top-[135px] w-[50%]'
									: 'ml-16 w-[50%] max-lg:hidden'
							}
						>
							<h1 className='text-4xl font-semibold'>
								{formatToCurrency(advrt.price)}
							</h1>
							<div className='mt-10'>
								{isAuth && userData && userData.id === customer?.id ? (
									<>
										<button
											onClick={handleBuyPremium}
											className='px-4 rounded-md  bg-[#EF7E1B] py-5 flex w-[320px] justify-center  items-center text-xl text-white'
										>
											Продвинуть объявление
										</button>
										<button
											onClick={handleOpenEdit}
											className='mt-4 rounded-md px-4 bg-[#EF7E1B]/40 py-5 w-[320px] justify-center flex items-center text-xl text-[#EF7E1B]'
										>
											Редактировать
										</button>
										<EditAdvrtModal
											advrt={advrt}
											open={openEdit}
											handleCloseEdit={handleCloseEdit}
										/>
									</>
								) : (
									<>
										{!isFavAd && advrt ? (
											<button
												disabled={favLoading}
												onClick={handleAddToFav}
												className='px-4 rounded-md  bg-[#EF7E1B] py-5 flex h-[68px] w-[320px] justify-center  items-center text-xl text-white'
											>
												{!favLoading && (
													<>
														<h1>Добавить в избранное</h1>
														<BsHeart className='ml-3' />
													</>
												)}
											</button>
										) : (
											<button
												onClick={handleDeleteFromFav}
												className='px-4 rounded-md  bg-[#EF7E1B] py-5 flex w-[320px] justify-center  items-center text-xl text-white'
											>
												Удалить из избранного
												<BsHeart className='ml-3' />
											</button>
										)}

										<ShowContacts
											isLoading={isLoadingCustomer}
											isError={isErrorCustomer}
											customer={customer}
										/>
									</>
								)}
							</div>
							<CustomerCard
								customer_advrts={customer_advrts}
								isLoading={isLoadingCustomer}
								isError={isErrorCustomer}
								customer={customer}
							/>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default AdvertisementPage
