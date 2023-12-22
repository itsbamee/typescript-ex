const list = document.querySelector('#list');
const form = document.querySelector('#form');
const input = document.querySelector('#title');
let data = localStorage.getItem('TASKS');

//기존처럼 로컬저장소 값이 없을 때 대체값으로 빈 배열을 처리하면
//아래 구분에 배열.parse(data)가 오류구문이므로 아래쪽에 삼항연산자 처리
let tasks = data ? JSON.parse(data) : [];

tasks.forEach(task => addListItem(task));

form.addEventListener('submit', e => {
	e.preventDefault();
	if (input.value.trim() === '') return alert('오늘 할 일을 입력하세요.');

	const newTask = {
		id: performance.now(),
		title: input.value,
		createAt: new Date(),
		complete: false
	};

	tasks.push(newTask);

	input.value = '';
	addListItem(newTask);
});

function addListItem(task) {
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';

	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked;
		task.complete ? (item.style.textDecoration = 'line-through') : (item.style.textDecoration = 'none');
		saveTasks();
	});

	item.append(checkbox, task.title);
	list.append(item);
}

function saveTasks() {
	localStorage.setItem('TASKS', JSON.stringify(tasks));
}
