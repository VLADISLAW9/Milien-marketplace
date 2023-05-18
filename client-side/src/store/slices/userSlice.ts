import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthResponse } from '../../types/IAuthResponse'
import { IUser } from '../../types/IUser'

interface IUserSlice {
	accessToken: string | null
	refreshToken: string | null
	user: IUser | null
	isAuth: boolean
}

const initialState: IUserSlice = {
	accessToken: null,
	refreshToken: null,
	user: null,
	isAuth: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IAuthResponse>) {
			state.accessToken = action.payload.accessToken
			state.refreshToken = action.payload.refreshToken
			state.user = action.payload.user
			state.isAuth = true
			localStorage.setItem('token', state.accessToken)
		},
		removeUser(state) {
			state.accessToken = null
			state.refreshToken = null
			state.isAuth = false
			state.user = null
			localStorage.removeItem('token')
		},
	},
})

export const userActions = userSlice.actions
export const userReducers = userSlice.reducer