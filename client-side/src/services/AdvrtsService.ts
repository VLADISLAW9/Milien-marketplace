import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IAdvrt } from '../types/IAdvrt'

export const advrtsApi = createApi({
	reducerPath: 'advrtsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://37.140.199.105:5000',
	}),
	tagTypes: ['advrt'],
	endpoints: build => ({
		getAllAdvrts: build.query<IAdvrt[], { limit: number; page: number }>({
			query: ({ limit, page }) => ({
				url: 'Ad/GetAll',
				params: {
					limit: 10,
					page: 2,
				}, 
			}),
			providesTags: result => ['advrt'],
		}),
		getAdvrtById: build.query<IAdvrt, string | undefined>({
			query: id => ({
				url: '/Ad/GetAdById',
				params: {
					id: id,
				},
			}),
			providesTags: result => ['advrt'],
		}),
		getAdvrtsByCustomerId: build.query<
			IAdvrt[],
			number | string | undefined | null
		>({
			query: customerId => ({
				url: '/Ad/GetAdsByCustomerId/' + customerId,
			}),
			providesTags: result => ['advrt'],
		}),
		getAdvrtByCategory: build.query<IAdvrt[], string | undefined>({
			query: category => ({
				url: '/Ad/GetAdsByCategory',
				params: {
					category: category,
				},
			}),
			providesTags: result => ['advrt'],
		}),
	}),
})

export const {
	useGetAllAdvrtsQuery,
	useGetAdvrtByIdQuery,
	useGetAdvrtByCategoryQuery,
	useGetAdvrtsByCustomerIdQuery,
} = advrtsApi
