import { ref } from 'vue'

interface User {
  name: string
  email: string
}

const user = ref<User | null>(
  JSON.parse(
    localStorage.getItem('user') || 'null'
  )
)

export function useAuth() {

  const login = (
    email: string,
    password: string
  ) => {

    user.value = {
      name: 'Colecionador',
      email
    }

    localStorage.setItem(
      'user',
      JSON.stringify(user.value)
    )

    return true
  }

  const register = (
    name: string,
    email: string,
    password: string
  ) => {

    localStorage.setItem(
      'registeredUser',
      JSON.stringify({
        name,
        email,
        password
      })
    )

    return true
  }

  const logout = () => {

    user.value = null

    localStorage.removeItem('user')
  }

  const resetPassword = (
    email: string
  ) => {

    return true
  }

  return {
    user,
    login,
    register,
    logout,
    resetPassword
  }
}