import axios from 'axios'
import React, { FC, useEffect, useRef, useState } from 'react'
import AdvertisementItem_grid from '../../app/components/ui/Advertisement/AdvertisementItem_grid'
import YandexAd_grid from '../../app/components/ui/Advertisement/YandexAd_grid'
import ErrorMessage from '../../app/components/ui/error/ErrorMessage'
import Loader from '../../app/components/ui/spiner/Loader'
import { useFetching } from '../../hooks/use-fetching'
import { useObserver } from '../../hooks/use-observer'
import { IAdvrt } from '../../types/IAdvrt'
import { getPageCount, getPagesArray } from '../../utils/pages'

const HomePage: FC = () => {
	const [ads, setAds] = useState<IAdvrt[]>([])
	const [newAds, setNewAds] = useState<IAdvrt[]>([])
	const [newServices, setNewServices] = useState<IAdvrt[]>([])
	const [totalPages, setTotalPages] = useState(0)
	const [limit, setLimit] = useState(8)
	const [page, setPage] = useState(1)
	const lastElement = useRef<any>()
	let pagesArray = getPagesArray(totalPages)

	const [fetchNewServices, isNewServicesLoading, newServicesError] =
		useFetching(async () => {
			const response = await axios.get(
				'https://api.xn--h1agbg8e4a.xn--p1ai/Ad/GetNewServices'
			)
			setNewServices([...response.data])
		})

	const [fetchNewAds, isNewAdsLoading, newAdsError] = useFetching(async () => {
		const response = await axios.get(
			'https://api.xn--h1agbg8e4a.xn--p1ai/Ad/GetNewAds'
		)
		setNewAds([...response.data])
	})

	const [fetchAds, isAdsLoading, adsError] = useFetching(async () => {
		if (page === 1) {
			const response = await axios.get(
				'https://api.xn--h1agbg8e4a.xn--p1ai/Ad/GetAll',
				{
					params: { limit: limit, page: page, refreshAds: true },
				}
			)
			const totalCount = response.headers['count']
			setTotalPages(getPageCount(totalCount, limit))
			setAds([...ads, ...response.data])
		} else {
			const response = await axios.get(
				'https://api.xn--h1agbg8e4a.xn--p1ai/Ad/GetAll',
				{
					params: { limit: limit, page: page },
				}
			)
			const totalCount = response.headers['count']
			console.log(totalCount)
			setTotalPages(getPageCount(totalCount, limit))
			setAds([...ads, ...response.data])
		}
	})

	useObserver(lastElement, page < totalPages, isAdsLoading, () => {
		setPage(page + 1)
	})

	useEffect(() => {
		fetchNewAds()
		fetchNewServices()
	}, [])

	useEffect(() => {
		fetchAds()
	}, [page])

	const changePage = (page: number) => {
		setPage(page)
		fetchAds()
	}

	return (
		<div>
			{newAds.length > 0 && (
				<>
					<h1 className='mt-14 text-3xl'>Новые объвления</h1>
					<ul
						className={
							'mt-7 grid grid-cols-6  gap-5 max-2xl:grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-xl:gap-3 '
						}
					>
						{newAds.map(advrt => (
							<AdvertisementItem_grid
								mini={true}
								key={advrt.id}
								advrt_data={advrt}
							/>
						))}
					</ul>

					{isNewAdsLoading && (
						<div className='flex justify-center items-center mt-36'>
							<Loader />
						</div>
					)}
					{newAdsError && (
						<div className='flex justify-center items-center mt-36'>
							<ErrorMessage />
						</div>
					)}
				</>
			)}

			{newServices.length > 0 && (
				<>
					<h1 className='mt-14 text-3xl'>Новые услуги</h1>
					<ul
						className={
							'mt-7 grid grid-cols-6  gap-5 max-2xl:grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3  max-xl:gap-3'
						}
					>
						{newServices.map(advrt => (
							<AdvertisementItem_grid
								mini={true}
								key={advrt.id}
								advrt_data={advrt}
							/>
						))}
					</ul>
					{isNewServicesLoading && (
						<div className='flex justify-center items-center mt-36'>
							<Loader />
						</div>
					)}
					{newServicesError && (
						<div className='flex justify-center items-center mt-36'>
							<ErrorMessage />
						</div>
					)}
				</>
			)}
			{!adsError && <h1 className='mt-14 text-3xl'>Рекомендации</h1>}
			<ul
				className={
					'mt-7 grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 gap-5 max-xl:gap-3 '
				}
			>
				{ads.map((advrt, index) => (
					<React.Fragment key={advrt.id}>
						<AdvertisementItem_grid key={advrt.id} advrt_data={advrt} />
						{index !== 0 && (index + 1) % 5 === 0 && (
							<YandexAd_grid adNumber={index / 5} />
						)}
					</React.Fragment>
				))}
			</ul>

			<div ref={lastElement} className='h-[20px]'></div>
			{isAdsLoading && (
				<div className='flex justify-center items-center mt-36'>
					<Loader />
				</div>
			)}
			{adsError && (
				<div className='flex justify-center items-center mt-40 max-lg:mt-[340px]'>
					<ErrorMessage />
				</div>
			)}
		</div>
	)
}

export default HomePage
