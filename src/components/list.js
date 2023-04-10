import React, { useContext } from "react";
import ListItem from "./listItem";
import { DataContext } from "./dataProvider";

export default function List() {
  const [todos, setTodos] = useContext(DataContext);
    console.log('todos', todos);
    const switchComplete = id => {
      const newTodos = [...todos]
      newTodos.forEach((todo, index) => {
        if(index === id) {
          todo.complete = !todo.complete
        }
      })
      setTodos(newTodos)
    }

    const handleEditTodos = (editValue, id) => {
      const newTodos = [...todos]
      newTodos.forEach((todo, index) => {
        if(index === id) {
          todo.name = editValue
        }
      })
      setTodos(newTodos)
    }
    return(  
        <ul>
          {
            todos.map((todo, index) => (
              <ListItem todo={todo} key={index} id={index} 
              checkComplete = {switchComplete} handleEditTodos = {handleEditTodos} />
            ))
          
          }
      </ul>
    )
}