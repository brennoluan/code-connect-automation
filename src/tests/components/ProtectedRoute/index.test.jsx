import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { ProtectedRoute } from '../../../components/ProtectedRoute'
import { renderWithRouter, createUseAuthMock } from '../../utils'

// Mock do useAuth
vi.mock('../../../hooks/useAuth', () => ({
    useAuth: vi.fn(),
}))

// Mock do useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

// Mock do Spinner
vi.mock('../../../components/Spinner', () => ({
    Spinner: () => <div data-testid="spinner">Loading...</div>,
}))

import { useAuth } from '../../../hooks/useAuth'

describe('ProtectedRoute', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('deve renderizar spinner quando isLoading é true', () => {
        vi.mocked(useAuth).mockImplementation(
            createUseAuthMock({ isLoading: true, isAuthenticated: false })
        )

        renderWithRouter(
            <ProtectedRoute>
                <div>Protected Content</div>
            </ProtectedRoute>
        )

        expect(screen.getByTestId('spinner')).toBeInTheDocument()
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })

    it('deve redirecionar para /auth/login quando não autenticado', () => {
        vi.mocked(useAuth).mockImplementation(
            createUseAuthMock({ isLoading: false, isAuthenticated: false })
        )

        renderWithRouter(
            <ProtectedRoute>
                <div>Protected Content</div>
            </ProtectedRoute>
        )

        expect(mockNavigate).toHaveBeenCalledWith('/auth/login')
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })

    it('deve renderizar children quando autenticado', () => {
        vi.mocked(useAuth).mockImplementation(
            createUseAuthMock({ isLoading: false, isAuthenticated: true })
        )

        renderWithRouter(
            <ProtectedRoute>
                <div>Protected Content</div>
            </ProtectedRoute>
        )

        expect(screen.getByText('Protected Content')).toBeInTheDocument()
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
        expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('não deve renderizar nada quando não autenticado e não está carregando', () => {
        vi.mocked(useAuth).mockImplementation(
            createUseAuthMock({ isLoading: false, isAuthenticated: false })
        )

        const { container } = renderWithRouter(
            <ProtectedRoute>
                <div>Protected Content</div>
            </ProtectedRoute>
        )

        expect(container.firstChild).toBeNull()
        expect(mockNavigate).toHaveBeenCalledWith('/auth/login')
    })
})
