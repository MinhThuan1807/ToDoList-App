import { useForm } from 'react-hook-form'
import { useSearchParams, useNavigate } from 'react-router-dom'
import type { SubmitHandler } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '../../utils/validators'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../customHook/reduxHooks'
import { loginUserApi } from '../../redux/user/userSlice'

interface LoginFormInputs {
  email: string
  password: string
}

function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const registeredEmail: string | null = searchParams.get('registeredEmail')
  const verifiedEmail: string | null = searchParams.get('verifiedEmail')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormInputs>()

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    toast
      .promise(
        new Promise((resolve) => {
          setTimeout(() => resolve(dispatch(loginUserApi(data))), 1000)
        }),
        {
          pending: 'Logging in...'
        }
      )
      .then((res: any) => {
        if (!res.error) navigate('/')
      })
  }

  return (
    <div className="block bg-primary w-full sm:w-120 mx-auto mt-10 p-6 rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-auto mx-auto rounded-2xl"
      >
        <h2 className="text-2xl text-white font-semibold mb-4 text-center">
          Login
        </h2>
        {registeredEmail && (
          <div className="mb-4 container w-70 mx-auto">
            <p className="border border-green-500 bg-green-100 text-green-800 text-sm px-4 py-2 rounded mb-4">
              {' '}
              An email has been sent to&nbsp;<strong>{registeredEmail}</strong>
              <br />
              Please check and verify your account before logging in!
            </p>
          </div>
        )}
        {verifiedEmail && (
          <div className="mb-4 container w-70 mx-auto">
            <p className="border border-green-500 bg-green-100 text-green-800 text-sm px-4 py-2 rounded mb-4">
              {' '}
              Your email&nbsp;<strong>{verifiedEmail}</strong>&nbsp;has been
              verified.
              <br />
              Now you can login to enjoy our services! Have a good day!
            </p>
          </div>
        )}
        <div className="mb-4 container w-70 mx-auto">
          <label className="block text-white text-semibold text-left font-medium mb-1 ">
            Email
          </label>
          <input
            type="email"
            {...register('email', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
            })}
            className="w-full border px-3 py-2 rounded bg-white text-black focus:outline-none border-gray-300"
          />
          {errors.email && (
            <p className=" text-red-500  text-sm text-left">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-6 container w-70 mx-auto">
          <label className="block text-white text-semibold text-left font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            {...register('password', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: { value: PASSWORD_RULE, message: PASSWORD_RULE_MESSAGE }
            })}
            className="w-full border px-3 py-2 rounded bg-white text-black focus:outline-none border-gray-300"
          />
          {errors.password && (
            <p className=" text-red-500 text-sm text-left">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-70 bg-brand-light text-white py-2 rounded-2xl hover:bg-brand-dark mb-4 cursor-pointer"
        >
          {isSubmitting ? 'In Progress...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
