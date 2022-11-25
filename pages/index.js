import React from 'react'
import { useStateValue } from './contextAPI/StateProvider.js'
import Map from '../components/Map.js'
import Search from './search.js'
import { UberLogo, Menu } from '../public/index.js'

export default function Home() {
	const [{ startPoint, endPoint, test }] = useStateValue()
	const testArray = [18.822968, -34.070529]

	return (
		<div className='wrapper'>
			<div className='map'>
				<Map></Map>
			</div>

			<div className='search__container'>
				<div className='header'>
					ContextStart: {startPoint}
					<div className='profile'>
						<Menu />
					</div>
				</div>
				<div className='search'>
					<Search />
				</div>
			</div>
		</div>
	)
}
