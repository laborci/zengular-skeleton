# Zengular Framework

`https://github.com/laborci/zengular-skeleton`

---

## Mi a Zengular?
Ha programozó vagyok, akkor a zengular az a JavaScript keretrendszer a következő alkalmazásodhoz, weboldaladhoz használni fogsz! A zengulárban nincsenek varázslatok, hókuszpókuszok mögé rejtett kifacsert logikák, programozók készítették, programozóknak - nem kézrátétellel kell fejlesztened a frontendet, hanem programozhatod azt; bármikor megnézheted a zengular forráskódját is - pár száz sor - és érteni fogsz mindent abból, ami a háttérben történik.

## Init
Amennyiben felépítetted a fordító környezeted, az alkalmazásod belépési pontja a valahogy így kell kinézzen:

```js
import Brick from "zengular-brick";
import AppEventManager from "zengular-brick/src/app-event";
import "./bricks/…";

new (class{
	constructor(){
		Brick.registry.initialize();
		this.appEventManager = new AppEventManager(document.body);
	}
})();
```

Az import szekcióban betöltöd az alkalmazásod alaptégláját, alaptégláit. Itt nem kell az összes téglát betöltened, amennyiben a tégláid gondoskodnak az ő által használt téglák betöltéséről. Amikor az import függőségi lánc mind betöltődött - azaz az összes tégládat regisztrálta a rendszer - akkor meghívod a `BrickRegistry` `initialize()` metódusát, ami elindítja a tégláidon keresztül definiált alkalmazást.
