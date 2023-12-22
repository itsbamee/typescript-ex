const list = document.querySelector('#list');
const form = document.querySelector('#form');
const input = document.querySelector('#title');

form.addEventListener('submit', e => {
	e.preventDefault();
	//value : input에 입력되는 문자
	//input에 입력되는 문자 공백을 다 지웠을 때 '' 빈 문자열이면 alert창
	if (input.value.trim() === '') return alert('오늘 할 일을 입력하세요.');

	const newTask = {
		id: performance.now(),
		title: input.value,
		createAt: new Date()
	};

	console.log(newTask);
});
