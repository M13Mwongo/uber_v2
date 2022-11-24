import React from 'react'
import { getCurrentPos } from './contextAPI/Reducer.js'
import Map from '../components/Map.js'
import Link from 'next/link'
import {
	UberLogo,
	UserImage,
	UberComfort,
	Bike,
	Reserve,
	Pin
} from '../public/index.js'

export default function Home() {
	return (
		<div className='wrapper_home'>
			<div className='recenter'>
				<button>
					<Pin />
				</button>
			</div>
			<div className='map'>
				<Map></Map>
			</div>

			<div className='action__items'>
				<div className='header'>
					<UberLogo />
					<div className='profile'>
						<p>Mwiti Mwongo</p>
						<UserImage />
					</div>
				</div>

				<div className='action__buttons'>
					<div className='action__buttons--button'>
						<Link href='/search' passHref>
							<div className='child'>
								<UberComfort />
								<strong>Ride</strong>
							</div>
						</Link>
					</div>

					<div className='action__buttons--button'>
						<div className='child'>
							<Bike />
							<strong>Wheels</strong>
						</div>
					</div>

					<div className='action__buttons--button'>
						<div className='child'>
							<Reserve />
							<strong>Reserve</strong>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
