import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PinsState {
	paymentId: string 
}

const initialState: PinsState = {
	paymentId: localStorage.getItem('paymentId') ?? '',
}

export const paymentSlice = createSlice({
	name: 'paymentId',
	initialState,
	reducers: {
		addPaymentId(state, action: PayloadAction<string>) {
			state.paymentId = action.payload
			localStorage.setItem('paymentId', action.payload)
		},
		removePaymentId() {
			localStorage.removeItem('paymentId')
		},
	},
})

export const paymentActions = paymentSlice.actions
export const paymentReducer = paymentSlice.reducer
