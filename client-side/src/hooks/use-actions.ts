import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BlurSlicetActions } from '../store/slices/blurSlice'
import { paymentActions } from '../store/slices/paymentSlice'
import { userActions } from '../store/slices/userSlice'

const actions = {
	...userActions,
	...paymentActions,
	...BlurSlicetActions,
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}
