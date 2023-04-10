import { useState } from "react"

export default function PostAPIData() {
    const [name, setName] = useState("");

    function saveUser() {
        console.log({ name });
        console.log('name', name);
        const jsonData = {
            "title": name,
            "completed": false
        }
        fetch("http://localhost:3000/todo", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData),
        }).then((res) => {
            console.log('result', res);
            res.json().then((resp) => {
                console.log('resp', resp);

            })

        })

    }
    return (
        <div>
            <form>
                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} name="title" required placeholder='Task Name' />
                <button type="button" onClick={saveUser} > Create Todo</button>
            </form>
        </div>

    )
}