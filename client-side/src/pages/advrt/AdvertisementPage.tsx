import { useEffect, useState } from 'react'
import { MdOutlineNoPhotography } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import ErrorMessage from '../../app/components/ui/error/ErrorMessage'
import Loader from '../../app/components/ui/spiner/Loader'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import {
	useGetAdvrtByCategoryQuery,
	useGetAdvrtByIdQuery,
	useGetAdvrtsByCustomerIdQuery,
} from '../../services/AdvrtsService'
import { useGetCustomerByIdQuery } from '../../services/CustomerService'

import { formatToCurrency } from '../../utils/formatToCurrency'
import Album from './album/Album'
import AddToFav from './buttons/AddToFav'
import ShowContacts from './buttons/showContacts/ShowContacts'
import CustomerCard from './customerCard/CustomerCard'
import EditAdvrtModal from './editModal/EditAdvrtModal'
import Similar from './similar/Similar'

const AdvertisementPage = () => {
	const params = useParams()
	const [openEdit, setOpenEdit] = useState(false)
	const { user } = useTypedSelector(state => state.user)
	const [visible, setVisible] = useState(false)
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

	useEffect(() => {
		function handleScroll() {
			setScrollPosition(window.pageYOffset)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<div className='mt-14'>
			{isLoadingAdvrt ? (
				<div className='flex justify-center items-center mt-44'>
					<Loader />
				</div>
			) : isErrorAdvrt ? (
				<div className='mt-44'>
					<ErrorMessage />
				</div>
			) : advrt ? (
				<div className=''>
					<div className='flex justify-between'>
						<div
							className={
								scrollPosition >= 135 ? 'relative w-[50%]' : 'relative w-[55%]'
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

							<div className='mt-14'>
								<h1 className='text-3xl font-semibold mb-4'>Aдрес</h1>
								<p className=''>{advrt.adress}</p>
							</div>
							<div className='mt-14 border-b pb-12' style={{ whiteSpace: 'pre-wrap' }}>
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
								scrollPosition >= 135
									? 'fixed -right-16 top-[50px] w-[50%]'
									: 'ml-16 w-[50%]'
							}
						>
							<h1 className='text-4xl font-semibold'>
								{formatToCurrency(advrt.price)}
							</h1>
							<div className='mt-10'>
								{user.id === customer?.id ? (
									<>
										<button className='px-4 rounded-md  bg-[#EF7E1B] py-5 flex w-[320px] justify-center  items-center text-xl text-white'>
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
										<AddToFav />
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
