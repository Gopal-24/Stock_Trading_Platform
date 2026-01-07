import React, { useState } from 'react'

import Tooltip from '@mui/material/Tooltip'
import Grow from '@mui/material/Grow'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { watchlist } from '../data/data'

const WatchList = () => {
  return (
    <div className='watchlist-container'>
      <div className='search-container'>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='Search eg:infy, bse, nifty fut weekly, gold mcx'
          className='search'
        />
        <span className='counts'> {watchlist.length} / 50</span>
      </div>

      <ul className='list'>
        {watchlist.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>
    </div>
  )
}

export default WatchList

const WatchListItem = ({ stock }) => {
  const [showWatchlistAction, setShowWatchlistActions] = useState(false)

  const handleMouseEnter = () => {
    setShowWatchlistActions(true)
  }
  const handleMouseLeave = () => {
    setShowWatchlistActions(false)
  }

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className='item'>
        <p className={stock.isDown ? 'down' : 'up'}>{stock.name}</p>
        <div className='item-info'>
          <span className='percent'>{stock.percent}</span>
          <span>
            {stock.isDown ? (
              <KeyboardArrowDownIcon className='down' />
            ) : (
              <KeyboardArrowUpIcon className='up' />
            )}
          </span>
          <span className='price'>{stock.price}</span>
        </div>
      </div>
    </li>
  )
}
