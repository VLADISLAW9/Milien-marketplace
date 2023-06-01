import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { paymentActions } from '../store/slices/paymentSlice'
import { userActions } from '../store/slices/userSlice'


const actions = {
	...userActions,
	...paymentActions
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}
