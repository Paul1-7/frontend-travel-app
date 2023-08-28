import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem('authenticated'))
  )
  const history = useHistory()
  const login = (data) => {
    const { nombre, apellido, roles, id } = data

    const newData = { nombre, apellido, roles, id }
    setAuthenticated(newData)
    localStorage.setItem('authenticated', JSON.stringify(newData))
  }

  const logout = () => {
    localStorage.removeItem('authenticated')
    setAuthenticated(null)
    history.push('/')
  }

  const isAllowedRol = (rols = []) => {
    const { roles = [] } = authenticated ?? {}

    return roles.some(({ id }) => {
      return rols.includes(id)
    })
  }

  return { authenticated, login, logout, isAllowedRol }
}

export default useAuth
