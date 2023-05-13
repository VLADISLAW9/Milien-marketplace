import AppRouter from './app/components/AppRouter'
import Layout from './app/components/layout/Layout'

function App() {
	return (
		<Layout>
			{/* <div className='text-center mt-10 text-3xl'>Тут реклама</div> */}
			<AppRouter />
		</Layout>
	)
}

export default App
