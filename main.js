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
		//순서1 - task 객체의 complete가 true면 동적으로 삭제버튼 생성
		//체크박스를 체크할 때 마다도 삭제버튼을 동적으로 생성
		if (task.complete) {
			item.style.textDecoration = 'line-through';
			const button = document.createElement('button');
			button.innerText = '삭제';
			item.append(button);

			//삭제버튼이 동적으로 생성되는 시점이 해당 코드블록 안이기 때문에
			//가상의 이벤트를 연결하기 위해서는 해당 코드블록 안쪽에 이벤트문을 생성해 주어야 함
			button.addEventListener('click', e => {
				//동적으로 클릭한 삭제버튼의 해당하는 객체의 id값을 가져와서
				const del_id = task.id;
				//모든 배열값을 반복돌면서 해당 id값과 같지 않은 나머지 배열값만 리턴 (결과적으로 id값이 동일한 객체만 삭제됨)
				tasks = tasks.filter(el => el.id !== del_id);
				//변경된 배열값으로 로컬저장소 저장
				saveTasks();
				//브라우저상에서도 해당 li 요소를 강제 제거
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
