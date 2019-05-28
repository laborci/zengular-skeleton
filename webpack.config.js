let buildConfig = require("./builder/build-config.js");

module.exports = [
	{
		name   : 'Transpiler',
		entry  : buildConfig.jsEntries,
		output : {filename: '[name].js', path: __dirname},
		resolve: {modules: ['./node_modules']},
		module : {
			rules: [
				{
					test: /\.js$/,
					use : {
						loader : 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: [
								["@babel/plugin-proposal-decorators", {"legacy": true}],
								"@babel/plugin-proposal-class-properties",
								"@babel/plugin-proposal-object-rest-spread",
								"@babel/plugin-proposal-optional-chaining"
							]
						}
					}
				},
				{
					test: /\.(html)$/,
					use : "html-loader"
				},
				{
					test: /\.twig$/,
					use : "twig-loader"
				},
				{
					test: /@\.less$/, // loads @*.less as a string
					use : ["html-loader", "less-loader"]
				},
				{
					test: /[^@]\.less$/,
					use : ["style-loader", "css-loader", "less-loader"]
				},
				{
					test: /\.css$/,
					use : ["style-loader", "css-loader"]
				}
			]
		}
	}];
