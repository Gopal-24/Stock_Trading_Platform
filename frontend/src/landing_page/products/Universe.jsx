import React from 'react'

function Universe () {
  return (
    <div className='container'>
      <div className='row text-center'>
        <h1>The Zerodha Universe</h1>
        <p className='mb-5 mt-3 fs-6'>
          Exted your tading and investment experience even further with our
          partner platforms
        </p>
        <div className='col-4'>
          <img src='media/images/smallcaseLogo.png' className='mb-3' alt='' />
          <p className='text-muted text-small'>Thematic investment platform</p>
        </div>
        <div className='col-4'>
          <img
            src='media/images/streakLogo.png'
            className='mb-3'
            style={{ width: '199px', height: '52px' }}
            alt=''
          />
          <p className='text-muted text-small'>Algo & strategy platform</p>
        </div>
        <div className='col-4'>
          <img
            src='media/images/sensibullLogo.svg'
            style={{ width: '199px', height: '52px' }}
            className='mb-3'
            alt=''
          />
          <p className='text-muted text-small'>Options trading platform</p>
        </div>
        <div className='col-4 mt-5'>
          <img
            src='media/images/zerodhaFundhouse.png'
            style={{ width: '199px', height: '52px' }}
            className='mb-3'
            alt=''
          />
          <p className='text-muted text-small'>Assest management</p>
        </div>
        <div className='col-4 mt-5'>
          <img
            src='media/images/goldenpiLogo.png'
            style={{ width: '199px', height: '52px' }}
            className='mb-3'
            alt=''
          />
          <p className='text-muted text-small'>Bonds trading platform</p>
        </div>
        <div className='col-4 mt-5'>
          <img
            src='media/images/dittoLogo.png'
            style={{ width: '199px', height: '52px' }}
            className='mb-3'
            alt=''
          />
          <p className='text-muted text-small'>Insurance</p>
        </div>
        <button className='btn btn-primary col-2 m-auto mt-3 p-2 fs-5'>
          Sign up now
        </button>
      </div>
    </div>
  )
}

export default Universe
