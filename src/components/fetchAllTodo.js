import React, { useState, useEffect, } from "react";

function FetchNestData() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        getTodo();

    }, [])
    function getTodo() {
        let mounted = true;
        fetch("http://localhost:3000/todo")
            .then((res) => res.json())
            .then((data) => {
                if (!mounted) {
                    return;
                }
                setTodos(data);
            });
        return () => {
            mounted = false;
        };
    }
    function RefreshPage() {
        window.location.reload(false);
      }
    const checkComplete = (id) => {
        const done = todos.filter(todo => todo.id === id);

        if (done[0].completed === true) {
            const jsonData = {
                "completed": false,
            }
            fetch(`http://localhost:3000/todo/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData),
            }).then((res) => {
                res.json().then((resp) => {
                    getTodo();
                })
            })
        }
        if (done[0].completed === false) {
            const jsonData = {
                "completed": true,
            }
            fetch(`http://localhost:3000/todo/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData),
            }).then((res) => {
                res.json().then((resp) => {
                    RefreshPage();
                })
            })
        }
    }
    const falseValue = todos.filter(todo => todo.completed !== true);
    const trueValue = todos.filter(todo => todo.completed === true);

    function deleteTodo(id) {
        fetch(`http://localhost:3000/todo/${id}`, {
            method: 'Delete',
        }).then((res) => {
            res.json().then((resp) => {
                getTodo();

            })

        })
    }
    return (
        <div className="row">
            <table>
                {
                    falseValue.map((items) =>
                        <ul>
                            <label htmlFor={items.id}>
                                <input type='checkbox' onChange={() => checkComplete(items.id)} />
                                <td>{items.title}</td>
                                <button onClick={() => deleteTodo(items.id)}>Delete</button>
                            </label>
                        </ul>
                    )
                }
                {
                    trueValue.map((items) =>
                        <ul>
                            <label htmlFor={items.id}>
                                <input type='checkbox' checked={items.completed} onChange={() => checkComplete(items.id)} />
                                <td style={items.completed ? { textDecoration: "line-through" } : null}>{items.title}</td>
                                <button onClick={() => deleteTodo(items.id)}>Delete</button>
                            </label>
                        </ul>
                    )
                }
                {/* {
                    todos.map((items) =>
                        <ul>
                            <label htmlFor={items.id}>
                                <input type='checkbox' checked={items.completed} onChange={() => checkComplete(items.id)} />
                                <td style={items.completed ? { textDecoration: "line-through" } : null}>{items.title}</td>
                                <button onClick={() => deleteTodo(items.id)}>Delete</button>
                            </label>
                        </ul>
                    )
                } */}
            </table>
        </div>
    )
}

export default FetchNestData;