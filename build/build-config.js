module.exports = new (require("./build-config-reader"))({
	buildVersionFile: "./build-version",
	googlefonts: {
		fontlist: "google-fonts",
		path    : "../public/fonts/",
		css     : "google-fonts.css",
		srcify:{
			fontsurl: '/fonts/',
			srcpath: 'src/google-fonts.less'
		}
	},
	copy       : [
		{src: "./node_modules/@fortawesome/fontawesome-pro/webfonts/", pattern: "*", dest: "../public/fonts/fontawesome/"},
		{src: "../assets/", pattern: "**", dest: "../public/", watch: true},
		{src: "../src/", pattern: "index.html", dest: "../public/", watch: true}
	],
	css        : [
		{src: "../src/css/", dest: "../public/css/"},
	],
	js         : [
		{src: "../src/js/", dest: "../public/js/"},
	]
});