import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IAdvrt } from '../types/IAdvrt'

export const advrtsApi = createApi({
	reducerPath: 'advrtsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://jsonplaceholder.typicode.com/',
	}),
	tagTypes: ['advrt'],
	endpoints: build => ({
		getAllAdvrts: build.query<IAdvrt[], { limit: number; page: number }>({
			query: ({ limit, page }) => ({
				url: '/posts',
				params: {
					_limit: limit,
					_page: page,
				},
			}),
			providesTags: result => ['advrt'],
		})
	}),
})

export const { useGetAllAdvrtsQuery } = advrtsApi
