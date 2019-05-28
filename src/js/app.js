import Brick from "zengular-brick";
import AppEventManager from "zengular-brick/src/app-event";

import "./bricks/my-brick/brick";

new (class{
	constructor(){
		Brick.registry.initialize();
		this.appEventManager = new AppEventManager(document.body);
	}
})();