import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../redux/user/userSlice'

function Profile() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <div className="absolute right-0 w-[200px] flex justify-center items-center gap-5 ">
      <h3 className="text-lg font-semibold text-gray-800">
        {currentUser.username}
      </h3>
    </div>
  )
}

export default Profile
