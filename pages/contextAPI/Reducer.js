export const initialState = {
	startPoint: [],
	endPoint: [],
	user: null,
	test: 'This is text'
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'START_LOCATION':
			const startLocation = {
				...state,
				startPoint: action.location
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

		default:
			return state
	}
}

export default reducer

// export const geolocator = {
// 	if(nav) {
// 		nav.getCurrentPosition((pos) => {
// 			//assign coords from navigator to variables
// 			let locatedLat = pos.coords.latitude
// 			let locatedLong = pos.coords.longitude

// 			//watch position for updates and update only if there is a change
// 			nav.watchPosition((updatedPos) => {
// 				if (updatedPos.coords.latitude !== locatedLat) {
// 					locatedLat = updatedPos.coords.latitude
// 				}
// 				if (updatedPos.coords.longitude !== locatedLong) {
// 					locatedLong = updatedPos.coords.longitude
// 				}
// 			})
// 			let locatedCoords = [locatedLong, locatedLat]

// 			//set location data to state
// 			setState({
// 				latitude: locatedLat,
// 				longitude: locatedLong
// 			})
// 			//add location data to cookies
// 			setCookie('latitude', locatedLat, { path: '/' })
// 			setCookie('longitude', locatedLong, { path: '/' })
// 		})
// 	}
// }
