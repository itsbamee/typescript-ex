const list = document.querySelector('#list');
const form = document.querySelector('#form');
const input = document.querySelector('#title');
let data = localStorage.getItem('TASKS');

//순서1 - 초기에 로컬저장소가 있으면 해당값을 parsing해서 tasks 배열에 담아주고
//그렇지 않으면 빈 배열 저장
let tasks = data ? JSON.parse(data) : [];

//순서2 - tasks배열값 반복돌면 addListItem 호출해서 화면에 동적으로 목록 출력
tasks.forEach(task => addListItem(task));

//순서5 - 동적으로 인풋요소에 새로할 일 목록 작성 시 화면에 목록 출력하고 자동으로 로컬저장소에 저장
form.addEventListener('submit', e => {
	e.preventDefault();
	if (input.value.trim() === '') return alert('할일을 입력하세요.');

	//할일 내용을 객체로 변환
	const newTask = {
		id: performance.now(),
		title: input.value,
		createAt: new Date(),
		complete: false
	};

	//변환된 객체를 로컬저장소로부터 반환한 tasks란 배열에 추가
	tasks.push(newTask);
	//addListItem에 전달해서 화면에 새로운 li로 출력
	addListItem(newTask);
	//해당 변경사항을 물리적으로 로컬저장소에 저장 후
	saveTasks();
	//input값 비우기
	input.value = '';
});

//순서3 - 객체를 인수로 받아 해당 객체 내용에 맞게 li 동적출력 함수
function addListItem(task) {
	//동적으로 checkbox가 포함된 li를 생성
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';

	//li 생성시 complete의 값에 따라 활성화, 비활성화 처리
	if (task.complete) {
		//할일 완료시
		item.style.textDecoration = 'line-through';
		checkbox.checked = true;
	} else {
		//할일 미완료시
		item.style.textDecoration = 'none';
		checkbox.checked = false;
	}

	//동적으로 생성하고 있는 checkbox 요소에 미리 change 이벤트 연결해서 체크 시 실시간으로 스타일 변경
	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked;
		task.complete ? (item.style.textDecoration = 'line-through') : (item.style.textDecoration = 'none');
		//change 이벤트 발생할 때마다 해당 객체의 변경사항을 로컬저장소에 저장
		saveTasks();
	});

	item.append(checkbox, task.title);
	list.append(item);
}

//순서4 - 체크박스에 체크할 때마다, 혹은 글을 저장 기능을 사용할 때마다 배열에 변경점이 생기므로
//그때 마다 아래 함수로 로컬저장소에 저장해주는 함수
function saveTasks() {
	localStorage.setItem('TASKS', JSON.stringify(tasks));
}

/*
function init() {
	tasks.forEach((task, idx) => {
		list.querySelectorAll('li')[idx].querySelector('input').checked
			? (list.querySelectorAll('li')[idx].style.textDecoration = 'line-through')
			: (list.querySelectorAll('li')[idx].style.textDecoration = 'none');
	});
}
*/
