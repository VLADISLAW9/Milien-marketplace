import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorMessage from '../../app/components/ui/error/ErrorMessage'
import Loader from '../../app/components/ui/spiner/Loader'
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
import Similar from './similar/Similar'

const AdvertisementPage = () => {
	const images = [
		{
			id: 1,
			url: 'https://80.img.avito.st/image/1/1.ASpSfra4rcNk12_GXA54Nm_cr8Xs3y_LJNqvweLXpcnk.4LnlVolu8CxWZ82fRkLoBlGDOizZ8YfQM2bMYmg7yn4',
		},
		{
			id: 2,
			url: 'https://80.img.avito.st/image/1/1.NX86sLa4mZYMGVuTXKBGfAASm5CEERueTBSblIoZkZyM.N-B_VbjDPzYGL9vdM0_XugIvzubPL0WT0wAY-y-bt7c',
		},
		{
			id: 3,
			url: 'https://20.img.avito.st/image/1/1.r-9Tgra4AwZlK8EDAZTc7GkgAQDtI4EOJSYBBOMrCwzl.W7to5pOFwiwqbg679Btyk4SixDdoKAMtvzHlhz6l0EM',
		},
		{
			id: 4,
			url: 'https://00.img.avito.st/image/1/1.-sKOhLa4Viu4LZQu9p-JwbQmVC0wJdQj-CBUKT4tXiE4.ek0W4QmpeGVP_y_2LOTQPgYOizUuyDaLrXMsL-N3NE8',
		},
	]

	const params = useParams()
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

	console.log(scrollPosition)

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
							<h1 className='text-4xl font-semibold'>{advrt.title}</h1>
							<Album images={images} />
							<div className='mt-14'>
								<h1 className='text-3xl font-semibold mb-4'>Aдрес</h1>
								<p className=''>{advrt.adress}</p>
							</div>
							<div className='mt-14 border-b pb-12'>
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
								<AddToFav />
								<ShowContacts
									isLoading={isLoadingCustomer}
									isError={isErrorCustomer}
									customer={customer}
								/>
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
