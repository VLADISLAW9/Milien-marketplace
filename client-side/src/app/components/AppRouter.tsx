import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes } from '../../router/routes'

const AppRouter = () => {
	return (
		<Routes>
			{privateRoutes.map(route => (
				<Route Component={route.component} path={route.path} key={route.path} />
			))}
			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	)
}

export default AppRouter
