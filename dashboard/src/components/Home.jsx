import { useEffect, useState } from 'react'
import axios from 'axios'

import Dashboard from './Dashboard'
import TopBar from './Topbar'

function Home () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.post(
          'http://localhost:8080/verify',
          {},
          {
            withCredentials: true
          }
        )

        if (!res.data.status) {
          window.location.href = 'http://localhost:5173/login'
        }
      } catch (e) {
        window.location.href = 'http://localhost:5173/login'
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [])

  if (loading) return null // ya loader

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  )
}

export default Home
