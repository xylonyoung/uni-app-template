const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
	configureWebpack: {
		plugins: [
			new CopyPlugin([{
				from: path.join(__dirname, '/public'),
				to: path.join(__dirname + '/unpackage/', 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev',
					process.env.UNI_PLATFORM,
					'/')
			}])
		]
	}
}
