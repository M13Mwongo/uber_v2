import Head from 'next/head'
import { CookiesProvider } from 'react-cookie'
import { StateProvider } from './contextAPI/StateProvider'
import reducer, { initialState } from './contextAPI/Reducer'
import '../styles/main.scss'

function MyApp({ Component, pageProps }) {
	return (
		<CookiesProvider>
			<Head>
				<title>Uber Clone | Ride sharing made easy</title>
			</Head>
			<StateProvider initialState={initialState} reducer={reducer}>
				<Component {...pageProps} />
			</StateProvider>
		</CookiesProvider>
	)
}

export default MyApp
