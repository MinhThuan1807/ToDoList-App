import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import LoginForm from './pages/Auth/LoginForm'
import RegisterForm from './pages/Auth/RegisterForm'
import ToDoList from './components/ToDoList'
// import NotFound from './pages/404/NotFound'

function App() {
  return (
    // prettier-ignore
    <Router>
          <div className='absolute right-0 w-[200px] flex justify-center items-center gap-5 '>
            <Link to="/register" className='w-[75px] p-2 bg-brand-light rounded-2xl cursor-pointer hover:bg-brand-dark transition delay-100 duration-75 ease-in-out animate-ping scale-75'>Sign up</Link>
            <Link to="/login" className='w-[75px] p-2 bg-brand-light rounded-2xl cursor-pointer hover:bg-brand-dark '>Sign in</Link>
          </div>
          <Routes>
            <Route path='/' element={<Home><ToDoList/></Home>}></Route>
            <Route path='/login' element={<Home><LoginForm/></Home>}>0/</Route>
            <Route path='/register' element={<Home><RegisterForm/></Home>}></Route>
          </Routes>

          {/* 404 Not Found Page*/}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Router>
  )
}

export default App
