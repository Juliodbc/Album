import { ref } from 'vue'

import {
  addUsuario,
  realizarLogin
  , findUsuarioByEmail
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
    // Demo login: when VITE_DEMO_LOGIN is set to "true", accept any email
    // and create a user automatically if it does not exist. Useful for
    // demonstrations on emulator where real credentials are not needed.
    const demo = import.meta.env.VITE_DEMO_LOGIN === 'true'

    if (demo) {
      let existing = await findUsuarioByEmail(email)

      if (!existing) {
        const defaultName = email.split('@')[0] || 'Usuário'
        await addUsuario(defaultName, email, '', password)
        existing = await findUsuarioByEmail(email)
      }

      if (!existing) {
        throw new Error('Não foi possível criar usuário de demonstração')
      }

      user.value = {
        id: existing.id,
        name: existing.nome,
        email: existing.email
      }

      localStorage.setItem('user', JSON.stringify(user.value))

      return true
    }

    const registeredUser = await realizarLogin(email, password)

    if (!registeredUser) {
      throw new Error('E-mail ou senha incorretos')
    }

    user.value = {
      id: registeredUser.id,
      name: registeredUser.nome,
      email: registeredUser.email
    }

    localStorage.setItem('user', JSON.stringify(user.value))

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
