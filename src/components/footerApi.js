import React, { useState, useEffect } from "react";

export default function Footer() {
  const [checkAll, setCheckAll] = useState(false)
  const [todo, setTodo] = useState(false)
  useEffect(() => {
    getTodo();

  }, [])
  async function getTodo() {
    const get = await fetch("http://localhost:3000/todo")
    const json = await get.json()
    setTodo(json);

  }

  const handleCheckAll = () => {
    const newTodos = [...todo]
    newTodos.forEach(todo => {
      todo.complete = !checkAll
    })
    setTodo(newTodos)
    setCheckAll(!checkAll)
  }

  const deleteTodo = () => {
    const newTodos = todo.filter(todo => {
      return todo.complete === false
    })
    setTodo(newTodos)
    setCheckAll(false)
  }
  return (
    <>
      {todo.length === 0 ? <h2>Congratulations! Nothing To Do</h2>
        : <div className='row'>
          <label htmlFor='all'>
            <input type='checkbox' name='all' id='all' onClick={handleCheckAll} checked={checkAll} />
            All Todo
          </label>
          <p>You Have {todo.length} To Do</p>
          <td><button id='delete' onClick={deleteTodo}>Delete</button></td>
        </div>
      }
    </>

  )
}