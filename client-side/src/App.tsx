import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppRouter from './app/components/AppRouter'
import Layout from './app/components/layout/Layout'
import { useActions } from './hooks/use-actions'
import { useTypedSelector } from './hooks/use-typed-selector'
import UserService from './services/UserService'
import { AUTH_URL } from './store/axios/auth-api'
import { IAuthResponse } from './types/IAuthResponse'

function App() {
	const { isAuth, user, isLoadingAuth } = useTypedSelector(state => state.user)

	const { setUser, setUserAds, setAuth, setLoading, removeUser } = useActions()

	const dispatch = useDispatch<Dispatch<any>>()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			const checker = async () => {
				const accessToken = localStorage.getItem('token')
				const refreshToken = localStorage.getItem('refresh')
				try {
					setLoading(true)
					const response = await axios.post<IAuthResponse>(
						`${AUTH_URL}/api/Token/refresh`,
						{ accessToken, refreshToken },
						{ withCredentials: true }
					)
					localStorage.setItem('token', response.data.accessToken)
					localStorage.setItem('refresh', response.data.refreshToken)
					dispatch(setAuth(true))
				} catch (e: any) {
					localStorage.removeItem('token')
					localStorage.removeItem('refresh')
				} finally {
					setLoading(false)
				}
			}
			checker()
		}
	}, [])

	useEffect(() => {
		if (isAuth === true) {
			try {
				const getUser = async () => {
					setLoading(true)
					const userDate = await UserService.getUserData().then(res => {
						dispatch(setUser(res.data.user))
						if (res.data.userAds) {
							dispatch(setUserAds(res.data.userAds))
						}
					})
				}
				getUser()
			} catch (e) {
				console.log(e)
			} finally {
				setLoading(false)
			}
		}
	}, [])

	return (
		<Layout>
			<AppRouter />
		</Layout>
	)
}

export default App
