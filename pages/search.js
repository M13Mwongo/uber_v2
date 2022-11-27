import { useState, useEffect } from 'react'
import { useStateValue } from './contextAPI/StateProvider.js'
import axios from 'axios'
import { mapToken } from '../components/Map'
import { Reset, Circle, Square, Line } from '../public'
import { Box, Button, Typography } from '@mui/material'
import { TRUE } from 'sass'

const Search = () => {
	const [state, setState] = useState({
		startpoint: '',
		endpoint: '',
		selectedStart: null,
		selectedEnd: [],
		startSearchResult: [],
		endSearchResult: [],
		startChecked: false,
		endChecked: false
	})
	//define parameters for contextAPI
	const [{ endPoint, startLat, startLong, errorMessage }, dispatch] =
		useStateValue()

	//Regular functions
	const handleChange = (id) => {
		if (id === 'start') {
			setState({ ...state, startChecked: !state.startChecked })
		}
		if (id === 'end') {
			setState({ ...state, endChecked: !state.endChecked })
		}
	}
	const reset = () => {
		setState({
			startpoint: '',
			endpoint: '',
			startSearchResult: [],
			endSearchResult: []
		})
		dispatch({
			type: 'RESET'
		})
	}
	const getStartCoordinate = (point) => {
		// const errorHandler = (err) => {
		// 	dispatch({
		// 		type: 'AXIOS_ERROR',
		// 		errorCode: err.code,
		// 		errorMessage: err.message
		// 	})
		// 	console.log(errorMessage)
		// }

		if (state.startpoint !== '') {
			axios
				.get(
					`https://api.mapbox.com/geocoding/v5/mapbox.places/${point}.json?` +
						new URLSearchParams({
							access_token: mapToken,
							limit: 8,
							proximity: 'ip'
						})
				)
				.then((response) => {
					let resultArray = response.data.features
					setState({ ...state, startSearchResult: resultArray })
					//console.log(resultArray)
				})
				.catch((err) => console.log(err))
		}
	}
	const getEndCoordinate = (point) => {
		if (state.endpoint !== '') {
			axios
				.get(
					`https://api.mapbox.com/geocoding/v5/mapbox.places/${point}.json?` +
						new URLSearchParams({
							access_token: mapToken,
							limit: 8,
							proximity: 'ip'
						})
				)
				.then((response) => {
					let resultArray = response.data.features
					setState({ ...state, endSearchResult: resultArray })
				})
				.catch((err) => console.log(err))
		}
	}
	const selectedStartCoordinate = (point) => {
		setState({
			...state,
			selectedStart: [point.center[0], point.center[1]],
			startpoint: point.text
		})
		//dispatch to ContextAPI
		dispatch({
			type: 'START_LOCATION',
			latitude: point.center[0],
			longtitude: point.center[1],
			location: point.center
		})
	}
	const selectedEndCoordinate = (point) => {
		setState({
			...state,
			selectedEnd: point.center,
			endpoint: point.text
		})
		dispatch({
			type: 'END_LOCATION',
			location: point.center
		})
		console.log('Selected End Coordinate:' + state.selectedEnd)
		console.log('ContextEnd:' + endPoint)
	}
	const selectedCoordinate = (id, point) => {
		if (id === 'start') {
			selectedStartCoordinate(point)
		}
		if (id === 'end') {
			selectedEndCoordinate(point)
		}
	}
	const updateStartInput = (e) => {
		setState({
			...state,
			startpoint: e.target.value,
			startChecked: true
		})
	}

	//destructured Component
	const SearchResults = ({ id, searchResults }) => {
		return (
			<div className='searchResults__wrapper'>
				{searchResults.map((result) => (
					<div
						className='result__wrapper'
						key={result.id}
						onClick={() => selectedCoordinate(id, result)}
					>
						<div className='result__title'>{result.text}</div>
						<div className='result__description'>{result.place_name}</div>
					</div>
				))}
			</div>
		)
	}
	const Pop = () => {
		return (
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
			>
				<Typography sx={{ p: 2 }}>
					<SearchResults
						id='start'
						searchResults={state.startSearchResult}
						searchConfirm={state.selectedStart}
					/>
				</Typography>
			</Popover>
		)
	}
	//execute coordinate functions when user types in values
	useEffect(() => {
		getStartCoordinate(state.startpoint)
		getEndCoordinate(state.endpoint)
	}, [state.startpoint, state.endpoint])

	return (
		<div className='search__wrapper'>
			<div className='search__header'>
				<button onClick={reset}>
					<Reset sz='2em' />
					<span>Start Again</span>
				</button>
				{/* <Button aria-describedby={id} variant='contained' onClick={handleClick}>
					Open Popover
				</Button> */}
			</div>
			{/* Container holding the search element */}
			<div className='search__inputContainer'>
				<div className='search__left_col'>
					<Circle h={12} w={12} />
					<Line h={50} w={2.5} />
					<Square dim={12} />
				</div>
				<div className='search__right_col'>
					<input
						placeholder='Enter pickup location'
						value={state.startpoint}
						onChange={updateStartInput}
						onBlur={() => setState({ ...state, startChecked: false })}
					/>
					<div
						className='search__results search__results--start'
						style={{ display: state.startChecked ? 'block' : 'none' }}
					>
						<SearchResults
							id='start'
							searchResults={state.startSearchResult}
							searchConfirm={state.selectedStart}
						/>
					</div>

					{/* <div
						className='search__input--line'
						//style={{ height: state.startChecked ? '150px' : '50px' }}
					>
						<SearchResults
							id='start'
							searchResults={state.startSearchResult}
							searchConfirm={state.selectedStart}
						/>
					</div> */}
					<input
						placeholder='Enter destination'
						value={state.endpoint}
						onChange={(e) => {
							setState({ ...state, endpoint: e.target.value })
						}}
					/>
					{/* <div
						className='search__input--line'
						style={{ height: state.endChecked ? '150px' : '50px' }}
					>
						<SearchResults
							id='end'
							searchResults={state.endSearchResult}
							searchConfirm={state.selectedEnd}
						/>
					</div> */}
				</div>
			</div>
		</div>
	)
}

export default Search
