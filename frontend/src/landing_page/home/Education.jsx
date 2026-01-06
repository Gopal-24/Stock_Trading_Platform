import React from 'react'

function Education () {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <img src='media/images/education.svg' alt='' />
        </div>
        <div className='col'>
          <h1 className='mb-5 fs-2'>Free and open market education</h1>
          <p className='mb-3'>
            Varsity, the largest online stock market education book in the world{' '}
            <br />
            covering everything from the basics to advanced trading.
          </p>
          <a href='' className='text-decoration-none'>
            Vercity <i className='fa fa-long-arrow-right'></i>
          </a>
          <p className='mb-3 mt-5'>
            TradingQ&A, the most active trading and investment community in{' '}
            <br />
            India for all your market related queries.
          </p>
          <a href='' className='text-decoration-none'>
            TradingQ&A <i className='fa fa-long-arrow-right'></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Education
