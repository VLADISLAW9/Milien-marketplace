import { FC,useEffect,useState } from 'react'
import { IAdvrtData } from '../../../CreateAdvrtPage'
import 'react-dadata/dist/react-dadata.css';
import { AddressSuggestions, DaDataSuggestion, DaDataAddress  } from 'react-dadata';

const API_KEY_FOR_DADATA = '66ab16bfcbb3198b44e4b114d095a0d0297f355a'

interface IMapProps {
	advrtData: IAdvrtData
	setAdvrtData: (data: IAdvrtData) => void
}

const MapComponent: FC<IMapProps> = ({ advrtData, setAdvrtData }) => {	
	const [suggestValue, setSuggestValue] = useState<DaDataSuggestion<DaDataAddress> | undefined>()

	useEffect(() => {
		if(suggestValue){
			setAdvrtData({ ...advrtData, adress: suggestValue.value })
		}
	}, [suggestValue])

	return (
		<div>
				<div className='mt-10 '>
					<AddressSuggestions token={API_KEY_FOR_DADATA} value={suggestValue} onChange={setSuggestValue}/>	
				</div>
		</div>
	)
}

export default MapComponent
