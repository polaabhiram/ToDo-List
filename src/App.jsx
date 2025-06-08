import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'

import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState('')
  const [todos, setTodos] = useState(()=>{
    let data_string = localStorage.getItem('todos')
    if(data_string){
      return JSON.parse(data_string)
    }else{
      return []
    }
  })

  const ref=useRef(0)

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  const handleSubmit = () => {
    if (todo.length > 3) {
      setTodos([...todos, { id: uuidv4(), title: todo, isCompleted: false }])
      settodo('')
      
    }
  }

  const toggleStatus = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id
      
    })

    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    
  }

  const handledelete = (id) => {
    let toDos = todos.filter(i => {
      return i.id !== id
    })

    setTodos(toDos)
    

  }

  const handleEdit = (id) => {
    let index = todos.findIndex(item => {
      return item.id === id
    })
    settodo(todos[index].title)

    let toDos = todos.filter(i => {
      return i.id !== id
    })

    setTodos(toDos)
    
  }

  useEffect(() => {
    let data_string = localStorage.getItem('todos')
    if (data_string) {
      setTodos(JSON.parse(data_string))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    ref.current.focus()
  }, [todos])

  const saveLs=()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  }

  return (
    <>
      <Header />

      <div className="inp flex min-w-full justify-evenly items-center">
        <input type="text" className='border-2 w-2/3 h-10 rounded-lg bg-gray-100' onChange={handlechange} value={todo} ref={ref} />
        <button className='cursor-pointer w-1/8 border-2 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 text-white' onClick={handleSubmit}>Save</button>
      </div>

      <div className="cont flex justify-around min-w-full items-center min-h-[80vh]">

        <div className="todo w-[40vw] bg-gray-300 h-[70vh] flex-col justify-center items-center overflow-y-scroll">
          <h1 className='font-bold text-center text-2xl my-5'>To Do</h1>

          {todos.filter(item => !item.isCompleted).map(item => (
            <div key={item.id} className='min-w-full  flex justify-evenly items-center h-[15%]'>
              <div className="flex gap-2 w-[75%]">

                <input type="checkbox" checked={item.isCompleted} className='w-5 outline-0' name={item.id} onChange={(e) => { toggleStatus(e, item.id) }} />
                <span className='cursor-pointer min-w-5/6 max-w-5/6  p-5 hover:bg-gray-50' onClick={(e) => { toggleStatus(e, item.id) }}>{item.title}</span>

              </div>
              <div className="buttons flex gap-5 items-center justify-evenly w-[20%]">
                <button className='edit cursor-pointer w-14  h-10 rounded-lg bg-gray-700 hover:bg-gray-600 text-white' onClick={() => { handleEdit(item.id) }}>Edit</button>
                <button className='delete cursor-pointer w-18  h-10 rounded-lg bg-gray-700 hover:bg-gray-600 text-white' onClick={() => handledelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
          
        </div>

        <div className="done w-[40vw] bg-gray-300 h-[70vh] flex-col justify-center items-center overflow-y-scroll">
          <h1 className='font-bold text-center text-2xl my-3'>Done</h1>
          {todos.filter(item => item.isCompleted).map(item => (
            <div key={item.id} className='min-w-full  flex gap-5 justify-evenly items-center h-[20%]'>
              <div className='flex gap-2 w-4/5 '>
                <input type="checkbox" checked={item.isCompleted} className='w-5 outline-0' onChange={(e) => { toggleStatus(e, item.id) }} />

                <span className='line-through cursor-pointer min-w-4/5 max-w-4/5  p-5 hover:bg-gray-50 ' onClick={(e) => { toggleStatus(e, item.id) }}>{item.title}</span>

              </div>
              <div className="buttons flex gap-5 items-center ">
                <button className='delete cursor-pointer w-18  h-10 rounded-lg bg-gray-700 hover:bg-gray-600 text-white' onClick={() => handledelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='border-2 w-full h-20 justify-center items-center' >
          <div className="bar flex items-center justify-evenly">
            <span>Track Bar</span>
            <div className='bg-red-400 w-[80%] h-[5vh] border-2'></div>
          </div>
      </div>

    </>
  )
}

export default App