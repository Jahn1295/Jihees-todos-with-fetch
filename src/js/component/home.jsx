import React, { useState, useEffect } from "react";
import { createUser, fetchTodos, addTodoToAPI, deleteTodoAPI } from "../updateAPI.js";

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		fetchTodos(setTodos);
	}, [])

	const handleAddTodo = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			const newTodo = {
				id: Date.now(),
				label: inputValue.trim(),
				done: false
			};
			setTodos([...todos, newTodo]);

			addTodoToAPI(todos, inputValue, setTodos);
			console.log("New Todo added to API: " + newTodo.label)

			setInputValue('');
		}
	}
	const handleDeleteTodo = (index) => {
		const id = todos[index].id;
		const todoLabel = todos[index].label;
		const updatedTodos = todos.filter((todo, i) => index !== i);
		setTodos(updatedTodos)
		console.log('Successfully updated todo API' + todoLabel)
		deleteTodoAPI(id, setTodos)
	}
	const handleCreateUser = () => {
		createUser();
	}
	const handleClearTasks = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/todo/users/Jihee', {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error(`Failed to clear tasks. Status: ${response.status}`);
			}
			setTodos([]);
		} catch (error) {
			console.error("There's been a problem clearing the tasks:", error);
		}
	}


	return (
		<div className="todoListBody">
			<h1 className="title">My ToDo's List</h1>
			<ul className="list-group">
				<li className="list-group-item">
					<input
						type='text'
						value={inputValue}
						onKeyDown={handleAddTodo}
						placeholder="What Needs to be Done?"
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</li>
				{todos.length === 0 ? (
					<li className="list-group-item">No tasks. Add a task.</li>

				) : (
					todos.map((todo, index) => (
						<li className="list-group-item" key={todo.id}>
							<div className="list-group-item-todo" id="screen">
								{todo.label}
							</div>
							<span className="x-container" onClick={() => handleDeleteTodo(index)}><i className="fa-solid fa-trash-can"></i></span>
						</li>
					))
				)}
			</ul>
			<div>
				{todos.length} {todos.length === 1 ? "item" : "items"} left
			</div>
			<div className="btn-div">
				<button onClick={handleCreateUser} className="btn btn-primary">Create User to save tasks</button>
				<button onClick={handleClearTasks} className="btn btn-primary">Clear User and tasks</button>
			</div>
		</div>
	);
};

export default Home;
