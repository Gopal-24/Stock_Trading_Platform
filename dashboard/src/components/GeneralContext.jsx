import React, { useState } from 'react'
import BuyActionWindow from './BuyActionWindow'
import SellActionWindow from './SellActionWindow'

const GeneralContext = React.createContext()

export const GeneralContextProvider = props => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false)
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false)
  const [selectedStockUID, setSelectedStockUID] = useState('')

  const openBuyWindow = uid => {
    setIsBuyWindowOpen(true)
    setSelectedStockUID(uid)
  }

  const closeBuyWindow = () => {
    setIsBuyWindowOpen(false)
    setSelectedStockUID('')
  }

  const openSellWindow = uid => {
    setIsSellWindowOpen(true)
    setSelectedStockUID(uid)
  }

  const closeSellWindow = () => {
    setIsSellWindowOpen(false)
    setSelectedStockUID('')
  }

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow,
        closeBuyWindow,
        openSellWindow,
        closeSellWindow
      }}
    >
      {props.children}

      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  )
}

export default GeneralContext
