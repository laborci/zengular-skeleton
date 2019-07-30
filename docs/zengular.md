# Zengular Framework

`https://github.com/laborci/zengular-skeleton`

---

## Mi a Zengular?
Ha programozó vagy, akkor a zengular az a JavaScript keretrendszer a következő alkalmazásodhoz, weboldaladhoz használni fogsz! A zengulárban nincsenek varázslatok, hókuszpókuszok mögé rejtett kifacsert logikák, programozók készítették, programozóknak - nem kézrátétellel kell fejlesztened a frontendet, hanem programozhatod azt; bármikor megnézheted a zengular forráskódját is - pár száz sor - és érteni fogsz mindent abból, ami a háttérben történik.

## Init
Amennyiben felépítetted a fordító környezeted, az alkalmazásod belépési pontja a valahogy így kell kinézzen:

```js
import Zapplication from "zengular-application";
import "./src/loader";

new (class extends Zapplication{
	run(){...}
})();
```

Az `./src/loader` betölti az alkalmazásod alaptégláját, alaptégláit. Itt nem kell az összes téglát betöltened, amennyiben a tégláid gondoskodnak az a saját maguk által használt téglák betöltéséről. Amikor az import függőségi lánc mind betöltődött - azaz az összes tégládat regisztrálta a rendszer, akkor létrejön az alkalmazás objektumod (`Zapplication`), ami gondoskodik a téglák kezeléséről. Ennek a `run` metódusában inicializálhatod az alkalmazásodat.
