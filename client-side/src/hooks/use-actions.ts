import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActions } from '../store/slices/userSlice'


const actions = {
	...userActions
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}
