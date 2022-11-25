import React, { useState, useEffect } from 'react'
import { useStateValue } from './contextAPI/StateProvider.js'
import axios from 'axios'
import { mapToken } from '../components/Map'
import { Reset, Circle, Square, Line } from '../public'
import {
	Box,
	Button,
	Collapse,
	Slide,
	Fade,
	Grow,
	Popover,
	Typography
} from '@mui/material'

const Search = () => {
	const [state, setState] = useState({
		startpoint: '',
		endpoint: '',
		selectedStart: [],
		selectedEnd: [],
		startSearchResult: [],
		endSearchResult: [],
		startChecked: false,
		endChecked: false
	})
	//define parameters for contextAPI
	const [{ startPoint, endPoint }, dispatch] = useStateValue()

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
	}
	const getStartCoordinate = (point) => {
		if (state.startpoint !== '') {
			axios
				.get(
					`https://api.mapbox.com/geocoding/v5/mapbox.places/${point}.json?` +
						new URLSearchParams({ access_token: mapToken, limit: 8 })
				)
				.then((response) => {
					let resultArray = response.data.features
					setState({ ...state, startSearchResult: resultArray })
					console.log(resultArray)
				})
				.catch((err) => console.log(err))
		}
	}
	const getEndCoordinate = (point) => {
		if (state.endpoint !== '') {
			axios
				.get(
					`https://api.mapbox.com/geocoding/v5/mapbox.places/${point}.json?` +
						new URLSearchParams({ access_token: mapToken, limit: 8 })
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
			selectedStart: point.center,
			startpoint: point.text
		})
		//dispatch to ContextAPI
		dispatch({
			type: 'START_LOCATION',
			location: point.center
		})
		console.log('Selected Start Coordinate:' + state.selectedStart)
		console.log('ContextStart:' + typeof startPoint)
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

	//destructured Component
	const SearchResults = ({ id, searchResults }) => {
		return (
			<div
				className='searchResults__wrapper'
				style={{
					top: id === 'start' ? '48%' : id === 'end' && '85%',
					height: '100px'
				}}
			>
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
					vertical: 'bottom',
					horizontal: 'left'
				}}
			>
				<Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
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
			</div>
			{/* Container holding the search element */}
			<div className='search__inputContainer'>
				<div className='search__input--input'>
					<Circle h={12} w={12} />
					<input
						className='search__input'
						placeholder='Enter pickup location'
						value={state.startpoint}
						onChange={(e) => {
							setState({ ...state, startpoint: e.target.value })
						}}
					/>
				</div>
				<div
					className='search__input--line'
					//style={{ height: state.startChecked ? '150px' : '50px' }}
				>
					<Line h={50} w={2.5} />
					<SearchResults
						id='start'
						searchResults={state.startSearchResult}
						searchConfirm={state.selectedStart}
					/>
				</div>
				<div className='search__input--input'>
					<Square dim={12} />
					<input
						className='search__input'
						placeholder='Enter destination'
						value={state.endpoint}
						onChange={(e) => {
							setState({ ...state, endpoint: e.target.value })
						}}
					/>
				</div>
				<div
					className='search__input--line'
					style={{ height: state.endChecked ? '150px' : '50px' }}
				>
					<SearchResults
						id='end'
						searchResults={state.endSearchResult}
						searchConfirm={state.selectedEnd}
					/>
				</div>
			</div>
		</div>
	)
}

export default Search
