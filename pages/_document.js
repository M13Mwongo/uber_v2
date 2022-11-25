import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<link rel='icon' href='/uber.ico' />
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link
						rel='preconnect'
						href='https://fonts.gstatic.com'
						crossOrigin='true'
					/>
					{/* Google Fonts */}
					<link
						href='https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap'
						rel='stylesheet'
					/>
					{/* Mapbox GL JS stylesheet */}
					<link
						href='https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css'
						rel='stylesheet'
					/>
					{/* Mapbox GL Geocoder stylesheet */}
					<link
						rel='stylesheet'
						href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css'
						type='text/css'
					></link>

					<meta
						name='description'
						content='Uber Clone | Get from one place to another with the click of a button'
					/>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
