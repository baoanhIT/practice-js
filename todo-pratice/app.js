const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoListElement = document.getElementById("todoList");
const searchInput = document.getElementById("searchInput");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const renderTodos = (list = todos) => {
    todoListElement.innerHTML = "";

    list.forEach((todo) => {
        todoListElement.innerHTML += `
            <li>
                <span class="${todo.completed ? "done" : ""}">
                    ${todo.name}
                </span>

                <button onclick="toggleTodo(${todo.id})">
                    ${todo.completed ? "Undo" : "Done"}
                </button>

                <button onclick="deleteTodo(${todo.id})">
                    Delete
                </button>
            </li>
       
       `;
    });
};

addBtn.addEventListener("click", () => {
    const value = todoInput.value.trim();

    if (value === "") {
        alert("Vui lòng nhập Todo");
        return;
    }

    const newTodo = {
        id: Date.now(),
        name: value,
        completed: false

    };

    todos.push(newTodo);

    saveToLocalStorage();
    renderTodos();

    todoInput.value = "";
});

const deleteTodo = (id) => {
    todos = todos.filter((todo) => todo.id !== id);

    saveToLocalStorage();
    renderTodos();
};

const toggleTodo = (id) => {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed
            }
        };
        return todo;
    });

    saveToLocalStorage();
    renderTodos();
};

searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const filteredTodos = todos.filter((todo) => {
        return todo.name.toLowerCase().includes(keyword);

    });

    renderTodos(filteredTodos);

});

renderTodos();
