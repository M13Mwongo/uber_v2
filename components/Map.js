import React, { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { useCookies } from 'react-cookie'
import { Circle } from '../public'
import { BsFillPinMapFill as Mappin } from 'react-icons/bs'

export const mapToken = (mapboxgl.accessToken =
	'pk.eyJ1IjoibW1tOTciLCJhIjoiY2wybHdpM204MHI0NjNkbnFnbjFneG05dCJ9.igV5GTfa9RLOXtK_SaeOXQ')

export const mapDefaults = () => {
	return { zoom: 20 }
}
const Map = ({ startingPoint, destinationPoint }) => {
	const [cookies, setCookie, removeCookie] = useCookies([
		'latitude',
		'longitude'
	])
	const [state, setState] = useState({
		latitude: cookies.latitude || 37,
		longitude: cookies.longitude || 2
	})

	//add current location marker to map
	const addMarkerToMap = (map, coord) => {
		const el = document.createElement('div')
		el.className = 'marker'

		new mapboxgl.Marker(el)
			.setLngLat(coord)
			.setPopup(
				new mapboxgl.Popup({ offset: 25 }) // add popups
					.setHTML(`<h3>Your Location</h3>`)
			)
			.addTo(map)
	}
	//start marker
	const addStartToMap = (map, coord) => {
		new mapboxgl.Marker().setLngLat(coord).addTo(map)
	}
	//destination marker
	const addDestinationToMap = (map, coord) => {
		new mapboxgl.Marker({ color: 'black' }).setLngLat(coord).addTo(map)
	}

	//load map onto screen
	useEffect(() => {
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
				addMarkerToMap(map, locatedCoords)

				//placing markers
				if (startingPoint) {
					addStartToMap(map, startingPoint)
				}
				if (destinationPoint) {
					addDestinationToMap(map, destinationPoint)
				}
				if (startingPoint && destinationPoint) {
					map.fitBounds([startingPoint, destinationPoint], { padding: 120 })
				}
			})
		} else {
			alert('Geolocator is not available')
		}
	}, [])

	return <div id='map' style={{ height: '67vh', width: '100vw' }}></div>
}

export default Map
