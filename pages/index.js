import React from 'react'
import { useStateValue } from './contextAPI/StateProvider.js'
import Map from '../components/Map.js'
import Search from './search.js'
import { UberLogo, Menu } from '../public/index.js'

export default function Home() {
	const [{ startLat, startLong, test }] = useStateValue()

	return (
		<div className='wrapper'>
			<div className='map'>
				<Map></Map>
			</div>

			<div className='search__container'>
				<div className='header'>
					<UberLogo />
					{/* StartCoord:[{startLong},{startLat}] */}
					<div className='profile'>
						<Menu />
					</div>
				</div>
				<Search />
			</div>
		</div>
	)
}
