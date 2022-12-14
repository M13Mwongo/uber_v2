import React, { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { useCookies } from 'react-cookie'
import { useStateValue } from '../pages/contextAPI/StateProvider'
import { addMarkerReducer } from '../pages/contextAPI/Reducer'

export const mapToken = (mapboxgl.accessToken =
	'pk.eyJ1IjoibW1tOTciLCJhIjoiY2wybHdpM204MHI0NjNkbnFnbjFneG05dCJ9.igV5GTfa9RLOXtK_SaeOXQ')

const addMarkerEvent = (lng, lat) => {
	// var coordinates = event.lngLat
	// console.log(coordinates)
	new mapboxgl.Marker({}).setLngLat([lng, lat]).addTo(param)
}
const addMarkerFunction = (map) => (event) => {
	var coordinates = event.lngLat
	//console.log(coordinates)

	new mapboxgl.Marker({})
		.setLngLat([coordinates.lng, coordinates.lat])
		.addTo(map)
}

const Map = () => {
	const [{ startLong, startLat, endLong, endLat }] = useStateValue()
	const [state, setState] = useState({
		pickupLat: startLat,
		pickupLong: startLong
	})
	//load map onto screen

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((pos) => {
				//assign coords from navigator to variables
				let locatedLat = pos.coords.latitude
				let locatedLong = pos.coords.longitude
				setState({ ...state, pickupLat: startLat, pickupLong: startLong })

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

				const geolocateControl = new mapboxgl.GeolocateControl({
					positionOptions: { enableHighAccuracy: true },
					showUserHeading: true,
					trackUserLocation: true
				})
				map.addControl(geolocateControl)
				map.addControl(new mapboxgl.FullscreenControl())
				map.addControl(new mapboxgl.NavigationControl())

				map.on('load', () => geolocateControl.trigger())

				if (startLat !== null || startLong !== null) {
					map.on('load', () =>
						new mapboxgl.Marker({})
							.setLngLat([startLong, startLat])
							.addTo(map)
							.trigger()
					)
				}
				map.on('click', addMarkerFunction(map))

				console.log('Map rendered')
			})
		} else {
			alert('Geolocator is not available')
		}
	}, [state.stateLat, startLat])

	return <div id='map' style={{ height: '100vh', width: '100vw' }}></div>
}

export default Map

// useEffect(() => {
// 	if ('geolocation' in navigator) {
// 		navigator.geolocation.getCurrentPosition((pos) => {
// 			//assign coords from navigator to variables
// 			let locatedLat = pos.coords.latitude
// 			let locatedLong = pos.coords.longitude

// 			//watch position for updates and update only if there is a change
// 			navigator.geolocation.watchPosition((updatedPos) => {
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

// 			//create new instance of map
// 			const map = new mapboxgl.Map({
// 				container: 'map',
// 				style: 'mapbox://styles/mapbox/streets-v12',
// 				center: [locatedLong, locatedLat],
// 				zoom: 13,
// 				projection: 'mercator'
// 			})

// 			map.dragRotate.disable()
// 			map.touchZoomRotate.disableRotation()
// 			map.addControl(
// 				new mapboxgl.GeolocateControl({
// 					positionOptions: { enableHighAccuracy: false, timeout: 12000 },
// 					showUserHeading: true,
// 					trackUserLocation: true
// 				})
// 			)
// 			map.addControl(new mapboxgl.FullscreenControl())
// 			map.addControl(new mapboxgl.NavigationControl())
// 			map.on('click', addMarkerFunction(map))

// 			//placing markers

// 			new mapboxgl.Marker().setLngLat([startLong, startLat]).addTo(map)
// 		})
// 	} else {
// 		alert('Geolocator is not available')
// 	}
// }, [startLong, startLat])
