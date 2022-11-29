import { useState, useEffect } from 'react'
import { useStateValue } from './contextAPI/StateProvider.js'
import axios from 'axios'
import { mapToken } from '../components/Map'
import { Reset, Circle, Square, Line } from '../public'
import { Box, Button, Typography } from '@mui/material'
import { TRUE } from 'sass'

const Search = ({ click }) => {
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
	const selectedCoordinate = (id, point) => {
		if (id === 'start') {
			setState({
				...state,
				selectedStart: [point.center[0], point.center[1]],
				startpoint: point.text,
				startChecked: false
			})
			//dispatch to ContextAPI
			dispatch({
				type: 'START_LOCATION',
				latitude: point.center[1],
				longitude: point.center[0],
				location: point.center
			})
			// console.log('State Start Coordinate:' + state.selectedStart)
			// console.log('ContextEnd:' + startLong + ',' + startLat)
		}
		if (id === 'end') {
			setState({
				...state,
				selectedStart: [point.center[0], point.center[1]],
				endpoint: point.text,
				endChecked: false
			})
			dispatch({
				type: 'END_LOCATION',
				latitude: point.center[1],
				longitude: point.center[0],
				location: point.center
			})
			console.log('State End Coordinate:' + state.selectedEnd)
			console.log('ContextEnd:' + endPoint)
		}
	}
	const updateInput = (id) => (e) => {
		if (id === 'start') {
			setState({
				...state,
				startpoint: e.target.value,
				startChecked: true
			})
		}
		if (id === 'end') {
			setState({
				...state,
				endpoint: e.target.value,
				endChecked: true
			})
		}
	}

	//destructured Component
	const SearchResults = ({ id, searchResults }) => {
		return (
			<div className='searchResults__wrapper'>
				{searchResults.map((result) => (
					<button
						className='result__wrapper'
						key={result.id}
						onClick={() => selectedCoordinate(id, result)}
					>
						<div className='result__title'>{result.text}</div>
						<div className='result__description'>{result.place_name}</div>
					</button>
				))}
			</div>
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
						onChange={updateInput('start')}
						style={{
							border: state.startpoint ? '2px solid #27ae60' : '2px solid black'
						}}
					/>
					<div
						className='search__results search__results--start'
						style={{ display: state.startChecked ? 'block' : 'none' }}
					>
						<SearchResults id='start' searchResults={state.startSearchResult} />
					</div>
					<input
						placeholder='Enter destination'
						value={state.endpoint}
						onChange={updateInput('end')}
						style={{
							border: state.endpoint ? '2px solid #27ae60' : '2px solid black'
						}}
					/>
					<div
						className='search__results search__results--end'
						style={{ display: state.endChecked ? 'block' : 'none' }}
					>
						<SearchResults id='end' searchResults={state.endSearchResult} />
					</div>
				</div>
			</div>
			<div className='search__button'>
				<button onClick={click}>Confirm Trip</button>
			</div>
		</div>
	)
}

export default Search
