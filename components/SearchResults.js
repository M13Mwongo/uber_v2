import React from 'react'
import { Button, Popover } from '@mui/material'

const SearchResults = ({
	id,
	searchResults,
	searchConfirm,
	open,
	anchorEl,
	onClose
}) => {
	return (
		<Popover
			id={id}
			open={open}
			anchorEl={anchor}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
		>
			{searchResults.map((result) => (
				<div
					className='result__wrapper'
					key={result.id}
					onClick={selectCoordinate(result.center)}
				>
					<div className='result__title'>{result.text}</div>
					<div className='result__description'>{result.place_name}</div>
				</div>
			))}
		</Popover>
	)
}

export default SearchResults

/*
Interested fields in the result
*Result is an array, thus map outcome
->id = used as key
->text = defines place
->center = coordinates of center of place [long,lat]
->place name = proper definition of place

*/

// const SearchResults = ({ id, searchResults, searchTerm, searchConfirm }) => {
// 	return (
// 		<div
// 			className='searchResults__wrapper'
// 			style={{
// 				top: id === 'start' ? '47%' : '100%',
// 				visibility: searchConfirm !== null ? 'visible' : 'hidden'
// 			}}
// 		>
// 			{searchResults.map((result) => (
// 				<div
// 					className='result__wrapper'
// 					key={result.id}
// 					onClick={selectCoordinate(result.center)}
// 				>
// 					<div className='result__title'>{result.text}</div>
// 					<div className='result__description'>{result.place_name}</div>
// 				</div>
// 			))}
// 		</div>
// 	)
// }
