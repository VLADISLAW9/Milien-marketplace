import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BlurState {
	isBlur: boolean
}

const initialState: BlurState = {
	isBlur: false,
}

export const BlurSlice = createSlice({
	name: 'paymentId',
	initialState,
	reducers: {
		setIsBlur(state, action: PayloadAction<boolean>) {
			state.isBlur = action.payload
		},
	},
})

export const BlurSlicetActions = BlurSlice.actions
export const BlurSliceReducer = BlurSlice.reducer
