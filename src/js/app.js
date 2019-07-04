import Brick           from "zengular-brick";
import AppEventManager from "zengular-brick/src/app-event";
import "./bricks/todo/brick";

new (class{

	constructor(){
		Brick.registry.initialize();
	}

})();