import { BrowserRouter } from 'react-router-dom'
import Layout from './app/components/layout/Layout'
import HomePage from './pages/home/HomePage'

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<HomePage />
			</Layout>
		</BrowserRouter>
	)
}

export default App
