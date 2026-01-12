import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  })
  const { email, password } = inputValue
  const handleOnChange = e => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value
    })
  }

  const handleError = err =>
    toast.error(err, {
      position: 'bottom-left'
    })
  const handleSuccess = msg =>
    toast.success(msg, {
      position: 'bottom-left'
    })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        'http://localhost:8080/login',
        {
          ...inputValue
        },
        { withCredentials: true }
      )
      console.log(data)
      const { success, message } = data
      if (success) {
        handleSuccess(message)
        setTimeout(() => {
          window.location.href = 'http://localhost:5174'
        }, 1000)
      } else {
        handleError(message)
      }
    } catch (error) {
      console.log(error)
    }
    setInputValue({
      ...inputValue,
      email: '',
      password: ''
    })
  }

  return (
    <div className='container mt-5'>
      <h1 className='col-12 col-lg-6 offset-lg-3 text-center'>Login</h1>

      <div className='row mt-3'>
        <div className='col-12 col-lg-6 offset-lg-3'>
          <form onSubmit={handleSubmit} className='needs-validation' noValidate>
            {/* Email */}
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                id='email'
                className='form-control'
                type='email'
                name='email'
                value={email}
                placeholder='Enter your email'
                onChange={handleOnChange}
                required
              />
              <div className='invalid-feedback'>Email is required</div>
            </div>

            {/* Password */}
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                id='password'
                className='form-control'
                type='password'
                name='password'
                value={password}
                placeholder='Enter your password'
                onChange={handleOnChange}
                required
              />
              <div className='invalid-feedback'>Password is required</div>
            </div>

            {/* Submit */}
            <button type='submit' className='btn user-btn w-100'>
              Login
            </button>

            {/* Signup link */}
            <div className='text-center mt-3'>
              <span>
                Don’t have an account? <Link to='/signup'>Signup</Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default Login
