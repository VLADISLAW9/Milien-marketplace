import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import AuthService from '../../services/AuthService'
import { IAdvrt } from '../../types/IAdvrt'
import { IUser } from '../../types/IUser'

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

interface UserState {
	user: IUser
	userAds: IAdvrt[] | null
	isAuth: boolean
	isLoadingAuth: boolean
	isErrorAuth: boolean
	isErrorLogin: boolean
	errorMessage: string | null
}

const initialState: UserState = {
	user: {} as IUser,

	userAds: null,
	isAuth: !!localStorage.getItem('token'),
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
		setUserAds(state, action: PayloadAction<IAdvrt[]>) {
			state.userAds = action.payload
		},
		setError(state, action: PayloadAction<string>) {
			state.errorMessage = action.payload
		},
		removeUser(state) {
			state.user = {} as IUser
			state.isAuth = false
			state.isErrorAuth = false
			state.isLoadingAuth = false
			state.errorMessage = null
			state.user = {} as IUser
		},
	},
	extraReducers: builder => {
		builder.addCase(logout.fulfilled, state => {
			state.user = {} as IUser
			state.isErrorAuth = false
			state.isLoadingAuth = false
			state.errorMessage = null
			state.isAuth = false
		})
	},
})

export const userActions = userSlice.actions

export const userReducers = userSlice.reducer
