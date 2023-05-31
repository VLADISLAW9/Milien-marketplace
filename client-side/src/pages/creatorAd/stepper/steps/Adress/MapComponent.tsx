import { FC, useRef, useState } from 'react'
import { Map, Placemark, SearchControl, YMaps } from 'react-yandex-maps'
import { IAdvrtData } from '../../../CreateAdvrtPage'

interface IMapProps {
	advrtData: IAdvrtData
	setAdvrtData: (data: IAdvrtData) => void
}

const MapComponent: FC<IMapProps> = ({ advrtData, setAdvrtData }) => {
	const [address, setAddress] = useState(
		advrtData.adress ? advrtData.adress : ''
	)
	const [selectedPlacemark, setSelectedPlacemark] = useState(null)
	const [placemarkGeometry, setPlacemarkGeometry] = useState([
		56.49771, 84.97437,
	])

	const searchControlRef = useRef<any>(null)

	const handleMapClick = (e: any) => {
		const coordinates = e.get('coords')
		setPlacemarkGeometry(coordinates)
		setSelectedPlacemark(coordinates)

		const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=db03ed69-9486-4e12-9082-f2086b3e9d93&geocode=${coordinates[1]},${coordinates[0]}`

		fetch(geocodeUrl)
			.then(response => response.json())
			.then(data => {
				const featureMember =
					data.response.GeoObjectCollection.featureMember[0].GeoObject
				const address = featureMember.metaDataProperty.GeocoderMetaData.text
				setAddress(address)
				setAdvrtData({ ...advrtData, adress: address })
			})
			.catch(error => {
				console.error('Error retrieving address:', error)
			})

		if (searchControlRef.current) {
			searchControlRef.current.clear()
		}
	}

	const handleSearchResult = (e: any) => {
		const suggestion = e.get('item')
		if (suggestion) {
			const displayName = suggestion.value
			const coordinates = suggestion.coords

			setAddress(displayName)
			setPlacemarkGeometry(coordinates)
			setSelectedPlacemark(coordinates)

			// You can use the coordinates for further processing if needed
			console.log('Coordinates:', coordinates)
		}
	}

	const handleSearchError = (e: any) => {
		console.error('Error during geocoding:', e)
	}

	const clearSearchInput = () => {
		if (searchControlRef.current) {
			searchControlRef.current.clear()
		}
	}

	return (
		<YMaps query={{ apikey: 'db03ed69-9486-4e12-9082-f2086b3e9d93' }}>
			<div>
				<Map
					onClick={handleMapClick}
					defaultState={{ center: placemarkGeometry, zoom: 10 }}
					style={{ width: '100%', height: '400px' }}
				>
					<SearchControl
						options={{ float: 'left' }}
						onResultSelect={handleSearchResult}
						onSearchError={handleSearchError}
						instanceRef={(ref: any) => (searchControlRef.current = ref)}
					/>
					{selectedPlacemark && <Placemark geometry={selectedPlacemark} />}
				</Map>
				<div>
					<h1 className='text-xl text-center mt-5 font-medium'>
						Адрес: <span className='text-stone-400 font-normal'>{address}</span>
					</h1>
				</div>
				{/* <button onClick={clearSearchInput}>Clear Search Input</button> */}
			</div>
		</YMaps>
	)
}

export default MapComponent
