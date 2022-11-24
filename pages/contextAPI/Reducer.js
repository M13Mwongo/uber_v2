export const initialState = {
	latitude: null,
	longitude: null,
	user: null,
	text: 'This is placeholder text'
}

// Location function
// export const getCurrentPos = () => {
// 	var latitude, longitude

// 	if (navigator.geolocation) {
// 		navigator.geolocation.getCurrentPosition((pos) => {
// 			longitude = pos.coords.longitude
// 			latitude = pos.coords.latitude
// 		})
// 	}

// 	return { longitude, latitude }
// }

const reducer = (state, action) => {
	switch (action.type) {
		case 'GET_LOCATION':
			navigator.geolocation.getCurrentPosition((pos) => {
				state.latitude = pos.coords.latitude
				state.longitude = pos.coords.longitude
			})

			return state

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
