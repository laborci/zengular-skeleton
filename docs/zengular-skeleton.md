# Zengular Skeleton

`https://github.com/laborci/zengular-skeleton`

---

## Mappastruktúra
```
zengular-skeleton
|- assets 
|- build
|  |- node_modules
|  |- package.json
|  |- build-version
|  `- ...
|- public
`- src
   |- css
   |  |- src
   |  |  `-fontawesome.less
   |  |- google-fonts.json
   |  `- style.less
   |- js
   |  |- src
   |  `- app.js
   `- index.html
```

## Build

A build folyamatok eredményeit a `public` mappában láthatod. A public mappát a build előtt akár teljesen ki is ürítheted, nem tárolunk benne semmi újra nem generálható tartalmat. Neked kizárólag az `src` és az `assets` mappába kell dolgoznod!

A build folyamatok definícióit és a npm csomagokat is a build mappában találhatod meg. A build folyamat használ webpack-et és gulp-ot is. A webpack felel a javascript fordításokért, míg a gulp feladatai közé több minden tartozik. Bármelyik folyamatod is dolgozik a kettő közül, az minden esetben azt eredményezi, hogy a `build/build-version` fájlban található verziószámot egyel feljebb állítja.

### webpack

A webpack fordítást elindíthatod `npm run work`, illetve `npm run build` utasítással is. A `work` fejlesztés közbeni fordítás watch-errel, a `build` pedig publikáláskor használandó.

### gulp

A default `gulp` task elvégzi fordítást/másolást, majd a megfelelő helyeken figyel, hogy változás esetén frissíteni tudja az alkalmazásodat. Ha csak egyszeri buildre van szükséged, akkor használd a `guilp build` taskot.

#### google-fonts

A build folymat része, hogy a google fontokat a hozzájuk tartozó css-el együtt letöltjük a google-től. 

```json
{
	"fonts": {
		"Roboto": [500]
	},
	"family": ["latin-ext"],
	"css": "./src/google-fonts.less"
}
```

#### assets

A build folyamat az `asset` mappa teljes tartalmát átmásolja a `public` mappába.

### package.json

A build folymatokat a `package.json` állományban a `zengular-build` kulcs alatt konfigurálhatod. Az ebben levő útvonalak mind a `build` mappához képest vannak megadva.

```json

"zengular-build": {
	// build version file helye
	"buildVersionFile": "./build-version",

	// google fontok kezelése
	// - src: font definíciós állományok
	// - dest: hova kerüljenek a fontok
	// - path: a css-ben mi legyen az útvonal (url)
	"googlefonts": {
		"src": ["../src/css/google-fonts.json"],
		"dest": "../public/fonts/",
		"path": "/fonts/"
	},
	
	// másolási direktívák
	// - src: honnan
	// - pattern: fájl minta
	// - dest: hova
	// - watch: folyamatosan nézze a watcher a forrást és kövesse a változásokat
	"copy": [
		{"src": "./node_modules/@fortawesome/fontawesome-pro/webfonts/", "pattern": "*", "dest": "../public/fonts/fontawesome/"},
		{"src": "../assets/", "pattern": "**", "dest": "../public/", "watch": true},
		{"src": "../src/", "pattern": "index.html", "dest": "../public/", "watch": true}
	],
	"css": [
		{"src": "../src/css/", "dest": "../public/css/"}
	],
	"js": [
		{"src": "../src/js/", "dest": "../public/js/"}
	]
}

```


 