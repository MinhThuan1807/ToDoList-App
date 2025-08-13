import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { register as registerUser } from '../../services/authService'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE
} from '../../utils/validators'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface RegisterFormInputs {
  email: string
  password: string
  confirmPassword: string
}

function RegisterForm() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<RegisterFormInputs>()

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const { email, password } = data
    toast
      .promise(
        new Promise((resolve) =>
          setTimeout(() => resolve(registerUser({ email, password })), 1000)
        ),
        {
          pending: 'Registration is in progress...'
        }
      )
      .then((user) => {
        const typedUser = user as { email: string }
        navigate(`/login?registeredEmail=${typedUser.email}`)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Registration failed')
      })
  }

  return (
    <div className="block bg-primary w-120 mx-auto mt-10 p-6 rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-auto mx-auto rounded-2xl"
      >
        <h2 className="text-2xl text-white font-semibold mb-4 text-center">
          Register
        </h2>
        <div className="mb-4 container w-70 mx-auto">
          <label className="block text-white text-semibold text-left font-medium mb-1 ">
            Email
          </label>
          <input
            type="text"
            {...register('email', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: EMAIL_RULE,
                message: EMAIL_RULE_MESSAGE
              }
            })}
            className="w-full border px-3 py-2 rounded bg-white text-black focus:outline-none border-none"
          />
          {errors.email && (
            <p className="text-red-500 text-left">{errors.email.message}</p>
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
              pattern: {
                value: PASSWORD_RULE,
                message: PASSWORD_RULE_MESSAGE
              }
            })}
            className="w-full border px-3 py-2 rounded bg-white text-black focus:outline-none border-none"
          />
          {errors.password && (
            <p className="text-red-500 text-left">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-6 container w-70 mx-auto">
          <label className="block text-white text-semibold text-left font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: FIELD_REQUIRED_MESSAGE,
              validate: (value) => {
                if (value === watch('password')) return true
                return PASSWORD_CONFIRMATION_MESSAGE
              }
            })}
            className="w-full border px-3 py-2 rounded bg-white text-black focus:outline-none border-none"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-left">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-70 bg-brand-light text-white py-2 rounded-2xl hover:bg-brand-dark mb-4"
        >
          {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
