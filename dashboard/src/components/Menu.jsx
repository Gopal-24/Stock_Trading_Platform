import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../context/AuthContext'

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const { user } = useContext(AuthContext)

  const handleMenuClick = index => {
    setSelectedMenu(index)
  }

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  const handleLogout = async e => {
    e.stopPropagation()

    try {
      await fetch(`${import.meta.env.VITE_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
      })
      window.location.href =
        'https://stock-trading-platform-1-9y97.onrender.com'
    } catch (err) {
      console.error('Logout failed:', err.message)
    }
  }

  const menuClass = 'menu'
  const activeMenuClass = 'menu selected'

  return (
    <div className='menu-container'>
      <img src='/logo.png' style={{ width: '25px' }} />
      <div className='menus'>
        <ul>
          <li>
            <Link
              style={{ textDecoration: 'none' }}
              to='/'
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: 'none' }}
              to='/orders'
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: 'none' }}
              to='/holdings'
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: 'none' }}
              to='/positions'
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: 'none' }}
              to='/funds'
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: 'none' }}
              to='/apps'
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className='profile dropdown '>
          <div className='profile-trigger' onClick={handleProfileClick}>
            <div className='avatar'>
              {user ? user.slice(0, 2).toUpperCase() : 'U'}
            </div>
            <p className='username'>{user}</p>
          </div>
          {isProfileDropdownOpen && (
            <>
              <ul className='dropdown-menu dropdown-menu-end show'>
                <li>
                  <h6 className='dropdown-header'>{user}</h6>
                </li>
                <li>
                  <button
                    className='btn dropdown-item text-danger'
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Menu
