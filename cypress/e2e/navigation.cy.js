describe('Navegação do Feed para Post', () => {
    beforeEach(() => {
        // Limpar localStorage antes de cada teste
        cy.clearLocalStorage()

        // Criar um usuário de teste primeiro através do registro
        cy.visit('/auth/register')

        cy.get('input[name="name"]').should('be.visible').type('Usuário Teste')
        cy.get('input[name="email"]')
            .should('be.visible')
            .type('teste@example.com')
        cy.get('input[name="password"]').should('be.visible').type('senha123')

        // Clicar no botão de submit
        cy.get('button[type="submit"]').should('be.visible').click()

        // Aguardar redirecionamento para login
        cy.url({ timeout: 10000 }).should('include', '/auth/login')

        // Aguardar a página carregar completamente
        cy.get('input[name="email"]').should('be.visible')

        // Fazer login
        cy.get('input[name="email"]').clear().type('teste@example.com')
        cy.get('input[name="password"]').clear().type('senha123')
        cy.get('button[type="submit"]').should('be.visible').click()

        // Aguardar redirecionamento para o feed
        cy.url({ timeout: 10000 }).should('eq', Cypress.config().baseUrl + '/')

        // Aguardar o feed carregar - verificar que pelo menos um post está presente
        cy.get('article', { timeout: 10000 }).should('exist')
    })

    it('deve navegar do feed para um post específico e voltar', () => {
        // Verificar que estamos na página inicial (feed)
        cy.url().should('eq', Cypress.config().baseUrl + '/')

        // Verificar que o feed está visível com posts usando texto ao invés de h2
        cy.contains('Introdução ao React', { timeout: 10000 }).should('exist')

        // Encontrar o link "Ver detalhes" associado ao post "Introdução ao React"
        // Usando uma estratégia mais robusta: encontrar o texto do título e depois o link próximo
        cy.contains('Introdução ao React').then(($title) => {
            // Encontrar o elemento article pai
            const $article = $title.closest('article')
            // Dentro do article, encontrar o link "Ver detalhes"
            cy.wrap($article).find('a').contains('Ver detalhes').click()
        })

        // Verificar que navegou para a página do post
        cy.url({ timeout: 10000 }).should(
            'include',
            '/blog-post/introducao-ao-react'
        )

        // Verificar que o conteúdo do post está presente (não precisa estar visível)
        cy.contains('Introdução ao React', { timeout: 10000 }).should('exist')

        // Voltar para o feed (usando botão voltar do navegador)
        cy.go('back')

        // Verificar que voltou para o feed
        cy.url({ timeout: 10000 }).should('eq', Cypress.config().baseUrl + '/')

        // Verificar que o feed está presente novamente
        cy.contains('Introdução ao React', { timeout: 10000 }).should('exist')
    })

    it('deve navegar para diferentes posts e voltar', () => {
        // Verificar que estamos no feed
        cy.url().should('eq', Cypress.config().baseUrl + '/')

        // Verificar que múltiplos posts estão presentes
        cy.contains('CSS Grid na Prática', { timeout: 10000 }).should('exist')

        // Clicar no link "Ver detalhes" do post sobre CSS Grid
        cy.contains('CSS Grid na Prática').then(($title) => {
            // Encontrar o elemento article pai
            const $article = $title.closest('article')
            // Dentro do article, encontrar o link "Ver detalhes"
            cy.wrap($article).find('a').contains('Ver detalhes').click()
        })

        // Verificar que navegou para a página do post
        cy.url({ timeout: 10000 }).should(
            'include',
            '/blog-post/css-grid-na-pratica'
        )

        // Verificar conteúdo do post
        cy.contains('CSS Grid na Prática', { timeout: 10000 }).should('exist')

        // Voltar para o feed
        cy.go('back')

        // Verificar que voltou para o feed
        cy.url({ timeout: 10000 }).should('eq', Cypress.config().baseUrl + '/')

        // Verificar que ainda podemos ver posts
        cy.get('article', { timeout: 10000 }).should('exist')
    })
})
