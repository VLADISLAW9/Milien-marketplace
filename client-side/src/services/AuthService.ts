import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IAuthResponse } from '../types/IAuthResponse'

export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.0.160:5243',
	}),
	tagTypes: ['auth'],
	endpoints: build => ({
		loginUser: build.mutation<
			IAuthResponse,
			{ login: string; password: string }
		>({
			query: auth => ({
				url: '/api/Auth/login',
				method: 'POST',
				body: auth,
			}),
			invalidatesTags: ['auth'],
		}),
	}),
})

export const { useLoginUserMutation } = authApi
