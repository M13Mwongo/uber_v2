import { uberBlack, uberBlackXL, uberComfort, uberX, uberXL } from './index.js'

const RideSelectorData = [
	{
		name: 'UberX',
		image: uberX(),
		description: 'Affordable, everday rides',
		priceFactor: 1
	},
	{
		name: 'UberXL',
		image: uberXL(),
		description: 'Affordable rides for groups of up to 6 people',
		priceFactor: 1.25
	},
	{
		name: 'Uber Black',
		image: uberBlack(),
		description: 'Premium rides in luxury cars',
		priceFactor: 1.75
	},
	{
		name: 'Uber BlackXL',
		image: uberBlackXL(),
		description: 'Premium rides in luxury cars for large groups',
		priceFactor: 2
	},
	{
		name: 'Uber Comfort',
		image: uberComfort(),
		description: 'Newer cars with extra legroom',
		priceFactor: 1.15
	}
]

export default RideSelectorData
