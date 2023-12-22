const list = document.querySelector('#list');
const form = document.querySelector('#form');
const input = document.querySelector('#title');
const tasks = [];

form.addEventListener('submit', e => {
	e.preventDefault();
	if (input.value.trim() === '') return alert('오늘 할 일을 입력하세요.');

	const newTask = {
		id: performance.now(),
		title: input.value,
		createAt: new Date(),
		complete: false
	};

	//할 일 목록을 tasks라는 배열에 추가
	tasks.push(newTask);

	input.value = '';
	addListItem(newTask);
});

function addListItem(task) {
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';

	//동적으로 생성되는 체크박스에 변경점이 생길 때 complete에 boolean값이 담기도록 이벤트 핸들러 미리 연결

	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked;
		console.log(tasks);
	});

	item.append(checkbox, task.title);
	list.append(item);
}
