module.exports = new (require("./build-config-reader"))({
	buildVersion: "./builder/build-version.json",
	googlefonts: {
		fontlist: "google-fonts",
		path    : "./public/fonts/",
		css     : "google-fonts.css"
	},
	copy       : [
		{src: "./node_modules/@fortawesome/fontawesome-pro/webfonts/", pattern: "*", dest: "./public/fonts/fontawesome/"},
		{src: "./src/", pattern: "index.html", dest: "./public/", watch: true}
	],
	css        : [
		{src: "./src/css/", dest: "./public/css/"}
	],
	js         : [
		{src: "./src/js/", dest: "./public/js/"}
	]
});