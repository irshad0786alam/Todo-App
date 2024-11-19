import React from 'react'
import TodoList from './TodoList'
import { useState, useRef } from 'react'

const App = () => {
  const [todos, setTodos] = useState([])
  const inputRef = useRef(null)

  const addTodo = () =>{
    const data = inputRef.current?.value?.trim()

    if(!data) return;

    const todo = {
      text: data,
      id: Date.now(),
      isCompleted: false
    }

    setTodos([ ...todos, todo ])
    inputRef.current.value = ""
  }

  const deleteTodo = (id) => {
    setTodos((prev) => {
      return prev.filter((value) => value.id !== id)
    })
  }

  const updateTodo = (id) => {
    const newData = prompt()
    if (newData?.trim() === "") return;

    setTodos((prev) => {
      return prev.map((value) => {
        if(value.id === id) {
          value.text = newData
        }
        return value
      })
    })
  }

  return (
    <div className='h-screen w-screen bg-slate-200 flex items-center justify-center flex-col gap-y-4'>
      <div className='flex gap-x-2'>
        <input type="text" className='h-10 w-80 border-none outline-none rounded px-3' ref={inputRef}/>
        <button className='h-10 px-2 bg-black text-white border-none outline-none rounded-lg' onClick={addTodo}>Add</button>
      </div>
      <div className='h-96 w-96 bg-slate-400'>
        {
          todos.map((value, index) => {
            return <TodoList text={value.text} key={index} id={value.id} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
          })
        }
      </div>
    </div>
  )
}

export default App