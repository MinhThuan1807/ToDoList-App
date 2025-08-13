import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { login } from '../services/authService';

interface LoginFormInputs {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormInputs>();
  
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await login(data);
      alert('Login successful!');
      localStorage.setItem('token', res.data.token);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className='block bg-primary w-120 h-90 mx-auto mt-10 p-6 rounded-2xl'>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto mx-auto rounded-2xl">
        <h2 className="text-2xl text-white font-semibold mb-4 text-center">Login</h2>
        <div className="mb-4 container w-70 mx-auto">
          <label className="block text-white text-semibold text-left font-medium mb-1 ">Email</label>
          <input
            type="email"
            placeholder='Enter your email'
            {...register('email', { required:'Email is required' })}
            className="w-full border px-3 py-2 rounded bg-white text-black focus:outline-none border-gray-300"
          />
          {errors.email && <p className=' text-red-500  text-sm text-left'>{errors.email.message}</p>}
        </div>
        <div className="mb-6 container w-70 mx-auto">
          <label className="block text-white text-semibold text-left font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder='Enter your password'
            {...register('password', { required: 'Password is required' })}
            className="w-full border px-3 py-2 rounded bg-white text-black focus:outline-none border-gray-300"
          />
          {errors.password && <p className=' text-red-500 text-sm text-left'>{errors.password.message}</p>}
        </div>
        <button 
          type="submit" 
          className="w-70 bg-brand-light text-white py-2 rounded-2xl hover:bg-brand-dark mb-4"
          >
          {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  )
}

export default LoginForm;
