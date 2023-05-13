import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { advrtsApi } from '../services/AdvrtsServices'
import { customersApi } from '../services/CustomerServices'

export const store = configureStore({
	reducer: {
		[advrtsApi.reducerPath]: advrtsApi.reducer,
		[customersApi.reducerPath]: customersApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			advrtsApi.middleware,
			customersApi.middleware
		),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
