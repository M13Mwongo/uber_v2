// /** @type {import('next').NextConfig} */
const nextConfig = {
	resolve: {
		fallback: {
			fs: false
		}
	},
	reactStrictMode: true
}

module.exports = nextConfig
