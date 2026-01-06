import React from 'react'

function Team () {
  return (
    <div className='container mt-5'>
      <div className='row p-3'>
        <h1 className='text-center'>People</h1>
      </div>
      <div
        className='row text-muted '
        style={{ lineHeight: '1.8', fontSize: '1.2em' }}
      >
        <div className='col-6 p-3 text-center'>
          <img
            src='media/images/nithinKamath.jpg'
            alt=''
            style={{ borderRadius: '100%', width: '50%' }}
          />
          <h4 className='mt-4 mb-2'>Nithin Kamath</h4>
          <h6>Founder, CEO</h6>
        </div>
        <div className='col-6 p-3'>
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on&nbsp;
            <a href='' className='text-decoration-none'>
              Homepage
            </a>
            &nbsp;/&nbsp;
            <a href='' className='text-decoration-none'>
              TradingQnA
            </a>
            &nbsp;/&nbsp;
            <a href='' className='text-decoration-none'>
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Team
