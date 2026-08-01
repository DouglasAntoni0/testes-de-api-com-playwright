import { test, expect } from '@playwright/test'
import { authService } from '../../support/services/auth'
import { linksService } from '../../support/services/links'
import { getUserWithLink } from '../../support/factories/user'

test.describe('POST /api/links', () => {
    let auth
    let links

    test.beforeEach(({ request }) => {
        auth = authService(request)
        links = linksService(request)
    })

    const createAuthenticatedUser = async () => {
        const user = getUserWithLink()
        const registrationResponse = await auth.createUser(user)

        expect(registrationResponse.status()).toBe(201)

        return {
            user,
            token: await auth.getToken(user)
        }
    }

    test('deve encurtar um novo link', async () => {
        const { user, token } = await createAuthenticatedUser()
        const response = await links.createLink(user.link, token)

        expect(response.status()).toBe(201)
        const { data, message } = await response.json()

        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('original_url', user.link.original_url)
        expect(data).toHaveProperty('title', user.link.title)
        expect(data.short_code).toMatch(/^[A-Za-z0-9]{5}$/)
        expect(message).toBe('Link criado com sucesso')
    })

    test('não deve encurtar quando a url original não é informada', async () => {
        const { user, token } = await createAuthenticatedUser()
        const response = await links.createLink({ ...user.link, original_url: '' }, token)

        expect(response.status()).toBe(400)
        const { message } = await response.json()
        expect(message).toBe("O campo 'OriginalURL' é obrigatório")
    })

    test('não deve encurtar quando o titulo não é informada', async () => {
        const { user, token } = await createAuthenticatedUser()
        const response = await links.createLink({ ...user.link, title: '' }, token)

        expect(response.status()).toBe(400)
        const { message } = await response.json()
        expect(message).toBe("O campo 'Title' é obrigatório")
    })

    test('não deve encurtar quando o titulo é invalida', async () => {
        const { user, token } = await createAuthenticatedUser()
        const response = await links.createLink({ ...user.link, original_url: 'teste@teste.com.br', title: '' }, token)

        expect(response.status()).toBe(400)
        const { message } = await response.json()
        expect(message).toBe("O campo 'OriginalURL' deve ser uma URL válida")
    })
})
