import React, { useState, useEffect, } from "react";

export default function FetchNestData() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");

    useEffect(() => {
        getTodo();

    }, [])
    async function saveUser() {
        const jsonData = {
            "title": todo,
            "completed": false
        }
        const res = await fetch("http://localhost:3000/todo", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData),
        })
        console.log('res json:', res)
        const data = await res.json();
        console.log('save json:', data)
        getTodo();
    }
    async function getTodo() {
        const response = await fetch("http://localhost:3000/todo")
        const json = await response.json();
        const falseValue = json.filter(todo => todo.completed !== true);
        const trueValue = json.filter(todo => todo.completed === true);
        for (let i = 0; i < trueValue.length; i++) {
            falseValue.push(trueValue[i])
        }
        setTodos(falseValue);
    }

    async function checkComplete(id) {
        const done = todos.filter(todo => todo.id === id);

        if (done[0].completed === true) {
            const jsonData = {
                "completed": false,
            }
            await fetch(`http://localhost:3000/todo/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData),
            })
            console.log('Need To Done This Todo Very Carefully');
            getTodo();

        }
        if (done[0].completed === false) {
            const jsonData = {
                "completed": true,
            }
            await fetch(`http://localhost:3000/todo/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData),
            })
            console.log('Alhamdulillah Successfully Done This.');
            getTodo();
        }
    }
    async function deleteTodo(id) {
        await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'Delete',
        })
        console.log('Removed This Todo Bcoz of Done');
        getTodo();
    }
    return (
        <div>
            <form>
                <input type="text" value={todo} onChange={(e) => { setTodo(e.target.value) }} name="title" required placeholder='Task Name' />
                <button type="button" onClick={saveUser} > Create Todo</button>
            </form>
            <table>
                {
                    todos.map((items) =>
                        <ul>
                            <label htmlFor={items.id}>
                                <input type='checkbox' checked={items.completed} onChange={() => checkComplete(items.id)} />
                                <td style={items.completed ? { textDecoration: "line-through" } : null}>{items.title}</td>
                                <button onClick={() => deleteTodo(items.id)}>Delete</button>
                            </label>
                        </ul>
                    )
                }
            </table>
        </div>
    )
}