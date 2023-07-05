import { Dispatch } from '@reduxjs/toolkit'
import { FC, useEffect, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BiExit, BiHeart } from 'react-icons/bi'
import { HiMenu } from 'react-icons/hi'
import { MdClose } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useFetching } from '../../../../hooks/use-fetching'
import { useTypedSelector } from '../../../../hooks/use-typed-selector'
import UserService from '../../../../services/UserService'
import { logout } from '../../../../store/slices/userSlice'
import { IUser } from '../../../../types/IUser'
import DotsLoader from '../../ui/spiner/DotsLoader'
import AuthorizationButtons from './buttons/AuthorizationButtons'
import HeaderLogo from './logo/HeaderLogo'
import HeaderSearch from './search/HeaderSearch'
import UserHeader from './user/UserHeader'

const Header: FC = () => {
	const { isAuth, user: userData } = useTypedSelector(state => state.user)
	const [user, setUser] = useState<IUser | null>(null)
	const navigate = useNavigate()
	const dispatch = useDispatch<Dispatch<any>>()
	const [fetchUser, isLoading, error] = useFetching(async () => {
		const response = await UserService.getUserData()
		setUser(response.data.user)
	})
	const [showBurger, setShowBurger] = useState(false)

	const handleExit = () => {
		dispatch(logout())
		setShowBurger(false)
	}

	useEffect(() => {
		fetchUser()
	}, [])

	if (isLoading) {
		return (
			<div className='fixed header z-[50] max-xl:px-[25px] bg-white px-[50px] py-[20px] flex items-center'>
				<HeaderLogo />
				<div className='flex-auto w-[80%] max-2xl:w-[60%]   relative max-xl:hidden flex justify-center items-center max'>
					<HeaderSearch />
				</div>
				<div className='flex w-[15%] items-center flex-auto justify-end'>
					<DotsLoader />
				</div>
			</div>
		)
	}

	return (
		<div className='fixed header z-[50] max-xl:px-[25px] bg-white px-[50px] py-[20px] flex items-center'>
			<HeaderLogo />
			<div className='flex-auto w-[80%] max-2xl:w-[60%]   relative max-xl:hidden flex justify-center items-center max'>
				<HeaderSearch />
			</div>

			<div className='hidden max-xl:block'>
				<button
					onClick={() => {
						setShowBurger(true)
					}}
					className='z-30'
				>
					<HiMenu className='w-14 text-stone-600 h-14' />
				</button>
			</div>

			{showBurger && (
				<div className='absolute flex flex-col top-0 left-0 right-0 z-20 h-[200vh] px-[25px] w-[100%] py-[25px]  bg-white'>
					<div>
						<button
							onClick={() => {
								setShowBurger(false)
							}}
							className='z-30 flex justify-center items-center float-right translate-y-1.5 translate-x-1'
						>
							<MdClose className='w-16 text-stone-600 h-16' />
						</button>
					</div>

					<div className='flex mt-1 flex-col  justify-center'>
						<div className='flex justify-center mt-5 mb-10 items-center'>
							<img src='/logo.png' className='w-[250px]' alt='логотип' />
						</div>
						<div className='w-[100%] mb-28 mt-14 relative flex justify-center items-center '>
							<HeaderSearch />
						</div>

						{isAuth && userData ? (
							<div className='flex justify-center items-center flex-col'>
								<button
									onClick={() => {
										setShowBurger(false)
										navigate('/my-profile')
									}}
									className='text-4xl text-center rounded-full border-2 bg-[#166430]  border-[#166430] w-[500px] text-white  py-0 flex justify-center items-center h-[100px] mb-14 border'
								>
									<AiOutlineUser className='mr-5 w-12 h-12' />
									<h1 className='w-[220px]'>Профиль</h1>
								</button>

								<button
									onClick={() => {
										setShowBurger(false)
										navigate('/favorite')
									}}
									className='text-4xl text-center rounded-full  w-[500px] text-white bg-gradient-to-r from-[#166430] via-[#168430] to-[#FEED00]  py-0 flex justify-center items-center h-[100px] mb-14 '
								>
									<BiHeart className='mr-5 w-12 h-12' />
									<h1 className='w-[220px]'>Избранное</h1>
								</button>
								<button
									onClick={() => {
										handleExit()
									}}
									className='text-4xl text-center rounded-full border-2 border-[#166430] w-[500px] text-[#166430]  py-0 flex justify-center items-center h-[100px] mb-14 border'
								>
									<BiExit className='mr-5 w-12 h-12' />
									<h1 className='w-[220px]'>Выйти</h1>
								</button>
							</div>
						) : (
							<div className='flex justify-center items-center flex-col'>
								<Link
									to={'/login'}
									className='text-4xl text-center rounded-full border-2 border-[#166430] w-[100%] text-[#166430] px-8 py-0 flex justify-center items-center h-[100px] mb-14 border'
								>
									Войти
								</Link>
								<Link
									to={'/signin'}
									className='text-4xl text-center rounded-full border-2 bg-[#166430] border-[#166430] w-[100%] text-white px-8 py-0 flex justify-center items-center h-[100px] mb-14 border'
								>
									Регистрация
								</Link>
							</div>
						)}
					</div>
				</div>
			)}

			{isAuth && userData ? (
				<div className='flex max-xl:hidden w-[15%] max-xl:w-[5%] items-center flex-auto justify-end'>
					<UserHeader user={userData} />
				</div>
			) : (
				<div className='flex max-xl:hidden w-[15%] flex-auto justify-end'>
					<AuthorizationButtons />
				</div>
			)}
		</div>
	)
}

export default Header
