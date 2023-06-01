import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAdvrtData } from '../../pages/creatorAd/CreateAdvrtPage'

interface PinsState {
	paymentId: string
	advt: IAdvrtData | null
}

const initialState: PinsState = {
	paymentId: localStorage.getItem('paymentId') ?? '',
	advt: JSON.parse(localStorage.getItem('advrt') ?? 'null'),
}

export const paymentSlice = createSlice({
	name: 'paymentId',
	initialState,
	reducers: {
		addPaymentId(state, action: PayloadAction<string>) {
			state.paymentId = action.payload
			localStorage.setItem('paymentId', action.payload)
		},
		removePaymentId(state) {
			state.paymentId = ''
			localStorage.removeItem('paymentId')
		},
		addAdvrtToStorage(state, action: PayloadAction<IAdvrtData>) {
			state.advt = action.payload
			localStorage.setItem('advrt', JSON.stringify(action.payload))
		},
		removeAdvrtFromStorage(state) {
			state.advt = null
			localStorage.removeItem('advrt')
		},
	},
})

export const paymentActions = paymentSlice.actions
export const paymentReducer = paymentSlice.reducer
