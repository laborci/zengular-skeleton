class DataService{

	constructor(){
		if(localStorage.getItem('tasks') === null){
			this.tasks =[];
		}
	}

	get tasks(){
		return JSON.parse(localStorage.getItem('tasks'));
	}

	set tasks(tasks){
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	add(task){
		let tasks = this.tasks;
		tasks.unshift({
			text: task,
			done: false
		});
		this.tasks = tasks;
	}

	notDone(index){
		let tasks = this.tasks;
		tasks[index].done = false;
		this.tasks = tasks;
	}

	done(index){
		let tasks = this.tasks;
		tasks[index].done = true;
		this.tasks = tasks;
	}

	delete(index){
		let tasks = this.tasks;
		tasks.splice(index, 1);
		this.tasks = tasks;
	}

}

let dataService = new DataService();
export default dataService;