import { BrowserRouter } from 'react-router-dom'
import Layout from './app/components/layout/Layout'
import HomePage from './pages/home/HomePage'
import AppRouter from './app/components/AppRouter'

function App() {
	return (
		<Layout>
			<AppRouter />
		</Layout>
	)
}

export default App
