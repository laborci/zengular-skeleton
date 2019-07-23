# Brick

telepítés: `npm install zengular-brick`

---
A Zengular alkalmazás **brick**ekből áll. A brickek nem mások, mint egy-egy kiterjesztett html tag, saját kontroller logikával és templéttel. Ezeket az általános html elemektől az `is` attributum különbözteti meg.

```html
<div is="my-brick"></div>
```

Egy általános brick definíció két fájlból áll, a kontroller osztályból és a hozzá kapcsolódó templétből, aminek a legegyszerűbb formájára példa az alábbi kód:

*brick.js*

```js
import Brick from "zengular-brick";
import twig from "./template.twig";

@Brick.register('my-brick', twig)
class MyBrick extends Brick{}
```

*template.twig*

```twig
Hello Word!
```
## Brick dekorátorok

Az alábbi dekorátorok segítségével tudod a brickek alapvető működését módosítani definiálni.

#### Register
```js
@Brick.register(tag, twig=null)
```
Kötelező dekorátor, ezzel a sorral definiálhatod, hogy mi a brick neve, illetve, hogy melyik twig tartozik hozzá. Mint látod, a twig megadása nem kötelező, viszont ebben az esetben egy nem renderelő brickről beszélünk, később részletesen erről szó esik majd az AppBrick fejezetben.

#### ObserveAttributes

```js
@Brick.observeAttributes(value = true)
```
A brick feliratkozhat attribumum változás eseményre, amennyiben használod ezt a dekorátort. Ha true argumentumot használsz, minden attributum változásról kapsz értesítést, ha viszont egy tömböt adsz át attributumok listájával, csak a megnevezett attributumok változásáról értesülsz az `onAttributeChange()` metóduson keresztül. 

A brick, ha nem használod ezt a dekorátort nem figyel az attributumok változására.

#### RenderOnConstruct
```js
@Brick.renderOnConstruct(value = true)
```
A brick alapesetben amikor a dom-ba bekerül rendereli önmagát. Ezzel a dekorátorral és explicit ```false``` érték megadásával tudod ezt megtiltani. (ekkor neked kell gondoskodnod a renderelésről, a brick kontrollerében levő `setup(args = {})` metódus meghívásával)

```js
this.find(MyLateSetupBrick.selector).controller.setup();
```

#### InitializeSubBricksOnRender
```js
@Brick.initializeSubBricksOnRender(value = true)
```
Amennyiben szükség van rá - azaz az ` onRender()` metódusban dolgoznál a subbrickek kontrollereivel -, explicit ki lehet mondani, hogy a renderelés után, de még az `onRender()` metódus meghívása előtt, a renderelt tartalmak brickjeit a rendszer biztosan inicializálja számodra.

#### AddClass
```js
@Brick.addClass(<string, array>class)
```
A bricked automatikusan fűzze hozzá a paraméterként kapott css osztályt, osztályokat a `root` elemének `classList`-jéhez.

#### UseAppEventManager
```js
@Brick.useAppEventManager(value = true)
```
A brick használja az `AppEvent` eseményeket az `appEventManager` tulajdonságán keresztül.

## A brick tulajdonságai

- `root` : A brick kontrollerén belül annak html reprezentációját a `this.root` tulajdonságon keresztül érheted el!
- `root.controller` : A brick kontrollerét kívülről a brick dom node controller tulajdonságán keresztül tudod elérni.
- `dataset` : Egy referencia a brick dom node dataset tulajdonságára.
- `args` : Ha a `setup()` metóduson keresztül inicializálod a bricket, akkor a setup argumentumát tárolja.
- `appEventManager` : Ha használsz AppEventeket, (`useAppEventManager` dekorátor), akkor a kapcsolódó metódusokat ezen keresztül érheted el.

## A brick statikus tulajdonságai

- `tag` : A brick neve található itt.
- `twig` : A brick által használt template érhető el ezen keresztül.
- `selector` : A brick taggel felparaméterezett selectora (pl: `[is=my-brick]`).

## Brick Template és a viewModel

A **Zengular-Brick** *Twig* templéteket használ. Átalában egy brickhez egy darab template tartozik, de persze írhatsz olyan logikát, amivel több templétet is felhasználsz. (https://twig.symfony.com/)

A templétjeid nem csak puszta html állományok, hanem a legtöbbször logikát is tartalmaznak. A logika megvalósításához adatokat kell kapjnak, ezt hívjuk viewModel-nek. A viewModelek összeállításáról a `createViewModel()` metódusodnak kell gondoskodnia. A viewModel összeállításához több forrásból is származhatnak információid:

- A `this.dataset` objektum a bricket burkoló html elem - a `root` - dataset tulajdonságát  érheted el, azaz annak `data-...` attributumait.
- Amennyiben az brick nem automatikusan lett renderelve, hanem ezt manuálisan teszed meg (láds: `renderOnConstruct` dekorátor), akkor a `this.args` tulajdonságon keresztül elérhetsz extra argumentumokat is, amit a `setup()` metódus paramétereként kap meg a brick.
- Amennyiben még több adatot szeretnél átadni a bricknek, megteheted azt a brick "belsejében", például egy template tag tartalmába írt json stringen keresztül. A brick alap működése az, hogy automatikusan törli a tartalmát, majd a template-ben definiált tartalmat rendereli maga alá. Ez az `onInitialize()` metódus meghívása után történik meg, azaz az `onInitialize()` metóduson belül még olvashatod a `this.root` tartalmát és adatokat nyerhetsz ki belőle, amik tulajdonságban tárolhatsz, majd felhasználhatod a `createViewModel()` metódusban.

A `createViewModel()` metódus alapvetően egy **adattároló objektummal** kell visszatérjen, viszont megírhatod úgy is, hogy egy **Promise** példány legyen a válasza, például, ha egy Ajax hívásból vársz adatokat a megjelenítéshez. Ez utóbbi esetben a renderer megvárja az ajax választ és csak annak megérkezte után rendereli a tartalmakat.

## Hívható metódusok


### setup()
```js
setup(args = {})
```
A `setup()` metódus alapesetben automatikusan meghívásra kerül az inicializálás végén. Ez végrehajt egy teljes renderelési ciklust - azaz újra gyártja a viewModel-t, majd az abból nyert adatokkal új tartalmat renderel. Meghívhatod te is manuálisan, amennyiben ez szükséges.

### static create()
```js
static create(tag = 'div', initialize = false)
```
Ez készít számodra egy új dom node-ot a bricknek, ha valami renderelési eljárást nem a template-en keresztül, hanem programozvan tennél meg inkább. Alapvetően egy `div` tag-be renderel a create metódus, de ezt az igényeidnek megfelelően felül tudod definiálni. Amennyiben az `initialize` argumentum `true`, a brick azonnal példányosítva és a tartalma renderelve is lesz. (A dom-ba helyezésről továbbra is neked kell gondoskodnod!)

```js
var myBrick = MyBrick.create();
```

## Overrideoldandó metódusok / események

### createViewModel()
```js
createViewModel()
```
Erről bővebben a **Brick Template és a viewModel** fejezetben olvashatsz!

### onAttributeChange()
```js
onAttributeChange(attr, value, oldValue)
```
Ha használod az `ObserveAttributes` dekorátort, akkor attributum változáskor hívódik meg ez a metódus, argumentumként a megváltozott attributum nevét, értékét, illetve az új értékét kapja.

### onInitialize()
```js
onInitialize()
```
Egyetlen egyszer hívódik meg, a brick konstruktorában.

### onRender()
```js
onRender()
```
A renderlés végén kerül meghívásra, többek között ebben állíthatod be a renderelt tartalmakhoz az eseménykezelőket, illetve polírozhatod a renderelést.

## Dom Helper metódusok
### find()
```js
find(selector, scope = this.root)
```
Rövidítése a `this.root.querySelector(selector)` hívásnak.

### findAll()
```js
findAll(selector, scope = this.root)
```
Rövidítése a `this.root.querySelectorAll(selector)` hívásnak.

### listen()
```js
listen(selector, events, handler, scope = this.root)
```
Eseménykezelő hozzáadása. A selectorba beleírod, hogy mely elemek legyenek a célpontok, az events - ami lehet string, vagy stringek tömbje - az eseményeket jelöli, amire feliratkozol, a handler a metódus, ami lefut, amikor az esemény megtörténik (paraméterként kapja az eseményleíró objektumot, illetve az elemet, amelyikre az eseménykezelőt fűzted (amire match-el a selectorod)), illetve a scope-ot is, ami alapesetben maga a brick root node-ja.

```js
onRender(){
	this.listen('button', 'click', (event, target)=>{
		target.classList.add('clicked');
	});
}
```


### Finder, azaz $()

A finder egy nagyon hatékony eszköz arra, hogy a bricked működését definiáld. Alapvetően nagyon hasonlít a `find` és a `findAll` metódusokhoz, ám azoknál sokkal többet nyújt.

```js
$(selector, func = null, scope = this.root) : Finder
```
Több arcú metódus a `$()`.

Minden esetben egy `Finder` objektummal tér vissza, erről a zengular-finder részben olvashatsz. Viszont önálóan is használható úgy, hogy a selector után átadsz egy callback metódust, ami a találatokra mind lefut. A harmadik argumentum a scope, azaz a keresés gyökere.

```js
this.$('li.active', li=>{
	li.classList.remove('active');
});
```

## Role-ok és actorok

Az alkalmazásodban a tag-ek csak azért vannak ott, mert design, tartalom vagy funkció szempontból fontosak. A design és tartalom megjelenítő tag-ek nagy részét jól kezelheted a `twig` állományaidban. Ellenben vannak olyan elemek, amik egyéb szerepet (role) is betöltenek az alkalmazásodban. Olyan elemek, amiket meg szeretnél szólítani a kontrolleredből.

Ezt megteheted az eddig ismertetett eszköztárral is, viszont a zengular-ban erre inkább használd a szerepeket és az aktorokat, ugyan is így kód szinten is jól elkülönülnek egymástól a funkcióval bíró tag-ek, a többi, csak a megjelenítésért felelő tag-től.

Aktort az alábiak szerint hozhatsz létre:

```html
<button (submit)>OK</button>
```
A fenti kódban a gomb egy aktor, aki megkapta a `submit` szerepet. A kontrolleredben a bizonyos szerepeket játszó aktorokat több módon is megszólíthatod:

- a `find` analógiájára a `findActor` metódussal
- a `findAll` analógiájára a `findAllActors` metódussal
- a `$`-hoz hasonlóan kereshetsz aktorokat finderrel is a `$$` metódust használva.


```js
this.findActor('submit');
this.findAllActors('submit');
this.$$('submit');
```