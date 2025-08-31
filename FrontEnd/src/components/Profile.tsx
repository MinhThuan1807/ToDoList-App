import { useDispatch } from 'react-redux'
import { logoutUserApi } from '../redux/user/userSlice'
import { CiLogout } from 'react-icons/ci'
import type { AppDispatch } from '../redux/store'
import { Tooltip as ReactTooltip } from 'react-tooltip'
function Profile() {
  // const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="absolute right-[-80px] sm:right-0 w-[200px] flex justify-center items-center gap-5">
      {/* <h3 className="text-lg font-semibold text-gray-800">
        {currentUser.username}
      </h3> */}
      <button
        data-tooltip-id="logout-tooltip"
        onClick={() => dispatch(logoutUserApi())}
        className=" text-gray-900 hover:text-red-500 cursor-pointer"
      >
        <CiLogout size={28} />
      </button>
      <ReactTooltip id="logout-tooltip" place="bottom" content="Logout" />
    </div>
  )
}

export default Profile
