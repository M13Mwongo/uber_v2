import React, { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { useCookies } from 'react-cookie'
import { useStateValue } from '../pages/contextAPI/StateProvider'

export const mapToken = (mapboxgl.accessToken =
	'pk.eyJ1IjoibW1tOTciLCJhIjoiY2wybHdpM204MHI0NjNkbnFnbjFneG05dCJ9.igV5GTfa9RLOXtK_SaeOXQ')

const Map = ({ contextStartPoint, contextEndPoint }) => {
	const [cookies, setCookie, removeCookie] = useCookies([
		'latitude',
		'longitude'
	])
	const [state, setState] = useState({
		latitude: cookies.latitude || 37,
		longitude: cookies.longitude || 2,
		startPin: contextStartPoint,
		destinationPin: contextEndPoint
	})
	const [{ startPoint, endPoint }] = useStateValue()

	//add current location marker to map
	// const addMarkerToMap = (map, coord) => {
	// 	const el = document.createElement('div')
	// 	el.className = 'marker'

	// 	new mapboxgl.Marker(el)
	// 		.setLngLat(coord)
	// 		.setPopup(
	// 			new mapboxgl.Popup({ offset: 25 }) // add popups
	// 				.setHTML(`<h3>Your Location</h3>`)
	// 		)
	// 		.addTo(map)
	// }
	const addMarker = (event, param) => {
		var coordinates = event.lngLat
		console.log(coordinates)

		new mapboxgl.Marker({})
			.setLngLat([coordinates.lng, coordinates.lat])
			.addTo(param)
	}
	const addMarkerEvent = (param) => {
		console.log(event.target)
		// var coordinates = event.lngLat
		// console.log(coordinates)

		// new mapboxgl.Marker({})
		// 	.setLngLat([coordinates.lng, coordinates.lat])
		// 	.addTo(param)
	}
	const addMarkerFunction = (map) => (event) => {
		var coordinates = event.lngLat
		//console.log(coordinates)

		new mapboxgl.Marker({})
			.setLngLat([coordinates.lng, coordinates.lat])
			.addTo(map)
	}

	//load map onto screen
	useEffect(() => {
		//Add start/end point markers

		let nav = navigator.geolocation
		if ('geolocation' in navigator) {
			nav.getCurrentPosition((pos) => {
				//assign coords from navigator to variables
				let locatedLat = pos.coords.latitude
				let locatedLong = pos.coords.longitude

				//watch position for updates and update only if there is a change
				nav.watchPosition((updatedPos) => {
					if (updatedPos.coords.latitude !== locatedLat) {
						locatedLat = updatedPos.coords.latitude
					}
					if (updatedPos.coords.longitude !== locatedLong) {
						locatedLong = updatedPos.coords.longitude
					}
				})
				let locatedCoords = [locatedLong, locatedLat]

				//set location data to state
				setState({
					latitude: locatedLat,
					longitude: locatedLong
				})
				//add location data to cookies
				setCookie('latitude', locatedLat, { path: '/' })
				setCookie('longitude', locatedLong, { path: '/' })

				//create new instance of map
				const map = new mapboxgl.Map({
					container: 'map',
					style: 'mapbox://styles/mapbox/streets-v12',
					center: [locatedLong, locatedLat],
					zoom: 13,
					projection: 'mercator'
				})

				map.dragRotate.disable()
				map.touchZoomRotate.disableRotation()
				map.addControl(
					new mapboxgl.GeolocateControl({
						positionOptions: { enableHighAccuracy: false, timeout: 12000 },
						showUserHeading: true,
						trackUserLocation: true
					})
				)
				map.addControl(new mapboxgl.FullscreenControl())
				map.addControl(new mapboxgl.NavigationControl())
				map.on('click', addMarkerFunction(map))

				//placing markers
				// if (startPoint) {
				// 	new mapboxgl.Marker().setLngLat(startPoint).addTo(map)
				// }
			})
		} else {
			alert('Geolocator is not available')
		}
	}, [state.startPin])

	return <div id='map' style={{ height: '100vh', width: '100vw' }}></div>
}

export default Map
