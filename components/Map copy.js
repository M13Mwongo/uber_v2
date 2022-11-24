import React, { useEffect, useState, useLayoutEffect } from 'react'
import tw from 'tailwind-styled-components'
import mapboxgl from 'mapbox-gl'
import turf from '@turf/turf'
import polyline from 'polyline'

export const mapToken = (mapboxgl.accessToken =
	'pk.eyJ1IjoibW1tOTciLCJhIjoiY2wybHdpM204MHI0NjNkbnFnbjFneG05dCJ9.igV5GTfa9RLOXtK_SaeOXQ')

const Map = ({ startingPoint, destinationPoint }) => {
	const [long, setLong] = useState(23)
	const [lat, setLat] = useState(-32)

	const addStartToMap = (map, coord) => {
		new mapboxgl.Marker().setLngLat(coord).addTo(map)
	}
	const addDestinationToMap = (map, coord) => {
		new mapboxgl.Marker({ color: 'black' }).setLngLat(coord).addTo(map)
	}

	useLayoutEffect(() => {
		navigator.geolocation.getCurrentPosition((result) => {
			setLat(result.coords.latitude)
			setLong(result.coords.longitude)
		})
	}, [])

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mmm97/cl2m0aoax00a214kszmx0eefu',
			center: [long, lat],
			zoom: 4
		})
		map.dragRotate.disable()
		map.touchZoomRotate.disableRotation()

		// const geolocate = new mapboxgl.GeolocateControl({
		// 	positionOptions: {
		// 		enableHighAccuracy: true
		// 	},
		// 	trackUserLocation: true,
		// 	showAccuracyCircle: true
		// })
		// map.addControl(geolocate)
		// geocoder.addTo('#geocoder-container')

		// map.on('load', function () {
		// 	geolocate.trigger()
		// })

		if (startingPoint) {
			addStartToMap(map, startingPoint)
		}
		if (destinationPoint) {
			addDestinationToMap(map, destinationPoint)
		}
		if (startingPoint && destinationPoint) {
			map.fitBounds([startingPoint, destinationPoint], { padding: 120 })
		}
	}, [startingPoint, destinationPoint])

	return <div id='map'></div>
}

export default Map

const Wrapper_Map = tw.div`
  flex-1
`
