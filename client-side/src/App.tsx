import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AppRouter from './app/components/AppRouter'
import Layout from './app/components/layout/Layout'
import { UserContext } from './context/UserContext'
import { useActions } from './hooks/use-actions'
import { useFetching } from './hooks/use-fetching'
import { useTypedSelector } from './hooks/use-typed-selector'
import UserService from './services/UserService'
import { AUTH_URL } from './store/axios/auth-api'
import { IAuthResponse } from './types/IAuthResponse'
import { IUser } from './types/IUser'

function App() {
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

	useEffect(() => {
		// Функция, которая будет вызывать checkPremium
		const runCheckPremium = async () => {
			try {
				await checkPremium()
			} catch (error) {
				// Обработка ошибки, если необходимо
				console.error('Ошибка при вызове checkPremium:', error)
			}
		}

		// Запускаем checkPremium при монтировании компонента
		runCheckPremium()

		// Вызываем checkPremium раз в сутки
		const interval = setInterval(runCheckPremium, 24 * 60 * 60 * 1000)

		// Очищаем интервал при размонтировании компонента
		return () => clearInterval(interval)
	}, []) // Пустой массив зависимостей гарантирует, что useEffect будет вызван только один раз при монтировании компонента

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
					dispatch(setAuth(true))
				} catch (e: any) {
					localStorage.removeItem('token')
					localStorage.removeItem('refresh')
					// window.location.reload()
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
					setIsUserLoading(true)
					const userDate = await UserService.getUserData().then(res => {
						setUserData(res.data.user)

						dispatch(setUser(res.data.user))
						if (res.data.userAds) {
							dispatch(setUserAds(res.data.userAds))
						}
					})
				}
				getUser()
			} catch (e) {
				console.log(e)
				setUserError('Произошла ошибка при загрузке данных пользователя')
			} finally {
				setLoading(false)
				setIsUserLoading(false)
			}
		}
	}, [])

	return (
		<UserContext.Provider value={{ userData, isUserLoading, userError }}>
			<Layout>
				<AppRouter />
			</Layout>
		</UserContext.Provider>
	)
}

export default App
