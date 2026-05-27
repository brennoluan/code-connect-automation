import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { vi } from 'vitest'

/**
 * Renderiza um componente envolvido com MemoryRouter para testes
 * @param {React.ReactElement} ui - Componente a ser renderizado
 * @param {Object} options - Opções de renderização
 * @param {string} options.initialEntries - Entrada inicial do router (padrão: ['/'])
 * @returns {Object} Objeto retornado por render() do RTL
 */
export const renderWithRouter = (ui, options = {}) => {
    const { initialEntries = ['/'], ...renderOptions } = options

    const Wrapper = ({ children }) => {
        return (
            <MemoryRouter initialEntries={initialEntries}>
                {children}
            </MemoryRouter>
        )
    }

    return render(ui, { wrapper: Wrapper, ...renderOptions })
}

/**
 * Cria um mock do hook useAuth
 * @param {Object} authState - Estado de autenticação
 * @param {boolean} authState.isLoading - Se está carregando
 * @param {boolean} authState.isAuthenticated - Se está autenticado
 * @param {Object|null} authState.user - Dados do usuário
 * @returns {Function} Função mock para vi.mock
 */
export const createUseAuthMock = (authState = {}) => {
    const {
        isLoading = false,
        isAuthenticated = false,
        user = null,
        login = vi.fn(() => ({ success: true, user })),
        register = vi.fn(() => ({ success: true, user })),
        logout = vi.fn(),
    } = authState

    return () => ({
        isLoading,
        isAuthenticated,
        user,
        login,
        register,
        logout,
    })
}
