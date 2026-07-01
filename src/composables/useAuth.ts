import { ref } from 'vue'

export interface User {
  name: string
  email: string
}

interface RegisteredUser extends User {
  password: string
}

const user = ref<User | null>(
  JSON.parse(localStorage.getItem('user') || 'null')
)

export function useAuth() {

  const getUsers = (): RegisteredUser[] => {
    return JSON.parse(
      localStorage.getItem('registeredUsers') || '[]'
    )
  }

  const saveUsers = (
    users: RegisteredUser[]
  ) => {
    localStorage.setItem(
      'registeredUsers',
      JSON.stringify(users)
    )
  }

  const login = (
    email: string,
    password: string
  ) => {

    const users = getUsers()

    const registeredUser = users.find(
      user =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    )

    if (!registeredUser) {
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

    const users = getUsers()

    const alreadyExists = users.find(
      user =>
        user.email.toLowerCase() === email.toLowerCase()
    )

    if (alreadyExists) {
      throw new Error(
        'Este e-mail já está cadastrado'
      )
    }

    users.push({
      name,
      email,
      password
    })

    saveUsers(users)

    return true
  }

  const logout = () => {

    user.value = null

    localStorage.removeItem('user')
  }

  const resetPassword = (
    email: string
  ) => {

    const users = getUsers()

    const registeredUser = users.find(
      user =>
        user.email.toLowerCase() === email.toLowerCase()
    )

    if (!registeredUser) {
      throw new Error(
        'E-mail não encontrado'
      )
    }

    return true
  }

  const isAuthenticated = () => {
    return !!user.value
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