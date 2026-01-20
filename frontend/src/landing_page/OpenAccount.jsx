import React from 'react'
import { Link } from 'react-router-dom'

function OpenAccount () {
  return (
    <div className='container p-5 mb-5'>
      <div className='row text-center'>
        <h1 className='mt-5 fs-2 mb-3'>Open a Zerodha account</h1>
        <p className='mb-3 text-muted'>
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <Link to={'/signup'}>
          <button className='btn btn-primary col-2 m-auto mt-3 p-2 fs-5'>
            Sign up now
          </button>
        </Link>
      </div>
    </div>
  )
}

export default OpenAccount
