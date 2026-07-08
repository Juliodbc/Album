import { ref } from 'vue'

import {
  addUsuario,
  realizarLogin
} from '@/services/database'

export interface User {
  id: number
  name: string
  email: string
}

const user = ref<User | null>(
  JSON.parse(localStorage.getItem('user') || 'null')
)

export function useAuth() {

  const login = async (
    email: string,
    password: string
  ) => {

    const registeredUser =
      await realizarLogin(
        email,
        password
      )

    if (!registeredUser) {
      throw new Error(
        'E-mail ou senha incorretos'
      )
    }

    user.value = {
      id: registeredUser.id,
      name: registeredUser.nome,
      email: registeredUser.email
    }

    localStorage.setItem(
      'user',
      JSON.stringify(user.value)
    )

    return true
  }

  const register = async (
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

    try {
      await addUsuario(
        name.trim(),
        email.trim(),
        '',
        password
      )
    } catch (error) {
      throw new Error(
        'Este e-mail já está cadastrado'
      )
    }

    return true
  }

  const logout = () => {

    user.value = null

    localStorage.removeItem('user')
  }

  const resetPassword = (
    email: string
  ) => {

    if (!email.trim()) {
      throw new Error(
        'Informe o e-mail cadastrado'
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
