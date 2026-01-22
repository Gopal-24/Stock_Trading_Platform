import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Dashboard from './Dashboard'
import TopBar from './TopBar.jsx'

function Home () {
  const { loading, user } = useContext(AuthContext)

  if (loading) return null

  if (!user) {
    window.location.href = `https://stock-trading-platform-1-9y97.onrender.com`
    return null
  }
  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  )
}

export default Home
