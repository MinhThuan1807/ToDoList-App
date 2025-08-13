import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/user/userSlice'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function Auth() {
  const currentUser = useSelector(selectCurrentUser)
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  if (currentUser) {
    return <Navigate to="/" replace={true} />
  }
  return (
    <>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </>
  )
}

export default Auth
