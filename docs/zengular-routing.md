# Routing

telepítés: `npm install zengular-router`

---

A modern javascript alkalmazásoknak része a routing, ami dinamikus url kezelést tesz lehetővé javascript alalmazáson belül. A routing kezelés két osztályból épül fel:

- **Router** - a vezérlő singleton
- **Route** - az útvonal objektum maga

Amennyiben importálod a router-t az alkalmazásodban, nem egy osztályt, hanem minden esetben ugyan azt a singleton elemet fogod visszakapni, azaz egyőből hívhatod annak metódusait, használhatod azt.

```js
import router from "zengular-router";

@Brick.register('app')
class Element extends Brick{
	onInitialize(){
		router.listen('/', vars => {console.log(vars);}).as('root');
		router.listen('/article/{id}/page/{page}', vars => {console.log(vars);});
		router.error(()=>{alert('404');});
		router.route();
	}
}
```

- `listen(pattern, handler)` A fenti kódban két route-ot definiáltunk, az egyik a / route a root, a másik pedig a cikk, amelyik két dinamikus szegmenssel is bír, az egyik az id, a másik pedig a page. Mindkettő csak annyit csinál, hogy a paraméter objektumot kiírja a konzolra. A root esetében ez egy üres objektum, az article esetében viszont tartalmaz egy id és egy page kulcsot is.

- `error(handler)`
Ha olyan útvonalra érkezik a rendsrzer, amit nem definiáltál a Routerben, akkor az error handler metódus fog lefutni.

- `route()`
A route metódus explicit kimondja, hogy most le kell futnia a routingnak, azaz a regisztrált route-okra megpróbálja match-elni az aktuális url-t.

Amennyiben szeretnél egy új útvonalra jutni, a legegyszerűbb módja a `Router` `go()` megódusának használata:

```js
router.go('/my/awesome/url');
```

Viszont ez nem a legszerbb módja a router felhasználásának. A router ugyanis, a `listen` metódus meghívásakor egy `Route` objektummal tér vissza, aminek van egy `as` metódusa. Ez utóbbi nem csinál mást, mint a megadott kulcson eltárolja a route-ot a routerben, így később a kódban bármikor hivatkozható lesz. A `go()` metódusát meghívva - a hozzá kapcsolódó változókat egy tömbben átadva - létrehozza a megfelelő url-t és oda navigálja az oldalt.

```js
router.listen('/article/{id}/page/{page}', vars => {console.log(vars);}).as('article');
...
router.routes.article.go({id: 12, page:1}); // -> /article/12/page/1
```

## Router setup

Ha komplexebb útvonalaid vannak, vagy csak egyszerűen szebben szeretnéd kezelni a route-okat, akkor használhatod az alábbi megoldást is:

Először definiálod a route-jaidat és névvel látod el őket. Így később az IDE kódkiegészítés sokat segíthet!

**routes.js**

```js
import {Route} from "zengular-router";

let routes = {
	"root": new Route('/'),
	"page": new Route('/page')
};

export default routes;
```

Majd később hozzáadod a funkcionalitást:

**app.js**

```js
import routes from "./src/routes";
import router from "zengular-router";

router.setup(routes);

routes.root.setHandler(data => console.log('root'));
routes.page.setHandler(data => console.log('PAGE'));
```

## addClickEventListener

Amennyiben azt szeretnéd, hogy az alkalmazásodban egyes kattintások - mint egy egyszerű link - vigyenek különböző route-okra, nincs más dolgod, minthogy meghívod a `router` `addClickEventListener(goToRouteAttribute = 'goToRoute')` metódusát. Ez igazából a body-ra tesz egy eseménykezelőt és azt vizsgálja, hogy a kattintott elem tartalmaz e `data-go-to-route` attributumot. Amennyiben tartalmaz, akkor továbbít a megadott route-ra, mégpedig úgy, hogy adatként az adott elem dataset-jét is elküldi.

```js
router.addClickEventListener();
```