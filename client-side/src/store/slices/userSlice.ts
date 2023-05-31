import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AuthService from '../../services/AuthService'
import { IAuthResponse } from '../../types/IAuthResponse'
import { IUser } from '../../types/IUser'
import { AUTH_URL } from '../axios/auth-api'

export interface LoginPayload {
	login: string
	password: string
}

export interface SignInPayload {
	login: string
	pass: string
	email: string
	firstName: string
	lastName: string
	phoneNumber: string
}

interface ICheckCode {
	email: string
	code: string
}

export const login = createAsyncThunk(
	'user/login',
	async (payload: LoginPayload) => {
		try {
			const response = await AuthService.login(payload.login, payload.password)
			localStorage.setItem('token', response.data.accessToken)
			localStorage.setItem('refresh', response.data.refreshToken)
			return response.data.user
		} catch (e: any) {
			return e
		}
	}
)

export const sendCodeToEmail = createAsyncThunk(
	'user/sendCodeToEmail',
	async (payload: SignInPayload) => {
		const response = await AuthService.registration(
			payload.login,
			payload.pass,
			payload.email,
			payload.firstName,
			payload.lastName,
			payload.phoneNumber
		)
		return response
	}
)

export const logout = createAsyncThunk('user/logout', async () => {
	const response = await AuthService.logout()
	localStorage.removeItem('token')
	localStorage.removeItem('refresh')
	return response
})

export const checkLogin = createAsyncThunk(
	'user/checkLogin',
	async (payload: string) => {
		const response = await AuthService.checkLogin(payload)
		return response.data
	}
)

export const checkPhone = createAsyncThunk(
	'user/checkPhone',
	async (payload: string) => {
		const response = await AuthService.checkPhone(payload)
		return response.data
	}
)

export const checkEmail = createAsyncThunk(
	'user/checkPhone',
	async (payload: string) => {
		const response = await AuthService.checkEmail(payload)
		return response.data
	}
)

export const checkCodeEmail = createAsyncThunk(
	'user/checkCodeEmail',
	async (payload: ICheckCode) => {
		const response = await AuthService.checkEmailCode(
			payload.email,
			payload.code
		)
		return response
	}
)

export const checkAuth = createAsyncThunk('user/checkAuth', async () => {
	const accessToken = localStorage.getItem('token')
	const refreshToken = localStorage.getItem('refresh')
	try {
		const response = await axios.post<IAuthResponse>(
			`${AUTH_URL}/api/Token/refresh`,
			{ accessToken, refreshToken },
			{ withCredentials: true }
		)
		localStorage.setItem('token', response.data.accessToken)
		localStorage.setItem('refresh', response.data.refreshToken)
		return true
	} catch (e: any) {
		return false
	}
})

interface UserState {
	user: IUser
	isAuth: boolean
	isLoadingAuth: boolean
	isErrorAuth: boolean
	isErrorLogin: boolean
	errorMessage: string | null
}

const initialState: UserState = {
	user: {} as IUser,
	isAuth: false,
	isLoadingAuth: false,
	isErrorAuth: false,
	isErrorLogin: false,
	errorMessage: null,
}

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
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<IUser | any>) => {
				if (action.payload.email) {
					state.isLoadingAuth = true
					state.isAuth = true
					state.user = action.payload
					state.errorMessage = null
					state.isErrorAuth = false
				} else {
					state.isErrorAuth = true
					state.errorMessage = action.payload.response.data
				}
			}
		)
		builder.addCase(logout.fulfilled, state => {
			state.user = {} as IUser
			state.isErrorAuth = false
			state.isLoadingAuth = false
			state.errorMessage = null
			state.isAuth = false
		})

		builder.addCase(
			checkAuth.fulfilled,
			(state, action: PayloadAction<boolean>) => {
				if (action.payload) {
					state.isAuth = true
				} else {
					state.isAuth = false
					state.isErrorAuth = false
					state.isLoadingAuth = false
					state.errorMessage = null
					state.user = {} as IUser
					localStorage.removeItem('token')
					localStorage.removeItem('refresh')
				}
			}
		)
	},
})

export const userActions = userSlice.actions

export const userReducers = userSlice.reducer
