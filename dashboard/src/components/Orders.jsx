import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/allOrders`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h3 className='title'>Orders History ({orders.length})</h3>

      <div className='order-table'>
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price.toFixed(2)}</td>
                <td className={order.mode === 'BUY' ? 'profit' : 'loss'}>
                  {order.mode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Orders
