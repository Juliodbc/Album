import { ref } from 'vue'

export interface User {
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

    const registeredUser = JSON.parse(
      localStorage.getItem('registeredUser') || 'null'
    )

    if (!registeredUser) {
      throw new Error(
        'Nenhum usuário cadastrado'
      )
    }

    if (
      registeredUser.email !== email ||
      registeredUser.password !== password
    ) {
      throw new Error(
        'E-mail ou senha incorretos'
      )
    }

    user.value = {
      name: registeredUser.name,
      email: registeredUser.email
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

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      throw new Error(
        'Preencha todos os campos'
      )
    }

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

    const registeredUser = JSON.parse(
      localStorage.getItem('registeredUser') || 'null'
    )

    if (!registeredUser) {
      throw new Error(
        'Nenhum usuário cadastrado'
      )
    }

    if (
      registeredUser.email !== email
    ) {
      throw new Error(
        'E-mail não encontrado'
      )
    }

    return true
  }

  const isAuthenticated = () => {

    return !!localStorage.getItem(
      'user'
    )
  }

  return {

    user,

    login,

    register,

    logout,

    resetPassword,

    isAuthenticated

  }
}