# AppEvents

Az AppEvents része a `zengular-brick` csomagnak.

---

Az applikációd biztosan fülel dom eseményekre, amiket kezelsz is. Kattintás, scrollozás, stb... Ezen felül az applikációd - mivel applikáció - jobb esetben saját eseményeket is kezel. Ezeket hívjuk **AppEvents**-nek. Az alap struktúra egy applikációban egymásba ágyazott elemeket (brickeket) feltételez, mindegyik elemhez egy-egy kontroller osztály példánnyal.

Ha jól tervezed és írod a programodat, akkor azt úgy teszed, hogy a tégládnak tudomása van minden saját maga alatt megjelenő új téláról, hiszen azokat ő hozza létre. Mivel tud róluk, ezért direkt módon meg is szólíthatod őket, sőt, a metódusaikat is meg tudod hívni.

```js
this.find(MyChartBrick.selector).controller.recalculate();
```

Azaz lefele tudsz direkt kommunikálni, hiszen tisztában vagy minden api-val, viszont, amikor a tégládat írod, nem tudhatod, hogy milyen környezetben fogja azokat egy másik programozó felhasználni - azaz milyen téglák azok, amik a te téglád "felett állnak". Az ilyen irányú kommunikációt mindig eseményekkel oldjuk meg.

Erre az AppEvent-eket használjuk. Ha a téglád szeretne `AppEvent`-ekkel dolgozni, akkor add hozzá a `useAppEventManager` dekorátort. Ez esetben a brickben létrejön egy `appEventManager` tulajdonsága a tégládnak, akin keresztül eseményeket tudsz indítani és fülelhetsz mások által indított eseményekre.

```js
// küldünk egy 'backClicked' eseményt, 
this.appEvenetManager.fire('backClicked');

// amit valahol valaki egy másik brickben elkap és feldolgoz
this.appEventManager.listen('backClicked', appEvent=>{ ... }));
```

## fire()
`fire(eventType, data = null, bubbles = true, cancelable = true)`

- `eventType` : az eseményed neve.
- `data` : adatok, amik az eseményhez tartoznak
- `bubbles` : a kilövés helyén álljon e meg az esemény (`false`) vagy szeretnénk, ha eljutna a a root node-ig (`true`)
- `cancelable` : az esemény propagáció (bubbles) megállítható e?

## listen()
`listen(eventType, handler)`

`listen(eventType, source, handler)`

- `eventType` : az esemény neve, amire feliratkozol
- `source` : opcionális, annak a bricknek a neve (`MyBrick.tag`), akitől az üzenetet elfogadod
- `handler` : az eseménykezelő metódus

## AppEvent

Az eseménykezelő metódus paraméterként egy `AppEvent` példányt fog kapni, aminek az alábbi tulajdonságai vannak:

- `type` : az esemény neve
- `data` : az eseményhez kapcsolódó adatok
- `source` : az eseményt küldő objektum (brick)
- `domEvent` : az appEventet hordozó `CustomEvent`

Az appEvent egyteln egy fontos metódussal rendelkezik: `cancel()`, amivel, ha az eseményt feldolgoztad, akkor meg tudod állítani annak további propagálását.

```js
this.appEventManager.listen('backClicked', appEvent=>{
	// do whatever you want to...
	console.log(appEvent.data);
	appEvent.cancel();
});
```