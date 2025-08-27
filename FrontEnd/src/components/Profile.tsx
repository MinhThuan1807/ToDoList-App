import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, logoutUserApi } from '../redux/user/userSlice'
import { CiLogout } from 'react-icons/ci'
import type { AppDispatch } from '../redux/store'
function Profile() {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="absolute right-0 w-[200px] flex justify-center items-center gap-5 ">
      <h3 className="text-lg font-semibold text-gray-800">
        {currentUser.username}
      </h3>
      <button
        onClick={() => dispatch(logoutUserApi())}
        className=" text-gray-800 hover:text-red-500 cursor-pointer"
      >
        <CiLogout size={28} />
      </button>
    </div>
  )
}

export default Profile
