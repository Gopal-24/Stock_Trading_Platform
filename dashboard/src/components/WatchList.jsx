import React, { useState, useContext } from 'react'

import Tooltip from '@mui/material/Tooltip'
import Grow from '@mui/material/Grow'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import BarChartIcon from '@mui/icons-material/BarChart'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { watchlist } from '../data/data'

import GeneralContext from './GeneralContext'
import DoughnutChart from './DoughnutChart'

const labels = watchlist.map(stock => stock.name)

const WatchList = () => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: watchlist.map(stock => stock.price),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

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

      <DoughnutChart data={data} />
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
      {showWatchlistAction && <WatchListActions uid={stock.name} />}
    </li>
  )
}

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext)

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid)
  }

  const handleSellClick = () => {
    generalContext.openSellWindow(uid)
  }

  return (
    <span className='actions'>
      <span>
        <Tooltip
          title='Buy (B)'
          placement='top'
          arrow
          TransitionComponent={Grow}
          onClick={handleBuyClick}
        >
          <button className='buy '>Buy</button>
        </Tooltip>
        <Tooltip
          title='Sell (S)'
          placement='top'
          arrow
          TransitionComponent={Grow}
          onClick={handleSellClick}
        >
          <button className='sell'>Sell</button>
        </Tooltip>
        <Tooltip
          title='Analytics (A)'
          placement='top'
          arrow
          TransitionComponent={Grow}
        >
          <button className='action'>
            <BarChartIcon className='icon' />
          </button>
        </Tooltip>
        <Tooltip title='More' placement='top' arrow TransitionComponent={Grow}>
          <button className='action'>
            <MoreHorizIcon className='icon' />
          </button>
        </Tooltip>
      </span>
    </span>
  )
}
