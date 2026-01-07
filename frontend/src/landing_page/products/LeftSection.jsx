import React from 'react'

function LeftSection ({
  imageURL,
  productName,
  productDescription,
  trydemo,
  learnMore,
  googlePlay,
  appStore
}) {
  return (
    <div className='container mt-5 border-top'>
      <div className='row mt-5 p-5'>
        <div className='col-6'>
          <img src={imageURL} alt='' />
        </div>
        <div className='col-1'></div>
        <div className='col-5 mt-5'>
          <h1>{productName}</h1>
          <p className='text-muted'>{productDescription}</p>
          <div>
            <a href={trydemo} className='text-decoration-none'>
              Try Demo <i className='fa fa-long-arrow-right'></i>
            </a>
            <a href={learnMore} className='text-decoration-none ms-5'>
              Learn More <i className='fa fa-long-arrow-right'></i>
            </a>
          </div>
          <div className='mt-4'>
            <a href={googlePlay} className='text-decoration-none'>
              <img src='/media/images/googlePlayBadge.svg' alt='' />
            </a>
            <a href={appStore} className='text-decoration-none ms-5'>
              <img src='/media/images/appstoreBadge.svg' alt='' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSection
