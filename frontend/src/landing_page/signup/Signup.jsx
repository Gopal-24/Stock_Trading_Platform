import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const Signup = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    username: ''
  })
  const { email, password, username } = inputValue
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
      position: 'bottom-right'
    })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/signup`,
        {
          ...inputValue
        },
        { withCredentials: true }
      )
      const { success, message } = data
      if (success) {
        handleSuccess(message)
        setTimeout(() => {
          window.location.href =
            'https://stock-trading-platform-2-ckcy.onrender.com'
        }, 800)
      } else {
        handleError(message)
      }
    } catch (error) {
      console.log(error)
    }
    setInputValue({
      ...inputValue,
      email: '',
      password: '',
      username: ''
    })
  }

  return (
    <div className='container mt-5'>
      <h1 className='col-12 col-lg-6 offset-lg-3 text-center'>Sign-Up</h1>

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

            {/* Username */}
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>
                Username
              </label>
              <input
                id='username'
                className='form-control'
                type='text'
                name='username'
                value={username}
                placeholder='Enter your username'
                onChange={handleOnChange}
                required
              />
              <div className='invalid-feedback'>Enter a username</div>
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
            <button type='submit' className='btn w-100 user-btn'>
              Sign-Up
            </button>

            {/* Login link */}
            <div className='text-center mt-3'>
              <span>
                Already have an account? <Link to='/login'>Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default Signup
