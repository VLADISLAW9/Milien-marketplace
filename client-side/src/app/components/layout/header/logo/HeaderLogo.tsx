import { Link } from 'react-router-dom'

const HeaderLogo = () => {
	return (
		<Link
			to={`/home`}
			className='flex-auto max-xl:w-[10%] w-[15%] flex justify-start'
		>
			<img
				src='/logo.png'
				className='-translate-y-1.5 -translate-x-3 max-xl:w-[250px] w-[300px]'
				alt='логотип'
			/>
		</Link>
	)
}

export default HeaderLogo