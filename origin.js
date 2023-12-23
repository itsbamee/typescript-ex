const list = document.querySelector('#list');
const form = document.querySelector('#form');
const input = document.querySelector('#title');
let data = localStorage.getItem('TASKS');

let tasks = data ? JSON.parse(data) : [];

tasks.forEach(task => addListItem(task));

form.addEventListener('submit', e => {
	e.preventDefault();
	if (input.value.trim() === '') return alert('할일을 입력하세요.');
	const newTask = {
		id: performance.now(),
		title: input.value,
		createAt: new Date(),
		complete: false
	};

	tasks.push(newTask);
	addListItem(newTask);
	saveTasks();

	input.value = '';
});

function addListItem(task) {
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	const button = document.createElement('button');
	button.innerText = '삭제';

	if (task.complete) {
		item.style.textDecoration = 'line-through';
		checkbox.checked = true;
		item.append(button);
	} else {
		item.style.textDecoration = 'none';
		checkbox.checked = false;
	}

	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked;
		if (task.complete) {
			item.style.textDecoration = 'line-through';
			const button = document.createElement('button');
			button.innerText = '삭제';
			item.append(button);

			button.addEventListener('click', e => {
				const del_id = task.id;
				tasks = tasks.filter(el => el.id !== del_id);
				saveTasks();
				e.currentTarget.closest('li').remove();
			});
		} else {
			item.style.textDecoration = 'none';
			item.querySelector('button').remove();
		}
		saveTasks();
	});

	item.prepend(checkbox, task.title);
	list.append(item);
}

function saveTasks() {
	localStorage.setItem('TASKS', JSON.stringify(tasks));
}
