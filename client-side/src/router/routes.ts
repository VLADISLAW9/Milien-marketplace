import AdvertisementPage from '../pages/advrt/AdvertisementPage'
import OurOpportunities from '../pages/articles/our-opportunities/OurOpportunities'
import ForgotPass from '../pages/authorization/forgotPass/ForgotPass'
import LogInPage from '../pages/authorization/login/LogInPage'
import SignInPage from '../pages/authorization/signin/SignInPage'
import ChatPage from '../pages/chat/ChatPage'
import CreateAdvrtPage from '../pages/creatorAd/CreateAdvrtPage'

import CustomerPage from '../pages/customer/CustomerPage'
import FavoritePage from '../pages/favorite/FavoritePage'
import HomePage from '../pages/home/HomePage'
import PaymentPage from '../pages/payment/PaymentPage'
import ProfilePage from '../pages/profile/ProfilePage'
import SearchPage from '../pages/search/SearchPage'
import UserAcception from '../pages/userAcception/UserAcception'

export const privateRoutes = [
	{ path: '/', component: HomePage, exact: true },
	{ path: '/advertisement/:id', component: AdvertisementPage, exact: true },
	{ path: '/customer/:id', component: CustomerPage, exact: true },
	{ path: '/createAdvrt', component: CreateAdvrtPage, exact: true },
	{ path: '/payment-success', component: PaymentPage, exact: true },
	{ path: '/my-profile', component: ProfilePage, exact: true },
	{ path: '/favorite', component: FavoritePage, exact: true },
	{ path: '/search/:param', component: SearchPage, exact: true },
	{ path: '/user-acception', component: UserAcception, exact: true },
	{ path: '/chat', component: ChatPage, exact: true },
	{ path: '/opportunities', component: OurOpportunities, exact: true },
]

export const publicRoutes = [
	{ path: '/', component: HomePage, exact: true },
	{ path: '/opportunities', component: OurOpportunities, exact: true },
	{ path: '/advertisement/:id', component: AdvertisementPage, exact: true },
	{ path: '/customer/:id', component: CustomerPage, exact: true },
	{ path: '/login', component: LogInPage, exact: true },
	{ path: '/signin', component: SignInPage, exact: true },
	{ path: '/search/:param', component: SearchPage, exact: true },
	{ path: '/forgot-password', component: ForgotPass, exact: true },
	{ path: '/user-acception', component: UserAcception, exact: true },
]
