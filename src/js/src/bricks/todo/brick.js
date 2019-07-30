import Brick       from "zengular-brick";
import twig        from "./template.twig";
import "./style.less";
import dataService from "../../services/data-service";
import Tasklist    from "../tasklist/brick";

@Brick.register('todo-app', twig)
@Brick.useAppEventManager()
@Brick.registerSubBricksOnRender()
export default class Todo extends Brick{

	onInitialize(){
		this.appEventManager.listen(['TASK_DONE', 'TASK_NOT_DONE', 'TASK_DELETE', 'TASK_ADD'], event => {
			switch(event.type){
				case 'TASK_DONE':
					dataService.done(event.data.index);
					break;
				case 'TASK_NOT_DONE':
					dataService.notDone(event.data.index);
					break;
				case 'TASK_DELETE':
					dataService.delete(event.data.index);
					break;
				case 'TASK_ADD':
					dataService.add(event.data.text);
					break;
			}
			this.tasklist.setup({tasks: dataService.tasks});
		});
	}

	onRender(){
		this.tasklist = this.find(Tasklist.selector).controller;
		this.tasklist.setup({tasks: dataService.tasks});

		this.listen('input[type=text]', 'keydown', event => {
			if(event.key === 'Enter' && event.target.value.length){
				this.appEventManager.fire('TASK_ADD', {text: event.target.value});
				event.target.value = '';
			}
		});
	}

}