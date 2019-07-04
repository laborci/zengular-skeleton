import Brick       from "zengular-brick";
import twig        from "./template.twig";
import "./style.less";

@Brick.register('task', twig)
@Brick.useAppEventManager()
export default class Task extends Brick{

	onInitialize(){
		this.text = this.root.innerHTML;
	}

	createViewModel(){
		return {
			text: this.text,
			index: this.dataset.index,
			done: (this.dataset.done === 'true')
		};
	}

	onRender(){
		this.listen('input[type=checkbox]', 'change', event=>{
			this.appEventManager.fire( event.target.checked ? 'TASK_DONE' : 'TASK_NOT_DONE', {index: this.dataset.index})
		});
		this.listen('span', 'click', event=>{
			this.appEventManager.fire('TASK_DELETE', {index: this.dataset.index})
		});
	}

}