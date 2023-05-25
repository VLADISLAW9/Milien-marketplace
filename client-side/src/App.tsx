import { Dispatch } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppRouter from './app/components/AppRouter'
import Layout from './app/components/layout/Layout'
import { useTypedSelector } from './hooks/use-typed-selector'
import { checkAuth } from './store/slices/userSlice'

function App() {
	const { isAuth, user, isLoadingAuth } = useTypedSelector(state => state.user)

	const dispatch = useDispatch<Dispatch<any>>()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth())
		}
	}, [])

	return (
		<Layout>
			<AppRouter />
		</Layout>
	)
}

export default App
