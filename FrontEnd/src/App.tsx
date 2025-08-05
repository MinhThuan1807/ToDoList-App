import './App.css'
import { useState } from 'react'
import axios from 'axios'
import Home from './pages/Home'
import Login from './pages/Login'
import {Circle, CircleCheck, X} from 'lucide-react'
function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<string[]>([])
  const [check, setCheck] = useState(false)

  const HandleAddTask = async () => {
    if(!task.trim()) return
    try {
      const res = await axios.post('http://localhost:8017/v1/tasks', { title : task})
      setTasks([...tasks, res.data.title])
      setTask('')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Home>
      <div className="block bg-primary w-1/2 mx-auto mt-10 p-6 rounded-2xl">
        <div>
          <h3 className="text-[#fff] text-left font-bold text-2xl mb-2">
            Todo list🎯
          </h3>
          <div className="flex">
            <input
              type="text"
              className="flex-1 bg-break p-2 rounded-e-2xl text-black focus:outline-none focus:ring-1 focus:ring-green-700 "
              placeholder="Enter your task..."
              value={task}
              onChange={e => setTask(e.target.value)}
            />
            <button
              className="bg-secondary text-black py-2 px-5 rounded-2xl hover:bg-brand-light ml-2 cursor-pointer absolute right-120 "
              onClick={HandleAddTask}
              type='button'
              >
              Add
            </button>
          </div>
        </div>
        <div>
          <ul>
            { tasks.map((t, i) => (
              <div className="flex gap-1 justify-center items-center mt-3" key={i}>
                {!check ? <Circle className='w-8 h-8 fill-green-500 cursor-pointer'  onClick={() => setCheck(!check)}/> : <CircleCheck className='w-8 h-8 fill-green-500'/>}
                {/* <Circle className='w-10 h-10 cursor-pointer' /> */}
                {/* <CircleCheck className='w-8 h-8 fill-green-500 '/> */}
                <li className="w-full p-2 bg-break rounded-lg text-[#000] text-left line-through">
                  {t}
                </li>
                <X className='w-8 h-8 cursor-pointer'/>
              </div>
            ))}
            {/* <li className="w-full bg-break mt-3 p-2 rounded-e-lg text-[#000]  text-left">
              Todolist
            </li>
            <li className="w-full bg-break mt-3 p-2 rounded-e-lg text-[#000]  text-left">
              Frontend
            </li>
            <li className="w-full bg-break mt-3 p-2 rounded-e-lg text-[#000]  text-left">
              Di vong quanh the
              gioiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
            </li>
            <li className="w-full bg-break mt-3 p-2 rounded-e-lg text-[#000]  text-left">
              a
            </li> */}
          </ul>
        </div>
      </div>
    </Home>
  )
}

export default App
