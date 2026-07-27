import { test, expect } from '@playwright/test'
import { authService } from '../../support/services/auth'
import { getUser } from '../../support/factories/user'


test.describe('POST /auth/login', () => {

    let auth

    test.beforeEach(({ request }) => {
        auth = authService(request)
    })

    test('deve fazer login com sucesso', async () => {

        const user = getUser()

        const respCreateUser = await auth.createUser(user)
        expect(respCreateUser.status()).toBe(201)

        const response = await auth.login(user)

        expect(response.status()).toBe(200)

        const Body = await response.json()
        expect(Body).toHaveProperty('message', 'Login realizado com sucesso')
        expect(Body.data).toHaveProperty('token')
        expect(Body.data.user).toHaveProperty('id')
        expect(Body.data.user).toHaveProperty('name', user.name)
        expect(Body.data.user).toHaveProperty('email', user.email)
        expect(Body.data.user).not.toHaveProperty('password')

    })

    test('não deve logar com senha incorreta', async () => {
        const user = getUser()

        const respCreateUser = await auth.createUser(user)
        expect(respCreateUser.status()).toBe(201)

        const response = await auth.login({ ...user, password: '123456' })
        expect(response.status()).toBe(401)

        const Body = await response.json()
        expect(Body).toHaveProperty('message', 'Credenciais inválidas')
    })

    test('não deve logar com email que não foi cadastrado', async () => {
        const user = {
            email: '404@teste.com',
            password: 'pwd123'
        }

        const response = await auth.login(user)
        expect(response.status()).toBe(401)

        const Body = await response.json()
        expect(Body).toHaveProperty('message', 'Credenciais inválidas')
    })

    test('não deve logar quando o email não é informado', async () => {
        const user = {
            password: 'pwd123'
        }

        const response = await auth.login(user)
        expect(response.status()).toBe(400)

        const Body = await response.json()
        expect(Body).toHaveProperty('message', "O campo 'Email' é obrigatório")
    })

    test('não deve logar quando a senha não é informada', async () => {
        const user = {
            email: 'email@teste.com'
        }

        const response = await auth.login(user)
        expect(response.status()).toBe(400)

        const Body = await response.json()
        expect(Body).toHaveProperty('message', "O campo 'Password' é obrigatório")
    })


})