var list = document.querySelector('#list');
var form = document.querySelector('#form');
var input = document.querySelector('#title');
//JSON.parse 메서드는 무조건 파라미터 값으로 문자값만 들어오도록 강제되어 있음
//처음 로컬저장소의 값이 없을 때에는 빈배열을 문자화해서 대체처리
//Task 방식의 배열타입을 tasks에 지정
var tasks = JSON.parse(localStorage.getItem('TASKS') || '[]');
tasks.forEach(function (task) { return addListItem(task); });
//DOM이 담겨있는 변수의 경우는 담겨있는 값 자체가 web api를 통해서 가져오는 값이기 때문에
//JS 자체적으로 제어권이 없으므로 항상 값이 null일 수 있는걸 인지하고 있기 때문에 optioanal chaining처리
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value.trim()) === '')
        return alert('할일을 입력하세요.');
    var newTask = {
        id: performance.now(),
        title: input === null || input === void 0 ? void 0 : input.value,
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
function addListItem(task) {
    var item = document.createElement('li');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    var button = document.createElement('button');
    button.innerText = '삭제';
    if (task.complete) {
        item.style.textDecoration = 'line-through';
        checkbox.checked = true;
        item.append(button);
    }
    else {
        item.style.textDecoration = 'none';
        checkbox.checked = false;
    }
    checkbox.addEventListener('change', function () {
        var _a;
        task.complete = checkbox.checked;
        if (task.complete) {
            item.style.textDecoration = 'line-through';
            var button_1 = document.createElement('button');
            button_1.innerText = '삭제';
            item.append(button_1);
            button_1.addEventListener('click', function (e) {
                var _a;
                var del_id = task.id;
                tasks = tasks.filter(function (el) { return el.id !== del_id; });
                saveTasks();
                //타입스크립트에서는 event객체 안쪽의 property를 읽지 못하는 버그가 있음
                //해결방법 : 해당 이벤트 객체를 변수로 옮겨담으면서 직접 type 지정
                var eventTarget = e.currentTarget;
                (_a = eventTarget.closest('li')) === null || _a === void 0 ? void 0 : _a.remove();
            });
        }
        else {
            item.style.textDecoration = 'none';
            (_a = item.querySelector('button')) === null || _a === void 0 ? void 0 : _a.remove();
        }
        saveTasks();
    });
    item.prepend(checkbox, task.title);
    list === null || list === void 0 ? void 0 : list.append(item);
}
function saveTasks() {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
}
