import { Dispatch } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppRouter from './app/components/AppRouter'
import Layout from './app/components/layout/Layout'
import { useActions } from './hooks/use-actions'
import { useTypedSelector } from './hooks/use-typed-selector'
import userService from './services/UserService'
import { checkAuth } from './store/slices/userSlice'

function App() {
	const { isAuth, user, isLoadingAuth } = useTypedSelector(state => state.user)

	const { setUser, setUserAds } = useActions()

	console.log(user)

	const dispatch = useDispatch<Dispatch<any>>()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth())
			const getUser = async () => {
				const userDate = await userService.getUserData().then(res => {
					dispatch(setUser(res.data.user))
					if (res.data.userAds) {
						dispatch(setUserAds(res.data.userAds))
					}
				})
			}
			getUser()
		}
	}, [])

	return (
		<Layout>
			<AppRouter />
		</Layout>
	)
}

export default App
