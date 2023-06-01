import AdvertisementPage from '../pages/advrt/AdvertisementPage'
import LogInPage from '../pages/authorization/login/LogInPage'
import SignInPage from '../pages/authorization/signin/SignInPage'
import CreateAdvrtPage from '../pages/creatorAd/CreateAdvrtPage'

import CustomerPage from '../pages/customer/CustomerPage'
import HomePage from '../pages/home/HomePage'
import PaymentPage from '../pages/payment/PaymentPage'

export const privateRoutes = [
	{ path: '/', component: HomePage, exact: true },
	{ path: '/advertisement/:id', component: AdvertisementPage, exact: true },
	{ path: '/customer/:id', component: CustomerPage, exact: true },
	{ path: '/createAdvrt', component: CreateAdvrtPage, exact: true },
	{ path: '/payment-success', component: PaymentPage, exact: true },
]

export const publicRoutes = [
	{ path: '/', component: HomePage, exact: true },
	{ path: '/advertisement/:id', component: AdvertisementPage, exact: true },
	{ path: '/customer/:id', component: CustomerPage, exact: true },
	{ path: '/login', component: LogInPage, exact: true },
	{ path: '/signin', component: SignInPage, exact: true },
	{ path: '/payment-success', component: PaymentPage, exact: true },
]
