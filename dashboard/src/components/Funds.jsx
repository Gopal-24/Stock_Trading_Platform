import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Funds = () => {
  const [funds, setFunds] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:8080/funds', { withCredentials: true })
      .then(res => setFunds(res.data))
      .catch(err => console.log(err))
  }, [])

  if (!funds) return null

  const { equity, commodity } = funds

  return (
    <>
      <div className='funds'>
        <p>Instant, zero-cost fund transfers with UPI</p>
        <Link className='btn btn-green'>Add funds</Link>
        <Link className='btn btn-blue'>Withdraw</Link>
      </div>

      <div className='row'>
        <div className='col'>
          <span>
            <p>Equity</p>
          </span>

          <div className='table'>
            <FundRow
              label='Available margin'
              value={equity.availableMargin}
              highlight
            />
            <FundRow label='Used margin' value={equity.usedMargin} />
            <FundRow label='Available cash' value={equity.availableCash} />

            <hr />

            <FundRow label='Opening balance' value={equity.openingBalance} />
            <FundRow label='Payin' value={equity.payin} />
            <FundRow label='SPAN' value={equity.span} />
            <FundRow label='Delivery margin' value={equity.deliveryMargin} />
            <FundRow label='Exposure' value={equity.exposure} />
            <FundRow label='Options premium' value={equity.optionsPremium} />

            <hr />

            <FundRow
              label='Collateral (Liquid funds)'
              value={equity.collateralLiquid}
            />
            <FundRow
              label='Collateral (Equity)'
              value={equity.collateralEquity}
            />
            <FundRow label='Total collateral' value={equity.totalCollateral} />
          </div>
        </div>

        <div className='col'>
          {!commodity.hasAccount && (
            <div className='commodity'>
              <p>You don't have a commodity account</p>
              <Link className='btn btn-blue'>Open Account</Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const FundRow = ({ label, value, highlight }) => (
  <div className='data'>
    <p>{label}</p>
    <p className={`imp ${highlight ? 'colored' : ''}`}>
      {Number(value).toFixed(2)}
    </p>
  </div>
)

export default Funds
