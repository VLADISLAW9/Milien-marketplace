import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AuthService from '../../services/AuthService'
import { IAuthResponse } from '../../types/IAuthResponse'
import { IUser } from '../../types/IUser'
import { AUTH_URL } from '../axios'

interface LoginPayload {
	login: string
	password: string
}

interface UserState {
	user: IUser
	isAuth: boolean
	isLoadingAuth: boolean
}

const initialState: UserState = {
	user: {} as IUser,
	isAuth: false,
	isLoadingAuth: false,
}

export const login = createAsyncThunk(
	'user/login',
	async (payload: LoginPayload) => {
		const response = await AuthService.login(payload.login, payload.password)
		console.log('is login in slice', response.data)
		localStorage.setItem('token', response.data.accessToken)
		return response.data.user
	}
)

export const registration = createAsyncThunk(
	'user/registration',
	async (payload: LoginPayload) => {
		const response = await AuthService.registration(
			payload.login,
			payload.password
		)
		localStorage.setItem('token', response.data.accessToken)
		return response.data.user
	}
)

export const logout = createAsyncThunk('user/logout', async () => {
	const response = await AuthService.logout()
	localStorage.removeItem('token')
	return response
})

export const checkAuth = createAsyncThunk('user/checkAuth', async () => {
	try {
		const response = await axios.get<IAuthResponse>(
			`${AUTH_URL}/api/Token/refresh`,
			{ withCredentials: true }
		)
		localStorage.setItem('token', response.data.accessToken)
		return response.data.user
	} catch (e) {
		console.log(e)
	}
})

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoadingAuth = action.payload
		},
		setAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload
		},
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.isAuth = true
			state.user = action.payload
		})
		builder.addCase(registration.fulfilled, (state, action) => {
			state.isAuth = true
			state.user = action.payload
		})
		builder.addCase(logout.fulfilled, state => {
			state.isAuth = false
			state.user = {} as IUser
		})
		builder.addCase(checkAuth.fulfilled, (state, action) => {
			try {
				state.isLoadingAuth = true
				state.isAuth = true
				if (action.payload) {
					state.user = action.payload
				}
			} catch (e) {
				console.log(e)
			} finally {
				state.isLoadingAuth = false
			}
		})
	},
})

export const userActions = userSlice.actions

export const userReducers =  userSlice.reducer
