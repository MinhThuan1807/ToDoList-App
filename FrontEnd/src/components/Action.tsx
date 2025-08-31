import { Link } from 'react-router-dom'

function Action() {
  return (
    <div className="absolute right-1 top-3 sm:right-0 sm:w-[200px] flex justify-center items-center gap-5 w-[100px]">
      <Link
        to="/register"
        className="w-[75px] p-2 bg-brand-light rounded-2xl cursor-pointer hover:bg-brand-dark transition delay-100 duration-75 ease-in-out animate-ping scale-75"
      >
        Sign up
      </Link>
      <Link
        to="/login"
        className="w-[75px] p-2 bg-brand-light rounded-2xl cursor-pointer hover:bg-brand-dark "
      >
        Sign in
      </Link>
    </div>
  )
}

export default Action
