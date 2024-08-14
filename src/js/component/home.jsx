import React, { useState, useEffect } from "react";
import { createUser, fetchTodos, addTodoToAPI } from "../updateAPI.js";

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
		setTodos(todos.filter((todo, i) => index !== i))
	}
	const handleCreateUser = () => {
		createUser();
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
				{/* <button onClick={handleClearTasks} className="btn btn-primary">Clear User and tasks</button> */}
			</div>
		</div>
	);
};

export default Home;
