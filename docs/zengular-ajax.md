# Ajax

telepítés: `npm install zengular-ajax`

---

## Példányosítás
Új ajax requestet az alábbi módon hozhatsz létre:

```js
var myRequset = Ajax.request('http://my.domain/get-users');
```

## Általános response handlerek
Regisztrálhatsz bizonyos hibakódokhoz általános handlereket az alkalmazásodban.

```js
Ajax.registerHandler(401, ajaxResponse=>{ console.log('Unauthorized access'); });
```

## Methods

```js
myRequset.get({id:1});

myRequset.post({id:1});
myRequset.postJSON({id:1});

myRequset.put({id:1});
myRequset.putJSON({id:1});

myRequset.delete({id:1});
myRequset.deleteJSON({id:1});
```

A fenti metódusok az alábbi általános `request` és `requestJSON` metódusokat szinonímái.

```js
myRequest.request('POST', {id: 1});
myRequest.requestJSON('POST', {id: 1});
```

## File feltöltés

```js
myRequest.upload(data, file);
```

## Progress
```js
myRequest.progress((total, loaded)=>{console.log(loaded + '/' + total);}));
```

## Cancel
Egy folyamatot (pl.: fájlfeltöltés) bármikor megállíthatsz a `cancel()` metódus meghívásával.

```js
this.listen('button.cancel', 'click', ()=>{
	this.uploadRequest.cancel();
});
```

## Callback vagy Promise
Az Ajax kétféleképp működhet, callback vagy promise módban. A futás módját a használat dönti el.

### Callback
Az alábbi kód elküldi a konfigurált ajax hívásodat a szervernek, majd a válasszal meghívja a callback-ként definiált metódust.

```js
myRequest.do(ajaxResponse=>{
	console.log(ajaxResponse.json);
});
```

Az alábbi módot használva viszont teljesen előkészítheted a requestet arra, hogy valamikor a későbbiekben meghívd azt, például valamilyen eseményre válaszul. 

```js
myRequest.callback(ajaxResponse=>{
	console.log(ajaxResponse.json);
});
...
myRequest.do();
```

### Promise
Az alábbi kód azonnal elküldi a hívást a szerver irányába és egy promist ad vissza, aminek a resolv ága a `ajaxResponse` objektumot fogja visszadni számodra.

```js
myRequest.promise();
```
#### Promise shortcuts
```js
Ajax.post(url, data): Promise
Ajax.get(url, data): Promise
Ajax.put(url, data): Promise
Ajax.delete(url, data): Promise
Ajax.json.post(url, data): Promise
Ajax.json.get(url, data): Promise
Ajax.json.put(url, data): Promise
Ajax.json.delete(url, data): Promise

```

## Method chaining
Az ajax implementáció majd minden metódusa (logikusan a kivételek: `do()`, `cancel()`, `promise()`) visszaadja a az ajax objektumot magát, így a kódodat az alábbiak szerint is lehet - érdemes - írni:

```js
Ajax
	.request('http://my.domain/get-users')
	.postJSON({id:11})
	.promise()
	.then( ajaxResponse=>{
		console.log(ajaxResponse.json);
	});
```

# AjaxResponse
Az ajax hívások egy AjaxReponse objektummal térnek vissza, aminek az alábbi tulajdonságai vannak:

- `request` : az XMLHttpRequest objektum
- `status` : HTTP status code
- `statusText` : HTTP status text
- `response` : response objektum (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response)
- `responseText` : nyers válasz szöveg
- `json` : a rendszer megpbórálja a válasz szöveget json-ként értelmezni és visszaadni a benne foglalat objektumot. Ha ezt nem tudja megtenni, `undefined` lesz az érték.