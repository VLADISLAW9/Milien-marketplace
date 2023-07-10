import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { ICustomer } from '../types/ICustomer'

export const customersApi = createApi({
	reducerPath: 'customersApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.xn--h1agbg8e4a.xn--p1ai',
	}),
	tagTypes: ['customer'],
	endpoints: build => ({
		getCustomerById: build.query<ICustomer, number | string | undefined>({
			query: id => ({
				url: 'Customer/User/GetById/' + id,
			}),
			providesTags: result => ['customer'],
		}),
	}),
})

export const { useGetCustomerByIdQuery } = customersApi
