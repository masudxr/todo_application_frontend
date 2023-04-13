import { useState } from "react"

export default function PostAPIData() {
    const [todo, setTodo] = useState("");

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
    }
    console.log(todo);
    return (
        // <div>
            <form>
                <input type="text" value={todo} onChange={(e) => { setTodo(e.target.value) }} name="title" required placeholder='Task Name' />
                <button type="button" onClick={saveUser} > Create Todo</button>
            </form>
        // </div>
    )
}