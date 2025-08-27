import { useState, useEffect } from 'react'
import { Circle, CircleCheck, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../redux/user/userSlice'
import axios from 'axios'

type Task = {
  _id: string
  title: string
  checked: boolean
}

function ToDoList() {
  const currentUser = useSelector(selectCurrentUser)
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'compeleted'>('all')
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true
    if (filter === 'pending') return !task.checked
    if (filter === 'compeleted') return task.checked
    return true
  })

  useEffect(() => {
    if (currentUser?._id) {
      axios
        .get(`http://localhost:8017/v1/tasks/user/${currentUser._id}`)
        .then((res) => {
          setTasks(
            res.data.map((t: any) => ({
              _id: t._id,
              title: t.title,
              checked: t.status ?? false
            }))
          )
        })
        .catch((err) => console.error(err))
    }
  }, [currentUser])

  const HandleAddTask = async () => {
    if (!task.trim()) return
    try {
      const res = await axios.post('http://localhost:8017/v1/tasks', {
        title: task,
        userId: currentUser._id
      })
      setTasks([
        ...tasks,
        {
          _id: res.data._id,
          title: res.data.title,
          checked: res.data.status ?? false
        }
      ])
      setTask('')
    } catch (error) {
      console.error(error)
    }
  }
  const toggleCheck = async (id: string, currentStatus: boolean) => {
    try {
      const res = await axios.patch(`http://localhost:8017/v1/tasks/${id}`, {
        status: !currentStatus
      })
      setTasks(
        tasks.map((t) =>
          t._id === id ? { ...t, checked: res.data.status } : t
        )
      )
    } catch (error) {
      console.error(error)
    }
  }
  const HandleDeleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8017/v1/tasks/${id}`)
      setTasks(tasks.filter((t) => t._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="block bg-primary w-1/2 mx-auto mt-10 p-6 rounded-2xl">
      <div>
        <h3 className="text-[#fff] text-left font-bold text-2xl mb-2">
          Todo list🎯
        </h3>
        <div className="mb-4 flex items-center gap-3">
          <button
            className="bg-secondary hover:bg-brand-light p-2 rounded-2xl cursor-pointer"
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className="bg-secondary hover:bg-brand-light p-2 rounded-2xl cursor-pointer"
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className="bg-secondary hover:bg-brand-light p-2 rounded-2xl cursor-pointer"
            onClick={() => setFilter('compeleted')}
          >
            Completed
          </button>
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-1 bg-break p-2 rounded-e-2xl text-black focus:outline-none focus:ring-1 focus:ring-green-700 "
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="bg-secondary text-black py-2 px-5 rounded-2xl hover:bg-brand-light ml-2 cursor-pointer absolute right-120 "
            onClick={HandleAddTask}
            type="button"
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <ul>
          {filteredTasks.map((t, i) => (
            <div
              className="flex gap-1 justify-center items-center mt-3"
              key={t._id}
            >
              {!t.checked ? (
                <Circle
                  className="w-8 h-8 fill-green-500 cursor-pointer"
                  onClick={() => toggleCheck(t._id, t.checked)}
                />
              ) : (
                <CircleCheck
                  className="w-8 h-8 fill-green-500 cursor-pointer"
                  onClick={() => toggleCheck(t._id, t.checked)}
                />
              )}
              <li
                className={`w-full p-2 bg-break rounded-lg text-[#000] text-left ${
                  t.checked ? 'line-through' : ''
                }`}
              >
                {t.title}
              </li>
              <X
                className="w-8 h-8 cursor-pointer"
                onClick={() => HandleDeleteTask(t._id)}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ToDoList
