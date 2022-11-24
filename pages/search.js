import React, { useState } from 'react'
import Link from 'next/link'
import tw from 'tailwind-styled-components'
import Confirm from './confirm'
//import { CircleDot, LineDot, SquareDot } from '../public'
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack'
import { Star } from '@styled-icons/evaicons-solid/Star'

const Search = () => {
	const [startpoint, setStartPoint] = useState('')
	const [endpoint, setEndPoint] = useState('')

	return (
		<Wrapper>
			<MainContainer>
				<Link href='/' passHref>
					<BackArrow />
				</Link>

				<InputContainer>
					<FromToIcons>
						<CircleDot src='https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png' />
						<LineDot src='https://img.icons8.com/ios/50/9CA3AF/vertical-line.png' />
						<SquareDot src='https://img.icons8.com/windows/50/000000/square-full.png' />
					</FromToIcons>
					<InputBoxes>
						<Input
							placeholder='Enter pickup location'
							value={startpoint}
							onChange={(e) => setStartPoint(e.target.value)}
						/>
						<Input
							placeholder='Enter Destination'
							value={endpoint}
							onChange={(e) => setEndPoint(e.target.value)}
						/>
					</InputBoxes>
					<PlusIcon src='https://img.icons8.com/ios/50/000000/plus-math.png' />
				</InputContainer>

				<SavedPlaces>
					Saved Places
					<StarIcon src='https://img.icons8.com/ios-filled/50/ffffff/star--v1.png' />
				</SavedPlaces>
			</MainContainer>

			<Confirm startpoint={startpoint} endpoint={endpoint} />
		</Wrapper>
	)
}

export default Search

const Wrapper = tw.div`
	bg-gray-200 h-full overflow-visible
`
const MainContainer = tw.div`
	bg-white px-4 py-2 flex-row flex items-center justify-between
`
const BackArrow = tw(ArrowBack)`
	cursor-pointer transform hover:scale-90 h-10 transition
`
const SavedPlaces = tw.div`
	flex items-center bg-white px-4 py-2 my-1 
`
const FromToIcons = tw.div`
 w-10 flex flex-col mr-3 items-center
`
const InputContainer = tw.div`
	bg-white flex items-center px-4 w-10/12
`
const InputBoxes = tw.div`
flex flex-col flex-1
`
const Input = tw.input`
	bg-gray-200 h-10 my-2 px-2 rounded-md
`
const PlusIcon = tw.img`
	h-10 w-10 bg-gray-200 rounded-full ml-3
`
const CircleDot = tw.img`
	h-3
`
const LineDot = tw.img`
	h-10
`
const SquareDot = tw.img`
	h-3
`

const StarIcon = tw(Star)`
fill-black h-10 w-10 border-2 border-solid border-gray-600 rounded-full p-2 mx-2
`
const ConfirmButtonContainer = tw.div`
	flex justify-center
`
const ConfirmTrip = tw.button`
	bg-black text-white py-2 rounded-sm w-6/12 cursor-pointer transform hover:scale-95 transition
`
