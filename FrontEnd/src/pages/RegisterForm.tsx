import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { register as registerUser } from '../services/authService';

interface RegisterFormInputs {
  email: string;
  password: string;
  // username: string;
}

function RegisterForm() {
  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const res = await registerUser(data);
      alert('Registration successful!');
      reset();
      console.log('User registered:', res.data);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <div className='block bg-primary w-120 h-110 mx-auto mt-10 p-6 rounded-2xl'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full h-auto mx-auto rounded-2xl'>
        <h2 className="text-2xl text-white font-semibold mb-4 text-center">Register</h2>
        <div className="mb-4 container w-70 mx-auto">
          <label className="block text-white text-semibold text-left font-medium mb-1 ">Email</label>
          <input 
            type="text" 
            placeholder='email'
            {...register('email', { required: 'Email is required'})}
            className='w-full border px-3 py-2 rounded bg-white text-black focus:outline-none border-gray-30'
          />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        </div>
        <div className="mb-6 container w-70 mx-auto">
          <label className="block text-white text-semibold text-left font-medium mb-1">Password</label>
          <input
            type='password'
            placeholder='password'
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' }
            })}
            className='w-full border px-3 py-2 rounded bg-white text-black focus:outline-none border-gray-300'
          />
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        </div>

        {/* <div className="mb-6 container w-70 mx-auto">
          <label className="block text-white text-semibold text-left font-medium mb-1">Username</label>
          <input 
          type="text" 
          placeholder='username'
          {...register('username', { required: 'Username is required' })}  
          className='w-full border px-3 py-2 rounded bg-white text-black focus:outline-none border-gray-300'
        />
        {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
        </div> */}
        
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-70 bg-brand-light text-white py-2 rounded-2xl hover:bg-brand-dark mb-4'
        >
           {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
      </form>
    </div>
  )
}

export default RegisterForm;
