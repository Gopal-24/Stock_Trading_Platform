import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_URL}/verify`,
          {},
          { withCredentials: true }
        )

        if (res.data.status) {
          setUser(res.data.username)
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    verify()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
