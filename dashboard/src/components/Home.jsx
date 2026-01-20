import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Dashboard from './Dashboard'
import TopBar from './Topbar'

function Home () {
  const { loading, user } = useContext(AuthContext)

  if (loading) return null

  if (!user) {
    window.location.href = `https://stock-trading-platform-1-yx5q.onrender.com/login`
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
