import type { User, RegisterData, LoginData } from '../types/user'
import { getItem, setItem, removeItem } from './storage'

const USERS_KEY = 'job-tracker:users'
const CURRENT_USER_KEY = 'job-tracker:current-user'

// Usuário como ele é guardado no "banco de dados" (localStorage).
interface StoredUser extends User {
    password: string
}

function getUsers(): StoredUser[] {
    return getItem<StoredUser[]>(USERS_KEY) ?? []
}

// Usuário como ele é guardado no "banco de dados" (localStorage),
// sem a senha. Isso NUNCA deve ser exposto para o resto do app.
function toPublicUser(storedUser: StoredUser): User {
    return {
        id: storedUser.id,
        name: storedUser.name,
        email: storedUser.email,
    }
}

export function register(data: RegisterData): User {
    const users = getUsers()

    const emailExists = users.some((user) => user.email === data.email)
    if (emailExists) {
        throw new Error('Este e-mail já está cadastrado')
    }

    const newUser: StoredUser = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        password: data.password,
    }

    users.push(newUser)
    setItem(USERS_KEY, users)

    return toPublicUser(newUser)
}

export function login(data: LoginData): User {
    const users = getUsers()
    const user = users.find(
        (u) => u.email === data.email && u.password === data.password
    )

    if (!user) {
        throw new Error('E-mail ou senha inválidos')
    }

    const publicUser = toPublicUser(user)
    setItem(CURRENT_USER_KEY, publicUser)
    return publicUser
}

export function logout(): void {
    removeItem(CURRENT_USER_KEY)
}

export function getCurrentUser(): User | null {
    return getItem<User>(CURRENT_USER_KEY)
}