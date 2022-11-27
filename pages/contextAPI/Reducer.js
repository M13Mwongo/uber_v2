import mapboxgl from 'mapbox-gl'

export const initialState = {
	startPoint: [],
	startLong: null,
	startLat: null,
	endPoint: [],
	endLong: null,
	endLat: null,
	user: null,
	apiErrorCode: '',
	apiErrorMessage: ''
}

export const addMarkerReducer = (map, lat, long) => {
	console.log('ReducerMarker:' + [long, lat])

	new mapboxgl.Marker({}).setLngLat([long, lat]).addTo(map)
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'START_LOCATION':
			const startLocation = {
				...state,
				startPoint: action.location,
				startLat: action.location[0],
				startLong: action.location[1]
			}

			return startLocation

		case 'END_LOCATION':
			const endLocation = {
				...state,
				endPoint: action.location
			}

			return endLocation

		case 'SET_USER':
			return {
				...state,
				user: action.user
			}
		case 'RESET':
			return initialState

		case 'AXIOS_ERROR':
			return {
				...state,
				apiErrorCode: action.errorCode,
				apiErrorMessage: action.errorMessage
			}

		default:
			return state
	}
}

export default reducer
