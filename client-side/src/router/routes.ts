import AdvertisementPage from '../pages/advertisements/AdvertisementPage'
import AdvertisementsPage from '../pages/advertisements/AdvertisementsPage'
import HomePage from '../pages/home/HomePage'
import UserPage from '../pages/user/UserPage'

export const privateRoutes = [
	{ path: '/', component: HomePage, exact: true },
	{ path: '/advertisements', component: AdvertisementsPage, exact: true },
	{ path: '/advertisement/:id', component: AdvertisementPage, exact: true },
	{ path: '/user/:id', component: UserPage, exact: true },
]
