import React from 'react'

function Hero () {
  return (
    <div className='container'>
      <div className='row p-3 text-center'>
        <h1 className='mt-5'>Technology</h1>
        <h3 className='mt-3 text-muted fs-4'>
          Sleek, modern and intuitive trading platform.
        </h3>
        <p className='mt-3 text-muted'>
          Checkout our&nbsp;
          <a href='' className='text-decoration-none'>
            investment offerings&nbsp;
            <i className='fa fa-long-arrow-right'></i>
          </a>
        </p>
      </div>
    </div>
  )
}

export default Hero
