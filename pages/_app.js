import { CookiesProvider } from 'react-cookie'
import { StateProvider } from './contextAPI/StateProvider'
import reducer, { initialState } from './contextAPI/Reducer'
import '../styles/main.scss'

function MyApp({ Component, pageProps }) {
	return (
		<CookiesProvider>
			<StateProvider initialState={initialState} reducer={reducer}>
				<Component {...pageProps} />
			</StateProvider>
		</CookiesProvider>
	)
}

export default MyApp
