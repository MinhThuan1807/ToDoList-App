import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom'
import Home from './pages/Home'
import ToDoList from './components/ToDoList'
import Action from './components/Action'
import Profile from './components/Profile'
import AccountVerification from './pages/Auth/AccountVerification'
import Auth from './pages/Auth/Auth'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'
// import NotFound from './pages/404/NotFound'

const ProtectedRoute = ({ user }: any) => {
  if (!user) {
    return <Navigate to="/login" replace={true} />
  }
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    // prettier-ignore
    <Router>
          {!currentUser ? <Action /> : <Profile />}

          <Routes>
            <Route element={<ProtectedRoute user={currentUser} />}>
              <Route path='/' element={<Home><ToDoList/></Home>}></Route>
            </Route>

            {/* Authentication */}
            <Route path='/login' element={<Home><Auth /></Home>}></Route>
            <Route path='/register' element={<Home><Auth /></Home>}></Route>
            <Route path='/account/verification' element={<AccountVerification/>}></Route>
          </Routes>

          {/* 404 Not Found Page*/}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Router>
  )
}

export default App
