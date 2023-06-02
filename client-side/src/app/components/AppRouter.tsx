import { Navigate, Route, Routes } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import { privateRoutes, publicRoutes } from '../../router/routes'

const AppRouter = () => {
	const { isAuth, user, isLoadingAuth } = useTypedSelector(state => state.user)

	return (
		<Routes>
			{isAuth && user ? (
				<>
					{privateRoutes.map(route => (
						<Route
							Component={route.component}
							path={route.path}
							key={route.path}
						/>
					))}
				</>
			) : (
				<>
					{publicRoutes.map(route => (
						<Route
							Component={route.component}
							path={route.path}
							key={route.path}
						/>
					))}
				</>
			)}
			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	)
}

export default AppRouter
