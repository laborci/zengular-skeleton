# Finder

A finder része a `zengular-brick` csomagnak.

---

## Pédányosítás

A `Finder` leginkább a dom lekérdezések egyszerűsétése végett jött létre. A brick alapvetően tartalmaz egy ```$()``` metódust, ami példányosít egy `Finder`-t, de a `Finder` önállóan is felhasználható. Példányosítani lehet `new` operátorral, vagy a `$()` statikus metóduson keresztül is, ami gyakorlatilag a `Finder` konstruktorának szinonímája.

```js
this.$(selector, scope, func = null); // brick scope-ban
// vagy
new Finder(selector, scope, func = null);
```

A finder önmagában, ha nem adsz neki funckiót, nem hajt végre keresést, csak tárolja a keresési igényeket. Amennyiben adsz át `func` argumentumot, a callback minden egyes találatra le fog futni.

Így előre definiálhatsz kereséseket, amiket később a kódodban újra és újra felhasználhatsz, ha változik a html struktúra csak egy helyen kell átírd a megfelelő selectorokat.

## Találatok

### - Get, All

A keresést a `get` és az `all` metódussal tudod végrehajtani, azok adnak vissza eredeményeket a számodra. A `get` egy találatot ad vissza (akkor is, ha több lenne), az `all` minden egyes matchelő elemet visszaad.

példa bricken belüli használatra:

```js
var button = this.$('button').get();
var lis = this.$('li').all();
```

*(DEPRECATED)*

Mind a `get`, mint az `all` metódus kaphat egy callback argumentumot, amit a találati listáján szerepel.

```js
var buttonFinder = this.$('button');
...
buttonFinder.all(button => { ... })
```

### - First, Each

A `first` és az `each` metódusokkal a találati listádon tudsz műveleteket végrehajtani, az átadott callback metóduson keresztül.

```js
// az első találaton végez műveletet:
this.$('a').first(a => a.style.color = 'red');

// az összes találaton műveletet végez:
this.$('a').each(a => a.style.color = 'red');
```

### - Node, Nodes

Amennyiben csak a megtalált elemekre van szükséged, azt a `node` és a `nodes` gettereken keresztül is el tudod kérni a findertől.

```js
let myANode = this.$('a').node;
let myAllANodes = this.$('a').nodes;
```

## Keresés módosítása

### Scope

```js 
scope(filter, func = null)
```

A `scope` metódussal új scope-ot adhatsz a finderedhez.
*(Eredményként egy finder objektumot kapsz)*

```js
var buttonFinder = this.$('button');
var form = $.('form').get();

var formButton = buttonFinder.scope(form).all();
```

### Filter

```js 
filter(filter, func = null)
```

A `filter` metódussal tudod szűkíteni az eredményedet további selectorokkal. 
*(Eredményként egy finder objektumot kapsz)*

```js
var buttonFinder = this.$('button');
buttonFinder.filter('[data-valid=no]').node.style.color = "red";
```

## Esemény kezelés

```js
listen(events, handler);
```

A finder használatával könnyen tudsz eseménykezelőt kötni az egyes elemeidre a `listen` metóduson keresztül:

```js
$('button').listen('click', event => console.log('clickd'));
```