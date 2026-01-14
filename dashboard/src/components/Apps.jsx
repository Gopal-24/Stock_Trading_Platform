import React from 'react'

const apps = [
  {
    name: 'Kite',
    desc: 'Trade stocks, F&O, mutual funds and more',
    status: 'Open'
  },
  {
    name: 'Console',
    desc: 'Reports, statements and account insights',
    status: 'Open'
  },
  {
    name: 'Coin',
    desc: 'Direct mutual funds with zero commission',
    status: 'Open'
  },
  {
    name: 'Varsity',
    desc: 'Learn stock markets from scratch',
    status: 'Open'
  }
]

const Apps = () => {
  return (
    <>
      <h3 className='title'>Apps</h3>

      <div className='apps-grid'>
        {apps.map((app, index) => (
          <div className='app-card' key={index}>
            <h4>{app.name}</h4>
            <p>{app.desc}</p>
            <button className='btn w-100 user-btn'>{app.status}</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Apps
