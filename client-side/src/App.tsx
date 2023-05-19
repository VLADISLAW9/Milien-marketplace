import { useEffect } from 'react'
import {useDispatch } from 'react-redux'
import AppRouter from './app/components/AppRouter'
import Layout from './app/components/layout/Layout'
import Loader from './app/components/ui/spiner/Loader'
import { useTypedSelector } from './hooks/use-typed-selector'
import { Dispatch } from '@reduxjs/toolkit'
import { checkAuth } from './store/slices/userSlice'

function App() {
	const { isAuth, user, isLoadingAuth } = useTypedSelector(state => state.user)

	const dispatch = useDispatch<Dispatch<any>>()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth())
		}
	}, [])

	if (isLoadingAuth) {
		return (
			<Layout>
				<Loader />
			</Layout>
		)
	}

	return (
		<Layout>
			<AppRouter />
		</Layout>
	)
}

export default App
