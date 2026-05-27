// ***********************************************
// Custom commands para facilitar os testes E2E
// ***********************************************

/**
 * Registra um novo usuário
 */
Cypress.Commands.add('registerUser', (name, email, password) => {
    cy.visit('/auth/register')

    cy.get('input[name="name"]').type(name)
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)

    // Interceptar o submit do formulário e chamar a função de submit manualmente
    cy.get('form').then(($form) => {
        const form = $form[0]

        // Simular o comportamento esperado pelo componente
        cy.window().then(() => {
            const event = new Event('submit', {
                bubbles: true,
                cancelable: true,
            })
            form.dispatchEvent(event)
        })
    })

    cy.url({ timeout: 5000 }).should('include', '/auth/login')
})

/**
 * Faz login na aplicação
 */
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/auth/login')

    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)

    // Interceptar o submit do formulário
    cy.get('form').then(($form) => {
        const form = $form[0]
        const event = new Event('submit', { bubbles: true, cancelable: true })
        form.dispatchEvent(event)
    })

    // Aguardar redirecionamento para o feed
    cy.url({ timeout: 5000 }).should('eq', Cypress.config().baseUrl + '/')
})

/**
 * Faz setup completo: registra e faz login
 */
Cypress.Commands.add(
    'setupAndLogin',
    (
        name = 'Usuário Teste',
        email = 'teste@example.com',
        password = 'senha123'
    ) => {
        cy.clearLocalStorage()
        cy.registerUser(name, email, password)
        cy.login(email, password)
    }
)
