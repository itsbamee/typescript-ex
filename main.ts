interface Task {
	id: number;
	title: string;
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
