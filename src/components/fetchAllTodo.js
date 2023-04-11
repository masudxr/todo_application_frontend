import React, { useState, useEffect, } from "react";

function FetchNestData() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        getTodo();

    }, [])
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
            const res = await fetch(`http://localhost:3000/todo/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData),
            })
            const json = await res.json();
            console.log('updated Result:', json);
            getTodo();

        }
        if (done[0].completed === false) {
            const jsonData = {
                "completed": true,
            }
            const res = await fetch(`http://localhost:3000/todo/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData),
            })
            const json = await res.json();
            console.log('updated Result:', json);
            getTodo();

        }
    }

    async function deleteTodo(id) {
        const del = await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'Delete',
        })
        const json = await del.json();
        console.log('del delete result:', json);
        getTodo();
    }
    return (
        <div className="row">
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

export default FetchNestData;