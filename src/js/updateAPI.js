export const createUser = () => {
    fetch('https://playground.4geeks.com/todo/users/Jihee', {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((resp) => {
            if (resp.ok) {
                console.log("Users been successfully created in the API");
                alert("You can now save tasks to the API");
            }
        })
        .catch((error) => console.error("Error creating user in API:", error));
};


export const fetchTodos = (setTodos) => {
    fetch('https://playground.4geeks.com/todo/users/Jihee')
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Failed to fetch todo list. Status: " + resp.status);
            }
            return resp.json();
        })
        .then((data) => {
            console.log("Todo list from API", data);
            if (Array.isArray(data.todos)) {
                setTodos(data.todos);
            } else {
                console.error("Fetched data is not an Array", data.todos);
                setTodos([]);
            }

        })
        .catch((error) => console.error("There's been a problem with your fetch opp:", error));
};

export const addTodoToAPI = async (todos, inputValue, setTodos) => {
    try {
        const newTodo = {
            label: inputValue.trim(),
            is_done: false
        };

        const response = await fetch('https://playground.4geeks.com/todo/todos/Jihee', {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch todo list. Status: " + resp.status);
        }

        const data = await response.json();
        const updatedTodos = [
            ...todos,
            { ...newTodo, id: data.id },
        ];
        setTodos(updatedTodos);
        fetchTodos(setTodos);
    } catch (error) {
        console.error("There's been a problem with your fetch opp:", error)
    }
};

export const deleteTodoAPI = async (id, setTodos) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to delete todo. Status: ${response.status}`);
        }
        fetchTodos(setTodos)
    } catch (error) {
        console.error("There's been a problem deleting the todo:", error);
    }
};