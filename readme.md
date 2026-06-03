# Álbum da Copa do Mundo

## Nome do Aluno
Julio Correa

## Nome do Curso
Desenvolvimento de Sistemas

## Unidade Curricular
Desenvolvimento para Dispositivos Móveis

---

## Sobre o Projeto

O projeto **Álbum da Copa do Mundo** foi desenvolvido utilizando **Ionic Vue**, **Vue 3**, **TypeScript** e **Composition API**.

O objetivo da aplicação é simular um álbum digital de figurinhas inspirado nos álbuns oficiais da Copa do Mundo, permitindo que o usuário visualize, pesquise e organize sua coleção de forma simples e intuitiva.

---

## Funcionalidades Implementadas

### Autenticação

- Cadastro de usuário
- Login
- Recuperação de senha
- Logout
- Proteção de rotas
- Persistência de sessão utilizando LocalStorage

### Álbum de Figurinhas

- Visualização de figurinhas
- Busca por jogador
- Busca por seleção
- Marcar figurinha como coletada
- Remover figurinha da coleção
- Filtro de figurinhas:
  - Todas
  - Coletadas
  - Pendentes

### Estatísticas

- Total de figurinhas
- Total coletadas
- Total pendentes
- Barra de progresso da coleção

### Perfil

- Visualização de informações do usuário
- Estatísticas pessoais
- Encerramento de sessão

---

## Tecnologias Utilizadas

- Ionic Framework
- Vue 3
- TypeScript
- Vue Router
- Composition API
- LocalStorage

---

## Estrutura do Projeto

```text
src/
├── data/
│   └── stickers.ts
│
├── composables/
│   ├── useAuth.ts
│   └── useAlbum.ts
│
├── components/
│   ├── AppHeader.vue
│   ├── BottomNav.vue
│   ├── StickerCard.vue
│   ├── StickerList.vue
│   ├── LoginForm.vue
│   ├── RegisterForm.vue
│   └── ResetPasswordForm.vue
│
├── views/
│   ├── LoginPage.vue
│   ├── RegisterPage.vue
│   ├── ForgotPasswordPage.vue
│   ├── AlbumPage.vue
│   ├── CollectionPage.vue
│   └── ProfilePage.vue
│
└── router/
    └── index.ts
```

---

## Objetivo Educacional

Este projeto foi desenvolvido para praticar conceitos de:

- Desenvolvimento Mobile Híbrido
- Componentização
- Gerenciamento de Estado
- Navegação entre páginas
- Manipulação de dados locais
- TypeScript
- Boas práticas de desenvolvimento utilizando Ionic Vue

---

## Repositório

Link do repositório GitHub:

```text
https://github.com/seu-usuario/album-copa
```

(Substituir pelo link real do repositório após a publicação.)