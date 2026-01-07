import React from 'react'

function RightSection ({
  productName,
  productDescription,
  learnMore,
  imageURL
}) {
  return (
    <div className='container mt-5 border-top'>
      <div className='row mt-5 p-5'>
        <div className='col-5 mt-5'>
          <h1>{productName}</h1>
          <p className='text-muted'>{productDescription}</p>
          <a href={learnMore} className='text-decoration-none text-dark'>
            Learn More <i className='fa-solid fa-arrow-right'></i>
          </a>
        </div>
        <div className='col-1'></div>
        <div className='col-6'>
          <img src={imageURL} alt='' className='img-fluid object-fit-contain' />
        </div>
      </div>
    </div>
  )
}

export default RightSection
