import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { advrtsApi } from '../services/AdvrtsService'
import { customersApi } from '../services/CustomerService'
import { paymentReducer } from './slices/paymentSlice'
import { userReducers } from './slices/userSlice'

export const store = configureStore({
	reducer: {
		[advrtsApi.reducerPath]: advrtsApi.reducer,
		[customersApi.reducerPath]: customersApi.reducer,
		user: userReducers,
		payment: paymentReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			advrtsApi.middleware,
			customersApi.middleware
		),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>