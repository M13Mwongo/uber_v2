import Image from 'next/image'
import logoMain from '../public/assets/logo_big.jpg'
import pImage from '../public/assets/profileImage.jpg'
import circle from '../public/assets/filled-circle.png'
import line from '../public/assets/vertical_line.png'
import square from '../public/assets/square-full.png'
import bike from '../public/assets/bike.png'
import uberx from '../public/assets/uberx.png'
import uberxl from '../public/assets/uberxl.png'
import uberblack from '../public/assets/uberblack.png'
import uberblackXL from '../public/assets/uberblacksuv.png'
import ubercomfort from '../public/assets/uberComfort.png'
import schedule from '../public/assets/schedule.png'
import { BiMapPin } from 'react-icons/bi'
import { IconContext } from 'react-icons'

export const UberLogo = () => {
	return <Image src={logoMain} alt='Logo' height={48} width={122} />
}
export const UserImage = () => {
	return (
		<Image
			src={pImage}
			alt='User Image'
			height={48}
			width={48}
			placeholder='blur'
		/>
	)
}
export const Circle = () => {
	return (
		<Image
			src={circle}
			alt='circle'
			height={96}
			width={96}
			placeholder='blur'
		/>
	)
}
export const Pin = () => {
	return (
		<IconContext.Provider value={{ size: '2em' }}>
			<BiMapPin />
		</IconContext.Provider>
	)
}
export const ll = () => {
	return <Image src={line} alt='line' placeholder='blur' />
}
export const sq = () => {
	return (
		<Image
			src={square}
			alt='square'
			height={20}
			width={20}
			placeholder='blur'
		/>
	)
}
export const Bike = () => {
	return (
		<Image src={bike} alt='Bike' height={96} width={96} placeholder='blur' />
	)
}
export const Reserve = () => {
	return (
		<Image
			src={schedule}
			alt='Reserve'
			height={96}
			width={96}
			placeholder='blur'
		/>
	)
}
export const UberX = () => {
	return (
		<Image src={uberx} alt='UberX' height={96} width={96} placeholder='blur' />
	)
}
export const UberXL = () => {
	return (
		<Image
			src={uberxl}
			alt='UberXL'
			height={96}
			width={96}
			placeholder='blur'
		/>
	)
}
export const UberComfort = () => {
	return (
		<Image
			src={ubercomfort}
			alt='Uber Comfort'
			height={96}
			width={96}
			placeholder='blur'
		/>
	)
}
export const UberBlack = () => {
	return (
		<Image
			src={uberblack}
			alt='Uber Black'
			height={96}
			width={96}
			placeholder='blur'
		/>
	)
}
export const UberBlackXL = () => {
	return (
		<Image
			src={uberblackXL}
			alt='UberX'
			height={96}
			width={96}
			placeholder='blur'
		/>
	)
}
