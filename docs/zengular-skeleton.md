# Zengular Skeleton

`https://github.com/laborci/zengular-skeleton`

---

## Mappastruktúra
```
zengular-skeleton
|- assets 
|- build
|  |- node_modules
|  |- build-config.js
|  |- build-version
|  `- ...
|- public
`- src
   |- css
   |  |- src
   |  |  `-fontawesome.less
   |  |- google-fonts
   |  `- style.less
   |- js
   |  |- bricks
   |  `- app.js
   `- index.html
```

## Build

A build folyamatok eredményeit a `public` mappában láthatod. A public mappát a build előtt akár teljesen ki is ürítheted, nem tárolunk benne semmi újra nem generálható tartalmat. Neked kizárólag az `src` és az `assets` mappába kell dolgoznod!

A build folyamatok definícióit és a npm csomagokat is a build mappában találhatod meg. A build folyamat használ webpack-et és gulp-ot is. A webpack felel a javascript fordításokért, míg a gulp feladatai közé több minden tartozik. Bármelyik folyamatod is dolgozik a kettő közül, az minden esetben azt eredményezi, hogy a `build/build-version` fájlban található verziószámot egyel feljebb állítja.

### webpack

A webpack fordítást elindíthatod `npm run work`, illetve `npm run build` utasítással is. A `work` fejlesztés közbeni fordítás watch-errel, a `build` pedig publikáláskor használandó.

### gulp

A default `gulp` task elvégzi fordítást/másolást (`copy`, `fonts`, `compile-less`), majd a megfelelő helyeken figyel, hogy változás esetén frissíteni tudja az alkalmazásodat. Ha csak egyszeri buildre van szükséged, akkor használd a `guilp build` taskot.

#### google-fonts

A build folymat része, hogy a google fontokat a hozzájuk tartozó css-el együtt letöltjük a google-től. Alapvetően a public mappába dolgozik, de ha meg van adva a konfigurációban az `srcify` ág, akkor feldolgozza a létrehozott `.css` állományt és visszamásolja a források közé, hogy egy végső kimeneti css állomány legyen csak, ami a fontokat is tartalmazza.

#### assets

A build folyamat az `asset` mappa teljes tartalmát átmásolja a `public` mappába.

### build-config.js

A build folymatokat a `build/build-config.js` állományban konfigurálhatod. Az ebben levő útvonalak mind a `build` mappához képest vannak megadva.

```js
module.exports = new (require("./build-config-reader"))({

	buildVersionFile: "./build-version", // build version file helye

	// másolási direktívák
	// - src: honnan
	// - pattern: fájl minta
	// - dest: hova
	// - watch: folyamatosan nézze a watcher a forrást és kövesse a változásokat
	copy: [
		// amennyiben van fontawesome csomagod, akkor átmásolhatod a public mappába
		{
			src    : "./node_modules/@fortawesome/fontawesome-pro/webfonts/", 
			pattern: "*", 
			dest   : "../public/fonts/fontawesome/"
		},
		// assetek másolása
		{
			src    : "../assets/", 
			pattern: "**", 
			dest   : "../public/", 
			watch  : true
		},
		// index.html másolása
		{
			src.   : "../src/",
			pattern: "index.html",
			dest   : "../public/",
			watch  : true
		}
	],

	// google fontok kezelése
	// - fontlist: font definíciós állomány neve a "css" forráson belül
	// - path: hova kerüljenek a fontok
	// - css: a kimeneti .css állomány neve
	// - srcify: a kimeneti css visszamásolása a forrásmappába
	//   - fontsurl: a font fáljokhoz vezető url
	//   - a "css" forráson belül mi legyen a fájl neve
	googlefonts: {
		fontlist: "google-fonts",
		path    : "../public/fonts/", 
		css     : "google-fonts.css" 
		srcify  : {
			fontsurl: '/fonts/',
			srcpath : 'src/google-fonts.less'
		}
	},
	
	// a less fordító konfigurálása - akár több forrás-cél mappa párt is megadhatsz
	// a forrás mappában közvetlen .less fileok kerülnek fordításra
	// - src: honnan
	// - dest: hova
	css: [
		{
			src : "../src/css/",
			dest: "../public/css/"
		},
	],
	
	// a js fordító konfigurálása - akár több forrás-cél mappa párt is megadhatsz
	// a forrás mappában közvetlen .js fileok kerülnek fordításra
	// - src: honnan
	// - dest: hova
	js: [
		{
			src : "../src/js/", 
			dest: "../public/js/"
		},
	]
});
```


 