import Brick       from "zengular-brick";
import twig        from "./template.twig";
import "./style.less";

import "./../task/brick";

@Brick.register('tasklist', twig)
export default class Tasklist extends Brick{

	createViewModel(){
		return {tasks: this.args.tasks};
	}

}