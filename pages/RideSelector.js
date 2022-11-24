import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import RideSelectorData from '../data/RideSelectorData'

const RideSelector = ({ startingPoint, destinationPoint }) => {
	const [rideData, setRideData] = useState()
	return (
		<Wrapper>
			{RideSelectorData.map((ride, index) => (
				<RideContainer
					key={ride.name}
					value={rideData}
					onClick={(e) => setRideData(e.target.value)}
				>
					<RideImage>{ride.image}</RideImage>
					<NameDescContainer>
						<RideName>{ride.name}</RideName>
						<RideDescription>{ride.description}</RideDescription>
					</NameDescContainer>
					<RidePrice>{ride.priceFactor}</RidePrice>
				</RideContainer>
			))}
			<ConfirmContainer>Confirm Trip</ConfirmContainer>
		</Wrapper>
	)
}

export default RideSelector

const Wrapper = tw.div`
flex-1 px-4 pb-4 flex flex-col bg-white absolute left-3.5 top-1/3 rounded-md
`
const RideContainer = tw.div`
  w-full my-2 px-2 py-1 flex flex-row rounded-sm bg-zinc-50 hover:cursor-pointer hover:bg-zinc-200 transition
`
const RideImage = tw.div`
  w-1/12
`
const NameDescContainer = tw.div`
  w-10/12
`
const RideName = tw.div`
  text-xl font-semibold
`
const RideDescription = tw.div`
  text-sm italic
`
const RidePrice = tw.div`
  w-1/12 items-center text-xl font-bold mb-6`
const ConfirmContainer = tw.div`
bg-black text-white mt-4 mb-4 mx-4 text-center py-2 text-xl rounded-md
`
