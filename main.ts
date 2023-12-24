interface Task {
	id: number;
	//title에 들어가는 값 자체가 DOM을 통해서 가져오는 문자열이기 때문에 undefined로 union타입 지정
	title: string | undefined;
	createAt: Date;
	complete: boolean;
}

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#form');
const input = document.querySelector<HTMLInputElement>('#title');
//JSON.parse 메서드는 무조건 파라미터 값으로 문자값만 들어오도록 강제되어 있음
//처음 로컬저장소의 값이 없을 때에는 빈배열을 문자화해서 대체처리
//Task 방식의 배열타입을 tasks에 지정
let tasks: Task[] = JSON.parse(localStorage.getItem('TASKS') || '[]');
tasks.forEach(task => addListItem(task));

//DOM이 담겨있는 변수의 경우는 담겨있는 값 자체가 web api를 통해서 가져오는 값이기 때문에
//JS 자체적으로 제어권이 없으므로 항상 값이 null일 수 있는걸 인지하고 있기 때문에 optioanal chaining처리
form?.addEventListener('submit', e => {
	e.preventDefault();
	if (input?.value.trim() === '') return alert('할일을 입력하세요.');
	const newTask = {
		id: performance.now(),
		title: input?.value,
		createAt: new Date(),
		complete: false
	};

	tasks.push(newTask);
	addListItem(newTask);
	saveTasks();

	//좌항에 옵셔널 체이닝 처리 불가능하므로 대입하는 연산문 자체를 괄호로 묶어서 표현식으로 만든다음
	//input에 값이 있을 때에만 동작하도록 처리
	input && (input.value = '');
});

function addListItem(task: Task): void {
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

			button.addEventListener('click', (e: Event) => {
				const del_id = task.id;
				tasks = tasks.filter(el => el.id !== del_id);
				saveTasks();
				//타입스크립트에서는 event객체 안쪽의 property를 읽지 못하는 버그가 있음
				//해결방법 : 해당 이벤트 객체를 변수로 옮겨담으면서 직접 type 지정
				const eventTarget = e.currentTarget as HTMLButtonElement;
				eventTarget.closest('li')?.remove();
			});
		} else {
			item.style.textDecoration = 'none';
			item.querySelector<HTMLButtonElement>('button')?.remove();
		}
		saveTasks();
	});

	item.prepend(checkbox, task.title);
	list?.append(item);
}

function saveTasks(): void {
	localStorage.setItem('TASKS', JSON.stringify(tasks));
}
