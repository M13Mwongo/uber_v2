import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import Map, { mapToken } from '../components/Map'
import RideSelector from './RideSelector.js'

const Confirm = ({ startpoint, endpoint }) => {
	const [start, setStart] = useState()
	const [destination, setDestination] = useState()

	const getStartCoordinates = (originCoord) => {
		if (originCoord) {
			fetch(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${originCoord}.json?` +
					new URLSearchParams({ access_token: mapToken, limit: 2 })
			)
				.then((response) => response.json())
				.then((data) => {
					setStart(data.features[0].center)
				})
		}
	}

	const getDestinationCoordinates = (finalCoord) => {
		if (finalCoord) {
			fetch(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${finalCoord}.json?` +
					new URLSearchParams({ access_token: mapToken, limit: 2 })
			)
				.then((response) => response.json())
				.then((data) => {
					setDestination(data.features[0].center)
				})
		}
	}

	useEffect(() => {
		getStartCoordinates(startpoint), getDestinationCoordinates(endpoint)
	}, [startpoint, endpoint])

	return (
		<Wrapper>
			<Map startingPoint={start} destinationPoint={destination} />
			<Title>Choose a ride from the options below</Title>
			<RideSelector startingPoint={start} destinationPoint={destination} />
		</Wrapper>
	)
}

export default Confirm

const Wrapper = tw.div`
	flex flex-col h-screen bg-white 
`
const Title = tw.div`
text-gray-800 text-center text-xs py-2 borderb italic
`
