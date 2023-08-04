import { Dispatch } from '@reduxjs/toolkit'
import { message } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AppRouter from './app/components/AppRouter'
import Layout from './app/components/layout/Layout'
import { UserContext } from './context/UserContext'
import { useActions } from './hooks/use-actions'
import { useFetching } from './hooks/use-fetching'
import useSignalRConnection from './hooks/use-signalR-connection'
import { useTypedSelector } from './hooks/use-typed-selector'
import UserService from './services/UserService'
import { AUTH_URL } from './store/api/auth-api'
import { IAuthResponse } from './types/IAuthResponse'
import { IUser } from './types/IUser'

function App() {
	const getAccessToken = async () => {
		const token = localStorage.getItem('token')
		return token || ''
	}
	const { isAuth, user } = useTypedSelector(state => state.user)
	const [userData, setUserData] = useState<IUser | null>(null)
	const [isUserLoading, setIsUserLoading] = useState(false)
	const [userError, setUserError] = useState('')
	const { setUser, setUserAds, setAuth, setLoading, removeUser } = useActions()
	const [checkPremium, checkPremiumLoading, checkPremiumError] = useFetching(
		async () => {
			const checkerPremium = await axios.delete(
				'https://api.xn--h1agbg8e4a.xn--p1ai/PaidAds/DeleteExpiredRows'
			)
		}
	)
	const connection = useSignalRConnection(getAccessToken)

	useEffect(() => {
		const runCheckPremium = async () => {
			try {
				await checkPremium()
			} catch (error) {
				console.error('Ошибка при вызове checkPremium:', error)
			}
		}
		runCheckPremium()
	}, [])

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
						{ accessToken, refreshToken }
					)
					localStorage.setItem('token', response.data.accessToken)
					localStorage.setItem('refresh', response.data.refreshToken)
					const userDate = await UserService.getUserData()
					setUserData(userDate.data.user)
					setUser(userDate.data.user)
					if (userDate.data.userAds) {
						setUserAds(userDate.data.userAds)
					}
					setAuth(true)
				} catch (e: any) {
					localStorage.removeItem('token')
					localStorage.removeItem('refresh')

					window.location.reload()
				} finally {
					setLoading(false)
				}
			}
			checker()
		}
	}, [])

	const [messageApi, contextHolder] = message.useMessage()

	return (
		<UserContext.Provider value={{ userData, isUserLoading, userError }}>
			<Layout>
				<AppRouter />
			</Layout>
		</UserContext.Provider>
	)
}
export default App
