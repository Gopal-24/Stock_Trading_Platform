import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Summary = () => {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/summary`, { withCredentials: true })
      .then(res => setSummary(res.data))
      .catch(console.error)
  }, [])

  if (!summary) return null

  const isProfit = summary.pn1 >= 0

  return (
    <>
      <div className='username'>
        <h6>Hi, {summary.username}!</h6>
        <hr className='divider' />
      </div>

      <div className='section'>
        <span>
          <p>Equity</p>
        </span>

        <div className='data'>
          <div className='first'>
            <h3>{summary.marginAvailable}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className='second'>
            <p>
              Margins used <span>{summary.marginUsed}</span>{' '}
            </p>
            <p>
              Opening balance <span>{summary.openingBalance}</span>{' '}
            </p>
          </div>
        </div>
        <hr className='divider' />
      </div>

      <div className='section'>
        <span>
          <p>Holdings ({summary.holdingsCount})</p>
        </span>

        <div className='data'>
          <div className='first'>
            <h3 className={isProfit ? 'profit' : 'loss'}>
              {summary.pnl}{' '}
              <small>
                {isProfit ? '+' : ''}
                {summary.pnlPercent}%
              </small>{' '}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className='second'>
            <p>
              Current Value <span>{summary.currentValue}</span>{' '}
            </p>
            <p>
              Investment <span>{summary.investment}</span>{' '}
            </p>
          </div>
        </div>
        <hr className='divider' />
      </div>
    </>
  )
}

export default Summary
